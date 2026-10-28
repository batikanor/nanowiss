import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import App from './App';
import legalDetails from './content/legal-details.json';


beforeEach(() => {
  window.scrollTo = jest.fn();
  window.history.replaceState({}, '', '/');
});

const footer = () => screen.getByRole('navigation', { name: 'Legal information' });

const languages = [
  ['en', '', 'Legal Notice', 'Privacy Policy', '7. Your rights', 'en_US'],
  ['de', '?lang=de', 'Impressum', 'Datenschutzerklärung', '7. Ihre Rechte', 'de_DE'],
  ['tr', '?lang=tr', 'Yasal Bildirim', 'Gizlilik Politikası', '7. Haklarınız', 'tr_TR'],
];

test('English footer links open the English notices without adding primary navigation items', async () => {
  render(<App />);
  expect(footer().closest('footer')).not.toBeNull();
  expect(footer()).toHaveAttribute('lang', 'en');
  expect(within(footer()).getByRole('link', { name: 'Legal Notice' })).toHaveAttribute('href', '/impressum');
  expect(within(footer()).getByRole('link', { name: 'Privacy Policy' })).toHaveAttribute('href', '/datenschutz');
  screen.getAllByRole('navigation', { name: 'Primary navigation' }).forEach(nav => {
    expect(within(nav).queryByRole('link', { name: 'Legal Notice' })).not.toBeInTheDocument();
  });
  fireEvent.click(within(footer()).getByRole('link', { name: 'Legal Notice' }));
  expect(await screen.findByRole('heading', { name: 'Legal Notice', level: 1 })).toHaveFocus();
  expect(document.documentElement.lang).toBe('en');
  expect(document.querySelector('.legal-draft,.nanowiss-preview-notice')).toBeNull();
  fireEvent.click(within(footer()).getByRole('link', { name: 'Privacy Policy' }));
  expect(await screen.findByRole('heading', { name: 'Privacy Policy', level: 1 })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: '7. Your rights' })).toBeInTheDocument();
});

const directRoutes = languages.flatMap(([lang, search, imprint, privacy, rights, locale]) => [
  [`/impressum${search}`, imprint, lang, `/impressum${search}`, locale],
  [`/datenschutz${search}`, privacy, lang, `/datenschutz${search}`, locale],
  [`/nanowiss/impressum${search}`, imprint, lang, `/impressum${search}`, locale],
  [`/nanowiss/datenschutz${search}`, privacy, lang, `/datenschutz${search}`, locale],
]);

test.each(directRoutes)('direct URL %s renders the selected language and matching metadata', (route, heading, language, canonical, locale) => {
  window.history.replaceState({}, '', route);
  render(<App />);
  expect(screen.getByRole('heading', { name: heading, level: 1 })).toBeInTheDocument();
  expect(screen.getByRole('main')).toHaveAttribute('lang', language);
  expect(document.documentElement.lang).toBe(language);
  expect(document.title).toBe(`${heading} | nanoWISS`);
  expect(document.head.querySelector('meta[property="og:locale"]')).toHaveAttribute('content', locale);
  expect(document.head.querySelector('link[rel="canonical"]')).toHaveAttribute('href', `https://www.nanowiss.com${canonical}`);
  expect(within(footer()).getByRole('link', { name: 'Legal Notice' })).toBeInTheDocument();
  expect(within(footer()).getByRole('link', { name: 'Privacy Policy' })).toBeInTheDocument();
});

test('language selection is shareable, survives a reload and is retained between legal pages', async () => {
  window.history.replaceState({}, '', '/impressum');
  const view = render(<App />);
  fireEvent.click(screen.getByRole('link', { name: 'Deutsch' }));
  expect(screen.getByRole('heading', { name: 'Impressum', level: 1 })).toHaveFocus();
  expect(window.location.search).toBe('?lang=de');
  fireEvent.click(screen.getByRole('link', { name: 'Türkçe' }));
  expect(screen.getByRole('heading', { name: 'Yasal Bildirim', level: 1 })).toHaveFocus();
  expect(screen.getByRole('link', { name: 'Türkçe' })).toHaveAttribute('aria-current', 'page');
  expect(document.documentElement.lang).toBe('tr');
  expect(window.location.search).toBe('?lang=tr');
  view.unmount();
  render(<App />);
  expect(screen.getByRole('heading', { name: 'Yasal Bildirim', level: 1 })).toBeInTheDocument();
  expect(within(footer()).getByRole('link', { name: 'Privacy Policy' })).toHaveAttribute('href', '/datenschutz?lang=tr');
  fireEvent.click(within(footer()).getByRole('link', { name: 'Privacy Policy' }));
  expect(screen.getByRole('heading', { name: 'Gizlilik Politikası', level: 1 })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: '7. Haklarınız' })).toBeInTheDocument();
  fireEvent.click(screen.getByRole('link', { name: 'nanoWISS home' }));
  await waitFor(() => expect(document.documentElement.lang).toBe('en'));
});

test('browser Back restores the prior legal language and metadata', async () => {
  window.history.replaceState({}, '', '/impressum?lang=de');
  render(<App />);
  fireEvent.click(screen.getByRole('link', { name: 'Türkçe' }));
  expect(document.documentElement.lang).toBe('tr');
  await act(async () => { window.history.back(); });
  await waitFor(() => expect(screen.getByRole('heading', { name: 'Impressum', level: 1 })).toBeInTheDocument());
  expect(document.documentElement.lang).toBe('de');
  expect(document.title).toBe('Impressum | nanoWISS');
});

