import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

function renderToggle() {
  return render(
    <ThemeProvider attribute="data-theme" defaultTheme="light" enableSystem={false}>
      <ThemeToggle />
    </ThemeProvider>,
  );
}

describe("ThemeToggle", () => {
  it("arranca en modo claro con el label para cambiar a oscuro", async () => {
    renderToggle();

    const button = await screen.findByRole("button", { name: "Cambiar a modo oscuro" });
    expect(button).toBeInTheDocument();
  });

  it("cambia a modo oscuro al hacer click y actualiza el atributo del documento", async () => {
    const user = userEvent.setup();
    renderToggle();

    const button = await screen.findByRole("button", { name: "Cambiar a modo oscuro" });
    await user.click(button);

    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
    expect(await screen.findByRole("button", { name: "Cambiar a modo claro" })).toBeInTheDocument();
  });
});
