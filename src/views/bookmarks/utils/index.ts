import { MONTHS } from "@/constants";

/**
 * Format date to "9 Dec" format
 */
export function formatDate(dateString: string | null): string {
  if (!dateString) return "-";
  const date = new Date(dateString);
  return `${date.getDate()} ${MONTHS[date.getMonth()]}`;
}

/**
 * Get domain from URL (removes www. prefix)
 */
export function getDomain(url: string): string {
  try {
    const domain = new URL(url).hostname;
    return domain.replace("www.", "");
  } catch {
    return url;
  }
}

/**
 * Get favicon URL using Google's favicon service
 */
export function getFaviconUrl(url: string): string {
  try {
    const domain = new URL(url).hostname;
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
  } catch {
    return "";
  }
}

/**
 * Get user initials from name
 */
export function getInitials(name?: string): string {
  if (!name) return "U";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

