import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProjectHero } from "@/components/proyectos/ProjectHero";
import { proyectos, getProyectoBySlug } from "@/content/proyectos";

export function generateStaticParams() {
  return proyectos.map((proyecto) => ({ slug: proyecto.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const proyecto = getProyectoBySlug(slug);

  if (!proyecto) {
    return {};
  }

  return {
    title: `${proyecto.titulo} — David Suárez-Otero Redondo`,
    description: proyecto.descripcionCorta,
  };
}

export default async function ProyectoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const proyecto = getProyectoBySlug(slug);

  if (!proyecto) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
      <ProjectHero proyecto={proyecto} />

      <div className="mt-10 grid gap-8 sm:grid-cols-2">
        <div>
          <h2 className="font-display text-fg text-lg font-semibold">Problema</h2>
          <p className="text-fg-muted mt-2 text-sm leading-relaxed">{proyecto.problema}</p>
        </div>
        <div>
          <h2 className="font-display text-fg text-lg font-semibold">Solución</h2>
          <p className="text-fg-muted mt-2 text-sm leading-relaxed">{proyecto.solucion}</p>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="font-display text-fg text-lg font-semibold">Descripción completa</h2>
        <p className="text-fg-muted mt-2 text-sm leading-relaxed">{proyecto.descripcionCompleta}</p>
      </div>

      {proyecto.arquitectura && (
        <div className="mt-10">
          <h2 className="font-display text-fg text-lg font-semibold">Arquitectura</h2>
          <p className="text-fg-muted mt-2 text-sm leading-relaxed">{proyecto.arquitectura}</p>
        </div>
      )}

      <div className="mt-10">
        <h2 className="font-display text-fg text-lg font-semibold">Funcionalidades principales</h2>
        <ul className="text-fg-muted mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed">
          {proyecto.funcionalidades.map((funcionalidad) => (
            <li key={funcionalidad}>{funcionalidad}</li>
          ))}
        </ul>
      </div>

      <div className="mt-10">
        <h2 className="font-display text-fg text-lg font-semibold">Decisiones técnicas</h2>
        <ul className="text-fg-muted mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed">
          {proyecto.decisionesTecnicas.map((decision) => (
            <li key={decision}>{decision}</li>
          ))}
        </ul>
      </div>

      {proyecto.aprendizajes && (
        <div className="mt-10">
          <h2 className="font-display text-fg text-lg font-semibold">Aprendizajes</h2>
          <p className="text-fg-muted mt-2 text-sm leading-relaxed">{proyecto.aprendizajes}</p>
        </div>
      )}
    </div>
  );
}
