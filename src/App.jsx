import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { CommandPalette } from "./components/CommandPalette.jsx";
import { ActivityBar } from "./components/ActivityBar.jsx";
import { EditorWorkspace } from "./components/EditorWorkspace.jsx";
import { Explorer } from "./components/Explorer.jsx";
import { OutputPanel } from "./components/OutputPanel.jsx";
import { ProfileDialog } from "./components/ProfileDialog.jsx";
import { StatusBar } from "./components/StatusBar.jsx";
import { TitleBar } from "./components/TitleBar.jsx";
import { documents } from "./data/portfolio.js";
import "./App.css";

function App() {
  const [selectedId, setSelectedId] = useState("home");
  const [openTabs, setOpenTabs] = useState(["home"]);
  const [explorerOpen, setExplorerOpen] = useState(true);
  const [outputOpen, setOutputOpen] = useState(true);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const selectedDocument =
    documents.find((document) => document.id === selectedId) ?? documents[0];

  const openDocument = (id) => {
    setSelectedId(id);
    setOpenTabs((tabs) => (tabs.includes(id) ? tabs : [...tabs, id]));
    if (window.matchMedia("(max-width: 760px)").matches) setExplorerOpen(false);
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
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [paletteOpen, profileOpen]);

  return (
    <div className="app-shell">
      <TitleBar
        explorerOpen={explorerOpen}
        outputOpen={outputOpen}
        onOpenPalette={() => setPaletteOpen(true)}
        onToggleExplorer={() => setExplorerOpen((open) => !open)}
        onToggleOutput={() => setOutputOpen((open) => !open)}
      />
      <div className="workspace">
        <ActivityBar
          explorerOpen={explorerOpen}
          onOpenPalette={() => setPaletteOpen(true)}
          onToggleExplorer={() => setExplorerOpen((open) => !open)}
        />
        {explorerOpen && (
          <Explorer
            selectedId={selectedId}
            onOpenDocument={openDocument}
            onClose={() => setExplorerOpen(false)}
            onOpenProfile={() => setProfileOpen(true)}
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
          onClick={() => setExplorerOpen(true)}
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
          onToggleExplorer={() => setExplorerOpen((open) => !open)}
          onToggleOutput={() => setOutputOpen((open) => !open)}
        />
      )}
      {profileOpen && <ProfileDialog onClose={() => setProfileOpen(false)} />}
    </div>
  );
}

export default App;
