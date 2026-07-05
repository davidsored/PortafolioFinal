import type { HTMLAttributes } from "react";

import { cn } from "@/lib/cn";

export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "border-border text-fg-muted inline-flex items-center rounded-md border px-2 py-1 font-mono text-xs",
        className,
      )}
      {...props}
    />
  );
}