test.each(['', 'fr', 'constructor', '__proto__'])('unsupported language %s safely falls back to English', language => {
  window.history.replaceState({}, '', `/datenschutz?lang=${language}`);
  render(<App />);
  expect(screen.getByRole('heading', { name: 'Privacy Policy', level: 1 })).toBeInTheDocument();
  expect(document.documentElement.lang).toBe('en');
});

test.each(languages)('company facts and representative scope remain correct in %s', (language, search, imprintTitle, privacyTitle, rightsTitle) => {
  window.history.replaceState({}, '', `/impressum${search}`);
  render(<App />);
  const imprint = screen.getByRole('main');
  expect(imprint).toHaveTextContent(legalDetails.operator.name);
  expect(imprint).toHaveTextContent('Boğaziçi Teknopark Kandilli Kampüsü 9');
  expect(imprint).toHaveTextContent('1119202');
  expect(imprint).toHaveTextContent('Zeynep Feyza Atabey');
  fireEvent.click(within(footer()).getByRole('link', { name: 'Privacy Policy' }));
  expect(screen.getByRole('heading', { name: privacyTitle, level: 1 })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: rightsTitle })).toBeInTheDocument();
  const privacy = screen.getByRole('main');
  expect(privacy).toHaveTextContent(legalDetails.operator.name);
  expect(privacy).not.toHaveTextContent('Zeynep Feyza Atabey');
  expect(within(privacy).getByRole('link', { name: 'info@nanowiss.com' })).toHaveAttribute('href', 'mailto:info@nanowiss.com');
  expect(within(privacy).getAllByRole('heading', { level: 2 })).toHaveLength(8);
});

test('an individual may omit optional register and representative entries', () => {
  const original = { ...legalDetails.operator };
  legalDetails.operator.kind = 'individual';
  delete legalDetails.operator.register;
  delete legalDetails.operator.representatives;
  try {
    window.history.replaceState({}, '', '/impressum');
    render(<App />);
    expect(screen.getByRole('heading', { name: 'Legal Notice', level: 1 })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Register entry' })).not.toBeInTheDocument();
  } finally {
    Object.assign(legalDetails.operator, original);
  }
});


const serviceDisclosures = [
  {
    language: 'en',
    hostingHeading: '2. Providing the website',
    emailHeading: '4. Contact by email',
    hostingText: [
      /including in the United States/,
      /GitHub stores visitor IP addresses for security/,
      /No Pages-specific deletion period/,
      /outside the EEA/,
    ],
    emailText: [
      /12 months after the enquiry has been resolved/,
      /ongoing contractual relationship/,
      /outside the European Economic Area/,
      /Standard Contractual Clauses/,
    ],
    termsLink: 'Google Workspace terms for processing email content',
  },
  {
    language: 'de',
    hostingHeading: '2. Bereitstellung der Website',
    emailHeading: '4. Kontaktaufnahme per E-Mail',
    hostingText: [
      /unter anderem in den USA/,
      /GitHub speichert Besucher-IP-Adressen/,
      /keine Pages-spezifische Löschfrist/,
      /außerhalb des EWR/,
    ],
    emailText: [
      /12 Monate nach abschließender Bearbeitung/,
      /laufendes Vertragsverhältnis/,
      /außerhalb des Europäischen Wirtschaftsraums/,
      /Standardvertragsklauseln/,
    ],
    termsLink: 'Google-Workspace-Bedingungen für die Verarbeitung von E-Mail-Inhalten',
  },
  {
    language: 'tr',
    hostingHeading: '2. Web sitesinin sunulması',
    emailHeading: '4. E-posta yoluyla iletişim',
    hostingText: [
      /ABD ve diğer ülkeler/,
      /ziyaretçilerin IP adreslerini güvenlik amacıyla saklar/,
      /Pages’e özgü bir silme süresi belirtilmez/,
      /Avrupa Ekonomik Alanı dışında/,
    ],
    emailText: [
      /talebin sonuçlandırılmasından 12 ay sonra/,
      /devam eden bir sözleşme ilişkisi/,
      /Avrupa Ekonomik Alanı dışında/,
      /Standart Sözleşme Maddelerini/,
    ],
    termsLink: 'E-posta içeriğinin işlenmesine ilişkin Google Workspace koşulları',
  },
];

test.each(serviceDisclosures)('service disclosures use the selected language: $language', expected => {
  window.history.replaceState({}, '', `/datenschutz?lang=${expected.language}`);
  render(<App />);
  const hosting = screen.getByRole('region', { name: expected.hostingHeading });
  const email = screen.getByRole('region', { name: expected.emailHeading });
  expected.hostingText.forEach(text => expect(within(hosting).getByText(text)).toBeInTheDocument());
  expected.emailText.forEach(text => expect(within(email).getByText(text)).toBeInTheDocument());
  expect(within(hosting).getByText('GitHub Pages — GitHub, Inc.')).toBeInTheDocument();
  expect(within(email).getByText(/Google Workspace \(Gmail\)/)).toBeInTheDocument();
  expect(within(email).getByRole('link', { name: expected.termsLink })).toHaveAttribute(
    'href', 'https://cloud.google.com/terms/data-processing-addendum',
  );
  if (expected.language !== 'en') {
    expect(hosting).not.toHaveTextContent('GitHub stores visitor IP addresses for security');
    expect(email).not.toHaveTextContent('12 months after the enquiry has been resolved');
  }
});
