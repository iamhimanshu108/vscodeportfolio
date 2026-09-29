import { ArrowLeft, ArrowRight, Code2, Search } from "lucide-react";

const menus = {
  File: ["New Text File", "New File...", "Open...", "Open Folder...", "Save", "Save As...", "Save All", "Auto Save"],
  Edit: ["Undo", "Redo", "Cut", "Copy", "Paste", "Find", "Replace", "Toggle Line Comment"],
  Selection: ["Select All", "Expand Selection", "Shrink Selection", "Copy Line Up", "Copy Line Down", "Move Line Up", "Move Line Down"],
  View: ["Command Palette...", "Open View...", "Explorer", "Search", "Source Control", "Run", "Extensions", "Problems", "Output", "Terminal", "Word Wrap"],
  Go: ["Back", "Forward", "Go to File...", "Go to Definition", "Go to Declaration", "Go to References", "Go to Line/Column...", "Next Problem"],
  Run: ["Start Debugging", "Run Without Debugging", "Stop Debugging", "Restart Debugging", "Open Configurations", "Step Over", "Step Into", "Continue", "Toggle Breakpoint"],
  Terminal: ["New Terminal", "Split Terminal", "Run Task...", "Run Build Task...", "Run Active File", "Show Running Tasks...", "Terminate Running Task..."],
  Help: ["Welcome", "Show All Commands", "Documentation", "Keyboard Shortcuts Reference", "Video Tutorials", "Report Issue", "Check for Updates...", "About"],
};

export function TitleBar({ onOpenPalette, activeMenu, onMenuToggle }) {
  return <header className="titlebar">
    <span className="vscode-logo" aria-label="Visual Studio Code"><Code2 size={20} /></span>
    <nav className="top-menu" aria-label="Application menu">
      {Object.entries(menus).map(([name, items]) => <span className="menu-anchor" key={name}>
        <button onClick={() => onMenuToggle(name)}>{name}</button>
        {activeMenu === name && <div className="app-menu">{items.map((item, index) => <span key={item}><button>{item}</button>{[3, 6].includes(index) && <hr />}</span>)}</div>}
      </span>)}
    </nav>
    <div className="titlebar-navigation" aria-hidden="true"><ArrowLeft size={16} /><ArrowRight size={16} /></div>
    <button className="search-trigger" onClick={onOpenPalette} aria-label="Search files and actions"><Search size={14} /><span>Search files and actions</span><kbd>Ctrl P</kbd></button>
  </header>;
}
