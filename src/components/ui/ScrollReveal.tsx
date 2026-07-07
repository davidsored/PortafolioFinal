"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

import { fadeInUp, fadeInUpReduced, staggerContainer } from "@/lib/motion-variants";

/**
 * Revela su contenido con fade + translateY al entrar en el viewport, una
 * sola vez (`viewport={{ once: true }}`). Si `stagger` es true, anima cada
 * hijo directo de forma independiente (usar `ScrollRevealItem` en los hijos).
 */
export function ScrollReveal({
  children,
  className,
  stagger = false,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  stagger?: boolean;
  as?: "div" | "section";
}) {
  const shouldReduceMotion = useReducedMotion();
  const MotionTag = as === "section" ? motion.section : motion.div;

  const soloVariants = shouldReduceMotion ? fadeInUpReduced : fadeInUp;
  const variants = stagger ? staggerContainer : soloVariants;

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={variants}
    >
      {children}
    </MotionTag>
  );
}

/** Hijo individual de un `ScrollReveal` con `stagger`. Aplica el fade + translateY. */
export function ScrollRevealItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div className={className} variants={shouldReduceMotion ? fadeInUpReduced : fadeInUp}>
      {children}
    </motion.div>
  );
}
