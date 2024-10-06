import React from 'react';
import Navbar from './Navbar'; // Import the Navbar component
import FeyzaImage from '../assets/feyza_atabey_foto.png'; // Import the image
import NisaImage from '../assets/nisa tan foto.png'; // Import the image
import SelenImage from '../assets/selen özdinç foto.png'; // Import the image
import ElifImage from '../assets/elif kaman foto.png'; // Import the image

const teamMembers = [
  {
    name: 'Zeynep Feyza Atabey',
    role: 'Chief Executive Officer',
    bio: 'Zeynep Feyza Atabey is a Biotechnology master’s student at Saarland University and a Molecular Biotechnology graduate from Turkish-German University. She has worked on projects and internships focused on microbiology, rare diseases, and nanoparticle production. A finalist in the 2023 TOG & ETI "You Are Young, You Are Strong" project, she received a grant and mentorship for her work in rare disease and infection treatments. As CEO, she manages partnerships, promotions, and overall processes for nanoWISS.',
    image: FeyzaImage // Use imported image here
  },
  {
    name: 'Selen Özdinç',
    role: 'Chief Technology Officer',
    bio: 'Selen Özdinç is a senior Molecular Biotechnology student at Turkish-German University. She has been part of the nanoWISS team since November 2023, working on nanoparticle-related projects under the TÜBİTAK 2209-A program. Currently, she is doing an internship at Koç University, focusing on nanoparticle synthesis and cell cultures. As CTO, Selen coordinates communication among R&D personnel and manages the research and development processes.',
    image: SelenImage
  },
  {
    name: 'Elif Kaman',
    role: 'Chief Innovation Officer',
    bio: 'Elif Kaman is a Biomedical Engineering graduate from Yeditepe University. As Chief Innovation Officer (CINO) at nanoWISS, she is responsible for innovation, optimization, and design processes, particularly focusing on 3D modeling and drawing. Elif’s work ensures the continuous improvement and innovative design of the nanoparticle production device.',
    image: ElifImage
  },
  {
    name: 'Nisa Tan',
    role: 'Chief Operating Officer',
    bio: 'Nisa Tan is a Molecular Biotechnology graduate from Turkish-German University. With experience in bioinformatics from her TÜBİTAK STAR internship and expertise in microbiology, she serves as the Chief Operating Officer (COO) at nanoWISS. Nisa manages operational processes, including sales and procurement, ensuring smooth workflow across the organization.',
    image: NisaImage
  },
  {
    name: 'Yiğit Doğancı',
    role: 'Lead Engineer',
    bio: 'Yiğit Doğancı is a Mechanical Engineering graduate from Başkent University and an instructor in nanotechnology at T3 Foundation Dene-Yap. He has worked on various projects and is responsible for the development of the nanoparticle production device at nanoWISS.',
    image: '' // No image provided
  },
  {
    name: 'Hatice Akbay',
    role: 'Research Support',
    bio: 'Hatice Akbay is a medical student who provides crucial support to the nanoWISS team by conducting research and assisting with clinical studies. Her involvement in reading scientific articles and contributing to the research and development side ensures that the startup stays updated with the latest medical advancements.',
    image: '' // No image provided
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
