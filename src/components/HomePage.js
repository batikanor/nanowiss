import React from 'react';
import { Camera } from 'lucide-react';
import backgroundImage from '../assets/nwiss_backgr.jpg';
import mobileBackgroundImage from '../assets/nwiss_backgr_mobile.jpg';
import Navbar from './Navbar'; // Import the Navbar component
import Footer from './Footer';

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar /> {/* Include the Navbar */}

      <main className="flex-grow">
        <div className="relative h-[32rem] overflow-hidden">
          <img
            src={backgroundImage} 
            alt="Nanoparticle visualization" 
            className="hidden w-full h-full object-cover animate-zoom-slide md:block"
          />
          <img
            src={mobileBackgroundImage}
            alt="Nanoparticle visualization"
            className="h-full w-full object-cover md:hidden"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="text-center text-white">
              <p className="text-2xl md:text-xl sm:text-lg font-bold mb-4">
                We make nanoparticles for a healthier world!
              </p>
              <h1 className="text-2xl md:text-5xl sm:text-3xl font-extrabold">
                nanoWISS
              </h1>
            </div>
          </div>
        </div>

        {/* Two Column Layout: Our Mission and Latest Product */}
        <section className="py-16 bg-white">
          <div className="container mx-auto flex flex-col md:flex-row items-center">
            {/* Our Mission Section */}
            <div className="w-full md:w-1/2 px-4">
              <h2 className="text-3xl font-bold mb-8 text-primary-dark">Our Mission</h2>
              <p className="text-xl sm:text-lg text-gray-700">
                nanoWISS is a deep technology and social impact startup developing nanoparticle
                technologies for healthier people and a healthier planet. Our work began with
                nanotechnology-based solutions for resistant biofilm infections in cystic fibrosis
                and now also supports eco-friendly agricultural biotechnology through AgroWISS.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-secondary-light">
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
