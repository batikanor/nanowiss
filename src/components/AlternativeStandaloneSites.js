import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import {
  ArrowRight,
  Building2,
  FlaskConical,
  Leaf,
  Mail,
  Play,
  ShieldCheck,
  Waves,
} from 'lucide-react';
import agrowissProduct from '../assets/agrowiss_product.png';
import agrowissTeam from '../assets/agrowiss_team.png';
import deviceImage from '../assets/nanoparticle_device.png';
import labImage from '../assets/lab_nanoparticle.png';
import productImage from '../assets/product1.png';
import heroImage from '../assets/nwiss_backgr.jpg';
import FeyzaImage from '../assets/team_feyza_thumb.jpg';
import SelenImage from '../assets/team_selen_thumb.jpg';
import NisaImage from '../assets/team_nisa_thumb.jpg';
import ElifImage from '../assets/team_elif_thumb.jpg';

const siteNav = [
  ['platform', 'Platform'],
  ['applications', 'Applications'],
  ['evidence', 'Evidence'],
  ['team', 'Team'],
  ['contact', 'Contact'],
];

const proofItems = [
  'TUBITAK Seal of Excellence',
  'Social Impact Award Germany finalist',
  'AgroWISS incorporated at Bogazici University Teknopark',
  'Nanoparticle synthesis and application pipeline',
];

const teamCards = [
  ['Zeynep Feyza Atabey', 'CEO nanoWISS / CSO AgroWISS', FeyzaImage],
  ['Selen Ozdinc', 'CTO nanoWISS / CFO AgroWISS', SelenImage],
  ['Nisa Tan', 'COO nanoWISS / CEO AgroWISS', NisaImage],
  ['Elif Kaman', 'CINO nanoWISS / CMO AgroWISS', ElifImage],
];

const StandaloneNav = ({ tone = 'dark' }) => (
  <header className={`standalone-nav standalone-nav-${tone}`}>
    <a href="#top" className="standalone-logo">nanoWISS</a>
    <nav aria-label="Concept site navigation">
      {siteNav.map(([id, label]) => (
        <a key={id} href={`#${id}`}>{label}</a>
      ))}
    </nav>
  </header>
);

const ContactBand = ({ title = 'Open a collaboration', text = 'Tell us where your research, product, or field problem needs nanoparticle thinking.' }) => (
  <section id="contact" className="standalone-contact">
    <div>
      <p>Contact</p>
      <h2>{title}</h2>
      <span>{text}</span>
    </div>
    <a href="mailto:info@nanowiss.com?subject=nanoWISS collaboration inquiry" className="standalone-cta">
      <Mail size={18} />
      info@nanowiss.com
    </a>
  </section>
);

const EvidenceGrid = () => (
  <section id="evidence" className="standalone-section">
    <p className="standalone-kicker">Evidence Layer</p>
    <h2>Credibility without inflated claims.</h2>
    <div className="standalone-proof-grid">
      {proofItems.map((item, index) => (
        <article key={item}>
          <span>{String(index + 1).padStart(2, '0')}</span>
          <strong>{item}</strong>
        </article>
      ))}
    </div>
  </section>
);

const TeamStrip = () => (
  <section id="team" className="standalone-section">
    <p className="standalone-kicker">Team Coordinates</p>
    <h2>Biotechnology, engineering, product, and communication in one operating team.</h2>
    <div className="standalone-team-strip">
      {teamCards.map(([name, role, image]) => (
        <article key={name}>
          <img src={image} alt={name} loading="eager" decoding="async" />
          <strong>{name}</strong>
          <span>{role}</span>
        </article>
      ))}
    </div>
  </section>
);

const SimpleFooter = () => (
  <footer className="standalone-footer">
    <strong>nanoWISS</strong>
    <span>Let's take a Deep breath.</span>
    <a href="mailto:info@nanowiss.com">info@nanowiss.com</a>
  </footer>
);

