# Underdog Heroes site audit

**Target:** https://www.underdogheroes.org
**Date:** 2026-05-18
**Method:** Adapted from `impeccable/audit.md` + `impeccable/critique.md`. The site is a hosted no-code build (form structure, page templating, and inline styling all match Squarespace), so the deterministic detector and code-level a11y scan don't apply. Scoring below is based on the rendered HTML + page text pulled from the live site, plus the brief in `Underdog Heroes Rescue Q&A.pdf`.

---

## Overall verdict

The site is a generic non-profit template with a single dog rescue's text dropped into it. It does the bare minimum: tells you who they are, asks you to donate, lets you apply to adopt. It does almost none of the things the brief says Shoshi actually needs the site to do.

The biggest single failure: the website and the Instagram are talking about two different organizations. The Instagram is 45,000 followers of raw, story-driven, "no other rescue would take this dog" content. The website is a beige mission-statement page that buries the dogs behind a third-party widget and asks people to fill out a 55-field form before they understand what they're applying for.

**Design Health Score (Nielsen's 10): 14 / 40 — Poor.**
**Anti-Patterns Verdict: heavy template-aesthetic, low AI-slop. Could be any 501(c)(3).**

---

## Design Health Score

| # | Heuristic | Score | Key issue |
|---|---|---|---|
| 1 | Visibility of system status | 2 | Long forms with no progress, no validation visible without submit. |
| 2 | Match system / real world | 2 | "Streamlined application" then a 55-field wall. Mismatch with reality. |
| 3 | User control and freedom | 1 | No save-and-resume on long forms. No way to back out of a section. |
| 4 | Consistency and standards | 2 | Forms diverge (volunteer form asks for IG link, foster asks for emergency contact, adopt asks neither). |
| 5 | Error prevention | 1 | All-or-nothing single-page forms. One missed required field, you've scrolled past your context. |
| 6 | Recognition over recall | 1 | Country dropdown defaulting to "Afghanistan" for a Riverside CA rescue. User must remember to scroll to "United States." |
| 7 | Flexibility and efficiency | 2 | No filters on Our Dogs (it's an iframe). No "show me dogs that match my home" path. |
| 8 | Aesthetic and minimalist design | 2 | Generic template, copy-heavy, no visual identity. Doesn't read as "badass." |
| 9 | Error recovery | 1 | Squarespace default error UX, no field-level help text. |
| 10 | Help and documentation | 2 | No FAQ, no "what to expect," no "before you apply" gate. Shoshi answers all of this in DMs. |
| **Total** | | **14 / 40** | **Poor — significant work needed** |

---

## Anti-patterns verdict

This isn't AI slop. It's something arguably worse: **template slop**. The site reads as "non-profit Squarespace template, 2019." The tells:

- Hero with all-caps stacked headline ("BRAVE SOULS / Who have no voice") that says nothing specific.
- Mission statement opens with "Our aim as a team of animal lovers is to break the bully breed stereotypes." Every rescue says some version of this. Nothing distinguishes Underdog Heroes from any other.
- The founder paragraph switches from third-person to first-person mid-section without any visual break, and ends on the kind of inspirational quote that signals "stock charity copy."
- "Donations are more important than ever!" — a phrase that has appeared on every non-profit page since 2008.
- Two CTAs in the hero (Donate / Adopt), no foster or volunteer prominence, even though the brief says fosters and recurring donors are the actual operational bottleneck.
- The "Our Dogs" page is a Shelterluv iframe. No story, no editorial framing, no underdog theme. The dogs feel like inventory.

**Specific impeccable bans present or close:** identical card grid (the dog list is by definition this, via the embedded widget), modal-as-first-thought is N/A here, hero-metric template isn't used (good), no gradient text. The site doesn't fail the obvious AI-slop tests — it fails by being indistinguishable from every other small rescue site.

---

## Findings by page

### Home — P1 weak, three critical gaps

**Findings:**
- **[P0] Hero says nothing.** "fighting for the BRAVE SOULS / Who have no voice" is the most generic possible opener. The brief says the differentiator is "the dogs that have no fucking chance" and rehabbing dogs other rescues won't touch. The hero should land that, hard, in 1-2 sentences with a specific image, not a slogan.
- **[P0] No story upfront.** Mercy in the box. Rosa and the sugar rub. Betty the mastiff. These are the spine of the brand and they don't appear on the homepage. A homepage hero anchored to one specific dog's before/after would do more work than the entire mission statement.
- **[P1] Two CTAs only, both transactional.** Donate Now and Adopt a Dog. Foster, volunteer, and (critically) recurring-donor are buried. The brief says recurring donors are the actual revenue model.
- **[P1] Mission section is a wall of text.** Six paragraphs of mission-speak with no rhythm, no images, no scannable points. People won't read it. Shoshi already said "people don't read."
- **[P2] Founder section reads as third-person bio plus first-person quote, awkwardly stitched.** Pick one register.

**Fix direction:** Rebuild the homepage around three things: one specific dog's story (rotating), a clear four-CTA structure (Adopt / Foster / Volunteer / Give Monthly), and proof — the Instagram has 45K followers and a wall of happy-ending content that should be visible here.

---

### Our Dogs — P0 broken

**Findings:**
- **[P0] The page is functionally empty without the iframe.** Scraping returns only "This page is powered by Shelterluv." The dogs themselves live inside a third-party widget. The dogs are the entire reason people come to the site and they are the most generic element on it.
- **[P0] No story per dog.** A Shelterluv widget gives you name, breed, age, photo, and intake date. The brief is clear that the differentiator is the story. Mercy was found in a box in the rain with dying puppies. That belongs on Mercy's page. The current setup makes it structurally impossible.
- **[P0] No happy endings.** The Q&A says Shoshi has "a ton" of adopter testimonials. None are on the site. This is the single biggest content asset she's not using.
- **[P1] No filtering by what matters.** Energy level, kid-friendly, dog-friendly, experience-required, special-needs. The Shelterluv default is "all dogs in a grid," which forces every visitor to do the same work.

**Fix direction:** Move off Shelterluv-as-display (keep it as the data backend if needed), build first-party dog pages with the rehab story front and center, and add a Happy Endings section/page. Each adopted dog's page transitions to a "where they are now" entry after the two-week wait Shoshi mentioned.

---

### Apply to Adopt — P0 broken

**Findings:**
- **[P0] The form has on the order of 50-60 distinct fields, served as one single-page wall.** No grouping, no progress indicator, no save-and-resume. Counted (grouped): name + address (~8 fields), demographics (age, social, email, phone), housing (4-5 fields), occupation + income, motivation, household composition, current pets sub-survey (~8 fields), home setup (yard, fence, pool, stairs ~7 fields), care plan (day/night/decompress, hours alone, where-when-alone), behavioral history + trainer, vet info, primary/financial responsibility, travel + move/escape plans, home check, two legal agreement initials, signature + date. Most committed adopters will bounce here before submitting.
- **[P0] The "streamlined application" line is a credibility hit.** Saying "streamlined" above a 55-field form is the kind of small lie that signals to a careful reader that the org doesn't notice details. For a rescue where "we don't sugar coat" is the brand, this is exactly the wrong tone.
- **[P0] No pre-application content.** The brief is explicit: Shoshi wants applicants to know the deal-breakers BEFORE they apply. The current page goes straight from "Apply to adopt one of our dogs" to the form. There is no "what life with a rehab dog actually looks like" gate, no "are you in the right region" check, no "here are our absolute requirements" filter.
- **[P1] Country dropdown shows the full alphabetical list, Afghanistan first.** Riverside CA rescue, ~99% of useful applicants live in California. The dropdown should default to United States, and ideally the field should be hidden entirely (with a state-level filter instead).
- **[P1] No conditional logic visible.** "If you are unemployed, what is your source of income?" is asked of everyone. "If renting, are pets allowed?" is asked of everyone. "Fence height" is asked of everyone. Squarespace forms support conditional show/hide; this form doesn't use it.
- **[P2] Legal agreement paragraphs are squashed into single-line input labels.** The 10-point foster expectations on the foster page have the same problem — long legal text crammed into a form caption.

**Fix direction:** Front-load a "Before you apply" page that says, in Shoshi's voice, what these dogs are and aren't. Filter unprepared applicants out before they touch the form. Then split the form into 4-5 progressive steps with a save-and-resume mechanism. Aim to cut the abandonment rate at the expense of total volume; that's what the brief asks for.

---

### Foster Application — P0 broken, same shape

**Findings:**
- **[P0] Another wall-of-form, plus a 10-point legal agreement crammed into a single form caption at the bottom.** Foster Expectations 1-10 are presented as a single paragraph inside the form, with the e-signature line immediately after. No one is reading that. (Failing this is a real legal risk, not just a UX issue.)
- **[P1] Strong opener buried.** "5 great reasons to foster" is the best content on the page and it's adequate. But the rest of the page is form. There's no "what a typical foster week looks like," no example foster's story.
- **[P1] Same country-default + same redundant fields as the adopt form.** Plus this one asks for an Instagram handle as a required field, which is a real filter (good) but also a hard stop for the Instagram-averse (might cut some good fosters).

**Fix direction:** Same as adopt — split into steps, surface the 10-point expectations as a real document, add example-foster content. The "It's 100% free / we supply everything" line is the strongest pitch and should be amplified.

---

### Donate — P0 weak

**Findings:**
- **[P0] No recurring-donor program visible.** The Q&A says recurring monthly donors are the revenue model and that they're hard to come by. The donate page mentions tax deductibility, has an EIN, and lists Venmo/PayPal/Zelle. There is no "$15 / mo feeds a dog" tier structure, no monthly toggle, no proof.
- **[P0] No "what your donation does" specificity.** Brief said people don't believe their donations matter. The page says "food, emergency medical interventions/procedures, medicine, shelter, and bedding." That's a list of nouns. Compare: "$50 covers one vet visit. $200 covers Rosa's first month of skin treatment. $500 covers a parvo intake." Concrete numbers + named dogs convert.
- **[P1] No social proof.** No "X donors this month," no testimonials, no impact dashboard.
- **[P2] EIN and tax-deductibility info are buried but at least present.** Keep.

**Fix direction:** Restructure around three tiers: Monthly (loudest), One-time (default secondary), Other Ways (mail/Venmo/Zelle for the people who really want it). Pair each tier with a specific dog/cost. Add a running impact counter sourced from real data if available.

---

### Volunteer — P1 generic

**Findings:**
- **[P1] No concrete asks.** The brief is explicit: people think volunteers are covered when they aren't, because the site doesn't tell them what's actually needed. The page asks for availability but never says "we need 4 people Saturday 9-12 for dog walking" or "we need someone with a truck for transport on weekends." Without specific asks, willing volunteers self-deselect.
- **[P2] The check-all-that-apply ("How would you like to help?") is reasonable but mixes very different commitments.** Transport vs. on-site care vs. sponsorship are completely different asks and should probably route to different paths.

**Fix direction:** Replace generic "volunteer with us" with a list of specific open roles with shift counts. Even four roles with "we need N more for Saturday" copy would dramatically outperform the current page.

---

## Persona red flags

**The Bully-Breed Capable Adopter (target persona — keep).**
Looking for a power breed, has experience, is prepared. Lands on home: sees a slogan, scrolls to a generic mission statement, doesn't find a single dog story. Clicks Our Dogs: gets a Shelterluv grid that looks like every other rescue. No reason to pick this rescue over another. Clicks Apply: sees a 55-field form. Bounces because they're a thoughtful adopter and the form-first approach feels disrespectful of their time before any conversation has happened.

**The Excited Unprepared Adopter (filter persona — must filter out).**
Saw a viral reel of a cute pit bull. Clicks Apply. The form is intimidating enough that they self-filter — good! But there's no education before the form, so the ones who push through are the most stubborn, not the most prepared. Worse, the form being a wall makes Shoshi's review time linear in applicants, including all the wrong ones.

**The First-Time Monthly Donor (target persona — convert).**
Just saw Shoshi's video about Sadie. Wants to do something but can't adopt. Clicks Donate. Sees generic copy and no monthly tier. Decides "I'll do it later." Never does it. The Instagram is doing the emotional work; the website fails to convert at the finish line.

**The Capable Volunteer (target persona — recruit).**
Lives in Riverside, has Saturday mornings free. Clicks Volunteer. Form asks what days they're available. No information about what's actually needed. Fills out form, gets nothing back. Disengages.

---

## Priority issues, ranked

1. **[P0] No story-driven dog pages.** Brand differentiator (the underdog theme) lives entirely in Instagram, never on the site. → Move off Shelterluv-as-display, build first-party dog profiles with rehab arc.
2. **[P0] Adopt + Foster forms are 50-question walls with no pre-education.** Drives the right adopters away, lets the wrong ones through, burns Shoshi's review time. → Add "Before you apply" gate, split forms into progressive steps.
3. **[P0] Donate page has no recurring tier and no specificity.** Misses the actual revenue model. → Restructure with monthly-first, named-dog cost tiers.
4. **[P0] No happy endings / adoption stories.** Largest unused content asset. → Build a Happy Endings collection, integrate two-week-post-adoption celebration into the dog-profile lifecycle.
5. **[P1] Generic homepage hero and mission.** Site reads as any rescue. → Rebuild hero around one specific dog + four equal CTAs (Adopt / Foster / Volunteer / Give Monthly).
6. **[P1] Volunteer page has no concrete asks.** People don't volunteer because they don't think they're needed. → Replace with specific open shifts and roles.
7. **[P1] No FAQ / "what to expect" content.** Shoshi answers the same questions in DMs forever. → Build an FAQ from her actual DM history, link from every CTA.
8. **[P2] Visual identity is template-default.** No "comic red," no "badass" register anywhere. → Color/type/layout pass after structural fixes.

---

## Recommended sequence

Working in roughly this order:

1. **`/impeccable teach`** — write `PRODUCT.md` and `DESIGN.md` from the Q&A. Lock in the underdog theme, comic-red palette, badass register, anti-references, and the four-CTA conversion model so every subsequent command shares a single brief.
2. **`/impeccable shape homepage`** — design the new homepage end-to-end before any code, anchored to one dog's story.
3. **`/impeccable shape dog-profile`** — same exercise for a single dog's page, since this is the brand's editorial template.
4. **`/impeccable shape adopt-flow`** — design the pre-application gate + progressive-form structure.
5. **`/impeccable craft happy-endings`** — build the success-stories collection (depends on Shoshi providing 5-10 stories).
6. **`/impeccable craft donate`** — rebuild donate with monthly tiers + concrete impact.
7. **`/impeccable craft volunteer`** — concrete-asks rewrite.
8. **`/impeccable harden`** — accessibility + responsive pass.
9. **`/impeccable polish`** — final pre-ship sweep.

A platform decision is upstream of step 2: the current Squarespace setup limits how far we can take this. The first three `shape` steps will surface whether we need to migrate (likely yes) and what to migrate to.

---

## What I couldn't verify

- **Color contrast / WCAG scoring.** Would need source HTML access or a live accessibility scanner against the rendered DOM, neither possible here.
- **Performance metrics.** No Lighthouse run available.
- **Mobile rendering quality.** All scans were desktop-rendered HTML. The forms in particular are likely worse on mobile, but I can't confirm without testing.
- **The Shelterluv widget's actual behavior.** Page text returned only the Shelterluv credit line; the widget is JS-rendered. The findings about Our Dogs assume default Shelterluv behavior — if it's been customized, the specifics may differ.
- **Whether the site is Squarespace.** Strong signal from the form structure and field UX, but unconfirmed without inspecting source headers.
