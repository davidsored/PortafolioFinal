# AGENTS.md — Portfolio de David Suárez-Otero Redondo

Este archivo es la guía de referencia para cualquier agente de programación (o humano) que trabaje en este repositorio. El objetivo del proyecto está definido en [`docs/01-plan-general.md`](./docs/01-plan-general.md); este documento define **cómo** se trabaja, no **qué** se construye.

Contexto crítico que cualquier agente debe conocer antes de tocar código:

- El portfolio está en **español únicamente**, sin i18n. No añadir librerías de internacionalización.
- Los **3 proyectos principales** son Coworking Manager, CourtManager (repo `TennisTournament`) y PokedexIA. Sus textos ya están redactados en [`docs/06-estrategia-contenido.md`](./docs/06-estrategia-contenido.md) — no reescribirlos libremente, son producto de una revisión con el propio David.
- **PokedexIA sí tiene funcionalidad de IA real desde la v0.5.0:** un chat RAG sobre los 251 Pokémon del catálogo, en producción. Su copy (`content/proyectos/pokedexia.ts`) ya refleja esa arquitectura y está revisado por David — no reescribirlo libremente, igual que el resto de textos de proyecto.
- No introducir CMS, backend propio ni dependencias que contradigan [`docs/02-arquitectura.md`](./docs/02-arquitectura.md) sin justificarlo primero.

## Arquitectura

- Stack: Next.js (App Router) + React + TypeScript + Tailwind CSS. Ver [`docs/02-arquitectura.md`](./docs/02-arquitectura.md) y [`docs/04-estructura-carpetas.md`](./docs/04-estructura-carpetas.md) para el detalle completo y el porqué de cada elección.
- Dirección de dependencia obligatoria: `app/` → `components/` → (`content/` + `lib/`). El contenido (`content/`) nunca importa de `components/`.
- Un componente va en `components/ui/` solo si lo usan 2+ dominios distintos; si es específico de una sección, vive en la carpeta de ese dominio (`components/proyectos/`, `components/home/`, etc.).
- Los easter eggs (`components/easter-eggs/`) se cargan siempre con `dynamic(..., { ssr: false })`. Nunca se importan de forma estática en `layout.tsx` ni en ninguna página.
- Cualquier nuevo proyecto para el portfolio (principal o secundario) se añade como un archivo nuevo en `content/proyectos/` que cumple la interfaz `Proyecto` — no se toca ningún componente para añadir un proyecto.
- Antes de añadir una dependencia nueva, comprobar si ya existe una forma de resolverlo con lo que hay (Next.js, Tailwind, Motion, React). Este proyecto prioriza pocas dependencias bien entendidas sobre muchas dependencias "por si acaso".

## Gestión de dependencias

**pnpm es el único gestor de paquetes permitido en este proyecto.** Regla permanente, salvo instrucción explícita de David en contra.

- Nunca usar `npm`. Nunca usar `yarn`. Nunca usar `bun`, salvo que se apruebe explícitamente en el futuro.
- Instalar dependencias con `pnpm add <paquete>` (`pnpm add -D <paquete>` para dev), nunca con `npm install`.
- Ejecutar scripts con `pnpm <script>` (p. ej. `pnpm dev`, `pnpm build`, `pnpm lint`), nunca con `npm run <script>`.
- `pnpm-lock.yaml` es el único lockfile del proyecto: forma parte del repositorio y nunca se elimina ni se sustituye por `package-lock.json`/`yarn.lock`/`bun.lock`.
- Ningún ejemplo, comando, script o fragmento de documentación generado por un agente debe usar `npm`. Si un agente genera accidentalmente un comando con `npm`, debe corregirlo a `pnpm` antes de dar la tarea por terminada.
- Todos los agentes de `.claude/agents/` asumen `pnpm` al proponer o ejecutar comandos de instalación/build/test.

## Código

