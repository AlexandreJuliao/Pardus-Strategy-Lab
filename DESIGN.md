# DESIGN.md — Pardus (site + redes sociais, sistema unificado jul/2026)

Fonte de verdade partilhada com `brand/design-system.md` (posts) e os boards BG/1..6 no Figma.

## Theme
Dark editorial-premium: navy profundo dominante, dourado como único acento, secções invertidas de cor (dourado sólido / petrol) como assinatura de contraste, grão fotográfico por cima de tudo.

## Color
| Token | Valor | Papel |
|---|---|---|
| `--bg` | `#05070e` | fundo base (navy) |
| `--surface` / `-2` / `-3` | `#0a0e1a` / `#101524` / `#161d30` | elevações |
| `--gold` | `#d4af60` | único acento; secções invertidas douradas |
| `--gold-bright` / `--gold-deep` | `#f0d089` / `#9c6f34` | hover / mostarda |
| `--bronze` | `#b4712a` | labels sobre creme |
| `--blue` (petrol) | `#2e5484` | atmosfera + secções petrol; nunca 2º acento |
| `--blue-deep` | `#14203a` | petrol profundo (gradientes) |
| `--cream` | `#f4ecdb` | cards claros (equipa, pricing destacado, quotes) |
| `--text-primary` / `secondary` / `muted` | `#eef2f9` / `#9aa3b6` / `#5a6274` | texto |

Regras: navy domina; ~2–3 secções de cor invertida por página (dourada → texto navy; petrol → texto claro + acento dourado); nunca duas invertidas iguais adjacentes.

## Typography — só 2 famílias (+ wordmark)
- **Títulos:** Bricolage Grotesque **SemiBold**, tracking −2 a −3.5%, lh 0.93–1.05.
- **Acento de assinatura:** *Didot Italic* → na web **Playfair Display Italic 500** (`.accent-serif`), dourado (navy nas secções douradas). **Uma palavra/expressão por headline. Só uma.**
- **Todo o resto:** Space Grotesk Regular/Medium — corpo, kickers (`.mono-label`/`.mono-tiny`: uppercase, tracking 0.22–0.28em), UI, números.
- **Wordmark (exceção):** Cormorant SemiBold "PARDUS." — asset de marca (componente `Logo`).
- Banidas: Inter, Archivo, JetBrains Mono, Fraunces (migradas jul/2026).

## Materials & texture
- **Grão:** `.grain-fixed` global (SVG turbulence, opacity ~0.05, overlay). Secções de cor têm o grão visível — faz parte do look.
- **Glows:** elipses blur 280–340, dourado/petrol @ 10–22%, atrás do conteúdo (`AuroraGlow`).
- **Cards creme:** `#f4ecdb`, radius 8–24, sombra difusa, texto navy, labels bronze.
- Radius: 4–8px em UI; até 24px nos cards creme "de posts".
- Sombras largas e tintadas (`--shadow-card`), nunca neon.

## Components
- **CtaButton/Button:** primary = dourado c/ texto navy + sheen; `inverse` = navy sólido c/ texto dourado (para secções douradas).
- **StatementBand:** tone `gold` = secção dourada sólida invertida; tone `blue` = gradiente petrol c/ FlowField.
- **CTAFinal:** painel dourado invertido com wordmark.
- **SectionHeader:** hairline dourada + título; sem eyebrows repetidos.
- Motion: ease `cubic-bezier(0.16,1,0.3,1)`, scramble no hero, reveals por secção variados, reduced-motion sempre.

## Layout
Shell 1320px, `section-pad` fluido (72–160px), grelhas bento/assimétricas em vez de 3-cards iguais.
