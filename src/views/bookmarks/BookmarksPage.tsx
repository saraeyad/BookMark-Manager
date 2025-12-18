import { useState } from "react";
import { TagsProvider, useTags } from "@/context/TagContext";
import { ScrollArea } from "@/components/ui/scroll-area";

// Local imports
import {
  BookmarkCard,
  AddBookmarkDialog,
  BookmarksSidebar,
  BookmarksHeader,
  SortDropdown,
  EmptyState,
  LoadingSkeleton,
} from "./components";
import { useBookmarks } from "./hooks";

interface BookmarksPageProps {
  isArchive?: boolean;
}

function BookmarksContent({ isArchive }: { isArchive: boolean }) {
  const { tags: contextTags } = useTags();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const {
    bookmarks,
    availableTags,
    isLoading,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    refresh,
  } = useBookmarks({ isArchive });

  // Filter bookmarks by context tags
  const filteredBookmarks =
    contextTags.length > 0
      ? bookmarks.filter((b) =>
          contextTags.some((tag) => b.tags.includes(tag))
        )
      : bookmarks;

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <BookmarksSidebar isArchive={isArchive} tags={availableTags} />

      {/* Main Content */}
      <main className="flex-1 flex flex-col animate-fade-in">
        {/* Header */}
        <BookmarksHeader
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onAddClick={() => setIsAddDialogOpen(true)}
        />

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          <div className="px-6 py-4 flex items-center justify-between">
            <h1 className="text-xl font-semibold">
              {isArchive ? "Archived" : "All bookmarks"}
              {filteredBookmarks.length > 0 && (
                <span className="text-muted-foreground font-normal ml-2">
                  ({filteredBookmarks.length})
                </span>
              )}
            </h1>
            <SortDropdown value={sortBy} onChange={setSortBy} />
          </div>

          <ScrollArea className="h-[calc(100vh-180px)] px-6">
            {isLoading ? (
              <LoadingSkeleton />
            ) : filteredBookmarks.length === 0 ? (
              <EmptyState
                isArchive={isArchive}
                hasSearchQuery={!!searchQuery || contextTags.length > 0}
                onAddClick={() => setIsAddDialogOpen(true)}
              />
            ) : (
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 pb-6">
                {filteredBookmarks.map((bookmark, index) => (
                  <BookmarkCard
                    key={bookmark.id}
                    bookmark={bookmark}
                    onAction={refresh}
                    index={index}
                  />
                ))}
              </div>
            )}
          </ScrollArea>
        </div>
      </main>

      {/* Add Bookmark Dialog */}
      <AddBookmarkDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onSuccess={refresh}
      />
    </div>
  );
}

export default function BookmarksPage({
  isArchive = false,
}: BookmarksPageProps) {
  return (
    <TagsProvider>
      <BookmarksContent isArchive={isArchive} />
    </TagsProvider>
  );
}
