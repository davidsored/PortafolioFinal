import type { Proyecto } from "../types";

export const tennisTournament: Proyecto = {
  slug: "tennis-tournament",
  titulo: "CourtManager",
  descripcionCorta:
    "Gestor profesional de torneos y ligas de tenis: ligas de liguilla, cuadros de eliminatorias con siembra, partidos casuales con marcador en directo.",
  descripcionCompleta:
    "Aplicación full-stack en Python (sin una línea de JavaScript propio) que cubre tres formatos de competición —liguilla, eliminatoria y partido casual— con un motor de puntuación de tenis completo (0-15-30-40, deuce, ventaja, tie-break configurable) y persistencia real en PostgreSQL. Es, con diferencia, el proyecto con más disciplina de ingeniería de los tres: 165 tests automatizados en tres niveles, CI en GitHub Actions y despliegue en producción.",
  problema:
    "Clubes, organizadores amateur y profesores de tenis siguen gestionando torneos con hojas de cálculo y papel, lo que falla justo cuando más importa: en directo, durante el partido.",
  solucion:
    "CourtManager da una alternativa fiable para organizar la competición y llevar el marcador punto a punto sin errores, del sorteo al saque final.",
  tecnologias: [
    "Reflex (Python end-to-end)",
    "SQLModel + SQLAlchemy 2.0",
    "PostgreSQL",
    "Alembic",
    "Tailwind CSS v4",
    "Docker",
    "Pytest",
    "Playwright",
  ],
  arquitectura:
    "Separación estricta por capas dentro de TennisTournament/: logic/ (reglas de negocio puras, sin dependencias de UI ni base de datos), models/ (SQLModel), states/ (estado de Reflex, la capa que conecta lógica con UI) y pages/components/ (interfaz). Esta separación es la que permite que logic/ tenga el 100% de cobertura de tests sin necesitar base de datos ni navegador.",
  funcionalidades: [
    "Ligas de liguilla con generación automática de calendario y clasificación con desempates en cascada",
    "Cuadros de eliminatoria con siembra y distribución automática de BYEs",
    "Partidos casuales con marcador rápido cuya configuración se codifica en la propia URL",
    "Marcador en directo con máquina de estados completa del reglamento de tenis, incluyendo tie-break configurable",
    "Controles de administrador protegidos por contraseña para acciones destructivas",
  ],
  decisionesTecnicas: [
    "Lógica de negocio 100% desacoplada de Reflex y de la base de datos, lo que hace posible el 100% de cobertura en unitarios sin mocks frágiles",
    "Desempates en clasificación resueltos en cascada (puntos → diferencia de sets → orden alfabético) para un resultado siempre determinista",
    "Tests E2E con Playwright usando localizadores centrados en el usuario (get_by_role, get_by_text) con el patrón Page Object Model",
    "Dockerización completa con volúmenes que preservan la build entre reinicios, para un entorno de desarrollo reproducible",
  ],
  aprendizajes:
    "Separar agresivamente la lógica pura del resto del sistema no es arquitectura por estética: es lo que hizo posible escribir 107 tests unitarios rápidos y sin fragilidad, y la razón por la que este proyecto se pudo llevar a producción con confianza.",
  repoUrl: "https://github.com/davidsored/TennisTournament",
  demoUrl: "https://tennistournament-98ar.onrender.com",
  principal: true,
  imagenPortada: "/projects/tennis-tournament/cover.png",
};
