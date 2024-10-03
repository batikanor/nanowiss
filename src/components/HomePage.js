import React from 'react';
import { Camera } from 'lucide-react';
import backgroundImage from '../assets/nwiss_backgr.jpg';

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-teal-500 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-white text-2xl font-bold">nanoWISS</h1>
          <nav>
            <ul className="flex space-x-4">
              <li><a href="#" className="text-white hover:text-teal-200">Story</a></li>
              <li><a href="#" className="text-white hover:text-teal-200">Technology</a></li>
              <li><a href="#" className="text-white hover:text-teal-200">Team</a></li>
              <li><a href="#" className="bg-white text-teal-500 px-4 py-2 rounded-full hover:bg-teal-100">Contact</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        {/* <div className="relative h-screen"> */}
        <div className="relative h-96">

          <img src={backgroundImage} alt="Nanoparticle visualization" className="w-full h-full object-cover" />
          {/* <img src="https://lh3.googleusercontent.com/gg/ACM6BIs1TvY74VG6IFRzRedWh6Dujy8dogBm58YaPx3Ke-XqrJeoJGhnGu2UH_72xRQjrKgVCuNx75-JMLRxof-0Qqm31pORoll18KYH3z0jt9egb4mb-O6YqOCfh82Sy-_KnKw0fu9slRRtl-7U6S6JZ69CTJmQyK3FQ0VqkfQsbxwc_JgFDwCj=s1024" alt="Nanoparticle visualization" className="w-full h-full object-cover" /> */}
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="text-center text-white">
              <h2 className="text-4xl font-bold mb-4">We make nanoparticles for a healthier world!</h2>
              <div className="text-6xl font-extrabold">nanoWISS</div>
            </div>
          </div>
        </div>

        <section className="py-16 bg-white">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Our Mission</h2>
            <p className="text-xl max-w-3xl mx-auto">
              nanoWISS is a deep technology and social impact startup aiming to revolutionize 
              nanoparticle production for treating biofilm bacterial infections in cystic fibrosis, 
              allowing patients to breathe deeper. We're committed to efficient nanoparticle 
              production and raising awareness of rare diseases.
            </p>
          </div>
        </section>

        <section className="py-16 bg-teal-100">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Our Technology</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow">
                <Camera className="mx-auto mb-4 text-teal-500" size={48} />
                <h3 className="text-xl font-semibold mb-2">Nanoparticle Production</h3>
                <p>Efficient and scalable production of nanoparticles for medical applications.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <Camera className="mx-auto mb-4 text-teal-500" size={48} />
                <h3 className="text-xl font-semibold mb-2">Biofilm Treatment</h3>
                <p>Innovative solutions for treating biofilm bacterial infections in cystic fibrosis.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <Camera className="mx-auto mb-4 text-teal-500" size={48} />
                <h3 className="text-xl font-semibold mb-2">Rare Disease Awareness</h3>
                <p>Raising awareness and supporting research for rare diseases.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-teal-800 text-white py-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 nanoWISS. All rights reserved.</p>
          <p className="mt-2">Contact: info@nanowiss.com</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;