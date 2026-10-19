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
  const navigationLockRef = useRef(false);
  const touchStartYRef = useRef(null);
  const wheelDeltaRef = useRef(0);
  const wheelResetTimeoutRef = useRef(null);
  const scrollDirection = 1;
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

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement) return undefined;
    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const isInteractiveTarget = (target) => target instanceof Element && target.closest("a, button, input, textarea, select, [contenteditable=\"true\"]");
    const atTop = () => scrollElement.scrollTop <= 2;
    const atBottom = () => scrollElement.scrollTop + scrollElement.clientHeight >= scrollElement.scrollHeight - 2;
    const navigate = (direction, event) => {
      if (navigationLockRef.current) return;
      navigationLockRef.current = true;
      wheelDeltaRef.current = 0;
      event?.preventDefault();
      if (direction > 0) onNextDocument();
      else onPreviousDocument();
      window.setTimeout(() => {
        navigationLockRef.current = false;
      }, reducedMotion ? 180 : 760);
    };
    const onWheel = (event) => {
      if (isCoarsePointer || isInteractiveTarget(event.target)) return;
      wheelDeltaRef.current += event.deltaY;
      if (wheelResetTimeoutRef.current) window.clearTimeout(wheelResetTimeoutRef.current);
      wheelResetTimeoutRef.current = window.setTimeout(() => {
        wheelDeltaRef.current = 0;
      }, 180);
      if (Math.abs(wheelDeltaRef.current) < 48) return;
      const movingDown = wheelDeltaRef.current > 0;
      if ((movingDown && atBottom()) || (!movingDown && atTop())) {
        navigate(movingDown ? 1 : -1, event);
      }
    };
    const onTouchStart = (event) => {
      if (event.touches.length === 1) touchStartYRef.current = event.touches[0].clientY;
    };
    const onTouchEnd = (event) => {
      if (touchStartYRef.current === null || isInteractiveTarget(event.target)) return;
      const deltaY = touchStartYRef.current - (event.changedTouches[0]?.clientY ?? touchStartYRef.current);
      touchStartYRef.current = null;
      if (Math.abs(deltaY) < 60) return;
      if ((deltaY > 0 && atBottom()) || (deltaY < 0 && atTop())) navigate(deltaY > 0 ? 1 : -1);
    };
    scrollElement.addEventListener("wheel", onWheel, { passive: false });
    scrollElement.addEventListener("touchstart", onTouchStart, { passive: true });
    scrollElement.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      scrollElement.removeEventListener("wheel", onWheel);
      scrollElement.removeEventListener("touchstart", onTouchStart);
      scrollElement.removeEventListener("touchend", onTouchEnd);
      if (wheelResetTimeoutRef.current) window.clearTimeout(wheelResetTimeoutRef.current);
    };
  }, [onNextDocument, onPreviousDocument, reducedMotion, selectedId]);

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
        <AnimatePresence mode="wait" initial={false} custom={scrollDirection}>
          <motion.article
            className="document-content"
            key={selectedId}
            custom={scrollDirection}
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
