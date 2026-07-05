import Link from "next/link";

import { Card } from "@/components/ui/Card";
import type { Proyecto } from "@/content/types";

import { TechBadgeList } from "./TechBadgeList";

export function ProjectCard({ proyecto }: { proyecto: Proyecto }) {
  return (
    <Link href={`/proyectos/${proyecto.slug}`} className="group block">
      <Card className="hover:border-accent hover:glow-accent h-full">
        <h3 className="font-display text-fg group-hover:text-accent text-xl font-semibold transition-colors">
          {proyecto.titulo}
        </h3>
        <p className="text-fg-muted mt-2 text-sm">{proyecto.descripcionCorta}</p>
        <div className="mt-4">
          <TechBadgeList tecnologias={proyecto.tecnologias} />
        </div>
      </Card>
    </Link>
  );
}
