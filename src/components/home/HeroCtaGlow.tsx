"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

import { pulseGlow } from "@/lib/motion-variants";

/**
 * Envuelve el CTA principal del Hero con un micro-pulso muy sutil en el
 * glow de acento (docs/05-sistema-diseno.md §5): nunca parpadeante, ciclo
 * largo (3.5s) para que se perciba como "vivo" sin llamar la atención.
 * Desactivado por completo con `prefers-reduced-motion`.
 */
export function HeroCtaGlow({ children }: { children: ReactNode }) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <>{children}</>;
  }

  return (
    <div className="relative inline-flex">
      <motion.span
        aria-hidden="true"
        className="glow-accent pointer-events-none absolute inset-0 -z-10 rounded-md"
        animate={pulseGlow}
        style={{ willChange: "opacity" }}
      />
      {children}
    </div>
  );
}
