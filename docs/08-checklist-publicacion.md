# Checklist final antes de publicar

No se publica hasta que todo lo marcado como **bloqueante** esté en verde. Lo marcado como *recomendado* se resuelve si el tiempo lo permite, pero no bloquea el lanzamiento.

## Contenido

- [ ] **(Bloqueante)** Los 3 proyectos principales tienen ficha completa (problema, solución, stack, arquitectura, decisiones técnicas, enlaces).
- [ ] **(Bloqueante)** Ningún texto afirma capacidades que el código no tiene (revisar en particular la ficha de PokedexIA — no debe insinuar IA).
- [ ] **(Bloqueante)** CV en PDF descargable y actualizado con la misma información que el portfolio.
- [ ] Enlaces a GitHub y LinkedIn correctos y abren en pestaña nueva.
- [ ] *(Recomendado)* Proyectos secundarios (TaskPlanner, OnePieceAPI) con ficha reducida.

## Diseño y UX

- [ ] **(Bloqueante)** Modo claro y modo oscuro revisados en las 6 páginas principales, sin contraste roto.
- [ ] **(Bloqueante)** Responsive verificado en móvil (375px), tablet (768px) y desktop (1280px+).
- [ ] **(Bloqueante)** Ningún easter egg se activa sin acción explícita del usuario.
- [ ] *(Recomendado)* Transiciones y microinteracciones probadas con `prefers-reduced-motion` activado (deben desaparecer o simplificarse, no romper el layout).

## Accesibilidad

- [ ] **(Bloqueante)** Navegación completa por teclado (Tab/Enter/Esc) en menú, formulario y toggle de tema.
- [ ] **(Bloqueante)** Contraste de texto ≥ AA (4.5:1) en ambos temas.
- [ ] **(Bloqueante)** Imágenes con `alt` descriptivo; iconos decorativos con `aria-hidden`.
- [ ] *(Recomendado)* Probado al menos una vez con lector de pantalla (NVDA/VoiceOver) en el flujo Home → ficha de proyecto.

## SEO y metadatos

- [ ] **(Bloqueante)** `title` y `description` únicos por página.
- [ ] **(Bloqueante)** `sitemap.xml` y `robots.txt` generados y accesibles.
- [ ] **(Bloqueante)** Imagen Open Graph propia (no la genérica de Next.js) en cada página compartible.
- [ ] *(Recomendado)* JSON-LD `Person` en la home.

## Rendimiento

- [ ] **(Bloqueante)** Lighthouse (modo incógnito, producción) ≥ 90 en Performance, ≥ 95 en Accessibility y SEO.
- [ ] **(Bloqueante)** Imágenes de proyectos servidas vía `next/image` (AVIF/WebP, lazy loading).
- [ ] *(Recomendado)* Fuentes con `next/font`, sin FOUC apreciable.

## Calidad de código y tests

- [ ] **(Bloqueante)** `npm run lint` y `npm run typecheck` en verde.
- [ ] **(Bloqueante)** Tests unitarios/componentes en verde (lógica de tema, formulario, helpers de contenido).
- [ ] *(Recomendado)* Al menos 1 test E2E de Playwright cubriendo Home → ficha de proyecto.
- [ ] **(Bloqueante)** CI de GitHub Actions en verde en el último commit antes de publicar.

## Seguridad

- [ ] **(Bloqueante)** Ninguna API key en el código cliente (verificar bundle final, no solo el código fuente).
- [ ] **(Bloqueante)** Formulario de contacto valida y sanea input en el servidor (Server Action), no solo en el cliente.
- [ ] *(Recomendado)* Rate limiting básico en el envío del formulario para evitar spam/abuso.

## GitHub

- [ ] **(Bloqueante)** README actualizado en los 3 repos principales según [07-mejoras-github.md](./07-mejoras-github.md).
- [ ] *(Recomendado)* Perfil de GitHub con bio, README de perfil y 3 repos fijados.
- [ ] *(Recomendado)* Licencia añadida en los repos que no la tenían.

## Despliegue

- [ ] **(Bloqueante)** Build de producción (`next build`) sin errores ni warnings de tipo críticos.
- [ ] **(Bloqueante)** Variables de entorno de producción configuradas en Vercel (clave de Resend, etc.), nunca en el repo.
- [ ] *(Recomendado)* Dominio propio configurado (si se adquiere) o subdominio `.vercel.app` verificado y estable.

## Después de publicar (no bloquea el lanzamiento, pero está agendado)

- [ ] Revisión conjunta de coherencia entre portfolio y LinkedIn (descripción, keywords, enlaces cruzados).
- [ ] Resolver despliegue pendiente de `ProyectoWebCoworking` y actualizar su ficha con el enlace real.
- [ ] Sesión dedicada para decidir la función de IA real de `PokedexIA`.
