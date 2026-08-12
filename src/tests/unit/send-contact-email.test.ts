import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const { sendMock, resendConstructorMock, headersMock } = vi.hoisted(() => {
  const sendMock = vi.fn().mockResolvedValue({ data: { id: "test-id" }, error: null });
  const resendConstructorMock = vi.fn().mockImplementation(function ResendMock() {
    return { emails: { send: sendMock } };
  });
  const headersMock = vi.fn();
  return { sendMock, resendConstructorMock, headersMock };
});

vi.mock("resend", () => ({
  Resend: resendConstructorMock,
}));

vi.mock("next/headers", () => ({
  headers: headersMock,
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

function stubIp(ip: string) {
  headersMock.mockResolvedValue(new Headers({ "x-forwarded-for": ip }));
}

const prevState: ContactFormState = { status: "idle" };

let testCounter = 0;

describe("sendContactEmail", () => {
  beforeEach(() => {
    // Cada test usa su propia IP para no compartir el bucket de rate limit
    // (el mapa en memoria del módulo persiste entre tests del mismo archivo).
    testCounter += 1;
    stubIp(`10.0.0.${testCounter}`);
  });

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

describe("sendContactEmail — rate limiting", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.useRealTimers();
  });

  it("permite envíos por debajo del límite", async () => {
    vi.stubEnv("RESEND_API_KEY", "re_test");
    stubIp("10.1.0.1");

    const first = await sendContactEmail(prevState, buildFormData());
    const second = await sendContactEmail(prevState, buildFormData());
    const third = await sendContactEmail(prevState, buildFormData());

    expect(first.status).toBe("success");
    expect(second.status).toBe("success");
    expect(third.status).toBe("success");
  });

  it("bloquea con un error genérico al superar el límite dentro de la ventana", async () => {
    vi.stubEnv("RESEND_API_KEY", "re_test");
    stubIp("10.1.0.2");

    await sendContactEmail(prevState, buildFormData());
    await sendContactEmail(prevState, buildFormData());
    await sendContactEmail(prevState, buildFormData());
    const fourth = await sendContactEmail(prevState, buildFormData());

    expect(fourth.status).toBe("error");
    expect(fourth.message).toMatch(/demasiados mensajes/i);
    expect(fourth.errors).toBeUndefined();
  });

  it("resetea el límite pasada la ventana de tiempo", async () => {
    vi.stubEnv("RESEND_API_KEY", "re_test");
    stubIp("10.1.0.3");
    vi.useFakeTimers();

    await sendContactEmail(prevState, buildFormData());
    await sendContactEmail(prevState, buildFormData());
    await sendContactEmail(prevState, buildFormData());
    const blocked = await sendContactEmail(prevState, buildFormData());
    expect(blocked.status).toBe("error");

    vi.advanceTimersByTime(10 * 60 * 1000 + 1);

    const afterWindow = await sendContactEmail(prevState, buildFormData());
    expect(afterWindow.status).toBe("success");
  });

  it("no comparte el límite entre IPs distintas", async () => {
    vi.stubEnv("RESEND_API_KEY", "re_test");

    stubIp("10.2.0.1");
    await sendContactEmail(prevState, buildFormData());
    await sendContactEmail(prevState, buildFormData());
    await sendContactEmail(prevState, buildFormData());

    stubIp("10.2.0.2");
    const otherIpResult = await sendContactEmail(prevState, buildFormData());

    expect(otherIpResult.status).toBe("success");
  });
});
