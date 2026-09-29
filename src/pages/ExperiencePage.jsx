import { BriefcaseBusiness } from "lucide-react";
import { experience } from "../data/portfolio.js";

export function ExperiencePage() {
  return (
    <section className="portfolio-page experience-page">
      <div className="page-kicker">CAREER / EXPERIENCE</div>
      <h1>
        Experience<span className="title-period">.</span>
      </h1>
      <p className="page-lede">
        Work, internships, and the things built along the way.
      </p>
      <div className="experience-timeline">
        {experience.map((item) => (
          <article className="experience-entry" key={item.id}>
            <div className="timeline-marker">
              <BriefcaseBusiness size={14} />
            </div>
            <div className="experience-entry-head">
              <div>
                <h2>{item.role}</h2>
                <p>{item.company}</p>
              </div>
              <time>{item.period}</time>
            </div>
            <ul>
              {item.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
