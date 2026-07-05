import Image from "next/image";
import Link from "next/link";

import { Card } from "@/components/ui/Card";
import type { Proyecto } from "@/content/types";

import { TechBadgeList } from "./TechBadgeList";

export function ProjectCard({ proyecto }: { proyecto: Proyecto }) {
  return (
    <Link href={`/proyectos/${proyecto.slug}`} className="group block">
      <Card className="hover:border-accent hover:glow-accent h-full overflow-hidden">
        {proyecto.imagenPortada && (
          <div className="relative -mx-6 -mt-6 mb-4 aspect-video">
            <Image
              src={proyecto.imagenPortada}
              alt={`Captura de ${proyecto.titulo}`}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-150 group-hover:scale-[1.02]"
            />
          </div>
        )}
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
