"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { cn } from "@/lib/cn";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const NAV_LINKS = [
  { href: "/sobre-mi", label: "Sobre mí" },
  { href: "/proyectos", label: "Proyectos" },
  { href: "/stack", label: "Stack" },
  { href: "/contacto", label: "Contacto" },
];

export function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="border-border bg-bg/80 sticky top-0 z-50 border-b backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <Link
          href="/"
          className="font-display text-fg text-lg font-semibold"
          onClick={() => setIsMenuOpen(false)}
        >
          David Suárez-Otero
        </Link>

        <nav aria-label="Principal" className="hidden items-center gap-6 sm:flex">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "text-sm transition-colors",
                  isActive ? "text-accent" : "text-fg-muted hover:text-fg",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav"
            className="border-border text-fg flex h-9 w-9 items-center justify-center rounded-md border sm:hidden"
          >
            {isMenuOpen ? (
              <X className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Menu className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <nav
          id="mobile-nav"
          aria-label="Principal (móvil)"
          className="border-border flex flex-col gap-1 border-t px-6 py-4 sm:hidden"
        >
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                onClick={() => setIsMenuOpen(false)}
                className={cn(
                  "rounded-md px-2 py-2 text-sm transition-colors",
                  isActive ? "text-accent" : "text-fg-muted hover:text-fg",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      )}
    </header>
  );
}
