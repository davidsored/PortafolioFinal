import { OnePieceEggLoader } from "@/components/easter-eggs/OnePieceEggLoader";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/icons";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-border mt-auto border-t">
      <div className="text-fg-muted mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm sm:flex-row">
        <div className="flex items-center gap-2">
          <p>© {year} David Suárez-Otero Redondo</p>
          <OnePieceEggLoader />
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/davidsored"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub de David Suárez-Otero"
            className="hover:text-fg transition-colors"
          >
            <GitHubIcon className="h-5 w-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/david-suarez-otero-redondo/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn de David Suárez-Otero"
            className="hover:text-fg transition-colors"
          >
            <LinkedInIcon className="h-5 w-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
