# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Reclutadores técnicos y responsables de equipo que evalúan candidaturas junior en España, casi siempre con prisa: abren el portfolio entre decenas de CV, en escritorio o móvil, y deciden en menos de 10 segundos de scroll si merece una entrevista. Un segundo perfil secundario son desarrolladores senior que revisan el código enlazado (GitHub) para verificar si lo que dice la web se sostiene.

El trabajo que vienen a hacer: responder "¿esta persona puede resolver problemas reales con buenas prácticas y entrar hoy en un equipo profesional?". No vienen a leer una biografía ni a admirar una galería de código.

## Product Purpose

Conseguir el primer empleo de David Suárez-Otero Redondo como Backend / Fullstack Developer, con proyección a AI Engineer junior. El portfolio es una herramienta de conversión, no un escaparate: su éxito se mide en entrevistas conseguidas.

Demuestra con hechos verificables lo que otros portfolios junior afirman con adjetivos. Está en español únicamente, sin i18n, y publicado en Vercel.

Prioridades declaradas, en este orden y sin excepción (`docs/01-plan-general.md` §2):

1. Ayudar a conseguir entrevistas.
2. Demostrar capacidad técnica real, no percibida.
3. Diferenciarse de portfolios junior genéricos.
4. Tener personalidad propia (One Piece / Star Wars / Zelda, de forma discreta).
5. Ser mantenible y capaz de evolucionar sin rehacer nada.

Cuando dos decisiones chocan, gana la prioridad más alta de esa lista.

## Positioning

David ya construyó aplicaciones completas con disciplina de ingeniería real, no ejercicios de tutorial — y eso es lo que un portfolio junior genérico no puede copiar con honestidad. La prueba máxima es CourtManager (`TennisTournament`): 165 tests automatizados en tres niveles, CI/CD con GitHub Actions, arquitectura por capas con lógica de negocio 100% desacoplada de UI y base de datos, Dockerización completa, despliegue real en producción (Render). Los otros dos proyectos principales (Coworking Manager, PokedexIA) refuerzan el mismo patrón con menor intensidad: problemas reales resueltos de extremo a extremo, con decisiones técnicas explicadas y justificadas, no solo listadas.

Confirmado por David: esta es la afirmación de posicionamiento correcta, no una hipótesis.

## Operating Context

David está buscando empleo **activamente ahora mismo** (confirmado 2026-07-26): el portfolio se enlaza ya en candidaturas abiertas y en LinkedIn, no es una pieza en preparación para una campaña futura. Esto implica que cualquier defecto que reduzca la tasa de conversión (contenido no verificable, fricción en el CV, controles poco claros) tiene coste inmediato, no teórico.

Contexto de evaluación del lado del reclutador: revisión rápida en escritorio o móvil entre muchas candidaturas, con posible salto a GitHub para verificar el código si el portfolio convence. Contexto de publicación: repo público en GitHub, deploy en Vercel, sin backend propio salvo la Server Action del formulario de contacto.

## Capabilities and Constraints

- Sin CMS: todo el contenido vive en archivos TS tipados dentro del propio repo (`src/content/`).
- Sin backend propio salvo justificación puntual (el formulario de contacto usa una Server Action).
- Sin i18n: español único por decisión, no por limitación técnica.
- Sin blog en v1; arquitectura preparada para añadirlo sin refactor.
- Sin sección "Experimentos IA" en v1; arquitectura preparada para añadirla sin refactor.
- Sin foto personal — decisión cerrada, no un olvido.
- Modo claro/oscuro obligatorio desde v1, no una fase posterior.
- **PokedexIA no tiene funcionalidad de IA real.** El nombre viene de una idea inicial pendiente de diseño; el copy actual es honesto y no la insinúa. No añadir mención de IA a su copy o código sin que David lo pida explícitamente.

## Brand Commitments

Narrativa central, que funciona como filtro de todo el contenido y el diseño: _"Soy un desarrollador junior capaz de construir aplicaciones completas, entender problemas reales, aplicar buenas prácticas y utilizar herramientas modernas —incluida la inteligencia artificial— para mejorar mi trabajo."_ Si un elemento visual o un párrafo no refuerza esa frase, se recorta.

Tres palabras: **preciso, futurista-contenido, honesto**.

Voz y tono: directo y concreto, en primera persona, sin inflar. Nombra tecnologías y números en lugar de cualidades ("165 tests automatizados", no "apasionado por la calidad"). El humor existe pero vive en los márgenes: los easter eggs (One Piece / Star Wars / Zelda) son opt-in y discretos, nunca en el copy principal de "quiero este trabajo".

