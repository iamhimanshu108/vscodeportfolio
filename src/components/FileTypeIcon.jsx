import { Braces, FileCode2, FileText, Mail } from "lucide-react";

export function FileTypeIcon({ type, size = 15, className = "" }) {
  const Icon =
    type === "react"
      ? FileCode2
      : type === "markdown"
        ? FileText
        : type === "mail"
          ? Mail
          : Braces;
  return <Icon size={size} className={`${className} file-${type}`} />;
}
