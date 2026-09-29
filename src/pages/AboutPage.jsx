import { portfolioPages } from "../data/portfolio.js";
import { DetailPage } from "./DetailPage.jsx";

export function AboutPage() {
  return <DetailPage document={portfolioPages.about} />;
}
