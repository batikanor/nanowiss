import './App.css';
import HomePage from './components/HomePage';
import TeamPage from './components/TeamPage'; // Import the TeamPage
import ProductsPage from './components/ProductsPage'; // Import the ProductsPage
import AgroWissPage from './components/AgroWissPage';
import SocialImpactPage from './components/SocialImpactPage';
import AlternativePage from './components/AlternativePage';
import AlternativeShowcasePage from './components/AlternativeShowcasePage';
import {
  AlternativeAgroLabPage,
  AlternativeClinicalPage,
  AlternativeConstellationPage,
  AlternativeControlRoomPage,
} from './components/AlternativeConceptPages';
import {
  AlternativeBiofilmBreakerPage,
  AlternativeImpactPortalPage,
  AlternativeLaunchSequencePage,
  AlternativeOrbitalReactorPage,
  AlternativeSplatLabPage,
  AlternativeSpecimenVaultPage,
} from './components/AlternativeExperimentalPages';
import {
  AgroOrbitSite,
  BreathSignalSite,
  ClinicalEclipseSite,
  ClinicalWhitepaperSite,
  EvidenceMosaicSite,
  FieldNotebookSite,
  FounderLabSite,
  MaterialAtlasSite,
  NanoCinemaSite,
  NanoInstrumentSite,
  NeonResearchCitySite,
  ParticleQuestSite,
  ProductTheaterSite,
  PartnerBriefingSite,
  SignalObservatorySite,
  SplatGardenSite,
} from './components/AlternativeStandaloneSites';
import Seo from './components/Seo';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';

const pageSeo = {
  '/': {
    title: 'nanoWISS | Sustainable Nanoparticle Technologies for Health and Agriculture',
    description:
      "Let's take a Deep breath. Sustainable Nanoparticle Technologies for healthier people and planet.",
    keywords:
      'nanoWISS, nanoparticles, nanotechnology, nanoparticle synthesis, biofilm research, cystic fibrosis, AgroWISS, agricultural biotechnology',
  },
  '/team': {
    title: 'Team | nanoWISS',
    description:
      'Meet the nanoWISS team working across molecular biotechnology, nanoscience, biomedical engineering, chemical engineering, product development, science communication, and AI / IT mentoring.',
    keywords:
      'nanoWISS team, biotechnology founders, nanoscience team, AgroWISS founders, molecular biotechnology, AI IT mentor',
  },
  '/products': {
    title: 'Products and Technologies | nanoWISS',
    description:
      'Explore nanoWISS sustainable nanoparticle synthesis, scalable nanoparticle production systems, and application pipelines for health, disinfection, and agricultural biotechnology.',
    keywords:
      'nanoparticle production system, nanoparticle synthesis, biofilm treatment research, nanoWISS products, nanotechnology applications',
  },
  '/agrowiss': {
    title: 'AgroWISS Agricultural Biotechnology | nanoWISS',
    description:
      'AgroWISS develops eco-friendly crop protection technologies using chitosan nanoparticle carrier systems and slow-release agricultural biotechnology.',
    keywords:
      'AgroWISS, agricultural biotechnology, chitosan nanoparticles, crop protection, slow release plant protection',
  },
  '/social-impact': {
    title: 'Social Impact Story | nanoWISS',
    description:
      'Read the nanoWISS social impact story, from health-focused nanoparticle research to sustainable agricultural biotechnology through AgroWISS.',
    keywords:
      'nanoWISS social impact, Social Impact Award Germany, biotechnology impact, AgroWISS sustainability, nanoparticle research',
  },
};

const alternativeSeo = {
  title: 'nanoWISS Company Experience | nanoWISS',
  description:
    'nanoWISS company-focused experiences for explaining the team, platform, applications, and partner value behind its nanoparticle work.',
  keywords: 'nanoWISS company, nanoparticle platform, biotechnology startup, AgroWISS, nanoparticle applications',
  robots: 'noindex, nofollow',
};

const getSeoForPath = (pathname) => {
  const normalized = pathname.replace(/\/$/, '') || '/';
  const canonicalPath = normalized.startsWith('/nanowiss')
    ? normalized.replace('/nanowiss', '') || '/'
    : normalized;

  if (canonicalPath.startsWith('/alternative')) {
    return {
      ...alternativeSeo,
      path: canonicalPath,
    };
  }

  return {
    ...(pageSeo[canonicalPath] || pageSeo['/']),
    path: canonicalPath,
    robots: normalized.startsWith('/nanowiss') ? 'noindex, follow' : 'index, follow',
  };
};

