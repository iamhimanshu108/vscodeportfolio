import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  ExternalLink,
  Flame,
  GitFork,
  GitBranch,
  GitCommitHorizontal,
  Star,
} from "lucide-react";
import { profile } from "../data/portfolio.js";

const formatCount = (value) =>
  new Intl.NumberFormat("en", {
    notation: value > 9999 ? "compact" : "standard",
  }).format(value);

const getDateKey = (date) => date.toISOString().slice(0, 10);

function getCurrentStreak(contributions) {
  const countsByDate = new Map(
    contributions.map((contribution) => [
      contribution.date,
      contribution.count,
    ]),
  );
  const date = new Date();
  date.setUTCHours(0, 0, 0, 0);
  if ((countsByDate.get(getDateKey(date)) ?? 0) === 0) {
    date.setUTCDate(date.getUTCDate() - 1);
  }

  let streak = 0;
  while ((countsByDate.get(getDateKey(date)) ?? 0) > 0) {
    streak += 1;
    date.setUTCDate(date.getUTCDate() - 1);
  }
  return streak;
}

function groupContributionsByWeek(contributions) {
  const weeks = [];
  contributions.forEach((contribution) => {
    const weekday = new Date(`${contribution.date}T00:00:00Z`).getUTCDay();
    if (!weeks.length || weekday === 0) weeks.push(Array(7).fill(null));
    weeks[weeks.length - 1][weekday] = contribution;
  });
  return weeks;
}

const getMonthLabel = (week) => {
  const firstWeekOfMonth = week.find((day) => {
    if (!day) return false;
    return new Date(`${day.date}T00:00:00Z`).getUTCDate() <= 7;
  });
  return firstWeekOfMonth
    ? new Date(`${firstWeekOfMonth.date}T00:00:00Z`).toLocaleDateString("en", {
        month: "short",
        timeZone: "UTC",
      })
    : "";
};

