import "./ExperiencePage.css";
import { BriefcaseBusiness, CalendarDays } from "lucide-react";
import { motion } from "framer-motion";
import { experience } from "../data/experienceData.js";
import { useMotionVariants } from "../motion.js";

export function ExperiencePage() {
  const variants = useMotionVariants();

  return (
    <motion.section
      className="experience-page"
      variants={variants.stagger}
      initial="hidden"
      animate="visible"
    >
      <motion.header
        className="experience-page-header"
        variants={variants.item}
      >
        <div>
          <h1 className="experience-document-heading">
            Experience<span>.</span>
          </h1>
        </div>
        <span className="experience-count">
          {String(experience.length).padStart(2, "0")} roles
        </span>
      </motion.header>

      <motion.div className="experience-timeline" variants={variants.stagger}>
        {experience.map((item) => {
          const isCurrent = item.period.toLowerCase().includes("present");

          return (
            <motion.article
              className="experience-entry"
              variants={variants.item}
              whileHover={variants.reduced ? undefined : { y: -3 }}
              key={item.id}
            >
              <div className="experience-timeline-marker" aria-hidden="true">
                <span className={isCurrent ? "is-current" : ""} />
              </div>
              <div className="experience-card">
                <div className="experience-card-topline">
                  <div className="experience-company">
                    <span className="experience-company-icon">
                      <BriefcaseBusiness size={16} aria-hidden="true" />
                    </span>
                    <span>{item.company}</span>
                  </div>
                  <span
                    className={`experience-status ${isCurrent ? "is-current" : ""}`}
                  >
                    {isCurrent ? "CURRENT" : "PAST ROLE"}
                  </span>
                </div>
                <h2 className="experience-role">{item.role}</h2>
                <p className="experience-period">
                  <CalendarDays size={14} aria-hidden="true" />
                  <span>{item.period}</span>
                </p>
                <ul className="experience-highlights">
                  {item.highlights.map((highlight, highlightIndex) => (
                    <li key={`${item.id}-${highlightIndex}`}>{highlight}</li>
                  ))}
                </ul>
              </div>
            </motion.article>
          );
        })}
      </motion.div>
    </motion.section>
  );
}
