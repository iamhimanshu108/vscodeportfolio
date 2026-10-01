import { Braces, Download, FileText } from "lucide-react";
import { profile } from "../data/portfolio.js";

export function HomePage({ onOpenDocument }) {
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
          <h1>
            {profile.name}
            <span className="title-period">.</span>
          </h1>
          <p className="intro-role">{profile.role}</p>
          <p className="intro-description">{profile.intro}</p>
          <div className="focus-list">
            {profile.focus.map((focus) => (
              <span key={focus}>{focus}</span>
            ))}
          </div>
          <div className="intro-actions">
            <a className="primary-action" href={profile.resumeUrl} target="_blank" rel="noreferrer">
              <Download size={15} /> Resume
            </a>
            <button className="secondary-action" onClick={() => onOpenDocument("about")}>
              <FileText size={15} /> Who Am I
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
      <div className="document-end">
        <span className="syntax-keyword">export default</span>{" "}
        <span className="syntax-variable">developer</span>
        <span className="syntax-muted">;</span>
        <span className="end-of-file">END OF FILE</span>
      </div>
    </>
  );
}
