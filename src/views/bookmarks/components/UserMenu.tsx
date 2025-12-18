import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOutIcon, SunIcon, MoonIcon, PaletteIcon } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "next-themes";
import { ROUTES } from "@/constants";
import { toast } from "sonner";
import { getInitials } from "../utils";

export function UserMenu() {
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate(ROUTES.LOGIN);
    toast.success("Logged out successfully");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-10 w-10 rounded-full p-0">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-primary text-white text-sm font-medium">
              {getInitials(user?.name)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {/* User Info */}
        <div className="px-3 py-2">
          <p className="font-medium text-foreground">{user?.name || "User"}</p>
          <p className="text-sm text-muted-foreground">{user?.email || ""}</p>
        </div>
        <DropdownMenuSeparator />

        {/* Theme Toggle */}
        <div className="px-3 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm">
            <PaletteIcon className="w-4 h-4" />
            Theme
          </div>
          <div className="flex items-center gap-1 bg-muted rounded-md p-1">
            <Button
              variant={theme === "light" ? "secondary" : "ghost"}
              size="icon"
              className="h-7 w-7"
              onClick={() => setTheme("light")}
            >
              <SunIcon className="w-4 h-4" />
            </Button>
            <Button
              variant={theme === "dark" ? "secondary" : "ghost"}
              size="icon"
              className="h-7 w-7"
              onClick={() => setTheme("dark")}
            >
              <MoonIcon className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <DropdownMenuSeparator />

        {/* Logout */}
        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
          <LogOutIcon className="w-4 h-4 mr-2" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

