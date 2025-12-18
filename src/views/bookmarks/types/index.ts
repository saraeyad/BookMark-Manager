// Sort options type
export type SortOption = "title" | "createdAt" | "lastVisited" | "visitCount";

// Sort options configuration
export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "createdAt", label: "Date Created" },
  { value: "lastVisited", label: "Last Visited" },
  { value: "visitCount", label: "Most Visited" },
  { value: "title", label: "Title (A-Z)" },
];

