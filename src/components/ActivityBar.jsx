import { Folder, Search } from "lucide-react";

export function ActivityBar({ explorerOpen, onOpenPalette, onToggleExplorer }) {
  return (
    <nav className="activitybar" aria-label="Workspace tools">
      <button
        className={`activity-button ${explorerOpen ? "is-active" : ""}`}
        onClick={onToggleExplorer}
        aria-label="Toggle explorer"
        aria-pressed={explorerOpen}
        title="Explorer"
      >
        <Folder size={20} />
      </button>
      <button
        className="activity-button"
        onClick={onOpenPalette}
        aria-label="Search files"
        title="Search"
      >
        <Search size={19} />
      </button>
    </nav>
  );
}
