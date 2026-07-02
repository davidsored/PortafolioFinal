# Estructura de carpetas

Convención: **Next.js App Router**, componentes agrupados por dominio (no por tipo), contenido separado de presentación.

```
PortafolioFinal/
├── AGENTS.md
├── docs/                          # Este set de documentos de planificación
│   └── templates/
│       └── README-template.md
├── public/
│   ├── cv/
│   │   └── david-suarez-otero-cv.pdf
│   ├── og/                        # Imágenes Open Graph por página
│   └── projects/                  # Capturas de los proyectos
│       ├── coworking-manager/
│       ├── tennis-tournament/
│       └── pokedexia/
├── src/
│   ├── app/
│   │   ├── layout.tsx             # Layout raíz: fuentes, ThemeProvider, header/footer
│   │   ├── page.tsx                # Home (Hero + resumen + CTA)
│   │   ├── globals.css             # Tokens de diseño (CSS variables)
│   │   ├── sobre-mi/
│   │   │   └── page.tsx
│   │   ├── proyectos/
│   │   │   ├── page.tsx            # Índice de proyectos (principales + secundarios)
│   │   │   └── [slug]/
│   │   │       └── page.tsx        # Ficha de proyecto (generateStaticParams desde /content)
│   │   ├── stack/
│   │   │   └── page.tsx
│   │   ├── contacto/
│   │   │   └── page.tsx
│   │   ├── sitemap.ts
│   │   └── robots.ts
│   ├── content/                    # "CMS" tipado — única fuente de verdad del texto
│   │   ├── proyectos/
│   │   │   ├── coworking-manager.ts
│   │   │   ├── tennis-tournament.ts
│   │   │   ├── pokedexia.ts
│   │   │   ├── task-planner.ts
│   │   │   └── onepiece-api.ts
│   │   ├── stack.ts
│   │   ├── perfil.ts               # Datos personales, bio, enlaces
│   │   └── types.ts                # Interfaces: Proyecto, StackItem, EnlacePerfil...
│   ├── components/
│   │   ├── ui/                     # Componentes genéricos reutilizables
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Badge.tsx
│   │   │   └── ThemeToggle.tsx
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   └── Footer.tsx
│   │   ├── proyectos/
│   │   │   ├── ProjectCard.tsx
│   │   │   ├── ProjectHero.tsx
│   │   │   └── TechBadgeList.tsx
│   │   ├── home/
│   │   │   ├── Hero.tsx
│   │   │   └── ValueProposition.tsx
│   │   └── easter-eggs/            # Componentes aislados, import perezoso
│   │       ├── OnePieceEgg.tsx
│   │       ├── StarWarsEgg.tsx
│   │       └── ZeldaEgg.tsx
│   ├── lib/
│   │   ├── theme.ts                 # Helpers de tema (get/set, sin flash)
│   │   ├── motion-variants.ts       # Variantes reutilizables de Motion
│   │   └── send-contact-email.ts    # Server Action (Resend)
│   └── tests/
│       ├── unit/
│       ├── components/
│       └── e2e/
├── .github/
│   └── workflows/
│       └── ci.yml                   # lint + typecheck + test en cada PR
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── vitest.config.ts
├── playwright.config.ts
└── package.json
```

## Reglas de organización

- **`content/` nunca importa de `components/`** — el contenido no sabe cómo se renderiza, solo qué dice. Dirección única de dependencia: `app/` → `components/` → `content/` + `lib/`.
- Un componente nuevo va en `ui/` solo si se usa en 2+ dominios; si es específico de proyectos o home, vive en su carpeta de dominio.
- Los easter eggs jamás se importan de forma estática en `layout.tsx` — siempre `dynamic(() => import(...), { ssr: false })` para que su coste sea cero si el visitante no los activa.
- Cada carpeta de proyecto en `content/proyectos/` exporta un objeto que cumple la interfaz `Proyecto` de `content/types.ts` — así un proyecto nuevo (o mover PokedexIA a secundario si algún día hace falta) es añadir un archivo, no tocar componentes.
