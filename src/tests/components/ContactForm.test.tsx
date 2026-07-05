import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { ContactForm } from "@/components/contacto/ContactForm";
import type { ContactFormState } from "@/lib/send-contact-email";

const { sendContactEmail } = vi.hoisted(() => ({
  sendContactEmail:
    vi.fn<(prevState: ContactFormState, formData: FormData) => Promise<ContactFormState>>(),
}));

vi.mock("@/lib/send-contact-email", () => ({ sendContactEmail }));

async function fillAndSubmit(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText("Nombre"), "Reclutadora de Prueba");
  await user.type(screen.getByLabelText("Email"), "reclutadora@empresa.com");
  await user.type(screen.getByLabelText("Mensaje"), "Nos interesa tu perfil para una vacante.");
  await user.click(screen.getByRole("button", { name: "Enviar mensaje" }));
}

describe("ContactForm", () => {
  it("muestra el mensaje de éxito devuelto por la Server Action", async () => {
    sendContactEmail.mockResolvedValueOnce({
      status: "success",
      message: "Mensaje enviado. Te responderé en menos de 48h.",
    });

    const user = userEvent.setup();
    render(<ContactForm />);

    await fillAndSubmit(user);

    expect(
      await screen.findByText("Mensaje enviado. Te responderé en menos de 48h."),
    ).toBeInTheDocument();
  });

  it("muestra el mensaje de error devuelto por la Server Action y conserva los datos", async () => {
    sendContactEmail.mockResolvedValueOnce({
      status: "error",
      message: "No se ha podido enviar el mensaje. Escríbeme directamente a davidsored@gmail.com",
      values: {
        nombre: "Reclutadora de Prueba",
        email: "reclutadora@empresa.com",
        mensaje: "Nos interesa tu perfil para una vacante.",
      },
    });

    const user = userEvent.setup();
    render(<ContactForm />);

    await fillAndSubmit(user);

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "No se ha podido enviar el mensaje.",
    );
    expect(screen.getByLabelText("Nombre")).toHaveValue("Reclutadora de Prueba");
  });
});
