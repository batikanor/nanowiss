# Current legal notice maintenance

The owner decisions and current release requirements are described in
[LEGAL-OPERATIONS.md](LEGAL-OPERATIONS.md) and [DEPLOYMENT.md](DEPLOYMENT.md).
Production uses GitHub Pages by the owner's 28 October exception; Hetzner is
staging. Complete public content and documented, scoped review records are
required. Google's contract acceptance is the specific owner-authorized
assumption, not verified account evidence. The validator preserves that status.
Do not invent data, locations, retention days, an EU office, contract acceptance
or a legal-compliance certification. Keep EN/DE/TR content aligned, English
shared footer labels, and no visitor-facing environment/review labels.

The earlier fact-gathering notes below are historical context, superseded where
they conflict with the current owner decisions and source schema.

---

# Legal notice maintenance

Prepared on 27 October 2026. This document records the facts still needed to finish the German Impressum and privacy notice, and the source-code evidence behind their scope. It is a maintainer document, not public website copy or a certification of compliance.

## Public presentation

Owner language instruction of **28 October 2026**: use the English labels **Legal Notice** and **Privacy Policy** in the shared footer, including on mobile and the alternative pages. Both notices must be directly reachable without sign-in, overlays or consent. Quiet footer placement must still be readable and easy to find. Do not substitute an email link for the legal notice.

Both legal pages contain complete **English**, **German** and **Turkish** versions, with English as the default. The page-local language links read **English**, **Deutsch** and **Türkçe**. The routes remain `/impressum` and `/datenschutz`; shareable URLs such as `/impressum?lang=de` and `/datenschutz?lang=tr` select the requested language. Preserve the selected `?lang=de` or `?lang=tr` when navigating between the two notices, including through their footer links. Missing or unsupported language values fall back to English.

Only the legal-page contents are localized. The shared footer labels remain English in every selection, and the rest of the website does not acquire a language switcher or site-wide translation system. The URL holds the selection; no language-preference cookie or `localStorage` is needed. Keep the three text versions together in `src/content/legal-translations.js`, with matching keys and paragraph coverage. Translate labels and explanations, while preserving the official company name, legal form, supplied address, representative names and registry/identifier data from `src/content/legal-details.json` unchanged.

The owner's 28 October presentation instruction also prohibits visible environment, demo, staging, review or editorial draft banners. Do not reintroduce the removed fixed preview strip or the orange legal-page draft warning. Missing-fact and release status remain in the maintainer data, validation and deployment records; removing a public editorial banner or adding translations does not confirm any legal fact or establish legal compliance.

The notice data lives in `src/content/legal-details.json`. Empty strings, empty arrays and `false` confirmation flags deliberately record unknown facts. Do not replace them with guessed company details, a teammate's personal address, or a partner/university's address. Do not describe a draft notice as legally complete.

