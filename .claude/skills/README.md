# Skills locales del proyecto

Carpeta reservada para skills propias del proyecto (un `SKILL.md` por skill, mecanismo estándar de Claude Code), a diferencia de las skills instalables vía plugin/marketplace.

Actualmente vacía. Contexto relevante:

- `ui-designer` y `design-engineer` (ver `.claude/agents/`) dependen de 5 skills — Emil Design Engineering, Impeccable Style, Taste, UI UX Pro Max y Find Skills — que **no están instaladas** en el entorno (decisión de instalación aparcada, ver `docs/01-plan-general.md` § 6 y `AGENTS.md` § Uso de skills).
- Si en el futuro se decide no depender de un marketplace externo, esta carpeta es el lugar para construir versiones propias equivalentes con la skill `skill-creator`, en vez de dejar la guía de diseño solo como texto en `docs/05-sistema-diseno.md`.
- Esa decisión sigue sin tomarse — no crear nada aquí sin que David lo pida explícitamente.
