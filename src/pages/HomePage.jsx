import { Braces, ChevronRight, FileText, FolderOpen, Mail } from "lucide-react";
import { documents, profile } from "../data/portfolio.js";

export function HomePage({ onOpenDocument }) {
  const pageDocuments = documents.filter((document) => document.id !== "home");
  return (
    <>
      <div className="code-intro">
        <span className="syntax-keyword">const</span>{" "}
        <span className="syntax-variable">developer</span>{" "}
        <span className="syntax-muted">=</span>{" "}
        <span className="syntax-brace">{"{"}</span>
      </div>
      <div className="intro-layout">
        <section className="intro-copy">
          <div className="eyebrow">
            <span className="live-dot" /> {profile.eyebrow}{" "}
            <span className="eyebrow-rule" />
          </div>
          <h1>
            {profile.name}
            <span className="title-period">.</span>
          </h1>
          <p className="intro-role">
            {profile.role} <span className="role-slash">/</span> Portfolio
          </p>
          <p className="intro-description">{profile.intro}</p>
          <div className="focus-list">
            {profile.focus.map((focus) => (
              <span key={focus}>{focus}</span>
            ))}
          </div>
          <div className="intro-actions">
            <button
              className="primary-action"
              onClick={() => onOpenDocument("projects")}
            >
              <FolderOpen size={15} /> Browse projects
            </button>
            <button
              className="secondary-action"
              onClick={() => onOpenDocument("about")}
            >
              <FileText size={15} /> About me
            </button>
          </div>
        </section>
        <div className="code-preview" aria-label="Portfolio profile object">
          <div className="code-preview-top">
            <div className="preview-dots">
              <i />
              <i />
              <i />
            </div>
            <span>{profile.preview.fileName}</span>
            <Braces size={15} />
          </div>
          <div className="code-preview-body">
            <div>
              <span className="line-number">01</span>
              <span className="syntax-keyword">export const</span>{" "}
              <span className="syntax-variable">profile</span>{" "}
              <span className="syntax-muted">=</span>{" "}
              <span className="syntax-brace">{"{"}</span>
            </div>
            <div>
              <span className="line-number">02</span>
              <span className="syntax-property">name</span>
              <span className="syntax-muted">:</span>{" "}
              <span className="syntax-string">'{profile.name}'</span>
              <span className="syntax-muted">,</span>
            </div>
            <div>
              <span className="line-number">03</span>
              <span className="syntax-property">type</span>
              <span className="syntax-muted">:</span>{" "}
              <span className="syntax-string">'{profile.preview.kind}'</span>
              <span className="syntax-muted">,</span>
            </div>
            <div>
              <span className="line-number">04</span>
              <span className="syntax-property">status</span>
              <span className="syntax-muted">:</span>{" "}
              <span className="syntax-string">'{profile.preview.status}'</span>
            </div>
            <div>
              <span className="line-number">05</span>
              <span className="syntax-brace">{"}"}</span>
            </div>
            <div className="code-cursor-row">
              <span className="line-number">06</span>
              <span className="cursor-block" />
            </div>
          </div>
          <div className="code-preview-foot">
            <span>
              <span className="preview-status-dot" /> {profile.preview.language}
            </span>
            <span>{profile.preview.encoding}</span>
          </div>
        </div>
      </div>
      <div className="home-divider">
        <span>{"}"}</span>
        <i />
      </div>
      <section className="browse-section">
        <div className="section-heading">
          <div>
            <span className="section-kicker">DIRECTORY</span>
            <h2>{profile.homeTitle}</h2>
          </div>
          <span className="section-count">
            {String(pageDocuments.length).padStart(2, "0")} documents
          </span>
        </div>
        <div className="document-grid">
          {pageDocuments.map((document, index) => (
            <button
              key={document.id}
              className="document-card"
              onClick={() => onOpenDocument(document.id)}
            >
              <span className={`document-icon icon-${document.type}`}>
                {document.type === "markdown" ? (
                  <FileText size={17} />
                ) : document.type === "mail" ? (
                  <Mail size={17} />
                ) : (
                  <Braces size={17} />
                )}
              </span>
              <span className="document-card-copy">
                <strong>{document.fileName}</strong>
                <span>{document.shortDescription}</span>
              </span>
              <span className="document-index">0{index + 1}</span>
              <ChevronRight size={15} className="document-arrow" />
            </button>
          ))}
        </div>
      </section>
      <div className="document-end">
        <span className="syntax-keyword">export default</span>{" "}
        <span className="syntax-variable">developer</span>
        <span className="syntax-muted">;</span>
        <span className="end-of-file">END OF FILE</span>
      </div>
    </>
  );
}
