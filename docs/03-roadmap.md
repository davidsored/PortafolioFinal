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

## Fase 3 — Pulido de producto ✅ completada

- [x] Modo claro/oscuro terminado y pulido: cross-fade de ~200ms en color/fondo/borde al cambiar de tema, sin afectar al indicador de foco (ver nota de a11y abajo).
- [x] Animaciones/microinteracciones: scroll reveal (`ScrollReveal`/`ScrollRevealItem`), elevación + glow + escala en hover de `ProjectCard`, transición de página (`template.tsx`), micro-pulso del CTA del Hero. Todas respetan `prefers-reduced-motion` de verdad (sin transform, no solo duración reducida).
- [x] Easter eggs discretos y opt-in: One Piece (click en el footer, guiño real a `OnePieceAPI`), Star Wars (↑↑↓↓), Zelda (triple-click en el logo + sonido vía Web Audio API). Los 3 con carga perezosa (`dynamic(..., { ssr: false })`), ninguno se activa solo.
- [x] Accesibilidad: auditoría dedicada de lo nuevo en Fase 3 (`accessibility-engineer`), sin bloqueantes. Corregido el hallazgo de bajo riesgo (retraso de 200ms en el anillo de foco por la transición de tema).
- [x] SEO técnico: `sitemap.ts`/`robots.ts` (Fase 2), JSON-LD `Person` en la Home, `opengraph-image.tsx` propia vía `next/og`.
- [ ] Auditoría de rendimiento con Lighthouse real (≥ 90/95/95) — **no ejecutada**, no hay Lighthouse/Chrome headless disponible en este entorno. Verificado en su lugar: build limpio, los 3 easter eggs generan chunks separados de ~6KB cada uno (confirmado inspeccionando `.next/static/chunks/`), nada de `motion`/easter eggs se cuela en el bundle compartido. **Pendiente que David ejecute Lighthouse manualmente** (Chrome DevTools, modo incógnito, sobre `pnpm build && pnpm start`) antes de publicar.

**Pendiente de decisión de diseño, no bloqueante (derivado por `accessibility-engineer`, sin forzar la solución):**

- `StarWarsEgg`: el overlay a pantalla completa no oculta el indicador de foco de teclado que queda "por debajo" durante ~2.6s — decidir si se acepta (dura poco) o se fuerza `aria-hidden` total.
- `template.tsx`: sigue sin haber anuncio de ruta para lectores de pantalla tras una navegación (`aria-live` o mover foco a `<main>`) — ya estaba pendiente antes de Fase 3, no se ha agravado.

El sitio está pulido y listo para la Fase 4 (GitHub y despliegues pendientes).

## Fase 4 — GitHub y despliegues pendientes ✅ completada

- [x] Aplicar la [estrategia de GitHub](./07-mejoras-github.md): README reescrito con la plantilla + licencia MIT en `ProyectoWebCoworking`, `TaskPlanner` y `OnePieceAPI` (PRs de higiene mergeados el 08-07-2026), descripción corta y topics en los 5 repos, y re-auditoría final verificada con `gh` CLI documentada en [07-mejoras-github.md](./07-mejoras-github.md) § 1.
- [x] Perfil de GitHub: repo especial `davidsored/davidsored` creado con README de perfil (posicionamiento, enlace al portfolio, proyectos destacados).
- [x] Despliegue de `ProyectoWebCoworking`: opciones de hosting evaluadas y comparativa entregada a David — recomendación: Render free (web service) + Aiven MySQL free. La decisión final es de David (ver pendientes abajo); la ficha no queda bloqueada.
- [x] Enlazar cada ficha del portfolio con su demo real o, en el caso de Coworking Manager, con el estado "código disponible, demo en preparación" — coherente con el badge del README del repo.
- [x] CI del portfolio operativo y en verde. Nota: el workflow creado en la Fase 1 dejó de pasar al requerir pnpm 11 Node ≥ 22.13 (`node:sqlite`); corregido en esta fase fijando Node 24 en los jobs (commit `65a1133`). La afirmación de la Fase 1 era cierta en su momento — esto es mantenimiento, no un error de aquella fase.

