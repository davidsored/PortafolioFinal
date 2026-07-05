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
          className="border-border bg-bg text-fg focus-visible:outline-accent mt-1 w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-2"
        />
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
          className="border-border bg-bg text-fg focus-visible:outline-accent mt-1 w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-2"
        />
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
          className="border-border bg-bg text-fg focus-visible:outline-accent mt-1 w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-2"
        />
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
