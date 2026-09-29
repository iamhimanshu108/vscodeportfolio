import { ArrowUpRight, GraduationCap } from "lucide-react";
import { education } from "../data/portfolio.js";

export function EducationPage() {
  return (
    <section className="portfolio-page education-page">
      <div className="page-kicker">BACKGROUND / EDUCATION</div>
      <h1>
        Education<span className="title-period">.</span>
      </h1>
      <p className="page-lede">Formal study and the work built alongside it.</p>
      <div className="education-list">
        {education.map((item) => (
          <article className="education-entry" key={item.id}>
            <div className="education-icon">
              <GraduationCap size={19} />
            </div>
            <div className="education-content">
              <div className="education-head">
                <div>
                  <h2>{item.degree}</h2>
                  <a
                    href={item.institutionUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {item.institution} <ArrowUpRight size={12} />
                  </a>
                </div>
                <span
                  className={`education-status ${item.status === "Completed" ? "is-complete" : ""}`}
                >
                  {item.status}
                </span>
              </div>
              <div className="education-meta">
                <span>{item.period}</span>
                <span>{item.location}</span>
              </div>
              <ul>
                {item.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
