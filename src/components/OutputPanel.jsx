import { Check, X } from "lucide-react";

export function OutputPanel({ document, openTabCount, onClose }) {
  return (
    <section className="output-panel" aria-label="Portfolio output">
      <div className="output-heading">
        <div className="output-tabs">
          <span className="output-tab is-current">OUTPUT</span>
          <span className="output-tab">
            PROBLEMS <b>0</b>
          </span>
        </div>
        <button
          className="icon-button"
          onClick={onClose}
          aria-label="Close output panel"
        >
          <X size={15} />
        </button>
      </div>
      <div className="output-content">
        <span className="output-mark">
          <Check size={13} />
        </span>
        <span className="output-label">portfolio</span>
        <span className="output-separator">/</span>
        <span>view rendered</span>
        <span className="output-spacer" />
        <code>
          activeFile: <b>{document.fileName}</b>
        </code>
        <code>
          openTabs: <b>{openTabCount}</b>
        </code>
      </div>
    </section>
  );
}
