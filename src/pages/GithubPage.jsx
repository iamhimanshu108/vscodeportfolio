import "./GithubPage.css";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  ExternalLink,
  Flame,
  GitFork,
  GitBranch,
  GitCommitHorizontal,
  Star,
  UsersRound,
} from "lucide-react";
import { githubContent } from "../data/githubData.js";
import { profile } from "../data/profileData.js";
import { useMotionVariants } from "../motion.js";

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

const contributionCellColors = [
  "bg-[#24292f]",
  "bg-[#0e4429]",
  "bg-[#006d32]",
  "bg-[#26a641]",
  "bg-[#39d353]",
];

export function GithubPage() {
  const variants = useMotionVariants();
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
          `${githubContent.contributionApi}/${profile.githubUsername}?y=${githubContent.contributionPeriod}`,
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
          `${githubContent.profileApi}/${profile.githubUsername}`,
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
    {
      label: "Repositories",
      value: github?.public_repos,
      Icon: GitBranch,
      tone: "mint",
    },
    {
      label: "Followers",
      value: github?.followers,
      Icon: UsersRound,
      tone: "blue",
    },
    { label: "Total stars", value: github?.stars, Icon: Star, tone: "gold" },
    {
      label: "Total forks",
      value: github?.forks,
      Icon: GitFork,
      tone: "green",
    },
    {
      label: "Contributions (1Y)",
      value: contributionTotal,
      Icon: GitCommitHorizontal,
      tone: "teal",
      title: "GitHub calendar contributions, including more than commits",
    },
    {
      label: "Current streak",
      value: currentStreak,
      suffix: currentStreak == null ? "" : "days",
      Icon: Flame,
      tone: "pink",
    },
  ];

  return (
    <motion.main
      className="github-page"
      aria-busy={loadState === "loading"}
      variants={variants.stagger}
      initial="hidden"
      animate="visible"
    >
      <motion.header className="github-profile" variants={variants.item}>
        <div className="github-identity">
          {github?.avatar_url ? (
            <img
              className="github-avatar"
              src={github.avatar_url}
              alt={`${github.login} avatar`}
              referrerPolicy="no-referrer"
            />
          ) : (
            <div
              className="github-avatar github-avatar-fallback"
              aria-hidden="true"
            >
              <GitBranch size={25} />
            </div>
          )}
          <div className="github-identity-copy">
            <h1>{github?.name || profile.name}</h1>
            <span>@{github?.login || profile.githubUsername}</span>
          </div>
        </div>
        <a
          className="github-profile-link"
          href={profile.githubUrl}
          target="_blank"
          rel="noreferrer"
        >
          <GitBranch size={15} aria-hidden="true" />
          <span>View profile</span>
          <ExternalLink size={12} aria-hidden="true" />
        </a>
      </motion.header>

      <motion.section
        className="github-stats"
        aria-label="GitHub profile statistics"
        variants={variants.stagger}
      >
        {stats.map(({ label, value, Icon, title, suffix, tone }) => (
          <motion.article
            className={`github-stat github-stat--${tone}`}
            variants={variants.item}
            whileHover={variants.reduced ? undefined : { y: -3 }}
            transition={{ duration: 0.18 }}
            key={label}
            title={title}
          >
            <span className="github-stat-icon">
              <Icon size={16} aria-hidden="true" />
            </span>
            <strong>{value == null ? "--" : formatCount(value)}</strong>
            <span className="github-stat-label">
              {label}
              {suffix ? ` / ${suffix}` : ""}
            </span>
          </motion.article>
        ))}
      </motion.section>

      {loadState === "unavailable" && (
        <motion.p className="github-notice" variants={variants.item}>
          Live GitHub stats could not be loaded. Visit the public profile for
          current activity.
        </motion.p>
      )}
      <motion.section
        className="github-panel github-contributions"
        aria-label="GitHub contributions in the last year"
        variants={variants.item}
      >
        <div className="github-panel-header">
          <h2>
            Contribution activity <span>LAST YEAR</span>
          </h2>
          {contributionState === "ready" && (
            <span className="github-panel-total">
              {formatCount(contributionTotal)} total
            </span>
          )}
        </div>
        {contributionState === "loading" && (
          <div className="github-loading">Loading contribution history...</div>
        )}
        {contributionState === "unavailable" && (
          <p className="github-notice">
            Contribution history could not be loaded. View the activity on
            GitHub.
          </p>
        )}
        {contributionState === "ready" && (
          <div className="github-contribution-scroll">
            <div
              className="github-contribution-chart"
              style={{ "--week-count": contributionWeeks.length }}
            >
              <div className="github-month-axis" aria-hidden="true">
                {contributionWeeks.map((week, index) => {
                  const month = getMonthLabel(week);
                  const previousMonth =
                    index > 0
                      ? getMonthLabel(contributionWeeks[index - 1])
                      : "";
                  return month && month !== previousMonth ? (
                    <span
                      className="absolute top-0 whitespace-nowrap"
                      key={index}
                      style={{ left: `${index * 13}px` }}
                    >
                      {month}
                    </span>
                  ) : null;
                })}
              </div>
              <div
                className="github-contribution-grid"
                role="img"
                aria-label={`${contributionTotal} GitHub contributions during the last year`}
              >
                {contributionWeeks.map((week, weekIndex) => (
                  <div className="github-contribution-week" key={weekIndex}>
                    {week.map((day, dayIndex) => (
                      <span
                        className={`github-contribution-cell ${contributionCellColors[day?.level ?? 0]}`}
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
              className="github-contribution-legend"
              aria-label="Contribution intensity legend"
            >
              <span>Less</span>
              {[0, 1, 2, 3, 4].map((level) => (
                <i
                  className={`github-contribution-cell ${contributionCellColors[level]}`}
                  key={level}
                />
              ))}
              <span>More</span>
            </div>
          </div>
        )}
      </motion.section>
      <motion.section
        className="github-repositories-section"
        aria-label="Recent public repositories"
        variants={variants.item}
      >
        <div className="github-repositories-header">
          <h2>Recent repositories</h2>
          <a
            className="github-all-repositories"
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
          <motion.div
            className="github-repository-list"
            variants={variants.stagger}
            initial="hidden"
            animate="visible"
          >
            {repositories.map((repository) => (
              <motion.a
                className="github-repository"
                variants={variants.item}
                whileHover={variants.reduced ? undefined : { x: 3 }}
                transition={{ duration: 0.16 }}
                href={repository.html_url}
                target="_blank"
                rel="noreferrer"
                key={repository.id}
              >
                <span className="github-repository-copy">
                  <strong>{repository.name}</strong>
                  <small>{repository.description || "Public repository"}</small>
                </span>
                <span className="github-repository-language">
                  {repository.language || "Code"}
                </span>
                <span className="github-repository-metric">
                  <Star size={12} aria-hidden="true" />
                  {formatCount(repository.stargazers_count)}
                </span>
                <span className="github-repository-metric github-repository-forks">
                  <GitFork size={12} aria-hidden="true" />
                  {formatCount(repository.forks_count)}
                </span>
                <ArrowUpRight
                  className="github-repository-arrow"
                  size={13}
                  aria-hidden="true"
                />
              </motion.a>
            ))}
          </motion.div>
        )}
      </motion.section>
      <motion.a
        className="github-activity-link"
        variants={variants.item}
        href={`${profile.githubUrl}?tab=overview`}
        target="_blank"
        rel="noreferrer"
      >
        View contribution activity on GitHub <ArrowUpRight size={13} />
      </motion.a>
    </motion.main>
  );
}
