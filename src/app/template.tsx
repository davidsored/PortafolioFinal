"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState, type ReactNode } from "react";

import { pageFade } from "@/lib/motion-variants";

/**
 * Vale `true` durante el SSR y la hidratación inicial (el efecto que la apaga
 * solo corre en cliente), así el HTML del servidor nunca llega con
 * `opacity: 0` inline y el elemento LCP pinta sin esperar a la hidratación.
 * Las navegaciones cliente posteriores remontan este template con la bandera
 * ya en `false` y son las únicas que reciben el fade.
 */
let isInitialLoad = true;

/**
 * `template.tsx` se remonta en cada navegación (a diferencia de `layout.tsx`),
 * lo que da un fade simple al cambiar de ruta sin efectos de página completa.
 * Server components hijos (page.tsx de cada ruta) siguen renderizando en el
 * servidor; este wrapper solo anima la entrada del árbol ya resuelto.
 */
export default function Template({ children }: { children: ReactNode }) {
  const shouldReduceMotion = useReducedMotion();
  const [skipEntrance] = useState(isInitialLoad);

  useEffect(() => {
    isInitialLoad = false;
  }, []);

  if (shouldReduceMotion) {
    return <>{children}</>;
  }

  return (
    <motion.div initial={skipEntrance ? false : "hidden"} animate="visible" variants={pageFade}>
      {children}
    </motion.div>
  );
}
