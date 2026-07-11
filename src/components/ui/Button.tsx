import { cva, type VariantProps } from "class-variance-authority";
import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/cn";

const buttonVariants = cva(
  "focus-visible:outline-accent inline-flex h-11 items-center justify-center rounded-md px-6 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-fg text-bg hover:opacity-90",
        ghost: "border-border text-fg hover:border-accent hover:text-accent border",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  },
);

type LinkButtonProps = VariantProps<typeof buttonVariants> &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

type NativeButtonProps = VariantProps<typeof buttonVariants> &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

export function Button(props: LinkButtonProps | NativeButtonProps) {
  const { variant, className, ...rest } = props;
  const classes = cn(buttonVariants({ variant }), className);

  if (typeof rest.href === "string") {
    const { href, ...anchorProps } = rest as LinkButtonProps;
    const isExternal = href.startsWith("http") || href.startsWith("mailto:");
    // Un archivo estático de public/ (p. ej. el PDF del CV) no es una ruta de
    // la app: si pasara por next/link, Next lo prefetchearía como payload RSC.
    const isStaticFile = /\.[a-z\d]+$/i.test(href);

    if (isExternal || isStaticFile) {
      return (
        <a
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
          className={classes}
          {...anchorProps}
        />
      );
    }

    return <Link href={href} className={classes} {...anchorProps} />;
  }

  const { type = "button", ...buttonProps } = rest as NativeButtonProps;
  return <button type={type} className={classes} {...buttonProps} />;
}
