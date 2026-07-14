"use client";

import dynamic from "next/dynamic";

// next/dynamic con ssr:false solo se permite dentro de un Client Component
// (Next.js 16). Footer.tsx es Server Component, así que este wrapper es el
// único punto "use client" — mantiene el resto del footer en el servidor.
export const OnePieceEggLoader = dynamic(
  () => import("./OnePieceEgg").then((mod) => mod.OnePieceEgg),
  { ssr: false },
);
