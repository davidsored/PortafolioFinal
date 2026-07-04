"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { cn } from "@/lib/cn";
import { useHasMounted } from "@/lib/useHasMounted";

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const hasMounted = useHasMounted();

  const isDark = hasMounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      className={cn(
        "border-border text-fg hover:border-accent hover:text-accent flex h-9 w-9 items-center justify-center rounded-md border transition-colors",
        className,
      )}
    >
      {hasMounted ? (
        isDark ? (
          <Sun className="h-4 w-4" aria-hidden="true" />
        ) : (
          <Moon className="h-4 w-4" aria-hidden="true" />
        )
      ) : (
        <span className="h-4 w-4" />
      )}
    </button>
  );
}
