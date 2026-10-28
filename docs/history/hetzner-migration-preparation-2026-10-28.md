# Hosting and publishing nanoWISS

Owner policy dated 12 October 2026: use Hetzner for all production, staging,
preview, demo, public evidence, runtime, database, upload, and asset hosting.
Vercel services require direct explicit approval for this project, environment,
and service. Existing configuration is not approval.

## Current state — checked 27 October 2026

The public website still responds with `Server: GitHub.com`; the historical
publisher pushed generated files to `gh-pages`. This is evidence of the existing
release, not authorization to publish there again. The GitHub Pages publisher has
been disabled in `package.json`. Source code may remain on GitHub.

A Hetzner production target, actual processor arrangements, location, logging
configuration, and production rollback procedure have not been verified for this repository.
Do not describe the live site as Hetzner-hosted until it has been migrated and
verified. Do not publish the legal drafts to production in their current
incomplete state. The isolated review deployment does not clear this gate.

## Production migration preparation — 28 October 2026

The exact old production release has now been preserved and verified on a separate private Hetzner production backend. This is preparation only: the public production domain remains on GitHub Pages, and the latest candidate has not been published there. Account-specific processing-agreement evidence and production DNS access remain unavailable. See [PRODUCTION-CUTOVER.md](PRODUCTION-CUTOVER.md) for the verified target, recovery hashes, remaining account checks and exact scoped DNS changes. Do not change DNS before the new release and rollback checks pass.

## Current legal-language release — 28 October 2026

