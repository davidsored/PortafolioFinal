import { cn } from "@/lib/cn";

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", className)}>
      {eyebrow && (
        <p className="text-accent font-mono text-sm tracking-wide uppercase">{eyebrow}</p>
      )}
      <h2 className="font-display text-fg mt-2 text-2xl font-semibold sm:text-3xl">{title}</h2>
      {description && <p className="text-fg-muted mt-3 text-base">{description}</p>}
    </div>
  );
}