const CityCanvas = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 100);
    camera.position.set(4, 5.2, 9);
    camera.lookAt(0, 0, 0);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);
    const cyan = new THREE.MeshStandardMaterial({ color: 0x102833, emissive: 0x2dd4ff, emissiveIntensity: 0.18, metalness: 0.25, roughness: 0.38 });
    const purple = new THREE.MeshStandardMaterial({ color: 0x2c1648, emissive: 0xb083ff, emissiveIntensity: 0.16, metalness: 0.25, roughness: 0.42 });
    for (let x = -4; x <= 4; x += 1) {
      for (let z = -3; z <= 3; z += 1) {
        if (Math.random() > 0.72) continue;
        const height = 0.45 + Math.random() * 2.8;
        const tower = new THREE.Mesh(new THREE.BoxGeometry(0.52, height, 0.52), Math.random() > 0.5 ? cyan.clone() : purple.clone());
        tower.position.set(x, height / 2, z);
        group.add(tower);
      }
    }
    const grid = new THREE.GridHelper(10, 24, 0x2dd4ff, 0x422768);
    grid.material.transparent = true;
    grid.material.opacity = 0.22;
    group.add(grid);
    const light = new THREE.PointLight(0xb083ff, 4, 20);
    light.position.set(0, 6, 4);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0xffffff, 0.38));

    const resize = () => {
      const { width, height } = mount.getBoundingClientRect();
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    resize();
    window.addEventListener('resize', resize);
    let raf = 0;
    const animate = () => {
      group.rotation.y += 0.003;
      renderer.render(scene, camera);
      raf = window.requestAnimationFrame(animate);
    };
    animate();
    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      renderer.dispose();
      group.traverse((child) => {
        if (child.geometry) child.geometry.dispose();
        if (child.material) child.material.dispose();
      });
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="standalone-visual-canvas" aria-label="Procedural neon research city" />;
};

