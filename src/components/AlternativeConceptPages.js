import React from 'react';
import {
  Activity,
  Beaker,
  Cpu,
  Factory,
  Leaf,
  Orbit,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import deviceImage from '../assets/nanoparticle_device.png';
import labImage from '../assets/lab_nanoparticle.png';
import agrowissProduct from '../assets/agrowiss_product.png';
import productImage from '../assets/product1.png';

const variants = {
  constellation: {
    title: 'nanoWISS Constellation',
    kicker: 'Spatial Product Map',
    subtitle:
      'A cosmic product map for presenting the platform as a connected universe of nanoparticle applications.',
    className: 'concept-constellation',
    accent: '#b083ff',
    image: labImage,
    icon: Orbit,
    points: ['Synthesis core', 'Production system', 'AgroWISS delivery', 'Biofilm pipeline'],
  },
  'control-room': {
    title: 'Autonomous Production Room',
    kicker: 'Production Command Center',
    subtitle:
      'A command-center layout for explaining scale-up, automation, batch control, and production reliability.',
    className: 'concept-control',
    accent: '#8a5cf6',
    image: deviceImage,
    icon: Factory,
    points: ['Batch telemetry', 'Flow control', 'Quality window', 'Scale-up readiness'],
  },
  'agro-lab': {
    title: 'AgroWISS Release Garden',
    kicker: 'Agricultural Release System',
    subtitle:
      'A living-field homepage that makes the slow-release crop protection mechanism feel immediate and tangible.',
    className: 'concept-agro',
    accent: '#9ee6bf',
    image: agrowissProduct,
    icon: Leaf,
    points: ['Chitosan shell', 'Natural actives', 'Slow release', 'Lower spray frequency'],
  },
  clinical: {
    title: 'Biofilm Barrier Lab',
    kicker: 'Biofilm Interface System',
    subtitle:
      'A clinical-facing explainer that shows nanoparticles moving through a resistant biofilm environment.',
    className: 'concept-clinical',
    accent: '#b083ff',
    image: productImage,
    icon: ShieldCheck,
    points: ['Biofilm focus', 'Surface contact', 'Nanoparticle delivery', 'Health-tech pathway'],
  },
};

const FloatingMolecules = ({ count = 18 }) => (
  <div className="concept-molecules" aria-hidden="true">
    {Array.from({ length: count }).map((_, index) => (
      <span key={index} className={`concept-molecule concept-molecule-${(index % 12) + 1}`} />
    ))}
  </div>
);

const SpecPanel = ({ title, children, icon: Icon }) => (
  <article className="rounded-lg border border-white/12 bg-white/[0.07] p-5 shadow-xl backdrop-blur">
    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-md bg-primary-light text-white">
      <Icon size={24} />
    </div>
    <h3 className="text-lg font-bold text-white">{title}</h3>
    <p className="mt-3 text-sm leading-6 text-white/68">{children}</p>
  </article>
);

const ConstellationScene = ({ variant }) => (
  <div className="concept-scene concept-scene-orbit">
    <FloatingMolecules count={24} />
    <div className="concept-orbit-ring concept-orbit-ring-a" />
    <div className="concept-orbit-ring concept-orbit-ring-b" />
    <div className="concept-orbit-center">
      <variant.icon size={48} />
    </div>
    <div className="concept-orbit-strip">
      {variant.points.map((point) => (
        <span key={point}>{point}</span>
      ))}
    </div>
  </div>
);

const ControlRoomScene = () => (
  <div className="concept-scene concept-control-room">
    <div className="control-grid">
      <div className="control-screen control-screen-wide">
        <span>Batch stability</span>
        <div className="control-wave" />
      </div>
      <div className="control-screen">
        <span>Flow</span>
        <strong>92%</strong>
      </div>
      <div className="control-screen">
        <span>Size target</span>
        <strong>OK</strong>
      </div>
      <div className="control-conveyor">
        <span />
        <span />
        <span />
      </div>
    </div>
    <img src={deviceImage} alt="nanoWISS production system" className="concept-device-float" />
  </div>
);

const AgroScene = () => (
  <div className="concept-scene concept-agro-field">
    <img src={agrowissProduct} alt="AgroWISS slow release product" className="concept-agro-product" />
    <div className="agro-leaf agro-leaf-a" />
    <div className="agro-leaf agro-leaf-b" />
    <div className="agro-leaf agro-leaf-c" />
    <div className="agro-drop agro-drop-a" />
    <div className="agro-drop agro-drop-b" />
    <div className="agro-drop agro-drop-c" />
  </div>
);

const ClinicalScene = () => (
  <div className="concept-scene concept-clinical-lab">
    <div className="biofilm-layer">
      <span />
      <span />
      <span />
      <span />
      <span />
    </div>
    <div className="clinical-particle clinical-particle-a" />
    <div className="clinical-particle clinical-particle-b" />
    <div className="clinical-particle clinical-particle-c" />
    <img src={productImage} alt="Biofilm application platform" className="concept-clinical-product" />
  </div>
);

const Scene = ({ slug, variant }) => {
  if (slug === 'control-room') return <ControlRoomScene />;
  if (slug === 'agro-lab') return <AgroScene />;
  if (slug === 'clinical') return <ClinicalScene />;
  return <ConstellationScene variant={variant} />;
};

const AlternativeConceptPage = ({ slug }) => {
  const variant = variants[slug] || variants.constellation;
  const Icon = variant.icon;

  return (
    <div className={`min-h-screen bg-[#12051f] text-white ${variant.className}`}>
      <Navbar />
      <main>
        <section className="relative overflow-hidden">
          <div className="concept-backdrop" />
          <div className="container relative mx-auto grid min-h-[44rem] grid-cols-1 items-center gap-10 px-4 py-16 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="font-bold uppercase tracking-wide text-primary-light">{variant.kicker}</p>
              <h1 className="mt-4 text-4xl font-extrabold md:text-6xl">{variant.title}</h1>
              <p className="mt-6 max-w-2xl text-lg text-white/72">{variant.subtitle}</p>
            </div>
            <Scene slug={slug} variant={variant} />
          </div>
        </section>

        <section className="bg-[#1a1a2e] py-16">
          <div className="container mx-auto grid grid-cols-1 gap-8 px-4 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-lg border border-white/10 bg-white/[0.06] p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-md bg-primary-light text-white">
                  <Icon size={30} />
                </div>
                <div>
                  <p className="text-sm font-bold uppercase tracking-wide text-primary-light">Product Narrative</p>
                  <h2 className="text-2xl font-bold">{variant.title}</h2>
                </div>
              </div>
              <img src={variant.image} alt={variant.title} className="mt-8 h-72 w-full rounded-md bg-[#0b0315] object-contain p-6" />
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <SpecPanel title="Core Mechanism" icon={Beaker}>
                Translate lab synthesis into a product story with visible control over carrier,
                active ingredient, particle behavior, and intended application.
              </SpecPanel>
              <SpecPanel title="Demo Value" icon={Sparkles}>
                Use motion to communicate what static product photos cannot: release timing,
                particle movement, production flow, and system relationships.
              </SpecPanel>
              <SpecPanel title="Technology Surface" icon={Cpu}>
                Make the platform feel modern and precise without inventing unsupported medical or
                regulatory claims.
              </SpecPanel>
              <SpecPanel title="Business Use" icon={Activity}>
                Built for pitch decks, partner walkthroughs, investor calls, and product demonstrations.
              </SpecPanel>
            </div>
          </div>
        </section>

        <section className="bg-[#0d0318] py-16">
          <div className="container mx-auto px-4">
            <p className="text-center font-bold uppercase tracking-wide text-primary-light">nanoWISS Platform</p>
            <h2 className="mx-auto mt-3 max-w-3xl text-center text-3xl font-extrabold md:text-5xl">
              A complete product story built for partner walkthroughs
            </h2>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export const AlternativeConstellationPage = () => <AlternativeConceptPage slug="constellation" />;
export const AlternativeControlRoomPage = () => <AlternativeConceptPage slug="control-room" />;
export const AlternativeAgroLabPage = () => <AlternativeConceptPage slug="agro-lab" />;
export const AlternativeClinicalPage = () => <AlternativeConceptPage slug="clinical" />;
