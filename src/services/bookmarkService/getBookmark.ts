import { apiRequest } from "@/utils/api";
import type { Bookmark } from "./types";
import { DEV_MODE } from "./constants";
import { getStoredBookmarks } from "./helpers";

export async function getBookmark(id: string): Promise<Bookmark | null> {
  if (DEV_MODE) {
    const bookmarks = getStoredBookmarks();
    return bookmarks.find((b) => b.id === id) || null;
  }

  const result = await apiRequest<Bookmark>(`/bookmarks/${id}`);
  return result.success && result.data ? result.data : null;
}

