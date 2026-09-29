import { Command, PanelBottom, ChevronRight, X } from "lucide-react";
import { documents } from "../data/portfolio.js";
import { PageRenderer } from "./PageRenderer.jsx";
import { FileTypeIcon } from "./FileTypeIcon.jsx";

export function EditorWorkspace({
  selectedId,
  selectedDocument,
  openTabs,
  onSelectDocument,
  onOpenDocument,
  onCloseTab,
  onOpenPalette,
  onToggleOutput,
  children,
}) {
  return (
    <main className="editor-workspace">
      <div className="editor-tabs" role="tablist" aria-label="Open files">
        {openTabs.map((id) => {
          const document = documents.find((item) => item.id === id);
          if (!document) return null;
          return (
            <div className="tab-shell" key={id}>
              <button
                role="tab"
                aria-selected={selectedId === id}
                className={`editor-tab ${selectedId === id ? "is-current" : ""}`}
                onClick={() => onSelectDocument(id)}
              >
                <FileTypeIcon type={document.type} />
                <span>{document.fileName}</span>
              </button>
              <button
                className="tab-close"
                onClick={() => onCloseTab(id)}
                aria-label={`Close ${document.fileName}`}
                disabled={openTabs.length < 2}
              >
                <X size={13} />
              </button>
            </div>
          );
        })}
        <div className="tab-actions">
          <button
            className="icon-button"
            onClick={onToggleOutput}
            aria-label="Toggle output panel"
            title="Toggle panel"
          >
            <PanelBottom size={15} />
          </button>
          <button
            className="icon-button"
            onClick={onOpenPalette}
            aria-label="Open command palette"
            title="Command palette"
          >
            <Command size={15} />
          </button>
        </div>
      </div>
      <div className="breadcrumbs">
        <span>himanshu-portfolio</span>
        <ChevronRight size={13} />
        <span>src</span>
        <ChevronRight size={13} />
        <span className="breadcrumb-current">{selectedDocument.fileName}</span>
        <span className="breadcrumb-symbol">{selectedDocument.title}</span>
      </div>
      <div className="editor-scroll">
        <div className="line-gutter" aria-hidden="true">
          {Array.from({ length: 12 }, (_, index) => (
            <span key={index}>{index + 1}</span>
          ))}
        </div>
        <article className="document-content" key={selectedId}>
          <PageRenderer pageId={selectedId} onOpenDocument={onOpenDocument} />
        </article>
        <aside className="minimap" aria-hidden="true">
          <div className="minimap-lines">
            {Array.from({ length: 26 }, (_, index) => (
              <i key={index} />
            ))}
          </div>
          <div className="minimap-viewport" />
        </aside>
      </div>
      {children}
    </main>
  );
}
