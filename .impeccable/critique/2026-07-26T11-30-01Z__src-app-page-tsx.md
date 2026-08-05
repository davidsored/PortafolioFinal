---
target: home page (src/app/page.tsx)
total_score: 23
p0_count: 1
p1_count: 3
timestamp: 2026-07-26T11-30-01Z
slug: src-app-page-tsx
---

Method: dual-agent (A: a460bc0e45aea1039 · B: af9a3e450e846b9b1). Assessment B was terminated by an API 529 after it confirmed mutable script injection; the deterministic detector was re-run in the parent and every load-bearing claim from Assessment A was independently re-verified against the live server and the source. Not a single-context run.

## Design Health Score

| #         | Heuristic                       | Score     | Key Issue                                                                                                                                                                                                                              |
| --------- | ------------------------------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1         | Visibility of System Status     | 2         | `/` is absent from `NAV_LINKS` (`Header.tsx:22-27`), so nothing says "you are here" on the home page; the logo carries no `aria-current` either.                                                                                       |
| 2         | Match System / Real World       | 3         | Recruiter-legible vocabulary ("165 tests automatizados", "CI/CD"), but "Descargar CV" does not download, and the subhead is a raw CV job-title string.                                                                                 |
| 3         | User Control and Freedom        | 2         | No skip link (verified absent from SSR HTML). "Descargar CV" navigates the tab away into the PDF viewer with no in-page way back.                                                                                                      |
| 4         | Consistency and Standards       | 3         | One `Button`, one `Card`, tokens defined in both themes. But `Button.tsx:8` is the only control with a focus style; six others fall back to the UA ring. Labels drift ("Ver proyectos"/"Proyectos", "Contactar"/"Contacto").           |
| 5         | Error Prevention                | 2         | The logo easter egg fires on a standard triple-click text-selection gesture (`Header.tsx:68-86`); the timer resets on every click, so it guards only _slow_ sequences — the opposite of what the comment at `Header.tsx:35-36` claims. |
| 6         | Recognition Rather Than Recall  | 2         | "165 tests en el proyecto más exigente" — which project? Zero project names, zero images, zero project links in the rendered home page.                                                                                                |
| 7         | Flexibility and Efficiency      | 2         | CV and GitHub are express lanes, but there is no one-click route to any actual project, and the email never appears on screen.                                                                                                         |
| 8         | Aesthetic and Minimalist Design | 3         | Zero decoration and zero slop, but 714 px of the first screen is an empty hero and the entire body is three 200 px text cards.                                                                                                         |
| 9         | Error Recovery                  | 2         | The one real failure mode recovers badly: with JS blocked, the value proposition stays invisible with no fallback.                                                                                                                     |
| 10        | Help and Documentation          | 2         | No PDF/size hint on the CV, no external-link cue, no indication what `/stack` contains.                                                                                                                                                |
| **Total** |                                 | **23/40** | **Acceptable — significant improvements needed**                                                                                                                                                                                       |

## Anti-Patterns Verdict

**Does this look AI-generated? No — and that is verified, not assumed.** But it fails in the opposite direction: it is disciplined into near-emptiness.

**LLM assessment.** Assessment A scanned every computed style in `body` against the full ban list and got zero violations: no gradient text, no side-stripe borders, no ghost cards, no `border-radius` over 16 px (`Card.tsx:9` → `--radius-lg: 16px`), no hero-metric template, no uppercase tracked eyebrows rendered, no numbered section markers, no decorative grid or stripe backgrounds, no sketchy SVG, no all-caps body copy, no text overflow at 375/640/1280. The single glassmorphism hit (`Header.tsx:89`, `bg-bg/80 backdrop-blur-sm`) is a functional sticky-header pattern, not decoration — a pass.

