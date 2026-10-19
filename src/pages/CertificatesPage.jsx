import "./CertificatesPage.css";
import { Award, CalendarDays, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { certificates } from "../data/certificatesData.js";
import { useMotionVariants } from "../motion.js";

export function CertificatesPage() {
  const variants = useMotionVariants();

  return (
    <motion.section
      className="certificates-page"
      variants={variants.stagger}
      initial="hidden"
      animate="visible"
    >
      <motion.header
        className="certificates-page-header"
        variants={variants.item}
      >
        <div className="certificates-heading-copy">
          <h1 className="certificates-title">
            Certificates<span>.</span>
          </h1>
          <p className="certificates-intro">
            Courses and credentials that reflect my ongoing learning.
          </p>
        </div>
        <div
          className="certificates-count"
          aria-label={`${certificates.length} certificates`}
        >
          <strong>{String(certificates.length).padStart(2, "0")}</strong>
          <span>CERTIFICATES</span>
        </div>
      </motion.header>

      <motion.div className="certificates-grid" variants={variants.stagger}>
        {certificates.map((certificate, index) => (
          <motion.article
            className="certificate-card"
            variants={variants.item}
            whileHover={variants.reduced ? undefined : { y: -4 }}
            transition={{ duration: 0.18 }}
            key={certificate.id}
          >
            <div className="certificate-card-topline">
              <span className="certificate-card-icon"><Award size={16} /></span>
              <span className="certificate-card-index">{String(index + 1).padStart(2, "0")}</span>
              <span className="certificate-card-status">VERIFIED LEARNING</span>
            </div>
            <h2>{certificate.title}</h2>
            <div className="certificate-card-meta">
              <span>{certificate.issuer}</span>
              <span><CalendarDays size={13} aria-hidden="true" /> {certificate.issueDate}</span>
            </div>
            <p>{certificate.description}</p>
            <div className="certificate-card-skills" aria-label="Skills covered">
              {certificate.skills.map((skill) => <span key={skill}>{skill}</span>)}
            </div>
            {certificate.credentialId && (
              <div className="certificate-credential-id">
                <span>CREDENTIAL ID</span>
                <code>{certificate.credentialId}</code>
              </div>
            )}
            <a
              className="certificates-link"
              href={certificate.certificateUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={`View ${certificate.title}`}
            >
              Open credential <ExternalLink size={14} aria-hidden="true" />
            </a>
          </motion.article>
        ))}
      </motion.div>
    </motion.section>
  );
}
