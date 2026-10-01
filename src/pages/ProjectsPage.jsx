import { ArrowUpRight, ExternalLink, GitBranch } from "lucide-react";
import { projects } from "../data/portfolio.js";

export function ProjectsPage() {
  return (
    <section className="portfolio-page projects-page">
      <div className="page-heading-row">
        <div>
          <h1>
            Projects<span className="title-period">.</span>
          </h1>
        </div>
        <span className="page-count">
          {String(projects.length).padStart(2, "0")} projects
        </span>
      </div>
      <div className="project-grid">
        {projects.map((project, index) => (
          <article className="project-card" key={project.id}>
            <div className="project-card-top">
              <span className="project-number">0{index + 1}</span>
              <span className="project-status">
                <span />
                {project.status}
              </span>
            </div>
            <h2>{project.title}</h2>
            <p>{project.description}</p>
            <div className="tag-list">
              {project.technologies.map((technology) => (
                <span key={technology}>{technology}</span>
              ))}
            </div>
            <a
              className="project-link"
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
            >
              <GitBranch size={14} /> View source <ArrowUpRight size={13} />
            </a>
          </article>
        ))}
      </div>
      <a
        className="github-more-link"
        href="https://github.com/iamhimanshu108?tab=repositories"
        target="_blank"
        rel="noreferrer"
      >
        <ExternalLink size={14} /> Browse all repositories
      </a>
    </section>
  );
}
