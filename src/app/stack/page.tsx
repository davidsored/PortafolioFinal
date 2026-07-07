import type { Metadata } from "next";

import { TechBadgeList } from "@/components/proyectos/TechBadgeList";
import { ScrollReveal, ScrollRevealItem } from "@/components/ui/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { stack } from "@/content/stack";

export const metadata: Metadata = {
  title: "Stack tecnológico — David Suárez-Otero Redondo",
  description:
    "Backend, frontend, bases de datos y herramientas, con el contexto de para qué las he usado en cada proyecto.",
};

export default function StackPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
      <SectionHeading
        eyebrow="Stack"
        title="Construyo aplicaciones completas usando tecnologías modernas"
        description="No es una lista de logos: cada tecnología está aquí porque la he usado para resolver algo concreto."
      />

      <ScrollReveal stagger className="mt-12 space-y-10">
        {stack.map((categoria) => (
          <ScrollRevealItem key={categoria.id} className="border-border border-t pt-8">
            <h2 className="font-display text-fg text-xl font-semibold">{categoria.titulo}</h2>
            <div className="mt-3">
              <TechBadgeList tecnologias={categoria.tecnologias} />
            </div>
            <p className="text-fg-muted mt-4 text-sm leading-relaxed">{categoria.narrativa}</p>
          </ScrollRevealItem>
        ))}
      </ScrollReveal>
    </div>
  );
}
