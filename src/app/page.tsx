import type { Metadata } from "next";

import { ClosingCta } from "@/components/home/ClosingCta";
import { Hero } from "@/components/home/Hero";
import { ValueProposition } from "@/components/home/ValueProposition";
import { perfil } from "@/content/perfil";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "David Suárez-Otero Redondo — Desarrollador Backend & Fullstack Junior",
  description:
    "Desarrollador backend junior especializado en C#, ASP.NET Core y Blazor, ampliando hacia Python e IA. Proyectos reales, no tutoriales.",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: perfil.nombre,
  jobTitle: perfil.titulo,
  url: siteUrl,
  sameAs: [perfil.githubUrl, perfil.linkedinUrl],
  email: perfil.email,
};

export default function Home() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <Hero />
      <ValueProposition />
      <ClosingCta />
    </div>
  );
}
