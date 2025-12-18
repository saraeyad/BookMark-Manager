import { apiRequest } from "@/utils/api";
import type { TagsType } from "@/schemas";
import { DEV_MODE } from "./constants";
import { getStoredBookmarks, calculateTags } from "./helpers";

export async function getTags(): Promise<TagsType> {
  if (DEV_MODE) {
    const bookmarks = getStoredBookmarks();
    return calculateTags(bookmarks);
  }

  const result = await apiRequest<TagsType>("/bookmarks/tags");
  if (!result.success || !result.data) {
    throw new Error(result.message || "Failed to fetch tags");
  }
  return result.data;
}

