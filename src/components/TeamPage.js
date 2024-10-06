import React from 'react';
import Navbar from './Navbar'; // Import the Navbar component
import FeyzaImage from '../assets/feyza_yuvarlak.png'; // Import the image
import NisaImage from '../assets/nisa tan foto.png'; // Import the image
import SelenImage from '../assets/selen özdinç foto.png'; // Import the image
import ElifImage from '../assets/elif kaman foto.png'; // Import the image

const TeamPage = () => {
  const teamMembers = [
    {
      name: 'Zeynep Feyza Atabey',
      role: 'Chief Executive Officer',
      bio: 'With over 15 years of experience in nanotechnology and bioengineering, Dr. Clara leads our scientific research. Her groundbreaking work in nanoparticle production for medical treatments has garnered international recognition.',
      image: FeyzaImage // Use imported image here
    },
    {
      name: 'Selen Özdinç',
      role: 'Chief Technology Officer',
      bio: 'Selen is a master of engineering solutions, focusing on scaling nanoparticle production processes for mass-market applications. His innovative approaches have accelerated production without compromising quality.',
      image: SelenImage
    },
    {
      name: 'Elif Kaman',
      role: 'Chief Innovation Officer',
      bio: 'Elif brings over a decade of experience in marketing for biotech startups. She’s passionate about raising awareness of rare diseases and driving community engagement for our mission.',
      image: ElifImage
    },
    {
      name: 'Nisa Tan',
      role: 'Chief Operating Officer',
      bio: 'Nisa is a Molecular Biotechnology student at Türk-Alman University and a valued team member at nanoWISS. She is passionate about biotech innovations and is leading the operations team with her strong academic background and leadership skills.',
      image: NisaImage
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar /> {/* Include the Navbar */}

      <main className="flex-grow">
        <section className="py-16 bg-secondary-light">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8 text-white">Meet Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="mx-auto mb-4 rounded-full w-32 h-32 object-cover"
                  />
                  <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                  <p className="text-primary-dark mb-1">{member.role}</p>
                  <p>{member.bio}</p>
                </div>
              ))}
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

export default TeamPage;
