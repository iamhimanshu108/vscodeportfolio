import "./EducationPage.css";
import {
  ArrowUpRight,
  CalendarDays,
  GraduationCap,
  MapPin,
} from "lucide-react";
import { motion } from "framer-motion";
import { education } from "../data/educationData.js";
import { useMotionVariants } from "../motion.js";

export function EducationPage() {
  const variants = useMotionVariants();

  return (
    <motion.section
      className="education-page"
      variants={variants.stagger}
      initial="hidden"
      animate="visible"
    >
      <motion.header className="education-page-header" variants={variants.item}>
        <div>
          <h1 className="education-document-heading">
            Education<span>.</span>
          </h1>
        </div>
        <span className="education-count">
          {String(education.length).padStart(2, "0")} records
        </span>
      </motion.header>

      <motion.div className="education-timeline" variants={variants.stagger}>
        {education.map((item) => {
          const isCurrent = item.status !== "Completed";

          return (
            <motion.article
              className="education-entry"
              variants={variants.item}
              whileHover={variants.reduced ? undefined : { y: -2 }}
              key={item.id}
            >
              <div className="education-timeline-marker" aria-hidden="true">
                <span className={isCurrent ? "is-current" : ""} />
              </div>
              <div className="education-card">
                <div className="education-card-topline">
                  <span className="education-degree-icon" aria-hidden="true">
                    <GraduationCap size={16} />
                  </span>
                  <span
                    className={`education-status ${isCurrent ? "is-current" : ""}`}
                  >
                    {item.status}
                  </span>
                </div>
                <h2 className="education-degree">{item.degree}</h2>
                <a
                  className="education-institution"
                  href={item.institutionUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span>{item.institution}</span>
                  <ArrowUpRight size={14} aria-hidden="true" />
                </a>
                <div className="education-meta">
                  <span>
                    <CalendarDays size={14} aria-hidden="true" />
                    {item.period}
                  </span>
                  <span>
                    <MapPin size={14} aria-hidden="true" />
                    {item.location}
                  </span>
                </div>
                <ul className="education-highlights">
                  {item.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
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
