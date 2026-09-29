import { Braces, PanelBottom, PanelLeftClose, Search } from "lucide-react";
import { profile } from "../data/portfolio.js";

export function TitleBar({
  explorerOpen,
  outputOpen,
  onOpenPalette,
  onToggleExplorer,
  onToggleOutput,
}) {
  return (
    <header className="titlebar">
      <div className="window-controls" aria-hidden="true">
        <span className="window-dot close-dot" />
        <span className="window-dot minimize-dot" />
        <span className="window-dot maximize-dot" />
      </div>
      <div className="titlebar-brand">
        <span className="brand-glyph">
          <Braces size={15} />
        </span>
        <span>{profile.name}</span>
        <span className="titlebar-muted">/ Portfolio</span>
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
      <div className="titlebar-tools">
        <button
          className="icon-button title-tool"
          onClick={onToggleExplorer}
          aria-label={explorerOpen ? "Hide explorer" : "Show explorer"}
          title="Toggle Explorer"
        >
          <PanelLeftClose size={16} />
        </button>
        <button
          className="icon-button title-tool"
          onClick={onToggleOutput}
          aria-label={outputOpen ? "Hide output panel" : "Show output panel"}
          title="Toggle Output"
        >
          <PanelBottom size={16} />
        </button>
      </div>
    </header>
  );
}