Two soft flags. The font pairing (`layout.tsx:12-25`) puts Space Grotesk against Inter — two grotesque sans faces, thin genre contrast — while JetBrains Mono downloads on this route and renders **zero glyphs**. And the banned eyebrow pattern exists in the kit but not on this page: `SectionHeading.tsx:17` is `text-accent font-mono text-sm tracking-wide uppercase`, three stacked bans, and it is the exact pattern `PRODUCT.md` lists as an anti-reference. Any future home-page section will reach for it.

Typography rules: no `clamp()` anywhere; sizes are fixed rem and top out at 4.5 rem, under the 6 rem cap. The 72 px H1 has `letter-spacing: normal` — above the −0.04em floor, but untuned at that size, with `line-height` at exactly 1.0. Three steps of the modular scale (`globals.css:45-53`) sit below the 1.25 ratio.

Motion: `EASE_OUT [0.16,1,0.3,1]` throughout, no bounce or elastic, and `prefers-reduced-motion` handled at **three** independent layers (`globals.css:116-125`, `fadeInUpReduced` in `motion-variants.ts:26-32`, and an early return in `HeroCtaGlow.tsx:17-19`). Genuinely strong.

**But the reveal rule fails, and I confirmed it against the wire.** `ScrollReveal.tsx:33` sets `initial="hidden"`, and the server response carries exactly **3 × `opacity:0`** and **3 × `translateY(12px)`** — the three ValueProposition cards, which are the page's only substantive content. `template.tsx` carries a careful comment explaining they deliberately avoided shipping `opacity: 0` from the server for LCP reasons; `ScrollReveal` reintroduces it for the page's actual payload.

