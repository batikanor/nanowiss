import { Link, useLocation } from 'react-router-dom';
import { resolveLegalLanguage } from '../content/legal-translations';

const LegalLinks = () => {
  const location = useLocation();
  const legalPage = /\/(impressum|datenschutz)\/?$/.test(location.pathname);
  const language = legalPage ? resolveLegalLanguage(new URLSearchParams(location.search).get('lang')) : 'en';
  const search = language === 'en' ? '' : `?lang=${language}`;

  return (
    <nav className="legal-links" aria-label="Legal information" lang="en">
      <Link to={`/impressum${search}`}>Legal Notice</Link>
      <Link to={`/datenschutz${search}`}>Privacy Policy</Link>
    </nav>
  );
};

export default LegalLinks;
