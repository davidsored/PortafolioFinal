# Estrategia de contenido y textos

Todos los textos están en español, escritos para reclutadores técnicos de empresas españolas y europeas hispanohablantes. Tono: directo, concreto, sin adjetivos vacíos ("apasionado", "proactivo", "team player") salvo que vayan acompañados de una prueba.

---

## 1. Home

### Hero

**Titular:**

> Construyo aplicaciones web que funcionan de verdad.

**Subtitular (usa el título oficial de David):**

> Desarrollador Backend especializado en la creación de aplicaciones web de alto rendimiento con C#, ASP.NET Core y Blazor WebAssembly. Ampliando ahora hacia Python e integración de IA.

**CTAs:**

- Primario: `Ver proyectos` → `/proyectos`
- Secundario: `Descargar CV` → `/cv/david-suarez-otero-cv.pdf`

### Propuesta de valor (3 columnas cortas, debajo del hero)

1. **Aplicaciones completas, no ejercicios.** De la base de datos a la interfaz: reservas, torneos en directo, catálogos con datos reales. Cada proyecto resuelve un problema concreto, no un tutorial.
2. **Buenas prácticas desde el primer commit.** Tests automatizados (165 en el proyecto más exigente), CI/CD, control de acceso por roles, arquitectura por capas.
3. **Aprendizaje activo, no una lista de tecnologías.** Python, Docker e integración de IA no están "en el CV porque suena bien": están en proyectos reales que se pueden ver y ejecutar.

### CTA de cierre (final de la home)

> ¿Buscas un backend/fullstack junior que ya sabe entregar? Hablemos.
> [Contactar] [Ver GitHub]

---

## 2. Sobre mí

> Empecé programando porque quería entender qué pasaba "por debajo" de las aplicaciones que usaba a diario, y me quedé por lo mismo que me sigue enganchando ahora: la sensación de que un sistema mal diseñado se nota a la primera consulta lenta o al primer bug de concurrencia, y uno bien diseñado simplemente no da problemas.
>
> Mi base es backend en el ecosistema .NET: C#, ASP.NET Core, Entity Framework, Blazor WebAssembly. Con eso he construido cosas tan distintas como un sistema de reservas para espacios de coworking con control de roles y cálculo de tarifas en tiempo real, o una API que traduce datos de una fuente externa al español para que sean usables por un cliente real. No son ejercicios de clase: son aplicaciones con base de datos, autenticación y reglas de negocio que tienen que cuadrar.
>
> Desde hace unos meses estoy ampliando el foco hacia Python, contenedores con Docker y, sobre todo, hacia entender cómo integrar modelos de IA en aplicaciones reales, no como "añadir un chatbot" sino como una herramienta más dentro de una arquitectura sólida. El salto no es teórico: mi proyecto más completo hasta la fecha —un gestor de torneos y ligas de tenis con marcador en directo— está escrito en Python, con 165 tests automatizados, integración continua y despliegue en producción. Fue una decisión consciente: si quiero moverme hacia un perfil fullstack con IA, tenía que empezar a construir ahí, no solo leerlo.
>
> Trabajo de forma metódica: prefiero entender el problema y diseñar antes de escribir código, escribo tests para la lógica que puede romperse en silencio, y reviso mi propio código con la misma exigencia con la que espero que se revise el de un compañero. Uso herramientas de IA en mi día a día de desarrollo (para acelerar tareas repetitivas, revisar código o explorar alternativas de diseño), pero la decisión final —qué construir y cómo— siempre pasa por criterio propio.
>
> Busco mi primera oportunidad como desarrollador backend o fullstack junior en un equipo donde pueda seguir aprendiendo con gente más experimentada, y donde lo que ya sé hacer (que es bastante más que "lo básico de un junior") tenga sitio desde el primer día.

---

## 3. Proyectos principales

### 3.1 Coworking Manager (`ProyectoWebCoworking`)

