const fs = require('fs');
const path = require('path');

const PLACEHOLDER = /\b(?:todo|tbd|tbc|placeholder|lorem ipsum|mustermann|musterstra(?:ß|ss)e|example\.(?:com|org|net)|your (?:name|address|company)|to be (?:confirmed|completed|provided)|noch (?:offen|zu ergänzen)|bitte (?:ergänzen|eintragen))\b|^(?:unknown|unconfirmed|not (?:confirmed|provided)|n\/?a|[-?]+)$/i;

function hasText(value) {
  return typeof value === 'string' && value.trim().length > 0 && !PLACEHOLDER.test(value);
}

function isEmail(value) {
  return hasText(value) && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isHttpsUrl(value) {
  if (!hasText(value)) return false;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && Boolean(url.hostname) && !url.username && !url.password;
  } catch {
    return false;
  }
}

function isDate(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parsed = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
}

function isOfficialGithubUrl(value) {
  if (!isHttpsUrl(value)) return false;
  const url = new URL(value);
  return ['github.com', 'docs.github.com'].includes(url.hostname) && !url.port && url.pathname !== '/';
}

function isWorkspaceTermsUrl(value) {
  if (!isHttpsUrl(value)) return false;
  const url = new URL(value);
  return url.hostname === 'workspace.google.com' && !url.port && url.pathname === '/terms/premier_terms/' && !url.search && !url.hash;
}

/**
 * Return outstanding content and evidence requirements for a release. Passing
 * preserves explicit review limits and owner assumptions; it does not verify
 * contract acceptance or certify legal compliance.
 */
