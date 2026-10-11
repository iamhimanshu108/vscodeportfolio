import { Braces, Download, FileText } from "lucide-react";
import { motion } from "framer-motion";
import { profile } from "../data/portfolio.js";
import { useMotionVariants } from "../motion.js";

export function HomePage({ onOpenDocument }) {
  const variants = useMotionVariants();
  const lines = [
    <><span className="text-[#d2a0c7]">export const</span> <span className="text-[#9bc6ee]">profile</span> <span className="text-[#7d8790]">=</span> <span className="text-[#e0bd75]">&#123;</span></>,
    <><span className="text-[#a6c9e7]">name</span><span className="text-[#7d8790]">:</span> <span className="text-[#d6ac86]">'{profile.name}'</span><span className="text-[#7d8790]">,</span></>,
    <><span className="text-[#a6c9e7]">type</span><span className="text-[#7d8790]">:</span> <span className="text-[#d6ac86]">'{profile.preview.kind}'</span><span className="text-[#7d8790]">,</span></>,
    <><span className="text-[#a6c9e7]">status</span><span className="text-[#7d8790]">:</span> <span className="text-[#d6ac86]">'{profile.preview.status}'</span></>,
    <span className="text-[#e0bd75]">&#125;</span>,
  ];
  return <motion.div className="home-page" variants={variants.stagger} initial="hidden" animate="visible">
    <motion.div className="home-eyebrow" variants={variants.item}><span className="text-[#d2a0c7]">const</span> <span className="text-[#9bc6ee]">developer</span> <span className="text-[#7d8790]">=</span> <span className="text-[#e0bd75]">&#123;</span></motion.div>
    <div className="home-hero-grid">
      <motion.section className="home-hero-copy" variants={variants.item}>
        <p className="home-kicker">{profile.eyebrow}</p>
        <h1>{profile.name}<span className="text-[var(--accent)]">.</span></h1>
        <p className="home-role">{profile.role}</p>
        <p className="home-intro">{profile.intro}</p>
        <div className="home-focus-list">{profile.focus.map((focus) => <span key={focus}>{focus}</span>)}</div>
        <div className="home-actions">
          <a className="home-primary-action" href={profile.resumeUrl} target="_blank" rel="noreferrer"><Download size={15} /> Resume</a>
          <button className="home-secondary-action" onClick={() => onOpenDocument("about")}><FileText size={15} /> Who Am I</button>
        </div>
      </motion.section>
      <motion.div className="terminal-preview" variants={variants.item} aria-label="Portfolio profile object">
        <div className="terminal-preview-bar"><div className="terminal-dots"><i /><i /><i /></div><span>{profile.preview.fileName}</span><Braces size={15} /></div>
        <div className="terminal-preview-code">{lines.map((line, index) => <motion.div key={index} initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} transition={{ ...variants.reduced ? { duration: 0 } : { duration: 0.28 }, delay: variants.reduced ? 0 : index * 0.12 }}>{line}</motion.div>)}<div className="terminal-cursor-row"><span className="terminal-cursor" /></div></div>
        <div className="terminal-preview-footer"><span>{profile.preview.language}</span><span>{profile.preview.encoding}</span></div>
      </motion.div>
    </div>
    <motion.div className="home-divider" variants={variants.item}><span>&#125;</span><i /></motion.div>
    <motion.div className="home-footer" variants={variants.item}><span><span className="text-[#d2a0c7]">export default</span> <span className="text-[#9bc6ee]">developer</span><span className="text-[#7d8790]">;</span></span><span>END OF FILE</span></motion.div>
  </motion.div>;
}
