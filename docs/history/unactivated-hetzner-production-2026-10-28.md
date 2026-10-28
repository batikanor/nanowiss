# Production cutover status — 28 October 2026

Production is **not migrated**. The final live checks still show `https://www.nanowiss.com/` on GitHub Pages with `main.76dfe21a.js`; direct legal routes return 404. The apex `nanowiss.com` has no address record. The latest published three-language legal release is on `https://staging.nanowiss.com/`, bundle `main.1300ecc0.js`.

## Prepared and verified on Hetzner

The independent production backend is `/srv/apps/nanowiss-production`, container `nanowiss-production-web`, on the existing Hetzner Helsinki server `157.180.20.129`. It exposes no host ports and is reachable only on the existing internal edge network. Its read-only static runtime uses the previously verified image `nanowiss-static:caddy-2.10.2-nocaps-v1`, UID 1000, no capabilities, memory/CPU/process limits and rotating local logs limited to 10 MiB per file and three files.

The current private selection is **the exact old production recovery**, `releases/recovery-e34a1ccec4c9`, not the new candidate. All 54 HTTP-served files match their saved hashes; missing assets return 404. The recovery archive is retained outside the web root under `recovery/`, SHA-256 `37f52c1a35cb3e140b09616558437c871bbc06578ddf9251ea47a46cd2571211`, original `gh-pages` commit `e34a1ccec4c99a00967ff6fffd959a1b1bf20abe`. The metadata receipt is `metadata/preparation-20261028.json`.

`nanowiss-production.caddy.pending` is deliberately outside the edge imports. Its standalone adaptation succeeds. It prepares the `www` virtual host, apex-to-www redirect and discarded HTTP access logs, but has **not** been installed or activated. No shared edge configuration, production DNS, nameservers, domain registration, email record or unrelated service was changed. The required storage and analytics gates passed before backend creation.

Recovery delivery is verified. Switching between the new release and recovery, full combined-edge validation, production certificate issuance and final custom-domain verification remain required before claiming the migration complete.

## Remaining account access

The owner delegated sensible privacy choices. Resolved enquiries and related correspondence should be reviewed monthly and deleted 12 months after resolution, except where continuing contracts or legal retention duties require longer storage. This is an operational policy; no automatic mailbox deletion setting has been changed.

The company identity/address/privacy contact and official registry entry are recorded. Hosting location, actual logging limits, Google Workspace mail processing and provider terms have been researched and translated. The remaining unavailable evidence is whether the actual hosting and mail accounts cover this operator under their processing agreements. Do not infer account acceptance from public provider terms or DNS.

- **Hetzner:** in the authorized account, open <https://accounts.hetzner.com/account/dpa>. Verify existing coverage or complete the applicable agreement. Prepared purpose: website delivery, availability and security; data: IP addresses and necessary connection/request metadata; people: website visitors. Confirm the actual company/account-holder service chain. Official guide: <https://docs.hetzner.com/general/company-and-policy/data-protection-at-hetzner/>.
- **Google Workspace:** in the authorized Admin account, check Account → Account settings → Legal and compliance → Cloud Data Processing Addendum. Existing online terms may already incorporate it; record that coverage instead of unnecessarily opting in again. Official guide: <https://knowledge.workspace.google.com/admin/compliance/privacy-compliance-and-records-for-google-workspace-and-cloud-identity>.

No usable authorized session or credential for these account checks or Squarespace production DNS is available in this workspace. Both processing-agreement flags and final privacy confirmation remain false. No contract acceptance was invented. Revalidate the effective production logging and service chain during the final review.

## DNS changes to give the domain owner when release checks pass

**Do not switch DNS yet.** First complete the account checks, run `npm run build:release`, privately verify the new artifact and rollback, and activate the verified Hetzner host configuration.

In Squarespace DNS, change only these website records:

| Type | Host | Value |
| --- | --- | --- |
| A | `@` | `157.180.20.129` |
| A | `www` | `157.180.20.129` |

Replace the existing `www` CNAME to `batikanor.github.io` with the `www` A record; do not retain both at the same hostname. Use a 300-second TTL if available during cutover. Preserve the working `staging` A record, all MX, SPF, DKIM, verification and other records, registration and existing nameservers. DNS authority is still the Google nameservers managed through the domain's Squarespace account; Google Workspace allowlisting is not DNS configuration.

After propagation, verify HTTPS and apex redirect, the exact release hash, all three languages at both direct legal routes and legacy aliases, English footer labels, normal company pages, mobile layout, missing-asset 404s and continued absence of the removed profiles. Retain the immutable prior release and record the successful rollback exercise and final domain checks. Do not re-enable GitHub Pages publishing.

## Source scope and publication

The isolated candidate is `output/production-candidate/20261028T222828018689Z/source`. It excludes the unrelated unfinished reconstruction routes and Spark dependency. The owner’s original experiments remain intact in the main working tree. Candidate ordinary builds are private layout checks only while the release gate fails; they are not production release artifacts.

No commit or push was made during this preparation. Before an eventual authorized release commit, verify current Europe/Berlin weekday/time and the personal Git identity, retain truthful timestamps and honor the weekday 09:00–18:00 restriction. Run the brand check before any push.