- **Título:** Coworking Manager — reservas y gestión para espacios de trabajo compartido
- **Descripción corta:** Sistema de gestión integral para espacios de coworking: reservas de salas y puestos para usuarios, control total de recursos, tarifas y usuarios para administradores.
- **Problema que resuelve:** Los espacios de coworking pequeños/medianos gestionan reservas y disponibilidad con hojas de cálculo o WhatsApp, lo que genera solapes, errores de tarifa y cero trazabilidad. Coworking Manager centraliza reservas, disponibilidad y facturación en un único sistema con roles diferenciados.
- **Descripción completa:** Aplicación web MVC construida como proyecto final de ciclo (Desarrollo de Aplicaciones Web), pensada para uso real: un cliente puede reservar una sala o puesto viendo disponibilidad en tiempo real, con cálculo automático de tarifa según duración y tipo de recurso; un administrador gestiona el catálogo de recursos, usuarios y tarifas desde un panel con operaciones CRUD completas.
- **Tecnologías:** ASP.NET Core 8 (MVC), Entity Framework Core (Code First y Database First), MySQL, Bootstrap 5 (tema Zephyr), jQuery, BCrypt.
- **Arquitectura:** MVC monolítico: los controladores concentran el flujo de cada dominio (reservas, recursos, tarifas, usuarios) y acceden a los datos con EF Core sobre MySQL; el envío de correo está aislado tras una interfaz (`IEmailService`) registrada por inyección de dependencias. Autenticación basada en cookies con control de acceso por roles (RBAC): las vistas y acciones de administración están protegidas a nivel de controlador, no solo ocultas en la interfaz.
- **Funcionalidades principales:**
  - Reservas con validación automática de disponibilidad (evita solapes).
  - Cálculo dinámico de tarifas según recurso y duración.
  - Panel administrativo con CRUD completo de recursos, tarifas y usuarios.
  - Área de cliente con historial de reservas y gestión de perfil.
  - Envío real de correos de confirmación de reserva vía SMTP (Gmail), tras la interfaz `IEmailService`.
- **Decisiones técnicas relevantes:**
  - Contraseñas con BCrypt en vez de hashing simple: decisión explícita de seguridad, no un checkbox de curso.
  - Soporte de EF Core en dos modos (Code First / Database First) para poder partir de un esquema MySQL ya existente en entornos reales, no solo generar la base desde cero.
  - RBAC aplicado en el controlador (no solo ocultando botones en la vista), para que una URL directa no salte el control de permisos.
- **Aprendizajes:** Diseñar un modelo de disponibilidad/solapes es más delicado de lo que parece a priori (bordes de intervalos, zona horaria, reservas que se solapan parcialmente); fue el primer sitio donde entendí por qué la validación de negocio no puede vivir solo en el frontend.
- **Enlace al repositorio:** https://github.com/davidsored/ProyectoWebCoworking
- **Demo:** pendiente de despliegue (ver [03-roadmap.md](./03-roadmap.md), Fase 4) — la ficha se publica con capturas + código mientras se resuelve el hosting con MySQL.

### 3.2 CourtManager (`TennisTournament`)

- **Título:** CourtManager — del sorteo al saque final
- **Descripción corta:** Gestor profesional de torneos y ligas de tenis: ligas de liguilla, cuadros de eliminatorias con siembra, partidos casuales con marcador en directo.
- **Problema que resuelve:** Clubes, organizadores amateur y profesores de tenis siguen gestionando torneos con hojas de cálculo y papel, lo que falla justo cuando más importa: en directo, durante el partido. CourtManager da una alternativa fiable para organizar la competición y llevar el marcador punto a punto sin errores.
- **Descripción completa:** Aplicación full-stack en Python (sin una línea de JavaScript propio) que cubre tres formatos de competición —liguilla, eliminatoria y partido casual— con un motor de puntuación de tenis completo (0-15-30-40, deuce, ventaja, tie-break configurable) y persistencia real en PostgreSQL. Es, con diferencia, el proyecto con más disciplina de ingeniería de los tres: 165 tests automatizados en tres niveles, CI en GitHub Actions y despliegue en producción.
- **Tecnologías:** Reflex 0.9 (Python end-to-end), SQLModel + SQLAlchemy 2.0, PostgreSQL (Supabase) / SQLite, Alembic, Tailwind CSS v4, Docker + docker-compose, Pytest + Playwright.
- **Arquitectura:** Separación estricta por capas dentro de `TennisTournament/`: `logic/` (reglas de negocio puras, sin dependencias de UI ni base de datos), `models/` (SQLModel), `states/` (estado de Reflex, la capa que conecta lógica con UI) y `pages/`/`components/` (interfaz). Esta separación es la que permite que `logic/` tenga el 100% de cobertura de tests sin necesitar base de datos ni navegador.
- **Funcionalidades principales:**
  - Ligas de liguilla con generación automática de calendario (algoritmo circular) y clasificación con desempates en cascada.
  - Cuadros de eliminatoria con siembra y distribución automática de BYEs (evitando enfrentamientos BYE-contra-BYE).
  - Partidos casuales con marcador rápido cuya configuración se codifica en la propia URL, sobreviviendo a recargas sin necesitar base de datos.
  - Marcador en directo con máquina de estados completa del reglamento de tenis, incluyendo tie-break configurable.
  - Controles de administrador protegidos por contraseña para acciones destructivas, con sesión persistida en LocalStorage.
