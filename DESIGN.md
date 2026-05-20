# Design

*Seeded starter. Re-run `/impeccable document` once the codebase exists, to capture the real tokens against the implementation.*

## Visual style

Action-poster / cinematic. Photography does the heavy lifting; type is unapologetically big and condensed; comic red is rare and weight-bearing. The aesthetic reference points are documentary photojournalism (large, real, unfiltered images of these specific dogs), boxing / fight-poster typography (tall condensed sans, all-caps display, tight tracking), and minimal editorial layout (generous whitespace, asymmetric rhythm, no card-grid filler).

The scene sentence: "A visitor opens this on a phone after watching one of Shoshi's reels, somewhere they can be still for a minute, possibly emotional. The site has to feel as serious and as specific as the reel did, not lighter, not sweeter, not cuter."

Default theme is light. Specific surfaces (Donate hero, individual dog hero sections, About) shift to dark for dramatic effect. Dark is not the default just because the brand is "edgy"; the action-poster lane is more iconic with red on near-white than red on near-black.

## Color

OKLCH, never `#000`, never `#fff`. Neutrals tinted toward the brand red hue (~27°) with chroma 0.005-0.01 so the page never reads as clinical gray.

**Brand**
- `--brand-red`: `oklch(0.58 0.22 27)` — primary comic red, slightly warm. Use on CTAs, key accents, weight-bearing display moments. No more than ~10% of any surface.
- `--brand-red-deep`: `oklch(0.42 0.18 27)` — hover state, dense red on light, body-readable when paired with paper text.
- `--brand-red-tint`: `oklch(0.96 0.04 27)` — barely-there red wash for section backgrounds. Use sparingly.

**Ink (text / dark surfaces)**
- `--ink`: `oklch(0.18 0.02 27)` — primary text on paper, primary dark surface. Tinted toward red, not pure black.
- `--ink-soft`: `oklch(0.30 0.015 27)` — secondary text.

**Paper (light surfaces)**
- `--paper`: `oklch(0.985 0.005 27)` — primary light surface, page background. Not pure white.
- `--paper-warm`: `oklch(0.96 0.008 27)` — secondary surface, alternating sections.

**Neutrals**
- `--n-900`: `oklch(0.22 0.012 27)`
- `--n-700`: `oklch(0.42 0.008 27)` — secondary copy on paper
- `--n-500`: `oklch(0.62 0.006 27)` — borders, dividers, captions
- `--n-300`: `oklch(0.86 0.004 27)` — subtle dividers
- `--n-100`: `oklch(0.94 0.003 27)` — subtle background fill

**Semantic (rare)**
- `--ok`: `oklch(0.58 0.13 145)` — happy-endings success, sparingly
- `--warn`: `oklch(0.72 0.16 75)` — application warning callouts

**Strategy**: this is a "Restrained-leaning-Committed" palette. Light surfaces dominate. The comic red is used as a punch (CTAs, the word "underdog" set in display type, accent rules), and as the hero color on specific dark dramatic surfaces (Donate hero, About hero, individual dog-page hero blocks). Never as a wash across full sections; never as gradient text; never as a border-left stripe.

## Typography

Three faces, all free / Google Fonts (self-hostable in Next/Astro on Vercel):

**Display**: **Big Shoulders Display** — tall, condensed, dense. Use for headlines, hero phrases, section openers. Always tracked tight (`letter-spacing: -0.01em` to `-0.02em` at scale). Weights: 700 (Bold) and 900 (Black) only. Always paired with all-caps or sentence-case-with-impact.

**Editorial body**: **Newsreader** — humanist serif designed for screen reading, warm and substantial. Use for the dog stories, the about section, longform copy. Weights: 400 (Regular), 500 (Medium), 600 (Semibold). Italic variant available, use it for pull quotes.

**UI / workhorse**: **Inter** — for nav, buttons, form labels, captions, micro-copy. Weights: 400, 500, 600, 700. Inter is the only place we permit a flat, neutral type voice; it earns its place by getting out of the way.

**Scale** (1.25 ratio, OK to skip steps for drama):

