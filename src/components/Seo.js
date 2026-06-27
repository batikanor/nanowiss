import { useEffect } from 'react';

const SITE_URL = 'https://www.nanowiss.com';
const DEFAULT_IMAGE = `${SITE_URL}/nanowiss-preview-white-logo.png`;

const defaultStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'nanoWISS',
  url: SITE_URL,
  logo: DEFAULT_IMAGE,
  email: 'info@nanowiss.com',
  slogan: "Let's take a Deep breath",
  sameAs: ['https://www.nanowiss.com/'],
  subOrganization: {
    '@type': 'Organization',
    name: 'AgroWISS Biotechnology Research Inc.',
    url: `${SITE_URL}/agrowiss`,
  },
  knowsAbout: [
    'Nanoparticle synthesis',
    'Nanotechnology',
    'Biofilm treatment research',
    'Agricultural biotechnology',
    'Chitosan nanoparticle systems',
  ],
};

const setMeta = (attribute, key, content) => {
  if (!content) return;
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
};

const setLink = (rel, href) => {
  if (!href) return;
  let element = document.head.querySelector(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }
  element.setAttribute('href', href);
};

const setJsonLd = (data) => {
  if (!data) return;
  let element = document.getElementById('nanowiss-jsonld');
  if (!element) {
    element = document.createElement('script');
    element.id = 'nanowiss-jsonld';
    element.type = 'application/ld+json';
    document.head.appendChild(element);
  }
  element.textContent = JSON.stringify(data);
};

const Seo = ({
  title,
  description,
  path = '/',
  image = DEFAULT_IMAGE,
  robots = 'index, follow',
  keywords,
  type = 'website',
  structuredData = defaultStructuredData,
}) => {
  useEffect(() => {
    const canonicalPath = path === '/' ? '/' : path.replace(/\/$/, '');
    const canonicalUrl = `${SITE_URL}${canonicalPath}`;
    const fullTitle = title.includes('nanoWISS') ? title : `${title} | nanoWISS`;

    document.documentElement.lang = 'en';
    document.title = fullTitle;

    setMeta('name', 'description', description);
    setMeta('name', 'robots', robots);
    setMeta('name', 'author', 'nanoWISS');
    setMeta('name', 'keywords', keywords);
    setMeta('name', 'theme-color', '#422768');
    setMeta('property', 'og:type', type);
    setMeta('property', 'og:site_name', 'nanoWISS');
    setMeta('property', 'og:locale', 'en_US');
    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', canonicalUrl);
    setMeta('property', 'og:image', image);
    setMeta('property', 'og:image:secure_url', image);
    setMeta('property', 'og:image:type', 'image/png');
    setMeta('property', 'og:image:width', '1200');
    setMeta('property', 'og:image:height', '630');
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', fullTitle);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', image);
    setLink('canonical', canonicalUrl);
    setJsonLd(structuredData);
  }, [description, image, keywords, path, robots, structuredData, title, type]);

  return null;
};

export default Seo;
