import React from 'react';
import { Link } from 'react-router-dom';
import socialImpactAwardLogo from '../assets/social_impact_award.png';
import migrantAcceleratorLogo from '../assets/migrant_accelerator.png';
import tubitakBiggLogo from '../assets/tubitak_bigg.png';
import bogaziciTeknoparkLogo from '../assets/bogazici_teknopark.png';
import turkiyeKalkinmaFonuLogo from '../assets/turkiye_kalkinma_fonu.png';

const nanoWissPartners = [
  {
    name: 'Social Impact Award Germany',
    logo: socialImpactAwardLogo,
    href: 'https://germany.socialimpactaward.net/project/nanowiss/',
  },
  {
    name: 'The Migrant Accelerator',
    logo: migrantAcceleratorLogo,
    href: 'https://themigrantaccelerator.com',
  },
];

const agroWissPartners = [
  {
    name: 'TUBITAK BIGG',
    logo: tubitakBiggLogo,
    href: 'https://bigg.tubitak.gov.tr',
  },
  {
    name: 'Bogazici University Teknopark',
    logo: bogaziciTeknoparkLogo,
    href: 'https://bogaziciteknopark.com',
  },
  {
    name: 'Turkiye Kalkinma Fonu',
    logo: turkiyeKalkinmaFonuLogo,
    href: 'https://turkiyekalkinmafonu.com.tr',
  },
];

const sitemapLinks = [
  ['/', 'Home'],
  ['/products', 'Products'],
  ['/agrowiss', 'AgroWISS'],
  ['/team', 'Team'],
  ['/social-impact', 'Social Impact'],
];

const partnerSets = {
  nanowiss: nanoWissPartners,
  agrowiss: agroWissPartners,
};

const Footer = ({ showCredit = false, partnerSet = 'nanowiss' }) => {
  const partners = partnerSets[partnerSet] || [];

  return (
    <footer className="bg-primary-dark text-white">
      <section className="border-b border-white/10 py-10">
        <div className="container mx-auto grid gap-8 px-4 md:grid-cols-[1.3fr_0.7fr]">
          <div>
            <h2 className="text-2xl font-bold">nanoWISS</h2>
            <p className="mt-3 max-w-2xl text-white/75">
              Nanoparticle technologies for health, scalable production systems, and
              AgroWISS agricultural biotechnology.
            </p>
            <a
              href="mailto:info@nanowiss.com"
              className="mt-5 inline-flex rounded-full border border-white/25 px-5 py-2 font-semibold text-white transition hover:border-primary-light hover:text-primary-light"
            >
              info@nanowiss.com
            </a>
          </div>
          <nav aria-label="Footer sitemap">
            <h3 className="font-bold uppercase tracking-wide text-primary-light">Sitemap</h3>
            <ul className="mt-4 grid grid-cols-2 gap-3">
              {sitemapLinks.map(([href, label]) => (
                <li key={href}>
                  <Link className="text-white/75 transition hover:text-primary-light" to={href}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      {partners.length > 0 && (
        <section className="border-b border-white/10 py-10">
          <div className="container mx-auto px-4">
            <h2 className="mb-6 text-center text-2xl font-bold">Our Partners</h2>
            <div className="mx-auto grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-3">
              {partners.map((partner) => (
                <a
                  key={partner.name}
                  href={partner.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-28 items-center justify-center rounded-lg bg-white p-4 transition hover:-translate-y-1 hover:shadow-lg"
                  aria-label={partner.name}
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-h-20 w-full object-contain"
                  />
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      <div className="container mx-auto px-4 py-8 text-center">
        <p>&copy; 2026 nanoWISS. All rights reserved.</p>
        {showCredit && (
          <p className="mt-2 text-xs text-gray-400">
            Special thanks to our friend Batikan Bora Ormanci for creating this web app for nanoWISS.
          </p>
        )}
      </div>
    </footer>
  );
};

export default Footer;
