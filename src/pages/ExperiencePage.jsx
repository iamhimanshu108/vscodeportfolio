import { experience } from "../data/portfolio.js";

export function ExperiencePage() {
  return (
    <section className="mx-auto w-full max-w-[900px] py-[17px] font-[var(--body)] text-[12px] text-[var(--text)] max-[760px]:pt-[13px] max-[520px]:py-[10px]">
      <h1 className="experience-document-heading m-0 font-[var(--heading)] text-[clamp(31px,3.6vw,42px)] leading-[1.08] font-bold tracking-[-0.04em] text-[#e3e7eb]"><span className="syntax-punctuation">#</span> Experience</h1>
      <div className="experience-code-block">
        <div className="experience-comment syntax-comment">// experience</div>
        <div className="experience-document">
          {experience.map((item, index) => (
            <article className="experience-entry" style={{ "--entry-index": index }} key={item.id}>
              <h2 className="experience-role"><span className="syntax-punctuation">##</span> <span className="syntax-property">role:</span> <span className="syntax-value">{item.role}</span></h2>
              <p className="experience-field"><span className="syntax-property">company:</span> <span className="syntax-string">{item.company}</span></p>
              <p className="experience-field"><span className="syntax-property">period:</span> <span className="syntax-number">{item.period}</span></p>
              <ul className="experience-highlights">
                {item.highlights.map((highlight, highlightIndex) => <li className="experience-highlight syntax-string" style={{ "--highlight-index": highlightIndex }} key={highlight}><span className="syntax-property">highlight</span><span className="syntax-punctuation">[{highlightIndex}]</span><span className="syntax-punctuation">:</span> {highlight}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
