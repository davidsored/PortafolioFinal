# Skills del proyecto

Skills instaladas para Claude Code vía la [Skills CLI](https://skills.sh/), package manager del ecosistema abierto de agent skills. Gestionadas con `skills-lock.json` (raíz del repo). Este proyecto usa `pnpm` en vez de `npx` para invocar la CLI (ver `AGENTS.md` §Gestión de dependencias) — actualizar con `pnpm dlx skills update <skill> -p -y`, listar con `pnpm dlx skills list`.

| Carpeta | Fuente | Instalada para | Usada por |
|---|---|---|---|
| `impeccable/` | `pbakaus/impeccable@impeccable` | `ui-designer` | Refinamiento de UI, detección de anti-patrones frontend |
| `emil-design-eng/` | `emilkowalski/skills@emil-design-eng` | `design-engineer` | Motion, timing, easing |
| `design-taste-frontend/` | `leonxlnx/taste-skill@design-taste-frontend` | `ui-designer` | Identidad visual, criterio estético |
| `ui-ux-pro-max/` | `nextlevelbuilder/ui-ux-pro-max-skill@ui-ux-pro-max` | `ui-designer` | Patrones de UI/UX, paletas, tipografía |
| `find-skills/` | `vercel-labs/skills@find-skills` | `staff-engineer` (principal), cualquier agente | Descubrir skills nuevas cuando falte una capacidad |

Todas instaladas con `-a claude-code` (solo para este agente). La instalación inicial no genera la carpeta `.agents/` universal, pero `skills update` sí la crea: materializa el contenido real ahí y convierte `.claude/skills/<skill>/` en un [junction](https://learn.microsoft.com/windows/win32/fileio/hard-links-and-junctions) que apunta a esa carpeta. `.agents/` está en `.gitignore` — no es portable entre máquinas (el junction no sobrevive a un `git clone`), así que la fuente de verdad versionada sigue siendo esta carpeta (a través del junction) más `skills-lock.json`. Si se clona el repo en otra máquina, la primera actualización de cualquier skill regenera `.agents/` y el junction correspondiente.

**Nota de seguridad:** el instalador marcó `ui-ux-pro-max` como "High Risk" en el escaneo automático de Gen (0 alertas en Socket, "Low Risk" en Snyk) — probablemente por incluir scripts Python (`_sync_all.py`) capaces de red. No se ha auditado línea a línea; revisar `scripts/` antes de invocarlo si surge cualquier duda.

No crear skills propias aquí sin justificación — usar `skill-creator` solo si una capacidad necesaria no existe ya en el ecosistema (comprobar primero con `find-skills`/`pnpm dlx skills find`).
