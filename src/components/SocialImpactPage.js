import React from 'react';
import { ArrowRight, Award, HeartPulse, Leaf, Sparkles } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import socialImpactAwardLogo from '../assets/social_impact_award.png';
import migrantAcceleratorLogo from '../assets/migrant_accelerator.png';
import wisaLogo from '../assets/wisa_logo.png';
import heroImage from '../assets/agrowiss_team.png';
import labImage from '../assets/lab_nanoparticle.png';

const migrantAcceleratorAlumniUrl = 'https://themigrantaccelerator.com/alumni-startups/';

const chapters = [
  {
    icon: HeartPulse,
    title: 'Health began the mission',
    text: 'nanoWISS started from the need for better scientific approaches to resistant biofilm infections and hard-to-reach health problems.',
  },
  {
    icon: Leaf,
    title: 'Planetary health widened the scope',
    text: 'The same nanoparticle platform thinking expanded into AgroWISS, where chitosan carriers support more sustainable agricultural biotechnology.',
  },
  {
    icon: Award,
    title: 'Social impact became visible',
    text: 'The Social Impact Award Germany finalist recognition helped frame nanoWISS as a deep-tech venture with social and environmental relevance.',
  },
];

const SocialImpactPage = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main>
      <section className="relative isolate overflow-hidden bg-secondary-dark text-white">
        <img
          src={heroImage}
          alt="nanoWISS team presenting AgroWISS agricultural biotechnology"
          className="absolute inset-0 -z-10 h-full w-full object-cover opacity-35"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-secondary-dark via-secondary-dark/90 to-primary-dark/70" />
        <div className="container mx-auto grid min-h-[34rem] grid-cols-1 items-center gap-10 px-4 py-16 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="font-semibold uppercase tracking-wide text-primary-light">Social Impact Story</p>
            <h1 className="mt-4 max-w-4xl text-4xl font-extrabold md:text-6xl">
              Deep-tech science built for healthier people and a healthier planet.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-white/85">
              A concise story of why nanoWISS exists: turning nanoparticle research into practical
              health, sustainability, and agricultural biotechnology pathways.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="https://germany.socialimpactaward.net/project/nanowiss/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-primary-light px-6 py-3 font-semibold text-white transition hover:bg-primary-dark"
              >
                Social Impact Award profile
                <ArrowRight size={18} />
              </a>
              <a
                href="/products"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 font-semibold text-white transition hover:border-primary-light hover:text-primary-light"
              >
                Explore technologies
              </a>
            </div>
          </div>
          <div className="rounded-lg border border-white/15 bg-white/10 p-6 backdrop-blur">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="flex h-32 items-center justify-center rounded-lg bg-white p-4">
                <img src={socialImpactAwardLogo} alt="Social Impact Award Germany" className="max-h-24 object-contain" />
              </div>
              <div
                className="relative flex h-32 items-center justify-center rounded-lg bg-white p-4"
                aria-label="WISA Women In Science Academy coming soon"
              >
                <img src={wisaLogo} alt="WISA Women In Science Academy" className="max-h-24 object-contain" />
                <span className="absolute right-3 top-3 rounded-full bg-primary-light px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                  Coming Soon
                </span>
              </div>
              <a
                href={migrantAcceleratorAlumniUrl}
                target="_blank"
                rel="noreferrer"
                className="flex h-32 items-center justify-center rounded-lg bg-white p-4 transition hover:-translate-y-1 hover:shadow-lg"
                aria-label="The Migrant Accelerator Alumni Startups"
              >
                <img src={migrantAcceleratorLogo} alt="The Migrant Accelerator" className="max-h-24 object-contain" />
              </a>
            </div>
            <p className="mt-5 text-white/80">
              Recognition, acceleration, and the forthcoming WISA Women In Science Academy pathway
              help nanoWISS communicate a careful impact story without overstating scientific or
              commercial claims.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <Sparkles className="mx-auto mb-4 text-primary-dark" size={42} />
            <h2 className="text-3xl font-bold text-primary-dark">A three-part impact narrative</h2>
            <p className="mt-4 text-lg text-gray-700">
              The story is intentionally simple: health need, platform science, and agricultural
              sustainability.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {chapters.map((chapter) => {
              const Icon = chapter.icon;
              return (
                <article key={chapter.title} className="rounded-lg border border-gray-100 p-6 shadow">
                  <Icon className="mb-5 text-primary-dark" size={40} />
                  <h3 className="text-xl font-bold text-primary-dark">{chapter.title}</h3>
                  <p className="mt-3 text-gray-700">{chapter.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-secondary-light py-16 text-white">
        <div className="container mx-auto grid grid-cols-1 items-center gap-10 px-4 lg:grid-cols-2">
          <img src={labImage} alt="nanoWISS nanoparticle research" className="rounded-lg shadow-xl" />
          <div>
            <p className="font-semibold uppercase tracking-wide text-primary-light">From lab to application</p>
            <h2 className="mt-3 text-3xl font-bold">Impact is framed through evidence, not exaggeration.</h2>
            <p className="mt-5 text-lg text-white/85">
              nanoWISS presents its work through platform capability, partner recognition, and
              product-development milestones. The goal is a credible story for collaborators,
              accelerators, and scientific partners.
            </p>
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default SocialImpactPage;
