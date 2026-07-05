# Roadmap por fases

Cada fase termina en un estado desplegable. No se pasa a la siguiente fase sin revisar la anterior con David.

## Fase 0 — Fundaciones ✅ completada

- [x] Investigar los repos reales (`ProyectoWebCoworking`, `TennisTournament`, `PokedexIA`, `TaskPlanner`, `OnePieceAPI`) para basar el contenido en hechos, no en plantillas.
- [x] Cerrar decisiones de arquitectura, diseño y contenido con David.
- [x] Producir los documentos de planificación (este set de `docs/`) y `AGENTS.md`.
- [x] David revisa y aprueba antes de escribir código.

## Fase 1 — Scaffolding técnico ✅ completada

- [x] Crear proyecto Next.js 16 + TypeScript + Tailwind v4, configurar ESLint/Prettier, `tsconfig` estricto.
- [x] pnpm como único gestor de paquetes, Husky + lint-staged + Commitlint (Conventional Commits), skills de diseño instaladas.
- [x] Configurar tokens de diseño (colores, tipografía, radios) como CSS variables (`globals.css`, `@theme inline` de Tailwind v4).
- [x] Montar layout base: header con navegación responsive (colapsa a menú móvil) e indicador de sección activa, footer con GitHub/LinkedIn, `ThemeToggle` (persistencia vía `next-themes`, sin flash).
- [x] Estructura de `/content` (`content/types.ts`) y páginas stub (`/sobre-mi`, `/proyectos`, `/stack`, `/contacto`) para que el nav funcione, sin contenido real todavía.
- [x] Configurar Vitest + React Testing Library (test real de `ThemeToggle`) + Playwright (smoke test de Home, navegación y tema).
- [x] Repo en GitHub con CI (`​.github/workflows/ci.yml`): lint + typecheck + test + build en cada push/PR a `main`/`develop`, más job de Playwright E2E.

Verificado en verde: `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm test:e2e`, `pnpm build`. Revisado visualmente en claro/oscuro y en 375px/1280px.

## Fase 2 — MVP de contenido ✅ completada

- [x] Contenido real en `content/` (perfil, 5 proyectos, stack, sobre mí) transcrito de `docs/06-estrategia-contenido.md`.
- [x] Componentes base (`Button`, `Card`, `Badge`, `SectionHeading`, `ProjectCard`, `ProjectHero`, `TechBadgeList`).
- [x] Home: Hero + propuesta de valor + CTA de cierre.
- [x] Sobre mí.
- [x] Proyectos: índice (3 principales + 2 secundarios) y ficha dinámica por `slug` (`generateStaticParams`, las 5 se generan como HTML estático).
- [x] Stack tecnológico (narrativa por categoría, no lista de logos).
- [x] Contacto: CV descargable, GitHub/LinkedIn, formulario real (`useActionState` + Server Action con Resend, validación server-side, sin secretos ni errores internos expuestos al cliente).
- [x] Tests: componente de `ContactForm` (Vitest/RTL) + E2E ampliado a Home → ficha de proyecto y envío de contacto (Playwright), cumpliendo el mínimo de `AGENTS.md` § Testing.
- [x] `RESEND_API_KEY` configurada en `.env.local` y verificada end-to-end: el formulario envía emails reales a `davidsored@gmail.com`.
- [x] CV real (`public/cv/david-suarez-otero-cv.pdf`) verificado (descarga con `content-type`/tamaño correctos).
- [x] Capturas reales de los 3 proyectos principales conectadas en `ProjectCard`/`ProjectHero` vía `imagenPortada`.

**Pendiente, sin bloquear el resto:**

- `RESEND_API_KEY` todavía falta añadirla en Vercel (solo está en `.env.local` para desarrollo) — tarea de la Fase 5 (lanzamiento).
- Capturas de los 2 proyectos secundarios (TaskPlanner, OnePieceAPI) — opcional, mantienen su tratamiento de menor protagonismo sin imagen.

El sitio ya es publicable a nivel de contenido, aunque falte el pulido de la Fase 3.

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
