# Workflow del sistema multiagente

Este documento explica en detalle la arquitectura de agentes de Claude Code que guía el desarrollo del portfolio (definidos en [`.claude/agents/`](../.claude/agents/)), complementando el resumen de [`AGENTS.md`](../AGENTS.md) § Sistema Multiagente.

## 1. Por qué un sistema multiagente y no un único agente

Un agente único que "hace de todo" tiende a mezclar responsabilidades: la misma pasada que decide arquitectura también elige colores, también escribe el copy, también decide si hace falta un test. Eso es exactamente lo que este proyecto quiere evitar (ver `AGENTS.md` § Código, principio de responsabilidad única aplicado a componentes — el mismo principio se aplica aquí a nivel de agentes).

Separar por dominio da tres ventajas concretas:

1. **Cada agente tiene un contrato claro** (objetivo, responsabilidades, restricciones) que se puede auditar igual que se audita una interfaz de código.
2. **Los conflictos se hacen visibles** en vez de resolverse por defecto a favor de quien "toca el teclado" — si UI Designer y Design Engineer no coinciden en si algo debe animarse, es una conversación explícita, no un accidente de implementación.
3. **Escala mejor**: añadir un dominio nuevo (p. ej. internacionalización, si algún día se activa) es añadir un agente, no reescribir instrucciones de un agente gigante que ya hace demasiado.

## 2. Arquitectura del sistema

```
                        ┌───────────────┐
                        │  Orchestrator │
                        └───────┬───────┘
                                │ analiza y descompone
                                ▼
                 ┌──────────────────────────┐
                 │   Frontend Architect      │  ← estructura, tipado, estado
                 └──────────────┬────────────┘
                                │
            ┌───────────────────┼───────────────────┐
            ▼                   ▼                   ▼
   ┌─────────────────┐ ┌─────────────────┐ ┌──────────────────┐
   │   UI Designer    │ │ Design Engineer │ │  Content Writer   │
   │  (visual/layout)  │ │ (motion/anim.)   │ │   (textos)         │
   └────────┬─────────┘ └────────┬────────┘ └─────────┬─────────┘
            │                    │                     │
            └───────────┬────────┴──────────┬──────────┘
                         ▼                   ▼
              ┌────────────────┐   ┌──────────────────────┐
              │ Testing Engineer│   │ Accessibility Engineer│
              └────────┬────────┘   └───────────┬───────────┘
                        │                        │
                        └───────────┬────────────┘
                                     ▼
                          ┌────────────────────┐
                          │ Performance Engineer │
                          └──────────┬───────────┘
                                     ▼
                            ┌────────────────┐
                            │  Code Reviewer  │
                            └────────┬────────┘
                                     ▼
                                  Merge

   GitHub Manager: transversal, interviene siempre que hay que
   documentar/publicar (README, releases, CI), no está atado a
   un punto fijo del flujo.
```

`Frontend Architect` es el único punto de paso obligatorio antes de que `UI Designer`, `Design Engineer` y `Content Writer` puedan trabajar, porque los tres necesitan una estructura de componentes/datos ya definida sobre la que operar. Esos tres pueden trabajar **en paralelo** entre sí (no hay dependencia entre vestir un componente, animarlo y redactar su texto). `Testing Engineer` y `Accessibility Engineer` también pueden solaparse. `Performance Engineer` y `Code Reviewer` van al final porque necesitan ver el resultado combinado.

## 3. Los 10 agentes (resumen — el detalle completo está en cada archivo)

