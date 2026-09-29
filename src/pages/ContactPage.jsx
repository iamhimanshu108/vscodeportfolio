import { portfolioPages } from "../data/portfolio.js";
import { DetailPage } from "./DetailPage.jsx";

export function ContactPage() {
  return <DetailPage document={portfolioPages.contact} />;
}
