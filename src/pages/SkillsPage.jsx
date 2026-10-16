import "./SkillsPage.css";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import CloudQueueIcon from "@mui/icons-material/CloudQueue";
import CodeIcon from "@mui/icons-material/Code";
import DnsIcon from "@mui/icons-material/Dns";
import GitHubIcon from "@mui/icons-material/GitHub";
import IntegrationInstructionsIcon from "@mui/icons-material/IntegrationInstructions";
import LayersIcon from "@mui/icons-material/Layers";
import StorageIcon from "@mui/icons-material/Storage";
import { motion } from "framer-motion";
import { skills } from "../data/skillsData.js";
import { useMotionVariants } from "../motion.js";

const categoryIcons = {
  "full-stack-engineering": LayersIcon,
  "ai-data": AutoAwesomeIcon,
  "devops-architecture": CloudQueueIcon,
  automation: IntegrationInstructionsIcon,
};

function getSkillIcon(item) {
  if (/^git$/i.test(item)) return GitHubIcon;
  if (/database|postgres|mongo|mysql|sql/i.test(item)) return StorageIcon;
  if (/python|fastapi|node|spring|api|backend/i.test(item)) return DnsIcon;
  if (/ai|gen|rag|llm|gemini/i.test(item)) return AutoAwesomeIcon;
  if (/docker|linux|ci\/cd|devops/i.test(item)) return LayersIcon;
  return CodeIcon;
}

export function SkillsPage() {
  const variants = useMotionVariants();
  return (
    <motion.section className="skills-document mx-auto w-full max-w-[900px] py-[17px] font-[var(--body)] text-[12px] text-[var(--text)] max-[760px]:pt-[13px] max-[520px]:py-[10px]" variants={variants.stagger} initial="hidden" animate="visible">
      <motion.div className="skills-code-open syntax-punctuation" variants={variants.item}>&#123;</motion.div>
      <motion.h1 className="skills-document-title" variants={variants.item}>
        <span className="syntax-keyword">const</span> Skills<span className="syntax-function">.</span>
      </motion.h1>
      <motion.div className="skills-grid" variants={variants.stagger}>
        {skills.map((category) => {
          const CategoryIcon = categoryIcons[category.id] ?? CodeIcon;
          return (
            <motion.section className="skills-group" variants={variants.item} key={category.id}>
              <div className="skills-group-heading">
                <span className="skills-category-icon"><CategoryIcon /></span>
                <h2>{category.title}</h2>
              </div>
              <div className="skills-chip-list">
                {category.items.map((item) => {
                  const SkillIcon = getSkillIcon(item);
                  return <motion.span className="skills-chip" whileHover={variants.reduced ? undefined : { y: -2 }} key={item}><SkillIcon />{item}</motion.span>;
                })}
              </div>
            </motion.section>
          );
        })}
      </motion.div>
      <motion.div className="skills-code-close syntax-punctuation" variants={variants.item}>&#125;</motion.div>
    </motion.section>
  );
}
