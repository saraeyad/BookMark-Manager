import type { BookmarksType, TagsType } from "@/types";

const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";

export const bookmarkService = {
  async getBookmarks(isArchive: boolean = false, sortBy?: string): Promise<BookmarksType | undefined> {
    // TODO: Replace with actual API endpoint
    const params = new URLSearchParams();
    if (isArchive) params.append("archive", "true");
    if (sortBy) params.append("sortBy", sortBy);
    
    const response = await fetch(`${API_BASE_URL}/bookmarks?${params.toString()}`);
    if (!response.ok) {
      throw new Error("Failed to fetch bookmarks");
    }
    return response.json();
  },

  async getTags(): Promise<TagsType | undefined> {
    // TODO: Replace with actual API endpoint
    const response = await fetch(`${API_BASE_URL}/bookmarks/tags`);
    if (!response.ok) {
      throw new Error("Failed to fetch tags");
    }
    return response.json();
  },

  async createBookmark(data: { title: string; description: string; website: string; tags: string }) {
    // TODO: Replace with actual API endpoint
    const response = await fetch(`${API_BASE_URL}/bookmarks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Failed to create bookmark");
    }
    return response.json();
  },

  async updateBookmark(id: string, data: { title: string; description: string; website: string; tags: string }) {
    // TODO: Replace with actual API endpoint
    const response = await fetch(`${API_BASE_URL}/bookmarks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Failed to update bookmark");
    }
    return response.json();
  },

  async deleteBookmark(id: string) {
    // TODO: Replace with actual API endpoint
    const response = await fetch(`${API_BASE_URL}/bookmarks/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete bookmark");
    }
    return response.json();
  },

  async togglePinBookmark(id: string) {
    // TODO: Replace with actual API endpoint
    const response = await fetch(`${API_BASE_URL}/bookmarks/${id}/pin`, {
      method: "PATCH",
    });
    if (!response.ok) {
      throw new Error("Failed to toggle pin");
    }
    return response.json();
  },

  async archiveBookmark(id: string) {
    // TODO: Replace with actual API endpoint
    const response = await fetch(`${API_BASE_URL}/bookmarks/${id}/archive`, {
      method: "PATCH",
    });
    if (!response.ok) {
      throw new Error("Failed to archive bookmark");
    }
    return response.json();
  },

  async visitBookmark(id: string) {
    // TODO: Replace with actual API endpoint
    const response = await fetch(`${API_BASE_URL}/bookmarks/${id}/visit`, {
      method: "PATCH",
    });
    if (!response.ok) {
      throw new Error("Failed to visit bookmark");
    }
    return response.json();
  },
};

