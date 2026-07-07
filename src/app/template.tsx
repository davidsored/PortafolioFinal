"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

import { pageFade } from "@/lib/motion-variants";

/**
 * `template.tsx` se remonta en cada navegación (a diferencia de `layout.tsx`),
 * lo que da un fade simple al cambiar de ruta sin efectos de página completa.
 * Server components hijos (page.tsx de cada ruta) siguen renderizando en el
 * servidor; este wrapper solo anima la entrada del árbol ya resuelto.
 */
export default function Template({ children }: { children: ReactNode }) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <>{children}</>;
  }

  return (
    <motion.div initial="hidden" animate="visible" variants={pageFade}>
      {children}
    </motion.div>
  );
}
