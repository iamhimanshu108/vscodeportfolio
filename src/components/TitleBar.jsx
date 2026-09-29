import { ArrowLeft, ArrowRight, Code2, Search } from "lucide-react";

export function TitleBar({
  onOpenPalette,
  onToggleView,
}) {
  return (
    <header className="titlebar">
      <span className="vscode-logo" aria-label="Visual Studio Code"><Code2 size={20} /></span>
      <nav className="top-menu" aria-label="Application menu">
        {['File', 'Edit', 'Selection'].map((item) => (
          <button key={item}>{item}</button>
        ))}
        <button onClick={onToggleView}>View</button>
        {['Go', 'Run'].map((item) => <button key={item}>{item}</button>)}
        <button aria-label="More actions">…</button>
      </nav>
      <div className="titlebar-navigation" aria-hidden="true">
        <ArrowLeft size={16} />
        <ArrowRight size={16} />
      </div>
      <button
        className="search-trigger"
        onClick={onOpenPalette}
        aria-label="Search files and actions"
      >
        <Search size={14} />
        <span>Search files and actions</span>
        <kbd>Ctrl P</kbd>
      </button>
    </header>
  );
}
