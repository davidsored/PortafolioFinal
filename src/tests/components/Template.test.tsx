import { render, screen, waitFor } from "@testing-library/react";
import type { ComponentType, ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const reducedMotion = vi.hoisted(() => ({ value: false }));

vi.mock("motion/react", async (importOriginal) => {
  const actual = await importOriginal<typeof import("motion/react")>();
  return {
    ...actual,
    useReducedMotion: () => reducedMotion.value,
  };
});

/**
 * `template.tsx` guarda la bandera `isInitialLoad` a nivel de módulo, así que
 * cada test importa una copia fresca con `vi.resetModules()` para controlar
 * si el mount bajo prueba es el primero (carga inicial, SSR/hidratación) o
 * uno posterior (remount por navegación cliente del App Router).
 */
async function loadFreshTemplate(): Promise<ComponentType<{ children: ReactNode }>> {
  vi.resetModules();
  const templateModule = await import("@/app/template");
  return templateModule.default;
}

beforeEach(() => {
  reducedMotion.value = false;
});

describe("Template", () => {
  it("no aplica opacity 0 en el primer mount (regresión del bloqueante de LCP)", async () => {
    const Template = await loadFreshTemplate();

    const { container } = render(
      <Template>
        <p>Contenido inicial</p>
      </Template>,
    );

    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper.tagName).toBe("DIV");
    expect(wrapper.style.opacity).not.toBe("0");
  });

  it("un mount posterior (navegación cliente) arranca oculto y anima a visible", async () => {
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
    expect(wrapper.style.opacity).toBe("0");

    await waitFor(() => expect(wrapper.style.opacity).toBe("1"), { timeout: 2000 });
  });

  it("con prefers-reduced-motion renderiza los children directos, sin wrapper de motion", async () => {
    reducedMotion.value = true;
    const Template = await loadFreshTemplate();

    const { container } = render(
      <Template>
        <p>Contenido accesible</p>
      </Template>,
    );

    expect(screen.getByText("Contenido accesible").parentElement).toBe(container);
  });
});
