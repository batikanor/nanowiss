import React from 'react';
import { ArrowRight, CheckCircle2, FlaskConical, Leaf, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import heroImage from '../assets/nwiss_backgr.jpg';
import mobileHeroImage from '../assets/nwiss_backgr_mobile.jpg';
import agrowissProduct from '../assets/agrowiss_product.png';
import agrowissTeam from '../assets/agrowiss_team.png';
import deviceImage from '../assets/nanoparticle_device.png';
import socialImpactAwardLogo from '../assets/social_impact_award.png';
import tubitakBiggLogo from '../assets/tubitak_bigg.png';
import migrantAcceleratorLogo from '../assets/migrant_accelerator.png';

const proofPoints = [
  'TUBITAK Seal of Excellence for chitosan nanoparticle-based agricultural improver',
  'Finalist for Social Impact Award Germany',
  'AgroWISS incorporated at Bogazici University Teknopark with TUBITAK BIGG support',
];

const hiddenConcepts = [
  {
    title: 'Constellation',
    path: '/alternative/constellation',
    description: 'A cosmic product map that presents nanoWISS as a connected nanoparticle platform.',
  },
  {
    title: 'Control Room',
    path: '/alternative/control-room',
    description: 'A production-system command center for scale-up, batch control, and process confidence.',
  },
  {
    title: 'Agro Lab',
    path: '/alternative/agro-lab',
    description: 'A living field and release-model page for AgroWISS slow-release crop protection.',
  },
  {
    title: 'Clinical',
    path: '/alternative/clinical',
    description: 'A biofilm barrier explainer for health-tech and disinfection applications.',
  },
  {
    title: '3D Reactor',
    path: '/alternative/orbital-reactor',
    description: 'A focused nanoWISS product story around synthesis, scale-up, and application fit.',
  },
  {
    title: 'Specimen Vault',
    path: '/alternative/specimen-vault',
    description: 'A premium museum-like product archive with a completely different editorial feel.',
  },
  {
    title: 'Launch Sequence',
    path: '/alternative/launch-sequence',
    description: 'A cinematic scrollytelling homepage for the nanoWISS business story.',
  },
  {
    title: 'Biofilm Breaker',
    path: '/alternative/biofilm-breaker',
    description: 'An interactive nanoWISS explainer around carrier behavior and resistant biofilm environments.',
  },
  {
    title: 'Material Field',
    path: '/alternative/splat-lab',
    description: 'A luminous material-field story for nanoWISS carrier systems and product evidence.',
  },
  {
    title: 'Impact Portal',
    path: '/alternative/impact-portal',
    description: 'A cinematic investor room with orbiting proof, product, team, and mission panels.',
  },
  {
    title: 'Neon Research City',
    path: '/alternative/neon-research-city',
    description: 'A procedural 3D research district for nanoWISS capabilities.',
  },
  {
    title: 'Particle Quest',
    path: '/alternative/particle-quest',
    description: 'A polished playable scientific homepage with instrument-like product storytelling.',
  },
  {
    title: 'AgroOrbit',
    path: '/alternative/agro-orbit',
    description: 'A nanoWISS agriculture homepage with orbiting field intelligence and growth systems.',
  },
  {
    title: 'Clinical Eclipse',
    path: '/alternative/clinical-eclipse',
    description: 'A dark medical-science homepage around biofilm interfaces and validation pathways.',
  },
  {
    title: 'Material Atlas',
    path: '/alternative/material-atlas',
    description: 'A data-visualization atlas of nanoWISS materials, evidence, and applications.',
  },
  {
    title: 'Breath Signal',
    path: '/alternative/breath-signal',
    description: 'A calm respiratory delivery homepage with signal paths and lung-inspired visuals.',
  },
  {
    title: 'Nano Cinema',
    path: '/alternative/nano-cinema',
    description: 'A cinematic scroll homepage with film-strip product storytelling.',
  },
  {
    title: 'Founder Lab',
    path: '/alternative/founder-lab',
    description: 'A premium editorial lab notebook centered on the nanoWISS team.',
  },
  {
    title: 'Product Theater',
    path: '/alternative/product-theater',
    description: 'A premium product showroom for nanoWISS platform systems.',
  },
  {
    title: 'Signal Observatory',
    path: '/alternative/signal-observatory',
    description: 'A waveform and instrumentation homepage for nanoparticle science.',
  },
  {
    title: 'Material Garden',
    path: '/alternative/splat-garden',
    description: 'A spatial nanoWISS product story for material behavior, proof, and application pathways.',
  },
  {
    title: 'Nano Instrument',
    path: '/alternative/nano-instrument',
    description: 'A polished nanoWISS company page organized around synthesis, scale-up, and validation.',
  },
  {
    title: 'Evidence Mosaic',
    path: '/alternative/evidence-mosaic',
    description: 'An editorial nanoWISS homepage that assembles research, products, team, and proof into one story.',
  },
  {
    title: 'Clinical Whitepaper',
    path: '/alternative/clinical-whitepaper',
    description: 'A restrained medical-science page for biofilm interfaces, formulation thinking, and validation paths.',
  },
  {
    title: 'Field Notebook',
    path: '/alternative/field-notebook',
    description: 'A warm AgroWISS field page connecting nanoWISS material science to sustainable crop protection.',
  },
  {
    title: 'Partner Briefing',
    path: '/alternative/partner-briefing',
    description: 'A high-contrast company page for partner and investor conversations around proof and readiness.',
  },
];

const AlternativePage = () => {
  return (
    <div className="min-h-screen bg-[#f7faf7] text-[#16221d]">
      <Navbar />
      <main>
        <section className="relative min-h-[34rem] overflow-hidden">
          <img src={heroImage} alt="Nanoparticle visualization" className="absolute inset-0 hidden h-full w-full object-cover md:block" />
          <img src={mobileHeroImage} alt="Nanoparticle visualization" className="absolute inset-0 h-full w-full object-cover md:hidden" />
          <div className="absolute inset-0 bg-[#0a1f1a]/70" />
          <div className="container relative mx-auto flex min-h-[34rem] items-center px-4 py-16 text-white">
            <div className="max-w-3xl">
              <p className="font-semibold uppercase tracking-wide text-[#9ee6bf]">nanoWISS Homepage Lab</p>
              <h1 className="mt-4 text-4xl font-extrabold md:text-6xl">
                Nanoparticle platforms for medical resilience and sustainable agriculture.
              </h1>
              <p className="mt-6 text-lg text-white/85 md:text-xl">
                nanoWISS connects deep-tech nanoparticle science with focused application paths,
                making the platform, product logic, proof, and team easier to understand for partners,
                investors, and grant reviewers.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 rounded-full bg-[#9ee6bf] px-6 py-3 font-bold text-[#10231b] transition hover:bg-white"
                >
                  Explore Technologies
                  <ArrowRight size={18} />
                </Link>
                <Link
                  to="/alternative/showcase"
                  className="inline-flex items-center gap-2 rounded-full bg-primary-light px-6 py-3 font-bold text-white transition hover:bg-white hover:text-primary-dark"
                >
                  Animated Showcase
                  <ArrowRight size={18} />
                </Link>
                <Link
                  to="/agrowiss"
                  className="inline-flex items-center gap-2 rounded-full border border-white px-6 py-3 font-bold text-white transition hover:bg-white hover:text-[#10231b]"
                >
                  View AgroWISS
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto grid grid-cols-1 gap-8 px-4 lg:grid-cols-3">
            <article className="rounded-lg bg-white p-7 shadow">
              <FlaskConical className="mb-5 text-[#276a4a]" size={40} />
              <h2 className="text-2xl font-bold">nanoWISS</h2>
              <p className="mt-3 text-[#4f625a]">
                Nanoparticle synthesis and production systems for scalable biotechnology applications.
              </p>
              <img src={deviceImage} alt="nanoWISS nanoparticle production system" className="mt-6 h-48 w-full object-contain" />
            </article>
            <article className="rounded-lg bg-white p-7 shadow">
              <Leaf className="mb-5 text-[#276a4a]" size={40} />
              <h2 className="text-2xl font-bold">AgroWISS</h2>
              <p className="mt-3 text-[#4f625a]">
                Eco-friendly biological crop protection using chitosan-based carrier systems.
              </p>
              <img src={agrowissProduct} alt="AgroWISS product concept" className="mt-6 h-48 w-full object-contain" />
            </article>
            <article className="rounded-lg bg-white p-7 shadow">
              <Users className="mb-5 text-[#276a4a]" size={40} />
              <h2 className="text-2xl font-bold">Team</h2>
              <p className="mt-3 text-[#4f625a]">
                Molecular biotechnology, nanoscience, biomedical engineering, chemical engineering,
                product development, and communication in one focused team.
              </p>
              <img src={agrowissTeam} alt="AgroWISS team" className="mt-6 h-48 w-full rounded-md object-cover" />
            </article>
          </div>
        </section>

        <section className="bg-[#1a1a2e] py-16 text-white">
          <div className="container mx-auto grid grid-cols-1 items-center gap-8 px-4 lg:grid-cols-[1fr_0.8fr]">
            <div>
              <p className="font-semibold uppercase tracking-wide text-primary-light">New Product Theater</p>
              <h2 className="mt-3 text-3xl font-extrabold md:text-4xl">
                See nanoWISS technologies with animated, high-detail product storytelling.
              </h2>
              <p className="mt-5 max-w-3xl text-lg text-white/75">
                The showcase page adds multiple visual systems for explaining how nanoparticle
                synthesis, production systems, and AgroWISS delivery technologies work.
              </p>
            </div>
            <Link
              to="/alternative/showcase"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary-light px-7 py-4 text-lg font-bold text-white transition hover:bg-white hover:text-primary-dark"
            >
              Open Animated Showcase
              <ArrowRight size={20} />
            </Link>
          </div>
        </section>

        <section className="bg-[#12051f] py-16 text-white">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <p className="font-semibold uppercase tracking-wide text-primary-light">Private Homepage Routes</p>
              <h2 className="mt-3 text-3xl font-extrabold md:text-4xl">
                Complete nanoWISS homepage experiences, each with a different visual language.
              </h2>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {hiddenConcepts.map((concept) => (
                <Link
                  key={concept.path}
                  to={concept.path}
                  className="group rounded-lg border border-white/10 bg-white/[0.06] p-5 transition hover:-translate-y-1 hover:border-primary-light hover:bg-white/[0.1]"
                >
                  <p className="text-sm font-bold uppercase tracking-wide text-primary-light">{concept.title}</p>
                  <p className="mt-3 text-white/72">{concept.description}</p>
                  <span className="mt-5 inline-flex items-center gap-2 font-bold text-white">
                    View homepage
                    <ArrowRight size={16} className="transition group-hover:translate-x-1" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-16">
          <div className="container mx-auto grid grid-cols-1 gap-10 px-4 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="font-semibold uppercase tracking-wide text-[#276a4a]">Why This Homepage Works</p>
              <h2 className="mt-3 text-3xl font-extrabold md:text-4xl">
                It separates brand architecture from product detail.
              </h2>
              <p className="mt-5 text-lg text-[#4f625a]">
                The page is optimized for business scanning: what the platform does, where each
                application fits, what proof exists, and what action a partner should take next.
              </p>
            </div>
            <div className="rounded-lg bg-[#eef7f0] p-6">
              {proofPoints.map((point) => (
                <div key={point} className="flex gap-3 border-b border-[#cfe3d6] py-4 last:border-b-0">
                  <CheckCircle2 className="mt-1 shrink-0 text-[#276a4a]" size={22} />
                  <p className="text-[#31453d]">{point}</p>
                </div>
              ))}
              <div className="mt-6 grid grid-cols-3 gap-3">
                <img src={tubitakBiggLogo} alt="TUBITAK BIGG" className="h-20 rounded bg-white object-contain p-2" />
                <img src={socialImpactAwardLogo} alt="Social Impact Award Germany" className="h-20 rounded bg-white object-contain p-2" />
                <img src={migrantAcceleratorLogo} alt="The Migrant Accelerator" className="h-20 rounded bg-white object-contain p-2" />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AlternativePage;
