import { Bug, Boxes, Braces, Folder, GitBranch, Search, Settings } from "lucide-react";
import { profile } from "../data/portfolio.js";

export function ActivityBar({ explorerOpen, onOpenPalette, onToggleExplorer, onOpenProfile, onOpenSettings }) {
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
      <button className="activity-button" aria-label="Source control" title="Source control"><GitBranch size={20} /></button>
      <button className="activity-button" aria-label="Run and debug" title="Run and debug"><Bug size={20} /></button>
      <button className="activity-button" aria-label="Extensions" title="Extensions"><Boxes size={20} /></button>
      <button className="activity-button" aria-label="Portfolio tools" title="Portfolio tools"><Braces size={20} /></button>
      <div className="activity-spacer" />
      <button className="activity-button activity-profile-button" onClick={onOpenProfile} aria-label="Account" title="Account">
        <img src={profile.avatarUrl} alt="" />
      </button>
      <button className="activity-button" onClick={onOpenSettings} aria-label="Settings" title="Settings"><Settings size={20} /></button>
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
