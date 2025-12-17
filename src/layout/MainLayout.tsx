import { ReactNode } from "react";
import LogoutBtn from "@/components/bookmarks/LogoutBtn";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Bookmark Manager</h1>
        <LogoutBtn />
      </header>
      <main className="p-4">{children}</main>
    </div>
  );
}

