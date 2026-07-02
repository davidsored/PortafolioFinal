# Comandos personalizados

Carpeta reservada para comandos de barra (`/comando`) específicos de este proyecto, según el mecanismo estándar de comandos personalizados de Claude Code (un archivo Markdown por comando).

Actualmente vacía — no se ha creado ningún comando todavía porque el workflow multiagente (ver [`docs/09-workflow-agentes.md`](../../docs/09-workflow-agentes.md)) cubre las necesidades actuales invocando agentes directamente.

## Candidatos a futuro (no implementados, solo anotados)

- `/nuevo-proyecto` — plantilla guiada para añadir un proyecto nuevo al portfolio, delegando en orden a `frontend-architect` → `content-writer` → `ui-designer`.
- `/checklist-publicacion` — ejecuta la verificación de `docs/08-checklist-publicacion.md` de forma guiada.
- `/auditoria-github` — dispara `github-manager` sobre los 5 repositorios según `docs/07-mejoras-github.md`.

Crear un comando aquí solo cuando un flujo se repita 3+ veces de forma idéntica — antes de eso, invocar a los agentes directamente es más simple (YAGNI).
