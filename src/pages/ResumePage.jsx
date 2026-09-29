import { ArrowDownToLine, ArrowUpRight, FileText } from "lucide-react";
import { experience, profile, skills } from "../data/portfolio.js";

export function ResumePage() {
  const allSkills = skills
    .flatMap((category) => category.items)
    .filter((item, index, items) => items.indexOf(item) === index);
  return (
    <section className="portfolio-page resume-page">
      <div className="page-kicker">DOCUMENT / RESUME</div>
      <div className="resume-header">
        <div>
          <h1>
            Resume<span className="title-period">.</span>
          </h1>
          <p className="page-lede">
            A quick overview of experience and technical focus.
          </p>
        </div>
        <a
          className="primary-action"
          href={profile.resumeUrl}
          target="_blank"
          rel="noreferrer"
        >
          <ArrowDownToLine size={15} /> Open PDF
        </a>
      </div>
      <div className="resume-summary">
        <FileText size={17} />
        <p>{profile.resumeSummary}</p>
      </div>
      <div className="resume-columns">
        <section>
          <h2>Experience</h2>
          {experience.map((item) => (
            <div className="resume-role" key={item.id}>
              <strong>{item.role}</strong>
              <span>
                {item.company} / {item.period}
              </span>
            </div>
          ))}
        </section>
        <section>
          <h2>Technical focus</h2>
          <div className="tag-list">
            {allSkills.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </section>
      </div>
      <a
        className="github-more-link"
        href={profile.resumeUrl}
        target="_blank"
        rel="noreferrer"
      >
        View full resume <ArrowUpRight size={14} />
      </a>
    </section>
  );
}
