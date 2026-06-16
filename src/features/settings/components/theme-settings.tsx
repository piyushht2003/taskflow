"use client";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Monitor, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeSettings() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-24 bg-secondary/20 rounded-lg border border-border/50 animate-pulse"></div>;
  }

  return (
    <div className="p-4 bg-secondary/20 rounded-lg border border-border/50 flex flex-col gap-3">
      <div>
        <h4 className="font-medium text-sm mb-1">Theme Preference</h4>
        <p className="text-xs text-muted-foreground">Select how TaskFlow looks for you.</p>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button 
          variant={theme === "light" ? "default" : "outline"} 
          className="gap-2 flex-1 sm:flex-none justify-start"
          onClick={() => setTheme("light")}
        >
          <Sun className="h-4 w-4" /> Light
        </Button>
        <Button 
          variant={theme === "dark" ? "default" : "outline"} 
          className="gap-2 flex-1 sm:flex-none justify-start"
          onClick={() => setTheme("dark")}
        >
          <Moon className="h-4 w-4" /> Dark
        </Button>
        <Button 
          variant={theme === "system" ? "default" : "outline"} 
          className="gap-2 flex-1 sm:flex-none justify-start"
          onClick={() => setTheme("system")}
        >
          <Monitor className="h-4 w-4" /> System
        </Button>
      </div>
    </div>
  );
}
