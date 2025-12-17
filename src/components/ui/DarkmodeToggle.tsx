import { MoonIcon, PaletteIcon, SunIcon } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "./tabs";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

function DarkmodeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(id);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex items-center justify-between p-2">
      <div className="flex items-center gap-2">
        <PaletteIcon size={16} />
        Theme
      </div>
      <Tabs defaultValue={theme}>
        <TabsList>
          <TabsTrigger value="light" onClick={() => setTheme("light")}>
            <SunIcon />
          </TabsTrigger>
          <TabsTrigger value="dark" onClick={() => setTheme("dark")}>
            <MoonIcon />
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}

export default DarkmodeToggle;

