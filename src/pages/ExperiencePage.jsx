import { BriefcaseBusiness } from "lucide-react";
import { experience } from "../data/portfolio.js";

export function ExperiencePage() {
  return (
    <section className="mx-auto w-full max-w-[900px] py-[17px] font-[var(--body)] text-[12px] text-[var(--text)] max-[760px]:pt-[13px] max-[520px]:py-[10px]">
      <h1 className="m-0 font-[var(--heading)] text-[clamp(31px,3.6vw,42px)] leading-[1.08] font-bold tracking-[-0.04em] text-[#e3e7eb]">
        Experience<span className="text-[var(--accent)]">.</span>
      </h1>
      <div className="relative mt-7 pl-[22px] before:absolute before:top-2 before:bottom-4 before:left-[7px] before:w-px before:bg-[#354044] before:content-['']">
        {experience.map((item) => (
          <article className="relative pb-6 pl-[17px]" key={item.id}>
            <div className="absolute top-0 -left-[22px] grid h-4 w-4 place-items-center rounded-full border border-[#42615e] bg-[#18211f] text-[var(--accent)]">
              <BriefcaseBusiness size={9} />
            </div>
            <div className="flex justify-between gap-[14px] text-[12px] max-[520px]:flex-col max-[520px]:gap-[5px]">
              <div>
                <h2 className="m-0 text-[15px] font-medium text-[#dce1e5]">{item.role}</h2>
                <p className="mt-1 text-[13px] text-[#a3b2b2]">{item.company}</p>
              </div>
              <time className="flex-none font-[var(--mono)] text-[12px] text-[#829098] max-[520px]:text-[8px]">{item.period}</time>
            </div>
            <ul className="mt-[11px] grid list-disc gap-[6px] pl-[15px] text-[13px] leading-[1.65] text-[#929ca4] marker:text-[#61a9a0]">
              {item.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
