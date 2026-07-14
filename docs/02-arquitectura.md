# Arquitectura recomendada

## 1. Resumen de la decisión

| Capa                | Elección                                             | Alternativa descartada             |
| ------------------- | ---------------------------------------------------- | ---------------------------------- |
| Framework           | **Next.js 15 (App Router) + React 19 + TypeScript**  | Vite + React Router SPA            |
| Estilos             | **Tailwind CSS v4** + tokens en CSS variables        | CSS Modules puro                   |
| Animación           | **Motion** (antes Framer Motion)                     | CSS-only / GSAP                    |
| Contenido           | Archivos TS tipados (`/content`)                     | CMS headless                       |
| Formulario contacto | Server Action de Next.js + Resend                    | Backend propio con Express/ASP.NET |
| Testing             | Vitest + React Testing Library + Playwright (smoke)  | Jest                               |
| Deploy              | **Vercel**                                           | Render                             |
| Analítica           | Vercel Analytics (opcional, sin cookies de terceros) | Google Analytics                   |

## 2. Por qué Next.js y no una SPA React "pura"

El brief pide "Frontend: React" y "evitar complejidad excesiva". Ambas cosas se cumplen con Next.js —sigue siendo React— y además resuelve el punto débil de una SPA en Vite: **el SEO y el rendimiento de carga inicial**, que aquí importan mucho porque el usuario objetivo (reclutador) llega desde un enlace de LinkedIn/CV y decide en segundos si sigue mirando.

Razones concretas:

1. **SEO real sin trabajo extra**: cada proyecto puede tener su propia ruta (`/proyectos/tennis-tournament`) con metadata, Open Graph e indexación correcta desde el primer render, sin `react-snap` ni prerenderizado manual.
2. **David ya sabe usar Next.js**: `PokedexIA` está construido con Next.js 16 (`pages/`). Reutilizar el ecosistema reduce curva de aprendizaje y es coherente con su CV real (no añade una tecnología de la que no pueda hablar en la entrevista).
3. **Vercel + Next.js es la combinación de referencia** del propio proveedor de hosting elegido: zero-config, preview deployments por PR, imágenes optimizadas.
4. **Server Actions** permiten un formulario de contacto sin backend propio (ver punto 5) — evita la ASP.NET Core API que David domina pero que aquí sería sobre-ingeniería para un formulario de contacto.

Si en algún momento se prefiere una SPA más ligera, la alternativa documentada es Vite + React Router + `vite-plugin-sitemap`, pero se pierde SSR real y hay que prerenderizar manualmente. **No se recomienda.**

## 3. Gestión de contenido sin CMS

Todo el contenido (proyectos, stack, textos de secciones) vive en `/content/*.ts` como objetos TypeScript tipados (ver interfaces en [04-estructura-carpetas.md](./04-estructura-carpetas.md)). Ventajas:

- Tipado fuerte: si un proyecto no tiene `repoUrl`, TypeScript falla en build, no en producción.
- Cero dependencias de terceros, cero coste, cero riesgo de servicio caído.
- Editar un texto es un PR normal con diff legible en Git — refuerza la narrativa de "buenas prácticas" frente a un CMS opaco.

## 4. Modo claro/oscuro

- Basado en CSS variables (`--color-bg`, `--color-fg`, `--color-accent`, etc.) definidas en `globals.css` bajo `:root` (oscuro, por defecto) y `[data-theme="light"]`.
- **Decisión revisada en Fase 1** (documentada aquí para no desincronizar el `docs/` del código real): la persistencia y el script anti-flash se resuelven con **`next-themes`** (`attribute="data-theme"`, `defaultTheme="system"`, `enableSystem`) en vez de un script inline propio. Motivo: `next-themes` resuelve exactamente el mismo problema (persistencia en `localStorage`, respeto de `prefers-color-scheme`, sin flash de tema incorrecto) con una librería de una sola responsabilidad, muy pequeña y ampliamente usada en el ecosistema Next.js — reimplementar el script a mano no aportaba nada sobre usar la herramienta ya estándar para esto, así que se prefirió no reinventarlo (ver `docs/01-plan-general.md` — dependencia ya evaluada como justificada en Fase 0).
- El toggle (`ThemeToggle`, en `components/ui/`) sí es un componente propio que consume el hook `useTheme` de `next-themes` — la librería resuelve la persistencia/hidratación, no la interfaz visual del interruptor.

