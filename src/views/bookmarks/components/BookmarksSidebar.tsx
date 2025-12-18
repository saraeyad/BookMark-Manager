import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { HomeIcon, ArchiveIcon } from "lucide-react";
import { Logo } from "@/components/bookmarks/Logo";
import TagsContainer from "@/components/bookmarks/TagsContainer";
import { ROUTES } from "@/constants";
import type { TagsType } from "@/schemas";

interface BookmarksSidebarProps {
  isArchive: boolean;
  tags: TagsType;
}

export function BookmarksSidebar({ isArchive, tags }: BookmarksSidebarProps) {
  return (
    <aside className="w-64 border-r border-border/50 flex flex-col bg-card/30 animate-slide-in-left">
      <div className="p-4">
        <Logo linkTo={ROUTES.BOOKMARKS} />
      </div>

      <nav className="px-3 flex flex-col gap-1">
        <Link to={ROUTES.BOOKMARKS}>
          <Button
            variant={!isArchive ? "secondary" : "ghost"}
            className="w-full justify-start gap-2 transition-all duration-200"
          >
            <HomeIcon className="w-4 h-4" />
            Home
          </Button>
        </Link>
        <Link to={ROUTES.BOOKMARKS_ARCHIVE}>
          <Button
            variant={isArchive ? "secondary" : "ghost"}
            className="w-full justify-start gap-2 transition-all duration-200"
          >
            <ArchiveIcon className="w-4 h-4" />
            Archived
          </Button>
        </Link>
      </nav>

      <div className="px-4 pt-6 flex-1 flex flex-col min-h-0">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Tags
        </h3>
      
        <ScrollArea className="flex-1 h-[calc(100vh-220px)]">
          <div className="flex flex-col gap-0.5 pr-3">
            {tags.map((tag, index) => (
              <div
                key={tag.name}
                className="animate-stagger-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <TagsContainer tag={tag} />
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </aside>
  );
}
