import { ArrowUpRight, ExternalLink, GitBranch } from "lucide-react";
import { motion } from "framer-motion";
import { projects } from "../data/portfolio.js";
import { useMotionVariants } from "../motion.js";

export function ProjectsPage() {
  const variants = useMotionVariants();
  return <motion.section className="projects-page" variants={variants.stagger} initial="hidden" animate="visible">
    <motion.div className="projects-heading" variants={variants.item}><div><p className="projects-kicker">SELECTED WORK / 2025—26</p><h1>Projects<span className="text-[var(--accent)]">.</span></h1></div><span>{String(projects.length).padStart(2, "0")} projects</span></motion.div>
    <div className="projects-grid">{projects.map((project, index) => <motion.article className="project-card" variants={variants.item} whileHover={variants.reduced ? undefined : { y: -5 }} whileFocus={variants.reduced ? undefined : { y: -3 }} key={project.id} tabIndex="0">
      <div className="project-preview"><img src={project.imageUrl} alt={`${project.title} project preview`} loading="lazy" onError={(event) => { event.currentTarget.style.opacity = "0"; }} /><div className="project-preview-overlay"><span>0{index + 1}</span><span>{project.fileName}</span></div></div>
      <div className="project-card-body"><div className="project-meta"><span>{project.status}</span><i /></div><h2>{project.title}</h2><p>{project.description}</p><div className="project-tech">{project.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div><div className="project-links"><a href={project.repoUrl} target="_blank" rel="noreferrer"><GitBranch size={14} /> Source <ArrowUpRight size={13} /></a>{project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer"><ExternalLink size={14} /> Live <ArrowUpRight size={13} /></a>}</div></div>
    </motion.article>)}</div>
  </motion.section>;
}
