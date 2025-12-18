import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon, PlusIcon } from "lucide-react";
import { UserMenu } from "./UserMenu";

interface BookmarksHeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onAddClick: () => void;
}

export function BookmarksHeader({
  searchQuery,
  onSearchChange,
  onAddClick,
}: BookmarksHeaderProps) {
  return (
    <header className="px-6 py-4 border-b border-border/50 flex items-center gap-4">
      <div className="relative flex-1 max-w-md">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search by title..."
          className="pl-9 bg-muted/50 border-border/50"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="flex-1" />
      <Button
        className="gap-2 bg-primary hover:bg-primary/90"
        onClick={onAddClick}
      >
        <PlusIcon className="w-4 h-4" />
        Add Bookmark
      </Button>
      <UserMenu />
    </header>
  );
}