function AppRoutes() {
  const location = useLocation();
  const seo = getSeoForPath(location.pathname);

  return (
    <>
      <Seo {...seo} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/agrowiss" element={<AgroWissPage />} />
        <Route path="/social-impact" element={<SocialImpactPage />} />
        <Route path="/alternative" element={<AlternativePage />} />
        <Route path="/alternative/showcase" element={<AlternativeShowcasePage />} />
        <Route path="/alternative/constellation" element={<AlternativeConstellationPage />} />
        <Route path="/alternative/control-room" element={<AlternativeControlRoomPage />} />
        <Route path="/alternative/agro-lab" element={<AlternativeAgroLabPage />} />
        <Route path="/alternative/clinical" element={<AlternativeClinicalPage />} />
        <Route path="/alternative/orbital-reactor" element={<AlternativeOrbitalReactorPage />} />
        <Route path="/alternative/specimen-vault" element={<AlternativeSpecimenVaultPage />} />
        <Route path="/alternative/launch-sequence" element={<AlternativeLaunchSequencePage />} />
        <Route path="/alternative/biofilm-breaker" element={<AlternativeBiofilmBreakerPage />} />
        <Route path="/alternative/splat-lab" element={<AlternativeSplatLabPage />} />
        <Route path="/alternative/impact-portal" element={<AlternativeImpactPortalPage />} />
        <Route path="/alternative/neon-research-city" element={<NeonResearchCitySite />} />
        <Route path="/alternative/particle-quest" element={<ParticleQuestSite />} />
        <Route path="/alternative/agro-orbit" element={<AgroOrbitSite />} />
        <Route path="/alternative/clinical-eclipse" element={<ClinicalEclipseSite />} />
        <Route path="/alternative/material-atlas" element={<MaterialAtlasSite />} />
        <Route path="/alternative/breath-signal" element={<BreathSignalSite />} />
        <Route path="/alternative/nano-cinema" element={<NanoCinemaSite />} />
        <Route path="/alternative/founder-lab" element={<FounderLabSite />} />
        <Route path="/alternative/product-theater" element={<ProductTheaterSite />} />
        <Route path="/alternative/signal-observatory" element={<SignalObservatorySite />} />
        <Route path="/alternative/splat-garden" element={<SplatGardenSite />} />
        <Route path="/alternative/nano-instrument" element={<NanoInstrumentSite />} />
        <Route path="/alternative/evidence-mosaic" element={<EvidenceMosaicSite />} />
        <Route path="/alternative/clinical-whitepaper" element={<ClinicalWhitepaperSite />} />
        <Route path="/alternative/field-notebook" element={<FieldNotebookSite />} />
        <Route path="/alternative/partner-briefing" element={<PartnerBriefingSite />} />
        <Route path="/nanowiss" element={<HomePage />} />
        <Route path="/nanowiss/team" element={<TeamPage />} />
        <Route path="/nanowiss/products" element={<ProductsPage />} />
        <Route path="/nanowiss/agrowiss" element={<AgroWissPage />} />
        <Route path="/nanowiss/social-impact" element={<SocialImpactPage />} />
        <Route path="/nanowiss/alternative" element={<AlternativePage />} />
        <Route path="/nanowiss/alternative/showcase" element={<AlternativeShowcasePage />} />
        <Route path="/nanowiss/alternative/constellation" element={<AlternativeConstellationPage />} />
        <Route path="/nanowiss/alternative/control-room" element={<AlternativeControlRoomPage />} />
        <Route path="/nanowiss/alternative/agro-lab" element={<AlternativeAgroLabPage />} />
        <Route path="/nanowiss/alternative/clinical" element={<AlternativeClinicalPage />} />
        <Route path="/nanowiss/alternative/orbital-reactor" element={<AlternativeOrbitalReactorPage />} />
        <Route path="/nanowiss/alternative/specimen-vault" element={<AlternativeSpecimenVaultPage />} />
        <Route path="/nanowiss/alternative/launch-sequence" element={<AlternativeLaunchSequencePage />} />
        <Route path="/nanowiss/alternative/biofilm-breaker" element={<AlternativeBiofilmBreakerPage />} />
        <Route path="/nanowiss/alternative/splat-lab" element={<AlternativeSplatLabPage />} />
        <Route path="/nanowiss/alternative/impact-portal" element={<AlternativeImpactPortalPage />} />
        <Route path="/nanowiss/alternative/neon-research-city" element={<NeonResearchCitySite />} />
        <Route path="/nanowiss/alternative/particle-quest" element={<ParticleQuestSite />} />
        <Route path="/nanowiss/alternative/agro-orbit" element={<AgroOrbitSite />} />
        <Route path="/nanowiss/alternative/clinical-eclipse" element={<ClinicalEclipseSite />} />
        <Route path="/nanowiss/alternative/material-atlas" element={<MaterialAtlasSite />} />
        <Route path="/nanowiss/alternative/breath-signal" element={<BreathSignalSite />} />
        <Route path="/nanowiss/alternative/nano-cinema" element={<NanoCinemaSite />} />
        <Route path="/nanowiss/alternative/founder-lab" element={<FounderLabSite />} />
        <Route path="/nanowiss/alternative/product-theater" element={<ProductTheaterSite />} />
        <Route path="/nanowiss/alternative/signal-observatory" element={<SignalObservatorySite />} />
        <Route path="/nanowiss/alternative/splat-garden" element={<SplatGardenSite />} />
        <Route path="/nanowiss/alternative/nano-instrument" element={<NanoInstrumentSite />} />
        <Route path="/nanowiss/alternative/evidence-mosaic" element={<EvidenceMosaicSite />} />
        <Route path="/nanowiss/alternative/clinical-whitepaper" element={<ClinicalWhitepaperSite />} />
        <Route path="/nanowiss/alternative/field-notebook" element={<FieldNotebookSite />} />
        <Route path="/nanowiss/alternative/partner-briefing" element={<PartnerBriefingSite />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
