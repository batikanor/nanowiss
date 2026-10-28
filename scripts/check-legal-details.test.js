const assert = require('node:assert/strict');
const test = require('node:test');
const { getLegalIssues } = require('./check-legal-details');

// Synthetic data verifies validation behavior; it is not real operator or service information.
function completeFixture() {
  return {
    operator: {
      kind: 'individual',
      name: 'Synthetic Operator Fixture',
      legalForm: '',
      representatives: [],
      address: { street: '17 Fictional Lane', postalCode: '10101', city: 'Fixture City', country: 'Fixture Country' },
      email: 'operator@fixture.test',
      phone: '',
      register: { name: '', number: '' },
      vatId: '',
      businessId: '',
      confirmed: true,
    },
    privacy: {
      contactEmail: 'privacy@fixture.test',
      hosting: {
        provider: 'Hetzner — synthetic fixture only',
        addressLines: ['42 Fictional Road', '20202 Fixture City', 'Fixture Country'],
        privacyUrl: 'https://hosting.fixture.test/privacy',
        serverLocations: 'Synthetic server location',
        logRetention: 'No access logs are retained in this synthetic fixture.',
        internationalTransfers: 'No transfers in this synthetic fixture.',
        processorAgreementConfirmed: true,
      },
      emailService: {
        provider: 'Synthetic Mail Fixture',
        privacyUrl: 'https://mail.fixture.test/privacy',
        retention: 'Synthetic deletion criterion: remove messages after 30 days.',
        internationalTransfers: 'No transfers in this synthetic fixture.',
        processorAgreementConfirmed: true,
      },
      confirmed: true,
    },
    reviewedOn: '2026-10-27',
  };
}

function githubFixture() {
  const details = completeFixture();
  details.privacy.hosting = {
    ...details.privacy.hosting,
    provider: 'GitHub Pages — GitHub, Inc.',
    service: 'github-pages',
    processorAgreementConfirmed: false,
    processingRoleReview: {
      status: 'partially-documented',
      securityLogging: {
        status: 'documented-independent-controller-basis',
        scope: 'Synthetic review scope: IP addresses used for service security.',
        basis: 'Synthetic review basis describing the published security logging purpose.',
        sources: ['https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages'],
      },
      otherHostingProcessing: {
        status: 'not-assessed',
        scope: 'Synthetic review limit: hosting processing beyond the security logging described above.',
        basis: 'This synthetic review does not establish processing roles or contract coverage outside its stated scope.',
      },
    },
  };
  return details;
}

function googleAssumptionFixture() {
  const details = completeFixture();
  details.privacy.emailService = {
    ...details.privacy.emailService,
    provider: 'Google Workspace (Gmail)',
    processorAgreementConfirmed: false,
    agreementReview: {
      status: 'owner-assumption',
      date: details.reviewedOn,
      basis: 'Synthetic owner instruction explicitly authorizes assuming the existing Workspace terms are accepted.',
      source: 'https://workspace.google.com/terms/premier_terms/',
      verificationLimit: 'Account-specific acceptance has not been independently checked in this synthetic fixture.',
    },
  };
  return details;
}

test('missing and unconfirmed facts block release', () => {
  const issues = getLegalIssues({});
  assert(issues.some(issue => issue.startsWith('operator.name:')));
  assert(issues.some(issue => issue.startsWith('privacy.hosting.provider:')));
  assert(issues.some(issue => issue.startsWith('privacy.emailService.provider:')));
  assert(issues.some(issue => issue.startsWith('operator.confirmed:')));
  assert(issues.some(issue => issue.startsWith('privacy.confirmed:')));
});

test('a brand cannot replace the legal operator identity', () => {
  const details = completeFixture();
  details.operator.brand = 'Synthetic Brand';
  details.operator.name = '';
  assert(getLegalIssues(details).some(issue => issue.startsWith('operator.name:')));
});

test('optional campus address lines retain their values and require complete text', () => {
  const details = completeFixture();
  details.operator.brand = 'Synthetic Brand';
  details.operator.address.additionalLines = ['Synthetic Campus 9'];
  assert.deepEqual(getLegalIssues(details), []);
  details.operator.address.additionalLines = [''];
  assert(getLegalIssues(details).some(issue => issue.startsWith('operator.address.additionalLines:')));
});

test('complete confirmed facts are accepted, including an explicit zero-log policy', () => {
  assert.deepEqual(getLegalIssues(completeFixture()), []);
});

