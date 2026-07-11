# Sistema de diseño inicial

## 1. Principios (en orden de peso)

1. **Premium primero**: espaciado generoso, tipografía cuidada, nada apretado. La sensación de "producto" viene más del espaciado y la consistencia que de los efectos.
2. **Futurista con moderación**: un acento de color casi neón usado con disciplina (bordes, glow sutil, estados hover), nunca como fondo dominante. El futurismo se nota en el detalle (gradientes sutiles, glassmorphism ligero, monoespaciada para datos técnicos), no en saturar la pantalla.
3. **Divertida en los márgenes**: el humor y los easter eggs viven en gestos opcionales (un `Konami code`, un tooltip con guiño), nunca en el copy principal de "quiero este trabajo".
4. **Profesional siempre**: si en algún momento "futurista/divertida" y "profesional" chocan, gana profesional. Un reclutador debe poder enseñarle esta web a su jefe sin dudar.

## 2. Paleta de color (tokens CSS variables)

Enfoque _dark-first_ (el modo oscuro es el diseño primario; el claro es una adaptación cuidada, no un negativo automático).

```css
:root {
  /* Oscuro (por defecto) */
  --color-bg: #0a0a0f;
  --color-bg-elevated: #12121a;
  --color-fg: #e8e8f0;
  --color-fg-muted: #9a9aad;
  --color-border: #23232f;
  --color-accent: #6ee7ff; /* cian eléctrico — el "futurista" */
  --color-accent-2: #b48cff; /* violeta — soporte, gradientes */
  --color-success: #4ade80;
  --color-warning: #fbbf24;
}

[data-theme="light"] {
  --color-bg: #fafafa;
  --color-bg-elevated: #ffffff;
  --color-fg: #14141c;
  --color-fg-muted: #55555f;
  --color-border: #e2e2e8;
  --color-accent: #0e7490; /* mismo cian, ajustado a contraste AA en claro (5.475:1 sobre #fafafa) */
  --color-accent-2: #7c3aed;
  --color-success: #15803d; /* ajustado a contraste AA en claro (4.81:1 sobre #fafafa) */
  --color-warning: #a16207; /* ajustado a contraste AA en claro (4.72:1 sobre #fafafa) */
  --color-danger: #dc2626; /* ajustado a contraste AA en claro (4.63:1 sobre #fafafa) */
}
```

Regla dura de accesibilidad: todo par texto/fondo cumple **WCAG AA** (4.5:1) como mínimo; el acento nunca se usa como color de texto de párrafo largo, solo para énfasis, iconos, bordes y estados.

## 3. Tipografía

- **Display / títulos**: `Space Grotesk` — geométrica, técnica, encaja con "futurista premium" sin parecer un logo de startup genérico.
- **Cuerpo**: `Inter` — máxima legibilidad, estándar de producto serio.
- **Datos técnicos / código / badges de stack**: `JetBrains Mono` — refuerza "esto lo ha hecho alguien que programa", útil en badges de tecnologías y en snippets dentro de las fichas de proyecto.

Escala tipográfica (rem, base 16px): `0.75 / 0.875 / 1 / 1.25 / 1.5 / 2 / 2.5 / 3.5 / 4.5`.

## 4. Espaciado y forma

- Escala de espaciado en base 4: `4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96px`.
- Radios: `8px` (controles pequeños), `16px` (tarjetas), `24px` (paneles grandes/hero). Nada de esquinas a 0 (se siente corporativo/genérico) ni todo muy redondeado (se siente infantil).
- Sombra/"glow": en vez de `box-shadow` gris estándar, usar un resplandor sutil del color de acento en hover/foco (`box-shadow: 0 0 24px -8px var(--color-accent)`), coherente con el tono futurista, siempre discreto.

## 5. Motion (microinteracciones)

Librería: **Motion** (`motion/react`).

| Interacción                          | Comportamiento                                                                        |
| ------------------------------------ | ------------------------------------------------------------------------------------- |
| Entrada de secciones al hacer scroll | Fade + translateY(12px), stagger corto entre hijos, una sola vez                      |
| Hover en `ProjectCard`               | Elevación sutil + glow de borde + escala de imagen 1.02, 150ms                        |
| Cambio de tema                       | Cross-fade de color, no un "flash", ~200ms                                            |
| Navegación entre páginas             | Fade simple, sin efectos de página completa (evita sensación "genérica de plantilla") |
| CTA principal del Hero               | Micro-pulso muy sutil en el glow, nunca parpadeante ni agresivo                       |

Toda animación respeta `prefers-reduced-motion: reduce` desactivando transformaciones y dejando solo cambios de opacidad instantáneos.

## 6. Componentes base (v1)

`Button` (primary/ghost), `Card`, `Badge` (para tecnologías), `ProjectCard`, `ProjectHero`, `SectionHeading`, `ThemeToggle`, `TechBadgeList`, `Footer`, `Header` con navegación sticky y indicador de sección activa.

## 7. Easter eggs — especificación

Regla de oro: **opt-in, discretos, no rompen el flujo profesional**. Nadie debe encontrárselos por accidente en su primer vistazo.

| Easter egg | Disparador                                                                                        | Comportamiento                                                                                                                              |
| ---------- | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| One Piece  | Icono discreto (un pequeño timón/sombrero de paja) en el footer, o hover prolongado sobre el logo | Pequeña animación/tooltip con guiño (p. ej. referencia a `OnePieceAPI`, uno de los proyectos secundarios reales)                            |
| Star Wars  | Combinación de teclas tipo Konami (↑↑↓↓ o similar) en cualquier página                            | Efecto visual breve (sables de luz cruzando el cursor, o un mensaje tipo "crawl" del inicio de las películas), 2-3s y desaparece            |
| Zelda      | Click específico repetido sobre un elemento decorativo (p. ej. 3 clics en el favicon/logo)        | Sonido/animación muy corta tipo "¡ta-ding!" de descubrimiento de objeto, silenciado por defecto (requiere interacción explícita para audio) |

Todos se implementan con carga perezosa (ver [04-estructura-carpetas.md](./04-estructura-carpetas.md)) para que su coste en bundle/rendimiento sea cero si no se activan, y ninguno se ejecuta automáticamente al cargar la página.

## 8. Modo claro/oscuro

- Toggle visible en el header, icono sol/luna, con `aria-label` correcto.
- Sin flash de tema incorrecto: script inline mínimo en `<head>` que lee `localStorage`/`prefers-color-scheme` antes del primer paint (patrón estándar de Next.js, no requiere librería).
- Todos los tokens de color están definidos en ambos temas desde el día 1 — no se diseña "solo para oscuro y ya veremos el claro después".