**Deterministic scan.** `detect.mjs` over `src/app`, `src/components`, `src/app/globals.css`, and the whole `src` tree: **exit 0, zero findings** in every run. I validated the detector rather than trusting a clean result — a planted `.tsx` fixture with a side-stripe, a 40 px radius, gradient text and a ghost card was correctly flagged (exit 2), so the tool does parse TSX and the clean result is real. URL-mode scanning was unavailable (puppeteer not installed; not added, per the project's pnpm-only and minimal-dependency rules).

**Visual overlays.** No user-visible overlay is available. Assessment B confirmed mutable injection and started the overlay server, but was killed by an API 529 before reading console output; the parent then re-ran the detector via CLI instead. The stray `live-server.mjs` on port 8400 (PID 18392) was found and stopped. Screenshots also timed out repeatedly in this browser pane, so every visual claim in this report is a measured computed value rather than an eyeball.

## Overall Impression

The craft here is real and unusually disciplined for a junior portfolio — the ban list is clean, reduced-motion handling is better than most production sites, and the token system is honest in both themes. The problem is not taste. It is that **the home page argues for David without ever showing his work.** Three unnamed text cards claim "165 tests" and "aplicaciones completas" while naming no project, showing no image, and linking to no repo. The single biggest opportunity is to put one piece of verifiable, clickable evidence above the fold and let the craft frame it instead of standing in for it.

## What's Working

1. **The ban list is clean, and it was verified rather than assumed.** Zero hits across all fourteen banned patterns, with cards topping out at exactly 16 px radius. For a junior portfolio in 2026 this is rare, and it is the single thing most separating this page from the generic-template anti-reference in `PRODUCT.md`. Someone held the line deliberately.

2. **Reduced-motion discipline at three independent layers.** `globals.css:116-125` kills durations globally, `motion-variants.ts:26-32` supplies a transform-free variant, and `HeroCtaGlow.tsx:17-19` removes the animated element from the tree entirely rather than animating it to zero. Most sites manage one layer badly.

3. **`template.tsx` is real engineering judgment, correctly commented.** The module-scope `isInitialLoad` flag keeps `opacity: 0` out of the SSR HTML for the LCP element, and the comment explains why the fade is CSS instead of motion (88 KB of duplicated bundle across two Turbopack client graphs). This is the project's "hechos antes que adjetivos" ethic applied to its own code.

## Priority Issues

### [P0] The home page contains zero verifiable, clickable evidence

**What.** `page.tsx:32-34` composes Hero + ValueProposition + ClosingCta. Verified against the live server: zero `<img>` elements, zero project names in the HTML ("CourtManager" appears 0 times), and the only outbound links are `/proyectos`, the CV PDF, `/contacto` and `github.com/davidsored`. Not one of the three flagship projects is named, shown, or linked.

**Why it matters.** `PRODUCT.md` states Design Principle 1 as "cada afirmación se apoya en algo verificable y **enlazable**". The facts are present; nothing is linkable. `docs/01-plan-general.md` §1 demands the page answer "¿esta persona puede resolver problemas reales?" within 10 seconds of scroll, but the answer is deferred to a second page load — and priorities #1 (get interviews) and #2 (prove real ability) both depend on it.

**Fix.** Add one featured-project block between `ValueProposition` and `ClosingCta`: CourtManager by name, one line on what it does, three concrete badges (165 tests · CI/CD · Docker), a direct repo link and a live-demo link. Reuse the existing `ProjectCard`/`Badge` primitives and add a `destacado: true` flag to the `Proyecto` interface in `content/types.ts`, so adding it touches no component — per the architecture rule in `AGENTS.md`. A screenshot of the live scoreboard also fixes the zero-imagery problem.

**Suggested command**: `$impeccable craft featured-project-block`

### [P1] The only substantive content ships `opacity: 0` from the server

**What.** `ScrollReveal.tsx:33` sets `initial="hidden"` and `motion-variants.ts:17` defines `hidden: { opacity: 0, y: 12 }`. Confirmed in the raw server response: three elements carry `opacity:0` and `translateY(12px)`, and they are the three ValueProposition cards.

**Why it matters.** The value proposition is the page's entire argument. With JS blocked — corporate proxies, aggressive extensions, a hydration error, a non-JS renderer — a recruiter sees a headline, a grey paragraph and two buttons, and nothing that says "165 tests". `prefers-reduced-motion` does not rescue this: `fadeInUpReduced` still starts at `opacity: 0` and still waits for the IntersectionObserver.

**Fix.** Invert the default so content renders visible and animation is the enhancement — `whileInView` with `initial={false}` plus a mount-gated class, or drop `ScrollReveal` from `ValueProposition.tsx:26` entirely. Three text cards 80 px below the fold gain nothing from a reveal that risks the page's core message.

**Suggested command**: `$impeccable animate value-proposition`

### [P1] The hero consumes the entire first screen, and collapses at 200% zoom

**What.** Measured. Desktop 1280×720: the hero wrapper is **714 px** tall (`Hero.tsx:7`, `py-24 sm:py-32`), the H1 is 72 px with `line-height: 72px` (exactly 1.0) across **4 lines** = 288 px, and the CTAs sit at y=607. Mobile 375×812: the H1 is 56 px over **5 lines** = 311 px, the subhead adds 156 px more, and the CTAs land at **y=691** — visible on an 812 px phone, but entirely below the fold on a 667 px iPhone SE. At 200% zoom the H1 alone fills more than the viewport and the first screen contains one truncated headline.

**Why it matters.** This is the 10-second window, in the two most common recruiter contexts: a phone in hand, and a laptop at 200% because the reader is 45.

**Fix.** In `Hero.tsx:7-8` replace `py-24 sm:py-32` with `py-16 sm:py-28` and `text-4xl sm:text-5xl` with a fluid `clamp(2.25rem, 6vw, 4.5rem)` token — `docs/05-sistema-diseno.md` §3 has no fluid step, so add one. While there, pair explicit line-heights to `--text-4xl`/`--text-5xl` in `globals.css:52-53` (currently 1.0 at 72 px and 1.11 at 56 px, both untuned and mutually inconsistent) and add `tracking-[-0.02em]` to the display sizes.

**Suggested command**: `$impeccable layout hero`

### [P1] The hero subhead is a raw CV job-title string used as marketing copy

**What.** `Hero.tsx:11` renders `{perfil.titulo}` verbatim from `perfil.ts:5-6`: 132 characters, one clause, no verb of consequence, ending in "Blazor WebAssembly". Measured at 156 px tall on mobile. The same string is also the `jobTitle` in the JSON-LD (`page.tsx:19`) — one token doing two incompatible jobs.

**Why it matters.** It occupies the exact pixel the recruiter reads second, and `PRODUCT.md` explicitly forbids this voice ("directo y concreto, en primera persona, sin inflar"). "Especializado en la creación de aplicaciones web de alto rendimiento" is an adjective claim with nothing behind it — precisely what this project rejects. It also contradicts the page's own third card, which sells Python/Docker/IA while the subhead sells C#/Blazor.

**Fix.** Split the token: keep `perfil.titulo` for structured data, add `perfil.subtituloHero` — one line, under 90 characters, naming the pivot and one fact. Route the wording through `content-writer`; per `AGENTS.md` this copy is David's and is not to be freely rewritten.

**Suggested command**: `$impeccable clarify hero-subhead`

### [P2] The secondary CTA neither looks like a control nor does what it says

**What.** Two defects on one element. (a) `Button.tsx:13` gives the `ghost` variant `border-border` as its only affordance, measured at **1.27:1** against the page in dark and **1.24:1** in light; WCAG 1.4.11 requires 3:1 for a control's visual boundary. (b) `Button.tsx:37-48` routes `.pdf` to a plain `<a>` with **no `download` and no `target`** — verified live: `download: null, target: null`. The label says "Descargar" but it navigates the tab away into the browser's PDF viewer, off the portfolio, with no in-page way back.

**Why it matters.** The CV is one of the two conversion actions named in `PRODUCT.md`. A recruiter either cannot see the control or gets ejected from the site by it.

**Fix.** Add a `--color-border-strong` token that clears 3:1 in both themes (dark ≈ `#4a4a5c`, light ≈ `#a8a8b4`) rather than darkening `--color-border` globally, since the same token draws card edges. Then add `download` plus `target="_blank" rel="noopener"` for static files in `Button.tsx:39-48`, and append a format hint to the label ("Descargar CV (PDF)").

**Suggested command**: `$impeccable polish button`

## Persona Red Flags

**Jordan (First-Timer)** — wants to know what this person builds. Reads the H1, hits the 132-character `perfil.titulo` (`Hero.tsx:11`) and stops parsing. Nothing else tells him what David built: no project name, no screenshot, no repo. Nothing in the header is highlighted, because `/` is not in `NAV_LINKS` (`Header.tsx:22-27`) and the logo has no `aria-current` — no "you are here". In light mode he sees one obvious filled button and one rectangle at 1.24:1 he may not read as clickable; if he clicks it, he is navigated out of the site with no `download` attribute and only browser Back to recover. "Ver proyectos" vs the nav's "Proyectos", and "Contactar" vs "Contacto", sit three feet apart.

**Sam (Accessibility-Dependent)** — **contrast is fine**: every text pair clears 4.5:1 in both themes, most by 3–4×, and the accessibility tree exposes all three value cards despite `opacity: 0`. Heading order is clean (h1 → h2 → h3×3 → h2). But there is **no skip link** (verified absent from the SSR HTML), so Sam tabs through 7 header stops before reaching "Ver proyectos" on every page. There are **two focus languages**: `Button.tsx:8` declares an accent outline, while the logo (`Header.tsx:91`), desktop nav (`Header.tsx:104`), mobile nav (`Header.tsx:148`), `ThemeToggle.tsx:20`, the hamburger (`Header.tsx:128`) and both footer icon links (`Footer.tsx:16,25`) declare none and inherit the UA ring. `target="_blank"` on "Ver GitHub" and both footer icons is unannounced (WCAG 3.2.5). `pulseGlow` (`motion-variants.ts:43-50`) repeats infinitely with no in-page pause control; it respects the OS flag, but WCAG 2.2.2 asks for a mechanism regardless.

**Casey (Distracted Mobile)** — the two most-tapped controls both fail 44×44: the theme toggle (`ThemeToggle.tsx:21`) and the hamburger (`Header.tsx:128`) are both **36×36**, 8 px apart, in the top-right corner — the worst thumb-reach zone on an 812 px phone. Three more 20×20 targets sit in the footer (`Footer.tsx:23,32` plus the One Piece egg). The real CTAs are the good news: "Ver proyectos" and "Descargar CV" measure 44 px tall and are centered — correct thumb placement — but they sit at **y=691**, behind 311 px of headline and 156 px of grey job title. And **triple-tapping the name to select it fires the Zelda egg**: `Header.tsx:77-81` counts three clicks and the timer restarts on each one, so a native triple-tap reaches the threshold. That breaks `docs/05-sistema-diseno.md` §7's own rule that nobody should find an egg by accident.

## Minor Observations

- **Ragged card bottoms.** Cards measure 220/200/200 px from a shared top; `Card.tsx:9` has no `h-full`, so a three-up identical-format grid has an uneven bottom edge. One class.
- **`transition-shadow` on `Card.tsx:9` is dead code** — no shadow is ever applied. Related: `docs/05-sistema-diseno.md` §5 promises "elevación sutil + glow de borde" on card hover, and these cards have **no hover state at all**, on a page whose entire body is three cards.
- **Sections butt together with no separation** (measured gap of 0 between hero→cards and cards→closing), and the hero gets 128 px of padding while the substantive section gets 64 px. "Premium por espaciado" is being spent on the emptiest block.
- **`ValueProposition.tsx:25` makes the section heading `sr-only`**, so sighted users get three unlabelled cards with no section boundary.
- **Container widths bulge**: hero 768 px → value 1024 px → closing 768 px, inside a 1024 px header. The widest band is the one section that is not centered prose.
- **Three woff2 files load on `/` and one renders nothing** — JetBrains Mono has zero glyphs on this route.
- **The email never appears on screen**, though `perfil.ts:7` and the JSON-LD both carry it. A hurried recruiter who just wants to write must load `/contacto`.
- **No `<section>` landmarks** — the page exposes only `header`/`nav`/`main`/`footer`.
- **Console is clean** — no errors or warnings beyond React DevTools and HMR notices.
- **Documented contrast figure is slightly optimistic**: `docs/05-sistema-diseno.md:34` claims accent `#0e7490` = 5.475:1 on `#fafafa`; measured **5.13:1**. Still comfortably AA, but worth correcting so the number stays trustworthy.
- **One Assessment A claim corrected.** A reported that Casey could hit the One Piece egg while aiming for LinkedIn. Measured, they are not adjacent: on desktop the egg sits in the left flex group beside the copyright and the social icons in the right group (opposite ends of `justify-between`), and on mobile they land on separate rows 36 px apart (y=2027 vs y=2063). The 20×20 targets are still too small; the misfire risk is not real.

## Questions to Consider

1. `docs/01-plan-general.md` §1 says the page must answer "¿puede resolver problemas reales?" in under 10 seconds of scroll. It currently answers "trust me, and click through." What if the home page **were** the CourtManager case study — headline, one screenshot, 165 tests / CI / Docker as linked facts, then "y dos más" — and `/proyectos` became the overflow rather than the destination?
2. "Profesional gana cualquier desempate" has been read as _remove_, three times running. Is there any tie left to break? What is the one thing on this page a competing candidate could not have written in ten minutes?
3. The copy withholds every referent on purpose — "el proyecto más exigente", "reservas, torneos en directo". If it is proud enough to cite 165, why is it not proud enough to say CourtManager?
4. There is no personal photo by decision, and now no imagery of any kind. Those are two different decisions. Which one was actually made — and would a screenshot of a UI David built violate either?
5. The three easter eggs cost real code and produce, on this page, one 20×20 unlabelled footer target and an accidental-trigger bug on the logo. Is the discreet-personality priority being served, or just implemented?
6. `ScrollReveal` risks the page's core message to add 400 ms of fade to content 80 px below the fold. What is that animation for?
