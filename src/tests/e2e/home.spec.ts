import { expect, test } from "@playwright/test";

test("la home carga con navegación y permite ir a una sección", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "Portfolio en construcción" })).toBeVisible();
  await expect(page.getByRole("banner").getByRole("link", { name: "Proyectos" })).toBeVisible();

  await page.getByRole("banner").getByRole("link", { name: "Proyectos" }).click();
  await expect(page).toHaveURL(/\/proyectos$/);
  await expect(page.getByRole("heading", { name: "Proyectos" })).toBeVisible();
});

test("el toggle de tema cambia el atributo data-theme del documento", async ({ page }) => {
  await page.goto("/");

  const toggle = page.getByRole("button", { name: /Cambiar a modo/ });
  await toggle.click();

  await expect(page.locator("html")).toHaveAttribute("data-theme", /light|dark/);
});