| Token | Size | Use |
|---|---|---|
| `--text-display-xl` | 96px / 6rem | Hero headline only, desktop |
| `--text-display-l` | 72px / 4.5rem | Section openers, mobile hero |
| `--text-display-m` | 56px / 3.5rem | Subsection display |
| `--text-display-s` | 40px / 2.5rem | Tertiary display, large pull quotes |
| `--text-h1` | 32px / 2rem | Page H1 (in serif on story pages) |
| `--text-h2` | 24px / 1.5rem | Section H2 |
| `--text-h3` | 19px / 1.1875rem | Subsections, card headings |
| `--text-body` | 17px / 1.0625rem | Default body (serif on stories, sans elsewhere) |
| `--text-small` | 14px / 0.875rem | Captions, secondary metadata |
| `--text-micro` | 12px / 0.75rem | Labels, micro-copy |

**Line height**: display 1.00-1.05, body 1.55-1.6, small 1.45.

**Body line length**: cap at 68-72 characters.

**No gradient text. No outlined text. No text-shadow drop shadows.** Hierarchy is scale + weight + position, never decoration.

## Spacing and layout

8-point base, with a deliberate fibonacci-leaning scale (so layouts have natural rhythm, not a stamped grid):

`--space-1: 4px`, `--space-2: 8px`, `--space-3: 12px`, `--space-4: 16px`, `--space-6: 24px`, `--space-8: 32px`, `--space-12: 48px`, `--space-16: 64px`, `--space-24: 96px`, `--space-32: 128px`, `--space-48: 192px`.

Vary section padding deliberately — same padding everywhere reads as Squarespace. Heroes get `--space-32` or `--space-48` top/bottom; mid-page sections cycle through 16/24/32 to create rhythm.

**Layout primitives**:
- **Editorial column** (max-width ~68ch / ~640px) — for longform body copy
- **Wide column** (max-width ~960px) — for most page content
- **Full-bleed** (no max-width) — for hero imagery and dramatic surfaces
- **Asymmetric two-col** — for dog story sections (photo + text, alternating sides)

No 12-column rigid grid. No three-up identical card grids on landing pages. The dog list page uses a varied magazine-style layout (some dogs get bigger placements than others, based on urgency / story strength) rather than uniform tiles.

**Touch targets**: 44px minimum. Form inputs 48px tall on mobile. Primary buttons 52-56px tall on touch.

## Components

Patterns, not a library spec. Final components emerge in `/impeccable shape` and `/impeccable craft`.

- **Button (primary)**: rectangular, no border-radius beyond 4px, comic red background, paper text, Inter 600 uppercase. Hover state: shift to `--brand-red-deep`, no scale animation. Active: subtle press.
- **Button (secondary)**: ink border 1px, ink text on paper. Hover fills to ink with paper text.
- **Form field**: ink border 1px, 48px tall, generous internal padding, paper background. Focus ring: 2px red outline offset 2px. Label sits above the field in Inter 500 14px. Help text below in Inter 400 14px in `--n-700`.
- **Card**: avoid. When unavoidable (rare), use full thin border, never side-stripe accent, never shadow-floating. Nested cards never permitted.
- **Story block (dog pages)**: asymmetric photo + text, no card chrome. Photo is the structural element, type aligns to the photo's baseline.
- **Donation tier**: NOT a SaaS pricing card. Closer to an editorial sidebar: large display amount, one sentence of impact ("$50 covers a single vet visit"), one CTA button.
- **Quote / testimonial**: pulled out in Newsreader italic, large size, no quotation-mark decoration, attribution in Inter 500 small. No "card."

## Motion

Eases — ease-out only, exponential curves:
- `--ease-quart`: `cubic-bezier(0.165, 0.84, 0.44, 1)` — default
- `--ease-expo`: `cubic-bezier(0.19, 1, 0.22, 1)` — dramatic reveals

Never bounce. Never elastic. Never spring overshoot.

Durations:
- `--dur-instant`: 100ms — UI feedback (button press)
- `--dur-quick`: 200ms — hover transitions
- `--dur-normal`: 320ms — section reveals
- `--dur-slow`: 560ms — image reveals, hero animations
- `--dur-cinematic`: 900ms — hero entrance only

Patterns:
- **Hero entrance**: 900ms ease-out-expo, opacity 0→1 with 24px translate-y. One time per page load.
- **Scroll reveal**: 560ms ease-out-quart, opacity 0→1 with 16px translate-y. Threshold 0.2.
- **Button hover**: 200ms color/background.
- **Page transitions**: simple opacity crossfade 320ms. Avoid sliding page transitions.

