import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  CircleHelp,
  Command,
  FileCode2,
  Search,
  X,
} from "lucide-react";
import { documents } from "../data/portfolio.js";

export function CommandPalette({
  explorerOpen,
  outputOpen,
  onClose,
  onOpenDocument,
  onToggleExplorer,
  onToggleOutput,
}) {
  const [query, setQuery] = useState("");
  const [activeResult, setActiveResult] = useState(0);
  const inputRef = useRef(null);
  const commands = [
    {
      id: "toggle-explorer",
      label: explorerOpen ? "Hide Explorer" : "Show Explorer",
      detail: "View",
      run: onToggleExplorer,
    },
    {
      id: "toggle-output",
      label: outputOpen ? "Hide Output Panel" : "Show Output Panel",
      detail: "View",
      run: onToggleOutput,
    },
  ];
  const items = [
    ...documents.map((document) => ({
      id: document.id,
      label: document.fileName,
      detail: `src / ${document.title}`,
      run: () => onOpenDocument(document.id),
    })),
    ...commands,
  ].filter((item) =>
    `${item.label} ${item.detail}`.toLowerCase().includes(query.toLowerCase()),
  );

  useEffect(() => inputRef.current?.focus(), []);

  const chooseItem = (item) => {
    item?.run();
    onClose();
  };

  const onInputKeyDown = (event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveResult((index) =>
        items.length ? (index + 1) % items.length : 0,
      );
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveResult((index) =>
        items.length ? (index - 1 + items.length) % items.length : 0,
      );
    }
    if (event.key === "Enter") {
      event.preventDefault();
      chooseItem(items[activeResult]);
    }
  };

  return (
    <div
      className="palette-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className="command-palette"
        role="dialog"
        aria-modal="true"
        aria-label="Search files and actions"
      >
        <div className="palette-input-wrap">
          <Search size={17} />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActiveResult(0);
            }}
            onKeyDown={onInputKeyDown}
            placeholder="Search files and actions..."
            aria-label="Search files and actions"
          />
          <kbd>ESC</kbd>
          <button
            className="icon-button palette-close"
            onClick={onClose}
            aria-label="Close command palette"
          >
            <X size={16} />
          </button>
        </div>
        <div
          className="palette-results"
          role="listbox"
          aria-label="Search results"
        >
          {items.length ? (
            items.map((item, index) => (
              <button
                key={item.id}
                role="option"
                aria-selected={activeResult === index}
                className={`palette-result ${activeResult === index ? "is-highlighted" : ""}`}
                onMouseEnter={() => setActiveResult(index)}
                onClick={() => chooseItem(item)}
              >
                <span className="result-icon">
                  {documents.some((document) => document.id === item.id) ? (
                    <FileCode2 size={16} />
                  ) : (
                    <Command size={15} />
                  )}
                </span>
                <span className="result-label">{item.label}</span>
                <span className="result-detail text-[10px]">{item.detail}</span>
              </button>
            ))
          ) : (
            <div className="palette-empty text-[11px]">
              <CircleHelp size={17} />
              <span>No matching files or actions</span>
            </div>
          )}
        </div>
        <div className="palette-footer">
          <span>
            <ArrowUp size={12} />
            <ArrowDown size={12} /> Navigate
          </span>
          <span>
            <kbd>↵</kbd> Open
          </span>
          <span>
            <kbd>ESC</kbd> Close
          </span>
        </div>
      </section>
    </div>
  );
}
