import { apiRequest } from "@/utils/api";
import type { Bookmark } from "./types";
import { DEV_MODE } from "./constants";
import { getStoredBookmarks, saveBookmarks } from "./helpers";

export async function toggleArchiveBookmark(id: string): Promise<Bookmark> {
  if (DEV_MODE) {
    const bookmarks = getStoredBookmarks();
    const index = bookmarks.findIndex((b) => b.id === id);
    if (index === -1) {
      throw new Error("Bookmark not found");
    }
    bookmarks[index].isArchived = !bookmarks[index].isArchived;
    saveBookmarks(bookmarks);
    return bookmarks[index];
  }

  const result = await apiRequest<Bookmark>(`/bookmarks/${id}/archive`, {
    method: "PATCH",
  });
  if (!result.success || !result.data) {
    throw new Error(result.message || "Failed to archive bookmark");
  }
  return result.data;
}

