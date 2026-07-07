"use server";

import { Resend } from "resend";

import { perfil } from "@/content/perfil";

export interface ContactFormState {
  status: "idle" | "success" | "error";
  message?: string;
  values?: { nombre: string; email: string; mensaje: string };
  errors?: { nombre?: string; email?: string; mensaje?: string };
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function sendContactEmail(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const nombre = String(formData.get("nombre") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const mensaje = String(formData.get("mensaje") ?? "").trim();
  const values = { nombre, email, mensaje };

  if (!nombre || nombre.length > 100) {
    const fieldMessage = "Indica un nombre válido (máx. 100 caracteres).";
    return {
      status: "error",
      message: fieldMessage,
      values,
      errors: { nombre: fieldMessage },
    };
  }
  if (!email || email.length > 200 || !EMAIL_REGEX.test(email)) {
    const fieldMessage = "Indica un email válido (máx. 200 caracteres).";
    return {
      status: "error",
      message: fieldMessage,
      values,
      errors: { email: fieldMessage },
    };
  }
  if (!mensaje || mensaje.length < 10 || mensaje.length > 2000) {
    const fieldMessage = "El mensaje debe tener entre 10 y 2000 caracteres.";
    return {
      status: "error",
      message: fieldMessage,
      values,
      errors: { mensaje: fieldMessage },
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY no está configurada; no se puede enviar el email de contacto.");
    return {
      status: "error",
      message: "No se ha podido enviar el mensaje. Escríbeme directamente a " + perfil.email,
      values,
    };
  }

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: perfil.email,
      replyTo: email,
      subject: `Nuevo contacto de ${nombre} vía el portfolio`,
      text: `De: ${nombre} <${email}>\n\n${mensaje}`,
    });

    return { status: "success", message: "Mensaje enviado. Te responderé en menos de 48h." };
  } catch (error) {
    console.error("Error enviando el email de contacto:", error);
    return {
      status: "error",
      message: "No se ha podido enviar el mensaje. Escríbeme directamente a " + perfil.email,
      values,
    };
  }
}
