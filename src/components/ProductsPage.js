import React from 'react';
import { Award, Building2, FlaskConical, Leaf, Mail } from 'lucide-react';
import productImage from '../assets/product1.png';
import labNanoparticleImage from '../assets/lab_nanoparticle.png';
import nanoparticleDeviceImage from '../assets/nanoparticle_device.png';
import socialImpactAwardLogo from '../assets/social_impact_award.png';
import tubitakBiggLogo from '../assets/tubitak_bigg.png';
import bogaziciTeknoparkLogo from '../assets/bogazici_teknopark.png';
import Navbar from './Navbar';
import Footer from './Footer';

const products = [
  {
    title: 'Precision Nanoparticle Production',
    description:
      'We develop and synthesize nanoparticles in laboratory environments to support scalable nanotechnology applications and future industrial production systems.',
    image: labNanoparticleImage,
  },
  {
    title: 'nanoWISS® Nanoparticle Production System',
    description:
      'A scalable nanoparticle production system designed to support efficient, sustainable, and adaptable nanotechnology applications.',
    image: nanoparticleDeviceImage,
  },
  {
    title: 'Nanoparticle-Containing Applications',
    description:
      'Our development pipeline includes agricultural solutions, disinfection products, and biofilm infection treatment applications.',
    image: productImage,
  },
];

const milestones = [
  {
    icon: FlaskConical,
    title: 'TUBITAK Seal of Excellence',
    description:
      'The team’s Chitosan Nanoparticle-Based Agricultural Improver received the TUBITAK Seal of Excellence in 2025.',
    logo: tubitakBiggLogo,
  },
  {
    icon: Award,
    title: 'Social Impact Award Finalist',
    description:
      'nanoWISS was named a finalist for the Social Impact Award Germany, recognizing its social-impact potential.',
    logo: socialImpactAwardLogo,
  },
  {
    icon: Building2,
    title: 'AgroWISS Company Formation',
    description:
      'AgroWISS Biotechnology Research Inc. incorporated at Bogazici University Teknopark after receiving 900,000 TL investment through TUBITAK BIGG.',
    logo: bogaziciTeknoparkLogo,
  },
];

const ProductsPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-grow">
        <section className="bg-secondary-light py-16">
          <div className="container mx-auto px-4 text-center">
            <p className="font-semibold uppercase tracking-wide text-primary-light">nanoWISS Technologies</p>
            <h1 className="mt-3 text-4xl font-extrabold text-white">What We Develop</h1>
            <p className="mx-auto mt-4 max-w-3xl text-lg text-white/85">
              We combine nanoparticle synthesis, scalable production systems, and applied
              biotechnology to move laboratory research toward real-world health and sustainability use cases.
            </p>
          </div>
        </section>

        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {products.map((product) => (
                <article
                  key={product.title}
                  className="flex h-full flex-col rounded-lg border border-gray-100 bg-white p-6 shadow transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="mb-5 h-52 w-full rounded-md object-contain"
                  />
                  <h2 className="text-xl font-bold text-primary-dark">{product.title}</h2>
                  <p className="mt-3 flex-grow text-gray-700">{product.description}</p>
                  {product.title === 'Nanoparticle-Containing Applications' && (
                    <a
                      href="mailto:info@nanowiss.com?subject=Product Inquiry&body=Hello nanoWISS team,"
                      className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-primary-dark px-6 py-3 font-semibold text-white transition hover:bg-primary-light"
                    >
                      <Mail size={18} />
                      Contact Us
                    </a>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-primary-light py-16 text-white">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <Leaf className="mx-auto mb-4" size={44} />
              <h2 className="text-3xl font-bold">Real Milestones</h2>
              <p className="mt-3 text-white/85">
                We replaced generic achievement counters with verifiable business and research milestones.
              </p>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
              {milestones.map((milestone) => {
                const Icon = milestone.icon;
                return (
                  <article key={milestone.title} className="rounded-lg bg-secondary-dark p-6 shadow">
                    <div className="flex h-16 items-center gap-4">
                      <Icon size={34} className="shrink-0 text-primary-light" />
                      <img
                        src={milestone.logo}
                        alt=""
                        className="max-h-14 max-w-[11rem] rounded bg-white object-contain p-2"
                      />
                    </div>
                    <h3 className="mt-5 text-xl font-bold">{milestone.title}</h3>
                    <p className="mt-3 text-white/85">{milestone.description}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ProductsPage;
