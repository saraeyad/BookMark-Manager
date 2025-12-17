import { useMemo, useState } from "react";
import { TagsProvider, useTags } from "@/context/TagContext";
import Logo from "@/components/bookmarks/Logo";
import TagsContainer from "@/components/bookmarks/TagsContainer";
import ResetTags from "@/components/bookmarks/ResetTags";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  PlusIcon,
  HomeIcon,
  ArchiveIcon,
  BookmarkIcon,
  SearchIcon,
  MoreVerticalIcon,
  ExternalLinkIcon,
  PinIcon,
  Trash2Icon,
  ArrowUpDownIcon,
  EyeIcon,
  ClockIcon,
  CalendarIcon,
} from "lucide-react";
import type { TagsType } from "@/types";
import { Link } from "react-router-dom";
import { ROUTES, MONTHS } from "@/constants";
import { useAuth } from "@/context/AuthContext";
import bookmarksData from "../../../data.json";

type Props = {
  isArchive?: boolean;
};

// Bookmark type from data.json
interface Bookmark {
  id: string;
  title: string;
  url: string;
  favicon: string;
  description: string;
  tags: string[];
  pinned: boolean;
  isArchived: boolean;
  visitCount: number;
  createdAt: string;
  lastVisited: string | null;
}

// Get all bookmarks from data.json
const ALL_BOOKMARKS: Bookmark[] = bookmarksData.bookmarks;

