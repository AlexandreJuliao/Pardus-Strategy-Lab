# Graph Report - .  (2026-07-17)

## Corpus Check
- 135 files · ~209,550 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 291 nodes · 412 edges · 25 communities (17 shown, 8 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- page
- layout
- dependencies
- compilerOptions
- page
- devDependencies
- page
- CTAFinal
- Hero
- ContactForm
- Button
- Numbers
- Marquee
- Badge
- CodeTerminal
- useTextScramble
- EmberField
- WordmarkStrip
- Community 18
- next
- postcss
- tailwind
- EASE_PREMIUM

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 15 edges
2. `AuroraGlow()` - 13 edges
3. `SectionHeader()` - 12 edges
4. `CtaButton()` - 7 edges
5. `fadeUp` - 7 edges
6. `staggerContainer` - 7 edges
7. `LeopardMorph()` - 6 edges
8. `SERVICES` - 6 edges
9. `LEGAL` - 5 edges
10. `scrollToId()` - 5 edges

## Surprising Connections (you probably didn't know these)
- `generateMetadata()` --calls--> `getService()`  [EXTRACTED]
  app/servicos/[slug]/page.tsx → lib/services.ts
- `Navbar()` --calls--> `scrollToId()`  [EXTRACTED]
  components/layout/Navbar.tsx → lib/scrollTo.ts
- `ServicePage()` --calls--> `getService()`  [EXTRACTED]
  app/servicos/[slug]/page.tsx → lib/services.ts
- `ServicePage()` --references--> `SERVICES`  [EXTRACTED]
  app/servicos/[slug]/page.tsx → lib/services.ts
- `SmoothScroll()` --references--> `lenis`  [EXTRACTED]
  components/layout/SmoothScroll.tsx → package.json

## Import Cycles
- None detected.

## Communities (25 total, 8 thin omitted)

### Community 0 - "page"
Cohesion: 0.07
Nodes (27): Capabilities(), ROWS, QA, Errors, FormState, STEPS, GOLD_WORDS, Manifesto() (+19 more)

### Community 1 - "layout"
Cohesion: 0.07
Nodes (21): bricolage, cormorant, jetbrainsMono, metadata, spaceGrotesk, FlowField(), P, Tone (+13 more)

### Community 2 - "dependencies"
Cohesion: 0.08
Nodes (25): framer-motion, gsap, @gsap/react, lucide-react, next, dependencies, framer-motion, gsap (+17 more)

### Community 3 - "compilerOptions"
Cohesion: 0.08
Nodes (25): dom, dom.iterable, esnext, next-env.d.ts, .next/types/**/*.ts, node_modules, **/*.ts, **/*.tsx (+17 more)

### Community 4 - "page"
Cohesion: 0.19
Nodes (11): generateMetadata(), ServicePage(), ServiceDetail(), EASE, PRESETS, Reveal(), getService(), ICONS (+3 more)

### Community 5 - "devDependencies"
Cohesion: 0.11
Nodes (19): autoprefixer, eslint, eslint-config-next, devDependencies, autoprefixer, eslint, eslint-config-next, postcss (+11 more)

### Community 6 - "page"
Cohesion: 0.18
Nodes (9): metadata, sections, metadata, sections, metadata, sections, LegalSection, LEGAL (+1 more)

### Community 7 - "CTAFinal"
Cohesion: 0.14
Nodes (8): metadata, metadata, CTAFinal(), EASE, FILTERS, Project, PROJECTS, ServicesList()

### Community 8 - "Hero"
Cohesion: 0.26
Nodes (8): clamp(), framePath(), LeopardMorph(), lerp(), Particle, smooth(), BEATS, EASE

### Community 9 - "ContactForm"
Cohesion: 0.20
Nodes (5): metadata, BUDGETS, Errors, FormState, TIPOS

### Community 10 - "Button"
Cohesion: 0.24
Nodes (9): BaseProps, Button, ButtonAsButton, ButtonAsLink, ButtonProps, Size, sizes, Variant (+1 more)

### Community 11 - "Numbers"
Cohesion: 0.40
Nodes (4): Counter(), easeOut(), Stat, STATS

### Community 12 - "Marquee"
Cohesion: 0.40
Nodes (3): Marquee(), ROW_1, ROW_2

### Community 14 - "CodeTerminal"
Cohesion: 0.67
Nodes (3): CodeTerminal(), LINES, TONE

### Community 15 - "useTextScramble"
Cohesion: 0.67
Nodes (3): Options, prefersReducedMotion(), useTextScramble()

## Knowledge Gaps
- **120 isolated node(s):** `extends`, `next/core-web-vitals`, `metadata`, `metadata`, `sections` (+115 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **8 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `dependencies` to `layout`?**
  _High betweenness centrality (0.218) - this node is a cross-community bridge._
- **Why does `lenis` connect `layout` to `dependencies`?**
  _High betweenness centrality (0.213) - this node is a cross-community bridge._
- **What connects `extends`, `next/core-web-vitals`, `metadata` to the rest of the system?**
  _120 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `page` be split into smaller, more focused modules?**
  _Cohesion score 0.07477288609364081 - nodes in this community are weakly interconnected._
- **Should `layout` be split into smaller, more focused modules?**
  _Cohesion score 0.07207207207207207 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.07692307692307693 - nodes in this community are weakly interconnected._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.07692307692307693 - nodes in this community are weakly interconnected._