- TypeScript en modo estricto (`strict: true`). No usar `any` salvo justificación en comentario inline explicando por qué no hay alternativa tipada razonable.
- Naming: componentes en `PascalCase` (`ProjectCard.tsx`), hooks en `camelCase` con prefijo `use` (`useTheme.ts`), archivos de contenido en `kebab-case` (`tennis-tournament.ts`), variables/funciones en `camelCase`.
- Formato: Prettier + ESLint (config de Next.js) se ejecutan antes de cada commit. No discutir estilo de formato caso a caso — lo decide la herramienta.
- Componentes de servidor por defecto; `"use client"` solo cuando hay estado, efectos o interacción del navegador (theme toggle, formulario, animaciones). No marcar un componente como cliente "por si acaso".
- SOLID aplicado con sentido común de proyecto pequeño:
  - **S**: un componente = una responsabilidad visual; la lógica de negocio (si la hay, p. ej. cálculo de tema) vive en `lib/`, no mezclada en el JSX.
  - **O/L/I/D**: relevantes sobre todo en `lib/` y `content/types.ts` — las interfaces de contenido (`Proyecto`, `StackItem`) deben permitir añadir un proyecto o tecnología nueva sin modificar el código que los consume.
- Comentarios: por defecto, ninguno. Solo cuando el _por qué_ no es obvio (p. ej. por qué `images.unoptimized` está activo, por qué un easter egg usa carga perezosa). Nunca comentarios que expliquen _qué_ hace el código.
- No dejar código muerto, imports sin usar, ni features a medias. Si algo no se termina en la sesión actual, no se mezcla con código que sí funciona.

## Testing

Criterio de qué probar (ver también [`docs/02-arquitectura.md`](./docs/02-arquitectura.md) §7):

- **Se prueba**: cualquier función o componente con lógica (cálculo, condicionales, estado, validación) — helpers de `lib/`, `ThemeToggle`, el formulario de contacto, cualquier lógica de filtrado/orden si se añade.
- **No se prueba**: JSX puramente de presentación sin lógica (un `Card` que solo recibe props y las pinta).
- Unitario/componente: Vitest + React Testing Library. E2E smoke: Playwright, cubriendo como mínimo Home → ficha de proyecto y el envío del formulario de contacto.
- Cuándo crear un test nuevo: al añadir cualquier función en `lib/` con una rama condicional, o cualquier componente que reaccione a interacción del usuario.
- Validación de cambios antes de dar por cerrada una tarea: `pnpm lint && pnpm typecheck && pnpm test` en verde, y verificación visual manual (modo claro y oscuro) del área tocada. Para cambios de UI, usar el flujo de la skill `/run` o un preview local antes de reportar como terminado.

## UI/UX

- Seguir los tokens de [`docs/05-sistema-diseno.md`](./docs/05-sistema-diseno.md) (color, tipografía, espaciado, radios) en vez de introducir valores sueltos. Si Tailwind no cubre un token, se añade a `tailwind.config.ts`, no se hardcodea en el componente.
- Toda animación pasa por `motion/react` y respeta `prefers-reduced-motion` (excepción documentada: transición de página en `template.tsx`, ver `docs/02-arquitectura.md`). No usar `setTimeout`/CSS animations sueltas para microinteracciones nuevas sin pasar por el mismo sistema.
- Modo claro y oscuro se verifican juntos siempre — no se acepta un cambio de UI probado solo en un tema.
- Responsive: mobile-first, breakpoints de Tailwind por defecto. Cualquier componente nuevo se revisa como mínimo en 375px y 1280px antes de darlo por terminado.
- Accesibilidad no es una fase aparte: cualquier elemento interactivo lleva `aria-label`/rol correcto en el mismo commit en que se crea, no en un PR de "limpieza" posterior.
- Aplicar las skills de diseño disponibles (Emil Design Engineering, Impeccable Style, Taste, UI UX Pro Max) — ver sección siguiente sobre cuándo usar cada una.

## Seguridad

