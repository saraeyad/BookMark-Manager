import { Button } from "@/components/ui/button";
import { BookmarkIcon, PlusIcon, SearchIcon, ArchiveIcon } from "lucide-react";

interface EmptyStateProps {
  isArchive: boolean;
  hasSearchQuery: boolean;
  onAddClick: () => void;
}

export function EmptyState({
  isArchive,
  hasSearchQuery,
  onAddClick,
}: EmptyStateProps) {
  const Icon = hasSearchQuery
    ? SearchIcon
    : isArchive
    ? ArchiveIcon
    : BookmarkIcon;

  return (
    <div className="flex flex-col items-center justify-center h-96 text-center animate-fade-in">
      <div className="w-20 h-20 rounded-full bg-muted/50 flex items-center justify-center mb-6 animate-scale-in">
        <Icon className="w-10 h-10 text-muted-foreground/50" />
      </div>
      <h2 className="text-xl font-semibold mb-2 animate-slide-up">
        {hasSearchQuery
          ? "No bookmarks found"
          : isArchive
          ? "No archived bookmarks"
          : "No bookmarks yet"}
      </h2>
      <p
        className="text-muted-foreground mb-6 max-w-md animate-slide-up"
        style={{ animationDelay: "0.1s" }}
      >
        {hasSearchQuery
          ? "Try adjusting your search or filters to find what you're looking for."
          : isArchive
          ? "Bookmarks you archive will appear here. You can restore them anytime."
          : "Start building your collection of favorite links. They'll be organized, searchable, and always within reach."}
      </p>
      {!isArchive && !hasSearchQuery && (
        <Button
          className="gap-2 animate-slide-up"
          style={{ animationDelay: "0.2s" }}
          onClick={onAddClick}
        >
          <PlusIcon className="w-4 h-4" />
          Add your first bookmark
        </Button>
      )}
    </div>
  );
}
