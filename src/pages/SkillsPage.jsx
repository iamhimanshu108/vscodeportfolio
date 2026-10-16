import "./SkillsPage.css";
import {
  Cloud,
  Code2,
  Database,
  GitBranch,
  Layers3,
  Server,
  Sparkles,
  Workflow,
} from "lucide-react";
import { motion } from "framer-motion";
import { skills } from "../data/skillsData.js";
import { useMotionVariants } from "../motion.js";

const categoryIcons = {
  "full-stack-engineering": Layers3,
  "ai-data": Sparkles,
  "devops-architecture": Cloud,
  automation: Workflow,
};

function getSkillIcon(item) {
  if (/^git$/i.test(item)) return GitBranch;
  if (/database|postgres|mongo|mysql|sql/i.test(item)) return Database;
  if (/python|fastapi|node|spring|api|backend/i.test(item)) return Server;
  if (/ai|gen|rag|llm|gemini/i.test(item)) return Sparkles;
  if (/docker|linux|ci\/cd|devops/i.test(item)) return Layers3;
  return Code2;
}

export function SkillsPage() {
  const variants = useMotionVariants();
  return (
    <motion.section
      className="skills-document"
      variants={variants.stagger}
      initial="hidden"
      animate="visible"
    >
      <motion.header className="skills-page-header" variants={variants.item}>
        <div className="skills-heading-copy">
          <p className="skills-eyebrow"><span /> SKILLS.JS</p>
          <h1 className="skills-document-title">Skills<span>.</span></h1>
        </div>
      </motion.header>
      <motion.div className="skills-grid" variants={variants.stagger}>
        {skills.map((category, categoryIndex) => {
          const CategoryIcon = categoryIcons[category.id] ?? Code2;
          return (
            <motion.section className="skills-group" variants={variants.item} key={category.id}>
              <div className="skills-group-header">
                <span className="skills-category-icon" aria-hidden="true"><CategoryIcon size={18} /></span>
                <div className="skills-group-heading">
                  <span className="skills-group-index">{String(categoryIndex + 1).padStart(2, "0")}</span>
                  <h2>{category.title}</h2>
                </div>
                <span className="skills-item-count">{String(category.items.length).padStart(2, "0")}</span>
              </div>
              <ul className="skills-chip-list">
                {category.items.map((item, index) => {
                  const SkillIcon = getSkillIcon(item);
                  return (
                    <motion.li
                      className="skills-chip"
                      whileHover={variants.reduced ? undefined : { y: -2 }}
                      transition={{ duration: 0.18 }}
                      key={item}
                    >
                      <SkillIcon size={14} aria-hidden="true" />
                      <span>{item}</span>
                      <span className="skills-chip-index" aria-hidden="true">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </motion.li>
                  );
                })}
              </ul>
            </motion.section>
          );
        })}
      </motion.div>
    </motion.section>
  );
}
