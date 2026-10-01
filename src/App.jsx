import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
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
import { documents } from "./data/portfolio.js";
import "./App.css";

function App() {
  const [selectedId, setSelectedId] = useState("home");
  const [openTabs, setOpenTabs] = useState(["home"]);
  const [sidebarView, setSidebarView] = useState("explorer");
  const explorerOpen = sidebarView === "explorer";
  const [outputOpen, setOutputOpen] = useState(true);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [theme, setTheme] = useState("midnight");
  const [font, setFont] = useState("mono");
  const [textColor, setTextColor] = useState("default");
  const [viewOpen, setViewOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [zoom, setZoom] = useState(1);
  const selectedDocument =
    documents.find((document) => document.id === selectedId) ?? documents[0];
  const toggleSidebarView = (view) =>
    setSidebarView((current) => (current === view ? null : view));
  const toggleExplorer = () => toggleSidebarView("explorer");

  const openDocument = (id) => {
    setSelectedId(id);
    setOpenTabs((tabs) => (tabs.includes(id) ? tabs : [...tabs, id]));
    if (window.matchMedia("(max-width: 760px)").matches) setSidebarView(null);
  };

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
  }, [paletteOpen, profileOpen]);

  return (
    <div
      className={`app-shell theme-${theme} font-${font} text-${textColor}`}
      style={{ zoom }}
    >
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
      />
      <div className="workspace">
        <ActivityBar
          activeView={sidebarView}
          onSelectView={toggleSidebarView}
          onOpenPalette={() => setPaletteOpen(true)}
          onOpenProfile={() => setProfileOpen(true)}
          onOpenSettings={() => setSettingsOpen((open) => !open)}
        />
        {explorerOpen && (
          <Explorer
            selectedId={selectedId}
            onOpenDocument={openDocument}
            onClose={() => setSidebarView(null)}
            onOpenProfile={() => setProfileOpen(true)}
          />
        )}
        {sidebarView && sidebarView !== "explorer" && (
          <ActivityPanel
            view={sidebarView}
            selectedId={selectedId}
            onOpenDocument={openDocument}
            onShowOutput={() => setOutputOpen(true)}
            onClose={() => setSidebarView(null)}
          />
        )}
        <EditorWorkspace
          selectedId={selectedId}
          selectedDocument={selectedDocument}
          openTabs={openTabs}
          onSelectDocument={setSelectedId}
          onOpenDocument={openDocument}
          onCloseTab={closeTab}
          onOpenPalette={() => setPaletteOpen(true)}
          onToggleOutput={() => setOutputOpen((open) => !open)}
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
