# Pardus — Design System (posts de redes sociais)

Fonte de verdade extraída do site (pardus-lab.com) e da board Figma "Pardus." → página **📱 Posts v6**.
Formato default: **1080×1350** (4:5). Margem lateral: **88px**. Grelha de slides: x = 0 / 1180 / 2360 / 3540; filas y de 1500 em 1500.

## Paleta
| Papel | Hex | Uso |
|---|---|---|
| Fundo | `#05070e` | fundo de todos os slides escuros (igual ao site) |
| Dourado (único acento) | `#d4af60` | kicker, palavra de destaque, CTA, números, "arrasta →" |
| Creme | `#f4ecdb` | cards claros (quotes, glossário), radius 24 |
| Bronze | `#b4712a` | labels/atribuições dentro dos cards creme |
| Texto primário | `#eef2f9` | headlines |
| Texto secundário | `#9aa3b8` | corpo |
| Navy card | `#0a0e1a` | texto sobre creme/dourado; círculos de iniciais |
| Linhas | `#eae3d6` @ 12% | separadores de listas |

Proporção: fundo navy domina; dourado só em acentos (1 palavra por headline + CTA); creme como material dos cards.

## Tipografia — SÓ 2 fontes (regra fixada jul/2026)
| Papel | Fonte | Tamanhos típicos |
|---|---|---|
| Títulos / headlines | **Bricolage Grotesque SemiBold**, ls -2%, lh 100–102% | 56–104 |
| **Palavra de assinatura** (1 por headline) | **Didot Italic** — dourado. No Figma atual só existe `GFS Didot Regular` (não-itálico), por isso usa-se **Playfair Display Italic** como substituto Didone fiel. Trocar para Didot Italic real quando disponível (mesmo slot). | herda tamanho |
| Tudo o resto (corpo, kicker, CTA, "arrasta", números) | **Space Grotesk Regular** | 19–34 (kicker 22–24 ls 8%) |

**Banidas / migradas:** Inter, Archivo, Archivo Black, JetBrains Mono, Fraunces, Cutive Mono → tudo trocado em jul/2026.
**Exceção:** o **logótipo** usa a sua própria fonte (Cormorant, "PARDUS.") — é asset de marca, fora da regra das 2 fontes.

## Componentes recorrentes
- **CTA:** frame 560–660×96, radius 8, fundo `#d4af60`, texto navy. Invertido em fundos de cor (petrol/dourado): botão navy sólido + texto dourado.
- **Card creme:** radius 24, drop shadow `0 18–22 44–52 rgba(0,0,0,.35–.4)`; rotação ±0.6–1.2° em stacks de quotes.
- **Campo de cor + grão (contraste — a assinatura visual):** cada slide leva um campo de cor (glow elipse blur 300–330) + textura de **grão** por cima. Grão = imageHash `e516d0dcb2165791817195104606c94f3ab16e96`, scaleMode FILL scalingFactor 0.5, node **opacity 0.06, blendMode PASS_THROUGH** (valores do Julian). Cores dos campos variam por slide: dourado `#d4af60`, petrol `#2e5484`, azul-profundo `#14203a`. Slides invertidos de cor sólida (ex.: D2/4 dourado, D1/4 petrol) para ritmo.
- **"arrasta →"** Space Grotesk Regular 24 ls10% dourado, y≈1272.
- **Logótipo (asset real, NÃO escrever à mão):** clonar os vetores das versões na board — branco `23:56` (fundos escuros), preto `23:83` (fundos claros/dourados). `rescale(largura/1607)`, canto inf. direito. Podem surgir novas versões de cor, sempre com o mesmo design/tipo de letra (Cormorant).
- **Fotos:** cinematográficas, navy+dourado, kie.ai Seedream V5 Lite 3:4 high. Scrim gradient navy. Nunca repetir imagem. **Sem leopardo** nas fotos de conteúdo — imagens do que se vende (sites, lojas, dashboards, redes/automação). Hashes atuais: site `a2349eca…`, ecom `a9b3314c…`, dash `b6397b14…`, auto/rede `691e00de…`.
- **Leopardo** = ícone da marca, só na capa D1/1.

## Tom de copy
PT-PT, tratamento por "tu". Direto, específico, sem jargão ("IA sem palavrões"). Honestidade como diferencial ("se só procuras o mais barato, não somos nós"). CTA sempre: consultoria gratuita / manda mensagem. Sem emoji.

## Regra do acento (aplicada em toda a board, jul/2026)
Cada headline leva **exatamente 1 palavra/expressão em Didot Italic dourado** (Playfair Display Italic no Figma atual). Em slides de termo único (glossário: Chatbot/Automação/Agente) a própria palavra fica em itálico dourado. Em fundos de cor sólida (invertidos): sobre dourado o acento é navy itálico; sobre petrol é dourado itálico.

## Géneros de fundo (biblioteca — sempre dentro dos tons navy/petrol/dourado)
O contraste de cor é o que dá "outro ar" ao feed. Géneros disponíveis (grão sempre por cima; logo branco em fundo escuro/petrol, preto em dourado/mostarda):
1. **Navy base** `#05070e` — neutro. Só ~30% dos estáticos e interiores de carrossel calmos.
2. **Petrol gradiente** `#14203a→#2e5484` — texto claro, acento dourado. (D1/4, C1/4, C4/4)
3. **Dourado sólido** `#d4af60` — texto navy, acento navy itálico. (D2/4, C3/4)
4. **Ember** — navy + radial quente `#b4712a`/`#9c6f34` em baixo (+ petrol ténue no topo), texto claro. (E2)
5. **Petrol chapado + holofote** `#16283f` sólido + glow dourado forte atrás do herói, texto claro. (E4)
6. **Mostarda esbatida** `#9c6f34` sólido — texto navy, cards creme saltam, logo preto. (E5)
7. **(futuro) Two-tone petrol→dourado** diagonal — manter stops escuros p/ legibilidade.

**Regra dos estáticos:** ~**70%** dos posts estáticos usam um género de cor (2–6), ~30% navy base. Nunca dois géneros iguais seguidos no feed. Justificar sempre a cor pelo conteúdo. Texto: garantir contraste (claro sobre petrol/ember/navy; navy sobre dourado/mostarda).
Atuais invertidos/coloridos: D1/4, D2/4, C1/4, C3/4, C4/4, E2, E4, E5 (E3 foto).

## Cuidado: títulos duplicados
Alguns frames tinham 2 nós de título sobrepostos (Bricolage + Space Grotesk) — davam aspeto de "fonte mal colocada". Ao editar, verificar/remover duplicados (findAll por y+chars iguais).

## Estrutura da board
- C1 sinais · C2 glossário · C3 sites que vendem · C4 história 23h · E2–E5 posts soltos (E1/E6/e7–e12 removidos)
- **D1 Quem somos · D2 Para quem somos · D3 O que vendemos** (destaques de perfil, jul/2026) — filas y=7500/9000/10500
- Todos com acento itálico, grão, glow de cor e logótipo real (vetor) — pass jul/2026.
