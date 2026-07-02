# Estrategia de mejora de GitHub

## 1. Auditoría actual (estado real a fecha de esta revisión)

| Repo | README | Capturas | Demo enlazada | Roadmap | Licencia | Estado |
|---|---|---|---|---|---|---|
| `ProyectoWebCoworking` | Sí, con secciones técnicas | Carpeta `/images` con capturas | No | No | No indicada | 18 commits, sin releases |
| `TennisTournament` | Sí, muy completo (badges, arquitectura, testing) | — | Sí (Render) | Sí | MIT | 30 commits, release v0.2.0 — el más maduro de los tres |
| `PokedexIA` | Sí, bien estructurado (11 secciones) | Sí, referencias a demo visual | Sí (Vercel) | Sí | MIT | 26 commits |
| `TaskPlanner` | Sí, con capturas de 3 vistas | Sí | No | No | No indicada | 15 commits, sin actividad reciente |
| `OnePieceAPI` | Sí, con endpoints documentados | No | No | No | No indicada | 2 commits, "ejercicio completado" |

**Conclusión:** los README ya existen y tienen buen contenido técnico — el problema no es "no hay documentación", es **falta de consistencia y de señales de producto** (licencia, roadmap, capturas, badges) entre repos, y falta de demo en 3 de los 5.

## 2. Qué falta exactamente por repo

### `ProyectoWebCoworking` (prioridad alta — es uno de los 3 proyectos principales)
- Añadir badges de tecnologías (shields.io) en la cabecera.
- Añadir sección "Arquitectura" explícita con diagrama simple de capas (Controller → Service → EF Core → MySQL).
- Añadir licencia (MIT recomendada, coherente con el resto).
- Añadir sección "Roadmap" (aunque sea corta) — señal de proyecto vivo, no entregado y olvidado.
- Resolver demo (ver [03-roadmap.md](./03-roadmap.md) Fase 4) y enlazarla en la cabecera del README.

### `TennisTournament` (ya es el más fuerte — usar como referencia interna)
- Prácticamente ejemplar. Único ajuste: enlazar el portfolio desde el README ("Ver este proyecto en mi portfolio: [enlace]") una vez esté publicado.

### `PokedexIA`
- Sin cambios urgentes de documentación. Cuando se decida la función de IA futura (pendiente explícito, ver [01-plan-general.md](./01-plan-general.md)), actualizar el README en ese momento, no antes.

### `TaskPlanner` (secundario, pero visible en el perfil)
- Añadir licencia.
- Añadir badges de stack.
- Considerar desplegar una demo ligera (Blazor WASM se aloja gratis en Azure Static Web Apps o GitHub Pages sin backend, o con backend simulado in-memory) — aporta valor porque es Blazor puro, tecnología clave del CV de David.

### `OnePieceAPI` (secundario, pero es el vehículo del easter egg)
- Añadir README con ejemplo de request/response real (hoy describe endpoints pero conviene un ejemplo curl/HTTP concreto).
- Añadir licencia.
- Mencionar explícitamente que es un ejercicio de aprendizaje de consumo de APIs externas — la honestidad aquí también suma (mismo criterio aplicado a PokedexIA).

## 3. Perfil de GitHub (`davidsored/davidsored`)

Actualmente el perfil no tiene bio ni README de perfil, y ningún repo está fijado (pinned). Dos acciones de alto impacto y bajo coste:

1. **Fijar 3 repos**: `TennisTournament`, `ProyectoWebCoworking`, `PokedexIA` — los mismos 3 protagonistas del portfolio, para que la primera impresión en GitHub sea coherente con la del portfolio.
2. **Crear README de perfil** (repo especial `davidsored/davidsored`) con: una línea de posicionamito ("Backend/Fullstack junior — C#/.NET, ampliando a Python e IA"), enlace al portfolio, y los 3 proyectos destacados con un enlace directo a su demo o ficha del portfolio.

## 4. Plantilla reutilizable

Se documenta en [`templates/README-template.md`](./templates/README-template.md) y aplica a todo repo nuevo desde ahora. Incluye las secciones que el brief pidió explícitamente: descripción, capturas, arquitectura, tecnologías, instalación, configuración, decisiones técnicas y roadmap futuro.

## 5. Higiene general recomendada (aplica a los 5 repos)

- Licencia MIT en los que no la tienen — es gratis, rápido, y una ausencia de licencia se lee como descuido, no como intención.
- `.gitignore` correcto por stack (verificar que no hay `bin/`, `obj/`, `node_modules/` versionados).
- Descripción corta y topics (tags) del repo rellenos en la configuración de GitHub — mejora el descubrimiento y se ve en el listado del perfil sin entrar al README.