- Ningún secreto (API key de Resend, tokens) se escribe en código ni se commitea; viven en variables de entorno de Vercel y en `.env.local` (en `.gitignore`) para desarrollo.
- El formulario de contacto valida y sanea en el servidor (Server Action), nunca confía solo en validación de cliente.
- No añadir dependencias sin revisar mínimamente su procedencia y mantenimiento (evitar paquetes abandonados o con pocas descargas para funcionalidad crítica).
- No exponer stack traces ni mensajes de error internos al usuario final; loggear en servidor, mostrar mensaje genérico en cliente.

## Documentación

- Cualquier decisión de arquitectura no trivial (nueva dependencia, cambio de patrón, excepción a este documento) se documenta en el PR/commit correspondiente y, si es estructural, se refleja en `docs/02-arquitectura.md`.
- El README del propio portfolio (cuando exista el repo público) sigue la misma plantilla que [`docs/templates/README-template.md`](./docs/templates/README-template.md), adaptada a que este repo es el portfolio y no un proyecto aplicado.
- Actualizar `docs/03-roadmap.md` al cerrar una fase (marcar checkboxes), no dejar que quede desincronizado del estado real.
- Los textos públicos del portfolio (`content/`) son la fuente de verdad; si se cambia texto directamente en un componente en vez de en `content/`, es un bug de arquitectura, no un atajo válido.

## Uso de skills

**Estado actual:** las 5 skills están **instaladas** en `.claude/skills/` vía la Skills CLI (`npx skills`, ver `.claude/skills/README.md` y `skills-lock.json`), escopadas solo a Claude Code. Cárgalas siempre que el agente dueño entre en juego.

| Skill                       | Paquete instalado                                    | Cuándo usarla                                                                                                                                                 |
| --------------------------- | ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Emil Design Engineering** | `emilkowalski/skills@emil-design-eng`                | Al construir o pulir cualquier componente visual: motion, detalles de interfaz, microinteracciones, sensación "premium" del sistema de diseño.                |
| **Impeccable Style**        | `pbakaus/impeccable@impeccable`                      | Al revisar una pantalla/componente terminado para detectar si "se ve genérico" antes de darlo por bueno — pasada de refinamiento, no de creación inicial.     |
| **Taste**                   | `leonxlnx/taste-skill@design-taste-frontend`         | Al tomar decisiones de identidad visual (paleta, tipografía, easter eggs) para asegurar que el resultado tiene personalidad propia y no es una plantilla más. |
| **UI UX Pro Max**           | `nextlevelbuilder/ui-ux-pro-max-skill@ui-ux-pro-max` | Al diseñar flujos nuevos (navegación, formulario, sistema de componentes) y al revisar accesibilidad/patrones de UX antes de publicarlos.                     |
| **Find Skills**             | `vercel-labs/skills@find-skills`                     | Cuando se necesite una capacidad no cubierta por las anteriores antes de resolverlo "a mano" desde cero.                                                      |

## Sistema Multiagente

El desarrollo de este portfolio está guiado por un **Orchestrator** y 10 subagentes especializados definidos en [`.claude/agents/`](.claude/agents/), cada uno con una responsabilidad única (SRP). El detalle completo — diagrama, ejemplos de delegación, cómo añadir agentes nuevos y cómo mantener el sistema — está en [`docs/09-workflow-agentes.md`](docs/09-workflow-agentes.md). Esta sección es el resumen operativo.

### Arquitectura general

No existe un agente único que resuelva todo. `orchestrator` analiza cada petición, la descompone por dominio y delega en el especialista correspondiente:

