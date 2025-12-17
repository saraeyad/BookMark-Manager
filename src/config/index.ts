export const config = {
  apiUrl: import.meta.env.VITE_API_URL || "http://localhost:3000",
  appName: "Bookmark Manager",
  devMode: import.meta.env.DEV,
} as const;

