import { mkdir, rm, writeFile, copyFile, readdir } from "node:fs/promises";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import {
  contact,
  ctas,
  faqs,
  founderStory,
  impactNotes,
  nav,
  processSteps,
  site,
  stories,
  volunteerRoles
} from "../src/site-data.mjs";

const root = fileURLToPath(new URL("../", import.meta.url));
const outDir = fileURLToPath(new URL("../dist/", import.meta.url));

const asset = (path) => `/assets/${path}`;
const route = (path) => path;

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function attrs(attributes) {
  return Object.entries(attributes)
    .filter(([, value]) => value !== undefined && value !== null && value !== false)
    .map(([key, value]) => (value === true ? key : `${key}="${escapeHtml(value)}"`))
    .join(" ");
}

function bolt() {
  return `<svg class="bolt" viewBox="0 0 24 32" fill="currentColor" aria-hidden="true"><path d="M14.5 0 1.2 18.2h8L6.8 32 22.7 11.4h-8.5L14.5 0Z"/></svg>`;
}

function icon(name) {
  const icons = {
    arrow: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13"/><path d="m13 6 6 6-6 6"/></svg>`,
    heart: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 5.6a5.4 5.4 0 0 0-7.6 0L12 6.8l-1.2-1.2a5.4 5.4 0 0 0-7.6 7.6L12 22l8.8-8.8a5.4 5.4 0 0 0 0-7.6Z"/></svg>`,
    check: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m20 6-11 11-5-5"/></svg>`,
    mail: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16v12H4z"/><path d="m4 7 8 6 8-6"/></svg>`,
    bolt: bolt()
  };
  return `<span class="icon">${icons[name] || icons.arrow}</span>`;
}

function poster({ id, title, kicker, mood = "rain", dark = false, image, eager = false }) {
  const safeId = escapeHtml(id);
  const safeTitle = escapeHtml(title);
  const safeKicker = escapeHtml(kicker);
  const imageByMood = {
    rain: "mercy-rain",
    pulse: "rosa-care",
    doorway: "home-safe",
    mastiff: "betty-gate",
    list: "adopt-application"
  };
  const imageName = image || imageByMood[mood] || "last-hope";

  return `
    <figure class="poster image-poster ${dark ? "poster-dark" : ""}">
      <img
        src="${asset(`images/${imageName}.webp`)}"
        width="1586"
        height="992"
        alt="${safeTitle}: ${safeKicker}"
        loading="${eager ? "eager" : "lazy"}"
        decoding="async"
      >
      <figcaption id="${safeId}-title">${safeTitle}<span>${safeKicker}</span></figcaption>
    </figure>`;
}

function button(label, href, variant = "primary", extra = "") {
  return `<a class="btn btn-${variant} ${extra}" href="${escapeHtml(href)}">${escapeHtml(label)} ${variant === "text" ? icon("arrow") : ""}</a>`;
}

function controlId(formId, name) {
  return `${formId}-${name.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}`;
}

function inputField(formId, field) {
  const id = controlId(formId, field.name);
  const requiredText = field.required ? " <span>Required</span>" : "";
  const baseAttrs = attrs({
    id,
    name: field.name,
    type: field.type || "text",
    required: field.required,
    autocomplete: field.autocomplete,
    placeholder: field.placeholder,
    "data-label": field.label
  });

  return `
    <div class="form-field">
      <label for="${id}">${escapeHtml(field.label)}${requiredText}</label>
      <input ${baseAttrs}>
      ${field.help ? `<p class="field-help">${escapeHtml(field.help)}</p>` : ""}
    </div>`;
}

function textareaField(formId, field) {
  const id = controlId(formId, field.name);
  const requiredText = field.required ? " <span>Required</span>" : "";
  return `
    <div class="form-field form-field-wide">
      <label for="${id}">${escapeHtml(field.label)}${requiredText}</label>
      <textarea ${attrs({ id, name: field.name, required: field.required, rows: field.rows || 5, "data-label": field.label })}></textarea>
      ${field.help ? `<p class="field-help">${escapeHtml(field.help)}</p>` : ""}
    </div>`;
}

function selectField(formId, field) {
  const id = controlId(formId, field.name);
  const requiredText = field.required ? " <span>Required</span>" : "";
  return `
    <div class="form-field">
      <label for="${id}">${escapeHtml(field.label)}${requiredText}</label>
      <select ${attrs({ id, name: field.name, required: field.required, "data-label": field.label })}>
        <option value="">Choose one</option>
        ${field.options.map((option) => `<option value="${escapeHtml(option)}">${escapeHtml(option)}</option>`).join("")}
      </select>
      ${field.help ? `<p class="field-help">${escapeHtml(field.help)}</p>` : ""}
    </div>`;
}

function checkboxField(formId, field) {
  const id = controlId(formId, field.name);
  return `
    <label class="check-row" for="${id}">
      <input ${attrs({ id, name: field.name, type: "checkbox", value: field.value || "Yes", required: field.required, "data-label": field.label })}>
      <span>${escapeHtml(field.label)}</span>
    </label>`;
}

