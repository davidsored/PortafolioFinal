import type { Proyecto } from "../types";

export const pokedexia: Proyecto = {
  slug: "pokedexia",
  titulo: "PokedexIA",
  descripcionCorta:
    "Pokédex interactiva con estética retro 8-bit para explorar los 251 Pokémon de las regiones Kanto y Johto, con búsqueda y filtrado en tiempo real.",
  descripcionCompleta:
    "Catálogo construido sobre PokeAPI que combina búsqueda en tiempo real, filtrado por tipo y región, y vistas de detalle con estadísticas base, habilidades y navegación entre Pokémon, todo con generación estática para máximo rendimiento.",
  problema:
    "Proyecto de práctica orientado a dominar consumo de APIs públicas y renderizado estático/incremental en Next.js con una interfaz que no se sintiera genérica de tutorial.",
  solucion:
    "Una apuesta por una estética retro 8-bit cuidada en vez de un listado plano, combinada con generación estática para que el catálogo cargue al instante.",
  tecnologias: ["Next.js 16", "React 19", "TypeScript", "CSS Modules", "Axios", "PokeAPI"],
  arquitectura:
    "Next.js con el router pages/ (decisión consciente, no App Router), combinando getStaticProps/getStaticPaths para las fichas de detalle con revalidación periódica en la página principal.",
  funcionalidades: [
    "Búsqueda por nombre o ID en tiempo real",
    "Filtro por tipo de Pokémon y filtro lateral por región",
    "Vista de detalle con estadísticas base, habilidades y navegación entre fichas",
    "Tarjetas con sprites clásicos y estética retro 8-bit consistente en toda la app",
  ],
  decisionesTecnicas: [
    "images.unoptimized = true para servir sprites remotos de PokeAPI sin pelearse con el optimizador de imágenes de Next.js sobre un dominio externo",
    "Cálculo de región por rango de ID (Kanto 1-151, Johto 152-251) en vez de mantener un mapeo manual",
  ],
  aprendizajes:
    "El nombre del proyecto viene de una idea inicial de incorporar IA (p. ej. recomendación o comparación de Pokémon) que todavía no está implementada — se irá evaluando con calma qué función de IA aporta valor real antes de añadirla, en vez de forzar una integración superficial solo para justificar el nombre. Por ahora, el proyecto se presenta por lo que es hoy: una base de Next.js/TypeScript sólida y bien optimizada.",
  repoUrl: "https://github.com/davidsored/PokedexIA",
  demoUrl: "https://pokedex-ia-beta.vercel.app",
  principal: true,
};
