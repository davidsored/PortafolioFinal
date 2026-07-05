import type { Proyecto } from "../types";

export const taskPlanner: Proyecto = {
  slug: "task-planner",
  titulo: "TaskPlanner",
  descripcionCorta:
    "SPA full-stack de gestión avanzada de tareas y tiempo, con vistas de calendario (día/semana/mes) y tareas recurrentes con excepciones.",
  descripcionCompleta:
    "Una SPA full-stack para la gestión avanzada de tareas y tiempo, desarrollada con Blazor WebAssembly, con vistas dinámicas de calendario mediante CSS Grid, sistema de tareas recurrentes con excepciones, y un algoritmo propio de detección de solapes entre tareas con horario.",
  problema:
    "Gestionar tareas con horario y recurrencia (con excepciones puntuales) es más complejo de lo que las apps de tareas básicas resuelven bien.",
  solucion:
    "Una SPA en Blazor WebAssembly con vistas de calendario propias y un motor de recurrencia/solapes construido a medida.",
  tecnologias: ["Blazor WebAssembly", "ASP.NET Core API", "Entity Framework Core", "Bootstrap"],
  funcionalidades: [
    "Vistas de calendario dinámicas (día, semana, mes) con CSS Grid",
    "Sistema de tareas recurrentes con excepciones (p. ej. todos los lunes excepto festivos)",
    "Algoritmo propio de detección de solapes en tiempo real entre tareas con horario",
    "Filtrado en tiempo real por etiquetas/categorías",
  ],
  decisionesTecnicas: [
    "Gestión de estado entre componentes de Blazor para coordinar las distintas vistas de calendario sin duplicar lógica",
  ],
  repoUrl: "https://github.com/davidsored/TaskPlanner",
  principal: false,
};
