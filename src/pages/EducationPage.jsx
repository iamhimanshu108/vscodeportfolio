import { ArrowUpRight, GraduationCap } from "lucide-react";
import { education } from "../data/portfolio.js";

export function EducationPage() {
  return (
    <section className="mx-auto w-full max-w-[900px] py-[17px] font-[var(--body)] text-[12px] text-[var(--text)] max-[760px]:pt-[13px] max-[520px]:py-[10px]">
      <h1 className="m-0 font-[var(--heading)] text-[clamp(31px,3.6vw,42px)] leading-[1.08] font-bold tracking-[-0.04em] text-[#e3e7eb]">
        Education<span className="text-[var(--accent)]">.</span>
      </h1>
      <div className="mt-6 grid border-t border-[#30363a]">
        {education.map((item) => (
          <article className="grid grid-cols-[34px_minmax(0,1fr)] gap-3 border-b border-[#30363a] py-[18px] max-[520px]:grid-cols-[28px_minmax(0,1fr)] max-[520px]:gap-[9px]" key={item.id}>
            <div className="grid h-[30px] w-[30px] place-items-center rounded border border-[#4a4331] bg-[#252219] text-[#d3b976] max-[520px]:h-[27px] max-[520px]:w-[27px]">
              <GraduationCap size={19} />
            </div>
            <div className="min-w-0 text-[12px]">
              <div className="flex justify-between gap-[10px] max-[520px]:flex-col">
                <div>
                  <h2 className="m-0 text-[12px] leading-[1.5] font-medium text-[#dce1e5]">{item.degree}</h2>
                  <a
                    className="mt-[3px] inline-flex items-center gap-[3px] text-[10px] text-[#a8d7d0] no-underline transition-colors hover:text-[#d2f1ec]"
                    href={item.institutionUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {item.institution} <ArrowUpRight size={12} />
                  </a>
                </div>
                <span
                  className={`flex-none self-start rounded-[3px] border px-[6px] py-1 font-[var(--mono)] text-[8px] uppercase ${item.status === "Completed" ? "border-[#365743] text-[#9bcaa2]" : "border-[#665635] text-[#e0c17c]"}`}
                >
                  {item.status}
                </span>
              </div>
              <div className="mt-[9px] flex flex-wrap gap-x-[15px] gap-y-[7px] font-[var(--mono)] text-[12px] text-[#7e8991]">
                <span>{item.period}</span>
                <span>{item.location}</span>
              </div>
              <ul className="mt-2 grid list-disc gap-[6px] pl-[15px] text-[12px] leading-[1.65] text-[#929ca4] marker:text-[#61a9a0]">
                {item.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
