import { FolderOpen, PanelBottom, Search } from "lucide-react";

export function ActivityBar({
  explorerOpen,
  outputOpen,
  onOpenPalette,
  onToggleExplorer,
  onToggleOutput,
}) {
  return (
    <nav className="activitybar" aria-label="Workspace tools">
      <button
        className={`activity-button ${explorerOpen ? "is-active" : ""}`}
        onClick={onToggleExplorer}
        aria-label="Toggle explorer"
        aria-pressed={explorerOpen}
        title="Explorer"
      >
        <FolderOpen size={20} />
      </button>
      <button
        className="activity-button"
        onClick={onOpenPalette}
        aria-label="Search files"
        title="Search"
      >
        <Search size={19} />
      </button>
      <button
        className={`activity-button activity-bottom ${outputOpen ? "is-active" : ""}`}
        onClick={onToggleOutput}
        aria-label="Toggle output panel"
        aria-pressed={outputOpen}
        title="Output"
      >
        <PanelBottom size={19} />
      </button>
    </nav>
  );
}
