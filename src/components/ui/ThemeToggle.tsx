"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, toggleTheme, mounted } = useTheme();

  if (!mounted) {
    return <div className={cn("w-9 h-9 rounded-xl", className)} />;
  }

  return (
    <button
      onClick={toggleTheme}
      title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      className={cn(
        "w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200",
        "text-[var(--text-secondary)] hover:text-[var(--text-primary)]",
        "hover:bg-[var(--bg-secondary)] active:scale-95",
        className
      )}
    >
      {theme === "light" ? (
        <Moon size={17} strokeWidth={1.8} />
      ) : (
        <Sun size={17} strokeWidth={1.8} />
      )}
    </button>
  );
}