Emoción objetivo en el reclutador: confianza tranquila. Un reclutador debe poder enseñar esta web a su jefe sin dudar. Cuando "futurista/divertido" y "profesional" chocan, gana profesional.

Honestidad como rasgo de marca, no como detalle: el caso PokedexIA (ver Capabilities and Constraints) es el ejemplo vivo — presentarla como "IA" sería exactamente el portfolio inflado que este proyecto rechaza.

**Anti-referencias** (lo que esto NO debe parecer):

- **El portfolio junior genérico**: plantilla de tema oscuro con gradiente morado, "Hi, I'm X 👋", barras de nivel de skills inventadas, timeline de estudios, parrilla de tarjetas idénticas.
- **El portfolio inflado**: copy que insinúa capacidades que el código no tiene.
- **La plantilla de SaaS**: hero-metric template, eyebrows en versalitas sobre cada sección, iconos redondeados sobre cada encabezado.
- **La galería de código**: capturas y snippets como contenido principal, sin explicar qué problema resuelven.
- **Efectismo por encima de la carga**: animaciones de página completa y efectos vistosos que retrasan el primer paint.

## Evidence on Hand

Tres proyectos principales, todos con contenido real en `src/content/proyectos/`:

- **CourtManager** (`tennis-tournament.ts`) — repo público (`github.com/davidsored/TennisTournament`), **demo en vivo** (`tennistournament-98ar.onrender.com`), captura de portada en `public/projects/tennis-tournament/`. 165 tests automatizados, CI/CD en GitHub Actions, Docker. Es la prueba máxima del Positioning.
- **PokedexIA** (`pokedexia.ts`) — repo público (`github.com/davidsored/PokedexIA`), **demo en vivo** (`pokedex-ia-beta.vercel.app`), captura de portada en `public/projects/pokedexia/`.
- **Coworking Manager** (`coworking-manager.ts`) — repo público (`github.com/davidsored/ProyectoWebCoworking`), captura de portada en `public/projects/coworking-manager/`. **Sin demo desplegada** (`estadoDemo: "Demo en preparación"`, confirmado vigente 2026-07-26): el hosting quedó pausado, no hay URL que inventar ni mostrar.

CV descargable en `public/cv/david-suarez-otero-cv.pdf`, enlazado desde `perfil.cvUrl`. Perfil de GitHub (`github.com/davidsored`) y LinkedIn (`linkedin.com/in/david-suarez-otero-redondo`) como prueba social verificable.

**Ausencia que el trabajo futuro no debe rellenar inventando**: ningún testimonio, cliente, caso de estudio de terceros, ni cifra de uso en producción más allá de lo ya documentado en el contenido de cada proyecto.

## Product Principles

1. **Hechos antes que adjetivos.** Cada afirmación se apoya en algo verificable y enlazable (repo, tests, despliegue, CI). Si no se puede comprobar, no se dice.
2. **Premium por espaciado y consistencia, no por efectos.** La sensación de producto viene del ritmo tipográfico y del espaciado generoso; los efectos son la última capa, no la primera.
3. **Futurista con disciplina.** Un acento casi neón (cian eléctrico) usado en bordes, glow sutil y estados de foco/hover, nunca como fondo dominante.
4. **La diversión vive en los márgenes.** Los easter eggs son opt-in, de carga perezosa y coste cero si no se activan; nunca se encuentran por accidente en el primer vistazo, y ninguno interrumpe la lectura profesional.
5. **Profesional gana siempre el desempate.** Ante cualquier conflicto entre personalidad y credibilidad, gana la credibilidad ante un reclutador.
6. **El contenido es la fuente de verdad.** Los textos públicos viven en `src/content/`; escribir texto directamente en un componente es un bug de arquitectura, no un atajo.

## Accessibility & Inclusion

- **WCAG 2.1 AA como regla dura**, no como fase posterior. Todo par texto/fondo cumple 4.5:1 como mínimo; el color de acento nunca se usa para párrafos largos, solo para énfasis, iconos, bordes y estados.
- **Modo claro y oscuro son ciudadanos de primera**, ambos definidos desde el día 1 y verificados juntos. Dark-first en el diseño, pero el claro es una adaptación cuidada, no un negativo automático.
- **`prefers-reduced-motion: reduce` es obligatorio** en toda animación: se desactivan transformaciones y queda solo opacidad instantánea.
- **Teclado y foco visible**: cualquier elemento interactivo lleva su `aria-label`/rol correcto en el mismo commit en que se crea.
- **Audio nunca automático**: el easter egg de Zelda requiere interacción explícita.
- **Responsive mobile-first**, revisado como mínimo en 375 px y 1280 px.
