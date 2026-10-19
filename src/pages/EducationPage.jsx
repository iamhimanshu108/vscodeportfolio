import "./EducationPage.css";
import "./CertificatesPage.css";
import {
  ArrowUpRight,
  CalendarDays,
  GraduationCap,
  MapPin,
  Award,
  CalendarDays as CertificateCalendar,
  ExternalLink,
} from "lucide-react";
import { motion } from "framer-motion";
import { education } from "../data/educationData.js";
import { certificates } from "../data/certificatesData.js";
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
      <motion.section className="education-certificates-section" variants={variants.item}>
        <div className="education-certificates-heading">
          <div>
            <h2>Certificates<span>.</span></h2>
          </div>
          <span className="education-count">{String(certificates.length).padStart(2, "0")} records</span>
        </div>
        <motion.div className="certificates-grid" variants={variants.stagger}>
          {certificates.map((certificate, index) => (
            <motion.article className="certificate-card" variants={variants.item} key={certificate.id}>
              <div className="certificate-card-topline">
                <span className="certificate-card-icon"><Award size={16} /></span>
                <span className="certificate-card-index">{String(index + 1).padStart(2, "0")}</span>
                <span className="certificate-card-status">VERIFIED LEARNING</span>
              </div>
              <h2>{certificate.title}</h2>
              <div className="certificate-card-meta">
                <span>{certificate.issuer}</span>
                <span><CertificateCalendar size={13} /> {certificate.issueDate}</span>
              </div>
              <p>{certificate.description}</p>
              <div className="certificate-card-skills" aria-label="Skills covered">
                {certificate.skills.map((skill) => <span key={skill}>{skill}</span>)}
              </div>
              {certificate.credentialId && <div className="certificate-credential-id"><span>CREDENTIAL ID</span><code>{certificate.credentialId}</code></div>}
              <a className="certificates-link" href={certificate.certificateUrl} target="_blank" rel="noreferrer" aria-label={`View ${certificate.title}`}>
                Open credential <ExternalLink size={14} />
              </a>
            </motion.article>
          ))}
        </motion.div>
      </motion.section>
    </motion.section>
  );
}
