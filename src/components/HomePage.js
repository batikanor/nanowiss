import React from 'react';
import { Camera } from 'lucide-react';
import backgroundImage from '../assets/nwiss_backgr.jpg';
import productImage from '../assets/product1.png'; // Import your product image
import Navbar from './Navbar'; // Import the Navbar component

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar /> {/* Include the Navbar */}

      <main className="flex-grow">
        <div className="relative h-126 overflow-hidden">
          <img 
            src={backgroundImage} 
            alt="Nanoparticle visualization" 
            className="w-full h-full object-cover animate-zoom-slide" 
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="text-center text-white">
              <h2 className="text-2xl md:text-xl sm:text-lg font-bold mb-4">
                We make nanoparticles for a healthier world!
              </h2>
              <div className="text-2xl md:text-5xl sm:text-3xl font-extrabold">
                nanoWISS
              </div>
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
                nanoWISS is a deep technology and social impact startup aiming to revolutionize 
                nanoparticle production for treating biofilm bacterial infections in cystic fibrosis, 
                allowing patients to breathe deeper. We're committed to efficient nanoparticle 
                production and raising awareness of rare diseases.
              </p>
            </div>

            {/* Latest Product Section */}
            {/* <div className="w-full md:w-1/2 px-4 flex flex-col items-center">
              <h2 className="text-3xl font-bold mb-8 text-primary-dark">Our Latest Product</h2>
              <img 
                src={productImage} 
                alt="nanoWISS Product" 
                className="mx-auto mb-4 max-w-xs sm:max-w-full" 
              />
              <a 
                href="mailto:info@nanowiss.com?subject=Preorder Request&body=Hey, I'm interested!" 
                className="bg-primary-dark text-white px-8 py-3 rounded-full hover:bg-primary-light transition duration-300"
              >
                Order Now
              </a>
            </div> */}
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

      <footer className="bg-primary-dark text-white py-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 nanoWISS. All rights reserved.</p>
          <p className="mt-2">Contact: info@nanowiss.com</p>
          {/* Credit Section */}
          <p className="text-xs mt-2 text-gray-400">
            Special thanks to our friend Batıkan Bora Ormancı for voluntarily creating this web app for nanoWISS.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
