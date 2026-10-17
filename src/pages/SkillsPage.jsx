import "./SkillsPage.css";
import {
  BrainCircuit,
  Cloud,
  Code2,
  Gauge,
  Layers3,
  Network,
  PanelsTopLeft,
  PlugZap,
  Search,
  Sparkles,
  Workflow,
} from "lucide-react";
import {
  SiDocker,
  SiFastapi,
  SiGit,
  SiGithubactions,
  SiGoogleappsscript,
  SiJavascript,
  SiLangchain,
  SiLinux,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPython,
  SiReact,
  SiTypescript,
} from "react-icons/si";
import { motion } from "framer-motion";
import { skills } from "../data/skillsData.js";
import { useMotionVariants } from "../motion.js";

const categoryIcons = {
  "full-stack-engineering": Layers3,
  "ai-data": Sparkles,
  "devops-architecture": Cloud,
  automation: Workflow,
};

const skillIcons = {
  "MERN Stack": { Icon: SiMongodb, color: "#47a248" },
  React: { Icon: SiReact, color: "#61dafb" },
  "Next.js": { Icon: SiNextdotjs, color: "#ffffff" },
  "Node.js": { Icon: SiNodedotjs, color: "#5fa04e" },
  TypeScript: { Icon: SiTypescript, color: "#3178c6" },
  JavaScript: { Icon: SiJavascript, color: "#f7df1e" },
  "REST APIs": { Icon: PlugZap, color: "#e99a55" },
  Python: { Icon: SiPython, color: "#3776ab" },
  FastAPI: { Icon: SiFastapi, color: "#009688" },
  "Gen AI": { Icon: BrainCircuit, color: "#a78bfa" },
  "AI Integrations": { Icon: Sparkles, color: "#c084fc" },
  RAG: { Icon: Search, color: "#60a5fa" },
  LLMs: { Icon: SiLangchain, color: "#1c9b83" },
  Microservices: { Icon: Network, color: "#6db8ff" },
  PostgreSQL: { Icon: SiPostgresql, color: "#4169e1" },
  MongoDB: { Icon: SiMongodb, color: "#47a248" },
  MySQL: { Icon: SiMysql, color: "#4479a1" },
  Docker: { Icon: SiDocker, color: "#2496ed" },
  Git: { Icon: SiGit, color: "#f05032" },
  "CI/CD": { Icon: SiGithubactions, color: "#2088ff" },
  Linux: { Icon: SiLinux, color: "#fcc624" },
  "System Design": { Icon: Network, color: "#8b9eff" },
  "API Design": { Icon: PanelsTopLeft, color: "#62b7d8" },
  "Scalable Systems": { Icon: Gauge, color: "#8bcf9b" },
  Automation: { Icon: Workflow, color: "#8bcf9b" },
  "Workflow Design": { Icon: Workflow, color: "#77c997" },
  "API Integrations": { Icon: PlugZap, color: "#5fbfbd" },
  "Apps Script": { Icon: SiGoogleappsscript, color: "#4285f4" },
};

function getSkillIcon(item) {
  return skillIcons[item] ?? { Icon: Code2, color: null };
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
              </div>
              <ul className="skills-chip-list">
                {category.items.map((item) => {
                  const { Icon: SkillIcon, color } = getSkillIcon(item);
                  return (
                    <motion.li
                      className="skills-chip"
                      whileHover={variants.reduced ? undefined : { y: -2 }}
                      transition={{ duration: 0.18 }}
                      key={item}
                    >
                      <SkillIcon
                        size={14}
                        aria-hidden="true"
                        style={color ? { color } : undefined}
                      />
                      <span>{item}</span>
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
