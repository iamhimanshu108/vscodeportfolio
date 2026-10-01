import {
  Bug,
  Boxes,
  Braces,
  Folder,
  GitBranch,
  Search,
  Settings,
} from "lucide-react";
import { profile } from "../data/portfolio.js";

const activityViews = [
  { id: "explorer", label: "Explorer", Icon: Folder },
  { id: "source-control", label: "Source control", Icon: GitBranch },
  { id: "run-debug", label: "Run and debug", Icon: Bug },
  { id: "extensions", label: "Extensions", Icon: Boxes },
  { id: "portfolio-tools", label: "Portfolio tools", Icon: Braces },
];

export function ActivityBar({
  activeView,
  onSelectView,
  onOpenPalette,
  onOpenProfile,
  onOpenSettings,
}) {
  return (
    <nav className="activitybar" aria-label="Workspace tools">
      {activityViews.map(({ id, label, Icon }) => (
        <button
          key={id}
          className={`activity-button ${activeView === id ? "is-active" : ""}`}
          onClick={() => onSelectView(id)}
          aria-label={label}
          aria-pressed={activeView === id}
          title={label}
        >
          <Icon size={20} />
        </button>
      ))}
      <div className="activity-spacer" />
      <button
        className="activity-button activity-profile-button"
        onClick={onOpenProfile}
        aria-label="Account"
        title="Account"
      >
        <img src={profile.avatarUrl} alt="" />
      </button>
      <button
        className="activity-button"
        onClick={onOpenSettings}
        aria-label="Settings"
        title="Settings"
      >
        <Settings size={20} />
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
