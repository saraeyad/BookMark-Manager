import type { TagsType } from "@/schemas";
import bookmarksData from "../../../data.json";
import { storage } from "@/utils/storage";
import type { Bookmark } from "./types";
import { STORAGE_KEY } from "./constants";

// Initialize bookmarks from localStorage or data.json
export function getStoredBookmarks(): Bookmark[] {
  if (typeof window === "undefined") return bookmarksData.bookmarks;

  const stored = storage.getItem<Bookmark[]>(STORAGE_KEY);
  if (stored) {
    return stored;
  }
  // Initialize from data.json
  storage.setItem(STORAGE_KEY, bookmarksData.bookmarks);
  return bookmarksData.bookmarks;
}

// Save bookmarks to localStorage
export function saveBookmarks(bookmarks: Bookmark[]): void {
  storage.setItem(STORAGE_KEY, bookmarks);
}

// Calculate tags from bookmarks
export function calculateTags(bookmarks: Bookmark[]): TagsType {
  const tagCounts: Record<string, number> = {};
  bookmarks.forEach((bookmark) => {
    if (!bookmark.isArchived) {
      bookmark.tags.forEach((tag) => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
    }
  });
  return Object.entries(tagCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

// Generate unique ID
export function generateId(): string {
  return `bm-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

