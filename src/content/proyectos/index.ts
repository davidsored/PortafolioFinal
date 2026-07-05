import type { Proyecto } from "../types";
import { coworkingManager } from "./coworking-manager";
import { onePieceApi } from "./onepiece-api";
import { pokedexia } from "./pokedexia";
import { taskPlanner } from "./task-planner";
import { tennisTournament } from "./tennis-tournament";

export const proyectos: Proyecto[] = [
  coworkingManager,
  tennisTournament,
  pokedexia,
  taskPlanner,
  onePieceApi,
];

export const proyectosPrincipales = proyectos.filter((p) => p.principal);
export const proyectosSecundarios = proyectos.filter((p) => !p.principal);

export function getProyectoBySlug(slug: string): Proyecto | undefined {
  return proyectos.find((p) => p.slug === slug);
}
