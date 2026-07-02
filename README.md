# Portfolio — David Suárez-Otero Redondo

Portfolio profesional de David Suárez-Otero Redondo, desarrollador Backend/Fullstack junior especializado en C#, ASP.NET Core y Blazor WebAssembly, ampliando hacia Python e integración de IA.

Construido con Next.js (App Router) + TypeScript + Tailwind CSS. Guiado por un sistema multiagente de Claude Code — ver [`AGENTS.md`](./AGENTS.md) y [`docs/`](./docs) para la planificación, arquitectura y decisiones completas del proyecto.

## Stack

Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 · Motion (Framer Motion)

## Requisitos

- Node.js 20+
- **pnpm** — único gestor de paquetes permitido en este proyecto (ver `AGENTS.md` § Gestión de dependencias). No usar `npm`/`yarn`/`bun`.

## Empezar

```bash
pnpm install
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Scripts

| Comando          | Qué hace                     |
| ---------------- | ---------------------------- |
| `pnpm dev`       | Servidor de desarrollo       |
| `pnpm build`     | Build de producción          |
| `pnpm start`     | Sirve el build de producción |
| `pnpm lint`      | ESLint                       |
| `pnpm typecheck` | `tsc --noEmit`               |
| `pnpm test`      | Tests (Vitest)               |

## Documentación del proyecto

- [`AGENTS.md`](./AGENTS.md) — guía para agentes de programación: arquitectura, código, testing, UI/UX, seguridad, gestión de dependencias, sistema multiagente.
- [`docs/`](./docs) — plan general, arquitectura, roadmap, estructura de carpetas, sistema de diseño, estrategia de contenido, workflow del sistema multiagente y checklist de publicación.

## Ramas

`main` (estable) ← `develop` (integración) ← `feature/*` (desarrollo). No se desarrolla directamente sobre `main`.

## Licencia

MIT.
