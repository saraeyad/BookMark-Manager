import { apiRequest } from "@/utils/api";
import type { Bookmark } from "./types";
import { DEV_MODE } from "./constants";
import { getStoredBookmarks, saveBookmarks } from "./helpers";

export async function updateBookmark(
  id: string,
  data: {
    title: string;
    description: string;
    url: string;
    tags: string[];
  }
): Promise<Bookmark> {
  if (DEV_MODE) {
    const bookmarks = getStoredBookmarks();
    const index = bookmarks.findIndex((b) => b.id === id);
    if (index === -1) {
      throw new Error("Bookmark not found");
    }
    bookmarks[index] = {
      ...bookmarks[index],
      ...data,
    };
    saveBookmarks(bookmarks);
    return bookmarks[index];
  }

  const result = await apiRequest<Bookmark>(`/bookmarks/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
  if (!result.success || !result.data) {
    throw new Error(result.message || "Failed to update bookmark");
  }
  return result.data;
}

