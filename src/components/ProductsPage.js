import React, { useState, useEffect } from 'react';
import productImage from '../assets/product1.png'; // Import your product image
import labNanoparticleImage from '../assets/lab_nanoparticle.png'; // Replace with the correct path
import nanoparticleDeviceImage from '../assets/nanoparticle_device.png'; // Replace with the correct path
import Navbar from './Navbar'; // Import the Navbar component
import CountUp from 'react-countup'; // For animated number counter
import ReactPlayer from 'react-player'; // For embedded video

const ProductsPage = () => {
  const products = [
    {
      title: 'Nanoparticles Initially Produced in Our Lab',
      description: 'At the beginning, nanoparticles were produced in our laboratory, and later with our nanoWISS autonomous device.',
      image: labNanoparticleImage
    },
    {
      title: 'nanoWISS® Sustainable Autonomous Nanoparticle Production Device',
      description: 'Our cutting-edge device enables sustainable and autonomous production of nanoparticles, ensuring scalability and eco-friendly production.',
      image: nanoparticleDeviceImage
    },
    {
      title: 'Nanoparticle-Containing Products',
      description: 'Our products include: Agricultural solutions, Disinfection products, and Biofilm infection treatment.',
      image: productImage
    }
  ];

  // State to trigger animations
  const [isVideoVisible, setIsVideoVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const videoSection = document.getElementById('videoSection');
      if (videoSection && window.scrollY + window.innerHeight >= videoSection.offsetTop) {
        setIsVideoVisible(true);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar /> {/* Include the Navbar */}
      
      <main className="flex-grow">
        {/* Parallax Section */}
        <section className="py-16 bg-secondary-light">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8 text-white">Our Potential Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {products.map((product, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow transform hover:scale-105 transition duration-300 ease-in-out"> {/* Hover effect */}
                  <img
                    src={product.image}
                    alt={product.title}
                    className="mx-auto mb-4 max-w-xs sm:max-w-full"
                  />
                  <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
                  <p className="text-primary-dark mb-4">{product.description}</p>

                  {index === 2 && ( // Add button to the last product
                    <a 
                      href="mailto:info@nanowiss.com?subject=Preorder Request&body=Hey, I'm interested!" 
                      className="bg-primary-dark text-white px-8 py-3 rounded-full hover:bg-primary-light transition duration-300"
                    >
                      Order Now
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Animated Counter Section */}
        <section className="py-16 bg-primary-light text-center text-white">
          <h2 className="text-3xl font-bold mb-8">Our Achievements</h2>
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <CountUp start={0} end={500} duration={5} className="text-6xl font-bold" />
              <p className="mt-2">Nanoparticles Produced</p>
            </div>
            <div>
              <CountUp start={0} end={300} duration={5} className="text-6xl font-bold" />
              <p className="mt-2">Successful Deployments</p>
            </div>
            <div>
              <CountUp start={0} end={100} duration={5} className="text-6xl font-bold" />
              <p className="mt-2">Satisfied Customers</p>
            </div>
          </div>
        </section>

        {/* Video Section */}
        <section id="videoSection" className="py-16 bg-secondary-light">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8 text-white">Watch Our Demo</h2>
            {isVideoVisible && (
              <ReactPlayer
                url="https://www.youtube.com/channel/UCWVFt0AxFTLebxgCrkGhdtg"
                playing
                controls
                className="mx-auto"
              />
            )}
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 bg-primary-light text-white text-center">
          <h2 className="text-3xl font-bold mb-8">What Our Clients Say</h2>
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-secondary-dark rounded-lg shadow">
              <p>"nanoWISS® just might revolutionize our agricultural business with their innovative nanoparticle solutions!"</p>
              <p className="mt-4">- Anonymous Client</p>
            </div>
            <div className="p-6 bg-secondary-dark rounded-lg shadow">
              <p>"Their work discipline is wonderful!."</p>
              <p className="mt-4">- Anonymous Client</p>
            </div>
            <div className="p-6 bg-secondary-dark rounded-lg shadow">
              <p>"We will be able to scale our production like never before thanks to nanoWISS® devices!"</p>
              <p className="mt-4">- Anonymous Client</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-primary-dark text-white py-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 nanoWISS. All rights reserved.</p>
          <p className="mt-2">Contact: info@nanowiss.com</p>
        </div>
      </footer>
    </div>
  );
};

export default ProductsPage;
