import "./ProjectsPage.css";
import "./PortfolioPages.css";
import { ArrowUpRight, ExternalLink, GitBranch } from "lucide-react";
import { motion } from "framer-motion";
import { projects } from "../data/projectsData.js";
import { useMotionVariants } from "../motion.js";

export function ProjectsPage() {
  const variants = useMotionVariants();
  return (
    <motion.section
      className="projects-page"
      variants={variants.stagger}
      initial="hidden"
      animate="visible"
    >
      <motion.header className="projects-heading" variants={variants.item}>
        <div className="projects-heading-copy">
          <h1>
            Things I’ve built<span>.</span>
          </h1>
        </div>
        <div
          className="projects-count"
          aria-label={`${projects.length} projects`}
        >
          <strong>{String(projects.length).padStart(2, "0")}</strong>
          <span>PROJECTS</span>
        </div>
      </motion.header>

      <motion.div className="projects-grid" variants={variants.item}>
        {projects.map((project, index) => (
          <motion.article
            className="project-card"
            variants={variants.item}
            whileHover={variants.reduced ? undefined : { y: -5 }}
            key={project.id}
          >
            <div className="project-preview">
              <img
                src={project.imageUrl}
                alt={`${project.title} project preview`}
                loading="lazy"
                onError={(event) => {
                  event.currentTarget.style.opacity = "0";
                }}
              />
              <div className="project-preview-overlay">
                <span className="project-index">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="project-file-name">{project.fileName}</span>
              </div>
            </div>
            <div className="project-card-body">
              <div className="project-meta">
                <i aria-hidden="true" />
                <span>{project.status}</span>
              </div>
              <h2>{project.title}</h2>
              <p className="project-description">{project.description}</p>
              <div className="project-tech" aria-label="Technologies">
                {project.technologies.map((technology) => (
                  <span key={technology}>{technology}</span>
                ))}
              </div>
              <div className="project-links">
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`View ${project.title} source on GitHub`}
                >
                  <GitBranch size={14} aria-hidden="true" />
                  <span>Source</span>
                  <ArrowUpRight size={13} aria-hidden="true" />
                </a>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`View ${project.title} live`}
                  >
                    <ExternalLink size={14} aria-hidden="true" />
                    <span>Live</span>
                    <ArrowUpRight size={13} aria-hidden="true" />
                  </a>
                )}
              </div>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </motion.section>
  );
}
