import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ProjectHero } from "@/components/proyectos/ProjectHero";
import type { Proyecto } from "@/content/types";

const proyectoBase: Proyecto = {
  slug: "proyecto-de-prueba",
  titulo: "Proyecto de prueba",
  descripcionCorta: "Descripción corta de prueba.",
  descripcionCompleta: "Descripción completa de prueba.",
  problema: "Problema de prueba.",
  solucion: "Solución de prueba.",
  tecnologias: ["TypeScript"],
  funcionalidades: ["Funcionalidad de prueba"],
  decisionesTecnicas: ["Decisión de prueba"],
  repoUrl: "https://github.com/davidsored/proyecto-de-prueba",
  principal: false,
};

describe("ProjectHero", () => {
  it("muestra el enlace a la demo cuando el proyecto tiene demoUrl", () => {
    render(<ProjectHero proyecto={{ ...proyectoBase, demoUrl: "https://demo.example.com" }} />);

    const demoLink = screen.getByRole("link", {
      name: "Ver demo de Proyecto de prueba (se abre en una pestaña nueva)",
    });
    expect(demoLink).toHaveAttribute("href", "https://demo.example.com");
    expect(demoLink).toHaveAttribute("target", "_blank");
  });

  it("muestra el estado de la demo cuando no hay demoUrl pero sí estadoDemo", () => {
    render(<ProjectHero proyecto={{ ...proyectoBase, estadoDemo: "Demo en preparación" }} />);

    expect(screen.getByText("Demo en preparación")).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /ver demo/i })).not.toBeInTheDocument();
  });

  it("prioriza la demo real si el proyecto tiene demoUrl y estadoDemo a la vez", () => {
    render(
      <ProjectHero
        proyecto={{
          ...proyectoBase,
          demoUrl: "https://demo.example.com",
          estadoDemo: "Demo en preparación",
        }}
      />,
    );

    expect(screen.getByRole("link", { name: /ver demo/i })).toBeInTheDocument();
    expect(screen.queryByText("Demo en preparación")).not.toBeInTheDocument();
  });

  it("no muestra ni demo ni estado cuando el proyecto no define ninguno", () => {
    render(<ProjectHero proyecto={proyectoBase} />);

    expect(screen.queryByRole("link", { name: /ver demo/i })).not.toBeInTheDocument();
    expect(screen.queryByText(/demo en preparación/i)).not.toBeInTheDocument();
  });
});
