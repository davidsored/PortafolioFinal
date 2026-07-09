# Estrategia de mejora de GitHub

## 1. Auditoría actual (estado real a fecha de esta revisión)

> **Re-auditoría: 9 de julio de 2026** (cierre de la Fase 4). Verificado contra GitHub con `gh` CLI: PRs de higiene mergeados en `ProyectoWebCoworking`, `TaskPlanner` y `OnePieceAPI` (los tres el 08-07-2026), descripción corta y topics aplicados en los 5 repos, y repo de perfil `davidsored/davidsored` creado con README.

| Repo                   | README                                                                                     | Capturas                      | Demo enlazada                                                             | Roadmap | Licencia                                                                                                                                                       | Estado                                                 |
| ---------------------- | ------------------------------------------------------------------------------------------ | ----------------------------- | ------------------------------------------------------------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| `ProyectoWebCoworking` | Sí, rehecho con la plantilla (badges, problema, arquitectura, decisiones técnicas)         | Sí, tabla de 4 capturas       | No — badge "demo en preparación" (hosting con MySQL pendiente de decidir) | Sí      | MIT                                                                                                                                                            | 21 commits, PR #1 de higiene mergeado                  |
| `TennisTournament`     | Sí, muy completo (badges, arquitectura, testing)                                           | —                             | Sí (Render, como homepage del repo)                                       | Sí      | MIT declarada en el README; el archivo `LICENSE` que faltaba se añade en el [PR #1](https://github.com/davidsored/TennisTournament/pull/1), pendiente de merge | 33 commits, release v0.2.0 — el más maduro de los tres |
| `PokedexIA`            | Sí, bien estructurado (11 secciones)                                                       | Sí, referencias a demo visual | Sí (Vercel, como homepage del repo)                                       | Sí      | MIT                                                                                                                                                            | 26 commits                                             |
| `TaskPlanner`          | Sí, con badges de stack y capturas de 3 vistas                                             | Sí                            | No (demo excluida del alcance de la Fase 4)                               | No      | MIT                                                                                                                                                            | 18 commits, PR #1 de higiene mergeado                  |
| `OnePieceAPI`          | Sí, rehecho (ejemplo real de request/response, nota explícita de ejercicio de aprendizaje) | No                            | No (sin demo prevista — es un ejercicio)                                  | No      | MIT                                                                                                                                                            | 5 commits, PR #1 de higiene mergeado                   |

**Conclusión (actualizada al cierre de la Fase 4):** la falta de consistencia detectada en la auditoría original está resuelta — los 5 repos tienen descripción, topics y (salvo el archivo pendiente de `TennisTournament`) licencia MIT, y los 3 repos con carencias tienen README reescrito con la plantilla. Lo que queda pendiente son acciones bloqueadas por decisiones externas al README: demos de Coworking y TaskPlanner, saneamiento de secretos de Coworking, las acciones manuales del perfil (pins y bio) y el merge del PR de licencia de `TennisTournament`.

## 2. Qué falta exactamente por repo

### `ProyectoWebCoworking` (prioridad alta — es uno de los 3 proyectos principales)

- ✅ Añadir badges de tecnologías (shields.io) en la cabecera — hecho (PR #1, Fase 4).
- ✅ Añadir sección "Arquitectura" explícita — hecho, describiendo la arquitectura real: MVC monolítico donde los controladores acceden a los datos directamente vía `DbContext` (EF Core → MySQL), sin capa de servicios (el único servicio inyectado es `IEmailService`).
- ✅ Añadir licencia MIT — hecho.
- ✅ Añadir sección "Roadmap" — hecho.
- ⏳ Resolver demo (ver [03-roadmap.md](./03-roadmap.md) Fase 4) y enlazarla en la cabecera del README — **pendiente**: la decisión de hosting con MySQL sigue abierta; el README ya lo señaliza con un badge "demo en preparación".
- ⏳ Saneamiento de secretos del historial/configuración — **pendiente**: David lo pospuso al final de la fase; sigue abierto al cierre de la Fase 4.

### `TennisTournament` (ya es el más fuerte — usar como referencia interna)

- ⏳ Enlazar el portfolio desde el README ("Ver este proyecto en mi portfolio: [enlace]") — **pospuesto a Fase 5**, cuando el portfolio esté publicado.
- ⏳ **Nuevo hallazgo (re-auditoría 09-07-2026):** el README declara licencia MIT y enlaza a `./LICENSE`, pero el archivo `LICENSE` no existía en el repositorio (GitHub no detectaba licencia). Corregido en el [PR #1](https://github.com/davidsored/TennisTournament/pull/1) (`chore: añadir licencia MIT`) — **abierto, pendiente de revisión y merge por David**.

### `PokedexIA`

- Sin cambios urgentes de documentación. Cuando se decida la función de IA futura (pendiente explícito, ver [01-plan-general.md](./01-plan-general.md)), actualizar el README en ese momento, no antes.

### `TaskPlanner` (secundario, pero visible en el perfil)

- ✅ Añadir licencia — hecho (MIT, PR #1, Fase 4).
- ✅ Añadir badges de stack — hecho.
- ⏳ Considerar desplegar una demo ligera (Blazor WASM se aloja gratis en Azure Static Web Apps o GitHub Pages sin backend, o con backend simulado in-memory) — **excluida del alcance de la Fase 4**; sigue siendo opcional y valiosa porque es Blazor puro, tecnología clave del CV de David.

### `OnePieceAPI` (secundario, pero es el vehículo del easter egg)

- ✅ Añadir README con ejemplo de request/response real — hecho (PR #1, Fase 4).
- ✅ Añadir licencia — hecho (MIT).
- ✅ Mencionar explícitamente que es un ejercicio de aprendizaje de consumo de APIs externas — hecho (nota destacada en la cabecera del README).

## 3. Perfil de GitHub (`davidsored/davidsored`)

Estado a 09-07-2026 (re-auditoría de cierre de la Fase 4):

1. ⏳ **Fijar 3 repos**: `TennisTournament`, `ProyectoWebCoworking`, `PokedexIA` — los mismos 3 protagonistas del portfolio, para que la primera impresión en GitHub sea coherente con la del portfolio. **Pendiente — acción manual de David** (GitHub no permite fijar repos vía API con permisos estándar).
2. ✅ **Crear README de perfil** (repo especial `davidsored/davidsored`) — hecho: el repo existe y es público, con línea de posicionamiento, enlace al portfolio y proyectos destacados.
3. ⏳ **Rellenar la bio del perfil** — **pendiente — acción manual de David** (a fecha de la re-auditoría la bio sigue vacía).

## 4. Plantilla reutilizable

Se documenta en [`templates/README-template.md`](./templates/README-template.md) y aplica a todo repo nuevo desde ahora. Incluye las secciones que el brief pidió explícitamente: descripción, capturas, arquitectura, tecnologías, instalación, configuración, decisiones técnicas y roadmap futuro.

## 5. Higiene general recomendada (aplica a los 5 repos)

- ✅ Licencia MIT en los que no la tienen — hecho en `ProyectoWebCoworking`, `TaskPlanner` y `OnePieceAPI` (Fase 4). Excepción: a `TennisTournament` le faltaba el archivo `LICENSE` que el README referencia — añadido en el [PR #1](https://github.com/davidsored/TennisTournament/pull/1), pendiente de merge (ver § 2).
- ✅ `.gitignore` correcto por stack (verificado: no hay `bin/`, `obj/`, `node_modules/` versionados).
- ✅ Descripción corta y topics (tags) del repo rellenos en la configuración de GitHub — hecho en los 5 repos (Fase 4).
