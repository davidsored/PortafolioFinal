# Portfolio — David Suárez-Otero Redondo

Portfolio profesional de David Suárez-Otero Redondo, desarrollador Backend/Fullstack junior (C#, ASP.NET Core, Blazor WebAssembly) ampliando hacia Python e integración de IA. Pensado para responder en segundos a la pregunta que se hace un reclutador técnico: _"¿esta persona puede resolver problemas reales con buenas prácticas?"_

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61dafb?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178c6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?logo=tailwindcss&logoColor=white)
![pnpm](https://img.shields.io/badge/pnpm-only-f69220?logo=pnpm&logoColor=white)
[![CI](https://github.com/davidsored/PortafolioFinal/actions/workflows/ci.yml/badge.svg)](https://github.com/davidsored/PortafolioFinal/actions/workflows/ci.yml)

**🔗 Demo: [https://www.dsor.es](https://www.dsor.es) (próximamente)**

<!-- Captura pendiente hasta el despliegue en producción:
![Home del portfolio](./docs/screenshots/home.png) -->

## Qué es y por qué existe

No es una galería de código: es una herramienta de conversión para reclutadores. Presenta tres proyectos principales (Coworking Manager, CourtManager y PokedexIA) con fichas honestas —qué problema resuelven, qué decisiones técnicas llevan detrás, qué queda pendiente— más dos secundarios, una sección "sobre mí" y un formulario de contacto real. Todo en español, sin CMS y sin backend propio más allá de una Server Action para el envío de email.

## Tecnologías

| Capa               | Tecnología                                               |
| ------------------ | -------------------------------------------------------- |
| Framework          | Next.js 16 (App Router) + React 19                       |
| Lenguaje           | TypeScript en modo estricto                              |
| Estilos            | Tailwind CSS v4 + tokens de diseño en CSS variables      |
| Animación          | Motion (`motion/react`)                                  |
| Tema claro/oscuro  | next-themes (`data-theme`, sin flash de tema incorrecto) |
| Email de contacto  | Server Action de Next.js + Resend                        |
| Testing            | Vitest + React Testing Library · Playwright (E2E smoke)  |
| Calidad            | ESLint, Prettier, Husky + lint-staged, commitlint        |
| CI/CD              | GitHub Actions · deploy en Vercel                        |
| Gestor de paquetes | pnpm (único permitido en el repo)                        |

## Arquitectura

Dirección de dependencia estricta: `app/` → `components/` → (`content/` + `lib/`). Todo el contenido público (proyectos, perfil, textos) vive en `src/content/` como objetos TypeScript tipados — es la fuente de verdad: añadir un proyecto es añadir un archivo que cumple la interfaz `Proyecto`, sin tocar ningún componente. Componentes de servidor por defecto; `"use client"` solo donde hay estado o interacción real.

```
app/ (rutas, metadata, SEO) → components/ (ui, home, proyectos, contacto, layout, easter-eggs)
                                          → content/ (datos tipados) + lib/ (helpers)
```

El detalle completo (y el porqué de cada elección) está en [`docs/02-arquitectura.md`](./docs/02-arquitectura.md) y [`docs/04-estructura-carpetas.md`](./docs/04-estructura-carpetas.md).

## Instalación y desarrollo local

Requisitos: Node.js 20+ y **pnpm** (no usar `npm`/`yarn`/`bun`; ver [`AGENTS.md`](./AGENTS.md) § Gestión de dependencias).

```bash
# Clonar
git clone https://github.com/davidsored/PortafolioFinal.git
cd PortafolioFinal

# Instalar dependencias
pnpm install

# Configurar variables de entorno (opcional en local)
cp .env.example .env.local

# Ejecutar en http://localhost:3000
pnpm dev
```

La única variable de entorno es `RESEND_API_KEY` (ver [`.env.example`](./.env.example)): sin ella el formulario de contacto valida igual pero no envía el email y lo indica al usuario. En producción vive en Vercel, nunca en el repo.

| Comando          | Qué hace                                 |
| ---------------- | ---------------------------------------- |
| `pnpm dev`       | Servidor de desarrollo                   |
| `pnpm build`     | Build de producción                      |
| `pnpm lint`      | ESLint                                   |
| `pnpm typecheck` | `tsc --noEmit`                           |
| `pnpm test`      | Tests unitarios y de componente (Vitest) |
| `pnpm test:e2e`  | E2E smoke (Playwright)                   |

## Decisiones técnicas relevantes

- **Contenido tipado en vez de CMS**: si a un proyecto le falta un campo obligatorio, falla el build, no la web en producción. Editar un texto es un PR con diff legible.
- **Transición de página en CSS, no en Motion**: `template.tsx` es el entry cliente raíz del App Router e importar `motion/react` ahí duplicaba ~88 KB (gzip) de librería en el bundle de todas las páginas. El fade se reescribió como animación CSS idéntica para el usuario; es la única excepción documentada — el resto de animaciones pasan por Motion (`docs/02-arquitectura.md` § 6).
- **Easter eggs con carga perezosa**: se cargan con `dynamic(..., { ssr: false })` y no pesan en el bundle principal si el visitante nunca los activa.
- **`prefers-reduced-motion` como regla dura**: toda animación lo respeta, incluida la transición de página CSS (envuelta en la media query). Es accesibilidad, no un extra.
- **Formulario sin backend propio**: una Server Action valida y sanea en servidor y llama a Resend. Sin base de datos, sin servicio que mantener, sin API key expuesta al cliente.

## Testing y calidad

- 22 tests unitarios y de componente (Vitest + React Testing Library): helpers con lógica, `ThemeToggle`, formulario de contacto, transición de página. No se persigue cobertura del 100%: se prueba lo que tiene lógica, no el JSX de presentación.
- E2E smoke con Playwright: navegación Home → ficha de proyecto y envío del formulario.
- Husky + lint-staged (ESLint + Prettier en cada commit) y commitlint (conventional commits).
- CI en GitHub Actions en cada push/PR a `main` y `develop`: lint, typecheck, tests, build y job de E2E con informe de Playwright como artefacto.

## Documentación del proyecto

Este repo incluye su propia planificación como documentación viva en [`docs/`](./docs): plan general, arquitectura, roadmap, sistema de diseño, estrategia de contenido y checklist de publicación. El desarrollo está guiado por un sistema multiagente de Claude Code (un orquestador y diez agentes con responsabilidad única), descrito en [`AGENTS.md`](./AGENTS.md) y [`docs/09-workflow-agentes.md`](./docs/09-workflow-agentes.md).

## Ramas

`main` (estable) ← `develop` (integración) ← `feature/*` (desarrollo). No se desarrolla directamente sobre `main`.

## Licencia

El código de este repositorio está bajo licencia MIT — ver [LICENSE](./LICENSE).

El contenido no es código y queda fuera de la MIT: los textos de [`src/content/`](./src/content), el CV ([`public/cv/`](./public/cv)) y la identidad visual del portfolio son © David Suárez-Otero Redondo, todos los derechos reservados. Puedes reutilizar el código libremente; no publiques el portfolio con estos textos, imágenes o marca personal.

---

Proyecto de [David Suárez-Otero Redondo](https://github.com/davidsored) · [LinkedIn](https://www.linkedin.com/in/david-suarez-otero-redondo/) · davidsored@gmail.com