Release `20261028T221450Z-legal-languages` is live on
[staging.nanowiss.com](https://staging.nanowiss.com/) and the retained temporary
hostname. Shared footer labels are English **Legal Notice** and **Privacy Policy**.
Both legal pages default to English and offer English, Deutsch and Türkçe links.
German and Turkish are shareable with `?lang=de` and `?lang=tr`; legal links keep
the selected language. Selection uses the URL without introducing cookies or
persistent browser storage. Existing paths and legacy aliases remain valid.
Document language, page title, description, Open Graph locale and canonical URL
follow the selected translation. Ordinary company pages remain English.

The source facts and confirmation flags were retained, as were the owner's
presentation requirements. English and Turkish translate the existing German
notices; they do not substitute another jurisdiction's law or clear production
release checks. The main bundle is `main.1300ecc0.js`, SHA-256
`3dfcf986bdf597ec6e7b433fbd96b1a6ed8f6b127ea0fe784d9e77150f890ce7`.

All 24 React checks, the brand check and build passed. Storage and analytics
gates passed at 22:12:57 UTC; an earlier storage check detected an unrelated
metrics collector starting, made no deletions and was inspected before retry.
All 53 uploaded checksums matched before the atomic `current` switch. Direct
browser checks passed for both notices in all three languages, language changes,
Back navigation, invalid-language fallback and 390px mobile layout. No visible
status labels or reserved padding were added. Prior release
`20261028T114613Z-workspace` remains available for rollback. No Git commit/push,
production change or DNS change was made. See
[the release receipt](evidence/legal-languages-2026-10-28.json).

## Visitor-facing presentation — owner instruction, 28 October 2026

Staging must present normal company content. Do not add visible environment or
release-status labels, banners, badges, warnings, footer bars, or reserved layout
padding. This prohibits staging, preview, demo, under-construction, and draft
notices, including a legal-review warning. Never reintroduce the earlier
injected bottom notice or the orange legal draft warning.

Keep missing facts, confirmation status, and release blockers in internal
maintainer documentation, metadata, and receipts. Do not invent facts or change
the legal confirmation flags to make the presentation look complete. The legal
release check, hosting policy, storage/analytics gates, and production readiness
requirements remain unchanged. Retain staging's noindex response headers,
robots restrictions, and no-store policy without adding visible status copy.

This supersedes earlier instructions to make staging or legal review status
visible. The original release descriptions below are historical records. The notice-removal
release was `20261028T114613Z-workspace`, activated on 28 October after the storage
and analytics gates passed at 11:44:06 UTC. It removes the injected HTML banner,
reserved body padding, legal-page warning and alternative-page demo labels.
All 53 deployed file checksums matched before the atomic symlink switch; the
previous release is retained. The new main bundle is `main.9dcc8bd5.js`, SHA-256
`2f6520fb827a2efb611021ce21a69befb582f110e2ef4bfa1b5b0788efcb05eb`.
Desktop/mobile browser checks confirm normal footers, no added notices and no
reserved body padding. The legal navigation tests (9/9), brand check and build
passed. No Git commit or push was made. See [the current release receipt](evidence/presentation-update-2026-10-28.json).

## Scheduled production attempt — 27 October 2026, 18:10 CET

The scheduled check ran after the commit/push restriction ended. Brand checks,
10 validator tests and 10 React tests passed. `npm run build:release` stopped
at the legal check with 15 outstanding facts/confirmations, including actual
hosting/email processing details and applicable processor agreements. No flags
were set merely to pass validation; no production artifact was published.

At the 27 October 2026, 18:10 CET check, public DNS still pointed
`www.nanowiss.com` to GitHub Pages. Direct production `/impressum` and
`/datenschutz` requests returned 404. `staging.nanowiss.com` had no DNS record,
and no configured DNS access was found in this project. The Hetzner preview
below remained available. No source commit/push, production
change, server mutation or DNS cutover was made during this attempt. The
one-time deployment automation was paused so it cannot recur. Resolve the
actual processing facts and DNS access before retrying; existing company,
address, privacy contact and registry 1119202 are already recorded.

See [the attempt receipt](evidence/scheduled-release-2026-10-27.json).

## Original isolated staging release — 27 October 2026

On 27 October 2026, the working-tree build was deployed separately from production
on the existing Hetzner server at `157.180.20.129`:
[staging-nanowiss.157-180-20-129.sslip.io](https://staging-nanowiss.157-180-20-129.sslip.io).
Release `20261027T123954Z-workspace` was uploaded directly without a Git commit
or push. HTTPS and desktop/mobile browser checks passed, including the team,
footer links and both draft legal pages. That release's public main bundle matches
the rebuilt local artifact (`main.53d88519.js`, SHA-256
`911b7c6565f9889c686459d32c98a89476db6b0e4477e8594ab7bed18c0ddd24`).
The existing production website and its DNS remain unchanged.

The `sslip.io` name supplies DNS resolution only. The website, JavaScript,
styles, images and videos are served from Hetzner; no website content or assets
are hosted by the DNS service. This address provides a preview without a domain
or nameserver migration.

The staging layout uses the existing edge Caddy reverse proxy and a separate
`nanowiss-staging-web` static Caddy container, with the website mounted read-only.
The image `nanowiss-static:caddy-2.10.2-nocaps-v1` removes Caddy's binary file
capability so it can run as UID 1000 with all container capabilities dropped.
No host port is exposed by this container; only the edge proxy publishes HTTPS.
The vhost sets `X-Robots-Tag: noindex, nofollow, noarchive` and `Cache-Control:
no-store` on all responses; staging robots disallows crawling. The original
release injected a visible preview notice into its staged HTML, leaving the
source build intact. This historical behavior is superseded by the owner's
28 October presentation instruction above; do not restore that notice.
Each upload occupies an immutable directory under
`/srv/apps/nanowiss-staging/releases/<release>`; the `current` symlink selects the
served release. Keep staging's virtual host, container and release directories
separate from production and other applications. Retain the previous release so
that `current` can be switched back atomically. At its initial activation, this
first staging release had no previous staging version. Later releases must
retain their predecessor for rollback. To withdraw only the temporary `sslip.io` hostname,
remove only `/srv/apps/maptheory/shared/caddy-sites/nanowiss-staging.caddy`,
then validate and gracefully reload the edge Caddy configuration. Keep
`nanowiss-staging-web` running while the custom staging hostname uses it.
Subsequent releases should use an atomic symlink switch;
production rollback testing remains a separate prerequisite.
The existing storage and analytics deployment gates passed at 12:38 UTC on
27 October 2026; rerun the required gates for subsequent deployments.

The desired custom address is `https://staging.nanowiss.com`. It had no DNS
record during the 27 October deployment; no DNS access or DNS changes were used
to publish the temporary preview. The custom hostname's 28 October DNS update
and activation status are recorded below. Neither hostname requires changing
the domain's nameservers, registration, production hostnames or unrelated
records.

Keep deployment evidence under `/srv/apps/nanowiss-staging/metadata/<release>`
(outside the web root): the checksums, deployment configuration and receipt.
Do not alter an existing release directory. For later previews, upload a fresh
release, verify every checksum, then atomically replace `releases/current`.
The static Caddy container mounts the parent directory so symlink changes are
visible without replacing container mounts.

### Custom staging hostname — live, 28 October 2026

The owner's contact added an **A record** for `staging.nanowiss.com` pointing to
`157.180.20.129`. At approximately 12:31 CET on 28 October, both Google public
DNS and the local operating-system resolver returned this address. The
`www.nanowiss.com` CNAME and the existing Google mail MX record remained
unchanged. No nameserver or mail migration is involved.

The isolated edge fragment
`/srv/apps/maptheory/shared/caddy-sites/nanowiss-staging-domain.caddy` serves
[staging.nanowiss.com](https://staging.nanowiss.com) through the existing
`nanowiss-staging-web:8080` backend. Storage and analytics gates passed at
11:31:51 UTC before installation. The complete edge configuration validated
and reloaded gracefully. Let's Encrypt HTTPS and HTTP-to-HTTPS redirect passed.
All 72 routes/aliases, 42 runtime assets and seven expected 404s passed; the
custom domain returns the exact reviewed main bundle. Desktop team/footer and
390px mobile privacy checks passed, with no removed profiles, broken images,
external runtime origins or browser errors. All responses retain noindex and
no-store protections, and robots disallows crawling. Existing sites remained
healthy after activation. See [the verification receipt](evidence/staging-domain-2026-10-28.json).

At activation, this hostname used the same immutable
`20261027T123954Z-workspace` artifact as the original preview. That hostname
activation required no rebuild, source commit, Git push or production cutover.
Subsequent artifact changes require their own recorded release identity. The
old `sslip.io` preview remains available and retains its
separate edge fragment. Production remains unchanged, and the legal drafts and
production release blockers remain in force.

To roll back only the new custom hostname, remove only
`/srv/apps/maptheory/shared/caddy-sites/nanowiss-staging-domain.caddy`, validate
the complete existing edge Caddy configuration and gracefully reload it. Leave
the `nanowiss-staging-web` backend, immutable release, `current` selection and
old `nanowiss-staging.caddy` fragment intact so the original preview continues
to work. Do not alter production or unrelated site fragments. The A record
alone does not host content and need not be removed to withdraw this edge route.

### Preview from the working tree without Git publication

The owner authorized a preview of the current working tree without any commit or
push. Build the current files with `npm run build`, package the generated static
artifact and transfer it directly to a fresh staging release directory. Run the
server's deployment gates before activating the release through `current`; then
verify HTTPS, direct route loading, missing-asset 404s, the legal/footer links,
desktop/mobile behavior and asset delivery on the staging URL. Record the
artifact identity separately from Git, since an uncommitted working tree has no
unique source commit. Do not trigger GitHub Pages, Vercel or a Git push as a
preview deployment mechanism.

The isolated review deployment does not establish German legal compliance or
clear the production release gate. The supplied company/address and representative authority still need final
confirmation; hosting/mail processing facts and confirmations in
`src/content/legal-details.json` remain outstanding. Keep unverified confirmation
flags unchanged, record the gaps internally, and complete them before production
publication. Do not add visitor-facing environment or draft warnings; see
[LEGAL-NOTICES.md](LEGAL-NOTICES.md).

## Prepare the release

1. Complete and confirm `src/content/legal-details.json` using the actual legal
   operator, address, contact, hosting, and email service facts; see
   [LEGAL-NOTICES.md](LEGAL-NOTICES.md).
2. Run `npm run build:release` and `npm run test:legal`, then check the built site
   locally. The legal check must pass. Local design builds with `npm run build`
   are permitted while details are pending, including the authorized isolated
   staging preview; they are not production release artifacts.
3. Preserve the previous generated release and its source SHA and record current
   domain/DNS, response headers, environment differences, and external services.
4. Configure an isolated Hetzner virtual host and immutable release directory.
   Apply the server's existing deployment, storage, and analytics checks. Keep
   rollback possible with an atomic switch to the previous release.
5. Serve files and all assets from Hetzner. Use a real SPA fallback so direct
   `/impressum`, `/datenschutz`, other routes, and legacy `/nanowiss/...` aliases
   load correctly. Missing assets must return 404 instead of the HTML fallback.
   Static legal HTML is preferable when implementing a new server layout.
6. Verify HTTPS, normal and legacy URLs, footer links, mobile/keyboard behavior,
   and actual request/logging behavior on the Hetzner target. Confirm Art. 28
   processor arrangements and retention before accepting the privacy text.
7. Verify rollback before changing only the migration-scoped DNS. Preserve domain
   registration and all unrelated DNS records and services. Check the custom
   domain again after cutover. Keep old release artifacts for recovery.

`npm run deploy` deliberately refuses to publish until a concrete Hetzner target
and documented rollback procedure replace `scripts/deploy-hetzner.js`. Do not
restore the GitHub Pages publisher to work around that refusal.

## Commit, push, identity and time

Respect the owner's workspace policy: no Git commits or pushes Monday–Friday,
09:00–18:00 Europe/Berlin, unless the owner explicitly approves an exception.
The current preview request explicitly requires no commits or pushes regardless
of the time. Verify the current Berlin weekday/time and personal Git identity
immediately before any later authorized commit. Use truthful timestamps and
leave work uncommitted and unpushed inside the restricted window. Direct staging
artifact delivery must not be used to trigger a Git publication indirectly.
