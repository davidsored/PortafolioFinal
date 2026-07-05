import type { Metadata } from "next";

import { ClosingCta } from "@/components/home/ClosingCta";
import { Hero } from "@/components/home/Hero";
import { ValueProposition } from "@/components/home/ValueProposition";

export const metadata: Metadata = {
  title: "David Suárez-Otero Redondo — Desarrollador Backend & Fullstack Junior",
  description:
    "Desarrollador backend junior especializado en C#, ASP.NET Core y Blazor, ampliando hacia Python e IA. Proyectos reales, no tutoriales.",
};

export default function Home() {
  return (
    <div>
      <Hero />
      <ValueProposition />
      <ClosingCta />
    </div>
  );
}
