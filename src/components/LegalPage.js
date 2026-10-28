import { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import productionDetails from '../content/legal-details.json';
import stagingDetails from '../content/legal-details.staging.json';
import { legalTranslations, resolveLegalLanguage } from '../content/legal-translations';
import './LegalPage.css';

const details = process.env.REACT_APP_SITE_ENV === 'staging' ? stagingDetails : productionDetails;

const Paragraphs = ({ items, emphasizeIndex }) => items.map((text, index) => (
  <p key={text}>{index === emphasizeIndex ? <strong>{text}</strong> : text}</p>
));

const Address = ({ address, copy }) => (
  <address className="legal-address">
    {(address.additionalLines || []).map(line => <span key={line}>{line}</span>)}
    <span>{address.street || copy.placeholders.street}</span>
    <span>{[address.postalCode, address.city].filter(Boolean).join(' ') || copy.placeholders.city}</span>
    <span>{address.country || copy.placeholders.country}</span>
  </address>
);

const Operator = ({ copy, showRepresentatives = false }) => (
  <>
    <p>
      <strong>{details.operator.brand || details.operator.name || copy.placeholders.operatorName}</strong>
      {details.operator.brand && (
        <><br />{details.operator.kind === 'organization' ? copy.companyLabel : copy.individualLabel}: {details.operator.name || copy.placeholders.operatorName}</>
      )}
      {details.operator.legalForm && <><br />{details.operator.legalForm}</>}
    </p>
    <Address address={details.operator.address} copy={copy} />
    {showRepresentatives && (details.operator.representatives || []).length > 0 && (
      <p>{copy.representedBy}: {details.operator.representatives.join(', ')}</p>
    )}
  </>
);

const Contact = ({ email, copy }) => (
  <p>{copy.emailLabel}: <a href={`mailto:${email}`}>{email}</a></p>
);

const Imprint = ({ copy, language }) => (
  <>
    <section aria-labelledby="operator-heading">
      <h2 id="operator-heading">{copy.operatorHeading}</h2>
      <p>{copy.operatorIntro}</p>
      <Operator copy={copy} showRepresentatives />
    </section>
    <section aria-labelledby="contact-heading">
      <h2 id="contact-heading">{copy.contactHeading}</h2>
      <Contact email={details.operator.email} copy={copy} />
      {details.operator.phone && <p>{copy.phoneLabel}: <a href={`tel:${details.operator.phone.replace(/[^+\d]/g, '')}`}>{details.operator.phone}</a></p>}
    </section>
    {details.operator.register?.name && (
      <section aria-labelledby="register-heading">
        <h2 id="register-heading">{copy.registerHeading}</h2>
        <p>{details.operator.register.name.replace('Handelsregister Istanbul, Türkiye', copy.registerOfficeDescription)}<br />{copy.registerNumberLabel}: {details.operator.register.number}</p>
      </section>
    )}
    {(details.operator.vatId || details.operator.businessId) && (
      <section aria-labelledby="tax-heading">
        <h2 id="tax-heading">{copy.taxHeading}</h2>
        {details.operator.vatId && <p>{copy.vatLabel}: {details.operator.vatId}</p>}
        {details.operator.businessId && <p>{copy.businessIdLabel}: {details.operator.businessId}</p>}
      </section>
    )}
    <section aria-labelledby="privacy-link-heading">
      <h2 id="privacy-link-heading">{copy.privacyLinkHeading}</h2>
      <p>{copy.privacyLinkIntro}<Link to={`/datenschutz${language === 'en' ? '' : `?lang=${language}`}`}>{copy.privacyLinkText}</Link>{copy.privacyLinkAfter}</p>
    </section>
  </>
);

const Privacy = ({ copy, language }) => {
  const { hosting, emailService } = details.privacy;
  const text = copy.privacy;
  const localized = (service, key) => service.translations?.[language]?.[key] || service[key];

  return (
    <>
      <section aria-labelledby="controller-heading">
        <h2 id="controller-heading">{text.controllerHeading}</h2>
        <p>{text.controllerIntro}</p>
        <Operator copy={copy} />
        <Contact email={details.privacy.contactEmail} copy={copy} />
        <p>{text.imprintIntro}<Link to={`/impressum${language === 'en' ? '' : `?lang=${language}`}`}>{text.imprintLink}</Link>{text.imprintAfter}</p>
      </section>
      <section aria-labelledby="hosting-heading">
        <h2 id="hosting-heading">{text.hostingHeading}</h2>
        <Paragraphs items={text.hostingParagraphs} />
        <p>{text.hostingProviderLabel}: <strong>{hosting.provider || copy.placeholders.hostingProvider}</strong></p>
        {hosting.addressLines.length > 0 && <address className="legal-address">{hosting.addressLines.map(line => <span key={line}>{line}</span>)}</address>}
        <p>{text.serverLocationsLabel}: {localized(hosting, 'serverLocations') || copy.placeholders.serverLocations}</p>
        <p>{text.logRetentionLabel}: {localized(hosting, 'logRetention') || copy.placeholders.logRetention}</p>
        <p>{text.transfersLabel}: {localized(hosting, 'internationalTransfers') || copy.placeholders.transfers}</p>
        {hosting.privacyUrl && <p>{text.moreInfoLabel}: <a href={hosting.privacyUrl} target="_blank" rel="noreferrer">{text.hostingPrivacyLink}</a>.</p>}
      </section>
      <section aria-labelledby="storage-heading">
        <h2 id="storage-heading">{text.storageHeading}</h2>
        <Paragraphs items={text.storageParagraphs} />
      </section>
      <section aria-labelledby="email-heading">
        <h2 id="email-heading">{text.emailHeading}</h2>
        <Paragraphs items={text.emailParagraphs} />
        <p>{text.emailProviderLabel}: {emailService.provider || copy.placeholders.emailProvider}</p>
        <p>{text.retentionLabel}: {localized(emailService, 'retention') || copy.placeholders.retention}</p>
        <p>{text.transfersLabel}: {localized(emailService, 'internationalTransfers') || copy.placeholders.transfers}</p>
        {emailService.privacyUrl && <p>{text.moreInfoLabel}: <a href={emailService.privacyUrl} target="_blank" rel="noreferrer">{text.emailPrivacyLink}</a>.</p>}
        {emailService.customerDataProcessingTermsUrl && <p><a href={emailService.customerDataProcessingTermsUrl} target="_blank" rel="noreferrer">{text.emailDataProcessingLink}</a></p>}
      </section>
      <section aria-labelledby="external-heading">
        <h2 id="external-heading">{text.externalHeading}</h2>
        <Paragraphs items={text.externalParagraphs} />
      </section>
      <section aria-labelledby="recipients-heading">
        <h2 id="recipients-heading">{text.recipientsHeading}</h2>
        <Paragraphs items={text.recipientsParagraphs} />
      </section>
      <section aria-labelledby="rights-heading">
        <h2 id="rights-heading">{text.rightsHeading}</h2>
        <Paragraphs items={text.rightsParagraphs} emphasizeIndex={1} />
      </section>
      <section aria-labelledby="automated-heading">
        <h2 id="automated-heading">{text.automatedHeading}</h2>
        <p>{text.automatedParagraph}</p>
      </section>
    </>
  );
};

const LegalPage = ({ kind }) => {
  const location = useLocation();
  const language = resolveLegalLanguage(new URLSearchParams(location.search).get('lang'));
  const copy = legalTranslations[language];
  const headingRef = useRef(null);
  const privacy = kind === 'privacy';

  useEffect(() => {
    window.scrollTo(0, 0);
    headingRef.current?.focus({ preventScroll: true });
  }, [kind, language]);

  return (
    <div className="min-h-screen bg-background" lang="en">
      <Navbar />
      <main className="legal-page" lang={language}>
        <div className="legal-content">
          <h1 ref={headingRef} tabIndex={-1}>{copy.title[kind]}</h1>
          <nav className="legal-languages" aria-label={copy.switcherLabel}>
            {Object.entries(legalTranslations).map(([code, translation]) => (
              <Link
                key={code}
                to={{ pathname: location.pathname, search: code === 'en' ? '' : `?lang=${code}` }}
                lang={code}
                hrefLang={code}
                aria-current={language === code ? 'page' : undefined}
              >
                {translation.languageName}
              </Link>
            ))}
          </nav>
          {details.reviewedOn && <p className="legal-date">{copy.updatedLabel}: {details.reviewedOn}</p>}
          {privacy ? <Privacy copy={copy} language={language} /> : <Imprint copy={copy} language={language} />}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LegalPage;
