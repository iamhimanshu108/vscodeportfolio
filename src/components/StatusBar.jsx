import { Braces, Check, PanelBottom } from "lucide-react";

export function StatusBar({ document, outputOpen, onToggleOutput }) {
  return (
    <footer className="statusbar">
      <div className="status-left">
        <span className="status-item status-branch">
          <Braces size={13} />
          <span>portfolio</span>
        </span>
        <span className="status-item">
          <Check size={13} /> Ready
        </span>
      </div>
      <div className="status-right">
        <span className="status-item status-current-file">
          {document.fileName}
        </span>
        <span className="status-item status-language">JavaScript JSX</span>
        <span className="status-item status-encoding">UTF-8</span>
        <button
          className="status-item status-panel-button"
          onClick={onToggleOutput}
          aria-label={outputOpen ? "Hide output panel" : "Show output panel"}
        >
          <PanelBottom size={13} />
        </button>
      </div>
    </footer>
  );
}
