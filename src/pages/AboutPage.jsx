import "./AboutPage.css";
import { BriefcaseBusiness, GraduationCap, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { aboutContent } from "../data/aboutData.js";
import { education } from "../data/educationData.js";
import { experience } from "../data/experienceData.js";
import { profile } from "../data/profileData.js";
import { useMotionVariants } from "../motion.js";

export function AboutPage() {
  const variants = useMotionVariants();
  const currentRole = experience[0];
  const currentEducation = education[0];
  const previousEducation = education[1];

  return (
    <motion.article
      className="about-markdown-preview"
      variants={variants.stagger}
      initial="hidden"
      animate="visible"
    >
      <motion.header className="about-hero" variants={variants.item}>
        <div className="about-hero-copy">
          <h1>
            Who Am I<span>.</span>
          </h1>
          <p className="about-markdown-summary">{profile.resumeSummary}</p>
          <p className="about-markdown-location">
            <MapPin size={15} aria-hidden="true" />
            <span>{profile.location}</span>
          </p>
        </div>
        <aside className="about-hero-aside" aria-label="Profile overview">
          <span className="about-hero-aside-label">
            CURRENTLY BUILDING WITH
          </span>
          <ul className="about-stack-list">
            {aboutContent.stack.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </aside>
      </motion.header>
      <motion.section className="about-section" variants={variants.item}>
        <div className="about-section-heading">
          <span>01</span>
          <h2>What I work on</h2>
        </div>
        <p>{aboutContent.workSummary}</p>
        <p className="about-markdown-specialization">
          {aboutContent.specialization}
        </p>
      </motion.section>
      <motion.section className="about-section" variants={variants.item}>
        <div className="about-section-heading">
          <span>02</span>
          <h2>Experience &amp; education</h2>
        </div>
        <div className="about-markdown-columns">
          <div className="about-markdown-card">
            <div className="about-card-icon">
              <BriefcaseBusiness size={17} aria-hidden="true" />
            </div>
            <p className="about-card-label">CURRENT ROLE</p>
            <h3>{currentRole.role}</h3>
            <p className="about-markdown-meta">
              {currentRole.company} <span>/</span> {currentRole.period}
            </p>
            <p>{currentRole.highlights[0]}</p>
          </div>
          <div className="about-markdown-card">
            <div className="about-card-icon">
              <GraduationCap size={18} aria-hidden="true" />
            </div>
            <p className="about-card-label">EDUCATION</p>
            <h3>{currentEducation.degree}</h3>
            <p className="about-markdown-meta">
              {currentEducation.institution} <span>/</span>{" "}
              {currentEducation.period}
            </p>
            <p className="about-previous-education">
              <span>Previously</span>
              {previousEducation.degree} · {previousEducation.institution}{" "}
              <span>/</span> {previousEducation.period}
            </p>
          </div>
        </div>
      </motion.section>
      <motion.section
        className="about-section about-focus-section"
        variants={variants.item}
      >
        <div className="about-section-heading">
          <span>03</span>
          <h2>Areas of focus</h2>
        </div>
        <ul className="about-focus-list">
          {profile.focusAreas.map((focus) => (
            <li key={focus}>{focus}</li>
          ))}
        </ul>
        <motion.div
          className="about-closing-frame"
          initial={
            variants.reduced
              ? { opacity: 0 }
              : { opacity: 0, y: 12, scale: 0.99 }
          }
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: variants.reduced ? 0.18 : 0.45,
            delay: variants.reduced ? 0 : 0.2,
          }}
        >
          <motion.span
            className="about-closing-accent"
            aria-hidden="true"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{
              duration: variants.reduced ? 0 : 0.55,
              delay: variants.reduced ? 0 : 0.3,
            }}
          />
          <p className="about-markdown-closing">
            <span aria-hidden="true">“</span>
            {aboutContent.closing}
          </p>
        </motion.div>
      </motion.section>
    </motion.article>
  );
}