- **Decisiones técnicas relevantes:**
  - Lógica de negocio 100% desacoplada de Reflex y de la base de datos (`logic/`), lo que hace posible el 100% de cobertura en unitarios sin mocks frágiles.
  - Desempates en clasificación resueltos en cascada (puntos → diferencia de sets → orden alfabético) para que el resultado sea siempre determinista y explicable.
  - Tests E2E con Playwright usando localizadores centrados en el usuario (`get_by_role`, `get_by_text`) en vez de selectores CSS frágiles, aplicando el patrón Page Object Model.
  - Dockerización completa con volúmenes que preservan la build de Next.js (motor interno de Reflex) entre reinicios, para un entorno de desarrollo reproducible.
- **Aprendizajes:** Separar agresivamente la lógica pura del resto del sistema no es "arquitectura por estética": es lo que hizo posible escribir 107 tests unitarios rápidos y sin fragilidad, y es la razón por la que este proyecto se pudo llevar a producción con confianza.
- **Enlace al repositorio:** https://github.com/davidsored/TennisTournament
- **Demo:** https://tennistournament-98ar.onrender.com

### 3.3 PokedexIA

- **Título:** PokedexIA — explorador de Kanto y Johto
- **Descripción corta:** Pokédex interactiva con estética retro 8-bit para explorar los 251 Pokémon de las regiones Kanto y Johto, con búsqueda y filtrado en tiempo real.
- **Problema que resuelve:** Proyecto de práctica orientado a dominar consumo de APIs públicas y renderizado estático/incremental en Next.js con una interfaz que no se sintiera "genérica de tutorial" — de ahí la apuesta por una estética retro 8-bit cuidada en vez de un listado plano.
- **Descripción completa:** Catálogo construido sobre PokeAPI que combina búsqueda en tiempo real, filtrado por tipo y región, y vistas de detalle con estadísticas base, habilidades y navegación entre Pokémon, todo con generación estática para máximo rendimiento.
- **Tecnologías:** Next.js 16, React 19, TypeScript, CSS Modules, Axios, PokeAPI.
- **Arquitectura:** Next.js con el router `pages/` (decisión consciente, no App Router), combinando `getStaticProps`/`getStaticPaths` para las fichas de detalle con revalidación periódica en la página principal — es decir, contenido que casi nunca cambia se sirve como HTML estático puro, sin coste de servidor por visita.
- **Funcionalidades principales:**
  - Búsqueda por nombre o ID en tiempo real.
  - Filtro por tipo de Pokémon y filtro lateral por región.
  - Vista de detalle con estadísticas base, habilidades y navegación entre fichas.
  - Tarjetas con sprites clásicos y estética retro 8-bit consistente en toda la app.
- **Decisiones técnicas relevantes:**
  - `images.unoptimized = true` para servir sprites remotos de PokeAPI sin pelearse con el optimizador de imágenes de Next.js sobre un dominio externo que ya sirve assets optimizados.
  - Cálculo de región por rango de ID (Kanto 1-151, Johto 152-251) en vez de mantener un mapeo manual: una línea de lógica en vez de una tabla de datos redundante.
- **Aprendizajes / nota de transparencia:** El nombre del proyecto viene de una idea inicial de incorporar IA (p. ej. recomendación o comparación de Pokémon) que todavía no está implementada — se irá evaluando con calma qué función de IA aporta valor real antes de añadirla, en vez de forzar una integración superficial solo para justificar el nombre. Por ahora, el proyecto se presenta por lo que es hoy: una base de Next.js/TypeScript sólida y bien optimizada.
- **Enlace al repositorio:** https://github.com/davidsored/PokedexIA
- **Demo:** https://pokedex-ia-beta.vercel.app

---

## 4. Proyectos secundarios

### TaskPlanner

