# nanoWISS Agent Rules

This repository is for the nanoWISS company website. Every change must serve the company, its team, products, partners, and scientific/business story.

## Brand Rule

Do not write user-facing website copy that advertises the implementation technology or the web software itself.

Forbidden direction:
- "A live WebGL product hero for nanoWISS"
- "The website behaves like the machine"
- "Three.js core"
- "Static-hosting safe"
- "Pointer-reactive"
- "Gaussian splat inspired"
- Any copy whose main message is how the page was built instead of what nanoWISS does.

Required direction:
- Lead with nanoWISS as a company.
- Explain the nanoparticle platform, AgroWISS, health/agriculture applications, proof, team, partners, and contact path.
- Mention visual or interactive behavior only when it helps explain nanoWISS, never as the main selling point.
- Keep hidden `/alternative/...` pages company-first too. They may look visually ambitious, but they must read like finished nanoWISS pages, not tech demos.

## Pre-Push Review

Every push must run:

```bash
npm run brand:check
```

The repository uses `.githooks/pre-push` to run this automatically. If the hook fails, rewrite the copy so it is nanoWISS-first before pushing.
