import "./SkillsPage.css";
import {
  Atom,
  Box,
  Braces,
  BrainCircuit,
  Cloud,
  Code2,
  Database,
  FileCode2,
  Gauge,
  GitBranch,
  Layers3,
  Network,
  PanelsTopLeft,
  PlugZap,
  Search,
  Server,
  Sparkles,
  Terminal,
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
  if (/^react$/i.test(item)) return Atom;
  if (/^next\.js$/i.test(item)) return PanelsTopLeft;
  if (/typescript|javascript/i.test(item)) return Braces;
  if (/^git$/i.test(item)) return GitBranch;
  if (/database|postgres|mongo|mysql|sql/i.test(item)) return Database;
  if (/rag/i.test(item)) return Search;
  if (/ai|gen|llm|gemini/i.test(item)) return BrainCircuit;
  if (/integration|rest api|api design/i.test(item)) return PlugZap;
  if (/microservices|system design/i.test(item)) return Network;
  if (/scalable/i.test(item)) return Gauge;
  if (/python|linux/i.test(item)) return Terminal;
  if (/node|fastapi|backend/i.test(item)) return Server;
  if (/docker/i.test(item)) return Box;
  if (/ci\/cd|automation|workflow/i.test(item)) return Workflow;
  if (/apps script/i.test(item)) return FileCode2;
  if (/mern|stack/i.test(item)) return Layers3;
  return Code2;
}

const categoryAccents = {
  "full-stack-engineering": "mint",
  "ai-data": "blue",
  "devops-architecture": "gold",
  automation: "green",
};

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
          <h1 className="skills-document-title">
            Skills<span>.</span>
          </h1>
        </div>
      </motion.header>
      <motion.div className="skills-grid" variants={variants.stagger}>
        {skills.map((category, categoryIndex) => {
          const CategoryIcon = categoryIcons[category.id] ?? Code2;
          return (
            <motion.section
              className={`skills-group skills-group--${categoryAccents[category.id] ?? "mint"}`}
              variants={variants.item}
              key={category.id}
            >
              <div className="skills-group-header">
                <span className="skills-category-icon" aria-hidden="true">
                  <CategoryIcon size={18} />
                </span>
                <div className="skills-group-heading">
                  <span className="skills-group-index">
                    {String(categoryIndex + 1).padStart(2, "0")}
                  </span>
                  <h2>{category.title}</h2>
                </div>
                <span
                  className="skills-item-count"
                  aria-label={`${category.items.length} skills`}
                >
                  {String(category.items.length).padStart(2, "0")}
                </span>
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
