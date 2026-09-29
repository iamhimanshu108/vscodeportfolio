import { FileTypeIcon } from "../components/FileTypeIcon.jsx";

export function DetailPage({ document }) {
  return (
    <section className="detail-document">
      <div className="detail-kicker">
        <FileTypeIcon type={document.type} />
        <span>PORTFOLIO / {document.fileName.toUpperCase()}</span>
      </div>
      <h1>
        {document.title}
        <span className="title-period">.</span>
      </h1>
      <p className="detail-description">{document.description}</p>
      <div className="detail-rule">
        <span />
        <i />
      </div>
      <div className="empty-state">
        <div className="empty-state-icon">
          <FileTypeIcon type={document.type} size={21} />
        </div>
        <div>
          <strong>{document.emptyTitle}</strong>
          <p>{document.emptyDescription}</p>
        </div>
      </div>
      <div className="detail-footnote">
        <span className="live-dot" /> {document.fileName}{" "}
        <span className="footnote-separator">·</span> Ready for content
      </div>
    </section>
  );
}
