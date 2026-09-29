import {
  ArrowUpRight,
  GitBranch,
  Globe2,
  Network,
  Mail,
  Send,
} from "lucide-react";
import { profile } from "../data/portfolio.js";

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
  return (
    <section className="portfolio-page contact-page">
      <div className="page-kicker">CONNECT / CONTACT</div>
      <h1>
        Let's talk<span className="title-period">.</span>
      </h1>
      <p className="page-lede">
        For opportunities, project conversations, or a friendly hello.
      </p>
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
    </section>
  );
}
