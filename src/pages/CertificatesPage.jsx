import { ArrowUpRight, Award } from "lucide-react";
import { certificates } from "../data/portfolio.js";

export function CertificatesPage() {
  return (
    <section className="portfolio-page certificates-page">
      <div className="page-kicker">LEARNING / CERTIFICATES</div>
      <h1>
        Certificates<span className="title-period">.</span>
      </h1>
      <p className="page-lede text-[11px]">
        Courses and credentials across full-stack development and AI.
      </p>
      <div className="certificate-list">
        {certificates.map((certificate) => (
          <article className="certificate-entry" key={certificate.id}>
            <div className="certificate-icon">
              <Award size={18} />
            </div>
            <div className="certificate-content">
              <div className="certificate-heading">
                <div>
                  <h2>{certificate.title}</h2>
                  <p>
                    {certificate.issuer} <span>/</span> {certificate.issueDate}
                  </p>
                </div>
                <a
                  className="certificate-link"
                  href={certificate.certificateUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`View ${certificate.title}`}
                  title="View certificate"
                >
                  <ArrowUpRight size={15} />
                </a>
              </div>
              <p className="certificate-description text-[10px]">
                {certificate.description}
              </p>
              <div className="tag-list">
                {certificate.skills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
              {certificate.credentialId && (
                <p className="credential-id">
                  Credential ID <span>{certificate.credentialId}</span>
                </p>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
