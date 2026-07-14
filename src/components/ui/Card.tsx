import type { HTMLAttributes } from "react";

import { cn } from "@/lib/cn";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "border-border bg-bg-elevated rounded-lg border p-6 transition-shadow",
        className,
      )}
      {...props}
    />
  );
}
