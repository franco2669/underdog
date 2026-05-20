# Handoff to Codex

This project is a redesign of [underdogheroes.org](https://www.underdogheroes.org), a Riverside, California dog rescue run by Shoshi Gamliel. The rescue specializes in power breeds (pit bulls, mastiffs, cane corsos, bully mixes) that other rescues won't take. Goal of the redesign: convert site traffic into four buckets — adopt, foster, volunteer, donate — and let Shoshi spend less time in DMs explaining the same things over and over.

This handoff covers what I built, why, and what's left. Read it in conjunction with the files listed below.

---

## Read these first, in order

1. `PRODUCT.md` — the strategic brief. Register, users, brand personality, anti-references, design principles, accessibility target. Every design decision should be checkable against this.
2. `DESIGN.md` — the visual system. OKLCH color tokens, type stack, motion vocabulary, spacing scale, anti-pattern bans. Includes a CSS-tokens block ready to drop into the codebase.
3. `Underdog Heroes Rescue Q&A.pdf` — source material from an interview with Shoshi. Her actual voice, her actual stories. Treat this as authoritative on tone.
4. `AUDIT.md` — audit of the current live site. Diagnoses what to keep, cut, replace. Useful as a "do not redo" reference.
5. `PLATFORM.md` — tech stack decision (Astro + Sanity + Tally + Givebutter, deployed via Vercel from GitHub, domain via GoDaddy). Justifies every tool choice against alternatives.
6. `CONTENT-CHECKLIST.md` — what we need from Shoshi to build the rest. Currently the long pole.
7. `skills/impeccable/SKILL.md` — the design skill toolkit used to build everything so far. Codex should use it the same way I did.

---

## File tree

```
C:\Users\Miguel\Desktop\underdog heroes\
├── HANDOFF.md                          (this file)
├── Underdog Heroes Rescue Q&A.pdf      Shoshi interview, source of truth for voice
├── AUDIT.md                            Audit of the current live site
├── PRODUCT.md                          Strategic brief — register, users, anti-references
├── DESIGN.md                           Visual system — OKLCH tokens, type, motion
├── CONTENT-CHECKLIST.md                What we need from Shoshi to ship
├── PLATFORM.md                         Tech stack decision and migration outline
├── style-scratch.html                  Phase 1 visual scratch (color/type sample)
├── mocks/
│   └── happy-endings/
│       └── mercy.html                  Phase 2 anchor mock — Happy Ending profile template
└── skills/
    └── impeccable/                     The design skill used throughout
        ├── SKILL.md                    Overview and command list
        ├── reference/                  Per-command guidance (audit.md, critique.md, shape.md, craft.md, teach.md, etc.)
        └── scripts/                    Node tooling for the skill
```

---

## What's been done

### Phase 1: Foundation (complete)

Established the project brief and visual system. Five deliverables:

- `PRODUCT.md` — register is `brand` (marketing-led, design IS the product). Four user groups, with monthly donors and capable adopters as the top conversion targets. Voice is "badass, honest, last-hope" — Shoshi's actual phrase from the Q&A is *"the dogs that have no fucking chance."*
- `DESIGN.md` — visual lane is **action-poster / cinematic** (Miguel chose this from four options). Comic red (`oklch(0.58 0.22 27)`) used as a punch, never a wash. Type stack: Big Shoulders Display (condensed extra-bold display), Newsreader (humanist serif for stories), Inter (UI). All three on Google Fonts, self-hostable in production.
- `style-scratch.html` — a one-page visual sample to validate the direction. CSS-only placeholders for images. Still in the repo as a quick visual reference.
- `CONTENT-CHECKLIST.md` — concrete asks for Shoshi: 5-10 happy endings (Mercy, Rosa, Betty mastiff plus more), 1-3 currently available dogs, adopter testimonials, specific volunteer shifts, real donation cost numbers, founder photo.
- `PLATFORM.md` — Miguel committed to GitHub + Vercel + GoDaddy. I recommended Astro for the framework (content-heavy marketing site, zero JS by default), Sanity for the CMS (Shoshi needs to edit dogs without devs), Tally for the multi-step forms (saves us building progressive-form logic from scratch), Givebutter for donations (tax receipts + Stripe under the hood, 0% platform fee).

### Phase 2: Editorial spine (partial — anchor mock done)

The Happy Ending profile template is the editorial spine — get this right and every other story-driven page inherits the voice. One mock built: `mocks/happy-endings/mercy.html`.

The mock went through three iterations and the third is what's on disk:

1. **v1** had CSS-gradient placeholders for photos. Miguel's people testing said it felt "boring" because the visual gaps read as design holes rather than missing assets.
2. **v2** used Unsplash photos as labeled placeholders. Miguel reported the images didn't come through on his machine (browser/network filtering of CDN URLs, or similar). Also raised a strategic question: stock photos pretend to be real Underdog Heroes dogs.
3. **v3** (current) uses inline SVG illustrative storytelling. Each chapter has a typographic poster that advances the story beat: rain + tilted box for the intake, EKG pulse line for the rehab weeks, doorway with light rays for "home." The urgency block has a "DAY 17" poster with a pulsing dot. Related happy endings (Rosa, Betty, Bugsy) each have their own iconic single-symbol poster. Zero external image requests. Real photos slot in alongside the illustrations once Shoshi provides them.

The mock also includes the conversion mechanics that emerged from competitive analysis of BDRR, Best Friends, and Underdog International:

- **The Village** is the recurring-donor program at $25/month, branded after Shoshi's own language ("our entire village for coming together" — she already uses this on Instagram).
- **Urgency bridge** between story and CTA: a current rescue (placeholder name "Biscuit") on "Day 17 of similar work" routes to Available Dogs. This is the present-tense handoff that was missing in v1.
- **Inline Foster prompt** in Chapter 2, since fosters do the rehab work the story describes.
- **CTA hierarchy**: Village dominates, then a row of three micro-CTAs (Foster, Adopt, Email signup) beneath.
- **Sticky mobile bar** appears after scrolling past the hero so the Village ask is always one tap away on phone.

---

## What's pending

### Remaining Phase 2 mocks

- **Happy Endings index page** — magazine-style listing of all completed rescue stories. Mercy, Rosa, Betty mastiff featured with placeholders for the rest. Not started.
- **Available Dog profile** — different from Happy Ending: present-tense, "who CAN'T adopt this dog" filter built in, routes to the adoption application. Anchored on whichever current dog Shoshi picks. Blocked on her providing one current dog's content.

### Phase 3: Conversion surfaces (not started)

- Home page (rebuild)
- Donate page (Village monthly + tiered + concrete-impact framing)
- Apply to Adopt — pre-application gate page + multi-step Tally form
- Apply to Foster — pre-application gate page + multi-step Tally form
- Volunteer page (specific shifts, not generic "we need volunteers")
- About / Founder page (Shoshi's voice, real story)
- FAQ (built from her actual DM history)

### Phase 4: Build and ship (not started)

- Astro project on GitHub
- Sanity schemas (dogs, happy-endings, volunteer-shifts, donation-tiers)
- Tally forms wired to Shoshi's email (or CRM if she has one)
- Givebutter embed for monthly + one-time donations
- All pages built as real routes
- Accessibility / responsive / performance passes (use `/impeccable harden`, `/impeccable optimize`)
- Migration: redirects from current Squarespace URLs, DNS swap from GoDaddy to Vercel
- Handoff doc for Shoshi so she can edit dogs without devs

Rough remaining effort: ~5 more mocks (1-2 weeks), then 4-6 weeks of production build, plus calendar lag while waiting on Shoshi's content.

---

## Brand rules that should not be undone

These came from PRODUCT.md, DESIGN.md, and feedback rounds with Miguel. They are intentional and have been validated:

- **Use the impeccable skill.** It's in `skills/impeccable/` and provides commands like `/impeccable shape`, `/impeccable craft`, `/impeccable critique`, `/impeccable audit`, `/impeccable polish`, etc. Read `SKILL.md` first, then load the relevant `reference/[command].md` before working on any new page.
- **No stock photography in production.** Placeholders are fine in mocks (currently inline SVG illustrations, see below). All production images must be real Underdog Heroes dogs from Shoshi.
- **No em dashes in copy.** Use commas, colons, semicolons, periods, parentheses. Also not `--`. Internal dev comments are tolerant.
- **No "fur baby," "pawrent," or pet-parent cutesy language.** They are dogs.
- **No `#000` or `#fff`.** Every neutral is OKLCH and tinted slightly toward the brand red hue (chroma 0.005-0.01).
- **No side-stripe borders, no gradient text, no glassmorphism, no hero-metric template, no identical card grids, no modal-as-first-thought.** These are the absolute bans in DESIGN.md.
- **The recurring donor tier is "The Village"** at $25/month. Do not rename. Shoshi already uses this word — verified from her Instagram.
- **The lightning bolt ⚡ is the iconic mark.** Use it as inline SVG (not the emoji), pairs with the wordmark in Big Shoulders Display.
- **Mercy, Rosa, Betty (mastiff) are signature happy endings.** From the Q&A. Use them as the editorial spine.
- **The application form is a filter, not a funnel.** Front-load deal-breakers on the pre-application page so unprepared adopters self-select out. Lower volume, higher approval rate. This is intentional per Shoshi's stated frustration.

---

## Known gotchas

- **There are two different Bettys.** A mastiff Betty (from the Q&A, older happy ending) and a current beagle Betty (recent rescue from a testing facility, visible on her Instagram). They are different dogs. The Mercy mock's related-card uses the mastiff Betty.
- **Mercy is older.** She's NOT in Shoshi's current Instagram story highlights (those are Adoptable, Foster, BUGSY, Rosa, Merlin). Mercy's photos live in Shoshi's archive, not her current grid. Expect this to slow down getting photos.
- **Edit tool truncates around 38KB.** When rebuilding `mercy.html` v3, single Write/Edit calls truncated the file at ~38KB. The workaround is to either (a) build long files in chunks via multiple targeted Edits, or (b) use `bash` heredoc to append large blocks. The Mercy file as it stands was completed via bash heredoc append.
- **OKLCH browser support is mainstream but not universal.** Modern Chromium, Firefox, Safari are fine. If we ever need to support older browsers, fall back to sRGB hex equivalents.
- **SVG `<text>` uses the document's fonts.** Since the page already loads Big Shoulders Display via Google Fonts, the SVG illustrations can use it. If we ever inline an SVG outside the document context, the fonts won't be available.
- **Squarespace forms route to email.** Whatever Tally is wired to in production should match what Shoshi's currently using for applications. Confirm before swap.

---

## Open questions for Shoshi (deferred from earlier rounds)

1. **CRM or none?** PLATFORM.md asks whether Shoshi has a donor/contact CRM (Bloomerang, Salsa, Airtable, spreadsheet). Affects how we wire Tally and Givebutter.
2. **Photographer relationship?** Does she work with a designer/photographer for dog shoots, or do we work from her phone photos and lift the visuals ourselves?
3. **Givebutter approval.** It's the most popular nonprofit donation processor at her scale, but confirm she's okay with it before we set it up.
4. **EIN.** Q&A had 84-4188282; PLATFORM.md asks her to confirm.
5. **The Village name.** Working name based on her IG language. She should sign off explicitly.
6. **Which current dog is the Available-Dog template anchor?** She picks. We need one full current-dog profile to validate the template.

These do not block continuing the mock work. They block production build.

---

## Recommended next steps for Codex

Pick one of these as the entry point:

**Option A — finish mocks first.** Build the remaining 5 mocks (Happy Endings index, Available Dog profile, Home, Donate, Adopt flow) using the same SVG-illustration approach as `mercy.html`. Pros: Shoshi sees the full vision before any code commitment. Cons: more time before production starts.

**Option B — start the Astro project.** Translate the existing Mercy mock into a real Astro route, set up Sanity, scaffold the GitHub repo and Vercel deploy. Pros: discovers production constraints early. Cons: locks in technical decisions before Shoshi has reacted to the full visual story.

**Option C — pause and wait for Shoshi's content.** Send her the Mercy mock plus the content checklist, get her reactions and content deliveries, then decide A or B based on what comes back.

My recommendation was **C → A → B**: get her reaction first because everything else hinges on her sign-off on the visual direction, then finish mocks because the work is cheap relative to production setup, then build for real once content is flowing.

When in doubt, read `PRODUCT.md` and `DESIGN.md`. They were written specifically to make every subsequent decision derivable.

---

## Tool-use notes

- The impeccable skill in `skills/impeccable/SKILL.md` expects to be invoked with subcommands (`craft`, `shape`, `audit`, `critique`, `polish`, etc.). Each command has its own reference file under `skills/impeccable/reference/`. Always load the matching reference file before executing the command.
- `node skills/impeccable/scripts/load-context.mjs` will load PRODUCT.md and DESIGN.md as JSON. The skill expects this to run before any design work.
- For long file writes (>30KB), prefer `bash` heredoc append over a single Write call.
- Tag-balance check before declaring a file done: `node -e "const h=require('fs').readFileSync('FILE','utf8'); console.log('div', (h.match(/<div[\\s>]/g)||[]).length, '/', (h.match(/<\\/div>/g)||[]).length); console.log('sect', (h.match(/<section[\\s>]/g)||[]).length, '/', (h.match(/<\\/section>/g)||[]).length); console.log('closes html:', h.trim().endsWith('</html>'));"`

Good luck.