| Agente | Dominio | No hace |
|---|---|---|
| [`orchestrator`](../.claude/agents/orchestrator.md) | Coordinación y delegación | Implementar funcionalidades grandes |
| [`frontend-architect`](../.claude/agents/frontend-architect.md) | Arquitectura React/TS, estructura, estado | Diseño visual, contenido |
| [`ui-designer`](../.claude/agents/ui-designer.md) | Layout, color, tipografía, sistema visual | Lógica, motion, arquitectura |
| [`design-engineer`](../.claude/agents/design-engineer.md) | Motion, microinteracciones, easter eggs | Arquitectura, contenido |
| [`content-writer`](../.claude/agents/content-writer.md) | Todo el texto en español | Código, incluso archivos de contenido `.ts` |
| [`github-manager`](../.claude/agents/github-manager.md) | READMEs, CI, releases, perfil de GitHub | Código de la app, copy del portfolio |
| [`testing-engineer`](../.claude/agents/testing-engineer.md) | Vitest, RTL, Playwright | Implementar la funcionalidad probada |
| [`performance-engineer`](../.claude/agents/performance-engineer.md) | Lighthouse, bundle, imágenes, fuentes | Funcionalidades nuevas, diseño |
| [`accessibility-engineer`](../.claude/agents/accessibility-engineer.md) | WCAG, teclado, ARIA, contraste | Funcionalidades nuevas, diseño |
| [`code-reviewer`](../.claude/agents/code-reviewer.md) | Revisión final de calidad | Desarrollar nada, solo revisa |

## 4. Por qué no hay más agentes (SEO, seguridad, despliegue)

El brief permitía añadir agentes adicionales si estaban justificados, no duplicaban responsabilidades y mejoraban la escalabilidad. Se evaluaron tres candidatos y se descartaron **por ahora**, aplicando YAGNI:

- **SEO**: es implementación técnica (`generateMetadata`, `sitemap.ts`, JSON-LD) que ya encaja en `frontend-architect`, más el copy de `title`/`description` que ya encaja en `content-writer`. Un agente de SEO separado tendría muy poco trabajo propio y generaría fricción de coordinación innecesaria.
- **Seguridad**: la superficie de ataque del proyecto es mínima (sitio estático + un Server Action de contacto). Las verificaciones de seguridad relevantes ya están en la checklist de `code-reviewer` (§ Restricciones y checklist "¿Es seguro?"). Si el proyecto añadiera autenticación de usuarios o pagos, se reevaluaría un agente dedicado.
- **Despliegue/DevOps**: el pipeline (Vercel + GitHub Actions) es lo bastante pequeño para repartirse entre `github-manager` (CI, `.github/workflows/`) y `performance-engineer` (salud del build de producción), sin necesitar un agente propio.

**Regla para el futuro**: crear un agente nuevo solo cuando un dominio empiece a competir de forma recurrente por la atención de dos o más agentes existentes, o cuando el proyecto adquiera una complejidad real en esa área (p. ej. si se añade backend propio con lógica de negocio no trivial, ahí sí tendría sentido un `backend-engineer`).

## 5. Flujo de trabajo típico: funcionalidad nueva

```
Nueva funcionalidad
        ↓
   Orchestrator                 → analiza, descompone, decide orden
        ↓
 Frontend Architect             → estructura, tipado, interfaz de datos
        ↓
 ┌──────┬───────────┬──────────┐
 UI Designer  Design Engineer  Content Writer     → en paralelo
 └──────┴───────────┴──────────┘
        ↓
 Testing Engineer  +  Accessibility Engineer       → en paralelo
        ↓
 Performance Engineer
        ↓
 Code Reviewer                 → informe (ReportFindings) o aprobación
        ↓
 (GitHub Manager si hay que documentar/publicar)
        ↓
      Merge
```

Ejemplo de delegación real — "añadir la ficha del proyecto CourtManager":

1. **Orchestrator** identifica que toca arquitectura (ruta `/proyectos/tennis-tournament`), diseño, posible motion, contenido y tests.
2. **Frontend Architect** crea la ruta y confirma que `content/proyectos/tennis-tournament.ts` cumple la interfaz `Proyecto` ya existente (no hace falta ampliarla).
3. En paralelo: **Content Writer** redacta el texto (ya existe un borrador en `docs/06-estrategia-contenido.md` § 3.2 — lo adapta, no lo reinventa), **UI Designer** monta `ProjectHero`/`TechBadgeList` con los tokens del sistema de diseño, **Design Engineer** añade el hover de las tarjetas de funcionalidad.
4. **Testing Engineer** añade un test de componente si `ProjectHero` tiene lógica (p. ej. mostrar/ocultar el badge de demo según si `demoUrl` existe). **Accessibility Engineer** verifica navegación y contraste de la página nueva.
5. **Performance Engineer** confirma que las capturas usan `next/image` y no penalizan LCP.
6. **Code Reviewer** revisa el conjunto contra la checklist de `AGENTS.md` y emite informe.
7. **GitHub Manager** no interviene aquí salvo que se quiera enlazar la nueva ficha desde el README de `TennisTournament`.

