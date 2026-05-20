# Platform recommendation

You've already committed to GitHub + Vercel + GoDaddy. That's a great stack for this project. This doc closes out the remaining technical decisions inside that stack so we can start building.

## Stack summary

- **Source control**: GitHub (private repo)
- **Hosting**: Vercel
- **Domain / DNS**: GoDaddy (point an A/CNAME record at Vercel)
- **Framework**: **Astro** (recommended) or Next.js
- **Content management**: **Sanity** (recommended) or a simple file-based CMS
- **Forms**: **Tally** (recommended) for adopt / foster / volunteer, embedded in Astro pages
- **Donations**: **Givebutter** (recommended) or **Donorbox** for monthly + one-time, with Stripe under the hood
- **Email / form notifications**: Resend or Postmark (Vercel-native)
- **Analytics**: Vercel Analytics (free, privacy-friendly) + GA4 if you want depth

The rest of this doc explains why each choice and the tradeoffs against alternatives.

---

## Framework: Astro vs Next.js

**Recommendation: Astro.**

This site is 90% marketing content (dog pages, story pages, happy endings, about). It's not an app. Astro is specifically designed for content-heavy marketing sites: it ships zero JavaScript to the browser by default, which makes it fast on slow connections (Riverside CA isn't a problem; the wider audience visiting from mobile reels is). When we need interactivity (form steps, image carousels, the donate flow), we add React islands inside Astro pages. We get the editorial speed without the SaaS-app overhead.

Next.js would also work, but it's overkill for this. We'd ship more JS, the build would be slower, and we'd be using maybe 20% of what it does. Save Next.js for the day Underdog Heroes builds an internal tool.

Both deploy to Vercel identically. If we go Astro and ever need to migrate to Next, the content is portable (markdown / MDX).

---

## CMS: Sanity vs Decap vs file-based

**Recommendation: Sanity.**

The site needs Shoshi (or whoever's helping her) to update dog stories, happy endings, volunteer asks, and donation tiers without ever touching code. That's the core test for picking a CMS.

**Sanity** is a hosted headless CMS with a clean editor UI. Generous free tier (way more than this project needs). Shoshi gets a "Studio" she logs into, edits a dog's story or marks a dog as adopted, and the site rebuilds automatically. Schema is defined in code (we set it up once), so we control exactly what fields exist.

**Decap CMS** (formerly Netlify CMS) is the open-source alternative that stores content as markdown files in the GitHub repo. Free, no vendor lock-in. The tradeoff is the editor UI is rougher and Shoshi would need a GitHub login. Workable but a friction point for a non-technical user.

**File-based (markdown in the repo, no CMS)** is the simplest option but it means every dog update is a pull request. Fine for the first 5 dogs we set up; a real problem once she wants to add the 20th.

Pick Sanity unless we want to avoid any third-party dependency, in which case Decap. I'd start with Sanity and migrate to Decap only if cost ever becomes an issue (it won't at this scale).

---

## Forms: Tally vs custom

**Recommendation: Tally** for adopt / foster / volunteer.

The adopt form is the single biggest piece of work on this rebuild. It needs:
- 50+ fields, split across 4-6 progressive steps
- Conditional logic ("Are you renting? Then ask about landlord. Are you owning? Skip those questions.")
- Save-and-resume (user can leave and come back)
- File attachments (photos of home, references)
- Routing into Shoshi's email + ideally a CRM

Building this from scratch in React inside Astro is a non-trivial amount of work and ongoing maintenance.

**Tally** does all of this with a no-code editor, has a generous free tier (more than enough), supports conditional logic and save-and-resume out of the box, and embeds cleanly in an Astro page. We design the form once, Tally hosts it, the user never knows it's a third party. Shoshi gets a Tally inbox for applications.

The alternative is **Typeform** (more polished UI but pricey) or rolling our own with React Hook Form. Tally is the right balance of polish vs cost for this project.

