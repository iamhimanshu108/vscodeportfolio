import { Code2, Layers3 } from "lucide-react";
import { skills } from "../data/portfolio.js";

export function SkillsPage() {
  return (
    <section className="portfolio-page skills-page">
      <div className="page-kicker">TOOLKIT / SKILLS</div>
      <h1>
        Skills<span className="title-period">.</span>
      </h1>
      <p className="page-lede">
        Technologies and disciplines used across my work.
      </p>
      <div className="skills-grid">
        {skills.map((category, index) => (
          <section className="skill-group" key={category.id}>
            <div className="skill-group-heading">
              <span className="skill-group-icon">
                {index % 2 ? <Layers3 size={15} /> : <Code2 size={15} />}
              </span>
              <h2>{category.title}</h2>
            </div>
            <div className="tag-list">
              {category.items.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}
