import { BookmarkIcon } from "lucide-react";

function Logo({ className }: { className?: string }) {
  return (
    <div className={`font-bold flex gap-2.5 items-center ${className || ""}`}>
      <div className="bg-primary p-2 flex items-center justify-center rounded-lg">
        <BookmarkIcon className="text-primary-foreground" size={18} />
      </div>
      <span className="font-semibold text-lg text-foreground">
        Bookmark Manager
      </span>
    </div>
  );
}

export default Logo;
