import { render } from "@testing-library/react";
import type { ComponentType, ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";

/**
 * `template.tsx` guarda la bandera `isInitialLoad` a nivel de módulo, así que
 * cada test importa una copia fresca con `vi.resetModules()` para controlar
 * si el mount bajo prueba es el primero (carga inicial, SSR/hidratación) o
 * uno posterior (remount por navegación cliente del App Router).
 *
 * No hay test de `prefers-reduced-motion` a propósito: el fade vive en
 * globals.css bajo `@media (prefers-reduced-motion: no-preference)` y JSDOM
 * no evalúa media queries de CSS, así que no es verificable aquí. Esa
 * preferencia se cubre en la verificación manual/a11y del área.
 */
async function loadFreshTemplate(): Promise<ComponentType<{ children: ReactNode }>> {
  vi.resetModules();
  const templateModule = await import("@/app/template");
  return templateModule.default;
}

describe("Template", () => {
  it("el primer mount no lleva la clase page-fade ni opacity inline (regresión del bloqueante de LCP)", async () => {
    const Template = await loadFreshTemplate();

    const { container } = render(
      <Template>
        <p>Contenido inicial</p>
      </Template>,
    );

    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper.tagName).toBe("DIV");
    expect(wrapper).not.toHaveClass("page-fade");
    expect(wrapper.style.opacity).toBe("");
  });

  it("un mount posterior (navegación cliente) lleva la clase page-fade", async () => {
    const Template = await loadFreshTemplate();

    const primeraCarga = render(
      <Template>
        <p>Primera carga</p>
      </Template>,
    );
    primeraCarga.unmount();

    const { container } = render(
      <Template>
        <p>Navegación cliente</p>
      </Template>,
    );

    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper).toHaveClass("page-fade");
  });
});
