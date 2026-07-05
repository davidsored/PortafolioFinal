import type { Metadata } from "next";

import { sobreMiParrafos } from "@/content/sobre-mi";

export const metadata: Metadata = {
  title: "Sobre mí — David Suárez-Otero Redondo",
  description:
    "Cómo trabajo, qué domino y hacia dónde voy: de .NET a Python e integración de IA en aplicaciones reales.",
};

export default function SobreMiPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16 sm:py-24">
      <h1 className="font-display text-fg text-3xl font-semibold sm:text-4xl">Sobre mí</h1>
      <div className="mt-8 space-y-5">
        {sobreMiParrafos.map((parrafo, index) => (
          <p key={index} className="text-fg-muted text-base leading-relaxed">
            {parrafo}
          </p>
        ))}
      </div>
    </div>
  );
}