function checkboxGroup(formId, group) {
  return `
    <fieldset class="check-group form-field-wide">
      <legend>${escapeHtml(group.legend)}</legend>
      ${group.help ? `<p class="field-help">${escapeHtml(group.help)}</p>` : ""}
      <div class="check-grid">
        ${group.options.map((option, index) => {
          const id = controlId(formId, `${group.name}-${index}`);
          return `
            <label class="check-row" for="${id}">
              <input ${attrs({ id, name: group.name, type: "checkbox", value: option, "data-label": group.legend })}>
              <span>${escapeHtml(option)}</span>
            </label>`;
        }).join("")}
      </div>
    </fieldset>`;
}

function renderFormField(formId, field) {
  if (field.kind === "textarea") return textareaField(formId, field);
  if (field.kind === "select") return selectField(formId, field);
  if (field.kind === "checkbox") return checkboxField(formId, field);
  if (field.kind === "checkboxGroup") return checkboxGroup(formId, field);
  return inputField(formId, field);
}

function rescueForm({ id, kicker, title, intro, email, subject, submitLabel, sections }) {
  return `
    <section class="application-section" id="${id}" aria-labelledby="${id}-title">
      <div class="form-intro reveal">
        <p class="section-kicker">${escapeHtml(kicker)}</p>
        <h2 id="${id}-title">${escapeHtml(title)}</h2>
        <p>${escapeHtml(intro)}</p>
      </div>
      <form class="rescue-form reveal delay-1" data-rescue-form data-email="${escapeHtml(email)}" data-subject="${escapeHtml(subject)}">
        ${sections.map((section, index) => `
          <fieldset class="form-step">
            <legend><span>0${index + 1}</span>${escapeHtml(section.legend)}</legend>
            ${section.copy ? `<p class="form-step-copy">${escapeHtml(section.copy)}</p>` : ""}
            <div class="form-grid">
              ${section.fields.map((field) => renderFormField(id, field)).join("")}
            </div>
          </fieldset>`).join("")}
        <div class="form-actions">
          <button class="btn btn-primary" type="submit">${escapeHtml(submitLabel)}</button>
          <p>This prepares a clean email packet to ${escapeHtml(email)} so the rescue gets your answers in one place.</p>
        </div>
        <div class="form-status" data-form-status hidden aria-live="polite"></div>
      </form>
    </section>`;
}

function navMarkup(active) {
  return `
    <a class="skip-link" href="#main">Skip to content</a>
    <header class="site-header" data-header>
      <a class="wordmark" href="/" aria-label="Underdog Heroes home">${bolt()}<span>Underdog Heroes</span></a>
      <button class="nav-toggle" type="button" data-nav-toggle aria-expanded="false" aria-controls="site-nav">
        <span>Menu</span>
      </button>
      <nav class="site-nav" id="site-nav" aria-label="Primary navigation" data-nav>
        ${nav.map((item) => `<a ${attrs({ href: item.href, "aria-current": item.id === active ? "page" : undefined })}>${escapeHtml(item.label)}</a>`).join("")}
        <a class="nav-donate" href="/donate/" ${active === "donate" ? 'aria-current="page"' : ""}>Give Monthly</a>
      </nav>
    </header>`;
}

function footerMarkup() {
  return `
    <footer class="site-footer">
      <div>
        <a class="wordmark footer-mark" href="/">${bolt()}<span>Underdog Heroes</span></a>
        <p>Riverside, California rescue for power-breed dogs most people already counted out.</p>
      </div>
      <div class="footer-links">
        <a href="mailto:${contact.adoptEmail}">Adopt: ${contact.adoptEmail}</a>
        <a href="mailto:${contact.fosterEmail}">Foster: ${contact.fosterEmail}</a>
        <a href="mailto:${contact.infoEmail}">Volunteer: ${contact.infoEmail}</a>
        <a href="${contact.instagram}">Instagram</a>
      </div>
    </footer>`;
}

function layout({ title, description, active, body, pageClass = "" }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AnimalShelter",
    name: "Underdog Heroes",
    url: site.url,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Riverside",
      addressRegion: "CA",
      addressCountry: "US"
    },
    email: contact.infoEmail
  };

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>${escapeHtml(title)} | Underdog Heroes</title>
  <meta name="description" content="${escapeHtml(description)}">
  <meta property="og:title" content="${escapeHtml(title)} | Underdog Heroes">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${site.url}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@700;900&family=Inter:wght@400;500;600;700;800&family=Newsreader:ital,wght@0,400;0,500;0,600;1,500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="${asset("styles.css")}">
  <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
</head>
<body class="${escapeHtml(pageClass)}">
  ${navMarkup(active)}
  <main id="main">
    ${body}
  </main>
  ${footerMarkup()}
  <script src="${asset("client.js")}" type="module"></script>
