import { BookmarkIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { ROUTES } from "@/constants";

interface LogoProps {
  className?: string;
  showText?: boolean;
  linkTo?: string;
}

export function Logo({
  className = "",
  showText = true,
  linkTo = ROUTES.BOOKMARKS,
}: LogoProps) {
  const content = (
    <div
      className={`font-bold flex gap-2.5 items-center transition-opacity hover:opacity-80 ${className}`}
    >
      <div className="bg-primary p-2 flex items-center justify-center rounded-lg shadow-sm">
        <BookmarkIcon className="text-primary-foreground" size={18} />
      </div>
      {showText && (
        <span className="font-semibold text-lg text-foreground">
          Bookmark Manager
        </span>
      )}
    </div>
  );

  if (linkTo) {
    return (
      <Link to={linkTo} className="outline-none">
        {content}
      </Link>
    );
  }

  return content;
}

export default Logo;

