import React from 'react';
import {
  Beaker,
  CircuitBoard,
  Droplets,
  Factory,
  Gauge,
  Layers3,
  Leaf,
  Microscope,
  ShieldCheck,
  Sparkles,
  TimerReset,
} from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import deviceImage from '../assets/nanoparticle_device.png';
import labImage from '../assets/lab_nanoparticle.png';
import agrowissProduct from '../assets/agrowiss_product.png';
import productImage from '../assets/product1.png';

const productVariants = [
  {
    eyebrow: 'System 01',
    title: 'Precision Nanoparticle Synthesis',
    description:
      'Laboratory synthesis for controlled particle size, stable formulations, and repeatable R&D batches.',
    icon: Microscope,
    image: labImage,
    specs: ['Lab-scale synthesis', 'Particle-size control', 'Repeatable formulation work'],
  },
  {
    eyebrow: 'System 02',
    title: 'nanoWISS Production System',
    description:
      'A scalable production platform for efficient, sustainable, and adaptable nanoparticle workflows.',
    icon: Factory,
    image: deviceImage,
    specs: ['Process automation', 'Scalable architecture', 'Sustainable throughput'],
  },
  {
    eyebrow: 'System 03',
    title: 'AgroWISS Crop Shield',
    description:
      'A chitosan-based carrier system designed to protect active ingredients and release them over time.',
    icon: Leaf,
    image: agrowissProduct,
    specs: ['Slow release', 'Biopolymer carrier', 'Crop protection focus'],
  },
  {
    eyebrow: 'System 04',
    title: 'Biofilm Application Platform',
    description:
      'Nanoparticle-containing formulations for future biofilm infection and disinfection applications.',
    icon: ShieldCheck,
    image: productImage,
    specs: ['Biofilm focus', 'Surface applications', 'Health-tech pipeline'],
  },
];

const motionSystems = [
  {
    title: 'Encapsulate',
    text: 'Natural active ingredients are carried inside a protective chitosan matrix.',
    icon: Layers3,
  },
  {
    title: 'Stabilize',
    text: 'The formulation is tuned for controlled behavior instead of rapid evaporation.',
    icon: Gauge,
  },
  {
    title: 'Release',
    text: 'Ingredients are designed to release gradually for longer field performance.',
    icon: TimerReset,
  },
];

const pipeline = [
  'Biofilm infection research',
  'Precision synthesis services',
  'Autonomous production systems',
  'Agricultural biocontrol',
  'Disinfection products',
  'Soil improvement systems',
];

const ParticleField = () => (
  <div className="nano-orbit" aria-hidden="true">
    <div className="nano-core">
      <Sparkles size={44} />
    </div>
    {Array.from({ length: 18 }).map((_, index) => (
      <span key={index} className={`nano-particle nano-particle-${index + 1}`} />
    ))}
  </div>
);

const ProductVariantCard = ({ item }) => {
  const Icon = item.icon;
  return (
    <article className="group relative overflow-hidden rounded-lg border border-white/10 bg-white/[0.06] p-5 shadow-2xl backdrop-blur">
      <div className="absolute inset-x-0 top-0 h-1 bg-primary-light" />
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-primary-light text-white">
          <Icon size={26} />
        </div>
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-primary-light">{item.eyebrow}</p>
          <h3 className="mt-1 text-xl font-bold text-white">{item.title}</h3>
        </div>
      </div>
      <div className="mt-5 h-48 overflow-hidden rounded-md bg-[#10051f]">
        <img
          src={item.image}
          alt={item.title}
          className="h-full w-full object-contain p-4 transition duration-700 group-hover:scale-110"
        />
      </div>
      <p className="mt-5 text-white/75">{item.description}</p>
      <div className="mt-5 grid gap-2">
        {item.specs.map((spec) => (
          <div key={spec} className="flex items-center gap-2 text-sm text-white/80">
            <span className="h-2 w-2 rounded-full bg-primary-light" />
            {spec}
          </div>
        ))}
      </div>
    </article>
  );
};

