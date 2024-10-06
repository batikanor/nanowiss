import React from 'react';
import Navbar from './Navbar'; // Import the Navbar component

const TeamPage = () => {
  const teamMembers = [
    {
      name: 'Dr. Clara Friedrich',
      role: 'Chief Science Officer',
      bio: 'With over 15 years of experience in nanotechnology and bioengineering, Dr. Clara leads our scientific research. Her groundbreaking work in nanoparticle production for medical treatments has garnered international recognition.',
      image: 'path-to-image-of-Clara' // Replace with appropriate image path
    },
    {
      name: 'Aiden Nakamura',
      role: 'Lead Engineer',
      bio: 'Aiden is a master of engineering solutions, focusing on scaling nanoparticle production processes for mass-market applications. His innovative approaches have accelerated production without compromising quality.',
      image: 'path-to-image-of-Aiden' // Replace with appropriate image path
    },
    {
      name: 'Lena Schmidt',
      role: 'Chief Marketing Officer',
      bio: 'Lena brings over a decade of experience in marketing for biotech startups. She’s passionate about raising awareness of rare diseases and driving community engagement for our mission.',
      image: 'path-to-image-of-Lena' // Replace with appropriate image path
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar /> {/* Include the Navbar */}

      <main className="flex-grow">
        <section className="py-16 bg-secondary-light">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8 text-white">Meet Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