function getLegalIssues(details) {
  const issues = [];
  const operator = details?.operator || {};
  const address = operator.address || {};
  const register = operator.register || {};
  const privacy = details?.privacy || {};
  const hosting = privacy.hosting || {};
  const emailService = privacy.emailService || {};
  const requireText = (value, label) => {
    if (!hasText(value)) issues.push(`${label}: provide a verified value without placeholders.`);
  };

  if (!['individual', 'organization'].includes(operator.kind)) {
    issues.push('operator.kind: choose individual or organization for the actual website operator.');
  }
  requireText(operator.name, 'operator.name');
  if (operator.brand !== undefined && operator.brand !== '' && !hasText(operator.brand)) {
    issues.push('operator.brand: use the verified brand or leave this optional field empty.');
  }
  if (operator.kind === 'organization') {
    requireText(operator.legalForm, 'operator.legalForm');
    if (!Array.isArray(operator.representatives) || operator.representatives.length === 0 || !operator.representatives.every(hasText)) {
      issues.push('operator.representatives: provide the full names of the authorized representatives.');
    }
  }
  for (const key of ['street', 'postalCode', 'city', 'country']) {
    requireText(address[key], `operator.address.${key}`);
  }
  if (address.additionalLines !== undefined && (!Array.isArray(address.additionalLines) || !address.additionalLines.every(hasText))) {
    issues.push('operator.address.additionalLines: use complete address lines or omit this optional field.');
  }
  if (!isEmail(operator.email)) issues.push('operator.email: provide a valid, monitored contact email address.');
  if (operator.confirmed !== true) issues.push('operator.confirmed: confirm the operator, contact details and all applicable register/identifier disclosures.');

  const registerNamePresent = typeof register.name === 'string' && register.name.trim().length > 0;
  const registerNumberPresent = typeof register.number === 'string' && register.number.trim().length > 0;
  if (registerNamePresent || registerNumberPresent) {
    requireText(register.name, 'operator.register.name');
    requireText(register.number, 'operator.register.number');
  }
  for (const key of ['phone', 'vatId', 'businessId']) {
    if (operator[key] !== undefined && operator[key] !== '' && !hasText(operator[key])) {
      issues.push(`operator.${key}: use a verified value or leave this optional field empty.`);
    }
  }
  if (operator.taxNumber !== undefined || operator.personalTaxNumber !== undefined) {
    issues.push('operator: remove personal tax numbers; publish only applicable VAT/business identifiers.');
  }

  if (!isEmail(privacy.contactEmail)) issues.push('privacy.contactEmail: provide a valid, monitored privacy contact email address.');
  requireText(hosting.provider, 'privacy.hosting.provider');
  const isHetzner = /^hetzner(?:\s|$)/i.test(hosting.provider || '');
  const isGithubProvider = /^(?:GitHub(?:,?\s+Inc\.?)?|GitHub Pages\s*[—–-]\s*GitHub,\s*Inc\.?)$/i.test(hosting.provider || '');
  const isGithubPages = isGithubProvider && hosting.service === 'github-pages';
  if (hasText(hosting.provider) && !isHetzner && !isGithubPages) {
    issues.push('privacy.hosting.provider: use Hetzner or the explicitly authorized GitHub Pages production service.');
  }
  if (!Array.isArray(hosting.addressLines) || hosting.addressLines.length === 0 || !hosting.addressLines.every(hasText)) {
    issues.push('privacy.hosting.addressLines: provide the hosting provider\'s full postal address.');
  }
  if (!isHttpsUrl(hosting.privacyUrl)) issues.push('privacy.hosting.privacyUrl: provide the provider\'s HTTPS privacy notice URL.');
  requireText(hosting.serverLocations, 'privacy.hosting.serverLocations');
  requireText(hosting.logRetention, 'privacy.hosting.logRetention');
  requireText(hosting.internationalTransfers, 'privacy.hosting.internationalTransfers');
  if (isGithubPages) {
    const review = hosting.processingRoleReview || {};
    const securityLogging = review.securityLogging || {};
    const otherProcessing = review.otherHostingProcessing || {};
    if (review.status !== 'partially-documented') {
      issues.push('privacy.hosting.processingRoleReview.status: record the limited public review as partially-documented.');
    }
    if (securityLogging.status !== 'documented-independent-controller-basis') {
      issues.push('privacy.hosting.processingRoleReview.securityLogging.status: document the independent-controller basis for the specific security logging.');
    }
    for (const field of ['scope', 'basis']) {
      requireText(securityLogging[field], `privacy.hosting.processingRoleReview.securityLogging.${field}`);
      requireText(otherProcessing[field], `privacy.hosting.processingRoleReview.otherHostingProcessing.${field}`);
    }
    if (!Array.isArray(securityLogging.sources) || !securityLogging.sources.length || !securityLogging.sources.every(isOfficialGithubUrl)) {
      issues.push('privacy.hosting.processingRoleReview.securityLogging.sources: provide supporting HTTPS sources on github.com or docs.github.com.');
    }
    if (otherProcessing.status !== 'not-assessed') {
      issues.push('privacy.hosting.processingRoleReview.otherHostingProcessing.status: preserve the not-assessed limit for other hosting processing.');
    }
    if (hosting.processorAgreementConfirmed !== false) {
      issues.push('privacy.hosting.processorAgreementConfirmed: keep false; the limited public review is not an accepted processing agreement.');
    }
  } else if (hosting.processorAgreementConfirmed !== true) {
    issues.push('privacy.hosting.processorAgreementConfirmed: confirm the applicable Art. 28 GDPR processing agreement.');
  }

  requireText(emailService.provider, 'privacy.emailService.provider');
  if (!isHttpsUrl(emailService.privacyUrl)) issues.push('privacy.emailService.privacyUrl: provide the email provider\'s HTTPS privacy notice URL.');
  requireText(emailService.retention, 'privacy.emailService.retention');
  requireText(emailService.internationalTransfers, 'privacy.emailService.internationalTransfers');
  const emailAgreementReview = emailService.agreementReview;
  if (emailAgreementReview !== undefined) {
    const label = 'privacy.emailService.agreementReview';
    if (emailAgreementReview?.status !== 'owner-assumption') {
      issues.push(`${label}.status: only the explicitly authorized owner-assumption review is supported.`);
    }
    if (!/^Google Workspace\s*\(Gmail\)$/i.test(emailService.provider || '')) {
      issues.push(`${label}: the owner assumption applies only to Google Workspace (Gmail).`);
    }
    if (!isDate(emailAgreementReview?.date) || emailAgreementReview.date !== details?.reviewedOn) {
      issues.push(`${label}.date: record the actual review date, matching reviewedOn, as YYYY-MM-DD.`);
    }
    requireText(emailAgreementReview?.basis, `${label}.basis`);
    requireText(emailAgreementReview?.verificationLimit, `${label}.verificationLimit`);
    if (!isWorkspaceTermsUrl(emailAgreementReview?.source)) {
      issues.push(`${label}.source: use the official HTTPS Google Workspace premier terms URL.`);
    }
    if (emailService.processorAgreementConfirmed !== false) {
      issues.push('privacy.emailService.processorAgreementConfirmed: keep false when relying on an owner assumption rather than verified acceptance.');
    }
  } else if (emailService.processorAgreementConfirmed !== true) {
    issues.push('privacy.emailService.processorAgreementConfirmed: confirm the applicable Art. 28 GDPR processing agreement or document the specific authorized owner assumption.');
  }
  if (privacy.confirmed !== true) issues.push('privacy.confirmed: confirm that the notice matches the deployed website and email practices.');
  if (!isDate(details?.reviewedOn)) issues.push('reviewedOn: record the actual review date as YYYY-MM-DD.');

  return issues;
}

if (require.main === module) {
  const detailsPath = path.resolve(__dirname, '../src/content/legal-details.json');
  try {
    const details = JSON.parse(fs.readFileSync(detailsPath, 'utf8'));
    const issues = getLegalIssues(details);
    if (issues.length) {
      console.error(`Legal notices are not ready for release (${issues.length} outstanding requirements):`);
      for (const issue of issues) console.error(`- ${issue}`);
      process.exitCode = 1;
    } else {
      console.log('Legal notice content and review records pass release validation. Recorded assumptions and review limits remain; verify the deployed configuration before release.');
    }
  } catch (error) {
    console.error(`Cannot validate legal details: ${error.message}`);
    process.exitCode = 1;
  }
}

module.exports = { getLegalIssues };
