import { Toaster as SonnerToaster } from "sonner";
import { useTheme } from "next-themes";

export function ThemedToaster() {
  const { theme } = useTheme();
  
  return (
    <SonnerToaster
      position="top-right"
      closeButton
      duration={3000}
      richColors
      theme={theme === "dark" ? "dark" : "light"}
    />
  );
}

