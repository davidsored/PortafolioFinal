import type { Proyecto } from "../types";

export const onePieceApi: Proyecto = {
  slug: "onepiece-api",
  titulo: "OnePieceAPI",
  descripcionCorta:
    "API REST en ASP.NET Core que actúa de intermediaria sobre una API pública de One Piece, traduciendo los modelos a español para consumo por clientes propios.",
  descripcionCompleta:
    "Patrón Backend-for-Frontend simple pero real: Cliente → OnePieceAPI → api-onepiece.com → respuesta mapeada. Seis recursos (Personajes, Espadas, Frutas, Tripulaciones, Haki, Barcos) con localización de datos como valor añadido, no solo un proxy 1:1.",
  problema:
    "Consumir una API externa directamente desde un cliente implica acoplarse a su idioma, forma y disponibilidad.",
  solucion:
    "Un backend intermediario propio que normaliza y traduce la respuesta, aislando a cualquier cliente futuro de la API externa.",
  tecnologias: [
    ".NET 10",
    "ASP.NET Core Web API",
    "HttpClient (IHttpClientFactory)",
    "System.Text.Json",
    "OpenAPI",
  ],
  arquitectura:
    "Controller → Service (HttpClient vía IHttpClientFactory) → API externa → modelos en español.",
  funcionalidades: [
    "Seis recursos con tres patrones de endpoint cada uno: todos, por ID, múltiples IDs",
    "Documentación OpenAPI en entorno de desarrollo",
  ],
  decisionesTecnicas: [
    "Traducción/localización de los modelos como valor añadido, no un proxy transparente 1:1",
  ],
  aprendizajes:
    "Ejercicio de aprendizaje de consumo de APIs externas y del patrón Backend-for-Frontend en ASP.NET Core — es también la base real que sostiene el guiño de One Piece en este portfolio, no un gadget sin sustancia.",
  repoUrl: "https://github.com/davidsored/OnePieceAPI",
  principal: false,
};
