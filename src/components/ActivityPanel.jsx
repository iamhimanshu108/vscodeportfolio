import {
  ExternalLink,
  FileCode2,
  GitBranch,
  PanelLeftClose,
  Play,
  Radio,
} from "lucide-react";
import { documents, profile, skills } from "../data/portfolio.js";

const panelTitles = {
  "source-control": "SOURCE CONTROL",
  "run-debug": "RUN AND DEBUG",
  extensions: "EXTENSIONS",
  "portfolio-tools": "PORTFOLIO TOOLS",
};

export function ActivityPanel({
  view,
  selectedId,
  onOpenDocument,
  onShowOutput,
  onClose,
}) {
  return (
    <aside className="activity-panel" aria-label={panelTitles[view]}>
      <div className="pane-heading text-[10px]">
        <span>{panelTitles[view]}</span>
        <button
          className="icon-button"
          onClick={onClose}
          aria-label="Close sidebar"
        >
          <PanelLeftClose size={15} />
        </button>
      </div>

      {view === "source-control" && (
        <div className="activity-panel-content">
          <p className="activity-panel-label">PUBLIC PROFILE</p>
          <a
            className="activity-panel-link"
            href={profile.githubUrl}
            target="_blank"
            rel="noreferrer"
          >
            <GitBranch size={16} />
            <span>GitHub profile</span>
            <ExternalLink size={13} />
          </a>
          <p className="activity-panel-label">REPOSITORY ACTIVITY</p>
          <button
            className="activity-panel-row"
            onClick={() => onOpenDocument("github")}
          >
            <FileCode2 size={16} />
            <span>Open GitHub activity</span>
          </button>
          <button
            className="activity-panel-row"
            onClick={() => onOpenDocument("projects")}
          >
            <FileCode2 size={16} />
            <span>Browse project repositories</span>
          </button>
        </div>
      )}

      {view === "run-debug" && (
        <div className="activity-panel-content">
          <p className="activity-panel-label">PORTFOLIO PREVIEW</p>
          <div className="activity-panel-status">
            <Radio size={15} />
            <span>Preview is ready</span>
          </div>
          <button
            className="activity-panel-primary"
            onClick={() => {
              onOpenDocument("home");
              onShowOutput();
            }}
          >
            <Play size={15} /> Run portfolio preview
          </button>
          <p className="activity-panel-hint">
            Opens the home view and output panel.
          </p>
        </div>
      )}

      {view === "extensions" && (
        <div className="activity-panel-content">
          <p className="activity-panel-label">SKILLS AND TECHNOLOGIES</p>
          {skills.map((group) => (
            <button
              className="activity-panel-card"
              key={group.id}
              onClick={() => onOpenDocument("skills")}
            >
              <strong>{group.title}</strong>
              <span>{group.items.length} technologies</span>
            </button>
          ))}
          <button
            className="activity-panel-row"
            onClick={() => onOpenDocument("certificates")}
          >
            <FileCode2 size={16} />
            <span>View certificates</span>
          </button>
        </div>
      )}

      {view === "portfolio-tools" && (
        <div className="activity-panel-content">
          <p className="activity-panel-label">QUICK OPEN</p>
          {documents.map((document) => (
            <button
              className={`activity-panel-row ${selectedId === document.id ? "is-selected" : ""}`}
              key={document.id}
              onClick={() => onOpenDocument(document.id)}
            >
              <FileCode2 size={16} />
              <span>{document.fileName}</span>
            </button>
          ))}
        </div>
      )}
    </aside>
  );
}
