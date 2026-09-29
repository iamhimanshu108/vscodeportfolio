import { portfolioPages } from "../data/portfolio.js";
import { DetailPage } from "./DetailPage.jsx";

export function ProjectsPage() {
  return <DetailPage document={portfolioPages.projects} />;
}