// Calculate tags from bookmarks
function calculateTags(bookmarks: Bookmark[]): TagsType {
  const tagCounts: Record<string, number> = {};
  bookmarks.forEach((bookmark) => {
    bookmark.tags.forEach((tag) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });
  return Object.entries(tagCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

// Format date to "9 Dec" format
function formatDate(dateString: string | null): string {
  if (!dateString) return "-";
  const date = new Date(dateString);
  return `${date.getDate()} ${MONTHS[date.getMonth()]}`;
}

// Get domain from URL
function getDomain(url: string): string {
  try {
    const domain = new URL(url).hostname;
    return domain.replace("www.", "");
  } catch {
    return url;
  }
}

// Get user initials
function getInitials(name?: string): string {
  if (!name) return "U";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function BookmarkCard({ bookmark }: { bookmark: Bookmark }) {
  return (
    <Card className="bg-card/50 border-border/50 hover:border-primary/30 transition-colors">
      <CardContent className="p-4">
        {/* Header with favicon, title, domain and menu */}
        <div className="flex items-start gap-3 mb-3">
          <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center overflow-hidden shrink-0">
            {bookmark.favicon ? (
              <img
                src={bookmark.favicon}
                alt=""
                className="w-8 h-8 object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            ) : (
              <BookmarkIcon className="w-6 h-6 text-muted-foreground" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground truncate">
              {bookmark.title}
            </h3>
            <p className="text-sm text-muted-foreground truncate">
              {getDomain(bookmark.url)}
            </p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                <MoreVerticalIcon className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <ExternalLinkIcon className="w-4 h-4 mr-2" />
                Open Link
              </DropdownMenuItem>
              <DropdownMenuItem>
                <PinIcon className="w-4 h-4 mr-2" />
                {bookmark.pinned ? "Unpin" : "Pin"}
              </DropdownMenuItem>
              <DropdownMenuItem>
                <ArchiveIcon className="w-4 h-4 mr-2" />
                {bookmark.isArchived ? "Unarchive" : "Archive"}
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
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
              className="text-xs bg-muted/50 border-border/50"
            >
              {tag}
            </Badge>
          ))}
        </div>

        {/* Footer with stats */}
        <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border/30">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <EyeIcon className="w-3.5 h-3.5" />
              {bookmark.visitCount}
            </span>
            <span className="flex items-center gap-1">
              <ClockIcon className="w-3.5 h-3.5" />
              {formatDate(bookmark.lastVisited)}
            </span>
            <span className="flex items-center gap-1">
              <CalendarIcon className="w-3.5 h-3.5" />
              {formatDate(bookmark.createdAt)}
            </span>
          </div>
          {bookmark.pinned && (
            <PinIcon className="w-4 h-4 text-primary" />
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function BookmarksContent({ isArchive }: { isArchive: boolean }) {
  const { tags: selectedTags } = useTags();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");

  // Filter bookmarks based on archive status, selected tags, and search query
  const bookmarks = useMemo(() => {
    return ALL_BOOKMARKS.filter((bookmark) => {
      // Filter by archive status
      if (bookmark.isArchived !== isArchive) return false;

      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = bookmark.title.toLowerCase().includes(query);
        const matchesDescription = bookmark.description
          .toLowerCase()
          .includes(query);
        if (!matchesTitle && !matchesDescription) return false;
      }

      // Filter by selected tags (if any)
      if (selectedTags.length > 0) {
        return selectedTags.some((tag) => bookmark.tags.includes(tag));
      }

      return true;
    });
  }, [isArchive, selectedTags, searchQuery]);

  // Calculate tags from non-archived bookmarks
  const availableTags = useMemo(() => {
    const nonArchivedBookmarks = ALL_BOOKMARKS.filter((b) => !b.isArchived);
    return calculateTags(nonArchivedBookmarks);
  }, []);

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border/50 flex flex-col bg-card/30">
        <div className="p-4">
          <Logo />
        </div>

        <nav className="px-3 space-y-1">
          <Link to={ROUTES.BOOKMARKS}>
            <Button
              variant={!isArchive ? "secondary" : "ghost"}
              className="w-full justify-start gap-2"
            >
              <HomeIcon className="w-4 h-4" />
              Home
            </Button>
          </Link>
          <Link to={ROUTES.BOOKMARKS_ARCHIVE}>
            <Button
              variant={isArchive ? "secondary" : "ghost"}
              className="w-full justify-start gap-2"
            >
              <ArchiveIcon className="w-4 h-4" />
              Archived
            </Button>
          </Link>
        </nav>

        <div className="px-4 pt-6">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Tags
          </h3>
          <ScrollArea className="h-[calc(100vh-220px)]">
            <ul className="space-y-0.5 pr-3">
              {availableTags.map((tag) => (
                <TagsContainer key={tag.name} tag={tag} />
              ))}
            </ul>
          </ScrollArea>
          <ResetTags />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="px-6 py-4 border-b border-border/50 flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by title..."
              className="pl-9 bg-muted/50 border-border/50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex-1" />
          <Button className="gap-2 bg-primary hover:bg-primary/90">
            <PlusIcon className="w-4 h-4" />
            Add Bookmark
          </Button>
          <Avatar className="h-9 w-9">
            <AvatarFallback className="bg-primary/20 text-primary text-sm">
              {getInitials(user?.name)}
            </AvatarFallback>
          </Avatar>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          <div className="px-6 py-4 flex items-center justify-between">
            <h1 className="text-xl font-semibold">
              {isArchive ? "Archived" : "All bookmarks"}
            </h1>
            <Button variant="outline" className="gap-2">
              <ArrowUpDownIcon className="w-4 h-4" />
              Sort by
            </Button>
          </div>

          <ScrollArea className="h-[calc(100vh-180px)] px-6">
            {bookmarks.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-96 text-center">
                <BookmarkIcon className="w-16 h-16 text-muted-foreground/50 mb-4" />
                <h2 className="text-xl font-semibold mb-2">
                  {searchQuery
                    ? "No bookmarks found"
                    : isArchive
                    ? "No archived bookmarks"
                    : "No bookmarks yet"}
                </h2>
                <p className="text-muted-foreground mb-4">
                  {searchQuery
                    ? "Try a different search term."
                    : isArchive
                    ? "Bookmarks you archive will appear here."
                    : "Start adding bookmarks to organize your favorite links."}
                </p>
                {!isArchive && !searchQuery && (
                  <Button className="gap-2">
                    <PlusIcon className="w-4 h-4" />
                    Add your first bookmark
                  </Button>
                )}
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 pb-6">
                {bookmarks.map((bookmark) => (
                  <BookmarkCard key={bookmark.id} bookmark={bookmark} />
                ))}
              </div>
            )}
          </ScrollArea>
        </div>
      </main>
    </div>
  );
}

export default function BookmarksPage({ isArchive = false }: Props) {
  return (
    <TagsProvider>
      <BookmarksContent isArchive={isArchive} />
    </TagsProvider>
  );
}