export function GithubPage() {
  const [github, setGithub] = useState(null);
  const [repositories, setRepositories] = useState([]);
  const [loadState, setLoadState] = useState("loading");
  const [contributions, setContributions] = useState([]);
  const [contributionTotal, setContributionTotal] = useState(null);
  const [contributionState, setContributionState] = useState("loading");

  useEffect(() => {
    const controller = new AbortController();
    const loadContributionData = async () => {
      try {
        const response = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${profile.githubUsername}?y=last`,
          { signal: controller.signal },
        );
        if (!response.ok)
          throw new Error("Contribution history is unavailable");
        const data = await response.json();
        setContributions(data.contributions);
        setContributionTotal(data.total.lastYear);
        setContributionState("ready");
      } catch (error) {
        if (error.name !== "AbortError") setContributionState("unavailable");
      }
    };
    const loadGithubData = async () => {
      try {
        const headers = { Accept: "application/vnd.github+json" };
        const response = await fetch(
          `https://api.github.com/users/${profile.githubUsername}`,
          { headers, signal: controller.signal },
        );
        if (!response.ok) throw new Error("GitHub profile is unavailable");
        const account = await response.json();
        let nextUrl = `${account.repos_url}?per_page=100&sort=updated`;
        const allRepositories = [];
        while (nextUrl && allRepositories.length < 1000) {
          const repositoryResponse = await fetch(nextUrl, {
            headers,
            signal: controller.signal,
          });
          if (!repositoryResponse.ok)
            throw new Error("GitHub repositories are unavailable");
          allRepositories.push(...(await repositoryResponse.json()));
          const linkHeader = repositoryResponse.headers.get("Link") ?? "";
          const nextLink = linkHeader
            .split(",")
            .find((link) => link.includes('rel="next"'));
          nextUrl = nextLink?.match(/<([^>]+)>/)?.[1] ?? "";
        }
        allRepositories.sort(
          (first, second) =>
            new Date(second.pushed_at ?? second.updated_at) -
            new Date(first.pushed_at ?? first.updated_at),
        );
        setGithub({
          ...account,
          stars: allRepositories.reduce(
            (total, repository) => total + repository.stargazers_count,
            0,
          ),
          forks: allRepositories.reduce(
            (total, repository) => total + repository.forks_count,
            0,
          ),
        });
        setRepositories(allRepositories.slice(0, 5));
        setLoadState("ready");
      } catch (error) {
        if (error.name !== "AbortError") setLoadState("unavailable");
      }
    };
    loadGithubData();
    loadContributionData();
    return () => controller.abort();
  }, []);

  const contributionWeeks = groupContributionsByWeek(contributions);
  const currentStreak =
    contributionState === "ready" ? getCurrentStreak(contributions) : null;

  const stats = [
    { label: "Repositories", value: github?.public_repos, Icon: GitBranch },
    { label: "Followers", value: github?.followers, Icon: GitBranch },
    { label: "Total stars", value: github?.stars, Icon: Star },
    { label: "Total forks", value: github?.forks, Icon: GitFork },
    {
      label: "Contributions (1Y)",
      value: contributionTotal,
      Icon: GitCommitHorizontal,
      title: "GitHub calendar contributions, including more than commits",
    },
    {
      label: "Current streak",
      value: currentStreak,
      suffix: currentStreak == null ? "" : "days",
      Icon: Flame,
    },
  ];

  return (
    <section
      className="portfolio-page github-page"
      aria-busy={loadState === "loading"}
    >
      <div className="github-profile-head">
        {github?.avatar_url ? (
          <img
            className="github-avatar"
            src={github.avatar_url}
            alt={`${github.login} avatar`}
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="github-avatar github-avatar-fallback">
            <GitBranch size={25} />
          </div>
        )}
        <div className="github-identity">
          <h1>{github?.name || profile.name}</h1>
          <span>@{github?.login || profile.githubUsername}</span>
        </div>
        <a
          className="github-profile-link"
          href={profile.githubUrl}
          target="_blank"
          rel="noreferrer"
        >
          <GitBranch size={15} /> View Profile <ExternalLink size={12} />
        </a>
      </div>
      <div className="github-profile-rule" />
      <div className="github-stats">
        {stats.map(({ label, value, Icon, title, suffix }) => (
          <div className="github-stat" key={label} title={title}>
            <Icon size={16} />
            <strong>{value == null ? "--" : formatCount(value)}</strong>
            <span>
              {label}
              {suffix ? ` / ${suffix}` : ""}
            </span>
          </div>
        ))}
      </div>
      {loadState === "unavailable" && (
        <p className="github-api-note text-[10px]">
          Live GitHub stats could not be loaded. Visit the public profile for
          current activity.
        </p>
      )}
      <section
        className="contribution-section"
        aria-label="GitHub contributions in the last year"
      >
        <div className="github-activity-heading contribution-heading">
          <h2>Contribution activity / last year</h2>
          {contributionState === "ready" && (
            <span>{formatCount(contributionTotal)} total</span>
          )}
        </div>
        {contributionState === "loading" && (
          <div className="github-loading">Loading contribution history...</div>
        )}
        {contributionState === "unavailable" && (
          <p className="github-api-note text-[10px]">
            Contribution history could not be loaded. View the activity on
            GitHub.
          </p>
        )}
        {contributionState === "ready" && (
          <div className="contribution-scroll">
            <div
              className="contribution-calendar"
              style={{ "--week-count": contributionWeeks.length }}
            >
              <div className="contribution-months" aria-hidden="true">
                {contributionWeeks.map((week, index) => {
                  const month = getMonthLabel(week);
                  const previousMonth =
                    index > 0
                      ? getMonthLabel(contributionWeeks[index - 1])
                      : "";
                  return month && month !== previousMonth ? (
                    <span key={index} style={{ left: `${index * 13}px` }}>
                      {month}
                    </span>
                  ) : null;
                })}
              </div>
              <div
                className="contribution-grid"
                role="img"
                aria-label={`${contributionTotal} GitHub contributions during the last year`}
              >
                {contributionWeeks.map((week, weekIndex) => (
                  <div className="contribution-week" key={weekIndex}>
                    {week.map((day, dayIndex) => (
                      <span
                        className={`contribution-cell level-${day?.level ?? 0}`}
                        title={
                          day
                            ? `${day.count} contributions on ${day.date}`
                            : "No contribution data"
                        }
                        key={day?.date ?? `${weekIndex}-${dayIndex}`}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <div
              className="contribution-legend"
              aria-label="Contribution intensity legend"
            >
              <span>Less</span>
              {[0, 1, 2, 3, 4].map((level) => (
                <i className={`contribution-cell level-${level}`} key={level} />
              ))}
              <span>More</span>
            </div>
          </div>
        )}
      </section>
      <div className="github-activity-heading">
        <h2>Recent public repositories</h2>
        <a
          href={`${profile.githubUrl}?tab=repositories`}
          target="_blank"
          rel="noreferrer"
        >
          All repositories <ArrowUpRight size={13} />
        </a>
      </div>
      {loadState === "loading" && (
        <div className="github-loading">
          Loading public profile and repositories...
        </div>
      )}
      {loadState === "ready" && (
        <div className="github-repository-list">
          {repositories.map((repository) => (
            <a
              className="github-repository"
              href={repository.html_url}
              target="_blank"
              rel="noreferrer"
              key={repository.id}
            >
              <span className="repository-main">
                <strong>{repository.name}</strong>
                <small>{repository.description || "Public repository"}</small>
              </span>
              <span className="repository-language">
                {repository.language || "Code"}
              </span>
              <span className="repository-metric">
                <Star size={12} />
                {formatCount(repository.stargazers_count)}
              </span>
              <span className="repository-metric">
                <GitFork size={12} />
                {formatCount(repository.forks_count)}
              </span>
              <ArrowUpRight size={13} className="repository-arrow" />
            </a>
          ))}
        </div>
      )}
      <a
        className="github-contributions-link"
        href={`${profile.githubUrl}?tab=overview`}
        target="_blank"
        rel="noreferrer"
      >
        View contribution activity on GitHub <ArrowUpRight size={13} />
      </a>
    </section>
  );
}
