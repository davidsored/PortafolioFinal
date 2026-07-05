import { Button } from "@/components/ui/Button";
import type { Proyecto } from "@/content/types";

import { TechBadgeList } from "./TechBadgeList";

export function ProjectHero({ proyecto }: { proyecto: Proyecto }) {
  return (
    <div className="border-border border-b pb-10">
      <h1 className="font-display text-fg text-3xl font-semibold sm:text-4xl">{proyecto.titulo}</h1>
      <p className="text-fg-muted mt-3 max-w-2xl text-lg">{proyecto.descripcionCorta}</p>

      <div className="mt-6">
        <TechBadgeList tecnologias={proyecto.tecnologias} />
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Button href={proyecto.repoUrl} variant="ghost">
          Ver repositorio
        </Button>
        {proyecto.demoUrl && <Button href={proyecto.demoUrl}>Ver demo</Button>}
      </div>
    </div>
  );
}
