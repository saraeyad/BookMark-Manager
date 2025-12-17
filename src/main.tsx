import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AppRouter from "./router/AppRouter";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import { ThemedToaster } from "./components/ui/ThemedToaster";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <AppRouter />
        <ThemedToaster />
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);