test('unknown hosting providers are rejected even when a processing agreement is marked confirmed', () => {
  const details = completeFixture();
  details.privacy.hosting.provider = 'Synthetic Other Host';
  assert(getLegalIssues(details).some(issue => issue.startsWith('privacy.hosting.provider:')));
});

test('organizations require both a legal form and authorized representatives', () => {
  const details = completeFixture();
  details.operator.kind = 'organization';
  let issues = getLegalIssues(details);
  assert(issues.some(issue => issue.startsWith('operator.legalForm:')));
  assert(issues.some(issue => issue.startsWith('operator.representatives:')));
  details.operator.legalForm = 'Synthetic Legal Form';
  details.operator.representatives = ['Synthetic Representative Fixture'];
  assert.deepEqual(getLegalIssues(details), []);
});

test('optional VAT, business, phone and register fields are not required for an individual', () => {
  const details = completeFixture();
  delete details.operator.vatId;
  delete details.operator.businessId;
  delete details.operator.phone;
  delete details.operator.register;
  assert.deepEqual(getLegalIssues(details), []);
});

test('register details must be complete when either field is supplied', () => {
  const details = completeFixture();
  details.operator.register.name = 'Synthetic Registry Fixture';
  assert(getLegalIssues(details).some(issue => issue.startsWith('operator.register.number:')));
  details.operator.register.number = 'Fixture-42';
  assert.deepEqual(getLegalIssues(details), []);
});

test('processor confirmations and actual retention disclosures are necessary', () => {
  const details = completeFixture();
  details.privacy.hosting.processorAgreementConfirmed = false;
  details.privacy.emailService.processorAgreementConfirmed = false;
  details.privacy.hosting.logRetention = '';
  details.privacy.emailService.retention = 'TBD';
  const issues = getLegalIssues(details);
  for (const field of ['privacy.hosting.processorAgreementConfirmed', 'privacy.emailService.processorAgreementConfirmed', 'privacy.hosting.logRetention', 'privacy.emailService.retention']) {
    assert(issues.some(issue => issue.startsWith(`${field}:`)));
  }
});

test('malformed contacts, provider URLs, review dates and personal tax numbers are rejected', () => {
  const details = completeFixture();
  details.operator.email = 'invalid';
  details.privacy.hosting.privacyUrl = 'http://hosting.fixture.test/privacy';
  details.reviewedOn = '2026-02-30';
  details.operator.personalTaxNumber = 'synthetic-do-not-publish';
  const issues = getLegalIssues(details);
  assert(issues.some(issue => issue.startsWith('operator.email:')));
  assert(issues.some(issue => issue.startsWith('privacy.hosting.privacyUrl:')));
  assert(issues.some(issue => issue.startsWith('reviewedOn:')));
  assert(issues.some(issue => issue.includes('remove personal tax numbers')));
});

test('the authorized GitHub Pages review passes while preserving its unassessed limits and unconfirmed agreement', () => {
  const details = githubFixture();
  const before = structuredClone(details);
  assert.deepEqual(getLegalIssues(details), []);
  assert.deepEqual(details, before);
  assert.equal(details.privacy.hosting.processorAgreementConfirmed, false);
  assert.equal(details.privacy.hosting.processingRoleReview.otherHostingProcessing.status, 'not-assessed');
});

test('GitHub Pages requires its service tag, scoped processing roles and official supporting evidence', () => {
  const cases = [
    ['untagged service', details => { delete details.privacy.hosting.service; }, 'privacy.hosting.provider:'],
    ['absent review', details => { delete details.privacy.hosting.processingRoleReview; }, 'privacy.hosting.processingRoleReview.status:'],
    ['blank security scope', details => { details.privacy.hosting.processingRoleReview.securityLogging.scope = ''; }, 'privacy.hosting.processingRoleReview.securityLogging.scope:'],
    ['unreviewed security role', details => { details.privacy.hosting.processingRoleReview.securityLogging.status = 'assumed'; }, 'privacy.hosting.processingRoleReview.securityLogging.status:'],
    ['missing evidence', details => { details.privacy.hosting.processingRoleReview.securityLogging.sources = []; }, 'privacy.hosting.processingRoleReview.securityLogging.sources:'],
    ['insecure evidence', details => { details.privacy.hosting.processingRoleReview.securityLogging.sources = ['http://docs.github.com/security']; }, 'privacy.hosting.processingRoleReview.securityLogging.sources:'],
    ['spoofed evidence host', details => { details.privacy.hosting.processingRoleReview.securityLogging.sources = ['https://github.com.fixture.test/security']; }, 'privacy.hosting.processingRoleReview.securityLogging.sources:'],
    ['no supporting document', details => { details.privacy.hosting.processingRoleReview.securityLogging.sources = ['https://github.com/']; }, 'privacy.hosting.processingRoleReview.securityLogging.sources:'],
    ['nonstandard evidence endpoint', details => { details.privacy.hosting.processingRoleReview.securityLogging.sources = ['https://github.com:8443/security']; }, 'privacy.hosting.processingRoleReview.securityLogging.sources:'],
    ['unbounded role conclusion', details => { details.privacy.hosting.processingRoleReview.otherHostingProcessing.status = 'confirmed'; }, 'privacy.hosting.processingRoleReview.otherHostingProcessing.status:'],
    ['missing assessment limit', details => { details.privacy.hosting.processingRoleReview.otherHostingProcessing.basis = 'TBD'; }, 'privacy.hosting.processingRoleReview.otherHostingProcessing.basis:'],
  ];
  for (const [name, change, expected] of cases) {
    const details = githubFixture();
    change(details);
    assert(getLegalIssues(details).some(issue => issue.startsWith(expected)), name);
  }
});

