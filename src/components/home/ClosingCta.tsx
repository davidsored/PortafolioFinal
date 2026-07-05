import { Button } from "@/components/ui/Button";
import { perfil } from "@/content/perfil";

export function ClosingCta() {
  return (
    <div className="border-border border-t">
      <div className="mx-auto max-w-3xl px-6 py-20 text-center">
        <h2 className="font-display text-fg text-2xl font-semibold sm:text-3xl">
          ¿Buscas un backend/fullstack junior que ya sabe entregar? Hablemos.
        </h2>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button href="/contacto">Contactar</Button>
          <Button href={perfil.githubUrl} variant="ghost">
            Ver GitHub
          </Button>
        </div>
      </div>
    </div>
  );
}
