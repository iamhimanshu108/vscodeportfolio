import { ArrowDownToLine, ArrowUpRight, FileText } from "lucide-react";
import { experience, profile, skills } from "../data/portfolio.js";

export function ResumePage() {
  const allSkills = skills
    .flatMap((category) => category.items)
    .filter((item, index, items) => items.indexOf(item) === index);
  return (
    <section className="mx-auto w-full max-w-[900px] py-[17px] font-[var(--body)] text-[12px] text-[var(--text)] max-[760px]:pt-[13px] max-[520px]:py-[10px]">
      <div className="mb-[13px] font-[var(--mono)] text-[9px] tracking-[0.13em] text-[#78858d] max-[520px]:text-[8px]">DOCUMENT / RESUME</div>
      <div className="flex items-center justify-between gap-3 max-[520px]:items-start max-[520px]:flex-col">
        <div>
          <h1 className="m-0 font-[var(--heading)] text-[clamp(31px,3.6vw,42px)] leading-[1.08] font-bold tracking-[-0.04em] text-[#e3e7eb]">
            Resume<span className="text-[var(--accent)]">.</span>
          </h1>
          <p className="mt-[9px] max-w-[620px] text-[11px] leading-[1.7] text-[#9ba5ad] max-[520px]:text-[11px]">
            A quick overview of experience and technical focus.
          </p>
        </div>
        <a
          className="inline-flex min-h-[34px] flex-none items-center justify-center gap-2 rounded-[3px] border border-[#367e79] bg-[#286a65] px-[11px] text-[11px] font-medium text-[#e2f7f4] no-underline transition hover:-translate-y-px hover:border-[#59aaa2] hover:bg-[#327d77] max-[520px]:min-h-[30px]"
          href={profile.resumeUrl}
          target="_blank"
          rel="noreferrer"
        >
          <ArrowDownToLine size={15} /> Open PDF
        </a>
      </div>
      <div className="mt-[23px] flex items-start gap-3 border-l-2 border-[var(--accent)] bg-[#1a2020] p-[14px] text-[11px] text-[#a5afb4]">
        <FileText className="flex-none text-[var(--accent)]" size={17} />
        <p className="text-[11px] leading-[1.7]">{profile.resumeSummary}</p>
      </div>
      <div className="mt-[25px] grid grid-cols-2 gap-[25px] max-[520px]:grid-cols-1">
        <section>
          <h2 className="m-0 text-[15px] font-medium text-[#d7dde1]">Experience</h2>
          {experience.map((item) => (
            <div className="mt-[11px] flex flex-col gap-1 text-[10px]" key={item.id}>
              <strong className="text-[10px] font-medium text-[#cdd4d9]">{item.role}</strong>
              <span className="font-[var(--mono)] text-[9px] text-[#818c94]">
                {item.company} / {item.period}
              </span>
            </div>
          ))}
        </section>
        <section>
          <h2 className="m-0 text-[15px] font-medium text-[#d7dde1]">Technical focus</h2>
          <div className="mt-[10px] flex flex-wrap gap-[5px]">
            {allSkills.map((item) => (
              <span className="inline-flex min-h-[22px] items-center rounded-[3px] border border-[#343b3e] bg-[#1b2021] px-[7px] py-[3px] font-[var(--mono)] text-[9px] text-[#a8b5b6]" key={item}>{item}</span>
            ))}
          </div>
        </section>
      </div>
      <a
        className="mt-[18px] inline-flex items-center gap-[7px] text-[10px] text-[#9bcfc9] no-underline transition-colors hover:text-[#e1f4f1]"
        href={profile.resumeUrl}
        target="_blank"
        rel="noreferrer"
      >
        View full resume <ArrowUpRight size={14} />
      </a>
    </section>
  );
}
