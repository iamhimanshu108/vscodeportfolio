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
    <section className="mx-auto w-full max-w-[900px] py-[17px] font-[var(--body)] text-[12px] text-[var(--text)] max-[760px]:pt-[13px] max-[520px]:py-[10px]">
      <h1 className="m-0 font-[var(--heading)] text-[clamp(31px,3.6vw,42px)] leading-[1.08] font-bold tracking-[-0.04em] text-[#e3e7eb]">
        Let's talk<span className="text-[var(--accent)]">.</span>
      </h1>
      <div className="mt-6 grid grid-cols-2 items-start gap-4 max-[760px]:grid-cols-1">
        <section className="min-w-0 rounded border border-[#303a3b] bg-[#171a1c] p-4">
          <h2 className="mb-[15px] text-[15px] font-medium text-[#cbd5d7]" id="contact-form-title">Send a message</h2>
          <form className="grid gap-[13px]" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-3 max-[520px]:grid-cols-1">
              <label className="grid gap-[6px] text-[#9ba5ad]">
                Name
                <input className="w-full min-w-0 rounded border border-[#344240] bg-[#171b1c] px-[11px] py-[10px] text-[#d9e2e2] focus:border-[#69a39b] focus:outline-none" name="name" type="text" autoComplete="name" required />
              </label>
              <label className="grid gap-[6px] text-[#9ba5ad]">
                Email
                <input
                  className="w-full min-w-0 rounded border border-[#344240] bg-[#171b1c] px-[11px] py-[10px] text-[#d9e2e2] focus:border-[#69a39b] focus:outline-none"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                />
              </label>
              <label className="grid gap-[6px] text-[#9ba5ad]">
                Phone <span>(optional)</span>
                <input className="w-full min-w-0 rounded border border-[#344240] bg-[#171b1c] px-[11px] py-[10px] text-[#d9e2e2] focus:border-[#69a39b] focus:outline-none" name="phone" type="tel" autoComplete="tel" />
              </label>
              <label className="col-span-full grid gap-[6px] text-[#9ba5ad] max-[520px]:col-auto">
                Message
                <textarea className="min-h-[120px] w-full min-w-0 resize-y rounded border border-[#344240] bg-[#171b1c] px-[11px] py-[10px] text-[#d9e2e2] focus:border-[#69a39b] focus:outline-none" name="message" rows="5" required />
              </label>
            </div>
            <label className="absolute h-px w-px overflow-hidden whitespace-nowrap [clip-path:inset(50%)]" aria-hidden="true">
              Website
              <input
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
              />
            </label>
            <button
              className="inline-flex min-h-10 items-center justify-start gap-2 rounded border border-[#46716b] bg-[#1c302e] px-3 py-2 text-[#d6eeeb] transition-colors hover:border-[#69a39b] hover:bg-[#23403c] disabled:cursor-wait disabled:opacity-[0.65]"
              type="submit"
              disabled={isSubmitting}
            >
              <Mail size={16} /> {isSubmitting ? "Sending..." : "Send message"}
            </button>
            <p
              className="m-0 min-h-0 text-[#9bcf9f] empty:hidden"
              role="status"
              aria-live="polite"
            >
              {submitStatus}
            </p>
          </form>
        </section>
        <aside
          className="min-w-0 rounded border border-[#303a3b] bg-[#171a1c] p-4"
          aria-label="Contact details"
        >
          <h2 className="mb-[15px] text-[15px] font-medium text-[#cbd5d7]">Contact details</h2>
          <a className="flex max-w-none items-center gap-3 rounded-none border-0 bg-transparent p-0 text-[10px] text-[#cbd5d7] no-underline transition-colors hover:border-transparent hover:bg-transparent" href={`mailto:${profile.email}`}>
            <span className="grid h-8 w-8 place-items-center rounded border border-[#3b5c57] text-[var(--accent)]">
              <Mail size={17} />
            </span>
            <span className="flex flex-col gap-1">
              <small className="font-[var(--mono)] text-[8px] tracking-[0.1em] text-[#7d8b8d]">EMAIL</small>
              <strong className="font-[var(--mono)] text-[11px] text-[#d9e2e2]">{profile.email}</strong>
            </span>
            <ArrowUpRight className="ml-auto text-[#91b9b4]" size={16} />
          </a>
          <div className="mt-[17px] grid grid-cols-2 gap-x-[18px] border-t border-[#30363a] max-[520px]:grid-cols-1">
            {socialLinks.map(({ name, href, Icon, detail }) => (
              <a
                className="flex min-w-0 items-center gap-[10px] border-b border-[#30363a] px-[2px] py-3 text-[10px] text-[#8c9a9e] no-underline transition-colors hover:text-[#d8e7e5]"
                href={href}
                target="_blank"
                rel="noreferrer"
                key={name}
              >
                <Icon size={17} />
                <span className="flex flex-col gap-[3px]">
                  <strong className="text-[10px] font-medium text-[#cbd2d7]">{name}</strong>
                  <small className="text-[9px] text-[#7e888f]">{detail}</small>
                </span>
                <ArrowUpRight size={13} className="ml-auto" />
              </a>
            ))}
          </div>
          <div className="mt-[18px] flex flex-wrap gap-2 text-[10px] text-[#7d878e]">
            <span>Want a concise overview?</span>
            <a href={profile.resumeUrl} target="_blank" rel="noreferrer">
              <span className="inline-flex items-center gap-1 text-[#9dd1ca] no-underline">Open resume <ArrowUpRight size={13} /></span>
            </a>
          </div>
        </aside>
      </div>
    </section>
  );
}
