# Plan general del portfolio — David Suárez-Otero Redondo

## 1. Objetivo

Conseguir el primer empleo como **Backend / Fullstack Developer** (con proyección a **AI Engineer junior**) mediante un portfolio que demuestre, con hechos y no con adjetivos, que David puede incorporarse a un equipo profesional ya.

El portfolio es una herramienta de conversión para reclutadores técnicos, no una galería de código. Cada sección debe responder, en menos de 10 segundos de scroll, a la pregunta: _"¿esta persona puede resolver problemas reales con buenas prácticas?"_

## 2. Prioridades (en este orden, sin excepción)

1. Ayudar a conseguir entrevistas.
2. Demostrar capacidad técnica real (no percibida).
3. Diferenciarse de portfolios junior genéricos.
4. Tener personalidad propia (One Piece / Star Wars / Zelda, de forma discreta).
5. Ser mantenible y capaz de evolucionar (nuevas secciones sin rehacer nada).

Cuando dos decisiones entren en conflicto (p. ej. "un efecto visual muy vistoso" vs. "carga rápida"), gana siempre la prioridad más alta de esta lista.

## 3. Narrativa central

> "Soy un desarrollador junior capaz de construir aplicaciones completas, entender problemas reales, aplicar buenas prácticas y utilizar herramientas modernas —incluida la inteligencia artificial— para mejorar mi trabajo."

Esta frase es el filtro de diseño y contenido: si un elemento visual o un párrafo no refuerza esta narrativa, se recorta.

## 4. Quién es David (para calibrar tono y contenido)

- Perfil **junior real**, recién salido de ciclo/formación en Desarrollo de Aplicaciones Web, no autodidacta sin proyectos ni bootcamper de 3 meses.
- Ya tiene **3 proyectos completos y funcionales**, uno de ellos (`TennisTournament` / _CourtManager_) con nivel claramente superior al de un portfolio junior medio: 165 tests automatizados, CI/CD con GitHub Actions, Docker, despliegue real en Render.
- Está migrando su foco de C#/.NET hacia un perfil más **fullstack + Python + IA**, y eso ya se refleta en el propio código (CourtManager está en Python/Reflex, no en C#).
- Dos proyectos secundarios adicionales encontrados en su GitHub que no estaban en el brief inicial y que conviene aprovechar:
  - **TaskPlanner**: SPA de gestión de tareas en Blazor WebAssembly + ASP.NET Core (refuerza el perfil .NET/Blazor del CV).
  - **OnePieceAPI**: API REST en ASP.NET Core que consume una API externa de One Piece y traduce el modelo a español — encaja perfecto como vehículo _legítimo_ para el easter egg de One Piece (no es un gadget decorativo, es código real).

## 5. Decisiones ya cerradas (no se vuelven a discutir)

| Ámbito                    | Decisión                                                                                                                     |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Idioma                    | Español único, sin i18n                                                                                                      |
| Frontend                  | React + TypeScript                                                                                                           |
| CMS                       | Ninguno — contenido en archivos TS tipados dentro del propio repo                                                            |
| Backend propio            | Ninguno salvo justificación puntual (ver [02-arquitectura.md](./02-arquitectura.md) para el caso del formulario de contacto) |
| Deploy                    | Vercel                                                                                                                       |
| Blog                      | No en v1, arquitectura preparada para añadirlo                                                                               |
| Sección "Experimentos IA" | No en v1, arquitectura preparada para añadirla sin refactor                                                                  |
| Foto personal             | No se incluye                                                                                                                |
| Modo claro/oscuro         | Obligatorio desde v1                                                                                                         |

## 6. Hallazgo importante a gestionar: "PokedexIA"

El repo `PokedexIA` **no contiene ninguna funcionalidad de IA** — es un catálogo Next.js/TypeScript sobre PokeAPI, muy sólido técnicamente pero sin LLM, ML ni lógica "inteligente" de ningún tipo. Presentarlo insinuando IA sería exactamente el tipo de "portfolio genérico/inflado" que este proyecto quiere evitar.

**Decisión de David:** aparcar por ahora la idea de añadirle una función de IA real (se diseñará con calma en otra sesión, no se improvisa). Mientras tanto:

- El copy del portfolio para PokedexIA es **honesto**: se vende por lo que es (Next.js 16, React 19, TypeScript, generación estática, UI retro 8-bit muy cuidada), sin mencionar IA.
- Se deja constancia aquí (no en el copy público) de que existe una tarea futura: _definir qué función de IA tiene sentido en PokedexIA antes de que el nombre choque con el contenido_. Candidatos a evaluar en esa sesión futura: comparador de Pokémon con recomendación por LLM, chat de "Pokédex parlante", clasificador de equipo. No se decide nada de esto ahora.

## 7. Qué NO hace esta fase

Esta ronda de trabajo entrega **documentos de planificación y contenido**, no código de producción. El scaffolding real de la app (`pnpm create next-app`, componentes, tests) es la fase siguiente y se hace después de que David revise y apruebe:

- La arquitectura recomendada (incluye una desviación razonada del brief: Next.js en vez de una SPA React "pura" — ver [02-arquitectura.md](./02-arquitectura.md)).
- El sistema de diseño inicial.
- Los textos de contenido.

## 8. Entregables de esta fase

1. [Plan general](./01-plan-general.md) (este documento)
2. [Arquitectura recomendada](./02-arquitectura.md)
3. [Roadmap por fases](./03-roadmap.md)
4. [Estructura de carpetas](./04-estructura-carpetas.md)
5. [Sistema de diseño inicial](./05-sistema-diseno.md)
6. [Estrategia de contenido](./06-estrategia-contenido.md) (incluye todos los textos)
7. [Mejoras necesarias en GitHub](./07-mejoras-github.md) + [plantilla de README](./templates/README-template.md)
8. [`AGENTS.md`](../AGENTS.md) (raíz del repo)
9. [Checklist final antes de publicar](./08-checklist-publicacion.md)
