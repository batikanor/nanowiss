# Hosting and publishing nanoWISS

## Current owner choice

On 28 October 2026 the owner explicitly chose **GitHub Pages for production** and
**Hetzner for staging**, creating a nanoWISS-specific exception to the earlier
all-Hetzner preference. No production DNS or nameserver change is needed.
Production remains https://www.nanowiss.com/ and staging remains
https://staging.nanowiss.com/. Preserve domain registration, Google mail records
and unrelated services. Other projects and providers remain outside this exception.

Production uses the repository `batikanor/nanowiss`, generated branch `gh-pages`
(root), custom domain `www.nanowiss.com` and enforced HTTPS. Source is on `master`.
The current site is informational; review GitHub Pages' transaction/SaaS limits
before changing its business functionality.

## Prepare and publish

Use a clean source checkout and the personal Git identity. Run:

```sh
npm run test:legal
npm run test:routes
CI=true npm test -- --watchAll=false --runInBand
npm run build:release
npm run deploy
```

`npm run deploy` runs the release build through `predeploy`, then the scoped
GitHub publisher. The publisher checks source cleanliness, production domain,
repository, identity and the actual Europe/Berlin time. It writes a fresh static
commit on the existing `gh-pages` history without changing the source checkout or
forcing the branch. Its ordinary Git push runs the existing brand pre-push hook.
Keep truthful commit dates; never commit or push Mon–Fri 09:00–18:00 Berlin.

The generated artifact includes CNAME, .nojekyll, the SPA fallback and direct
static entry files for the public company/legal pages and their legacy aliases.
Do not publish unrelated unfinished reconstruction experiments. After the Pages
build succeeds, compare the live release metadata and all artifact checksums,
check direct legal routes in EN/DE/TR, footer links, team, mobile layout,
missing-asset 404s and absence of removed profiles. A successful software check
is not a certification of legal compliance.

## Privacy data and review

`src/content/legal-details.json` describes **GitHub production**, including its
published visitor-IP security logging. The owner instructed that Google's
existing processing terms be assumed accepted, and approved deletion of resolved
enquiries after 12 months except necessary contract/legal retention. Keep that
assumption explicitly recorded; do not turn it into independently verified
account acceptance. GitHub's documented security-role basis is scoped, and other
hosting processing roles remain unassessed. Review records and the validator
preserve those limits instead of claiming a verified contract.

`src/content/legal-details.staging.json` retains the separately observed Hetzner
hosting facts. Use `npm run build:staging` for that environment; never copy the
GitHub production hosting text into a Hetzner staging artifact or the reverse.
The legal content review confirms the content against established practices and
recorded owner decisions, not that all German/EU requirements apply or are met.
The EU office and EU product/service offerings remain plans/work in progress.

## Hetzner staging

Staging uses `nanowiss-staging-web` and immutable releases under
`/srv/apps/nanowiss-staging/releases`. Keep its existing HTTPS route, noindex
headers, restrictive robots and no-store policy. Do not add any visible staging,
demo, review or draft label. Run the server's storage and analytics gates before
changes, verify uploaded checksums and switch `current` atomically, retaining the
previous artifact. Keep all staging assets on Hetzner.

## Recovery

The pre-update production is preserved byte-for-byte under
`output/production-recovery/20261028T222254375547Z` and on Hetzner outside the web
root. Original `gh-pages` commit: e34a1ccec4c99a00967ff6fffd959a1b1bf20abe.
Archive SHA-256: 37f52c1a35cb3e140b09616558437c871bbc06578ddf9251ea47a46cd2571211.
All 54 files matched live production and the private Hetzner recovery backend.
To restore production, publish those exact old files in a new normal gh-pages
commit on top of the latest branch tip; retain CNAME and verify the resulting
Pages deployment. Do not force-rewrite the branch or alter DNS.

The unactivated private Hetzner production backend and inactive edge fragment
remain recovery/preparation material. They are not production and do not replace
staging. The earlier migration proposal was superseded by the owner's hosting
choice; historical receipts and notes are retained under docs/history and
docs/evidence.
