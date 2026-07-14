"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { SVGProps } from "react";
import { useId, useRef, useState } from "react";

import { fadeInUp, fadeInUpReduced } from "@/lib/motion-variants";

/**
 * Guiño a OnePieceAPI (proyecto secundario real, ver
 * content/proyectos/onepiece-api.ts). Disparador elegido: click sobre el
 * icono, no hover prolongado — un icono de 20px es un objetivo táctil poco
 * fiable para "mantener el hover" en móvil (donde ni siquiera existe hover),
 * así que el click cubre ambos casos con un único gesto explícito y
 * accesible por teclado (Enter/Space vía <button>).
 */
export function OnePieceEgg() {
  const [isOpen, setIsOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const tooltipId = useId();
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleToggle() {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }

    setIsOpen((open) => {
      const next = !open;
      if (next) {
        closeTimeoutRef.current = setTimeout(() => setIsOpen(false), 6000);
      }
      return next;
    });
  }

  const variants = shouldReduceMotion ? fadeInUpReduced : fadeInUp;

  return (
    <div className="relative inline-flex">
      <button
        type="button"
        onClick={handleToggle}
        aria-expanded={isOpen}
        aria-controls={tooltipId}
        aria-label="Guiño de One Piece"
        className="text-fg-muted hover:text-accent focus-visible:ring-accent flex h-5 w-5 items-center justify-center rounded-full transition-colors focus-visible:ring-2 focus-visible:outline-none"
      >
        <StrawHatIcon className="h-4 w-4" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={tooltipId}
            role="tooltip"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={variants}
            className="border-border bg-bg-elevated text-fg absolute bottom-full left-1/2 mb-2 w-64 -translate-x-1/2 rounded-md border p-3 text-xs shadow-lg"
          >
            <p>
              Este timón no es solo decoración: existe una{" "}
              <a
                href="https://github.com/davidsored/OnePieceAPI"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent underline underline-offset-2"
              >
                OnePieceAPI
              </a>{" "}
              real detrás, una API en ASP.NET Core que traduce la tripulación al español. Zoro
              aprobaría (probablemente se perdería buscando el repo).
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function StrawHatIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true" {...props}>
      <ellipse cx="12" cy="15.5" rx="9.5" ry="2.2" strokeWidth="1.5" />
      <path d="M6.5 15c0-3.5 1.5-8 5.5-8s5.5 4.5 5.5 8" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 13.2h8" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
