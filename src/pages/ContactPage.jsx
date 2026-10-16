import { useState } from "react";
import "./ContactPage.css";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { ArrowUpRight, Globe2, Mail } from "lucide-react";
import { contactLinks } from "../data/contactData.js";
import { profile } from "../data/profileData.js";

const web3FormsAccessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

const socialIcons = {
  github: FaGithub,
  linkedin: FaLinkedin,
  x: FaXTwitter,
  website: Globe2,
};

const socialLinks = contactLinks.map((link) => ({
  ...link,
  href: profile[link.profileField],
  Icon: socialIcons[link.icon],
}));

export function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!web3FormsAccessKey) {
      setSubmitStatus({
        type: "error",
        message: "Contact form is not configured yet.",
      });
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.append("access_key", web3FormsAccessKey);
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.message || "Form submission failed");
      }
      form.reset();
      setSubmitStatus({
        type: "success",
        message: "Your message was sent. Thanks for reaching out.",
      });
    } catch {
      setSubmitStatus({
        type: "error",
        message: "Could not send your message. Please email directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="contact-page">
      <h1 className="contact-title">
        Let's talk<span className="contact-title-dot">.</span>
      </h1>
      <div className="contact-layout">
        <section
          className="contact-panel contact-form-panel"
          aria-labelledby="contact-form-title"
        >
          <h2 className="contact-panel-title" id="contact-form-title">
            Send a message
          </h2>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="contact-fields">
              <label className="contact-field">
                Name
                <input name="name" type="text" autoComplete="name" required />
              </label>
              <label className="contact-field">
                Email
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                />
              </label>
              <label className="contact-field contact-message-field">
                Message
                <textarea name="message" rows="5" required />
              </label>
            </div>
            <label
              className="absolute h-px w-px overflow-hidden whitespace-nowrap [clip-path:inset(50%)]"
              aria-hidden="true"
            >
              Website
              <input name="botcheck" type="checkbox" tabIndex={-1} />
            </label>
            <button
              className="contact-submit"
              type="submit"
              disabled={isSubmitting}
            >
              <Mail size={16} aria-hidden="true" />
              {isSubmitting ? "Sending..." : "Send message"}
            </button>
            <p
              className={`contact-status ${submitStatus ? `contact-status--${submitStatus.type}` : ""}`}
              role="status"
              aria-live="polite"
            >
              {submitStatus?.message}
            </p>
          </form>
        </section>
        <aside
          className="contact-panel contact-details-panel"
          aria-labelledby="contact-details-title"
        >
          <h2 className="contact-panel-title" id="contact-details-title">
            Contact details
          </h2>
          <a className="contact-email-link" href={`mailto:${profile.email}`}>
            <span className="contact-email-icon" aria-hidden="true">
              <Mail size={17} />
            </span>
            <span className="contact-email-copy">
              <small>EMAIL</small>
              <strong>{profile.email}</strong>
            </span>
            <ArrowUpRight
              className="contact-email-arrow"
              size={16}
              aria-hidden="true"
            />
          </a>
          <nav className="contact-social-links" aria-label="Social profiles">
            {socialLinks.map(({ name, href, Icon, icon }) => (
              <a
                className={`contact-social-link contact-social-link--${icon}`}
                href={href}
                target="_blank"
                rel="noreferrer"
                key={name}
              >
                <Icon size={17} aria-hidden="true" />
                <span>{name}</span>
                <ArrowUpRight size={13} aria-hidden="true" />
              </a>
            ))}
          </nav>
        </aside>
      </div>
    </main>
  );
}
