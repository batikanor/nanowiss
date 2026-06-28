import React from 'react';
import { Linkedin } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import FeyzaImage from '../assets/feyza_atabey_foto.png';
import NisaImage from '../assets/nisa_tan_foto.png';
import SelenImage from '../assets/selen_ozdinc_foto.png';
import ElifImage from '../assets/elif_kaman_foto.png';
import BerrinImage from '../assets/berrin_saygi_yalcin.png';
import HakanImage from '../assets/hakan_yilmaz.png';
import SumeyyeImage from '../assets/sumeyye_demir.png';
import CeydaImage from '../assets/ceyda_oner.png';
import BatikanImage from '../assets/batikan_bora_ormanci.jpg';

const founders = [
  {
    name: 'Zeynep Feyza Atabey',
    role: 'CEO of nanoWISS & CSO of AgroWISS',
    image: FeyzaImage,
    linkedin: 'https://www.linkedin.com/in/zeynepfeyzatabey/',
    bio: [
      'Zeynep Feyza Atabey is a visionary young female scientist and deep-tech entrepreneur advancing with the dream of contributing to humanity. She completed her Bachelor’s degree in Molecular Biotechnology at the Turkish-German University, where she studied in German, and is currently pursuing her Master’s in Biotechnology at Saarland University. Leveraging her academic background, she is proficient in German and English, with a basic command of French.',
      'As the CEO of nanoWISS, Feyza began her journey by developing nanotechnology-based solutions for resistant biofilm infections in cystic fibrosis patients. Recognizing the transformative potential of this research for planetary health, she spearheaded AgroWISS under the nanoWISS umbrella, where she serves as acting Chief Scientific Officer.',
      'In 2025, her team’s work on a Chitosan Nanoparticle-Based Agricultural Improver was awarded the prestigious TUBITAK Seal of Excellence. In the same year, nanoWISS was named a finalist for the Social Impact Award Germany.',
    ],
  },
  {
    name: 'Selen Özdinç',
    role: 'CTO of nanoWISS & CFO of AgroWISS',
    image: SelenImage,
    linkedin: 'https://www.linkedin.com/in/selen-%C3%B6zdin%C3%A7/',
    bio: [
      'Selen Özdinç is a Molecular Biotechnology graduate and Nano-Science master’s student at the University of Tübingen, with experience in nanoparticle synthesis, cell culture studies, and biotechnology-based research.',
      'As Chief Technology Officer at nanoWISS, Selen supports the coordination of R&D activities, facilitates communication among research personnel, and contributes to nanoparticle-based technology development. She also serves as Chief Financial Officer at AgroWISS, supporting financial planning, project budgeting, and strategic development.',
    ],
  },
  {
    name: 'Nisa Tan',
    role: 'COO of nanoWISS & CEO of AgroWISS',
    image: NisaImage,
    bio: [
      'Nisa Tan is a Molecular Biotechnology researcher and entrepreneur currently continuing her M.Sc. studies at the Turkish-German University. Bringing practical expertise from biotechnology research, she balances executive roles with deep technical knowledge.',
      'Nisa serves as Co-Founder and Chairman of the Board at AgroWISS, leading commercialization and strategic operations for eco-friendly agricultural biotechnologies. Alongside this, she continues as Chief Operating Officer at nanoWISS, managing day-to-day operations, procurement, and sales processes.',
    ],
  },
  {
    name: 'Elif Kaman',
    role: 'CINO of nanoWISS & CMO of AgroWISS',
    image: ElifImage,
    linkedin: 'https://tr.linkedin.com/in/elif-kaman-ek777',
    bio: [
      'Elif Kaman is a Biomedical Engineer and entrepreneur with experience in medical device development, quality systems, and regulatory affairs.',
      'As Chief Innovation Officer at nanoWISS, she leads innovation and product development processes, focusing on nanoparticle production technologies, system optimization, and 3D device design. She also contributes to AgroWISS through market-oriented product strategy and communication.',
    ],
  },
];

const advisors = [
  {
    name: 'Assist. Prof. Dr. Berrin Saygı Yalçın',
    role: 'Scientific Advisor',
    image: BerrinImage,
    linkedin: 'https://www.linkedin.com/in/berrin-saygi-yalcin-588b452b/',
    bio: [
      'Assist. Prof. Dr. Berrin Saygı Yalçın is a faculty member in the Department of Chemical Engineering at Yalova University. She conducts advanced laboratory research in nanotechnology and provides industrial consultancy.',
      'Dr. Yalçın serves as our Scientific Advisor through Adaga, the local Turkish company from which we source high-quality chitosan. She guides laboratory testing, establishes synthesis protocols, leads optimization processes, and supports licensing, regulation, and marketing workflows.',
    ],
  },
];

