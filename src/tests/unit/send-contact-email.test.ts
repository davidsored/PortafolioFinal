import { afterEach, describe, expect, it, vi } from "vitest";

const { sendMock, resendConstructorMock } = vi.hoisted(() => {
  const sendMock = vi.fn().mockResolvedValue({ data: { id: "test-id" }, error: null });
  const resendConstructorMock = vi.fn().mockImplementation(function ResendMock() {
    return { emails: { send: sendMock } };
  });
  return { sendMock, resendConstructorMock };
});

vi.mock("resend", () => ({
  Resend: resendConstructorMock,
}));

import { sendContactEmail, type ContactFormState } from "@/lib/send-contact-email";

function buildFormData(
  overrides: Partial<{ nombre: string; email: string; mensaje: string }> = {},
) {
  const data = {
    nombre: "Reclutadora de Prueba",
    email: "reclutadora@empresa.com",
    mensaje: "Nos interesa tu perfil para una vacante en tu empresa.",
    ...overrides,
  };
  const formData = new FormData();
  formData.append("nombre", data.nombre);
  formData.append("email", data.email);
  formData.append("mensaje", data.mensaje);
  return formData;
}

const prevState: ContactFormState = { status: "idle" };

describe("sendContactEmail", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("rechaza un nombre vacío", async () => {
    const result = await sendContactEmail(prevState, buildFormData({ nombre: "" }));
    expect(result.status).toBe("error");
    expect(result.errors?.nombre).toBeDefined();
  });

  it("rechaza un nombre de más de 100 caracteres", async () => {
    const result = await sendContactEmail(prevState, buildFormData({ nombre: "a".repeat(101) }));
    expect(result.status).toBe("error");
    expect(result.errors?.nombre).toBeDefined();
  });

  it("rechaza un email vacío", async () => {
    const result = await sendContactEmail(prevState, buildFormData({ email: "" }));
    expect(result.status).toBe("error");
    expect(result.errors?.email).toBeDefined();
  });

  it("rechaza un email con formato inválido", async () => {
    const result = await sendContactEmail(prevState, buildFormData({ email: "no-es-email" }));
    expect(result.status).toBe("error");
    expect(result.errors?.email).toBeDefined();
  });

  it("rechaza un mensaje de menos de 10 caracteres", async () => {
    const result = await sendContactEmail(prevState, buildFormData({ mensaje: "corto" }));
    expect(result.status).toBe("error");
    expect(result.errors?.mensaje).toBeDefined();
  });

  it("devuelve un error genérico sin RESEND_API_KEY configurada, sin errores de campo", async () => {
    vi.stubEnv("RESEND_API_KEY", "");

    const result = await sendContactEmail(prevState, buildFormData());

    expect(result.status).toBe("error");
    expect(result.message).toContain("davidsored@gmail.com");
    expect(result.errors).toBeUndefined();
  });

  it("envía el email y devuelve status success cuando RESEND_API_KEY está definida", async () => {
    vi.stubEnv("RESEND_API_KEY", "re_test");

    const result = await sendContactEmail(prevState, buildFormData());

    expect(result.status).toBe("success");
    expect(sendMock).toHaveBeenCalledOnce();
  });
});
