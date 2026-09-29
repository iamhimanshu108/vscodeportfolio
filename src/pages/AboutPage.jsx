import { ArrowUpRight, MapPin } from "lucide-react";
import { profile } from "../data/portfolio.js";

export function AboutPage() {
  return (
    <section className="portfolio-page about-page">
      <div className="page-kicker">PROFILE / ABOUT</div>
      <h1>
        About me<span className="title-period">.</span>
      </h1>
      <p className="page-lede">{profile.intro}</p>
      <div className="about-location">
        <MapPin size={15} />
        <span>{profile.location}</span>
        <span className="about-divider">/</span>
        <a href={profile.website} target="_blank" rel="noreferrer">
          iamhimanshu.in <ArrowUpRight size={12} />
        </a>
      </div>
      <div className="page-rule" />
      <div className="about-focus">
        <h2>Areas of focus</h2>
        <div className="focus-list focus-list-large">
          {profile.focus.map((focus) => (
            <span key={focus}>{focus}</span>
          ))}
        </div>
      </div>
      <div className="about-note">
        <span className="live-dot" />
        <div>
          {profile.bio.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
