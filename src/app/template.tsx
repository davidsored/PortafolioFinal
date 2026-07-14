"use client";

import { useEffect, useState, type ReactNode } from "react";

/**
 * Vale `true` durante el SSR y la hidratación inicial (el efecto que la apaga
 * solo corre en cliente), así el HTML del servidor nunca llega con
 * `opacity: 0` y el elemento LCP pinta sin esperar a la hidratación.
 * Las navegaciones cliente posteriores remontan este template con la bandera
 * ya en `false` y son las únicas que reciben el fade.
 */
let isInitialLoad = true;

/**
 * `template.tsx` se remonta en cada navegación (a diferencia de `layout.tsx`),
 * lo que da un fade simple al cambiar de ruta sin efectos de página completa.
 * Server components hijos (page.tsx de cada ruta) siguen renderizando en el
 * servidor; este wrapper solo anima la entrada del árbol ya resuelto.
 *
 * El fade se implementa con CSS (`.page-fade`, globals.css) y no con
 * `motion/react` a propósito: al ser este el entry cliente raíz, importar
 * motion aquí hacía que Turbopack lo incluyera en dos grafos cliente sin
 * deduplicar (~88 KB gz duplicados en todas las páginas, medidos en Fase 5).
 * Excepción a la regla de motion validada por staff-engineer — ver
 * docs/02-arquitectura.md §6. `prefers-reduced-motion` se respeta en el CSS.
 */
export default function Template({ children }: { children: ReactNode }) {
  const [skipEntrance] = useState(isInitialLoad);

  useEffect(() => {
    isInitialLoad = false;
  }, []);

  return <div className={skipEntrance ? undefined : "page-fade"}>{children}</div>;
}
