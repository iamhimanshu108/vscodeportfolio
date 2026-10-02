import { Braces, Code2, Database, GitBranch, Layers3, Server, Sparkles } from "lucide-react";
import { skills } from "../data/portfolio.js";

export function SkillsPage() {
  return (
    <section className="portfolio-page skills-page">
      <h1>
        Skills<span className="title-period">.</span>
      </h1>
      <div className="skills-grid">
        {skills.map((category, index) => (
          <section className="skill-group" key={category.id}>
            <div className="skill-group-heading text-[11px]">
              <span className="skill-group-icon">
                {index % 2 ? <Layers3 size={15} /> : <Code2 size={15} />}
              </span>
              <h2>{category.title}</h2>
            </div>
            <div className="tag-list">
              {category.items.map((item) => (
                <span key={item}>
                  {index === 2 ? <Database size={11} /> : index === 1 ? <Server size={11} /> : index === 3 ? <GitBranch size={11} /> : index === 4 ? <Sparkles size={11} /> : <Braces size={11} />}
                  {item}
                </span>
              ))}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}
