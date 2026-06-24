import React from 'react';
import { Camera } from 'lucide-react';
import backgroundImage from '../assets/agrowiss_team.png';
import agrowissLogo from '../assets/agrowiss_logo.png';
import BiofilmVideo from './BiofilmVideo';
import Navbar from './Navbar'; // Import the Navbar component
import Footer from './Footer';

const HomePage = () => {
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
              <h1 className="text-4xl font-extrabold sm:text-5xl">
                nanoWISS
              </h1>
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

        <section id="technology" className="scroll-mt-24 bg-secondary-light py-16">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8 text-white">Our Technology</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow">
                <Camera className="mx-auto mb-4 text-primary-dark" size={48} />
                <h3 className="text-xl font-semibold mb-2">Nanoparticle Production</h3>
                <p>Efficient and scalable production of nanoparticles for medical applications.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <Camera className="mx-auto mb-4 text-primary-dark" size={48} />
                <h3 className="text-xl font-semibold mb-2">Biofilm Treatment</h3>
                <p>Innovative solutions for treating biofilm bacterial infections in cystic fibrosis.</p>
                <BiofilmVideo
                  className="mt-5 h-48 w-full"
                  ariaLabel="nanoWISS biofilm research visualization"
                />
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <Camera className="mx-auto mb-4 text-primary-dark" size={48} />
                <h3 className="text-xl font-semibold mb-2">Rare Disease Awareness</h3>
                <p>Raising awareness and supporting research for rare diseases.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer showCredit />
    </div>
  );
};

export default HomePage;
