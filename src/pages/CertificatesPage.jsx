import "./CertificatesPage.css";
import { ArrowUpRight, Code2 } from "lucide-react";
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

      <motion.div
        className="certificates-source"
        variants={variants.item}
      >
        <div className="certificates-source-bar">
          <span className="certificates-file-icon">
            <Code2 size={14} />
          </span>
          <span>certificates.js</span>
          <span className="certificates-source-mode">READ ONLY</span>
        </div>
        <motion.div className="certificates-code" variants={variants.stagger}>
          <div className="certificates-code-line">
            <span className="certificates-keyword">export const</span>{" "}
            <span className="certificates-identifier">certificates</span>{" "}
            <span className="certificates-operator">=</span>{" "}
            <span className="certificates-punctuation">[</span>
          </div>
          {certificates.map((certificate, index) => (
            <motion.article
              className="certificate-object"
              variants={variants.item}
              whileHover={variants.reduced ? undefined : { y: -2 }}
              transition={{ duration: 0.18 }}
              key={certificate.id}
            >
              <div className="certificates-code-line">
                <span className="certificates-indent"> </span>
                <span className="certificates-punctuation">{"{"}</span>
                <span className="certificate-object-index">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="certificate-object-body">
                <div className="certificates-code-line">
                  <span className="certificates-property">title:</span>{" "}
                  <span className="certificates-string">
                    "{certificate.title}"
                  </span>
                  <span className="certificates-punctuation">,</span>
                </div>
                <div className="certificates-code-line">
                  <span className="certificates-property">issuer:</span>{" "}
                  <span className="certificates-string">
                    "{certificate.issuer}"
                  </span>
                  <span className="certificates-punctuation">,</span>
                </div>
                <div className="certificates-code-line">
                  <span className="certificates-property">issued:</span>{" "}
                  <span className="certificates-string">
                    "{certificate.issueDate}"
                  </span>
                  <span className="certificates-punctuation">,</span>
                </div>
                <div className="certificates-code-line certificates-array-line">
                  <span className="certificates-property">skills:</span>{" "}
                  <span className="certificates-punctuation">[</span>
                  {certificate.skills.map((skill, skillIndex) => (
                    <span
                      className={`certificates-array-skill certificates-array-skill--${skillIndex % 4}`}
                      key={skill}
                    >
                      <span className="certificates-string">"{skill}"</span>
                      {skillIndex < certificate.skills.length - 1 && (
                        <span className="certificates-punctuation">, </span>
                      )}
                    </span>
                  ))}
                  <span className="certificates-punctuation">]</span>
                  <span className="certificates-punctuation">,</span>
                </div>
                {certificate.credentialId && (
                  <div className="certificates-code-line">
                    <span className="certificates-property">credentialId:</span>{" "}
                    <span className="certificates-string">
                      "{certificate.credentialId}"
                    </span>
                    <span className="certificates-punctuation">,</span>
                  </div>
                )}
                <div className="certificates-code-line certificates-description-line">
                  <span className="certificates-property">description:</span>{" "}
                  <span className="certificates-string">
                    "{certificate.description}"
                  </span>
                  <span className="certificates-punctuation">,</span>
                </div>
                <div className="certificates-code-line">
                  <span className="certificates-property">certificateUrl:</span>{" "}
                  <a
                    className="certificates-link"
                    href={certificate.certificateUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`View ${certificate.title}`}
                  >
                    <span className="certificates-string">
                      "open credential"
                    </span>
                    <ArrowUpRight size={13} aria-hidden="true" />
                  </a>
                  <span className="certificates-punctuation">,</span>
                </div>
              </div>
              <div className="certificates-code-line">
                <span className="certificates-indent"> </span>
                <span className="certificates-punctuation">{"}"}</span>
                {index < certificates.length - 1 && (
                  <span className="certificates-punctuation">,</span>
                )}
              </div>
            </motion.article>
          ))}
          <div className="certificates-code-line">
            <span className="certificates-punctuation">];</span>
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
