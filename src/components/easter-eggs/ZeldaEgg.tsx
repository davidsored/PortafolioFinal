"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { SVGProps } from "react";
import { useEffect, useState } from "react";

import { EASE_OUT } from "@/lib/motion-variants";

const VISIBLE_DURATION_MS = 1400;

/**
 * Efecto "descubrimiento de objeto" (Zelda) disparado por triple-click en el
 * logo del header. Header.tsx solo monta este componente cuando el triple
 * click ocurre (con `key` distinta en cada trigger para forzar un remount
 * limpio), así que el estado "activo" ya nace correcto en el primer render
 * y no hace falta activarlo desde un efecto. El sonido se genera con la Web
 * Audio API (tres osciladores en secuencia, sin archivo binario) porque el
 * propio triple-click ya es la interacción explícita del usuario que las
 * políticas de autoplay del navegador exigen para permitir audio — no hace
 * falta un toggle adicional.
 */
export function ZeldaEgg() {
  const [isActive, setIsActive] = useState(true);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    playDiscoveryChime();

    const timeout = setTimeout(() => setIsActive(false), VISIBLE_DURATION_MS);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          role="status"
          aria-live="polite"
          aria-label="Objeto secreto descubierto"
          className="pointer-events-none fixed top-20 left-1/2 z-[100] -translate-x-1/2"
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.85 }}
          animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.9 }}
          transition={{ duration: shouldReduceMotion ? 0.01 : 0.35, ease: EASE_OUT }}
        >
          <div className="border-accent bg-bg-elevated text-fg flex items-center gap-2 rounded-full border px-4 py-2 text-sm shadow-lg">
            <TriforceIcon className="text-accent h-4 w-4" />
            <span>¡Has encontrado un secreto!</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function TriforceIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 2 3 20h18L12 2Zm0 6.2 3.4 6.8H8.6L12 8.2ZM6.1 16.4 8.6 21H3.6l2.5-4.6Zm11.8 0L20.4 21h-5l2.5-4.6Z" />
    </svg>
  );
}

function playDiscoveryChime() {
  if (typeof window === "undefined") return;

  const AudioContextClass =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioContextClass) return;

  const ctx = new AudioContextClass();
  const notes = [523.25, 659.25, 783.99]; // Do5, Mi5, Sol5 — arpegio ascendente breve
  const noteDuration = 0.12;

  notes.forEach((frequency, index) => {
    const startTime = ctx.currentTime + index * noteDuration;
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();

    oscillator.type = "triangle";
    oscillator.frequency.value = frequency;

    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(0.15, startTime + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + noteDuration);

    oscillator.connect(gain);
    gain.connect(ctx.destination);

    oscillator.start(startTime);
    oscillator.stop(startTime + noteDuration);
  });

  const totalDuration = notes.length * noteDuration + 0.05;
  setTimeout(() => ctx.close(), totalDuration * 1000);
}