The pre-application gate page — where we tell people the truth about what they're signing up for — is a regular Astro page we build, not a Tally form. The form starts on the next page once they've passed the gate.

---

## Donations: Givebutter vs Donorbox vs custom Stripe

**Recommendation: Givebutter.**

For a small nonprofit, building a custom Stripe integration for recurring donations is doable but it pulls focus from the site work. Givebutter is purpose-built for nonprofits: handles recurring + one-time donations, generates IRS-compliant tax receipts automatically, has a donor portal, integrates with whatever CRM Shoshi eventually uses, and runs on Stripe under the hood. They take 0% platform fee on most donations (covered by an optional tip from the donor). Tax-receipt automation alone is worth it; it removes a chunk of Shoshi's admin work.

**Donorbox** is similar; slightly less polished UI but functionally equivalent. Free tier with a small platform fee.

The donate page on our site is what we build (the editorial layout, the tier copy, the photography). The actual checkout is hosted by Givebutter and embedded. We get to design everything around it and Givebutter handles the parts where mistakes hurt (PCI compliance, tax law, recurring billing edge cases).

For Venmo / PayPal / Zelle (current options), we keep those links on a secondary "other ways to give" subpage. Don't lose donors who only want to use those, but don't make them the loud path.

---

## What this stack unlocks (vs Squarespace)

The audit listed eight priority issues. Here's which ones the new stack opens up:

| Issue | Current platform | New stack |
|---|---|---|
| Story-driven first-party dog pages | Blocked (Shelterluv iframe) | Native, edited in Sanity |
| Progressive multi-step adopt form | Blocked | Tally, built-in |
| Monthly donation tiers + recurring | Limited | Givebutter, native |
| Happy Endings collection | Blocked | Native, edited in Sanity |
| Specific volunteer asks | Possible | Native, edited in Sanity |
| Cinematic typography (Big Shoulders, Newsreader) | Limited | Native, self-hosted |
| Action-poster visual register | Limited | Native, complete control |
| WCAG AA + reduced-motion | Limited | Native, complete control |

In other words: every priority issue the audit flagged is unlocked by this stack.

---

## Migration outline (Phase 4)

We don't migrate yet — we build in parallel and flip later. Rough sequence when we get there:

1. Build out the new site at a staging URL on Vercel (e.g. `underdog-heroes.vercel.app`).
2. Run smoke tests with Shoshi on staging — every form goes to a test address until we flip.
3. Set up redirects from old Squarespace URLs to new equivalents (so anything anyone has linked to from Instagram still works).
4. Switch the GoDaddy A/CNAME record to point at Vercel.
5. Cancel Squarespace subscription once DNS has fully propagated and the new site is confirmed working.

The cutover itself takes about an hour of attention; planning the redirects is the real work and we'll handle that in Phase 4.

---

## What this costs Shoshi

Rough monthly numbers, for context:

- Vercel: $0 (free tier covers this site for years)
- Sanity: $0 (free tier covers this scale)
- Tally: $0 (free tier covers it; $29/mo if we hit form limits, unlikely)
- Givebutter: $0 platform fee; payment processing fees on donations are standard Stripe rates (~2.9% + 30¢)
- Domain: ~$15-25/yr (already paying GoDaddy)
- Email (Resend or Postmark): $0 at this volume

Versus Squarespace at $16-49/mo currently. Net: a few dollars less per month for vastly more capability. The bigger cost is the build itself, which is our time, not Shoshi's money.

---

## What I'd want to confirm before we start building

1. Does Shoshi have an existing donor / contact CRM (Bloomerang, Salsa, Airtable, just-a-spreadsheet)? If yes, we'll wire Givebutter to it. If no, we'll seed something simple.
2. Does Underdog Heroes have a designer or photographer she works with for the dogs, or do we work from her phone photos and lift the visuals ourselves? Either is fine; affects how polished the imagery can be on day one.
3. Confirm she's okay with Givebutter as the donation processor. (It's the most popular option for nonprofits her size; no surprises expected, but worth checking.)
