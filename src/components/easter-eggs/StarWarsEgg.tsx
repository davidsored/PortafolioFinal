"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { EASE_OUT } from "@/lib/motion-variants";

/**
 * Secuencia elegida: ↑ ↑ ↓ ↓ (el clásico "Konami" abreviado a 4 teclas).
 * Se acorta respecto al Konami completo (8-10 teclas) porque en un
 * portfolio nadie va a repetir un combo largo por curiosidad — 4 teclas
 * es memorable y realista de teclear en un momento de exploración.
 *
 * Se monta globalmente en layout.tsx vía dynamic(ssr:false) y escucha
 * keydown en document, pero nunca se activa al montar: solo reacciona a
 * la secuencia de teclado real del usuario.
 */
const SEQUENCE = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown"];
const VISIBLE_DURATION_MS = 2600;

export function StarWarsEgg() {
  const [isActive, setIsActive] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const progressRef = useRef(0);
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const expectedKey = SEQUENCE[progressRef.current];

      if (event.key === expectedKey) {
        progressRef.current += 1;

        if (progressRef.current === SEQUENCE.length) {
          progressRef.current = 0;
          setIsActive(true);

          if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
          hideTimeoutRef.current = setTimeout(() => setIsActive(false), VISIBLE_DURATION_MS);
        }
      } else {
        progressRef.current = event.key === SEQUENCE[0] ? 1 : 0;
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    };
  }, []);

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          role="status"
          aria-live="polite"
          className="pointer-events-none fixed inset-0 z-[100] flex items-center justify-center bg-black/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: shouldReduceMotion ? 0.01 : 0.3, ease: EASE_OUT }}
        >
          <motion.p
            className="font-display text-accent px-6 text-center text-xl font-semibold tracking-wide sm:text-3xl"
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.96 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: shouldReduceMotion ? 0.01 : 0.5, ease: EASE_OUT }}
          >
            Hace mucho tiempo, en un stack muy, muy lejano&hellip;
            <br />
            <span className="text-fg-muted text-sm font-normal sm:text-base">
              (este portfolio se compiló sin usar la Fuerza — solo Next.js)
            </span>
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
