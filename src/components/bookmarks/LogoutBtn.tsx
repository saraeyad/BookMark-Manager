import { Button } from "@/components/ui/button";
import { LogOutIcon } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ROUTES } from "@/constants";

function LogoutBtn() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  function handleLogoutUser() {
    logout();
    navigate(ROUTES.LOGIN);
    toast.success("Logged out successfully");
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      className="px-0 has-[>svg]:px-0 gap-2"
      onClick={handleLogoutUser}
    >
      <LogOutIcon />
      Logout
    </Button>
  );
}

export default LogoutBtn;

