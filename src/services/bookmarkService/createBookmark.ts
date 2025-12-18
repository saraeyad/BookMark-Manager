import { apiRequest } from "@/utils/api";
import type { Bookmark } from "./types";
import { DEV_MODE } from "./constants";
import { getStoredBookmarks, saveBookmarks, generateId } from "./helpers";

export async function createBookmark(data: {
  title: string;
  description: string;
  url: string;
  tags: string[];
}): Promise<Bookmark> {
  if (DEV_MODE) {
    const bookmarks = getStoredBookmarks();
    const newBookmark: Bookmark = {
      id: generateId(),
      title: data.title,
      url: data.url,
      favicon: "",
      description: data.description,
      tags: data.tags,
      pinned: false,
      isArchived: false,
      visitCount: 0,
      createdAt: new Date().toISOString(),
      lastVisited: null,
    };
    bookmarks.unshift(newBookmark);
    saveBookmarks(bookmarks);
    return newBookmark;
  }

  const result = await apiRequest<Bookmark>("/bookmarks", {
    method: "POST",
    body: JSON.stringify(data),
  });
  if (!result.success || !result.data) {
    throw new Error(result.message || "Failed to create bookmark");
  }
  return result.data;
}

