# Roadmap por fases

Cada fase termina en un estado desplegable. No se pasa a la siguiente fase sin revisar la anterior con David.

## Fase 0 — Fundaciones (esta entrega)

- [x] Investigar los repos reales (`ProyectoWebCoworking`, `TennisTournament`, `PokedexIA`, `TaskPlanner`, `OnePieceAPI`) para basar el contenido en hechos, no en plantillas.
- [x] Cerrar decisiones de arquitectura, diseño y contenido con David.
- [x] Producir los documentos de planificación (este set de `docs/`) y `AGENTS.md`.
- [ ] David revisa y aprueba (o pide cambios) antes de escribir código.

## Fase 1 — Scaffolding técnico

- Crear proyecto Next.js + TypeScript + Tailwind v4, configurar ESLint/Prettier, `tsconfig` estricto.
- Configurar tokens de diseño (colores, tipografía, espaciado) como CSS variables.
- Montar layout base: header con navegación, footer, `ThemeToggle`, estructura de `/content`.
- Configurar Vitest + Testing Library + Playwright (aunque aún no haya mucho que testear).
- Repo en GitHub con CI mínima (lint + typecheck + test en cada PR).

## Fase 2 — MVP de contenido (versión inicial pactada con David)

Páginas/secciones, en este orden de construcción:

1. Home: Hero + propuesta de valor + CTA.
2. Sobre mí.
3. Proyectos principales (3 fichas completas: Coworking Manager, CourtManager/TennisTournament, PokedexIA).
4. Stack tecnológico (sección narrativa, no lista).
5. Proyectos secundarios (TaskPlanner, OnePieceAPI) en formato reducido.
6. CV descargable + enlaces GitHub/LinkedIn + contacto.

Al final de esta fase el sitio es publicable, aunque falte pulido.

## Fase 3 — Pulido de producto

- Modo claro/oscuro terminado y pulido (sin flash, transición suave).
- Animaciones/microinteracciones (scroll reveal, hover de tarjetas, transición de página).
- Easter eggs discretos (One Piece / Star Wars / Zelda) — opcionales, no intrusivos.
- Accesibilidad: navegación por teclado completa, contraste AA/AAA, `prefers-reduced-motion`.
- SEO técnico: metadata por página, sitemap, robots, JSON-LD, Open Graph con imagen propia.
- Auditoría de rendimiento (Lighthouse ≥ 95).

## Fase 4 — GitHub y despliegues pendientes

- Aplicar la [estrategia de GitHub](./07-mejoras-github.md): README completo en los 3 repos principales + capturas + roadmap de cada proyecto.
- Resolver el despliegue pendiente de `ProyectoWebCoworking` (es el único de los 3 principales sin demo pública — requiere hosting con MySQL, ver nota abajo).
- Enlazar cada ficha del portfolio con su demo real (o con el estado "código disponible, demo pendiente" si no se llega a desplegar).

**Nota sobre el despliegue de ProyectoWebCoworking**: es una app ASP.NET Core MVC + MySQL, más pesada de alojar gratis que una SPA o una app Python/Reflex. Opciones a evaluar en su momento (no se decide en esta fase de planificación): Render (Web Service + MySQL gestionado, con free tier limitado y "cold start"), Azure App Service (crédito estudiante si aplica), o contenedorizar con Docker y desplegar en Fly.io. Se documenta como tarea explícita, no como bloqueante para publicar el portfolio: la ficha puede salir con capturas + código + "demo en preparación" y actualizarse después.

## Fase 5 — Lanzamiento

- Checklist final ([08-checklist-publicacion.md](./08-checklist-publicacion.md)) completo.
- Publicar en Vercel con dominio propio o subdominio `.vercel.app`.
- Revisión conjunta portfolio ↔ LinkedIn (coherencia de descripción, keywords, enlaces cruzados) — explícitamente pospuesta a después de tener el portfolio terminado, tal como pidió David.

## Fase 6 — Futuro (fuera de alcance de v1, arquitectura ya preparada)

- Diseñar y decidir con calma la función de IA real de `PokedexIA` (pendiente explícito de David).
- Sección "Experimentos IA" (RAG, agentes, integraciones con APIs de modelos).
- Blog técnico si aporta valor.
- Repetir la estrategia de README en nuevos repos usando la [plantilla](./templates/README-template.md).
