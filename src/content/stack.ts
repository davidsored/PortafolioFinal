import type { StackCategoria } from "./types";

export const stack: StackCategoria[] = [
  {
    id: "backend",
    titulo: "Backend",
    tecnologias: ["C#", ".NET", "ASP.NET Core", "Blazor WebAssembly"],
    narrativa:
      "Es mi base y donde tengo más horas de vuelo: APIs REST con capas bien separadas (OnePieceAPI), autenticación y control de acceso por roles sobre MySQL (Coworking Manager), y una SPA completa sobre Blazor con lógica de calendario no trivial (TaskPlanner).",
  },
  {
    id: "en-expansion",
    titulo: "En expansión",
    tecnologias: ["Python"],
    narrativa:
      "Elegido para el proyecto más exigente técnicamente del portfolio (CourtManager): 165 tests, integración continua y despliegue en producción. No es una línea suelta en el CV, es donde más estoy invirtiendo ahora mismo, con vistas a moverme hacia un perfil fullstack + IA.",
  },
  {
    id: "frontend",
    titulo: "Frontend",
    tecnologias: ["React", "TypeScript", "HTML", "CSS", "JavaScript"],
    narrativa:
      "Aplicados en PokedexIA: componentes reutilizables, generación estática, tipado fuerte en toda la capa de datos consumidos de una API externa. Este mismo portfolio está construido con este stack.",
  },
  {
    id: "bases-de-datos",
    titulo: "Bases de datos",
    tecnologias: ["MySQL", "SQL Server", "PostgreSQL", "SQLite"],
    narrativa:
      "He trabajado tanto con esquemas relacionales clásicos (Coworking Manager sobre MySQL) como con ORMs modernos tipados (SQLModel sobre PostgreSQL en CourtManager), incluyendo migraciones versionadas con Alembic.",
  },
  {
    id: "herramientas",
    titulo: "Herramientas y forma de trabajar",
    tecnologias: ["Git", "GitHub", "Docker", "GitHub Actions", "Herramientas de IA"],
    narrativa:
      'Uso Docker para reproducibilidad de entornos (CourtManager) y GitHub Actions para no depender de "en mi máquina funciona". Utilizo asistentes de IA de forma habitual para acelerar tareas mecánicas y explorar alternativas, siempre con revisión propia antes de integrar nada.',
  },
];
