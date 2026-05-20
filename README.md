# Underdog Heroes

Static website build for Underdog Heroes Rescue.

## Run Locally

```powershell
cd "C:\Users\Miguel\Desktop\underdog heroes"
npm.cmd run build
npm.cmd run dev
```

Local preview:

```text
http://localhost:4173
```

## Project Structure

- `src/site-data.mjs`: site content, page data, stories, contact details, and form structure.
- `src/styles.css`: visual system and responsive layout.
- `src/client.js`: mobile navigation, reveal behavior, and first-party form packet handling.
- `src/assets/images/`: generated WebP rescue visuals.
- `scripts/build.mjs`: static site generator.
- `scripts/serve.mjs`: local static server.
- `dist/`: generated deployable site.

## Notes

Adopt, foster, and volunteer are first-party static forms. They validate locally and prepare clean email packets to the correct rescue inbox until a direct submission service is connected.
