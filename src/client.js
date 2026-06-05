const toggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");

document.documentElement.classList.add("js");

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const isOpen = document.body.classList.toggle("nav-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.addEventListener("click", (event) => {
    const target = event.target;
    if (target instanceof HTMLAnchorElement) {
      document.body.classList.remove("nav-open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
}

const revealItems = [...document.querySelectorAll(".reveal")];

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const forms = [...document.querySelectorAll("[data-rescue-form]")];

function escapeSelector(value) {
  if (window.CSS && typeof window.CSS.escape === "function") return window.CSS.escape(value);
  return value.replace(/["\\]/g, "\\$&");
}

function labelForField(form, name) {
  const field = form.querySelector(`[name="${escapeSelector(name)}"]`);
  if (!field) return name;
  return field.dataset.label || field.closest("fieldset")?.querySelector("legend")?.textContent?.trim() || name;
}

function buildSummary(form) {
  const data = new FormData(form);
  const names = [...new Set([...data.keys()])];
  const lines = [
    form.dataset.subject || "Application",
    "Underdog Heroes",
    ""
  ];

  for (const name of names) {
    const values = data.getAll(name).map((value) => String(value).trim()).filter(Boolean);
    if (!values.length) continue;
    lines.push(`${labelForField(form, name)}: ${values.join(", ")}`);
  }

  return lines.join("\n");
}

function showFormStatus(form, summary) {
  const status = form.querySelector("[data-form-status]");
  if (!status) return;

  const email = form.dataset.email || "info@underdogheroes.org";
  const subject = form.dataset.subject || "Underdog Heroes form";
  const mailto = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(summary)}`;

  status.hidden = false;
  status.className = "form-status is-success";
  status.replaceChildren();

  const title = document.createElement("h3");
  title.textContent = "Application email ready.";

  const copy = document.createElement("p");
  copy.textContent = `Open the email draft, review it, then send it to ${email}.`;

  const textarea = document.createElement("textarea");
  textarea.readOnly = true;
  textarea.value = summary;
  textarea.setAttribute("aria-label", "Prepared application text");

  const actions = document.createElement("div");
  actions.className = "status-actions";

  const mail = document.createElement("a");
  mail.className = "btn btn-primary";
  mail.href = mailto;
  mail.textContent = "Open email draft";

  const copyButton = document.createElement("button");
  copyButton.className = "btn btn-secondary";
  copyButton.type = "button";
  copyButton.textContent = "Copy application";
  copyButton.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(summary);
      copyButton.textContent = "Copied";
    } catch {
      textarea.focus();
      textarea.select();
      copyButton.textContent = "Select text below";
    }
  });

  actions.append(mail, copyButton);
  status.append(title, copy, actions, textarea);
  status.scrollIntoView({ behavior: "smooth", block: "start" });
}

for (const form of forms) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.reportValidity()) {
      const status = form.querySelector("[data-form-status]");
      if (status) {
        status.hidden = false;
        status.className = "form-status is-error";
        status.textContent = "Please finish the required fields before preparing the application.";
      }
      return;
    }

    showFormStatus(form, buildSummary(form));
  });
}
