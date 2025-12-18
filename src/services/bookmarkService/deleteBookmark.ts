import { apiRequest } from "@/utils/api";
import { DEV_MODE } from "./constants";
import { getStoredBookmarks, saveBookmarks } from "./helpers";

export async function deleteBookmark(id: string): Promise<{ success: boolean }> {
  if (DEV_MODE) {
    const bookmarks = getStoredBookmarks();
    const filtered = bookmarks.filter((b) => b.id !== id);
    saveBookmarks(filtered);
    return { success: true };
  }

  const result = await apiRequest<{ success: boolean }>(`/bookmarks/${id}`, {
    method: "DELETE",
  });
  if (!result.success || !result.data) {
    throw new Error(result.message || "Failed to delete bookmark");
  }
  return result.data;
}