## 5. El único "backend": formulario de contacto

Justificación explícita del brief ("no crear backend propio salvo que exista una razón clara"): un formulario de contacto necesita _algún_ punto de envío de email, y exponer una API key de un proveedor de email en el cliente es inseguro.

Solución mínima: un **Server Action** de Next.js (código que corre en el servidor de Vercel, no un servicio nuevo que mantener) que llama a la API de **Resend** (o similar) para enviar el email. No hay base de datos, no hay servidor propio, no hay infraestructura que monitorizar. Alternativa aún más simple si se quiere cero backend: `mailto:` directo — se documenta como fallback si Resend no se activa a tiempo.

## 6. Animaciones y microinteracciones

- Librería: **Motion** (`motion/react`), estándar de facto en React 19, usada para: aparición de secciones al hacer scroll, transición de tema, hover en tarjetas de proyecto.
- **Excepción (Fase 5, validada por staff-engineer): la transición de página es CSS, no Motion.** `template.tsx` es el entry cliente raíz del App Router, e importar `motion/react` ahí hacía que Turbopack generara dos grafos cliente sin deduplicar la librería (~88 KB gz duplicados en el bundle de todas las páginas, medidos en la auditoría de performance de Fase 5). El fade se reescribió como animación CSS (`.page-fade` en `globals.css`, mismos 0.2s y mismo easing `EASE_OUT`), idéntico para el usuario y envuelto en `@media (prefers-reduced-motion: no-preference)`. Es una excepción puntual documentada en `AGENTS.md` §UI/UX; el resto de animaciones siguen pasando por Motion.
- Regla dura: toda animación respeta `prefers-reduced-motion`. Esto es accesibilidad, no un "nice to have".
- Los easter eggs (ver [05-sistema-diseno.md](./05-sistema-diseno.md)) se implementan como componentes aislados y perezosos (`dynamic import`) para que no afecten al bundle principal si el usuario nunca los activa.

## 7. Testing

| Tipo          | Herramienta                                                                        | Qué cubre                                                                     |
| ------------- | ---------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| Unitario      | Vitest                                                                             | Utilidades puras (formateo, cálculo de tema, helpers de contenido)            |
| Componente    | React Testing Library                                                              | Componentes con lógica (ThemeToggle, ProjectCard, Formulario de contacto)     |
| E2E smoke     | Playwright                                                                         | 1-2 flujos críticos: navegación Home → ficha de proyecto, envío de formulario |
| Accesibilidad | `@axe-core/react` en dev + chequeo manual con lector de pantalla antes de publicar | Contraste, roles ARIA, navegación por teclado                                 |

No se persigue el 100% de cobertura (no aporta valor en un portfolio); se prueba lo que tiene lógica, no lo que es JSX puro de presentación. Detalle ampliado en [`AGENTS.md`](../AGENTS.md).

## 8. Rendimiento y SEO

- Imágenes de proyectos en `next/image` (AVIF/WebP automático, lazy loading).
- Fuentes con `next/font` (self-hosted, sin FOUC, sin llamada externa a Google Fonts en runtime).
- `generateMetadata` por página + `sitemap.ts` + `robots.ts` nativos de Next.js.
- JSON-LD `Person` en la home (nombre, rol, enlaces) para rich results.
- Presupuesto de rendimiento: Lighthouse ≥ 95 en Performance/Accessibility/SEO antes de publicar (ver checklist).

## 9. Preparado para el futuro sin refactor

- **Blog**: añadir `/blog/[slug]` con MDX cuando se decida; el layout y el sistema de diseño ya son compartidos.
- **Experimentos IA**: añadir `/experimentos` como nueva entrada de navegación + nueva carpeta de contenido; no toca nada existente porque el contenido ya está desacoplado por diseño (punto 3).
- **PokedexIA + IA real**: cuando se diseñe esa funcionalidad, solo cambia el contenido de la ficha del proyecto (y el propio repo `PokedexIA`), no la arquitectura del portfolio.
