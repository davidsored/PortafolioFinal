"use client";

import { useActionState } from "react";

import { Button } from "@/components/ui/Button";
import { sendContactEmail, type ContactFormState } from "@/lib/send-contact-email";

const initialState: ContactFormState = { status: "idle" };

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(sendContactEmail, initialState);

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label htmlFor="nombre" className="text-fg text-sm font-medium">
          Nombre
        </label>
        <input
          id="nombre"
          name="nombre"
          type="text"
          required
          maxLength={100}
          defaultValue={state.values?.nombre}
          aria-invalid={state.errors?.nombre ? "true" : undefined}
          aria-describedby={state.errors?.nombre ? "nombre-error" : undefined}
          className="border-border bg-bg text-fg focus-visible:outline-accent mt-1 w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-2"
        />
        {state.errors?.nombre && (
          <p id="nombre-error" className="text-danger mt-1 text-sm">
            {state.errors.nombre}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="text-fg text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          maxLength={200}
          defaultValue={state.values?.email}
          aria-invalid={state.errors?.email ? "true" : undefined}
          aria-describedby={state.errors?.email ? "email-error" : undefined}
          className="border-border bg-bg text-fg focus-visible:outline-accent mt-1 w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-2"
        />
        {state.errors?.email && (
          <p id="email-error" className="text-danger mt-1 text-sm">
            {state.errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="mensaje" className="text-fg text-sm font-medium">
          Mensaje
        </label>
        <textarea
          id="mensaje"
          name="mensaje"
          required
          minLength={10}
          maxLength={2000}
          rows={5}
          defaultValue={state.values?.mensaje}
          aria-invalid={state.errors?.mensaje ? "true" : undefined}
          aria-describedby={state.errors?.mensaje ? "mensaje-error" : undefined}
          className="border-border bg-bg text-fg focus-visible:outline-accent mt-1 w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-2"
        />
        {state.errors?.mensaje && (
          <p id="mensaje-error" className="text-danger mt-1 text-sm">
            {state.errors.mensaje}
          </p>
        )}
      </div>

      <Button type="submit" disabled={isPending}>
        {isPending ? "Enviando..." : "Enviar mensaje"}
      </Button>

      {state.status === "success" && (
        <p role="status" className="text-success text-sm">
          {state.message}
        </p>
      )}
      {state.status === "error" && (
        <p role="alert" className="text-danger text-sm">
          {state.message}
        </p>
      )}
    </form>
  );
}
