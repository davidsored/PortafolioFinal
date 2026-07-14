import type { Metadata } from "next";

import { ProjectCard } from "@/components/proyectos/ProjectCard";
import { ScrollReveal, ScrollRevealItem } from "@/components/ui/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { proyectosPrincipales, proyectosSecundarios } from "@/content/proyectos";

export const metadata: Metadata = {
  title: "Proyectos — David Suárez-Otero Redondo",
  description:
    "Coworking Manager, CourtManager y PokedexIA: tres aplicaciones completas con tests, CI/CD y despliegue real.",
};

export default function ProyectosPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16 sm:py-24">
      <SectionHeading
        eyebrow="Proyectos"
        title="Aplicaciones completas, no ejercicios"
        description="Cada ficha incluye el problema real que resuelve, las decisiones técnicas tomadas y qué aprendí construyéndola."
      />

      <ScrollReveal stagger className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {proyectosPrincipales.map((proyecto) => (
          <ScrollRevealItem key={proyecto.slug}>
            <ProjectCard proyecto={proyecto} />
          </ScrollRevealItem>
        ))}
      </ScrollReveal>

      <div className="mt-16">
        <h2 className="font-display text-fg text-xl font-semibold">Proyectos secundarios</h2>
        <ScrollReveal stagger className="mt-6 grid gap-6 sm:grid-cols-2">
          {proyectosSecundarios.map((proyecto) => (
            <ScrollRevealItem key={proyecto.slug}>
              <ProjectCard proyecto={proyecto} />
            </ScrollRevealItem>
          ))}
        </ScrollReveal>
      </div>
    </div>
  );
}
