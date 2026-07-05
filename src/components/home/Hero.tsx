import { Button } from "@/components/ui/Button";
import { perfil } from "@/content/perfil";

export function Hero() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-24 text-center sm:py-32">
      <h1 className="font-display text-fg text-4xl font-semibold sm:text-5xl">
        Construyo aplicaciones web que funcionan de verdad.
      </h1>
      <p className="text-fg-muted mx-auto mt-6 max-w-2xl text-lg">{perfil.titulo}</p>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Button href="/proyectos">Ver proyectos</Button>
        <Button href={perfil.cvUrl} variant="ghost">
          Descargar CV
        </Button>
      </div>
    </div>
  );
}
