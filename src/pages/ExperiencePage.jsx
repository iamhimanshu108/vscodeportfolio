import { portfolioPages } from "../data/portfolio.js";
import { DetailPage } from "./DetailPage.jsx";

export function ExperiencePage() {
  return <DetailPage document={portfolioPages.experience} />;
}
