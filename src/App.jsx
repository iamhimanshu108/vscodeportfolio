import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu } from "lucide-react";
import "./App.css";
import { CommandPalette } from "./components/CommandPalette.jsx";
import { ActivityBar } from "./components/ActivityBar.jsx";
import { ActivityPanel } from "./components/ActivityPanel.jsx";
import { EditorWorkspace } from "./components/EditorWorkspace.jsx";
import { Explorer } from "./components/Explorer.jsx";
import { OutputPanel } from "./components/OutputPanel.jsx";
import { ProfileDialog } from "./components/ProfileDialog.jsx";
import { StatusBar } from "./components/StatusBar.jsx";
import { TitleBar } from "./components/TitleBar.jsx";
import { SettingsPopover } from "./components/SettingsPopover.jsx";
import { documents } from "./data/navigationData.js";
import { panelVariants } from "./motion.js";

function App() {
  const appRef = useRef(null);
  const lightRef = useRef(null);
  const pointerFrameRef = useRef(null);
  const pointerPositionRef = useRef({ x: 0, y: 0 });
  const magneticFrameRef = useRef(null);
  const magneticStateRef = useRef({ target: null, x: 0, y: 0 });
  const [selectedId, setSelectedId] = useState("home");
  const [openTabs, setOpenTabs] = useState(["home"]);
  const [sidebarView, setSidebarView] = useState("explorer");
  const explorerOpen = sidebarView === "explorer";
  const [outputOpen, setOutputOpen] = useState(true);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [theme, setTheme] = useState("highcontrast");
  const [font, setFont] = useState("system");
  const [textColor, setTextColor] = useState("default");
  const [viewOpen, setViewOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [zoom, setZoom] = useState(1);
  const selectedDocument =
    documents.find((document) => document.id === selectedId) ?? documents[0];
  const openDocument = useCallback((id) => {
    setSelectedId(id);
    setOpenTabs((tabs) => (tabs.includes(id) ? tabs : [...tabs, id]));
    if (window.matchMedia("(max-width: 760px)").matches) setSidebarView(null);
  }, []);
  const navigateDocument = useCallback((direction) => {
    const currentIndex = documents.findIndex((document) => document.id === selectedId);
    const nextIndex = (currentIndex + direction + documents.length) % documents.length;
    openDocument(documents[nextIndex].id);
  }, [openDocument, selectedId]);
  const openPreviousDocument = useCallback(() => navigateDocument(-1), [navigateDocument]);
  const openNextDocument = useCallback(() => navigateDocument(1), [navigateDocument]);
  const toggleSidebarView = (view) =>
    setSidebarView((current) => (current === view ? null : view));
  const toggleExplorer = () => toggleSidebarView("explorer");

  const closeTab = (id) => {
    if (openTabs.length < 2) return;
    const closedIndex = openTabs.indexOf(id);
    const remainingTabs = openTabs.filter((tabId) => tabId !== id);
    setOpenTabs(remainingTabs);
    if (selectedId === id)
      setSelectedId(remainingTabs[Math.max(0, closedIndex - 1)]);
  };

  useEffect(() => {
    const onKeyDown = (event) => {
      const target = event.target;
      const isEditing = target instanceof HTMLElement &&
        (target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName));
      if (!isEditing && (event.metaKey || event.ctrlKey) && event.key === "PageUp") {
        event.preventDefault();
        openPreviousDocument();
      }
      if (!isEditing && (event.metaKey || event.ctrlKey) && event.key === "PageDown") {
        event.preventDefault();
        openNextDocument();
      }
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "p") {
        event.preventDefault();
        setPaletteOpen(true);
      }
      if (event.key === "Escape") {
        if (paletteOpen) setPaletteOpen(false);
        if (profileOpen) setProfileOpen(false);
        setActiveMenu(null);
      }
    };
    const onPointerDown = (event) => {
      if (!event.target.closest(".menu-anchor")) setActiveMenu(null);
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [openNextDocument, openPreviousDocument, paletteOpen, profileOpen]);

  useEffect(() => {
    const app = appRef.current;
    const light = lightRef.current;
    if (!app || !light || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    const onPointerMove = (event) => {
      const bounds = app.getBoundingClientRect();
      pointerPositionRef.current = {
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      };
      if (pointerFrameRef.current) return;
      pointerFrameRef.current = requestAnimationFrame(() => {
        const { x, y } = pointerPositionRef.current;
        light.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
        pointerFrameRef.current = null;
      });
    };

    app.addEventListener("pointermove", onPointerMove);
    return () => {
      app.removeEventListener("pointermove", onPointerMove);
      if (pointerFrameRef.current) cancelAnimationFrame(pointerFrameRef.current);
    };
  }, []);

  useEffect(() => {
    const app = appRef.current;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarsePointer = window.matchMedia("(pointer: coarse)");
    if (!app || prefersReducedMotion.matches || coarsePointer.matches) return undefined;

    const resetTarget = (target) => {
      if (target) target.style.translate = "";
    };

    const onPointerMove = (event) => {
      if (event.pointerType === "touch") return;
      const source = event.target instanceof Element ? event.target : null;
      const target = source?.closest("button, a");
      const previousTarget = magneticStateRef.current.target;
      if (!target || !app.contains(target)) {
        resetTarget(previousTarget);
        magneticStateRef.current.target = null;
        return;
      }

      const bounds = target.getBoundingClientRect();
      const centerX = bounds.left + bounds.width / 2;
      const centerY = bounds.top + bounds.height / 2;
      const dx = event.clientX - centerX;
      const dy = event.clientY - centerY;
      const distance = Math.hypot(dx, dy);
      if (distance >= 120) {
        resetTarget(target);
        magneticStateRef.current.target = null;
        return;
      }

      if (previousTarget && previousTarget !== target) resetTarget(previousTarget);
      const pull = (120 - distance) / 120;
      magneticStateRef.current = { target, x: dx * pull * 0.4, y: dy * pull * 0.4 };
      if (magneticFrameRef.current) return;
      magneticFrameRef.current = requestAnimationFrame(() => {
        const { target: activeTarget, x, y } = magneticStateRef.current;
        if (activeTarget) activeTarget.style.translate = `${x}px ${y}px`;
        magneticFrameRef.current = null;
      });
    };

    const onPointerLeave = () => {
      resetTarget(magneticStateRef.current.target);
      magneticStateRef.current.target = null;
    };

    app.addEventListener("pointermove", onPointerMove);
    app.addEventListener("pointerleave", onPointerLeave);
    return () => {
      app.removeEventListener("pointermove", onPointerMove);
      app.removeEventListener("pointerleave", onPointerLeave);
      resetTarget(magneticStateRef.current.target);
      if (magneticFrameRef.current) cancelAnimationFrame(magneticFrameRef.current);
    };
  }, []);

  return (
    <div
      ref={appRef}
      className={`app-shell theme-${theme} font-${font} text-${textColor}`}
      style={{ zoom }}
    >
      <div ref={lightRef} className="app-pointer-light" aria-hidden="true" />
      <TitleBar
        explorerOpen={explorerOpen}
        outputOpen={outputOpen}
        onOpenPalette={() => setPaletteOpen(true)}
        onToggleView={() => setViewOpen((open) => !open)}
        activeMenu={activeMenu}
        onMenuToggle={(menu) =>
          setActiveMenu((current) => (current === menu ? null : menu))
        }
        onToggleExplorer={toggleExplorer}
        onToggleOutput={() => setOutputOpen((open) => !open)}
        onOpenSettings={() => setSettingsOpen(true)}
        onOpenPalette={() => setPaletteOpen(true)}
        onPreviousDocument={openPreviousDocument}
        onNextDocument={openNextDocument}
      />
      <div className="workspace">
        <ActivityBar
          activeView={sidebarView}
          onSelectView={toggleSidebarView}
          onOpenPalette={() => setPaletteOpen(true)}
          onOpenProfile={() => setProfileOpen(true)}
          onOpenSettings={() => setSettingsOpen((open) => !open)}
        />
        <AnimatePresence initial={false}>
        {explorerOpen && (
          <motion.div className="sidebar-motion-shell" key="explorer" variants={panelVariants} initial="hidden" animate="visible" exit="exit">
          <Explorer
            selectedId={selectedId}
            onOpenDocument={openDocument}
            onClose={() => setSidebarView(null)}
            onOpenProfile={() => setProfileOpen(true)}
          /></motion.div>
        )}
        {sidebarView && sidebarView !== "explorer" && (
          <motion.div className="sidebar-motion-shell" key={sidebarView} variants={panelVariants} initial="hidden" animate="visible" exit="exit">
          <ActivityPanel
            view={sidebarView}
            selectedId={selectedId}
            onOpenDocument={openDocument}
            onShowOutput={() => setOutputOpen(true)}
            onClose={() => setSidebarView(null)}
          /></motion.div>
        )}
        </AnimatePresence>
        <EditorWorkspace
          selectedId={selectedId}
          selectedDocument={selectedDocument}
          openTabs={openTabs}
          onSelectDocument={setSelectedId}
          onOpenDocument={openDocument}
          onCloseTab={closeTab}
          onOpenPalette={() => setPaletteOpen(true)}
          onToggleOutput={() => setOutputOpen((open) => !open)}
          onPreviousDocument={openPreviousDocument}
          onNextDocument={openNextDocument}
        >
          {outputOpen && (
            <OutputPanel
              document={selectedDocument}
              openTabCount={openTabs.length}
              onClose={() => setOutputOpen(false)}
            />
          )}
        </EditorWorkspace>
      </div>
      <StatusBar
        document={selectedDocument}
        outputOpen={outputOpen}
        onToggleOutput={() => setOutputOpen((open) => !open)}
      />
      {!explorerOpen && (
        <button
          className="mobile-menu-button"
          onClick={() => setSidebarView("explorer")}
          aria-label="Open explorer"
        >
          <Menu size={19} />
        </button>
      )}
      {paletteOpen && (
        <CommandPalette
          explorerOpen={explorerOpen}
          outputOpen={outputOpen}
          onClose={() => setPaletteOpen(false)}
          onOpenDocument={openDocument}
          onToggleExplorer={toggleExplorer}
          onToggleOutput={() => setOutputOpen((open) => !open)}
        />
      )}
      {profileOpen && <ProfileDialog onClose={() => setProfileOpen(false)} />}
      {settingsOpen && (
        <SettingsPopover
          theme={theme}
          font={font}
          textColor={textColor}
          onThemeChange={setTheme}
          onFontChange={setFont}
          onTextColorChange={setTextColor}
          onClose={() => setSettingsOpen(false)}
        />
      )}
      {viewOpen && (
        <div className="view-popover">
          <strong>VIEW</strong>
          <button
            onClick={() => setZoom((value) => Math.min(1.4, value + 0.1))}
          >
            Zoom In
          </button>
          <button
            onClick={() => setZoom((value) => Math.max(0.8, value - 0.1))}
          >
            Zoom Out
          </button>
          <button onClick={() => setZoom(1)}>Reset Zoom</button>
        </div>
      )}
    </div>
  );
}

export default App;