- **Descripción corta:** SPA full-stack de gestión avanzada de tareas y tiempo, con vistas de calendario (día/semana/mes) y tareas recurrentes con excepciones.
- **Tecnologías:** Blazor WebAssembly, ASP.NET Core API, Entity Framework Core, Bootstrap.
- **Detalle destacado:** algoritmo propio de detección de solapes en tiempo real entre tareas con horario, y sistema de tareas recurrentes que admite excepciones puntuales (p. ej. "todos los lunes excepto festivos").
- **Repositorio:** https://github.com/davidsored/TaskPlanner

### OnePieceAPI

- **Descripción corta:** API REST en ASP.NET Core que actúa de intermediaria sobre una API pública de One Piece, traduciendo los modelos a español para consumo por clientes propios.
- **Tecnologías:** .NET 10, ASP.NET Core Web API, `HttpClient` vía `IHttpClientFactory`, `System.Text.Json`, OpenAPI.
- **Detalle destacado:** patrón Backend-for-Frontend simple pero real (Controller → Service → API externa), con seis recursos (Personajes, Espadas, Frutas, Tripulaciones, Haki, Barcos) y localización de datos como valor añadido, no solo un proxy 1:1.
- **Repositorio:** https://github.com/davidsored/OnePieceAPI
- **Nota narrativa:** este es el proyecto que sirve de base "seria" para el easter egg de One Piece del portfolio — el guiño visual apunta a código real, no a un gadget sin sustancia.

---

## 5. Sección "Stack tecnológico"

Objetivo: que no se lea como una lista de logos, sino como evidencia de para qué ha servido cada tecnología.

### Backend

> **C#, .NET, ASP.NET Core, Blazor WebAssembly.** Es mi base y donde tengo más horas de vuelo: APIs REST con capas bien separadas (`OnePieceAPI`), autenticación y control de acceso por roles sobre MySQL (`Coworking Manager`), y una SPA completa sobre Blazor con lógica de calendario no trivial (`TaskPlanner`).

### En expansión

> **Python.** Elegido para el proyecto más exigente técnicamente del portfolio (`CourtManager`): 165 tests, integración continua y despliegue en producción. No es una línea suelta en el CV, es donde más estoy invirtiendo ahora mismo, con vistas a moverme hacia un perfil fullstack + IA.

### Frontend

> **React, TypeScript, HTML, CSS, JavaScript.** Aplicados en `PokedexIA`: componentes reutilizables, generación estática, tipado fuerte en toda la capa de datos consumidos de una API externa. Este mismo portfolio está construido con este stack.

### Bases de datos

> **MySQL, SQL Server, PostgreSQL, SQLite.** He trabajado tanto con esquemas relacionales clásicos (Coworking Manager sobre MySQL) como con ORMs modernos tipados (SQLModel sobre PostgreSQL en CourtManager), incluyendo migraciones versionadas con Alembic.

### Herramientas y forma de trabajar

> **Git, GitHub, Docker (en aprendizaje), CI/CD con GitHub Actions, herramientas de IA para desarrollo.** Uso Docker para reproducibilidad de entornos (CourtManager) y GitHub Actions para no depender de "en mi máquina funciona". Utilizo asistentes de IA de forma habitual para acelerar tareas mecánicas y explorar alternativas, siempre con revisión propia antes de integrar nada.

---

## 6. Contacto

**Titular:** Hablemos de tu equipo y de cómo puedo ayudar.
**Texto de apoyo:** Disponible para posiciones de Backend, Fullstack o AI Engineer junior. Respondo por email o LinkedIn en menos de 48h.
**Elementos:** email de contacto, enlace LinkedIn, enlace GitHub, botón de descarga de CV, formulario simple (nombre, email, mensaje) vía Server Action.

---

## 7. Metadatos SEO por página (orientativos, se refinan en Fase 3)

| Página    | `title`                                                               | `description`                                                                                                                          |
| --------- | --------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| Home      | David Suárez-Otero Redondo — Desarrollador Backend & Fullstack Junior | Desarrollador backend junior especializado en C#, ASP.NET Core y Blazor, ampliando hacia Python e IA. Proyectos reales, no tutoriales. |
| Proyectos | Proyectos — David Suárez-Otero Redondo                                | Coworking Manager, CourtManager y PokedexIA: tres aplicaciones completas con tests, CI/CD y despliegue real.                           |
| Sobre mí  | Sobre mí — David Suárez-Otero Redondo                                 | Cómo trabajo, qué domino y hacia dónde voy: de .NET a Python e integración de IA en aplicaciones reales.                               |