| Agente                   | Responsabilidad única                                                                    |
| ------------------------ | ---------------------------------------------------------------------------------------- |
| `orchestrator`           | Analizar, descomponer, delegar, validar el resultado final                               |
| `staff-engineer`         | Visión técnica global — valida decisiones arquitectónicas grandes/nuevas, mentor técnico |
| `frontend-architect`     | Ejecución de la arquitectura React/TypeScript del día a día, estructura, estado          |
| `ui-designer`            | Layout, sistema visual, responsive                                                       |
| `design-engineer`        | Motion, microinteracciones, easter eggs                                                  |
| `content-writer`         | Todo el texto en español                                                                 |
| `github-manager`         | READMEs, CI, releases, perfil de GitHub                                                  |
| `testing-engineer`       | Vitest, React Testing Library, Playwright                                                |
| `performance-engineer`   | Lighthouse, bundle, Core Web Vitals                                                      |
| `accessibility-engineer` | WCAG, teclado, ARIA, contraste                                                           |
| `code-reviewer`          | Revisión final — nunca desarrolla, solo aprueba o devuelve hallazgos                     |

### Flujo de trabajo recomendado

```
Orchestrator → Staff Engineer (solo si la tarea activa sus disparadores) → Frontend Architect
            → (UI Designer + Design Engineer + Content Writer, en paralelo)
            → (Testing Engineer + Accessibility Engineer, en paralelo) → Performance Engineer
            → Code Reviewer → Merge
```

`staff-engineer` no interviene en trabajo rutinario ya cubierto por patrones existentes — solo cuando `frontend-architect` va a tomar una decisión grande o nueva (nueva librería importante, cambio de estructura, refactor grande, tecnología nueva; ver disparadores completos en `staff-engineer.md`).

`github-manager` es transversal: interviene siempre que hay que documentar o publicar, no en un punto fijo del flujo.

### Delegación y comunicación

`orchestrator` es el único punto de coordinación — los agentes no se comunican directamente entre sí; el contexto (qué se ha decidido, qué archivos existen, qué queda pendiente) viaja siempre a través de él. Ningún agente asume silenciosamente que otro ya ha hecho su parte: se verifica el estado real del código/documentación antes de continuar.

### Criterios para solicitar revisión

`code-reviewer` interviene siempre que el cambio toca más de un archivo de código, afecta a configuración con impacto en seguridad/CI, o cuando se va a marcar una fase del roadmap como completada. No hace falta para cambios puramente documentales.

### Resolución de conflictos

Cuando dos agentes dan recomendaciones incompatibles, `orchestrator` resuelve en este orden: (1) prioridades del proyecto (`docs/01-plan-general.md` § 2), (2) reglas ya documentadas en `docs/02-arquitectura.md`/`docs/05-sistema-diseno.md`, (3) si ninguna resuelve el conflicto, se plantea explícitamente a David con las opciones y su trade-off — nunca se decide unilateralmente algo que cambie la experiencia o la narrativa del portfolio.

## Revisión de código — checklist antes de aceptar un cambio

Antes de mergear cualquier cambio (propio o de un agente), responder sí a las seis preguntas:

1. **¿Es mantenible?** ¿Sigue la estructura de carpetas y la dirección de dependencias definidas arriba, sin abstracciones nuevas que no se necesiten todavía?
2. **¿Es seguro?** ¿No hay secretos en el código, la validación crítica vive en servidor, no se expone información interna en errores de cliente?
3. **¿Está documentado?** ¿Las decisiones no obvias tienen su porqué explicado (comentario mínimo o nota en `docs/`), y el contenido público sigue viviendo en `content/`?
4. **¿Tiene tests?** ¿La lógica nueva (no la presentación pura) tiene cobertura de Vitest/RTL, y si toca un flujo crítico, un E2E de Playwright?
5. **¿Respeta el diseño?** ¿Usa los tokens de `docs/05-sistema-diseno.md`, funciona en ambos temas, es responsive, y las animaciones respetan `prefers-reduced-motion`?
6. **¿Aporta valor?** ¿Refuerza la narrativa del proyecto ("desarrollador junior capaz de construir aplicaciones completas con buenas prácticas") o es complejidad/feature añadida sin necesidad real?

Si alguna respuesta es "no" o "no estoy seguro", el cambio no se acepta hasta resolverlo.