</body>
</html>`;
}

function hero({
  eyebrow,
  title,
  intro,
  cta = [],
  posterMood = "rain",
  darkPoster = true,
  image = "last-hope",
  posterTitle = "Last Hope",
  posterKicker = "Rescue work"
}) {
  return `
    <section class="hero-section">
      <div class="hero-copy reveal">
        <p class="eyebrow">${escapeHtml(eyebrow)}</p>
        <h1>${title}</h1>
        <p class="lede">${escapeHtml(intro)}</p>
        <div class="hero-actions">${cta.join("")}</div>
      </div>
      <div class="hero-art reveal delay-1">
        ${poster({ id: `hero-${eyebrow.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`, title: posterTitle, kicker: posterKicker, mood: posterMood, dark: darkPoster, image, eager: true })}
      </div>
    </section>`;
}

function actionBand() {
  return `
    <section class="action-band" aria-labelledby="action-title">
      <div class="section-kicker">Four ways in</div>
      <h2 id="action-title">Pick the part of the work you can carry.</h2>
      <div class="action-list">
        ${ctas.map((item, index) => `
          <a class="action-item reveal" href="${escapeHtml(item.href)}">
            <span class="action-number">0${index + 1}</span>
            <span>
              <strong>${escapeHtml(item.label)}</strong>
              <small>${escapeHtml(item.copy)}</small>
            </span>
            ${icon("arrow")}
          </a>`).join("")}
      </div>
    </section>`;
}

function storyTile(story, feature = false) {
  return `
    <article class="story-tile ${feature ? "story-feature" : ""} reveal">
      <a href="/happy-endings/${story.slug}/" aria-label="Read ${escapeHtml(story.name)}'s story">
        ${poster({ id: `story-${story.slug}`, title: story.name, kicker: story.status, mood: story.poster, image: story.image, dark: feature })}
        <div class="story-tile-copy">
          <p class="eyebrow">${escapeHtml(story.status)}</p>
          <h3>${escapeHtml(story.name)}</h3>
          <p>${escapeHtml(story.summary)}</p>
          <span class="text-link">Read the story ${icon("arrow")}</span>
        </div>
      </a>
    </article>`;
}

function homePage() {
  const body = `
    ${hero({
      eyebrow: "Riverside power-breed rescue",
      title: "The dogs no one else will take.",
      intro: "Underdog Heroes rehabs pit bulls, mastiffs, cane corsos, rottweilers, and bully mixes who were written off before anyone did the work.",
      cta: [
        button("Give monthly", "/donate/"),
        button("See happy endings", "/happy-endings/", "secondary")
      ],
      posterMood: "mastiff",
      image: "last-hope",
      posterTitle: "Last Hope",
      posterKicker: "No easy cases"
    })}
    <section class="quote-section reveal">
      <p>The rescue exists for the dogs with no other path. When time, money, behavior, or medical need has made everyone else step back, Underdog Heroes steps closer.</p>
      <span>Underdog Heroes standard</span>
    </section>
    <section class="story-strip" aria-labelledby="proof-title">
      <div class="section-heading">
        <p class="section-kicker">Proof, not slogans</p>
        <h2 id="proof-title">The story is the rescue.</h2>
        <p>Mercy, Rosa, and Betty are the spine of the new site because they show the work better than a mission statement can.</p>
      </div>
      <div class="magazine-grid">
        ${storyTile(stories[0], true)}
        ${stories.slice(1).map((story) => storyTile(story)).join("")}
      </div>
    </section>
    ${actionBand()}
    <section class="split-section split-dark">
      <div class="split-copy reveal">
        <p class="section-kicker">The Village</p>
        <h2>$25 a month means the rescue is not starting from zero.</h2>
        <p>Viral posts help in emergencies. Monthly donors make the next yes possible before the next emergency happens.</p>
        ${button("Join the Village", "/donate/")}
      </div>
      <div class="impact-stack reveal delay-1">
        ${impactNotes.map((item) => `
          <div class="impact-line">
            <span>${escapeHtml(item.label)}</span>
            <strong>${escapeHtml(item.value)}</strong>
          </div>`).join("")}
      </div>
    </section>
    <section class="process-section" aria-labelledby="process-title">
      <div class="section-heading">
        <p class="section-kicker">How a dog gets home</p>
        <h2 id="process-title">We do not rush the dog, or the adopter.</h2>
      </div>
      <ol class="process-list">
        ${processSteps.map((step) => `
          <li class="reveal">
            <span>${escapeHtml(step.step)}</span>
            <h3>${escapeHtml(step.title)}</h3>
            <p>${escapeHtml(step.copy)}</p>
          </li>`).join("")}
      </ol>
    </section>`;
  return layout({
    title: "Power-breed rescue in Riverside",
    description: "Underdog Heroes rehabs power-breed dogs other rescues will not take, then routes the right adopters, fosters, volunteers, and monthly donors into the work.",
    active: "home",
    body,
    pageClass: "home"
  });
}

function happyEndingsPage() {
  const body = `
    ${hero({
      eyebrow: "Happy endings",
      title: "They were not supposed to make it.",
      intro: "These are the dogs the rescue still carries. The ones found in boxes, counted out by vets, called too hard, too broken, too risky.",
      cta: [button("Start with Mercy", "/happy-endings/mercy/"), button("Help the next one", "/donate/", "secondary")],
      posterMood: "doorway",
      image: "home-safe",
      posterTitle: "Home",
      posterKicker: "Earned endings"
    })}
    <section class="story-strip">
      <div class="section-heading wide">
        <p class="section-kicker">The archive</p>
        <h2>Every adopted dog becomes proof.</h2>
        <p>We are starting with the three verified stories from the rescue interview. More stories are waiting in phone photos, DMs, and adopter updates.</p>
      </div>
      <div class="magazine-grid">
        ${stories.map((story, index) => storyTile(story, index === 0)).join("")}
      </div>
    </section>
    ${actionBand()}`;
  return layout({
    title: "Happy endings",
    description: "Completed rescue stories from Underdog Heroes, starting with Mercy, Rosa, and Betty.",
    active: "happy",
    body
  });
}

function storyPage(story) {
  const body = `
    ${hero({
      eyebrow: `${story.status}`,
      title: `${escapeHtml(story.name)}.`,
      intro: story.hook,
      cta: [button("Help the next dog", "/donate/"), button("See more stories", "/happy-endings/", "secondary")],
      posterMood: story.poster,
      image: story.image,
      posterTitle: story.name,
      posterKicker: story.status
    })}
    <article class="story-detail">
      ${story.chapters.map((chapter, index) => `
        <section class="story-chapter ${index % 2 ? "chapter-reverse" : ""}">
          <div class="chapter-art reveal">
            ${poster({ id: `${story.slug}-${index}`, title: chapter.posterTitle, kicker: chapter.kicker, mood: chapter.poster, image: chapter.image, dark: index === 1 })}
          </div>
          <div class="chapter-copy reveal delay-1">
            <p class="section-kicker">Chapter ${index + 1}</p>
            <h2>${escapeHtml(chapter.title)}</h2>
            ${chapter.copy.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}
          </div>
        </section>`).join("")}
      <aside class="inline-ask reveal">
        <div>
          <p class="section-kicker">Present tense</p>
          <h2>Stories like ${escapeHtml(story.name)} do not happen without fosters.</h2>
          <p>Food, supplies, and vet care are covered. What the dog needs is a safe place to decompress and a person willing to go slow.</p>
        </div>
        ${button("Apply to foster", "/foster/")}
      </aside>
    </article>
    <section class="related-section">
      <div class="section-heading">
        <p class="section-kicker">More proof</p>
        <h2>Other dogs who were counted out.</h2>
      </div>
      <div class="related-list">
        ${stories.filter((item) => item.slug !== story.slug).map((item) => storyTile(item)).join("")}
      </div>
    </section>`;

  return layout({
    title: story.name,
    description: story.summary,
    active: "happy",
    body,
    pageClass: "story-page"
  });
}

function dogsPage() {
  const body = `
    ${hero({
      eyebrow: "Available dogs",
      title: "No inventory grid.",
      intro: "Available dogs change fast. We publish a profile only when the notes are current enough to protect the dog and the adopter.",
      cta: [button("Start the adoption gate", "/adopt/"), button("Email adoption", `mailto:${contact.adoptEmail}`, "secondary")],
      posterMood: "list",
      image: "last-hope",
      posterTitle: "Current Dogs",
      posterKicker: "Ask first"
    })}
    <section class="empty-state reveal">
      <p class="section-kicker">Current status</p>
      <h2>Ask for today's adoptable dogs.</h2>
      <p>Before a dog gets a public profile, we verify the details that matter: name, age, breed, personality, rehab status, household requirements, deal-breakers, and current photos. Until then, start with the adoption gate or email the adoption inbox.</p>
      <div class="requirement-grid">
        ${["Who this dog is", "Who can adopt", "Who cannot adopt", "Where they are in rehab", "Photos that show current state", "Application route"].map((item) => `<span>${escapeHtml(item)}</span>`).join("")}
      </div>
      ${button("Read the adoption filter", "/adopt/")}
    </section>
    ${actionBand()}`;
  return layout({
    title: "Available dogs",
    description: "Available dog profiles for Underdog Heroes, structured around truth, fit, and the adoption filter.",
    active: "dogs",
    body
  });
}

function adoptPage() {
  const rules = [
    "You understand decompression. A new home does not mean the dog is ready for parties, road trips, or a camera-perfect first week.",
    "You can afford the dog after the adoption fee. Food, vet care, training, and emergencies are part of saying yes.",
    "You are ready for a hard application. The process includes an application, phone interview, home check, references, and a meet-and-greet when it makes sense.",
    "You will listen when the rescue says a dog is not the right fit. The right match matters more than the fast match."
  ];
  const body = `
    ${hero({
      eyebrow: "Apply to adopt",
      title: "The application is a filter.",
      intro: "We are looking for prepared adopters, not the highest number of applications. If that turns some people away, it is working.",
      cta: [button("Start application", "#adoption-application"), button("Ask first", `mailto:${contact.adoptEmail}`, "secondary")],
      posterMood: "list",
      image: "adopt-application",
      posterTitle: "Apply",
      posterKicker: "Fit matters"
    })}
    <section class="gate-section">
      <div class="section-heading wide">
        <p class="section-kicker">Before you apply</p>
        <h2>Read this like a job description for your home.</h2>
        <p>A beautiful rescue story does not mean the dog is ready for a beautiful first week. New home, new smells, new people, new rules: to the dog, all of it is new.</p>
      </div>
      <div class="rule-list">
        ${rules.map((rule) => `<div class="rule-item reveal">${icon("check")}<p>${escapeHtml(rule)}</p></div>`).join("")}
      </div>
    </section>
    <section class="process-section process-tight">
      <div class="section-heading">
        <p class="section-kicker">Path to home</p>
        <h2>What happens after you apply.</h2>
      </div>
      <ol class="process-list">
        ${["Application", "Phone interview", "Home check", "References", "Meet-and-greet", "Adoption fee and handoff"].map((label, index) => `
          <li class="reveal">
            <span>0${index + 1}</span>
            <h3>${escapeHtml(label)}</h3>
            <p>${escapeHtml(index === 0 ? "Tell the truth. The right details help us protect the dog and your household." : index === 1 ? "We talk through behavior, routine, deal-breakers, and fit." : index === 2 ? "The home setup has to match the dog in front of us." : index === 3 ? "Vet and personal references help confirm readiness." : index === 4 ? "Only when the match looks real do we introduce the dog." : "The support does not end when the dog goes home.")}</p>
          </li>`).join("")}
      </ol>
    </section>
    ${rescueForm({
      id: "adoption-application",
      kicker: "First-party application",
      title: "Apply for the dog in front of you.",
      intro: "This is the filter before the phone call. Tell the truth about your home, your limits, and the kind of dog you can responsibly handle.",
      email: contact.adoptEmail,
      subject: "Adoption application",
      submitLabel: "Prepare adoption application",
      sections: [
        {
          legend: "Applicant",
          copy: "Use the contact information you check fastest.",
          fields: [
            { name: "fullName", label: "Full name", required: true, autocomplete: "name" },
            { name: "email", label: "Email address", type: "email", required: true, autocomplete: "email" },
            { name: "phone", label: "Phone number", type: "tel", required: true, autocomplete: "tel" },
            { name: "cityState", label: "City and state", required: true, autocomplete: "address-level2" },
            { kind: "select", name: "dogInterest", label: "Who are you applying for?", required: true, options: ["A specific dog", "Best match", "Not sure yet"] },
            { name: "dogName", label: "Dog name, if known" }
          ]
        },
        {
          legend: "Home",
          copy: "The home setup has to match the dog, not the other way around.",
          fields: [
            { kind: "select", name: "housing", label: "Housing", required: true, options: ["Own", "Rent", "Live with family", "Other"] },
            { kind: "select", name: "yard", label: "Yard or outdoor access", required: true, options: ["Private fenced yard", "Shared yard", "No yard", "Other"] },
            { name: "household", label: "Adults and children in the home", required: true },
            { name: "currentPets", label: "Current pets", required: true, help: "List species, age, sex, and whether they are fixed." },
            { kind: "textarea", name: "dailyRoutine", label: "What does a normal weekday look like?", required: true, rows: 4 }
          ]
        },
        {
          legend: "Fit",
          copy: "Power-breed rescue asks more from the adopter. Be specific.",
          fields: [
            { kind: "textarea", name: "experience", label: "Experience with power breeds or hard rescue dogs", required: true },
            { kind: "textarea", name: "decompressionPlan", label: "How will you handle the first two weeks?", required: true, help: "Think crate, quiet space, visitors, walks, car rides, kids, and other pets." },
            { kind: "select", name: "hoursAlone", label: "How long would the dog be alone on a normal day?", required: true, options: ["0 to 2 hours", "3 to 5 hours", "6 to 8 hours", "More than 8 hours"] },
            { kind: "select", name: "trainingSupport", label: "Are you open to trainer support if needed?", required: true, options: ["Yes", "Yes, if the rescue recommends it", "Not sure", "No"] },
            { kind: "textarea", name: "dealBreakers", label: "Your deal-breakers", required: true, help: "Examples: cats, small dogs, toddlers, leash reactivity, medical needs, separation anxiety." },
            { kind: "select", name: "budget", label: "Can you handle ongoing food, vet, training, and emergency costs?", required: true, options: ["Yes", "Mostly, with a realistic budget", "I need to talk through costs", "No"] }
          ]
        },
        {
          legend: "References and agreements",
          fields: [
            { name: "vetReference", label: "Vet reference, if you have one" },
            { name: "personalReference", label: "Personal reference", required: true },
            { kind: "checkbox", name: "truth", label: "Everything in this application is true.", required: true },
            { kind: "checkbox", name: "homeCheck", label: "I understand a home check may be required.", required: true },
            { kind: "checkbox", name: "hardTruth", label: "I understand the rescue may say a dog is not the right fit.", required: true }
          ]
        }
      ]
    })}`;
  return layout({
    title: "Apply to adopt",
    description: "The Underdog Heroes adoption gate for prepared power-breed adopters.",
    active: "adopt",
    body
  });
}

function fosterPage() {
  const benefits = [
    ["Temporary", "You are not signing up forever. You are giving one dog a safe place while the right home is found."],
    ["Covered", "Supplies and financial support are covered by the rescue while the dog is in foster care."],
    ["Coached", "You are not left alone with a hard dog and a wish. The rescue stays involved."],
    ["Urgent", "A foster spot can be the difference between taking the dog and walking away."]
  ];
  const body = `
    ${hero({
      eyebrow: "Apply to foster",
      title: "Fosters are where rehab happens.",
      intro: "A shelter pull is only the first yes. The dog still needs a home, a routine, and someone patient enough to let them become safe.",
      cta: [button("Start foster form", "#foster-application"), button("Email fostering", `mailto:${contact.fosterEmail}`, "secondary")],
      posterMood: "pulse",
      image: "foster-room",
      posterTitle: "Foster",
      posterKicker: "Safe routine"
    })}
    <section class="benefit-section">
      <div class="section-heading">
        <p class="section-kicker">What fosters need to know</p>
        <h2>Fostering is free, temporary, and coached.</h2>
      </div>
      <div class="benefit-list">
        ${benefits.map(([title, copy]) => `
          <article class="benefit-item reveal">
            <h3>${escapeHtml(title)}</h3>
            <p>${escapeHtml(copy)}</p>
          </article>`).join("")}
      </div>
    </section>
    <section class="split-section">
      <div class="split-copy reveal">
        <p class="section-kicker">Baseline requirements</p>
        <h2>The dog needs time, not chaos.</h2>
        <p>Current foster requirements include being at least 18 and being gone no more than six hours per day. Final placement still depends on the specific dog.</p>
      </div>
      <div class="poster-column reveal delay-1">
        ${poster({ id: "foster-door", title: "Safe Room", kicker: "Decompress", mood: "doorway", image: "foster-room" })}
      </div>
    </section>
    ${rescueForm({
      id: "foster-application",
      kicker: "First-party foster form",
      title: "Open your home before a dog runs out of options.",
      intro: "A foster home gives the rescue time to assess, decompress, and place the dog correctly. Supplies and support are part of the deal.",
      email: contact.fosterEmail,
      subject: "Foster application",
      submitLabel: "Prepare foster application",
      sections: [
        {
          legend: "Applicant",
          fields: [
            { name: "fullName", label: "Full name", required: true, autocomplete: "name" },
            { name: "email", label: "Email address", type: "email", required: true, autocomplete: "email" },
            { name: "phone", label: "Phone number", type: "tel", required: true, autocomplete: "tel" },
            { name: "cityState", label: "City and state", required: true },
            { kind: "select", name: "ageConfirm", label: "Are you at least 18?", required: true, options: ["Yes", "No"] }
          ]
        },
        {
          legend: "Home and schedule",
          fields: [
            { kind: "select", name: "housing", label: "Housing", required: true, options: ["Own", "Rent", "Live with family", "Other"] },
            { kind: "select", name: "hoursAway", label: "How long are you away on a normal day?", required: true, options: ["0 to 2 hours", "3 to 5 hours", "6 hours", "More than 6 hours"] },
            { name: "currentPets", label: "Current pets", required: true },
            { kind: "textarea", name: "separationPlan", label: "Where would a foster dog decompress?", required: true, rows: 4 }
          ]
        },
        {
          legend: "Foster fit",
          fields: [
            { kind: "checkboxGroup", name: "fosterTypes", legend: "Dogs you can realistically foster", options: ["Large power breed", "Medical recovery", "Shy or shut down", "Dog selective", "Puppies", "Emergency short hold"] },
            { kind: "textarea", name: "experience", label: "Relevant dog experience", required: true },
            { kind: "select", name: "transport", label: "Can you transport to vet visits or meet-and-greets?", required: true, options: ["Yes", "Sometimes", "No"] },
            { kind: "select", name: "timeline", label: "When could you start?", required: true, options: ["This week", "This month", "Later", "I need to talk first"] }
          ]
        },
        {
          legend: "Agreements",
          fields: [
            { kind: "checkbox", name: "temporary", label: "I understand fostering is temporary care, not a trial adoption.", required: true },
            { kind: "checkbox", name: "support", label: "I will follow rescue guidance for decompression, training, vet care, and introductions.", required: true },
            { kind: "checkbox", name: "truth", label: "Everything in this foster form is true.", required: true }
          ]
        }
      ]
    })}`;
  return layout({
    title: "Apply to foster",
    description: "Foster with Underdog Heroes. Supplies are covered, support is included, and the work directly creates room for another rescue.",
    active: "foster",
    body
  });
}

function volunteerPage() {
  const body = `
    ${hero({
      eyebrow: "Volunteer",
      title: "More hands means more dogs.",
      intro: "People assume enough help is already there. It is not. More hands means more dogs get walked, transported, treated, and placed.",
      cta: [button("Start volunteer form", "#volunteer-application"), button("Email volunteer team", `mailto:${contact.infoEmail}`, "secondary")],
      posterMood: "list",
      image: "volunteer-tools",
      posterTitle: "Volunteer",
      posterKicker: "Real help"
    })}
    <section class="roles-section">
      <div class="section-heading wide">
        <p class="section-kicker">Starting role board</p>
        <h2>Specific asks beat generic goodwill.</h2>
        <p>These are the kinds of jobs that turn willingness into actual help: walking, transport, medical care support, and admin triage.</p>
      </div>
      <div class="role-list">
        ${volunteerRoles.map((role) => `
          <article class="role-item reveal">
            <p class="eyebrow">${escapeHtml(role.need)}</p>
            <h3>${escapeHtml(role.title)}</h3>
            <dl>
              <div><dt>When</dt><dd>${escapeHtml(role.when)}</dd></div>
              <div><dt>Where</dt><dd>${escapeHtml(role.where)}</dd></div>
              <div><dt>Experience</dt><dd>${escapeHtml(role.experience)}</dd></div>
            </dl>
          </article>`).join("")}
      </div>
    </section>
    ${rescueForm({
      id: "volunteer-application",
      kicker: "First-party volunteer form",
      title: "Tell us where you can actually help.",
      intro: "Specific availability beats vague enthusiasm. Pick the roles you can show up for, then the rescue can route you cleanly.",
      email: contact.infoEmail,
      subject: "Volunteer application",
      submitLabel: "Prepare volunteer form",
      sections: [
        {
          legend: "Contact",
          fields: [
            { name: "fullName", label: "Full name", required: true, autocomplete: "name" },
            { name: "email", label: "Email address", type: "email", required: true, autocomplete: "email" },
            { name: "phone", label: "Phone number", type: "tel", required: true, autocomplete: "tel" },
            { name: "cityState", label: "City and state", required: true }
          ]
        },
        {
          legend: "Role fit",
          fields: [
            { kind: "checkboxGroup", name: "roles", legend: "Ways you can help", options: ["Dog walking", "Transport", "Medical care support", "Event help", "Admin or DM triage", "Photography or video", "Fundraising", "Supplies pickup"] },
            { kind: "textarea", name: "availability", label: "Availability", required: true, help: "List days, times, and how often you can show up." },
            { kind: "select", name: "largeDogComfort", label: "Comfort with large power-breed dogs", required: true, options: ["Experienced", "Comfortable with guidance", "New but willing to learn", "Not comfortable"] },
            { kind: "select", name: "transport", label: "Do you have reliable transportation?", required: true, options: ["Yes", "Sometimes", "No"] }
          ]
        },
        {
          legend: "Notes",
          fields: [
            { kind: "textarea", name: "skills", label: "Skills, limits, or questions", rows: 5 },
            { kind: "checkbox", name: "followThrough", label: "I understand rescue work depends on people following through when they commit.", required: true }
          ]
        }
      ]
    })}`;
  return layout({
    title: "Volunteer",
    description: "Specific volunteer roles for Underdog Heroes, built to route Riverside helpers into real needs.",
    active: "volunteer",
    body
  });
}

function donatePage() {
  const body = `
    ${hero({
      eyebrow: "Donate",
      title: "Do not wait for the next emergency.",
      intro: "Most support comes from recurring donors or from severe medical cases going viral. The Village gives the rescue a base before a dog is in crisis.",
      cta: [button("Give now", contact.currentDonateUrl), button("Email donations", `mailto:${contact.donateEmail}`, "secondary")],
      posterMood: "pulse",
      image: "donate-village",
      posterTitle: "The Village",
      posterKicker: "Monthly base"
    })}
    <section class="donate-core">
      <div class="village-panel reveal">
        <p class="section-kicker">The Village</p>
        <h2>$25<span>/month</span></h2>
        <p>The monthly donor circle. The point is not one dramatic gift. The point is a rescue fund we can count on when the next dog needs a yes.</p>
        ${button("Give now", contact.currentDonateUrl)}
      </div>
      <div class="donate-copy reveal delay-1">
        <h2>Small monthly money becomes security.</h2>
        <p>One gift can feel small from the outside. Pooled together, those gifts become food, emergency medical care, medicine, shelter, bedding, overhead, and staff support.</p>
        <p>Named receipts make the impact sharper. The core truth is already clear: recurring support lets the rescue act before a story goes viral.</p>
      </div>
    </section>
    <section class="impact-section">
      <div class="section-heading">
        <p class="section-kicker">Other ways to give</p>
        <h2>Tax receipts and donation questions.</h2>
        <p>Underdog Heroes is a registered 501(c)(3). EIN: 84-4188282. For Venmo, PayPal, Zelle, mailed checks, or receipt requests, email Donations@Underdogheroes.org.</p>
      </div>
    </section>`;
  return layout({
    title: "Donate",
    description: "Donate monthly to Underdog Heroes and help create a stable base for urgent power-breed rescue work.",
    active: "donate",
    body,
    pageClass: "donate-page"
  });
}

function aboutPage() {
  const body = `
    ${hero({
      eyebrow: "About the rescue",
      title: "Truth is the operating model.",
      intro: "Underdog Heroes started with one foster dog and became a rescue for the dogs most people are not equipped to handle.",
      cta: [button("Volunteer", "/volunteer/"), button("Contact", "/contact/", "secondary")],
      posterMood: "mastiff",
      image: "last-hope",
      posterTitle: "Built",
      posterKicker: "For hard cases"
    })}
    <section class="longform-section">
      <div class="longform-copy reveal">
        ${founderStory.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}
      </div>
      <aside class="founder-aside reveal delay-1">
        <p class="section-kicker">Founder and President</p>
        <h2>Shoshi Gamliel</h2>
        <p>Her standard is simple: tell the truth about the dog, do the work before placement, and keep supporting the adopter after the dog goes home.</p>
      </aside>
    </section>`;
  return layout({
    title: "About",
    description: "The Underdog Heroes founder story and rescue philosophy.",
    active: "about",
    body
  });
}

function faqPage() {
  const body = `
    ${hero({
      eyebrow: "FAQ",
      title: "The DMs, answered once.",
      intro: "The same rescue basics should not live only in DMs. Start here before you apply, foster, volunteer, or donate.",
      cta: [button("Apply to adopt", "/adopt/"), button("Contact", "/contact/", "secondary")],
      posterMood: "list",
      image: "adopt-application",
      posterTitle: "Answers",
      posterKicker: "Before DMs"
    })}
    <section class="faq-section" aria-labelledby="faq-title">
      <div class="section-heading">
        <p class="section-kicker">Straight answers</p>
        <h2 id="faq-title">No sugar coating.</h2>
      </div>
      <div class="faq-list">
        ${faqs.map((faq) => `
          <details class="faq-item reveal">
            <summary>${escapeHtml(faq.q)}</summary>
            <p>${escapeHtml(faq.a)}</p>
          </details>`).join("")}
      </div>
    </section>`;
  return layout({
    title: "FAQ",
    description: "Straight answers about adopting, fostering, donating, and power-breed rescue with Underdog Heroes.",
    active: "faq",
    body
  });
}

function contactPage() {
  const body = `
    ${hero({
      eyebrow: "Contact",
      title: "Route yourself to the right inbox.",
      intro: "The faster the message lands in the right place, the faster the work gets back to the dogs.",
      cta: [button("Email general inbox", `mailto:${contact.infoEmail}`), button("Donate", "/donate/", "secondary")],
      posterMood: "doorway",
      image: "volunteer-tools",
      posterTitle: "Inbox",
      posterKicker: "Route clearly"
    })}
    <section class="contact-section">
      <div class="contact-list">
        ${[
          ["Adoption", contact.adoptEmail],
          ["Fostering", contact.fosterEmail],
          ["Donations", contact.donateEmail],
          ["General and volunteer", contact.infoEmail]
        ].map(([label, email]) => `
          <a class="contact-item reveal" href="mailto:${email}">
            ${icon("mail")}
            <span>
              <strong>${escapeHtml(label)}</strong>
              <small>${escapeHtml(email)}</small>
            </span>
          </a>`).join("")}
      </div>
      <div class="mailing-block reveal">
        <p class="section-kicker">Mailing address</p>
        <p>19069 Van Buren Blvd. Ste 114 PMB 144<br>Riverside, CA 92508</p>
      </div>
    </section>`;
  return layout({
    title: "Contact",
    description: "Contact Underdog Heroes for adoption, fostering, volunteering, donation questions, and general inquiries.",
    active: "contact",
    body
  });
}

async function write(path, content) {
  const full = `${outDir}${path}`;
  await mkdir(dirname(full), { recursive: true });
  await writeFile(full, content, "utf8");
}

async function copyAsset(from, to) {
  const full = `${outDir}${to}`;
  await mkdir(dirname(full), { recursive: true });
  await copyFile(`${root}${from}`, full);
}

async function copyDir(from, to) {
  const source = `${root}${from}`;
  const target = `${outDir}${to}`;
  await mkdir(target, { recursive: true });
  for (const entry of await readdir(source, { withFileTypes: true })) {
    const fromPath = `${from}/${entry.name}`;
    const toPath = `${to}/${entry.name}`;
    if (entry.isDirectory()) {
      await copyDir(fromPath, toPath);
    } else {
      await copyAsset(fromPath, toPath);
    }
  }
}

async function build() {
  await rm(outDir, { recursive: true, force: true });
  await mkdir(outDir, { recursive: true });

  await copyAsset("src/styles.css", "assets/styles.css");
  await copyAsset("src/client.js", "assets/client.js");
  await copyDir("src/assets/images", "assets/images");

  await write("index.html", homePage());
  await write("happy-endings/index.html", happyEndingsPage());
  for (const story of stories) {
    await write(`happy-endings/${story.slug}/index.html`, storyPage(story));
  }
  await write("dogs/index.html", dogsPage());
  await write("adopt/index.html", adoptPage());
  await write("foster/index.html", fosterPage());
  await write("volunteer/index.html", volunteerPage());
  await write("donate/index.html", donatePage());
  await write("about/index.html", aboutPage());
  await write("faq/index.html", faqPage());
  await write("contact/index.html", contactPage());

  await write("robots.txt", "User-agent: *\nAllow: /\nSitemap: https://www.underdogheroes.org/sitemap.xml\n");
  await write("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[
  "/",
  "/happy-endings/",
  ...stories.map((story) => `/happy-endings/${story.slug}/`),
  "/dogs/",
  "/adopt/",
  "/foster/",
  "/volunteer/",
  "/donate/",
  "/about/",
  "/faq/",
  "/contact/"
].map((path) => `  <url><loc>https://www.underdogheroes.org${path}</loc></url>`).join("\n")}
</urlset>
`);

  console.log(`Built ${outDir}`);
}

build();
