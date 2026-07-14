import type { TargetAndTransition, Transition, Variants } from "motion/react";

/**
 * Variantes reutilizables de Motion (ver docs/05-sistema-diseno.md §5).
 *
 * Todas las variantes que mueven (`translateY`) exponen también una versión
 * "reduced" sin transform, para los componentes que no pueden usar
 * `useReducedMotion()` directamente (p. ej. cuando el valor se resuelve fuera
 * de React). Donde sea posible, se prefiere resolver la preferencia con el
 * hook `useReducedMotion` en el propio componente.
 */

export const EASE_OUT: Transition["ease"] = [0.16, 1, 0.3, 1];

/** Fade + translateY(12px) para la entrada de secciones al hacer scroll. */
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: EASE_OUT },
  },
};

/** Misma entrada, sin transform: para `prefers-reduced-motion`. */
export const fadeInUpReduced: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.01 },
  },
};

/** Contenedor con stagger corto entre hijos, pensado para usarse con `fadeInUp`. */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

/** Micro-pulso muy sutil para el glow del CTA principal del Hero. */
export const pulseGlow: TargetAndTransition = {
  opacity: [0.6, 1, 0.6],
  transition: {
    duration: 3.5,
    ease: "easeInOut",
    repeat: Infinity,
  },
};
