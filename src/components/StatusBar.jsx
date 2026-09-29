import { PanelBottom } from "lucide-react";

export function StatusBar({ document, outputOpen, onToggleOutput, onOpenSettings, onOpenPalette }) {
  return (
    <footer className="statusbar">
      <div className="status-left">
        <span className="status-item status-activity">
          <span className="status-live-dot" aria-hidden="true" />
        </span>
      </div>
      <div className="status-right">
        <button className="status-item status-current-file" onClick={onOpenPalette}>
          {document.fileName}
        </button>
        <button className="status-item status-language" onClick={onOpenSettings}>JavaScript JSX</button>
        <button className="status-item status-encoding" onClick={onOpenSettings}>UTF-8</button>
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
