import { useState } from "react";
import {
  ArrowUpRight,
  GitBranch,
  Globe2,
  Network,
  Mail,
  Send,
} from "lucide-react";
import { profile } from "../data/portfolio.js";

const googleSheetsEndpoint = import.meta.env.VITE_GOOGLE_SHEETS_ENDPOINT;

const socialLinks = [
  {
    name: "GitHub",
    href: profile.githubUrl,
    Icon: GitBranch,
    detail: "Source and projects",
  },
  {
    name: "LinkedIn",
    href: profile.linkedinUrl,
    Icon: Network,
    detail: "Professional profile",
  },
  { name: "X", href: profile.xUrl, Icon: Send, detail: "Social profile" },
  {
    name: "Website",
    href: profile.website,
    Icon: Globe2,
    detail: "Personal website",
  },
];

export function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!googleSheetsEndpoint) {
      setSubmitStatus("Google Sheets submission is not configured yet.");
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);
    setIsSubmitting(true);
    setSubmitStatus("");

    try {
      await fetch(googleSheetsEndpoint, {
        method: "POST",
        mode: "no-cors",
        body: new URLSearchParams(
          [...formData.entries()].map(([key, value]) => [key, String(value)]),
        ),
      });
      form.reset();
      setSubmitStatus("Your message was sent to the contact form.");
    } catch {
      setSubmitStatus("Could not send your message. Please email directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="portfolio-page contact-page">
      <h1>
        Let's talk<span className="title-period">.</span>
      </h1>
      <div className="contact-layout">
        <section className="contact-panel contact-form-panel">
          <h2 id="contact-form-title">Send a message</h2>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="contact-form-fields">
              <label>
                Name
                <input name="name" type="text" autoComplete="name" required />
              </label>
              <label>
                Email
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                />
              </label>
              <label>
                Phone <span>(optional)</span>
                <input name="phone" type="tel" autoComplete="tel" />
              </label>
              <label className="contact-message-field">
                Message
                <textarea name="message" rows="5" required />
              </label>
            </div>
            <label className="contact-honeypot" aria-hidden="true">
              Website
              <input
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
              />
            </label>
            <button
              className="contact-submit"
              type="submit"
              disabled={isSubmitting}
            >
              <Mail size={16} /> {isSubmitting ? "Sending..." : "Send message"}
            </button>
            <p
              className="contact-submit-status"
              role="status"
              aria-live="polite"
            >
              {submitStatus}
            </p>
          </form>
        </section>
        <aside
          className="contact-panel contact-details-panel"
          aria-label="Contact details"
        >
          <h2>Contact details</h2>
          <a className="contact-email" href={`mailto:${profile.email}`}>
            <span className="contact-icon">
              <Mail size={17} />
            </span>
            <span>
              <small>EMAIL</small>
              <strong>{profile.email}</strong>
            </span>
            <ArrowUpRight size={16} />
          </a>
          <div className="social-links">
            {socialLinks.map(({ name, href, Icon, detail }) => (
              <a
                className="social-link"
                href={href}
                target="_blank"
                rel="noreferrer"
                key={name}
              >
                <Icon size={17} />
                <span>
                  <strong>{name}</strong>
                  <small>{detail}</small>
                </span>
                <ArrowUpRight size={13} className="social-arrow" />
              </a>
            ))}
          </div>
          <div className="contact-resume">
            <span>Want a concise overview?</span>
            <a href={profile.resumeUrl} target="_blank" rel="noreferrer">
              Open resume <ArrowUpRight size={13} />
            </a>
          </div>
        </aside>
      </div>
    </section>
  );
}
