import { sortBookmarks, type SortOption } from "@/utils/sort";
import { apiRequest } from "@/utils/api";
import type { Bookmark } from "./types";
import { DEV_MODE } from "./constants";
import { getStoredBookmarks } from "./helpers";

export async function getBookmarks(
  isArchive: boolean = false,
  sortBy?: string
): Promise<Bookmark[]> {
  if (DEV_MODE) {
    let bookmarks = getStoredBookmarks().filter(
      (b) => b.isArchived === isArchive
    );

    // Sort bookmarks using utility function
    if (sortBy) {
      bookmarks = sortBookmarks(bookmarks, sortBy as SortOption);
    } else {
      // Default: just ensure pinned items are first
      bookmarks.sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));
    }

    return bookmarks;
  }

  const params = new URLSearchParams();
  if (isArchive) params.append("archive", "true");
  if (sortBy) params.append("sortBy", sortBy);

  const result = await apiRequest<Bookmark[]>(
    `/bookmarks?${params.toString()}`
  );
  if (!result.success || !result.data) {
    throw new Error(result.message || "Failed to fetch bookmarks");
  }
  return result.data;
}