**Pendiente, sin bloquear el cierre de la fase:**

- Despliegue de la demo de Coworking Manager — la decisión de hosting es de David (comparativa ya entregada; recomendación Render free + Aiven MySQL free). Al desplegarla, actualizar ficha del portfolio y README del repo.
- ✅ Saneamiento de secretos de `appsettings.json` de `ProyectoWebCoworking` — **resuelto el 14-07-2026**: David rotó las credenciales expuestas (app password de Gmail revocada, contraseña de MySQL cambiada) y el [PR #2](https://github.com/davidsored/ProyectoWebCoworking/pull/2) mergeado saneó `appsettings.json` y el `DbContext`; los valores que quedan en el historial de git están revocados y ya no dan acceso a nada.
- ✅ Bio y repos fijados (pins) del perfil de GitHub — **hecho por David** (verificado vía API el 15-07-2026: bio rellena y 3 repos fijados — PokedexIA, ProyectoWebCoworking, TennisTournament), coherente con [08-checklist-publicacion.md](./08-checklist-publicacion.md) § GitHub.
- ✅ [PR #1 de `TennisTournament`](https://github.com/davidsored/TennisTournament/pull/1) — **mergeado el 09-07-2026**: añade el archivo `LICENSE` (MIT) que el README ya referenciaba con enlace roto.
- Enlace TennisTournament → portfolio en su README — pospuesto a la Fase 5 (requiere el portfolio publicado).

## Fase 5 — Lanzamiento ✅ completada (15-07-2026)

- [x] Checklist final ([08-checklist-publicacion.md](./08-checklist-publicacion.md)) completo: todos los bloqueantes en verde, con evidencias anotadas ítem a ítem. Destacado: Lighthouse sobre producción (14-07-2026) con Performance Home 91 / ficha de proyecto 95 / Contacto 92,5 (medianas) y 100 en Accessibility y SEO en todas las pasadas; lint/typecheck/22 tests/E2E/CI en verde; sin API keys en el bundle cliente (verificado sobre `.next/static`).
- [x] Publicado en Vercel: https://portafolio-final-eosin.vercel.app (subdominio `.vercel.app`, que esta fase admite; el dominio propio `dsor.es` queda como pendiente, ver abajo). `RESEND_API_KEY` configurada en Vercel y formulario de contacto verificado end-to-end en producción el 15-07-2026.

Matiz de Lighthouse: la única varianza residual entre pasadas es el `elementRenderDelay` del LCP de la Home — mejora futura opcional, no bloqueante.

**Pendiente, sin bloquear el cierre de la fase:**

- Conectar `dsor.es` en Vercel — acción de David. Los metadatos y el sitemap ya apuntan a `www.dsor.es` y cuadrarán al conectarlo (mientras tanto, el portfolio vive en la URL provisional `.vercel.app`).
- Enlace TennisTournament → portfolio en su README y quitar el "(próximamente)" — cuando David decida la URL definitiva (dominio propio o `.vercel.app`).
- Revisión conjunta portfolio ↔ LinkedIn (coherencia de descripción, keywords, enlaces cruzados) — explícitamente pospuesta a después del lanzamiento, tal como pidió David.
- Despliegue de la demo de Coworking Manager y capturas opcionales de TaskPlanner/OnePieceAPI — sin cambios, se mantienen como estaban en las Fases 2 y 4.

## Fase 6 — Futuro (fuera de alcance de v1, arquitectura ya preparada)

- Diseñar y decidir con calma la función de IA real de `PokedexIA` (pendiente explícito de David).
- Sección "Experimentos IA" (RAG, agentes, integraciones con APIs de modelos).
- Blog técnico si aporta valor.
- Repetir la estrategia de README en nuevos repos usando la [plantilla](./templates/README-template.md).
