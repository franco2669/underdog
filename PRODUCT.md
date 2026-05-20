# Product

## Register

brand

## Users

Underdog Heroes is a Riverside, California rescue that takes power-breed dogs (pit bulls, mastiffs, cane corsos, rotties, bully mixes) other rescues won't touch. The site has four distinct audiences, ordered by how often each one is the wrong fit for the current site:

**Capable adopters.** Adults who already understand power breeds, have the time and money for a rehab dog, and are ready to be told the truth about what they're signing up for. They're put off by sentimentality and won't fill out a 60-field form on a first visit. They want proof: who is this rescue, what dogs do they have, what does life with one actually look like. Goal: convert the right ones, repel the wrong ones, before they touch a form.

**Foster families.** Same psychographic as adopters, lower commitment. Don't know what fostering is actually like. The Q&A says 100% of supplies are covered and most don't realize that. Goal: make the floor clear (it's free, it's temporary, it's coached) and show one real foster's week so the role is concrete.

**Volunteers.** Local to Riverside. Often think the rescue doesn't need help because the website is vague. Goal: list specific open shifts and roles so capable hands can self-route into them.

**Monthly donors.** Largest revenue unlock and the audience the current site converts worst. The Instagram converts emotion; the website fails to convert it into a recurring charge. Goal: surface the monthly-donor tier with concrete impact attached, not abstract gratitude.

The founder, Shoshi Gamliel, is also a user. The site has to do work she currently does manually in DMs (explaining deal-breakers, answering vet questions, repeating volunteer needs, posting happy endings). Every page that successfully replaces a DM thread is a win for her.

## Product Purpose

A public-facing site that does three jobs at once: tell the underdog story honestly, filter applicants so Shoshi spends time only on the prepared ones, and convert recurring donors at the moment of emotional peak.

"Underdog" isn't a marketing word here. The Q&A is explicit: "The ones we rescue are the dogs that have no fucking chance. We are their last hope." The site exists to make that real to a visitor in under thirty seconds, then to give them four concrete ways to participate (Adopt, Foster, Volunteer, Give Monthly), and to make every one of those paths feel earned.

Success looks like: monthly donor count up, foster pipeline filled, fewer unprepared applications hitting Shoshi's inbox, and capable adopters arriving at Apply already understanding what they're committing to.

## Brand Personality

Three words: **badass, honest, last-hope.**

This is not a "friend to animals" voice. It's a "we will tell you the truth about this dog and you will respect us for it" voice. The Q&A line "we don't sugar coat" is the entire register. Adjacent feelings: a fighter cornerwoman, a documentary photographer, a trauma nurse. Not sentimental, never cute, never apologetic.

Voice rules:
- First person plural when speaking as the rescue ("we don't sugar coat", "we won't place a dog who isn't ready").
- First person singular when Shoshi speaks. She has a specific voice and it carries.
- Direct, declarative sentences. Short. Long ones earn the length.
- No em dashes anywhere on the site.
- Profanity is on-brand in measured doses (Shoshi's own line in the Q&A: "no fucking chance"). Use sparingly; reserve for moments that matter.
- Never call a dog "fur baby" or any variant. They're dogs.
- Never apologize for the application being hard. The hardness is the point.

Emotional goals by surface: home should make a visitor feel respect and curiosity, not pity. Dog pages should land somewhere between admiration and ache (this dog has been through it; look where they are now). Adopt-flow should feel like a job interview that takes itself seriously. Donate should feel like joining a team, not making a transaction.

## Anti-references

What this site is NOT.

- **Not pastel-and-paw-print template Squarespace.** The exact aesthetic the current site sits in. Soft colors, rounded everything, watercolor illustrations of dogs, "gentle" copy. This is the visual lane of every small rescue site and Underdog Heroes is specifically not that.
- **Not sad-piano ASPCA.** Black-and-white sad dogs, guilt-driven copy, big donation overlays. The big-charity playbook. Sentimentality is the enemy of the badass register.
- **Not corporate-charity glossy.** Smiling stock-photo volunteers, brand-consultant typography, mission statements in pull quotes. Reads as Fortune-500 CSR.
- **Not SaaS startup.** Gradients, glassmorphism, hero metric layouts, identical card grids, AI illustrations. The impeccable skill's standard slop list.
- **Not "puppy flipping" rescue.** The Q&A is explicit about hating people who charge ridiculous adoption fees and treat rescue as a side hustle. Nothing about this site should imply transactional ownership of dogs.
- **Not a Petfinder clone.** Inventory grids of dogs with no story. The dogs are not products.

When in doubt: if a typical visitor could tell which adjacent aesthetic the page is in (rescue-template, ASPCA, fintech-charity, etc.) within three seconds, the page is too close to one of these. Push toward the action-poster / cinematic lane instead.

## Design Principles

1. **The dog is the page.** Every dog gets a real first-party page with rehab arc, photos, and the truth about what they need. The dog is never an inventory tile inside a third-party widget. The site's editorial spine is one dog at a time, not a grid of many.

2. **Friction is the product on the apply path.** Most UX advice says reduce friction. Here, the application is intentionally a filter. Pre-application content tells the truth about what life with a rehab dog looks like and lets unprepared applicants self-select out. Form is progressive and respects the prepared adopter's time once they've passed the gate.

3. **Show the work.** Donations, volunteer asks, and the application all get specific. No "your donation makes a difference" without "$200 covered Rosa's first month of skin treatment." No "we need volunteers" without "we need four people for Saturday morning walks." Vagueness is the failure mode of every other small rescue.

4. **Quiet, then loud.** Most of the site is restrained, photography-led, generous-whitespace. Comic red shows up sparingly and is weight-bearing when it does (CTAs, key callouts, accent typography). The red is a punch, not a wash. This is what the action-poster lane actually demands.

5. **Practice what we preach.** The underdog frame is the editorial truth, not a tagline. Every page either tells a specific dog's story, surfaces a specific ask, or removes a specific objection. No filler.

## Accessibility & Inclusion

Target: **WCAG 2.1 AA**, with extra effort in three areas:

- **Reduced motion.** Respect `prefers-reduced-motion: reduce`. The action-poster lane will want some cinematic motion (parallax, reveal-on-scroll, video); all of it must degrade gracefully.
- **Color contrast.** Comic red on white and on near-black both need to hit 4.5:1 minimum for any text use. Body copy never goes on a red surface unless the red is dark enough to clear AA against white text.
- **Screen reader friendliness on dog pages.** The story-led layouts are easy to over-design and break SR flow. Headings strict, image alt text descriptive, decorative imagery marked correctly.

Touch targets minimum 44×44px. Forms must be fully keyboard-operable. Donation flows should not depend on JavaScript for the core path (a no-JS fallback that still routes to a working donation endpoint).
