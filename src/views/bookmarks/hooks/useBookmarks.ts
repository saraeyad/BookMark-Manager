import { useState, useEffect, useCallback, useMemo } from "react";
import { bookmarkService, type Bookmark } from "@/services/bookmarkService";
import { toast } from "sonner";
import type { TagsType } from "@/schemas";
import type { SortOption } from "../types";
import { sortBookmarks } from "@/utils/sort";

interface UseBookmarksOptions {
  isArchive?: boolean;
}

export function useBookmarks({ isArchive = false }: UseBookmarksOptions = {}) {
  const [allBookmarks, setAllBookmarks] = useState<Bookmark[]>([]);
  const [availableTags, setAvailableTags] = useState<TagsType>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("createdAt");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);

  // Load bookmarks and tags
  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [bookmarks, archivedBookmarks, tags] = await Promise.all([
        bookmarkService.getBookmarks(false),
        bookmarkService.getBookmarks(true),
        bookmarkService.getTags(),
      ]);

      setAllBookmarks([...bookmarks, ...archivedBookmarks]);
      setAvailableTags(tags);
    } catch (error) {
      console.error("Failed to load bookmarks:", error);
      toast.error("Failed to load bookmarks");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData, refreshKey]);

  // Trigger refresh
  const refresh = useCallback(() => {
    setRefreshKey((prev) => prev + 1);
  }, []);

  // Filter and sort bookmarks
  const bookmarks = useMemo(() => {
    let filtered = allBookmarks.filter((bookmark) => {
      // Filter by archive status
      if (bookmark.isArchived !== isArchive) return false;

      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = bookmark.title.toLowerCase().includes(query);
        const matchesDescription = bookmark.description
          .toLowerCase()
          .includes(query);
        const matchesTags = bookmark.tags.some((tag) =>
          tag.toLowerCase().includes(query)
        );
        if (!matchesTitle && !matchesDescription && !matchesTags) return false;
      }

      // Filter by selected tags
      if (selectedTags.length > 0) {
        return selectedTags.some((tag) => bookmark.tags.includes(tag));
      }

      return true;
    });

    // Sort bookmarks using utility function
    filtered = sortBookmarks(filtered, sortBy);

    return filtered;
  }, [allBookmarks, isArchive, selectedTags, searchQuery, sortBy]);

  // Stats
  const stats = useMemo(() => {
    const total = allBookmarks.filter((b) => !b.isArchived).length;
    const archived = allBookmarks.filter((b) => b.isArchived).length;
    const pinned = allBookmarks.filter((b) => b.pinned && !b.isArchived).length;
    return { total, archived, pinned };
  }, [allBookmarks]);

  return {
    bookmarks,
    allBookmarks,
    availableTags,
    isLoading,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    selectedTags,
    setSelectedTags,
    refresh,
    stats,
  };
}

