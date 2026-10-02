import { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  Folder,
  FolderOpen,
  PanelLeftClose,
} from "lucide-react";
import { documents, profile } from "../data/portfolio.js";
import { FileTypeIcon } from "./FileTypeIcon.jsx";

export function Explorer({
  selectedId,
  onOpenDocument,
  onClose,
}) {
  const [sourceOpen, setSourceOpen] = useState(true);

  return (
    <aside className="explorer" aria-label="File explorer">
      <div className="pane-heading text-[10px]">
        <span>EXPLORER</span>
        <button
          className="icon-button"
          onClick={onClose}
          aria-label="Close explorer"
        >
          <PanelLeftClose size={15} />
        </button>
      </div>
      <button
        className="tree-root"
        onClick={() => setSourceOpen((open) => !open)}
        aria-expanded={sourceOpen}
      >
        {sourceOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        <span>{profile.workspaceName}</span>
      </button>
      {sourceOpen && (
        <div className="tree-contents">
          <div className="tree-folder">
            <ChevronDown size={13} />
            <FolderOpen size={15} className="folder-color" />
            <span>src</span>
          </div>
          <div className="file-list">
            {documents.map((document) => (
              <button
                key={document.id}
                className={`file-row ${selectedId === document.id ? "is-selected" : ""}`}
                onClick={() => onOpenDocument(document.id)}
              >
                <FileTypeIcon type={document.type} />
                <span>{document.fileName}</span>
              </button>
            ))}
          </div>
          <div className="tree-folder root-file">
            <Folder size={15} className="folder-color" />
            <span>public</span>
                  <span className="tree-muted text-[10px]">empty</span>
          </div>
        </div>
      )}
    </aside>
  );
}
