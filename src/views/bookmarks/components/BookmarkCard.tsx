import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  BookmarkIcon,
  MoreVerticalIcon,
  ExternalLinkIcon,
  PinIcon,
  ArchiveIcon,
  Trash2Icon,
  EyeIcon,
  ClockIcon,
  CalendarIcon,
} from "lucide-react";
import { bookmarkService, type Bookmark } from "@/services/bookmarkService";
import { toast } from "sonner";
import { formatDate, getDomain, getFaviconUrl } from "../utils";

interface BookmarkCardProps {
  bookmark: Bookmark;
  onAction: () => void;
  index?: number;
}

export function BookmarkCard({ bookmark, onAction, index = 0 }: BookmarkCardProps) {
  const handleOpenLink = async () => {
    await bookmarkService.visitBookmark(bookmark.id);
    window.open(bookmark.url, "_blank");
    onAction();
  };

  const handleTogglePin = async () => {
    await bookmarkService.togglePinBookmark(bookmark.id);
    toast.success(bookmark.pinned ? "Unpinned bookmark" : "Pinned bookmark");
    onAction();
  };

  const handleToggleArchive = async () => {
    await bookmarkService.toggleArchiveBookmark(bookmark.id);
    toast.success(
      bookmark.isArchived ? "Restored bookmark" : "Archived bookmark"
    );
    onAction();
  };

  const handleDelete = async () => {
    await bookmarkService.deleteBookmark(bookmark.id);
    toast.success("Bookmark deleted");
    onAction();
  };

  const faviconUrl = getFaviconUrl(bookmark.url);
  const staggerClass = index < 9 ? `stagger-${index + 1}` : "";

  return (
    <Card
      className={`
        bg-card/50 border-border/50 
        hover:border-primary/30 hover:shadow-lg 
        transition-all duration-200 ease-out
        animate-stagger-in ${staggerClass}
      `}
    >
      <CardContent className="p-4">
        {/* Header with favicon, title, domain and menu */}
        <div className="flex items-start gap-3 mb-3">
          <div
            className=" rounded-lg bg-transparent border border-border/90 flex items-center justify-center overflow-hidden shrink-0 cursor-pointer hover:scale-105 transition-transform"
            onClick={handleOpenLink}
          >
            {faviconUrl ? (
              <img
                src={faviconUrl}
                alt=""
                className="w-12 h-12 object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                  (
                    e.target as HTMLImageElement
                  ).nextElementSibling?.classList.remove("hidden");
                }}
              />
            ) : null}
            <BookmarkIcon
              className={`w-6 h-6 text-muted-foreground ${faviconUrl ? "hidden" : ""}`}
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3
              className="font-semibold text-foreground truncate cursor-pointer hover:text-primary transition-colors"
              onClick={handleOpenLink}
            >
              {bookmark.title}
            </h3>
            <p className="text-sm text-muted-foreground truncate">
              {getDomain(bookmark.url)}
            </p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 shrink-0 opacity-60 hover:opacity-100 transition-opacity"
              >
                <MoreVerticalIcon className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="animate-scale-in">
              <DropdownMenuItem onClick={handleOpenLink}>
                <ExternalLinkIcon className="w-4 h-4 mr-2" />
                Open Link
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleTogglePin}>
                <PinIcon className="w-4 h-4 mr-2" />
                {bookmark.pinned ? "Unpin" : "Pin"}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleToggleArchive}>
                <ArchiveIcon className="w-4 h-4 mr-2" />
                {bookmark.isArchived ? "Restore" : "Archive"}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleDelete}
                className="text-destructive focus:text-destructive"
              >
                <Trash2Icon className="w-4 h-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
          {bookmark.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {bookmark.tags.map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="text-xs bg-muted/50 border-border/50 hover:bg-primary/10 hover:border-primary/30 transition-colors cursor-default"
            >
              {tag}
            </Badge>
          ))}
        </div>

        {/* Footer with stats */}
        <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border/30">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1" title="Visit count">
              <EyeIcon className="w-3.5 h-3.5" />
              {bookmark.visitCount}
            </span>
            <span className="flex items-center gap-1" title="Last visited">
              <ClockIcon className="w-3.5 h-3.5" />
              {formatDate(bookmark.lastVisited)}
            </span>
            <span className="flex items-center gap-1" title="Created">
              <CalendarIcon className="w-3.5 h-3.5" />
              {formatDate(bookmark.createdAt)}
            </span>
          </div>
          {bookmark.pinned && (
            <PinIcon className="w-4 h-4 text-primary animate-fade-in" />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