test('a public GitHub review cannot be relabeled as a verified processing agreement', () => {
  const details = githubFixture();
  details.privacy.hosting.processorAgreementConfirmed = true;
  assert(getLegalIssues(details).some(issue => issue.startsWith('privacy.hosting.processorAgreementConfirmed:')));
});

test('the specific owner-authorized Google assumption passes without claiming independently verified acceptance', () => {
  const details = googleAssumptionFixture();
  const before = structuredClone(details);
  assert.deepEqual(getLegalIssues(details), []);
  assert.deepEqual(details, before);
  assert.equal(details.privacy.emailService.processorAgreementConfirmed, false);
});

test('bare assumptions, other mail providers and malformed Google review evidence are rejected', () => {
  const cases = [
    ['no review', details => { delete details.privacy.emailService.agreementReview; }, 'privacy.emailService.processorAgreementConfirmed:'],
    ['bare assumption', details => { details.privacy.emailService.agreementReview = { status: 'owner-assumption' }; }, 'privacy.emailService.agreementReview.basis:'],
    ['unsupported status', details => { details.privacy.emailService.agreementReview.status = 'accepted'; }, 'privacy.emailService.agreementReview.status:'],
    ['another provider', details => { details.privacy.emailService.provider = 'Synthetic Mail Fixture'; }, 'privacy.emailService.agreementReview:'],
    ['false verified claim', details => { details.privacy.emailService.processorAgreementConfirmed = true; }, 'privacy.emailService.processorAgreementConfirmed:'],
    ['impossible date', details => { details.privacy.emailService.agreementReview.date = '2026-02-30'; }, 'privacy.emailService.agreementReview.date:'],
    ['unmatched date', details => { details.privacy.emailService.agreementReview.date = '2026-10-01'; }, 'privacy.emailService.agreementReview.date:'],
    ['missing limits', details => { details.privacy.emailService.agreementReview.verificationLimit = ''; }, 'privacy.emailService.agreementReview.verificationLimit:'],
    ['placeholder basis', details => { details.privacy.emailService.agreementReview.basis = 'TBD'; }, 'privacy.emailService.agreementReview.basis:'],
    ['different Google document', details => { details.privacy.emailService.agreementReview.source = 'https://workspace.google.com/terms/'; }, 'privacy.emailService.agreementReview.source:'],
    ['unofficial terms host', details => { details.privacy.emailService.agreementReview.source = 'https://workspace.google.com.fixture.test/terms/premier_terms/'; }, 'privacy.emailService.agreementReview.source:'],
    ['nonstandard terms endpoint', details => { details.privacy.emailService.agreementReview.source = 'https://workspace.google.com:8443/terms/premier_terms/'; }, 'privacy.emailService.agreementReview.source:'],
  ];
  for (const [name, change, expected] of cases) {
    const details = googleAssumptionFixture();
    change(details);
    assert(getLegalIssues(details).some(issue => issue.startsWith(expected)), name);
  }
});

test('limited provider reviews do not replace the final content review requirement', () => {
  const details = googleAssumptionFixture();
  details.privacy.hosting = githubFixture().privacy.hosting;
  details.privacy.confirmed = false;
  assert(getLegalIssues(details).some(issue => issue.startsWith('privacy.confirmed:')));
  details.privacy.confirmed = true;
  assert.deepEqual(getLegalIssues(details), []);
});
