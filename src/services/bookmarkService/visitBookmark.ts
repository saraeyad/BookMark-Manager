import { apiRequest } from "@/utils/api";
import type { Bookmark } from "./types";
import { DEV_MODE } from "./constants";
import { getStoredBookmarks, saveBookmarks } from "./helpers";

export async function visitBookmark(id: string): Promise<Bookmark> {
  if (DEV_MODE) {
    const bookmarks = getStoredBookmarks();
    const index = bookmarks.findIndex((b) => b.id === id);
    if (index === -1) {
      throw new Error("Bookmark not found");
    }
    bookmarks[index].visitCount += 1;
    bookmarks[index].lastVisited = new Date().toISOString();
    saveBookmarks(bookmarks);
    return bookmarks[index];
  }

  const result = await apiRequest<Bookmark>(`/bookmarks/${id}/visit`, {
    method: "PATCH",
  });
  if (!result.success || !result.data) {
    throw new Error(result.message || "Failed to visit bookmark");
  }
  return result.data;
}

