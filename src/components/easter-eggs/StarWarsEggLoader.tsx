"use client";

import dynamic from "next/dynamic";

// next/dynamic con ssr:false solo se permite dentro de un Client Component
// (Next.js 16). layout.tsx es Server Component, así que este wrapper es el
// único punto "use client" — mantiene el resto del layout en el servidor.
export const StarWarsEggLoader = dynamic(
  () => import("./StarWarsEgg").then((mod) => mod.StarWarsEgg),
  { ssr: false },
);
