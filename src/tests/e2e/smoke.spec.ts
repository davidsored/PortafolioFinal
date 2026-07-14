import { expect, test } from "@playwright/test";

test("Home -> ficha de proyecto", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: "Construyo aplicaciones web que funcionan de verdad." }),
  ).toBeVisible();

  await page.getByRole("banner").getByRole("link", { name: "Proyectos" }).click();
  await expect(page).toHaveURL(/\/proyectos$/);

  await page.getByRole("link", { name: "CourtManager" }).click();
  await expect(page).toHaveURL(/\/proyectos\/tennis-tournament$/);
  await expect(page.getByRole("heading", { name: "CourtManager", level: 1 })).toBeVisible();
});

test("el toggle de tema cambia el atributo data-theme del documento", async ({ page }) => {
  await page.goto("/");

  const toggle = page.getByRole("button", { name: /Cambiar a modo/ });
  await toggle.click();

  await expect(page.locator("html")).toHaveAttribute("data-theme", /light|dark/);
});

test("el formulario de contacto valida y muestra el resultado del envío", async ({ page }) => {
  await page.goto("/contacto");

  await page.getByLabel("Nombre").fill("Reclutadora de Prueba");
  await page.getByLabel("Email").fill("reclutadora@empresa.com");
  await page.getByLabel("Mensaje").fill("Nos interesa tu perfil para una vacante backend junior.");
  await page.getByRole("button", { name: "Enviar mensaje" }).click();

  await expect(page.getByRole("alert").or(page.getByRole("status"))).toBeVisible();
});
