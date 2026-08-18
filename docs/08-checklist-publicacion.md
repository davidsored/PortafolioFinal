# Checklist final antes de publicar

No se publica hasta que todo lo marcado como **bloqueante** esté en verde. Lo marcado como _recomendado_ se resuelve si el tiempo lo permite, pero no bloquea el lanzamiento.

> **Estado (15-07-2026): todos los bloqueantes en verde.** Verificación final realizada sobre producción ([portafolio-final-eosin.vercel.app](https://portafolio-final-eosin.vercel.app)). Los recomendados no resueltos quedan anotados abajo como pendientes aceptados.

## Contenido

- [x] **(Bloqueante)** Los 3 proyectos principales tienen ficha completa (problema, solución, stack, arquitectura, decisiones técnicas, enlaces). ✓ Fichas de Coworking Manager, CourtManager y PokedexIA completas desde la Fase 2, con los textos revisados de [06-estrategia-contenido.md](./06-estrategia-contenido.md).
- [x] **(Bloqueante)** Ningún texto afirma capacidades que el código no tiene (revisar en particular la ficha de PokedexIA — no debe insinuar IA). ✓ Revisado: la ficha de PokedexIA no afirma capacidades de IA inexistentes; la única mención a IA es la nota de transparencia aprobada del campo de aprendizajes, que explica que la IA del nombre todavía no está implementada y queda pendiente de diseño.
- [x] **(Bloqueante)** CV en PDF descargable y actualizado con la misma información que el portfolio. ✓ `public/cv/david-suarez-otero-cv.pdf`, descargable desde `/contacto`.
- [x] Enlaces a GitHub y LinkedIn correctos y abren en pestaña nueva. ✓ Verificado en `src/components/layout/Footer.tsx` (`target="_blank"`).
- [x] _(Recomendado)_ Proyectos secundarios (TaskPlanner, OnePieceAPI) con ficha reducida. ✓ En `src/content/proyectos/` desde la Fase 2.

## Diseño y UX

- [x] **(Bloqueante)** Modo claro y modo oscuro revisados en las 6 páginas principales, sin contraste roto. ✓ Verificado de forma continua en las Fases 3–5.
- [x] **(Bloqueante)** Responsive verificado en móvil (375px), tablet (768px) y desktop (1280px+). ✓ Verificado en las Fases 3–5.
- [x] **(Bloqueante)** Ningún easter egg se activa sin acción explícita del usuario. ✓ Los 3 son opt-in (click en footer, ↑↑↓↓, triple-click en logo); confirmado en la auditoría de accesibilidad de la Fase 5.
- [x] _(Recomendado)_ Transiciones y microinteracciones probadas con `prefers-reduced-motion` activado (deben desaparecer o simplificarse, no romper el layout). ✓ Verificado en la Fase 3 (sin transform, no solo duración reducida).

## Accesibilidad

- [x] **(Bloqueante)** Navegación completa por teclado (Tab/Enter/Esc) en menú, formulario y toggle de tema. ✓ Verificado en la auditoría de accesibilidad de la Fase 5.
- [x] **(Bloqueante)** Contraste de texto ≥ AA (4.5:1) en ambos temas. ✓ En verde tras el fix `7f29f1e` (success/warning y egg de Star Wars en tema claro).
- [x] **(Bloqueante)** Imágenes con `alt` descriptivo; iconos decorativos con `aria-hidden`. ✓ Verificado en la auditoría de accesibilidad de la Fase 5.
- [ ] _(Recomendado)_ Probado al menos una vez con lector de pantalla (NVDA/VoiceOver) en el flujo Home → ficha de proyecto. ✗ No probado — **pendiente aceptado**, no bloquea el lanzamiento (Accessibility 100 en Lighthouse, pero la prueba manual con lector de pantalla sigue agendada).

## SEO y metadatos

- [x] **(Bloqueante)** `title` y `description` únicos por página. ✓
- [x] **(Bloqueante)** `sitemap.xml` y `robots.txt` generados y accesibles. ✓ Nota: apuntan a `www.dsor.es`; cuadrarán al conectar el dominio (ver § Despliegue).
- [x] **(Bloqueante)** Imagen Open Graph propia (no la genérica de Next.js) en cada página compartible. ✓ `opengraph-image.tsx` vía `next/og` (Fase 3).
- [x] _(Recomendado)_ JSON-LD `Person` en la home. ✓ Verificado en `src/app/page.tsx`.

## Rendimiento

- [x] **(Bloqueante)** Lighthouse (modo incógnito, producción) ≥ 90 en Performance, ≥ 95 en Accessibility y SEO. ✓ Ejecutado el 14-07-2026 sobre producción: Performance Home 91 / ficha de proyecto 95 / Contacto 92,5 (medianas de varias pasadas); **100 en Accessibility y SEO en todas las pasadas**. La única varianza residual entre pasadas es el `elementRenderDelay` del LCP de la Home — mejora futura opcional, no bloqueante.
- [x] **(Bloqueante)** Imágenes de proyectos servidas vía `next/image` (AVIF/WebP, lazy loading). ✓
- [x] _(Recomendado)_ Fuentes con `next/font`, sin FOUC apreciable. ✓

## Calidad de código y tests

- [x] **(Bloqueante)** `pnpm lint` y `pnpm typecheck` en verde. ✓
- [x] **(Bloqueante)** Tests unitarios/componentes en verde (lógica de tema, formulario, helpers de contenido). ✓ 22 tests en verde.
- [x] _(Recomendado)_ Al menos 1 test E2E de Playwright cubriendo Home → ficha de proyecto. ✓ E2E de Home → ficha y envío de contacto en verde.
- [x] **(Bloqueante)** CI de GitHub Actions en verde en el último commit antes de publicar. ✓

## Seguridad

- [x] **(Bloqueante)** Ninguna API key en el código cliente (verificar bundle final, no solo el código fuente). ✓ Verificado sobre `.next/static` (bundle final).
- [x] **(Bloqueante)** Formulario de contacto valida y sanea input en el servidor (Server Action), no solo en el cliente. ✓
- [x] _(Recomendado)_ Rate limiting básico en el envío del formulario para evitar spam/abuso. ✓ Implementado en memoria por IP en `sendContactEmail` (máx. 3 envíos / 10 min, best-effort en serverless); `pnpm lint && pnpm typecheck` en verde.

## GitHub

- [x] **(Bloqueante)** README actualizado en los 3 repos principales según [07-mejoras-github.md](./07-mejoras-github.md). ✓ Fase 4, re-auditado con `gh` CLI.
- [x] _(Recomendado)_ Perfil de GitHub con bio, README de perfil y 3 repos fijados. ✓ Bio + README de perfil + pins completados.
- [x] _(Recomendado)_ Licencia añadida en los repos que no la tenían. ✓

## Despliegue

- [x] **(Bloqueante)** Build de producción (`next build`) sin errores ni warnings de tipo críticos. ✓
- [x] **(Bloqueante)** Variables de entorno de producción configuradas en Vercel (clave de Resend, etc.), nunca en el repo. ✓ `RESEND_API_KEY` en Vercel; formulario verificado end-to-end en producción el 15-07-2026.
- [x] _(Recomendado)_ Dominio propio configurado (si se adquiere) o subdominio `.vercel.app` verificado y estable. ✓ Verificado el 12-08-2026: `https://www.dsor.es` responde y sirve el portfolio (redirige a `https://dsor.es`, contenido de la home cargado correctamente). Dominio propio conectado en Vercel; ya no depende del subdominio `.vercel.app`. Metadatos/sitemap ya apuntaban a `www.dsor.es`, ahora cuadran con el dominio real en producción.

## Después de publicar (no bloquea el lanzamiento, pero está agendado)

- [x] Revisión conjunta de coherencia entre portfolio y LinkedIn (descripción, keywords, enlaces cruzados). ✓ Revisado el 12-08-2026 sobre capturas del perfil (`linkedin.com/in/david-suarez-otero-redondo`). Hallazgos:
  - Titular ("Desarrollador Web Junior | C# y ASP.NET | JavaScript | SQL | HTML/CSS") coherente con el stack del portfolio, aunque no menciona Blazor WebAssembly (sí presente en el hero del portfolio) — **pendiente aceptado**, no bloquea nada, valorar añadirlo al titular.
  - No se observa en las capturas ningún enlace visible al portfolio (`www.dsor.es`) en el perfil (ni en "Información de contacto" ni en una sección "Destacado"/Featured) — **recomendado añadir** para cerrar el enlace cruzado LinkedIn → portfolio.
  - El perfil incluye aptitudes y un Máster en Desarrollo con IA (BIG school) con menciones activas a IA/Prompt Engineering y herramientas como Claude Code/Copilot/Gemini/ChatGPT. Esto es coherente con David como desarrollador (aprendizaje activo de IA), pero **David debe confirmar** que no contradice la narrativa del portfolio, en particular la nota de transparencia de PokedexIA (que aclara que ese proyecto concreto no tiene IA real todavía) — no se detecta contradicción directa, solo un matiz a vigilar si se amplía la sección "Acerca de" de LinkedIn.
- [ ] Resolver despliegue pendiente de `ProyectoWebCoworking` y actualizar su ficha con el enlace real — pendiente de la decisión de hosting de David (comparativa entregada en la Fase 4).
- [ ] Sesión dedicada para decidir la función de IA real de `PokedexIA`.
