# nanoWISS Agent Rules

## Hosting policy — owner instruction, 12 October 2026

All hosting must use Hetzner, including production, staging, previews, demos,
public evidence, application runtimes, databases, uploads, and static/large assets.
Do not publish through GitHub Pages, Render, Sites, or another hosting provider.
Vercel deployments and managed services require the owner's direct, explicit
approval for this specific project, environment, and service. Existing provider
configuration, old runbooks, and available plugins are not approval.

When migrating, preserve the exact previous release, environment differences,
data, and historical review links. Verify Hetzner delivery and rollback before
cutover. Preserve domain registration, unrelated DNS records, and unrelated
services; change only verified migration-scoped DNS. See docs/DEPLOYMENT.md.

## nanoWISS production exception — owner instruction, 28 October 2026

The owner explicitly chose to retain the existing GitHub Pages production site
and use Hetzner for staging. For this project only, GitHub Pages may publish the
production website and its static assets at www.nanowiss.com. Keep staging,
previews, runtimes and non-production assets on Hetzner. This exception takes
precedence over the earlier all-Hetzner rule for nanoWISS production only; it
does not authorize Vercel, another provider, or other projects.

Preserve the existing production custom-domain/DNS configuration and email
records. Production privacy disclosures must describe GitHub Pages, including
its published visitor-IP security logging. Keep the Hetzner staging disclosures
separate; never publish the old Hetzner-only production candidate unchanged.
The current brochure site provides company information and contact links. Recheck
GitHub Pages restrictions before adding commercial transactions or a hosted SaaS.

The owner instructed us to assume the existing Google Workspace processing terms
are accepted. Record that as an owner-authorized assumption, not independently
verified account evidence. The owner also approved deleting resolved enquiries
after 12 months, except necessary contract/legal-retention exceptions. Update
validation to distinguish verified facts, published service terms and documented
owner assumptions; do not set a verification flag merely to pass a check. Continue
checking complete truthful text, company identity, contact, locale content and
actual production delivery. Neither the release check nor this exception is a
certification that every German/EU legal requirement applies or is fulfilled.

EU office setup and EU product/service offerings are work in progress. Do not
claim an operating EU office, current EU sales, or an exemption from applicable
law based on these plans alone.

Legal details in src/content/legal-details.json must be supported by verified facts,
reviewed published provider terms or the specific documented owner assumption above before production release.
Run npm run build:release; never publish drafts or placeholders as completed
legal notices. Do not substitute a founder's employer/university/partner address
for a confirmed service address.

## Visitor-facing presentation — owner instruction, 28 October 2026

Staging and other review deployments must show normal company content. Never
inject visible environment or release-status labels, banners, badges, warnings,
footer bars, or reserved layout padding. This includes staging, preview, demo,
under-construction, and draft notices, including notices about incomplete legal
review. The deployment hostname and internal metadata identify the environment.

Track missing facts, review status, and production release blockers in internal
maintainer documentation and deployment receipts. Do not invent facts, mark
unverified information confirmed, or change legal confirmation flags merely to
remove a visible notice. Production validation and deployment gates still apply.
Keep staging's noindex response headers, robots restrictions, and cache policy;
these technical safeguards do not require a visible website notice.

This instruction supersedes earlier guidance to inject a visible staging notice
or display legal draft warnings. Historical release records describe what was
deployed at that time; they are not instructions to restore those labels.

Keep shared legal footer labels in English: **Legal Notice** and **Privacy Policy**.
Both legal pages offer complete English, German and Turkish content, defaulting
to English, with shareable language URLs. Keep official names, addresses and
identifiers unchanged across translations.

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