const AlternativeShowcasePage = () => {
  return (
    <div className="min-h-screen bg-[#140820] text-white">
      <Navbar />
      <main>
        <section className="relative overflow-hidden bg-[radial-gradient(circle_at_20%_20%,#6d4ab6_0%,#2d0c59_35%,#140820_72%)]">
          <div className="absolute inset-0 opacity-40">
            <div className="nano-grid" />
          </div>
          <div className="container relative mx-auto grid min-h-[42rem] grid-cols-1 items-center gap-10 px-4 py-16 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="mt-8 font-bold uppercase tracking-wide text-primary-light">Animated nanoWISS Product Theater</p>
              <h1 className="mt-4 text-4xl font-extrabold md:text-6xl">
                nanoWISS products shown as moving nanoparticle systems.
              </h1>
              <p className="mt-6 max-w-2xl text-lg text-white/75">
                This page is designed for demos and investor conversations: it turns nanoWISS
                company strengths into clear product stories with proof, team context, and
                application paths.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#variants"
                  className="rounded-full bg-primary-light px-6 py-3 font-bold text-white transition hover:bg-white hover:text-primary-dark"
                >
                  View Systems
                </a>
                <a
                  href="mailto:info@nanowiss.com?subject=nanoWISS Product Showcase"
                  className="rounded-full border border-white/35 px-6 py-3 font-bold text-white transition hover:border-white hover:bg-white hover:text-primary-dark"
                >
                  Discuss a Product
                </a>
              </div>
            </div>
            <div className="relative flex min-h-[26rem] items-center justify-center">
              <ParticleField />
            </div>
          </div>
        </section>

        <section id="variants" className="bg-[#1a1a2e] py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <p className="font-bold uppercase tracking-wide text-primary-light">Many Product Variants</p>
              <h2 className="mt-3 text-3xl font-extrabold md:text-5xl">Four ways to present the nanoWISS platform</h2>
              <p className="mt-5 text-lg text-white/70">
                Each card uses a different product angle while keeping the same core story:
                controlled nanoparticle technologies moving from lab research into scalable use.
              </p>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
              {productVariants.map((item) => (
                <ProductVariantCard key={item.title} item={item} />
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#24093d] py-16">
          <div className="container mx-auto grid grid-cols-1 items-center gap-10 px-4 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="font-bold uppercase tracking-wide text-primary-light">Animated Detail View</p>
              <h2 className="mt-3 text-3xl font-extrabold md:text-5xl">AgroWISS slow-release model</h2>
              <p className="mt-5 text-lg text-white/75">
                This visualization explains the key business idea: active ingredients are protected
                inside a natural carrier and released gradually, helping growers reduce repeated
                spraying and keep performance steadier in the field.
              </p>
            </div>
            <div className="release-system">
              <div className="release-card release-card-a">
                <Beaker size={26} />
                <span>Natural actives</span>
              </div>
              <div className="release-card release-card-b">
                <CircuitBoard size={26} />
                <span>Chitosan carrier</span>
              </div>
              <div className="release-card release-card-c">
                <Droplets size={26} />
                <span>Slow release</span>
              </div>
              <div className="release-stream release-stream-1" />
              <div className="release-stream release-stream-2" />
              <div className="release-stream release-stream-3" />
              <img src={agrowissProduct} alt="AgroWISS product detail" className="release-product" />
            </div>
          </div>
        </section>

        <section className="bg-white py-16 text-[#1a1a2e]">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <p className="font-bold uppercase tracking-wide text-primary-dark">System Mechanics</p>
                <h2 className="mt-3 text-3xl font-extrabold md:text-4xl">A simple three-stage product story</h2>
                <p className="mt-5 text-lg text-gray-700">
                  These panels are deliberately concise so the page works as a live demo, pitch
                  walkthrough, or product explainer without turning into a technical paper.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                {motionSystems.map((system, index) => {
                  const Icon = system.icon;
                  return (
                    <article key={system.title} className="motion-step rounded-lg border border-primary-dark/10 bg-[#f8f6ff] p-6 shadow">
                      <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary-dark text-white">
                        <Icon size={26} />
                      </div>
                      <p className="mt-6 text-sm font-bold uppercase tracking-wide text-primary">{`0${index + 1}`}</p>
                      <h3 className="mt-2 text-xl font-bold">{system.title}</h3>
                      <p className="mt-3 text-gray-700">{system.text}</p>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#12051f] py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <p className="font-bold uppercase tracking-wide text-primary-light">Pipeline Wall</p>
              <h2 className="mt-3 text-3xl font-extrabold md:text-5xl">A broader nanoWISS product universe</h2>
            </div>
            <div className="pipeline-marquee mt-10" aria-label="nanoWISS product pipeline">
              <div className="pipeline-track">
                {[...pipeline, ...pipeline].map((item, index) => (
                  <span key={`${item}-${index}`} className="pipeline-chip">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AlternativeShowcasePage;