const QuestGame = () => {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const state = {
      width: 0,
      height: 0,
      player: { x: 140, y: 180, vx: 0, vy: 0 },
      pointer: null,
      markers: Array.from({ length: 14 }).map(() => ({ x: Math.random(), y: Math.random(), hit: false })),
      noise: Array.from({ length: 12 }).map(() => ({ x: Math.random(), y: Math.random(), r: 14 + Math.random() * 18 })),
      score: 0,
      level: 1,
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      state.width = rect.width;
      state.height = rect.height;
      canvas.width = Math.floor(rect.width * Math.min(window.devicePixelRatio || 1, 2));
      canvas.height = Math.floor(rect.height * Math.min(window.devicePixelRatio || 1, 2));
      ctx.setTransform(canvas.width / rect.width, 0, 0, canvas.height / rect.height, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const move = (event) => {
      const rect = canvas.getBoundingClientRect();
      state.pointer = { x: event.clientX - rect.left, y: event.clientY - rect.top };
    };
    canvas.addEventListener('pointermove', move);
    canvas.addEventListener('pointerdown', move);

    let raf = 0;
    const draw = () => {
      const { width, height, player } = state;
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = '#071015';
      ctx.fillRect(0, 0, width, height);
      ctx.strokeStyle = 'rgba(45,212,255,.12)';
      ctx.lineWidth = 1;
      for (let y = 40; y < height; y += 56) {
        ctx.beginPath();
        ctx.moveTo(0, y + Math.sin(y * 0.02) * 14);
        for (let x = 0; x <= width; x += 28) ctx.lineTo(x, y + Math.sin(x * 0.018 + y * 0.02) * 14);
        ctx.stroke();
      }
      if (state.pointer) {
        player.vx += (state.pointer.x - player.x) * 0.002;
        player.vy += (state.pointer.y - player.y) * 0.002;
      }
      player.vx *= 0.92;
      player.vy *= 0.92;
      player.x = Math.max(18, Math.min(width - 18, player.x + player.vx));
      player.y = Math.max(18, Math.min(height - 18, player.y + player.vy));

      state.noise.forEach((noise, index) => {
        const x = noise.x * width;
        const y = noise.y * height;
        ctx.fillStyle = 'rgba(255,176,79,.18)';
        ctx.beginPath();
        ctx.arc(x, y, noise.r + Math.sin(Date.now() * 0.002 + index) * 4, 0, Math.PI * 2);
        ctx.fill();
        if (Math.hypot(player.x - x, player.y - y) < noise.r + 14) {
          player.vx *= -0.3;
          player.vy *= -0.3;
        }
      });

      state.markers.forEach((marker) => {
        const x = marker.x * width;
        const y = marker.y * height;
        if (!marker.hit && Math.hypot(player.x - x, player.y - y) < 22) {
          marker.hit = true;
          state.score += 1;
          setScore(state.score);
          if (state.score % 7 === 0) {
            state.level += 1;
            setLevel(state.level);
          }
        }
        ctx.fillStyle = marker.hit ? 'rgba(158,230,191,.18)' : '#2dd4ff';
        ctx.beginPath();
        ctx.arc(x, y, marker.hit ? 7 : 10, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.fillStyle = '#b083ff';
      ctx.shadowColor = '#b083ff';
      ctx.shadowBlur = 24;
      ctx.beginPath();
      ctx.arc(player.x, player.y, 18, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      raf = window.requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('pointermove', move);
      canvas.removeEventListener('pointerdown', move);
    };
  }, []);

  return (
    <div className="quest-shell">
      <canvas ref={canvasRef} aria-label="Particle Quest mini game" />
      <div className="quest-hud">
        <span>Level {level}</span>
        <strong>{score} signals captured</strong>
        <em>Drag or move pointer to steer</em>
      </div>
    </div>
  );
};

const WaveCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = 0;
    let height = 0;
    let raf = 0;
    let frame = 0;
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * Math.min(window.devicePixelRatio || 1, 2));
      canvas.height = Math.floor(height * Math.min(window.devicePixelRatio || 1, 2));
      ctx.setTransform(canvas.width / width, 0, 0, canvas.height / height, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);
    const draw = () => {
      frame += 1;
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = 'rgba(5,8,19,.96)';
      ctx.fillRect(0, 0, width, height);
      for (let lane = 0; lane < 6; lane += 1) {
        ctx.strokeStyle = lane % 2 ? 'rgba(176,131,255,.55)' : 'rgba(45,212,255,.55)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let x = 0; x <= width; x += 6) {
          const y = height * (0.18 + lane * 0.13) + Math.sin(x * 0.025 + frame * 0.04 + lane) * (16 + lane * 3);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      raf = window.requestAnimationFrame(draw);
    };
    draw();
    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="wave-canvas" aria-label="Animated signal observatory waveform" />;
};

const SceneFrames = () => (
  <div className="cinema-frames">
    {[heroImage, labImage, deviceImage, agrowissProduct, agrowissTeam].map((image, index) => (
      <figure key={image}>
        <img src={image} alt={`nanoWISS scene ${index + 1}`} />
        <figcaption>{['Opening frame', 'Material close-up', 'Production system', 'AgroWISS application', 'Team scene'][index]}</figcaption>
      </figure>
    ))}
  </div>
);

const capabilityRows = [
  ['Synthesis', 'Nanoparticle formulation and lab-scale material control.', FlaskConical],
  ['Scale-up', 'Production-system thinking for repeatable, adaptable development.', Building2],
  ['Biofilm interface', 'Research-oriented pathways for surface and microbial challenges.', ShieldCheck],
  ['AgroWISS', 'Chitosan carrier systems and slow-release agricultural biotechnology.', Leaf],
];

const StandaloneShell = ({ variant, tone = 'dark', eyebrow, title, text, visual, children }) => (
  <div id="top" className={`standalone-site standalone-${variant}`}>
    <StandaloneNav tone={tone} />
    <main>
      <section className="standalone-hero">
        <div className="standalone-hero-copy">
          <p>{eyebrow}</p>
          <h1>{title}</h1>
          <span>{text}</span>
          <div className="standalone-actions">
            <a href="#platform">Explore Platform <ArrowRight size={18} /></a>
            <a href="mailto:info@nanowiss.com">Contact <Mail size={18} /></a>
          </div>
        </div>
        <div className="standalone-hero-visual">{visual}</div>
      </section>
      {children}
    </main>
    <SimpleFooter />
  </div>
);

const PlatformRows = ({ mode = 'dark', title = 'One nanoparticle platform, multiple application directions.' }) => (
  <section id="platform" className={`standalone-section platform-rows platform-rows-${mode}`}>
    <p className="standalone-kicker">Platform</p>
    <h2>{title}</h2>
    <div>
      {capabilityRows.map(([title, text, Icon]) => (
        <article key={title}>
          <Icon size={26} />
          <strong>{title}</strong>
          <span>{text}</span>
        </article>
      ))}
    </div>
  </section>
);

const ApplicationsPanel = ({ items, title = 'Application pathways made concrete.' }) => (
  <section id="applications" className="standalone-section application-panels">
    <p className="standalone-kicker">Applications</p>
    <h2>{title}</h2>
    <div>
      {items.map(([title, text]) => (
        <article key={title}>
          <strong>{title}</strong>
          <span>{text}</span>
        </article>
      ))}
    </div>
  </section>
);

export const NeonResearchCitySite = () => (
  <StandaloneShell
    variant="neon-city"
    eyebrow="Applied Nano Research District"
    title="The city where material ideas become testable systems."
    text="A full replacement site built as a procedural research district: synthesis towers, process pathways, evidence blocks, and collaboration routes."
    visual={<CityCanvas />}
  >
    <PlatformRows title="A research district organized by capability." />
    <ApplicationsPanel title="Each district becomes a real section of the company story." items={[
      ['Surface Engineering', 'Biofilm, coating, and interface work framed as practical collaboration zones.'],
      ['Nanomaterials', 'Chitosan and nanoparticle carrier systems explained through material behavior.'],
      ['Process Development', 'From formulation to repeatable system design.'],
    ]} />
    <EvidenceGrid />
    <TeamStrip />
    <ContactBand />
  </StandaloneShell>
);

export const ParticleQuestSite = () => (
  <div id="top" className="standalone-site standalone-quest">
    <StandaloneNav />
    <main>
      <section className="quest-hero">
        <QuestGame />
        <div>
          <p className="standalone-kicker">Playable Scientific Instrument</p>
          <h1>Particle Quest</h1>
          <span>Guide a particle through a microfluidic field. Capture signals, avoid noise, and reveal how nanoWISS turns nanoscale behavior into application-ready insight.</span>
          <div className="standalone-actions">
            <a href="#platform"><Play size={18} /> Explore after playing</a>
            <a href="mailto:info@nanowiss.com"><Mail size={18} /> Contact</a>
          </div>
        </div>
      </section>
      <PlatformRows title="Game mechanics mapped to real platform capabilities." />
      <ApplicationsPanel title="A scientific game loop backed by business content." items={[
        ['Signal Capture', 'Collect markers that represent measurable nanoscale interactions.'],
        ['Precision Sorting', 'Navigate gates, noise, and compatibility decisions.'],
        ['Verified Insight', 'Convert a game loop into a site narrative about validation.'],
      ]} />
      <EvidenceGrid />
      <TeamStrip />
      <ContactBand />
    </main>
    <SimpleFooter />
  </div>
);

export const AgroOrbitSite = () => (
  <StandaloneShell
    variant="agro-orbit"
    tone="light"
    eyebrow="AgroWISS Field Intelligence"
    title="Field orbit."
    text="A full AgroWISS-first site where crop protection, chitosan carriers, and sustainable field systems are organized as living data rings."
    visual={<div className="agro-orbit-visual"><img src={agrowissProduct} alt="AgroWISS product" /><span /><span /><span /></div>}
  >
    <PlatformRows mode="light" title="AgroWISS as the operating system of the page." />
    <ApplicationsPanel title="Field value, product mechanism, and deployment fit." items={[
      ['Slow Release', 'Carrier systems designed to protect active ingredients and release them gradually.'],
      ['Crop Protection', 'Biological crop protection framed through deployment and field value.'],
      ['Sustainability', 'Upcycled chitosan logic, fewer repeated sprays, and soil-aware messaging.'],
    ]} />
    <EvidenceGrid />
    <TeamStrip />
    <ContactBand title="Discuss an AgroWISS pilot" />
  </StandaloneShell>
);

export const ClinicalEclipseSite = () => (
  <StandaloneShell
    variant="clinical-eclipse"
    eyebrow="Clinical Research Dossier"
    title="Biofilm, revealed."
    text="A dark editorial medical-science site for surfaces, biofilm research pathways, and partner validation."
    visual={<div className="eclipse-visual"><img src={labImage} alt="Microscopy evidence" /><div /></div>}
  >
    <PlatformRows title="A restrained pathway from surface problem to validation." />
    <ApplicationsPanel title="Medical-science content arranged like a research dossier." items={[
      ['Medical Surfaces', 'Partner-facing exploration of material compatibility and validation needs.'],
      ['Biofilm Boundary', 'Language centered on interfaces, access, testing, and research translation.'],
      ['Validation Pathway', 'Inquiry, technical fit, sample testing, and deployment planning.'],
    ]} />
    <EvidenceGrid />
    <ContactBand title="Start a validation conversation" />
  </StandaloneShell>
);

export const MaterialAtlasSite = () => (
  <StandaloneShell
    variant="material-atlas"
    tone="light"
    eyebrow="Material Atlas"
    title="Nano systems, mapped."
    text="A data-visualization site that turns nanoWISS into plotted materials, application territories, evidence layers, and team coordinates."
    visual={<div className="atlas-map">{['Synthesis', 'Production', 'Biofilm', 'AgroWISS', 'Chitosan', 'Slow release'].map((node, index) => <button key={node} style={{ '--x': `${16 + (index * 15) % 68}%`, '--y': `${22 + (index * 23) % 58}%` }}>{node}</button>)}</div>}
  >
    <PlatformRows mode="light" title="The platform as a plotted material pipeline." />
    <ApplicationsPanel title="Application territories instead of marketing cards." items={[
      ['Health Territory', 'Biofilm and respiratory application research, stated conservatively.'],
      ['Production Territory', 'System design, repeatability, and lab-to-process translation.'],
      ['AgroWISS Territory', 'Chitosan carrier systems and crop protection applications.'],
    ]} />
    <EvidenceGrid />
    <TeamStrip />
    <ContactBand />
  </StandaloneShell>
);

export const BreathSignalSite = () => (
  <StandaloneShell
    variant="breath-signal"
    tone="light"
    eyebrow="Respiratory Delivery Map"
    title="Breath as a precise delivery signal."
    text="A calm medical-tech replacement site where airflow, lung geometry, particles, and biofilm interfaces are presented as a controlled platform story."
    visual={<div className="lung-visual"><Waves size={190} /><span /><span /><span /></div>}
  >
    <PlatformRows mode="light" title="Respiratory delivery explained as a signal path." />
    <ApplicationsPanel title="Calm medical-tech modules with grounded language." items={[
      ['Particle Design', 'Formulation, carrier behavior, and deposition thinking.'],
      ['Mucosal Interface', 'Respiratory pathways shown as delivery maps, not wellness decoration.'],
      ['Biofilm Boundary', 'Target interface, localized access, and validation requirements.'],
    ]} />
    <EvidenceGrid />
    <ContactBand title="Talk respiratory formulation" />
  </StandaloneShell>
);

export const NanoCinemaSite = () => (
  <div id="top" className="standalone-site standalone-cinema">
    <StandaloneNav />
    <main>
      <section className="cinema-opening">
        <img src={heroImage} alt="nanoWISS cinematic opening" />
        <div>
          <p>nanoWISS Original Sequence</p>
          <h1>One platform. Five frames. A complete science story.</h1>
        </div>
      </section>
      <section id="platform" className="standalone-section">
        <p className="standalone-kicker">Film-strip Thesis</p>
        <h2>The site behaves like a directed research film.</h2>
        <SceneFrames />
      </section>
      <ApplicationsPanel title="Scenes replace sections, but the content remains readable." items={[
        ['Material Close-up', 'Real imagery and caption-driven explanation.'],
        ['Process Sequence', 'Challenge, method, validation, and result.'],
        ['Applications Reel', 'Health, production, and AgroWISS scenes.'],
      ]} />
      <EvidenceGrid />
      <TeamStrip />
      <ContactBand title="Roll the next frame with nanoWISS" />
    </main>
    <SimpleFooter />
  </div>
);

export const FounderLabSite = () => (
  <StandaloneShell
    variant="founder-lab"
    tone="light"
    eyebrow="Founder Lab Notebook"
    title="The team behind the platform."
    text="An editorial replacement site where team expertise, research decisions, and venture milestones form the primary story."
    visual={<div className="founder-wall">{teamCards.map(([name, role, image]) => <article key={name}><img src={image} alt={name} loading="eager" decoding="async" /><strong>{name}</strong><span>{role}</span></article>)}</div>}
  >
    <PlatformRows mode="light" title="The operating team becomes the trust architecture." />
    <ApplicationsPanel title="Notebook chapters instead of generic biographies." items={[
      ['Founder Notes', 'Why the work started with biofilm and expanded toward planetary health.'],
      ['Operating Roles', 'Scientific, technical, financial, commercial, and communication ownership.'],
      ['Advisor Layer', 'Scientific guidance, synthesis protocols, and practical lab workflows.'],
    ]} />
    <EvidenceGrid />
    <ContactBand title="Meet the team behind the platform" />
  </StandaloneShell>
);

export const ProductTheaterSite = () => (
  <StandaloneShell
    variant="product-theater"
    eyebrow="Product Theater"
    title="Particles on stage."
    text="A replacement site built as a product demo: staged objects, technical captions, and business-ready proof."
    visual={<div className="product-stage"><img src={deviceImage} alt="nanoWISS production system" /><img src={agrowissProduct} alt="AgroWISS product" /><img src={productImage} alt="Application product" /></div>}
  >
    <PlatformRows title="A product showroom with technical captions." />
    <ApplicationsPanel title="Objects, specs, and use contexts staged for inspection." items={[
      ['Production System', 'Scalable system design for nanoparticle development.'],
      ['AgroWISS Bottle', 'Agricultural biotechnology shown as an inspectable product object.'],
      ['Application Pipeline', 'Health, disinfection, and surface concepts framed carefully.'],
    ]} />
    <EvidenceGrid />
    <TeamStrip />
    <ContactBand title="Request a product discussion" />
  </StandaloneShell>
);

export const SignalObservatorySite = () => (
  <StandaloneShell
    variant="signal-observatory"
    eyebrow="Signal Observatory"
    title="Reading the signals hidden at particle scale."
    text="A waveform and observatory-style replacement site that positions nanoWISS as a system for sensing, interpreting, and validating material behavior."
    visual={<WaveCanvas />}
  >
    <PlatformRows title="A measurement environment for material behavior." />
    <ApplicationsPanel title="Signal channels that explain the company, not just decorate it." items={[
      ['Signal Processing', 'Waveform aesthetics explain measurement and validation.'],
      ['Material Behavior', 'Particle systems interpreted as readable data.'],
      ['Decision Layer', 'Evidence, partners, team, and contact flow as an observatory dashboard.'],
    ]} />
    <EvidenceGrid />
    <TeamStrip />
    <ContactBand title="Tune a collaboration signal" />
  </StandaloneShell>
);
