import React from 'react';
import { CheckCircle2, ExternalLink, Leaf, ShieldCheck, Sprout } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import agrowissLogo from '../assets/agrowiss_logo.png';
import agrowissProduct from '../assets/agrowiss_product.png';
import agrowissTeam from '../assets/agrowiss_team.png';
import tubitakBiggLogo from '../assets/tubitak_bigg.png';
import bogaziciTeknoparkLogo from '../assets/bogazici_teknopark.png';
import turkiyeKalkinmaFonuLogo from '../assets/turkiye_kalkinma_fonu.png';
import FeyzaImage from '../assets/team_feyza_thumb.jpg';
import SelenImage from '../assets/team_selen_thumb.jpg';
import NisaImage from '../assets/team_nisa_thumb.jpg';
import ElifImage from '../assets/team_elif_thumb.jpg';

const highlights = [
  {
    icon: Sprout,
    title: 'Eco-Friendly Crop Protection',
    description:
      'AgroWISS develops next-generation biological crop protection solutions using advanced nanotechnology.',
  },
  {
    icon: Leaf,
    title: 'Chitosan Carrier System',
    description:
      'A natural biopolymer derived from upcycled shells encapsulates organic ingredients and supports slow, continuous release.',
  },
  {
    icon: ShieldCheck,
    title: 'Dual-Action Defense',
    description:
      'The formula is designed to help protect crops against harmful pests and microbial diseases while reducing repeated spraying needs.',
  },
];

const growthEffects = [
  'Environmentally friendly, antimicrobial plant growth-promoting chitosan nanoparticles',
  'Environmentally friendly insect repellents',
  'Longer-lasting effect thanks to a controlled active ingredient release mechanism',
  'Low-cost production',
];

const agroWissTeamMembers = [
  ['Zeynep Feyza Atabey', 'CSO of AgroWISS', FeyzaImage],
  ['Selen Ozdinc', 'CFO of AgroWISS', SelenImage],
  ['Nisa Tan', 'CEO of AgroWISS', NisaImage],
  ['Elif Kaman', 'CMO of AgroWISS', ElifImage],
];

const AgroWissPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <section className="bg-white">
          <div className="container mx-auto grid min-h-[34rem] grid-cols-1 items-center gap-10 px-4 py-16 lg:grid-cols-2">
            <div>
              <img src={agrowissLogo} alt="AgroWISS" className="mb-8 h-24 w-auto object-contain sm:h-32" />
              <p className="font-semibold uppercase tracking-wide text-primary-dark">
                AGROWISS BIOTECHNOLOGY RESEARCH INC.
              </p>
              <h1 className="mt-3 text-4xl font-extrabold text-secondary-dark md:text-5xl">
                Agricultural biotechnology powered by smart nanoparticle systems.
              </h1>
              <p className="mt-6 text-lg text-gray-700">
                AgroWISS is an innovative agricultural biotechnology venture founded by a dedicated
                team of molecular biotechnologists and engineers, backed by the prestigious TUBITAK
                1812 BIGG program.
              </p>
              <a
                href="https://bogaziciteknopark.com/firmalar/agrowiss-biyoteknoloji-arastirmalari-as"
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary-dark px-6 py-3 font-semibold text-white transition hover:bg-primary-light"
              >
                Bogazici Teknopark Profile
                <ExternalLink size={18} />
              </a>
            </div>
            <div className="relative">
              <img
                src={agrowissProduct}
                alt="AgroWISS product prototype"
                className="mx-auto max-h-[34rem] rounded-lg object-contain shadow-xl"
              />
            </div>
          </div>
        </section>

        <section className="bg-white py-16">
          <div className="container mx-auto max-w-4xl px-4 text-center">
            <div>
              <p className="font-semibold uppercase tracking-wide text-secondary-light">
                Plant Growth and Crop Protection
              </p>
              <h2 className="mt-3 text-3xl font-bold text-primary-dark">
                Chitosan nanoparticle systems designed for healthier plant growth.
              </h2>
              <p className="mt-5 text-lg text-gray-700">
                AgroWISS focuses on plant growth-promoting, antimicrobial, and environmentally
                friendly crop-protection pathways using controlled-release chitosan nanoparticles.
              </p>
              <div className="mt-6 space-y-4">
                {growthEffects.map((effect) => (
                  <div key={effect} className="flex gap-3 text-left">
                    <CheckCircle2 className="mt-1 shrink-0 text-secondary-light" size={22} />
                    <p className="text-gray-700">{effect}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-secondary-light py-16 text-white">
          <div className="container mx-auto grid grid-cols-1 gap-8 px-4 lg:grid-cols-[1fr_1.15fr]">
            <img
              src={agrowissTeam}
              alt="AgroWISS team with plant prototype"
              className="h-full min-h-80 rounded-lg object-cover shadow-xl"
            />
            <div className="flex flex-col justify-center">
              <h2 className="text-3xl font-bold">From Research to Environmental Solutions</h2>
              <p className="mt-5 text-lg text-white/85">
                Our journey began with a passion for bridging the gap between scientific R&D and
                real-world environmental solutions. After securing top rankings at Teknofest
                Biotechnology Innovation Competitions during the prototyping phase, AgroWISS evolved
                into a fully established deep-tech startup.
              </p>
              <p className="mt-4 text-lg text-white/85">
                AgroWISS Biotechnology Research Inc. incorporated at Bogazici University Teknopark
                after receiving 900,000 TL investment through TUBITAK BIGG.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <div className="flex h-24 w-44 items-center justify-center rounded-lg bg-white p-4">
                  <img src={tubitakBiggLogo} alt="TUBITAK BIGG" className="max-h-full object-contain" />
                </div>
                <div className="flex h-24 w-44 items-center justify-center rounded-lg bg-white p-4">
                  <img
                    src={bogaziciTeknoparkLogo}
                    alt="Bogazici University Teknopark"
                    className="max-h-full object-contain"
                  />
                </div>
                <div className="flex h-24 w-44 items-center justify-center rounded-lg bg-white p-4">
                  <img
                    src={turkiyeKalkinmaFonuLogo}
                    alt="Turkiye Kalkinma Fonu"
                    className="max-h-full object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-secondary-dark py-16 text-white">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <p className="font-semibold uppercase tracking-wide text-primary-light">AgroWISS Team</p>
              <h2 className="mt-2 text-3xl font-bold text-white">
                Built by the four-person team carrying nanoWISS science into agriculture.
              </h2>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {agroWissTeamMembers.map(([name, role, image]) => (
                <article key={name} className="rounded-lg bg-white p-5 text-center shadow">
                  <img
                    src={image}
                    alt={name}
                    loading="eager"
                    decoding="async"
                    className="mx-auto h-36 w-36 rounded-full border-4 border-primary-light object-cover"
                  />
                  <h3 className="mt-4 font-bold text-primary-dark">{name}</h3>
                  <p className="mt-1 text-sm text-gray-600">{role}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold text-primary-dark">What AgroWISS Solves</h2>
              <p className="mt-4 text-lg text-gray-700">
                Natural plant oils evaporate too quickly and lose strength when sprayed directly.
                AgroWISS uses a smart, nature-friendly carrier system to protect active ingredients
                and release them gradually.
              </p>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
              {highlights.map((item) => {
                const Icon = item.icon;
                return (
                  <article key={item.title} className="rounded-lg border border-gray-100 p-6 shadow">
                    <Icon className="mb-4 text-primary-dark" size={38} />
                    <h3 className="text-xl font-bold text-primary-dark">{item.title}</h3>
                    <p className="mt-3 text-gray-700">{item.description}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer partnerSet="agrowiss" />
    </div>
  );
};

export default AgroWissPage;
