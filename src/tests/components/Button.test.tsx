import { render, screen } from "@testing-library/react";
import type { ComponentProps } from "react";
import { describe, expect, it, vi } from "vitest";

import { Button } from "@/components/ui/Button";

vi.mock("next/link", () => ({
  default: (props: ComponentProps<"a">) => <a data-nextjs-link="" {...props} />,
}));

describe("Button", () => {
  it("usa next/link para rutas internas de la app", () => {
    render(<Button href="/proyectos">Ver proyectos</Button>);

    const link = screen.getByRole("link", { name: "Ver proyectos" });
    expect(link).toHaveAttribute("href", "/proyectos");
    expect(link).toHaveAttribute("data-nextjs-link");
  });

  it("usa un anchor nativo para archivos estáticos y no los prefetchea como ruta", () => {
    render(<Button href="/cv/david-suarez-otero-cv.pdf">Descargar CV</Button>);

    const link = screen.getByRole("link", { name: "Descargar CV" });
    expect(link).toHaveAttribute("href", "/cv/david-suarez-otero-cv.pdf");
    expect(link).not.toHaveAttribute("data-nextjs-link");
    expect(link).not.toHaveAttribute("target");
  });

  it("abre los enlaces http externos en pestaña nueva con rel seguro", () => {
    render(<Button href="https://github.com/davidsored">GitHub</Button>);

    const link = screen.getByRole("link", { name: "GitHub" });
    expect(link).not.toHaveAttribute("data-nextjs-link");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renderiza mailto como anchor nativo sin pestaña nueva", () => {
    render(<Button href="mailto:hola@example.com">Email</Button>);

    const link = screen.getByRole("link", { name: "Email" });
    expect(link).not.toHaveAttribute("data-nextjs-link");
    expect(link).not.toHaveAttribute("target");
  });

  it("renderiza un botón nativo cuando no hay href", () => {
    render(<Button>Enviar</Button>);

    const button = screen.getByRole("button", { name: "Enviar" });
    expect(button).toHaveAttribute("type", "button");
  });
});
