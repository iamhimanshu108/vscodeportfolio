import "./ActivityBar.css";
import {
  VscDebugAlt,
  VscExtensions,
  VscFiles,
  VscSearch,
  VscSettingsGear,
  VscSourceControl,
  VscSymbolNamespace,
} from "react-icons/vsc";
import { profile } from "../data/profileData.js";

const activityViews = [
  { id: "explorer", label: "Explorer", Icon: VscFiles },
  { id: "search", label: "Search", Icon: VscSearch, action: "search" },
  { id: "source-control", label: "Source control", Icon: VscSourceControl },
  { id: "run-debug", label: "Run and debug", Icon: VscDebugAlt },
  { id: "extensions", label: "Extensions", Icon: VscExtensions },
  { id: "portfolio-tools", label: "Portfolio tools", Icon: VscSymbolNamespace },
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
      <div className="activitybar-primary">
        {activityViews.map(({ id, label, Icon, action }) => (
          <button
            key={id}
            className={`activity-button ${activeView === id ? "is-active" : ""}`}
            onClick={() =>
              action === "search" ? onOpenPalette() : onSelectView(id)
            }
            aria-label={label}
            aria-pressed={action ? undefined : activeView === id}
            title={label}
          >
            <Icon size={21} aria-hidden="true" />
          </button>
        ))}
      </div>
      <div className="activitybar-bottom">
        <button
          className="activity-button activity-profile-button"
          onClick={onOpenProfile}
          aria-label="Account"
          title="Account"
        >
          <img src={profile.avatarUrl} alt="" />
        </button>
        <button
          className="activity-button activity-settings-button"
          onClick={onOpenSettings}
          aria-label="Settings"
          title="Settings"
        >
          <VscSettingsGear size={20} aria-hidden="true" />
        </button>
      </div>
    </nav>
  );
}
