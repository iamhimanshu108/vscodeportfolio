import "./EditorWorkspace.css";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Command, PanelBottom, ChevronRight, X } from "lucide-react";
import { documents } from "../data/navigationData.js";
import { PageRenderer } from "./PageRenderer.jsx";
import { FileTypeIcon } from "./FileTypeIcon.jsx";
import { motionEase } from "../motion.js";

export function EditorWorkspace({
  selectedId,
  selectedDocument,
  openTabs,
  onSelectDocument,
  onOpenDocument,
  onCloseTab,
  onOpenPalette,
  onToggleOutput,
  onPreviousDocument,
  onNextDocument,
  children,
}) {
  const scrollRef = useRef(null);
  const reducedMotion = useReducedMotion();
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0, behavior: "auto" });
  }, [selectedId]);

  useEffect(() => {
    const activeTab = document.querySelector('.editor-tabs [role="tab"][aria-selected="true"]');
    activeTab?.scrollIntoView({ inline: "nearest", block: "nearest", behavior: "smooth" });
  }, [selectedId, openTabs.length]);

  useEffect(() => {
    const content = document.querySelector(".document-content");
    if (!content) return undefined;
    const sections = content.querySelectorAll(":scope > section, :scope > div > section, :scope > section > article, :scope > section > section");
    sections.forEach((section) => section.classList.add("section-reveal"));
    if (reducedMotion || !("IntersectionObserver" in window)) {
      sections.forEach((section) => section.classList.add("is-in-view"));
      return undefined;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in-view");
          observer.unobserve(entry.target);
        }
      });
    }, { root: scrollRef.current, threshold: 0.12 });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [selectedId, reducedMotion]);

  const pageVariants = {
    initial: (direction) => ({
      opacity: 0,
      y: reducedMotion ? 0 : direction > 0 ? 18 : -18,
    }),
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reducedMotion ? 0.12 : 0.42,
        ease: motionEase,
      },
    },
    exit: (direction) => ({
      opacity: 0,
      y: reducedMotion ? 0 : direction > 0 ? -12 : 12,
      transition: {
        duration: reducedMotion ? 0.08 : 0.28,
        ease: motionEase,
      },
    }),
  };

  return (
    <main className="editor-workspace">
      <div className="editor-tabs" role="tablist" aria-label="Open files">
        {openTabs.map((id) => {
          const document = documents.find((item) => item.id === id);
          if (!document) return null;
          return (
            <motion.div className="tab-shell" layout key={id}>
              <button
                role="tab"
                aria-selected={selectedId === id}
                className={`editor-tab text-[10px] ${selectedId === id ? "is-current" : ""}`}
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
            </motion.div>
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
        <span className="breadcrumb-navigation">
          <button className="icon-button" onClick={onPreviousDocument} aria-label="Previous document" title="Previous document"><ChevronRight size={12} className="rotate-180" /></button>
          <button className="icon-button" onClick={onNextDocument} aria-label="Next document" title="Next document"><ChevronRight size={12} /></button>
        </span>
      </div>
      <div className="editor-scroll" ref={scrollRef}>
        <div className="line-gutter" aria-hidden="true">
          {Array.from({ length: 12 }, (_, index) => (
            <span key={index}>{index + 1}</span>
          ))}
        </div>
        <AnimatePresence mode="wait" initial={false} custom={1}>
          <motion.article
            className="document-content"
            key={selectedId}
            custom={1}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <PageRenderer pageId={selectedId} onOpenDocument={onOpenDocument} />
          </motion.article>
        </AnimatePresence>
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
