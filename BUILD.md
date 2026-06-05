# Build Notes

This is a no-dependency static build for the Underdog Heroes redesign.

## Commands

```powershell
cd "C:\Users\Miguel\Desktop\underdog heroes"
npm.cmd run build
npm.cmd run dev
```

If PowerShell blocks `npm`, run the scripts directly:

```powershell
cd "C:\Users\Miguel\Desktop\underdog heroes"
node scripts\build.mjs
node scripts\serve.mjs
```

The local preview server runs at:

```text
http://localhost:4173
```

## Structure

- `src/site-data.mjs`: page content, links, Q&A-derived stories, contact data.
- `src/styles.css`: shared visual system and responsive layout.
- `src/client.js`: mobile nav and reveal behavior.
- `scripts/build.mjs`: static site generator.
- `scripts/serve.mjs`: local static server.
- `dist/`: generated deployable site.

## Current live integrations

The adopt, foster, and volunteer flows are now forms in the static site. Until a direct submission service is connected, each form validates answers and prepares an organized email to the right inbox.

Donations still link to the current live donation endpoint until Givebutter or another processor is approved:

- Donate: `https://www.underdogheroes.org/donate-today`

## Content gaps before final launch

- Current adoptable dog profiles and photos.
- Real happy-ending photos and adopter quotes for Mercy, Rosa, Betty.
- Donation cost numbers from real receipts.
- Confirm the monthly donor program name.
- Confirm Tally, Givebutter, and Sanity setup decisions.
