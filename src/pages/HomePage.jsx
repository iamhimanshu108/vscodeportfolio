import "./HomePage.css";
import "./PortfolioPages.css";
import { useRef } from "react";
import { ArrowDownRight, ArrowUpRight, Braces, Download } from "lucide-react";
import { motion } from "framer-motion";
import { homeContent } from "../data/homeData.js";
import { profile } from "../data/profileData.js";
import { useMotionVariants } from "../motion.js";

export function HomePage({ onOpenDocument }) {
  const variants = useMotionVariants();
  const terminalRef = useRef(null);
  const lines = [
    <><span className="text-[#d2a0c7]">export const</span> <span className="text-[#9bc6ee]">profile</span> <span className="text-[#7d8790]">=</span> <span className="text-[#e0bd75]">&#123;</span></>,
    <><span className="text-[#a6c9e7]">name</span><span className="text-[#7d8790]">:</span> <span className="text-[#d6ac86]">'{profile.name}'</span><span className="text-[#7d8790]">,</span></>,
    <><span className="text-[#a6c9e7]">type</span><span className="text-[#7d8790]">:</span> <span className="text-[#d6ac86]">'{homeContent.preview.kind}'</span><span className="text-[#7d8790]">,</span></>,
    <><span className="text-[#a6c9e7]">status</span><span className="text-[#7d8790]">:</span> <span className="text-[#d6ac86]">'{homeContent.preview.status}'</span></>,
    <span className="text-[#e0bd75]">&#125;</span>,
  ];
  return (
    <motion.div className="home-page" variants={variants.stagger} initial="hidden" animate="visible">
      <div className="home-hero-grid">
        <motion.section className="home-hero-copy" variants={variants.item}>
          <h1 className="home-name link">{profile.name}<span>.</span></h1>
          <p className="home-intro">{homeContent.intro}</p>
          <motion.div className="home-experience-pill" variants={variants.item} initial="hidden" animate="visible">
            <span className="home-experience-value">2+</span>
            <span className="home-experience-copy">Years of experience</span>
          </motion.div>
          <div className="home-focus-list" aria-label="Areas of focus">
            {profile.focusAreas.map((focus) => <span key={focus}>{focus}</span>)}
          </div>
          <div className="home-actions">
            <button className="home-primary-action" onClick={() => onOpenDocument("projects")}>
              Explore projects <ArrowDownRight size={15} aria-hidden="true" />
            </button>
            <a className="home-secondary-action" href={profile.resumeUrl} target="_blank" rel="noreferrer">
              <Download size={14} aria-hidden="true" /> Resume <ArrowUpRight size={13} aria-hidden="true" />
            </a>
          </div>
        </motion.section>
        <motion.aside
          ref={terminalRef}
          className="terminal-preview"
          variants={variants.item}
          aria-label="Developer profile code preview"
          onPointerMove={(event) => {
            const card = terminalRef.current;
            if (!card || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
            const bounds = card.getBoundingClientRect();
            const x = event.clientX - bounds.left;
            const y = event.clientY - bounds.top;
            const rotateY = (x / bounds.width - 0.5) * 20;
            const rotateX = -(y / bounds.height - 0.5) * 20;
            card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
          }}
          onPointerLeave={() => {
            if (terminalRef.current) terminalRef.current.style.transform = "perspective(600px) rotateX(0deg) rotateY(0deg)";
          }}
        >
          <div className="terminal-preview-bar">
            <div className="terminal-window-controls" aria-hidden="true"><i /><i /><i /></div>
            <span className="terminal-preview-tab"><span />{homeContent.preview.fileName}</span>
            <Braces size={15} aria-hidden="true" />
          </div>
          <div className="terminal-preview-code">
            <div className="terminal-code-context"><span>1</span><span className="syntax-comment">// a little about me</span></div>
            {lines.map((line, index) => (
              <motion.div
                className="terminal-code-line"
                key={index}
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: variants.reduced ? 0 : 0.28, delay: variants.reduced ? 0 : index * 0.12 }}
              >
                <span>{index + 2}</span>
                <code>{line}</code>
              </motion.div>
            ))}
            <div className="terminal-code-context"><span>7</span><span className="terminal-cursor" /></div>
          </div>
          <div className="terminal-preview-footer">
            <span><i /> {homeContent.preview.language}</span>
            <span>{homeContent.preview.encoding}</span>
          </div>
        </motion.aside>
      </div>
    </motion.div>
  );
}