## 6. Comunicación entre agentes

Los agentes no "se hablan" directamente entre sí en tiempo real: es el **Orchestrator** quien transporta el contexto necesario de un agente a otro (qué se ha decidido, qué archivos existen, qué queda pendiente). Cada agente debe:

- Dejar explícito en su salida qué queda pendiente y para quién (p. ej. `ui-designer` señala a `design-engineer` qué elementos merecen microinteracción).
- No asumir silenciosamente que otro agente ya ha hecho algo — verificarlo leyendo el estado real del código/docs, no solo confiar en la palabra del agente anterior.

## 7. Criterios para solicitar revisión

`code-reviewer` interviene siempre que:

- El cambio toca más de un archivo de código, o
- El cambio afecta a configuración con impacto en seguridad/CI (`.github/workflows/`, variables de entorno, dependencias nuevas), o
- El Orchestrator va a marcar una fase del roadmap como completada.

No hace falta revisión para cambios puramente documentales sin impacto en código (p. ej. corregir un typo en `docs/`).

## 8. Resolución de conflictos

Cuando dos agentes especializados dan recomendaciones incompatibles (p. ej. `ui-designer` quiere una animación de entrada más larga por estética y `performance-engineer` la marca como coste de bundle innecesario), el **Orchestrator** resuelve aplicando, en este orden:

1. **Prioridades del proyecto** (`docs/01-plan-general.md` § 2): conseguir entrevistas > demostrar capacidad técnica > diferenciación > personalidad > mantenibilidad.
2. **Reglas ya escritas** en `docs/05-sistema-diseno.md`/`docs/02-arquitectura.md` — si ya hay una decisión documentada, se aplica, no se reabre la discusión cada vez.
3. Si ninguna de las dos resuelve el conflicto, se plantea explícitamente a David con las dos opciones y su trade-off (igual que se hizo con la decisión de Next.js vs. SPA o con el caso de PokedexIA) — el Orchestrator no decide unilateralmente algo que cambia la experiencia o la narrativa del portfolio.

## 9. Cómo añadir un agente nuevo en el futuro

1. Confirmar que el dominio no está ya cubierto (revisar la tabla de la sección 3 y el § 4 de este documento).
2. Escribir `.claude/agents/<nombre>.md` con las 9 secciones obligatorias (Objetivo, Responsabilidades, Restricciones, Cuándo debe utilizarse, Relación con otros agentes, Skills utilizadas, Entradas, Salidas, Checklist) — usar cualquier agente existente como plantilla de formato.
3. Definir `tools:` en el frontmatter de forma restrictiva: solo las herramientas que ese dominio necesita de verdad (p. ej. `code-reviewer` no tiene `Write`/`Edit` a propósito, para que la restricción "nunca desarrolla" se cumpla también a nivel técnico, no solo de instrucciones).
4. Insertar el agente en el diagrama de flujo de este documento y en la tabla de la sección 3.
5. Actualizar `AGENTS.md` § Sistema Multiagente si cambia el orden recomendado de ejecución.

## 10. Cómo mantener el sistema

- Si un agente empieza a necesitar tocar sistemáticamente archivos fuera de su dominio declarado, es una señal de que su contrato está mal definido — se ajusta el `.md`, no se ignora la restricción.
- Revisar este documento y `AGENTS.md` § Sistema Multiagente cada vez que se cierre una fase del roadmap (`docs/03-roadmap.md`), igual que se revisa el propio roadmap.
- Cuando se instalen finalmente las skills pendientes (Emil Design Engineering, Impeccable Style, Taste, UI UX Pro Max, Find Skills — ver `docs/01-plan-general.md` § 6), actualizar la nota de "estado actual" en `ui-designer.md` y `design-engineer.md` para reflejar que ya están disponibles.
