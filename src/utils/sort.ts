import type { BookmarkType } from "@/schemas";

export type SortOption = "title" | "visitCount" | "createdAt" | "lastVisited";


export function sortBookmarks(
  bookmarks: BookmarkType[],
  sortBy: SortOption
): BookmarkType[] {
  const sorted = [...bookmarks];

  switch (sortBy) {
    case "title":
      sorted.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case "visitCount":
      sorted.sort((a, b) => b.visitCount - a.visitCount);
      break;
    case "createdAt":
      sorted.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      break;
    case "lastVisited":
      sorted.sort((a, b) => {
        if (!a.lastVisited) return 1;
        if (!b.lastVisited) return -1;
        return (
          new Date(b.lastVisited).getTime() - new Date(a.lastVisited).getTime()
        );
      });
      break;
  }

  sorted.sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));

  return sorted;
}

