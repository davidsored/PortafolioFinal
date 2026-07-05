import type { Metadata } from "next";

import { ContactForm } from "@/components/contacto/ContactForm";
import { Button } from "@/components/ui/Button";
import { perfil } from "@/content/perfil";

export const metadata: Metadata = {
  title: "Contacto — David Suárez-Otero Redondo",
  description:
    "Disponible para posiciones de Backend, Fullstack o AI Engineer junior. Respondo por email o LinkedIn en menos de 48h.",
};

export default function ContactoPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16 sm:py-24">
      <h1 className="font-display text-fg text-3xl font-semibold sm:text-4xl">
        Hablemos de tu equipo y de cómo puedo ayudar.
      </h1>
      <p className="text-fg-muted mt-4 text-base">
        Disponible para posiciones de Backend, Fullstack o AI Engineer junior. Respondo por email o
        LinkedIn en menos de 48h.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <Button href={`mailto:${perfil.email}`} variant="ghost">
          {perfil.email}
        </Button>
        <Button href={perfil.linkedinUrl} variant="ghost">
          LinkedIn
        </Button>
        <Button href={perfil.githubUrl} variant="ghost">
          GitHub
        </Button>
        <Button href={perfil.cvUrl} variant="ghost">
          Descargar CV
        </Button>
      </div>

      <div className="border-border mt-12 border-t pt-12">
        <h2 className="font-display text-fg text-lg font-semibold">O escríbeme directamente</h2>
        <div className="mt-6">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
