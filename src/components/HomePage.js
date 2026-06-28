import React, { useEffect, useState } from 'react';
import { ArrowRight, Award, Expand, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import backgroundImage from '../assets/agrowiss_team.png';
import agrowissLogo from '../assets/agrowiss_logo.png';
import socialImpactAwardLogo from '../assets/social_impact_award.png';
import migrantAcceleratorLogo from '../assets/migrant_accelerator.png';
import nanoWissDarkLogo from '../assets/nanowiss_logo_on_black.png';
import foundingMembersImage from '../assets/founding_members.png';
import nanoparticleProductionVideo from '../assets/nanoparticle_production.mp4';
import nanoparticleProductionPoster from '../assets/nanoparticle_production_poster.jpg';
import biofilmDemoVideo from '../assets/biofilm_demo.mp4';
import biofilmPoster from '../assets/biofilm_demo_poster.jpg';
import rareDiseaseTreatmentImage from '../assets/rare_disease_treatment.png';
import rareDiseaseTreatmentCardImage from '../assets/rare_disease_treatment_card.png';
import BiofilmVideo from './BiofilmVideo';
import Navbar from './Navbar'; // Import the Navbar component
import Footer from './Footer';

const newsletterUrl =
  'https://www.linkedin.com/newsletters/%F0%9D%99%89%F0%9D%99%96%F0%9D%99%A3%F0%9D%99%A4%F0%9D%99%89%F0%9D%97%B2%F0%9D%98%84%F0%9D%99%8E%F0%9D%99%98%F0%9D%99%9E%F0%9D%99%9A%F0%9D%99%A3%F0%9D%99%98%F0%9D%99%9A-7430896331885264897';
const migrantAcceleratorAlumniUrl = 'https://themigrantaccelerator.com/alumni-startups/';

const HomePage = () => {
  const [activeMedia, setActiveMedia] = useState(null);

  useEffect(() => {
    if (!activeMedia) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setActiveMedia(null);
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeMedia]);

  const openMedia = (media) => setActiveMedia(media);

  const technologyMedia = [
    {
      title: 'Nanoparticle Production',
      type: 'video',
      src: nanoparticleProductionVideo,
      poster: nanoparticleProductionPoster,
      description: 'nanoWISS nanoparticle production work in the lab',
    },
    {
      title: 'Biofilm Treatment',
      type: 'video',
      src: biofilmDemoVideo,
      poster: biofilmPoster,
      description: 'nanoWISS biofilm research visualization',
    },
    {
      title: 'Rare Disease Awareness',
      type: 'image',
      src: rareDiseaseTreatmentImage,
      description: 'nanoWISS rare disease awareness activity',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar /> {/* Include the Navbar */}

      <main className="flex-grow">
        <div className="relative h-[34rem] overflow-hidden">
          <div
            role="img"
            aria-label="nanoWISS and AgroWISS team presenting agricultural biotechnology"
            className="absolute inset-0 bg-cover bg-center md:animate-zoom-slide"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/55">
            <div className="px-4 text-center text-white">
              <p className="mb-4 text-xl font-bold sm:text-2xl">
                We make nanoparticles for a healthier world!
              </p>
              <img
                src={nanoWissDarkLogo}
                alt="nanoWISS"
                className="mx-auto h-auto max-h-36 w-full max-w-2xl rounded-md bg-black/75 object-contain p-3 shadow-2xl"
              />
            </div>
          </div>
        </div>

        {/* Two Column Layout: Our Mission and Latest Product */}
        <section className="py-16 bg-white">
          <div className="container mx-auto grid grid-cols-1 items-center gap-10 px-4 md:grid-cols-[1.05fr_0.95fr]">
            {/* Our Mission Section */}
            <div>
              <h2 className="text-3xl font-bold mb-8 text-primary-dark">Our Mission</h2>
              <p className="text-xl sm:text-lg text-gray-700">
                nanoWISS is a deep technology and social impact startup developing nanoparticle
                technologies for healthier people and a healthier planet. Our work began with
                nanotechnology-based solutions for resistant biofilm infections in cystic fibrosis
                and now also supports eco-friendly agricultural biotechnology through AgroWISS.
              </p>
            </div>
            <div className="rounded-lg border border-gray-100 bg-white p-8 text-center shadow">
              <p className="font-semibold uppercase tracking-wide text-secondary-light">AgroWISS</p>
              <img
                src={agrowissLogo}
                alt="AgroWISS logo"
                className="mx-auto mt-5 h-24 w-auto object-contain sm:h-32"
              />
              <p className="mx-auto mt-5 max-w-md text-gray-700">
                AgroWISS carries nanoWISS nanoparticle know-how into sustainable crop protection
                with chitosan-based, slow-release agricultural biotechnology.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-background py-16">
          <div className="container mx-auto grid grid-cols-1 items-center gap-10 px-4 lg:grid-cols-[0.9fr_1.1fr]">
            <img
              src={foundingMembersImage}
              alt="nanoWISS founding members"
              className="mx-auto max-h-[36rem] w-full rounded-lg object-cover object-center shadow-xl"
            />
            <div>
              <p className="font-semibold uppercase tracking-wide text-primary-light">Founding team</p>
              <h2 className="mt-3 text-3xl font-bold text-white">
                Built by founders connecting science, product, and field applications.
              </h2>
              <p className="mt-5 text-lg text-white/75">
                The nanoWISS founding team brings together molecular biotechnology, nanoscience,
                biomedical engineering, operations, and AgroWISS commercialization work.
              </p>
              <Link
                to="/team"
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-primary-dark px-6 py-3 font-semibold text-white transition hover:bg-primary-light"
              >
                Meet the team
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>

        <section id="social-impact" className="scroll-mt-24 bg-white py-16">
          <div className="container mx-auto grid grid-cols-1 items-center gap-10 px-4 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="rounded-lg border border-gray-100 bg-background p-8 shadow">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <a
                  href="https://germany.socialimpactaward.net/project/nanowiss/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-32 items-center justify-center rounded-md bg-white p-5 transition hover:-translate-y-1 hover:shadow-lg"
                  aria-label="Social Impact Award Germany nanoWISS profile"
                >
                  <img
                    src={socialImpactAwardLogo}
                    alt="Social Impact Award Germany"
                    className="max-h-24 w-full object-contain"
                  />
                </a>
                <a
                  href={migrantAcceleratorAlumniUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-32 items-center justify-center rounded-md bg-white p-5 transition hover:-translate-y-1 hover:shadow-lg"
                  aria-label="The Migrant Accelerator"
                >
                  <img
                    src={migrantAcceleratorLogo}
                    alt="The Migrant Accelerator"
                    className="max-h-24 w-full object-contain"
                  />
                </a>
              </div>
            </div>
            <div>
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-md bg-primary-dark text-white">
                <Award size={28} />
              </div>
              <p className="font-semibold uppercase tracking-wide text-secondary-light">Social Impact</p>
              <h2 className="mt-3 text-3xl font-bold text-primary-dark">
                Recognition for science built around healthier people and a healthier planet.
              </h2>
              <p className="mt-5 text-lg text-gray-700">
                nanoWISS started from resistant biofilm infection research and expanded toward
                sustainable agricultural biotechnology through AgroWISS. Social Impact Award
                Germany and The Migrant Accelerator help frame that mission as a clear, credible
                impact story.
              </p>
              <Link
                to="/social-impact"
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-primary-dark px-6 py-3 font-semibold text-white transition hover:bg-primary-light"
              >
                Explore the impact story
                <ArrowRight size={18} />
              </Link>
              <a
                href={newsletterUrl}
                target="_blank"
                rel="noreferrer"
                className="ml-0 mt-4 inline-flex items-center gap-2 rounded-full border border-primary-dark px-6 py-3 font-semibold text-primary-dark transition hover:border-primary-light hover:text-primary-light sm:ml-3"
              >
                Read NanoNewsScience
                <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </section>

        <section id="technology" className="scroll-mt-24 bg-secondary-light py-16">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8 text-white">Our Technology</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-semibold mb-2">Nanoparticle Production</h3>
                <p>Efficient and scalable production of nanoparticles for medical applications.</p>
                <button
                  type="button"
                  onClick={() => openMedia(technologyMedia[0])}
                  className="group relative mt-5 block h-56 w-full overflow-hidden rounded-md bg-gray-100 text-left focus:outline-none focus:ring-4 focus:ring-primary-light/50"
                  aria-label="Open nanoparticle production video fullscreen"
                >
                  <video
                    className="h-full w-full object-cover"
                    src={nanoparticleProductionVideo}
                    poster={nanoparticleProductionPoster}
                    autoPlay
                    loop
                    muted
                    playsInline
                    aria-hidden="true"
                  />
                  <span className="absolute bottom-3 right-3 inline-flex items-center gap-2 rounded-full bg-primary-dark/90 px-3 py-2 text-sm font-semibold text-white opacity-95 transition group-hover:bg-primary-light">
                    <Expand size={16} />
                    View fullscreen
                  </span>
                </button>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-semibold mb-2">Biofilm Treatment</h3>
                <p>Innovative solutions for treating biofilm bacterial infections in cystic fibrosis.</p>
                <button
                  type="button"
                  onClick={() => openMedia(technologyMedia[1])}
                  className="group relative mt-5 block h-56 w-full overflow-hidden rounded-md border border-gray-100 bg-white text-left focus:outline-none focus:ring-4 focus:ring-primary-light/50"
                  aria-label="Open biofilm treatment video fullscreen"
                >
                  <BiofilmVideo
                    className="h-full w-full"
                    ariaLabel="nanoWISS biofilm research visualization"
                  />
                  <span className="absolute bottom-3 right-3 inline-flex items-center gap-2 rounded-full bg-primary-dark/90 px-3 py-2 text-sm font-semibold text-white opacity-95 transition group-hover:bg-primary-light">
                    <Expand size={16} />
                    View fullscreen
                  </span>
                </button>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-semibold mb-2">Rare Disease Awareness</h3>
                <p>Raising awareness and supporting research pathways for rare diseases.</p>
                <button
                  type="button"
                  onClick={() => openMedia(technologyMedia[2])}
                  className="group relative mt-5 flex h-56 w-full items-center justify-center overflow-hidden rounded-md bg-gray-50 text-left focus:outline-none focus:ring-4 focus:ring-primary-light/50"
                  aria-label="Open rare disease awareness image fullscreen"
                >
                  <img
                    src={rareDiseaseTreatmentCardImage}
                    alt="nanoWISS rare disease awareness activity"
                    className="h-full w-full object-cover object-center"
                    loading="lazy"
                  />
                  <span className="absolute bottom-3 right-3 inline-flex items-center gap-2 rounded-full bg-primary-dark/90 px-3 py-2 text-sm font-semibold text-white opacity-95 transition group-hover:bg-primary-light">
                    <Expand size={16} />
                    View fullscreen
                  </span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer showCredit />

      {activeMedia && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`${activeMedia.title} fullscreen media`}
          onClick={() => setActiveMedia(null)}
        >
          <div className="relative flex h-full w-full max-w-6xl flex-col" onClick={(event) => event.stopPropagation()}>
            <div className="mb-3 flex items-center justify-between gap-4 text-white">
              <h2 className="text-xl font-bold">{activeMedia.title}</h2>
              <button
                type="button"
                onClick={() => setActiveMedia(null)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-primary-dark transition hover:bg-primary-light hover:text-white focus:outline-none focus:ring-4 focus:ring-primary-light/60"
                aria-label="Close fullscreen media"
              >
                <X size={24} />
              </button>
            </div>
            <div className="flex min-h-0 flex-1 items-center justify-center">
              {activeMedia.type === 'video' ? (
                <video
                  className="max-h-full max-w-full rounded-lg bg-black object-contain shadow-2xl"
                  src={activeMedia.src}
                  poster={activeMedia.poster}
                  controls
                  autoPlay
                  loop
                  muted
                  playsInline
                  aria-label={activeMedia.description}
                />
              ) : (
                <img
                  src={activeMedia.src}
                  alt={activeMedia.description}
                  className="max-h-full max-w-full rounded-lg object-contain shadow-2xl"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