const team = [
  {
    name: 'Hakan Yılmaz',
    role: 'Engineer',
    image: HakanImage,
    linkedin: 'https://www.linkedin.com/in/hakanyilmaz83',
    bio: [
      'Hakan Yılmaz is a fourth-year Biomedical Engineering student at Ankara University. During his university years, he has gained experience through internships in different fields.',
      'He currently works as a Quality Control and Mechanical Design Specialist and is responsible for mechanical processes at nanoWISS.',
    ],
  },
  {
    name: 'Sümeyye Demir',
    role: 'Science Communication',
    image: SumeyyeImage,
    linkedin: 'https://www.linkedin.com/in/s%C3%BCmeyye-demir-766878226',
    bio: [
      'Sümeyye Demir is a Bioengineering student at Gebze Technical University. She creates LinkedIn content for NanoNewsScience, a newsletter about nanotechnology, health, agriculture, and biotechnology.',
      'She supports science communication by making deep-tech biotechnology more understandable for a broad audience.',
    ],
  },
  {
    name: 'Ceyda Önder',
    role: 'B.Sc. Chemical Engineer',
    image: CeydaImage,
    linkedin: 'https://www.linkedin.com/in/ceyda-%C3%B6nder-6bb086271',
    bio: [
      'Ceyda graduated from Yalova University with a degree in Chemical Engineering. She has hands-on experience in food and biotechnology laboratory research through internships, as well as field-level experience in production processes.',
      'As Laboratory Support Staff, she performs practical tasks such as synthesis, characterization, and sample preparation while contributing to technical documentation.',
    ],
  },
  {
    name: 'Batikan Bora Ormanci',
    role: 'AI / IT Mentor',
    image: BatikanImage,
    linkedin: 'https://www.linkedin.com/in/batikanor',
    bio: [
      'Batikan is an award-winning technology professional who supports nanoWISS as an AI / IT Mentor, occasionally helping the team identify opportunities and build practical web solutions.',
      'He is a Computer Science master’s graduate of Technical University of Munich and, at the time of this entry, works as a software engineer for an M&A boutique in Germany.',
    ],
  },
];

const TeamCard = ({ member, large = false }) => (
  <article className={`h-full rounded-lg bg-white p-6 text-left shadow ${large ? 'md:p-8' : ''}`}>
    <div className={`flex flex-col gap-5 ${large ? 'sm:flex-row' : ''}`}>
      {member.image ? (
        <img
          src={member.image}
          alt={member.name}
          loading="eager"
          decoding="async"
          className={
            large
              ? 'h-36 w-36 shrink-0 rounded-full object-cover'
              : 'h-32 w-32 shrink-0 rounded-full border-4 border-primary-light object-cover'
          }
        />
      ) : (
        <div
          aria-hidden="true"
          className={
            large
              ? 'flex h-36 w-36 shrink-0 items-center justify-center rounded-full bg-primary-dark text-4xl font-bold text-white shadow-inner'
              : 'flex h-32 w-32 shrink-0 items-center justify-center rounded-full bg-primary-dark text-3xl font-bold text-white shadow-inner'
          }
        >
          {member.initials}
        </div>
      )}
      <div>
        <h3 className="text-xl font-bold text-primary-dark">{member.name}</h3>
        <p className="mt-1 font-semibold text-secondary-light">{member.role}</p>
        {member.bio.map((paragraph) => (
          <p key={paragraph} className="mt-4 text-gray-700">
            {paragraph}
          </p>
        ))}
        {member.linkedin && (
          <a
            href={member.linkedin}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary-dark px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-light"
          >
            <Linkedin size={16} />
            LinkedIn
          </a>
        )}
      </div>
    </div>
  </article>
);

const TeamSection = ({ title, members, large = false }) => (
  <section className="py-12">
    <div className="container mx-auto px-4">
      <h2 className="mb-8 text-center text-3xl font-bold text-white">{title}</h2>
      <div className={`grid gap-6 ${large ? 'lg:grid-cols-2' : 'md:grid-cols-2'}`}>
        {members.map((member) => (
          <TeamCard key={member.name} member={member} large={large} />
        ))}
      </div>
    </div>
  </section>
);

const TeamPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <section className="bg-secondary-light py-14 text-center text-white">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-extrabold">Meet Our Team</h1>
            <p className="mx-auto mt-4 max-w-3xl text-lg text-white/85">
              nanoWISS brings together molecular biotechnology, biomedical engineering,
              chemical engineering, product development, science communication, and AI / IT mentoring.
            </p>
          </div>
        </section>

        <div className="bg-background">
          <TeamSection title="Co-Founders" members={founders} large />
          <TeamSection title="Scientific Advisor" members={advisors} large />
          <TeamSection title="Team" members={team} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TeamPage;