Translation terminology was checked against primary sources on 28 October 2026: the [BfDI's English activity report for 2024, section 5.4.1](https://www.bfdi.bund.de/SharedDocs/Downloads/EN/Taetigkeitsberichte/33TB_24.pdf?__blob=publicationFile&v=2) uses “German Digital Services Act” for DDG. The [Turkish data protection authority's official collection](https://kvkk.gov.tr/SharedFolderServer/CMSFiles/95d1f4bc-de91-4703-82c1-8757387a3850.pdf) supplies Turkish GDPR terminology, including “AB Genel Veri Koruma Tüzüğü”, “veri sorumlusu”, “meşru menfaat” and “veri taşınabilirliği hakkı”. Its [decision 2019/225](https://www.kvkk.gov.tr/Icerik/5545/2019-225) also discusses the controller concept under GDPR Article 4(7). Retain the applicable GDPR, DDG and TDDDG references in every translation; do not replace them with a Turkish Law No. 6698 notice. No official Turkish title for DDG or TDDDG was established in this research, so use their German names/acronyms with descriptive Turkish wording. These terminology references do not supply the outstanding operator or processing confirmations.

## Facts the operator must confirm

- The actual website operator: an individual with their full civil name, or the exact organization name, legal form and authorized representatives. A project/brand name alone does not establish the operator.
- A complete address at which the operator is established, a monitored email address and a suitable means of rapid direct communication. Add the telephone number if applicable.
- Register and register number together when registered; VAT identification number and business identification number when assigned. Do not publish an ordinary personal tax number. The `operator.confirmed` flag also confirms whether these conditional disclosures apply. Check additional disclosures if the actual operator has a regulated profession, a licensed activity, liquidation status or other special duties.
- The privacy contact and controller identity. Confirm any applicable data protection officer or additional contact requirement before publishing.
- The exact hosting contracting entity, full provider address, privacy URL, actual server locations, access/security log contents and retention/deletion configuration, processors/subprocessors, Art. 28 GDPR agreement and any international transfers and safeguards. Explicitly state the fact if no access logs are retained; a blank value is not evidence of zero logging.
- The actual email provider, its privacy URL, processors/subprocessors, Art. 28 GDPR agreement, retention/deletion practice and any international transfers and safeguards. A `mailto:` link creates no website submission endpoint, but personal data is processed when an enquiry arrives in the mailbox.
- Retention periods or sufficiently concrete deletion criteria must reflect actual practice, including legal retention duties where relevant. Record international transfers explicitly even when none occur.
- Review the entire notice against the deployed system, then set the confirmation flags and `reviewedOn` to the actual review date. Confirm only what has been checked.

On 27 October 2026 the owner supplied **Zeynep Feyza Atabey** and the following service address: **Boğaziçi Teknopark Kandilli Kampüsü 9; Kandilli Mah. Rasathane Cad. No:104/13; 34684 Üsküdar / İstanbul; Türkiye**. Preserve the campus line, including the supplied “9”, pending any correction by the owner. The owner subsequently directed that **AgroWISS** be identified as both the website operator and privacy controller, with Zeynep's name included only where a human must be named. The draft now uses **AGROWISS BİYOTEKNOLOJİ ARAŞTIRMALARI ANONİM ŞİRKETİ**, legal form **Anonim Şirket (A.Ş.)**, under the AgroWISS brand. Under § 5(1)(1) DDG, an organizational provider's authorized representative is required in the Impressum, so the owner-supplied Zeynep name is included there. The privacy notice identifies the company and omits her name. This selection is based on the owner's instruction, not independent proof of her representative authority. Keep `operator.confirmed` false until applicable register/identifier disclosures and representative authority have been verified.

The official [TÜBİTAK BİGG portfolio](https://bigg.tubitak.gov.tr/girisim/agrowiss-biyoteknoloji-arastirmalari-anonim-sirketi) indexes AGROWISS BİYOTEKNOLOJİ ARAŞTIRMALARI ANONİM ŞİRKETİ. The optional `operator.brand` field changes presentation only; it does not replace `operator.name`. Zeynep's representative authority remains owner-supplied rather than independently verified.

### Registration research — 27 October 2026

The [official İstanbul Ticaret Odası architecture/engineering member list](https://www.ito.org.tr/tr/meslek-komiteleri/uye-firmalar/mimarlik-ve-muhendislik?page=0) was fetched directly with HTTP 200. Its table contains 21,525 rows and exactly one company row matching the full AgroWISS name. Under headers `Sicil No | Ünvan | Üyelik Durum | Semt | Nace`, that row reads:

> 1119202 | AGROWISS BİYOTEKNOLOJİ ARAŞTIRMALARI ANONİM ŞİRKETİ | Faal | ÜSKÜDAR | 72.10.02

This verifies trade-register number **1119202** against a primary source. The official [İTO directorates page](https://www.ito.org.tr/tr/iletisim/mudurlukler) identifies the registry authority as **İstanbul Ticaret Sicili Müdürlüğü**; the [İTO services page](https://www.ito.org.tr/tr/kurumsal/mobil-hizmet) confirms that this directorate maintains trade-register records within İTO. The draft now includes that authority and the verified number. Do not confuse it with the separate chamber membership number.

The exact official row, headers, retrieval date and verification limits are retained in [the source evidence record](evidence/agrowiss-ito-2026-10-27.json).

An [indexed Find company directory record](https://www.find.com.tr/Company/agrowissbiyoteknolojiarastirmalarianonimsirketi) also reports registry number 1119202 and lists chamber number 1620419, MERSİS **0009199269200001**, corporate tax number 0091992692, and incorporation on 31 December 2025. [FreshSignal's directory profile](https://freshsignal.net/tr/firma/8761875-agrowiss-biyoteknoloji-arastirmalari-anonim-sirketi) agrees on registry number 1119202 and cites the İTO committee member list. These are secondary directories; Find explicitly disclaims official status and company verification, and its live page restricts some identifier fields to members even though indexed results contain them. Only the trade-register number was independently verified in the official company row. Keep the other identifiers as research notes rather than publishing them as confirmed legal identifiers. In particular, do not place a Turkish corporate tax/MERSİS number into a field labelled as a German § 27a UStG VAT ID.

The official TÜBİTAK company profile was also viewed successfully in a browser; it confirms the company name and İstanbul but exposes no registration identifiers. MERSİS and the Trade Registry Gazette were investigated, but no official AgroWISS-specific MERSİS record was obtained. An accessible official registry entry or company document is still needed to treat that additional number as verified. The verified trade-register entry is sufficient to fill the draft's registry-name/number fields; do not keep asking the owner to research the same trade-register number.

The owner explicitly confirmed **info@nanowiss.com** for privacy requests on 27 October 2026. Use that address for both company contact and privacy inquiries; do not ask for this confirmation again. The hosting contract/logging configuration and email service arrangements have not been established. The owner's “yes” confirms the privacy contact, not the separate question about which provider hosts the mailbox. The screenshots point to missing notices but do not independently supply operator or service facts.

A public DNS query on 27 October 2026 returns MX `1 smtp.google.com.` for `nanowiss.com`. [Google's official Workspace instructions](https://knowledge.workspace.google.com/admin/domains/set-up-mx-records-for-google-workspace) identify this as Google's incoming mail service. This supports a Google Workspace inference, but does not establish the mailbox's operation, contracting entity, retention settings, international transfers or processing agreement; do not mark those facts confirmed from DNS alone.

## Hosting release prerequisite

The existing deployment setup uses GitHub Pages (`gh-pages`), which conflicts with the owner's explicit Hetzner-only hosting instruction of 12 October 2026. A legal content edit does not resolve that conflict. Do not publish the new notices with a fictitious Hetzner provider declaration, or trigger the existing GitHub Pages deployment while completing this work.

Before a production release, migrate website delivery and assets to Hetzner, confirm the real hosting/mail processors and settings above, and update the notice to describe that deployment. Preserve the exact current release and relevant production differences, verify HTTPS, direct route loading, logging/deletion, rollback and the required processing agreements, and only then make migration-scoped DNS changes. Preserve domain registration, unrelated records and unrelated services. Do not create or update Vercel hosting, Blob, previews or automatic deployment workflows without the owner's direct project/environment/service-specific approval. Retained Vercel recovery material is not deployment approval.

## Observed website processing

The source review found no active analytics, advertising pixels, tracking cookies, third-party iframe players, remote font imports or contact submission API. Images and native video sources are repository assets. Social and partner destinations are ordinary links; they do not embed those providers. `reportWebVitals()` is called without a reporting callback and does not send measurements. Recheck browser network activity after any dependency or content change, since source inspection alone cannot establish the host's behavior.

The legacy `public/404.html` route fallback writes only the requested path/query/fragment to `sessionStorage` under `nanowiss.redirect`; the application reads and removes a legacy value after restoring the requested page. The postbuild script replaces that source fallback with `index.html`, so the current generated fallback does not write a new value. This limited legacy storage serves the visitor's requested navigation. Keep it limited to that purpose, avoid storing personal or tracking identifiers, and handle storage being unavailable. Do not claim that there is no browser storage access at all.

On this observed setup, no consent banner is needed for analytics/marketing, because those services are absent. The narrowly necessary navigation storage is assessed under § 25(2)(2) TDDDG; necessity is limited to providing the requested route. A banner does not replace the privacy notice. Adding analytics, tracking, embedded external content or optional storage requires a fresh assessment and, where required, blocking it until valid consent. Update the notice if removing route recovery during the hosting migration.

The privacy notice must cover the actual controller, purposes, legal bases, recipients, transfers/safeguards, retention, rights and complaint route under Article 13 GDPR. Select the competent supervisory authority using the confirmed operator establishment; do not infer it from a team's academic affiliation. Check any additional editorial responsibility, consumer dispute or accessibility duties against the operator's actual activities before asserting that all German requirements are fulfilled.

## Validation

From this application directory run:

```sh
node scripts/check-legal-details.js
```

The CLI reads `src/content/legal-details.json`, prints outstanding essentials and exits **1** while the facts are missing, malformed or unconfirmed. It exits **0** only when the configured requirements are complete. Missing facts must be corrected; do not bypass the release gate or set confirmation flags merely to make a build pass. Normal local preview can remain available for reviewing the page layout.

The CommonJS interface is:

```js
const { getLegalIssues } = require('./scripts/check-legal-details');
const issues = getLegalIssues(details); // string[]; empty only when complete
```

It requires `operator.kind` to be `individual` or `organization`; organizations need a legal form and named representatives. It requires a full operator address, valid contact emails, a valid review date, complete confirmed hosting/email disclosures and a hosting provider identified as Hetzner. Register details are a pair when supplied; VAT/business identifiers and a telephone number are optional data fields whose applicability must be confirmed by the operator. It rejects common placeholder values and personal tax-number fields. Completion verifies data presence and confirmation, not contractual truth, network behavior, legal sufficiency or the real hosting provider.

## Official reference material

- [§ 5 DDG — provider identification and applicable additional disclosures](https://www.gesetze-im-internet.de/ddg/__5.html).
- [§ 25 TDDDG — terminal storage/access and strictly necessary exceptions](https://www.gesetze-im-internet.de/ttdsg/__25.html). The official URL retains the earlier `ttdsg` path.
- [GDPR official text — Articles 13, 28 and Chapter V](https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng).
- [German supervisory authorities' guidance for digital service providers, November 2024](https://datenschutzkonferenz-online.de/media/oh/OH_Digitale_Dienste.pdf).
- [Lower Saxony supervisory authority: website/app information and guidance](https://www.lfd.niedersachsen.de/dsgvo/informationen_fur_betreiber_von_webseiten/informationen-fur-betreiber-von-webseiten-und-apps-digitale-dienste-164589.html).

Use current official law and the actual deployment facts when reviewing changes. These references explain the scope; they do not supply the missing operator or processor details.
