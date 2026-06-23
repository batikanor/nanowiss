import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import {
  ArrowLeft,
  ArrowRight,
  Atom,
  Blocks,
  Factory,
  Gamepad2,
  Leaf,
  Microscope,
  Radar,
  ScanLine,
  ShieldCheck,
  Sparkles,
  Timer,
  Trophy,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import labImage from '../assets/lab_nanoparticle.png';
import deviceImage from '../assets/nanoparticle_device.png';
import agrowissProduct from '../assets/agrowiss_product.png';
import productImage from '../assets/product1.png';
import agrowissTeam from '../assets/agrowiss_team.png';

const variantLinks = [
  ['/alternative/showcase', 'Showcase'],
  ['/alternative/constellation', 'Constellation'],
  ['/alternative/control-room', 'Control Room'],
  ['/alternative/agro-lab', 'Agro Lab'],
  ['/alternative/clinical', 'Clinical'],
  ['/alternative/orbital-reactor', '3D Reactor'],
  ['/alternative/specimen-vault', 'Specimen Vault'],
  ['/alternative/launch-sequence', 'Launch Sequence'],
  ['/alternative/biofilm-breaker', 'Biofilm Breaker'],
  ['/alternative/splat-lab', 'Splat Lab'],
  ['/alternative/impact-portal', 'Impact Portal'],
];

const HiddenNav = ({ active, tone = 'dark' }) => (
  <div className="flex flex-wrap gap-2">
    {variantLinks.map(([href, label]) => (
      <Link
        key={href}
        to={href}
        className={`rounded-full border px-4 py-2 text-sm font-bold transition ${
          active === href
            ? 'border-primary-light bg-primary-light text-white'
            : tone === 'light'
              ? 'border-[#422768]/15 text-[#422768]/70 hover:border-primary hover:text-primary'
              : 'border-white/20 text-white/75 hover:border-primary-light hover:text-primary-light'
        }`}
      >
        {label}
      </Link>
    ))}
  </div>
);

const ThreeReactorCanvas = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0.35, 7.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const coreMaterial = new THREE.MeshStandardMaterial({
      color: 0x9f7aea,
      emissive: 0x6d4ab6,
      emissiveIntensity: 1.2,
      roughness: 0.35,
      metalness: 0.15,
    });
    const core = new THREE.Mesh(new THREE.IcosahedronGeometry(1.05, 5), coreMaterial);
    group.add(core);

    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0xb083ff,
      transparent: true,
      opacity: 0.46,
    });
    const rings = [];
    [0, Math.PI / 3, -Math.PI / 3].forEach((rotation, index) => {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(2.15 + index * 0.23, 0.018, 16, 160), ringMaterial.clone());
      ring.rotation.x = Math.PI / 2;
      ring.rotation.y = rotation;
      rings.push(ring);
      group.add(ring);
    });

    const particleGeometry = new THREE.SphereGeometry(0.055, 14, 14);
    const particleMaterial = new THREE.MeshBasicMaterial({ color: 0x2dd4ff });
    const particles = new THREE.InstancedMesh(particleGeometry, particleMaterial, 110);
    const dummy = new THREE.Object3D();
    const particleData = Array.from({ length: 110 }).map((_, index) => ({
      radius: 2.35 + Math.random() * 1.35,
      theta: Math.random() * Math.PI * 2,
      phi: Math.acos(2 * Math.random() - 1),
      speed: 0.0015 + Math.random() * 0.0035,
      size: 0.7 + Math.random() * 1.8,
      phase: index * 0.15,
    }));
    group.add(particles);

    const lightA = new THREE.PointLight(0xb083ff, 4.5, 10);
    lightA.position.set(2, 3, 4);
    scene.add(lightA);
    const lightB = new THREE.PointLight(0x2dd4ff, 2.2, 8);
    lightB.position.set(-3, -2, 3);
    scene.add(lightB);
    scene.add(new THREE.AmbientLight(0xffffff, 0.42));

    const pointer = { x: 0, y: 0 };
    const handlePointer = (event) => {
      const rect = mount.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      pointer.y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    mount.addEventListener('pointermove', handlePointer);

    const resize = () => {
      const { width, height } = mount.getBoundingClientRect();
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    resize();
    window.addEventListener('resize', resize);

    let frame = 0;
    let raf = 0;
    const animate = () => {
      frame += 1;
      group.rotation.y += 0.004 + pointer.x * 0.0008;
      group.rotation.x += (pointer.y * 0.18 - group.rotation.x) * 0.025;
      core.rotation.y += 0.011;
      core.rotation.x += 0.006;
      rings.forEach((ring, index) => {
        ring.rotation.z += 0.006 + index * 0.002;
        ring.material.opacity = 0.32 + Math.sin(frame * 0.025 + index) * 0.12;
      });

      particleData.forEach((particle, index) => {
        particle.theta += particle.speed;
        const pulse = 1 + Math.sin(frame * 0.025 + particle.phase) * 0.08;
        const x = particle.radius * pulse * Math.sin(particle.phi) * Math.cos(particle.theta);
        const y = particle.radius * pulse * Math.cos(particle.phi);
        const z = particle.radius * pulse * Math.sin(particle.phi) * Math.sin(particle.theta);
        dummy.position.set(x, y, z);
        dummy.scale.setScalar(particle.size);
        dummy.updateMatrix();
        particles.setMatrixAt(index, dummy.matrix);
      });
      particles.instanceMatrix.needsUpdate = true;

      renderer.render(scene, camera);
      raf = window.requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      mount.removeEventListener('pointermove', handlePointer);
      renderer.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      core.geometry.dispose();
      coreMaterial.dispose();
      rings.forEach((ring) => {
        ring.geometry.dispose();
        ring.material.dispose();
      });
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="three-reactor-canvas" aria-label="Interactive Three.js nanoparticle reactor" />;
};

export const AlternativeOrbitalReactorPage = () => (
  <div className="min-h-screen bg-[#090312] text-white">
    <Navbar />
    <main>
      <section className="relative overflow-hidden bg-[radial-gradient(circle_at_70%_35%,#422768_0%,#1a1a2e_45%,#090312_100%)]">
        <div className="container mx-auto grid min-h-[46rem] grid-cols-1 items-center gap-8 px-4 py-16 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <Link to="/alternative" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-bold text-white/80 hover:border-primary-light hover:text-primary-light">
              <ArrowLeft size={16} />
              Back to Alternative
            </Link>
            <p className="mt-8 font-bold uppercase tracking-wide text-primary-light">Three.js Concept</p>
            <h1 className="mt-4 text-4xl font-extrabold md:text-6xl">Orbital Reactor</h1>
            <p className="mt-6 max-w-xl text-lg text-white/72">
              A live WebGL product hero for nanoWISS: the nanoparticle platform becomes a responsive,
              explorable reactor instead of a static marketing card.
            </p>
            <div className="mt-8">
              <HiddenNav active="/alternative/orbital-reactor" />
            </div>
          </div>
          <div className="three-reactor-shell">
            <ThreeReactorCanvas />
            <div className="three-reactor-readout three-reactor-readout-a">
              <span>Particle field</span>
              <strong>110 nodes</strong>
            </div>
            <div className="three-reactor-readout three-reactor-readout-b">
              <span>Interaction</span>
              <strong>Pointer reactive</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#12051f] py-16">
        <div className="container mx-auto grid grid-cols-1 gap-6 px-4 md:grid-cols-3">
          {[
            ['3D synthesis core', 'The hero makes the invisible nanoparticle system feel tangible and alive.', Atom],
            ['Investor-friendly detail', 'The readouts create a technical mood without overclaiming medical performance.', Radar],
            ['Reusable scene language', 'The same 3D motif could anchor product, science, and partner pages.', Blocks],
          ].map(([title, text, Icon]) => (
            <article key={title} className="rounded-lg border border-white/10 bg-white/[0.06] p-6">
              <Icon className="text-primary-light" size={34} />
              <h2 className="mt-5 text-xl font-bold">{title}</h2>
              <p className="mt-3 text-white/70">{text}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

const vaultItems = [
  {
    title: 'Synthesis',
    image: labImage,
    label: 'Specimen 01',
    text: 'A controlled lab object: precise, inspectable, and grounded in research.',
  },
  {
    title: 'Production System',
    image: deviceImage,
    label: 'Specimen 02',
    text: 'A platform object: made for scale-up, repeatability, and autonomy.',
  },
  {
    title: 'AgroWISS',
    image: agrowissProduct,
    label: 'Specimen 03',
    text: 'A field object: slow-release agricultural biotechnology with a clear use case.',
  },
  {
    title: 'Application Pipeline',
    image: productImage,
    label: 'Specimen 04',
    text: 'A pipeline object: health, biofilm, and disinfection concepts framed carefully.',
  },
];

export const AlternativeSpecimenVaultPage = () => (
  <div className="min-h-screen bg-[#f4f1ff] text-[#180b2a]">
    <Navbar />
    <main>
      <section className="vault-hero">
        <div className="container mx-auto px-4 py-16">
          <Link to="/alternative" className="inline-flex items-center gap-2 rounded-full border border-[#422768]/20 px-4 py-2 text-sm font-bold text-[#422768] hover:border-[#422768]">
            <ArrowLeft size={16} />
            Back to Alternative
          </Link>
          <div className="mt-14 grid grid-cols-1 items-end gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="font-bold uppercase tracking-wide text-primary">Editorial Concept</p>
              <h1 className="mt-4 text-5xl font-extrabold md:text-7xl">Specimen Vault</h1>
              <p className="mt-6 max-w-3xl text-xl text-[#4f3f63]">
                A museum-like product archive that feels premium, sparse, and tactile. It trades
                the usual startup layout for a curated science collection.
              </p>
            </div>
            <HiddenNav active="/alternative/specimen-vault" tone="light" />
          </div>
        </div>
      </section>

      <section className="vault-gallery">
        {vaultItems.map((item) => (
          <article key={item.title} className="vault-card">
            <div className="vault-meta">
              <p>{item.label}</p>
              <h2>{item.title}</h2>
              <span>{item.text}</span>
            </div>
            <img src={item.image} alt={item.title} />
          </article>
        ))}
      </section>
    </main>
    <Footer />
  </div>
);

const sequenceSteps = [
  ['01', 'Start with health', 'nanoWISS begins with nanoparticle-based thinking for resistant biofilm challenges.', Microscope],
  ['02', 'Build the machine', 'Production moves from lab synthesis toward scalable, autonomous systems.', Factory],
  ['03', 'Branch into agriculture', 'AgroWISS turns the same platform logic toward crop protection and soil health.', Leaf],
  ['04', 'Show proof', 'TUBITAK, Teknopark, and social-impact milestones become the trust layer.', ShieldCheck],
];

export const AlternativeLaunchSequencePage = () => (
  <div className="min-h-screen bg-[#10051c] text-white">
    <Navbar />
    <main className="launch-page">
      <section className="container mx-auto px-4 py-16">
        <Link to="/alternative" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-bold text-white/80 hover:border-primary-light hover:text-primary-light">
          <ArrowLeft size={16} />
          Back to Alternative
        </Link>
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="lg:sticky lg:top-8 lg:self-start">
            <p className="font-bold uppercase tracking-wide text-primary-light">Scrollytelling Concept</p>
            <h1 className="mt-4 text-4xl font-extrabold md:text-6xl">Launch Sequence</h1>
            <p className="mt-6 text-lg text-white/70">
              A guided narrative version of the website. Instead of asking visitors to choose a page,
              it walks them through the business story in a cinematic sequence.
            </p>
            <div className="mt-8">
              <HiddenNav active="/alternative/launch-sequence" />
            </div>
          </div>
          <div className="launch-sequence">
            {sequenceSteps.map(([number, title, text, Icon]) => (
              <article key={title} className="launch-step">
                <div className="launch-step-number">{number}</div>
                <div className="launch-step-icon">
                  <Icon size={30} />
                </div>
                <h2>{title}</h2>
                <p>{text}</p>
                <ArrowRight className="launch-arrow" size={28} />
              </article>
            ))}
            <article className="launch-finale">
              <img src={agrowissTeam} alt="nanoWISS and AgroWISS team" />
              <div>
                <p>Final Frame</p>
                <h2>One platform, multiple planetary-health directions.</h2>
              </div>
            </article>
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

const createSplatTexture = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 96;
  canvas.height = 96;
  const ctx = canvas.getContext('2d');
  const gradient = ctx.createRadialGradient(48, 48, 0, 48, 48, 48);
  gradient.addColorStop(0, 'rgba(255,255,255,0.92)');
  gradient.addColorStop(0.32, 'rgba(176,131,255,0.78)');
  gradient.addColorStop(0.72, 'rgba(45,212,255,0.22)');
  gradient.addColorStop(1, 'rgba(45,212,255,0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 96, 96);
  return new THREE.CanvasTexture(canvas);
};

const BiofilmBreakerCanvas = ({ onStats }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x090312, 8, 18);
    const camera = new THREE.PerspectiveCamera(52, 1, 0.1, 80);
    camera.position.set(0, 5.2, 9.5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x090312, 0);
    mount.appendChild(renderer.domElement);

    const arena = new THREE.Mesh(
      new THREE.PlaneGeometry(12, 8, 24, 16),
      new THREE.MeshBasicMaterial({
        color: 0x1a1a2e,
        transparent: true,
        opacity: 0.56,
        wireframe: true,
      })
    );
    arena.rotation.x = -Math.PI / 2;
    scene.add(arena);

    const player = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.42, 2),
      new THREE.MeshStandardMaterial({
        color: 0xb083ff,
        emissive: 0x6d4ab6,
        emissiveIntensity: 0.9,
        roughness: 0.22,
      })
    );
    player.position.set(0, 0.45, 2.8);
    scene.add(player);

    const trailMaterial = new THREE.MeshBasicMaterial({ color: 0x2dd4ff, transparent: true, opacity: 0.18 });
    const trail = Array.from({ length: 16 }).map((_, index) => {
      const dot = new THREE.Mesh(new THREE.SphereGeometry(0.16 - index * 0.006, 12, 12), trailMaterial.clone());
      dot.position.copy(player.position);
      scene.add(dot);
      return dot;
    });

    const targetGeometry = new THREE.IcosahedronGeometry(0.28, 1);
    const targets = Array.from({ length: 16 }).map((_, index) => {
      const target = new THREE.Mesh(
        targetGeometry,
        new THREE.MeshStandardMaterial({
          color: index % 3 === 0 ? 0x9ee6bf : 0x2dd4ff,
          emissive: index % 3 === 0 ? 0x26634e : 0x0f7aa0,
          emissiveIntensity: 0.8,
          roughness: 0.4,
        })
      );
      target.position.set((Math.random() - 0.5) * 10.4, 0.35, (Math.random() - 0.5) * 6.4);
      target.userData = {
        active: true,
        drift: Math.random() * Math.PI * 2,
        speed: 0.006 + Math.random() * 0.006,
      };
      scene.add(target);
      return target;
    });

    const blockerGeometry = new THREE.SphereGeometry(0.34, 14, 14);
    const blockers = Array.from({ length: 9 }).map(() => {
      const blocker = new THREE.Mesh(
        blockerGeometry,
        new THREE.MeshStandardMaterial({
          color: 0xff5a7d,
          emissive: 0x7d1132,
          emissiveIntensity: 1,
          roughness: 0.45,
        })
      );
      blocker.position.set((Math.random() - 0.5) * 10.4, 0.35, (Math.random() - 0.5) * 6.4);
      blocker.userData = {
        drift: Math.random() * Math.PI * 2,
        speed: 0.004 + Math.random() * 0.005,
      };
      scene.add(blocker);
      return blocker;
    });

    scene.add(new THREE.AmbientLight(0xffffff, 0.42));
    const keyLight = new THREE.PointLight(0xb083ff, 7, 18);
    keyLight.position.set(1.5, 6, 4);
    scene.add(keyLight);
    const cyanLight = new THREE.PointLight(0x2dd4ff, 3.2, 14);
    cyanLight.position.set(-4, 3, -3);
    scene.add(cyanLight);

    const pointer = { x: 0, z: 2.8 };
    const keys = new Set();
    const handlePointer = (event) => {
      const rect = mount.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width - 0.5) * 11;
      pointer.z = ((event.clientY - rect.top) / rect.height - 0.5) * 7;
    };
    const handleKeyDown = (event) => keys.add(event.key.toLowerCase());
    const handleKeyUp = (event) => keys.delete(event.key.toLowerCase());
    mount.addEventListener('pointermove', handlePointer);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    const resize = () => {
      const { width, height } = mount.getBoundingClientRect();
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    resize();
    window.addEventListener('resize', resize);

    let raf = 0;
    let frame = 0;
    let score = 0;
    let impacts = 0;
    const start = performance.now();

    const resetTarget = (target) => {
      target.userData.active = true;
      target.visible = true;
      target.scale.setScalar(1);
      target.position.set((Math.random() - 0.5) * 10.4, 0.35, (Math.random() - 0.5) * 6.4);
    };

    const animate = () => {
      frame += 1;
      const elapsed = (performance.now() - start) / 1000;
      const keySpeed = 0.09;
      if (keys.has('arrowleft') || keys.has('a')) pointer.x -= keySpeed;
      if (keys.has('arrowright') || keys.has('d')) pointer.x += keySpeed;
      if (keys.has('arrowup') || keys.has('w')) pointer.z -= keySpeed;
      if (keys.has('arrowdown') || keys.has('s')) pointer.z += keySpeed;
      pointer.x = THREE.MathUtils.clamp(pointer.x, -5.4, 5.4);
      pointer.z = THREE.MathUtils.clamp(pointer.z, -3.4, 3.4);

      player.position.x += (pointer.x - player.position.x) * 0.08;
      player.position.z += (pointer.z - player.position.z) * 0.08;
      player.rotation.x += 0.035;
      player.rotation.y += 0.05;

      trail.forEach((dot, index) => {
        const leader = index === 0 ? player : trail[index - 1];
        dot.position.lerp(leader.position, 0.26);
        dot.material.opacity = 0.18 * (1 - index / trail.length);
      });

      targets.forEach((target) => {
        if (!target.userData.active) {
          if (Math.random() > 0.985) resetTarget(target);
          return;
        }
        target.userData.drift += target.userData.speed;
        target.position.y = 0.35 + Math.sin(frame * 0.035 + target.userData.drift) * 0.18;
        target.rotation.x += 0.02;
        target.rotation.y += 0.026;
        if (target.position.distanceTo(player.position) < 0.68) {
          score += 1;
          target.userData.active = false;
          target.visible = false;
        }
      });

      blockers.forEach((blocker) => {
        blocker.userData.drift += blocker.userData.speed;
        blocker.position.x += Math.sin(blocker.userData.drift) * 0.012;
        blocker.position.z += Math.cos(blocker.userData.drift * 0.8) * 0.012;
        blocker.position.x = THREE.MathUtils.clamp(blocker.position.x, -5.4, 5.4);
        blocker.position.z = THREE.MathUtils.clamp(blocker.position.z, -3.4, 3.4);
        blocker.rotation.y += 0.03;
        if (blocker.position.distanceTo(player.position) < 0.66) {
          impacts += 1;
          blocker.position.set((Math.random() - 0.5) * 10.4, 0.35, (Math.random() - 0.5) * 6.4);
        }
      });

      if (frame % 12 === 0) {
        onStats({
          score,
          impacts,
          purity: Math.max(0, Math.round(100 - impacts * 7 + score * 2)),
          time: Math.floor(elapsed),
        });
      }

      arena.rotation.z += 0.0008;
      renderer.render(scene, camera);
      raf = window.requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      mount.removeEventListener('pointermove', handlePointer);
      renderer.dispose();
      arena.geometry.dispose();
      arena.material.dispose();
      player.geometry.dispose();
      player.material.dispose();
      targetGeometry.dispose();
      blockerGeometry.dispose();
      trail.forEach((dot) => {
        dot.geometry.dispose();
        dot.material.dispose();
      });
      targets.forEach((target) => target.material.dispose());
      blockers.forEach((blocker) => blocker.material.dispose());
      mount.removeChild(renderer.domElement);
    };
  }, [onStats]);

  return <div ref={mountRef} className="game-canvas" aria-label="Playable Three.js biofilm breaker game" />;
};

const SplatProductCanvas = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 1.1, 8.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const texture = createSplatTexture();
    const positions = [];
    const colors = [];
    const colorA = new THREE.Color(0xb083ff);
    const colorB = new THREE.Color(0x2dd4ff);
    const colorC = new THREE.Color(0x9ee6bf);
    const addPoint = (x, y, z, color) => {
      positions.push(x, y, z);
      colors.push(color.r, color.g, color.b);
    };

    for (let i = 0; i < 3800; i += 1) {
      const band = Math.random();
      let radius = 0.82 + Math.random() * 0.2;
      let y = (Math.random() - 0.5) * 4.9;
      if (y > 1.55) radius *= 0.62;
      if (y > 2.05) radius *= 0.34;
      if (y < -1.9) radius *= 0.88;
      const theta = Math.random() * Math.PI * 2;
      const surfaceNoise = (Math.random() - 0.5) * 0.16;
      const x = Math.cos(theta) * (radius + surfaceNoise);
      const z = Math.sin(theta) * (radius * 0.42 + surfaceNoise);
      const color = band > 0.72 ? colorC : band > 0.38 ? colorA : colorB;
      addPoint(x, y, z, color);
    }

    for (let i = 0; i < 900; i += 1) {
      const t = i / 900;
      const theta = t * Math.PI * 12;
      const radius = 1.25 + Math.sin(t * Math.PI * 8) * 0.18;
      addPoint(
        Math.cos(theta) * radius,
        -1.55 + t * 3.45,
        Math.sin(theta) * radius * 0.36,
        i % 2 ? colorA : colorB
      );
    }

    for (let i = 0; i < 800; i += 1) {
      const x = (Math.random() - 0.5) * 4.8;
      const y = (Math.random() - 0.5) * 4.6;
      const z = -1.8 - Math.random() * 1.2;
      addPoint(x, y, z, Math.random() > 0.5 ? colorA : colorB);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    const material = new THREE.PointsMaterial({
      size: 0.105,
      map: texture,
      transparent: true,
      opacity: 0.86,
      vertexColors: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const cloud = new THREE.Points(geometry, material);
    scene.add(cloud);

    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(2.25, 0.012, 10, 180),
      new THREE.MeshBasicMaterial({ color: 0xb083ff, transparent: true, opacity: 0.55 })
    );
    ring.rotation.x = Math.PI / 2;
    scene.add(ring);

    const pointer = { x: 0, y: 0 };
    const handlePointer = (event) => {
      const rect = mount.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      pointer.y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    mount.addEventListener('pointermove', handlePointer);

    const resize = () => {
      const { width, height } = mount.getBoundingClientRect();
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    resize();
    window.addEventListener('resize', resize);

    let raf = 0;
    let frame = 0;
    const animate = () => {
      frame += 1;
      cloud.rotation.y += 0.003 + pointer.x * 0.001;
      cloud.rotation.x += (pointer.y * 0.18 - cloud.rotation.x) * 0.03;
      ring.rotation.z += 0.006;
      material.size = 0.09 + Math.sin(frame * 0.02) * 0.012;
      renderer.render(scene, camera);
      raf = window.requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      mount.removeEventListener('pointermove', handlePointer);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      texture.dispose();
      ring.geometry.dispose();
      ring.material.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="splat-canvas" aria-label="Gaussian splat inspired AgroWISS product point cloud" />;
};

export const AlternativeBiofilmBreakerPage = () => {
  const [stats, setStats] = useState({ score: 0, impacts: 0, purity: 100, time: 0 });

  return (
    <div className="min-h-screen bg-[#07020d] text-white">
      <Navbar />
      <main className="game-page">
        <section className="container mx-auto px-4 py-16">
          <Link to="/alternative" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-bold text-white/80 hover:border-primary-light hover:text-primary-light">
            <ArrowLeft size={16} />
            Back to Alternative
          </Link>
          <div className="mt-10 grid grid-cols-1 gap-8 xl:grid-cols-[0.72fr_1.28fr]">
            <div className="game-brief">
              <p className="font-bold uppercase tracking-wide text-primary-light">Playable Concept</p>
              <h1>Biofilm Breaker</h1>
              <p>
                An award-style interactive product game: steer the nanoWISS particle through a
                biofilm field, collect active carriers, and avoid red resistance nodes.
              </p>
              <div className="mt-8">
                <HiddenNav active="/alternative/biofilm-breaker" />
              </div>
              <div className="game-stats">
                <div><span>Carriers</span><strong>{stats.score}</strong></div>
                <div><span>Purity</span><strong>{stats.purity}%</strong></div>
                <div><span>Impacts</span><strong>{stats.impacts}</strong></div>
                <div><span>Time</span><strong>{stats.time}s</strong></div>
              </div>
            </div>
            <div className="game-shell">
              <BiofilmBreakerCanvas onStats={setStats} />
              <div className="game-instructions">
                <Gamepad2 size={18} />
                Move pointer or use WASD / arrows
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export const AlternativeSplatLabPage = () => (
  <div className="min-h-screen bg-[#050813] text-white">
    <Navbar />
    <main className="splat-page">
      <section className="container mx-auto grid min-h-[48rem] grid-cols-1 items-center gap-8 px-4 py-16 lg:grid-cols-[0.78fr_1.22fr]">
        <div>
          <Link to="/alternative" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-bold text-white/80 hover:border-primary-light hover:text-primary-light">
            <ArrowLeft size={16} />
            Back to Alternative
          </Link>
          <p className="mt-8 font-bold uppercase tracking-wide text-primary-light">Gaussian Splat Inspired</p>
          <h1 className="mt-4 text-4xl font-extrabold md:text-6xl">Splat Lab</h1>
          <p className="mt-6 max-w-xl text-lg text-white/72">
            A lightweight, client-side point-cloud scene inspired by Gaussian splatting. It turns
            AgroWISS-style product material into a luminous scanned object without shipping a heavy
            trained splat dataset.
          </p>
          <div className="mt-8">
            <HiddenNav active="/alternative/splat-lab" />
          </div>
          <div className="splat-notes">
            <span><ScanLine size={18} /> 5.5k translucent splats</span>
            <span><Sparkles size={18} /> Pointer-reactive scan</span>
            <span><Timer size={18} /> Static hosting friendly</span>
          </div>
        </div>
        <div className="splat-shell">
          <SplatProductCanvas />
          <img src={agrowissProduct} alt="AgroWISS product reference" className="splat-reference" />
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

const portalCards = [
  {
    label: 'Platform',
    image: deviceImage,
    style: { left: '5%', top: '7%' },
  },
  {
    label: 'AgroWISS',
    image: agrowissProduct,
    style: { right: '5%', top: '9%' },
  },
  {
    label: 'Team',
    image: agrowissTeam,
    style: { left: '6%', bottom: '7%' },
  },
  {
    label: 'Evidence',
    image: labImage,
    style: { right: '7%', bottom: '8%' },
  },
];

export const AlternativeImpactPortalPage = () => (
  <div className="min-h-screen bg-[#07020d] text-white">
    <Navbar />
    <main className="portal-page">
      <section className="container mx-auto px-4 py-16">
        <Link to="/alternative" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-bold text-white/80 hover:border-primary-light hover:text-primary-light">
          <ArrowLeft size={16} />
          Back to Alternative
        </Link>
        <div className="portal-hero">
          <div className="portal-copy">
            <p>Immersive Boardroom Concept</p>
            <h1>Impact Portal</h1>
            <span>
              A bolder investor-facing room where product, proof, team, and mission behave like
              orbiting evidence panels instead of ordinary website sections.
            </span>
            <HiddenNav active="/alternative/impact-portal" />
          </div>
          <div className="portal-stage">
            <div className="portal-ring portal-ring-a" />
            <div className="portal-ring portal-ring-b" />
            <div className="portal-core">
              <Trophy size={42} />
              <strong>nanoWISS</strong>
              <span>Deep-tech platform</span>
            </div>
            {portalCards.map((card) => (
              <article key={card.label} className="portal-card" style={card.style}>
                <img src={card.image} alt={card.label} />
                <strong>{card.label}</strong>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </div>
);