Never animate layout properties (width, height, top, left). Animate `transform` and `opacity` only.

**`prefers-reduced-motion: reduce`** disables all entrance and scroll-reveal animations, leaves hover/focus transitions at <100ms. Test with macOS / Windows reduce-motion enabled before shipping any page.

## Imagery

The site lives or dies on photography.

- **Hero photos**: cinematic crops, 1.85:1 or 2.39:1 ratios. Tight on the dog's face or body, not "wide shot of a dog in a yard."
- **Portrait photos**: 4:5 or 3:4, used on dog profile pages.
- **Story photos**: square or 4:5, set inline within the text rhythm.
- **No stock photography. Ever.** If a photo doesn't show a real Underdog Heroes dog, it doesn't belong.
- **Treatment**: minimal. Real color, slight contrast boost only if needed. No Instagram-filter looks. No heavy duotone (a single red-duotone treatment may appear once per page as an editorial moment — never in a row of three).
- **Optional layer**: a halftone / printed-poster texture can overlay hero text in specific dramatic moments (the hero word "UNDERDOG" set in display type might get a halftone wash). Use once per page maximum. Never decorate the layout with texture spam.
- **Loading**: every image is lazy-loaded except the LCP hero. Aspect-ratio attribute set on every `<img>` to prevent CLS.

## Iconography

Sparing. Real photos > icons for most decisions.

When icons are needed: **Lucide** (open source, line icons, single weight). Single color (`--ink` or `--brand-red`), 24px default, never decorative-only. Every icon paired with a text label except in tightly constrained contexts (close buttons, social icons in footer).

No emoji on the site. No flat illustration of dogs. No mascot.

## Anti-patterns to refuse

Repeating the impeccable bans for this project's record:

- No side-stripe borders (`border-left: 4px solid red` on cards). If accent is needed, use full borders or a leading character.
- No gradient text under any circumstance.
- No glassmorphism unless purposeful and rare. Default no.
- No hero-metric template (big-number-small-label-supporting-stats). The donate page makes specific cost-per-dog claims, not abstract metrics.
- No identical card grids. The dog list is editorial, varied by emphasis. Happy Endings is a feed, not a grid.
- No modal-as-first-thought. Inline disclosure first, modal only when nothing else works.
- No em dashes in copy anywhere.
- No "fur baby" / "pawrent" / cutesy pet-parent language.

## Tokens (CSS custom properties to seed in code)

```css
:root {
  /* Color */
  --brand-red:        oklch(0.58 0.22 27);
  --brand-red-deep:   oklch(0.42 0.18 27);
  --brand-red-tint:   oklch(0.96 0.04 27);
  --ink:              oklch(0.18 0.02 27);
  --ink-soft:         oklch(0.30 0.015 27);
  --paper:            oklch(0.985 0.005 27);
  --paper-warm:       oklch(0.96 0.008 27);
  --n-900:            oklch(0.22 0.012 27);
  --n-700:            oklch(0.42 0.008 27);
  --n-500:            oklch(0.62 0.006 27);
  --n-300:            oklch(0.86 0.004 27);
  --n-100:            oklch(0.94 0.003 27);
  --ok:               oklch(0.58 0.13 145);
  --warn:             oklch(0.72 0.16 75);

  /* Typography */
  --font-display: "Big Shoulders Display", "Arial Narrow", sans-serif;
  --font-editorial: "Newsreader", Georgia, serif;
  --font-ui: "Inter", system-ui, sans-serif;

  /* Spacing */
  --space-1: 4px;  --space-2: 8px;   --space-3: 12px;
  --space-4: 16px; --space-6: 24px;  --space-8: 32px;
  --space-12: 48px;--space-16: 64px; --space-24: 96px;
  --space-32: 128px; --space-48: 192px;

  /* Motion */
  --ease-quart: cubic-bezier(0.165, 0.84, 0.44, 1);
  --ease-expo:  cubic-bezier(0.19, 1, 0.22, 1);
  --dur-instant: 100ms;
  --dur-quick: 200ms;
  --dur-normal: 320ms;
  --dur-slow: 560ms;
  --dur-cinematic: 900ms;
}
```
