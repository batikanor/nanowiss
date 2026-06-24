import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import {
  ArrowRight,
  Building2,
  FlaskConical,
  Gauge,
  Leaf,
  Mail,
  Microscope,
  Orbit,
  Play,
  ScanLine,
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
    <nav aria-label="nanoWISS site navigation">
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

const createSoftParticleTexture = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 96;
  canvas.height = 96;
  const ctx = canvas.getContext('2d');
  const gradient = ctx.createRadialGradient(48, 48, 0, 48, 48, 48);
  gradient.addColorStop(0, 'rgba(255,255,255,1)');
  gradient.addColorStop(0.28, 'rgba(255,255,255,.72)');
  gradient.addColorStop(0.62, 'rgba(255,255,255,.18)');
  gradient.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 96, 96);
  return new THREE.CanvasTexture(canvas);
};

const SplatGardenCanvas = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 1.4, 7.2);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);
    const spriteTexture = createSoftParticleTexture();
    const geometry = new THREE.BufferGeometry();
    const positions = [];
    const colors = [];
    const color = new THREE.Color();
    const count = 3600;
    for (let i = 0; i < count; i += 1) {
      const layer = i / count;
      const theta = i * 0.077 + Math.sin(i) * 0.7;
      const radius = 0.35 + layer * 2.75 + Math.sin(i * 0.13) * 0.18;
      const y = Math.sin(theta * 1.7) * 0.55 + (Math.random() - 0.5) * 1.9;
      const bottleColumn = i % 7 === 0;
      const x = bottleColumn ? (Math.random() - 0.5) * 0.75 : Math.cos(theta) * radius;
      const z = bottleColumn ? (Math.random() - 0.5) * 0.55 : Math.sin(theta) * radius * 0.52;
      positions.push(x, y, z);
      color.setHSL(bottleColumn ? 0.43 : 0.72 - layer * 0.22, 0.72, bottleColumn ? 0.58 : 0.48 + Math.random() * 0.22);
      colors.push(color.r, color.g, color.b);
    }
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    const material = new THREE.PointsMaterial({
      size: 0.085,
      map: spriteTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.84,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const points = new THREE.Points(geometry, material);
    group.add(points);

    const productTexture = new THREE.TextureLoader().load(agrowissProduct);
    const product = new THREE.Sprite(new THREE.SpriteMaterial({ map: productTexture, transparent: true, opacity: 0.82 }));
    product.scale.set(1.5, 1.5, 1);
    product.position.set(0, -0.05, 0.15);
    group.add(product);

    const ringMaterial = new THREE.MeshBasicMaterial({ color: 0x9ee6bf, transparent: true, opacity: 0.18 });
    const rings = [1.15, 1.85, 2.55].map((size, index) => {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(size, 0.008, 8, 180), ringMaterial.clone());
      ring.rotation.x = Math.PI / 2.8 + index * 0.12;
      group.add(ring);
      return ring;
    });

    scene.add(new THREE.AmbientLight(0xffffff, 0.62));
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
      group.rotation.y += 0.0028;
      points.rotation.z += 0.0015;
      product.material.opacity = 0.72 + Math.sin(Date.now() * 0.001) * 0.08;
      rings.forEach((ring, index) => {
        ring.rotation.z += 0.002 + index * 0.001;
      });
      renderer.render(scene, camera);
      raf = window.requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      productTexture.dispose();
      spriteTexture.dispose();
      geometry.dispose();
      material.dispose();
      rings.forEach((ring) => {
        ring.geometry.dispose();
        ring.material.dispose();
      });
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="award-visual-canvas" aria-label="nanoWISS material evidence field" />;
};

const NanoInstrumentCanvas = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(44, 1, 0.1, 100);
    camera.position.set(0, 2.2, 8.2);
    camera.lookAt(0, 0, 0);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const pointer = { x: 0, y: 0 };
    const group = new THREE.Group();
    scene.add(group);

    const glass = new THREE.MeshPhysicalMaterial({
      color: 0x9ee6ff,
      transparent: true,
      opacity: 0.26,
      roughness: 0.12,
      metalness: 0.05,
      transmission: 0.28,
      thickness: 0.8,
    });
    const purple = new THREE.MeshStandardMaterial({ color: 0x6d28d9, emissive: 0x39106e, roughness: 0.38, metalness: 0.32 });
    const graphite = new THREE.MeshStandardMaterial({ color: 0x222631, roughness: 0.28, metalness: 0.55 });
    const cyan = new THREE.MeshStandardMaterial({ color: 0x2dd4ff, emissive: 0x0a5a70, roughness: 0.25, metalness: 0.25 });

    const core = new THREE.Mesh(new THREE.IcosahedronGeometry(0.86, 2), glass);
    group.add(core);
    const device = new THREE.Mesh(new THREE.BoxGeometry(2.25, 0.78, 1.22), graphite);
    device.position.set(0, -1.18, 0);
    group.add(device);
    const stripe = new THREE.Mesh(new THREE.BoxGeometry(2.28, 0.18, 1.25), purple);
    stripe.position.set(0, -0.78, 0);
    group.add(stripe);

    const rails = [];
    for (let i = 0; i < 4; i += 1) {
      const rail = new THREE.Mesh(new THREE.TorusGeometry(1.65 + i * 0.42, 0.012, 10, 220), i % 2 ? purple.clone() : cyan.clone());
      rail.rotation.x = Math.PI / 2 + i * 0.22;
      rail.rotation.y = i * 0.55;
      group.add(rail);
      rails.push(rail);
    }
    const beads = [];
    for (let i = 0; i < 42; i += 1) {
      const bead = new THREE.Mesh(new THREE.SphereGeometry(0.045 + (i % 5) * 0.008, 12, 12), i % 3 ? cyan : purple);
      const angle = i * 0.72;
      bead.userData = { angle, radius: 1.5 + (i % 7) * 0.24, speed: 0.006 + (i % 6) * 0.001 };
      group.add(bead);
      beads.push(bead);
    }
    const floor = new THREE.GridHelper(8, 28, 0x2dd4ff, 0x4c1d95);
    floor.position.y = -1.68;
    floor.material.transparent = true;
    floor.material.opacity = 0.2;
    group.add(floor);

    const purpleLight = new THREE.PointLight(0xb083ff, 6, 16);
    purpleLight.position.set(2.5, 4, 4);
    scene.add(purpleLight);
    const cyanLight = new THREE.PointLight(0x2dd4ff, 4, 14);
    cyanLight.position.set(-3, 2.5, 3);
    scene.add(cyanLight);
    scene.add(new THREE.AmbientLight(0xffffff, 0.42));

    const resize = () => {
      const { width, height } = mount.getBoundingClientRect();
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    const move = (event) => {
      const rect = mount.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      pointer.y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    resize();
    window.addEventListener('resize', resize);
    mount.addEventListener('pointermove', move);
    let raf = 0;
    const animate = () => {
      group.rotation.y += 0.0025 + pointer.x * 0.001;
      group.rotation.x += (pointer.y * 0.18 - group.rotation.x) * 0.025;
      core.rotation.x += 0.006;
      core.rotation.y += 0.008;
      rails.forEach((rail, index) => {
        rail.rotation.z += 0.003 + index * 0.001;
      });
      beads.forEach((bead) => {
        bead.userData.angle += bead.userData.speed;
        bead.position.set(
          Math.cos(bead.userData.angle) * bead.userData.radius,
          Math.sin(bead.userData.angle * 1.4) * 0.62,
          Math.sin(bead.userData.angle) * bead.userData.radius * 0.48,
        );
      });
      renderer.render(scene, camera);
      raf = window.requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      mount.removeEventListener('pointermove', move);
      group.traverse((child) => {
        if (child.geometry) child.geometry.dispose();
        if (child.material) child.material.dispose();
      });
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="award-visual-canvas" aria-label="Interactive 3D nanoWISS instrument" />;
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

const PlatformRows = ({ mode = 'dark', title = 'One nanoparticle platform, multiple application pathways.' }) => (
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
    text="nanoWISS shown as an applied research district: synthesis, process pathways, evidence blocks, and collaboration routes in one company story."
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
    text="A nanoWISS agricultural biotechnology homepage where crop protection, chitosan carriers, and sustainable field systems are organized as living data rings."
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
    text="A calm nanoWISS medical-tech homepage where airflow, lung geometry, particles, and biofilm interfaces are presented as a controlled platform story."
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
    text="A team-led nanoWISS homepage where expertise, research decisions, and venture milestones form the primary story."
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
    text="A nanoWISS product homepage staged as a live demo: objects, technical captions, and business-ready proof."
    visual={<div className="product-stage"><img src={deviceImage} alt="nanoWISS production system" /><img src={agrowissProduct} alt="AgroWISS product" /><img src={productImage} alt="Application product" /></div>}
  >
    <PlatformRows title="A product showroom with technical captions." />
    <ApplicationsPanel title="Objects, specs, and use contexts staged for inspection." items={[
      ['Production System', 'Scalable system design for nanoparticle development.'],
      ['AgroWISS Bottle', 'Agricultural biotechnology shown as an inspectable product object.'],
      ['Application Pipeline', 'Health, disinfection, and surface pathways framed carefully.'],
    ]} />
    <EvidenceGrid />
    <TeamStrip />
    <ContactBand title="Request a product discussion" />
  </StandaloneShell>
);

export const SplatGardenSite = () => (
  <div id="top" className="award-site award-splat-garden">
    <StandaloneNav />
    <main>
      <section className="award-hero">
        <div className="award-hero-copy">
          <p>Material Evidence System</p>
          <h1>A living product scan for nanoWISS.</h1>
          <span>
            nanoWISS is presented through material behavior, product evidence, and application
            pathways that orbit one inspectable company story.
          </span>
          <div className="standalone-actions">
            <a href="#platform">Enter scan <ScanLine size={18} /></a>
            <a href="mailto:info@nanowiss.com">Contact <Mail size={18} /></a>
          </div>
        </div>
        <div className="award-hero-stage">
          <SplatGardenCanvas />
          <div className="award-stage-caption">
            <strong>3,600 carrier signals</strong>
            <span>A dense material field that keeps the focus on nanoWISS proof and applications.</span>
          </div>
        </div>
      </section>

      <section id="platform" className="award-section award-scan-grid">
        <p className="standalone-kicker">Platform</p>
        <h2>The product is treated like a spatial dataset.</h2>
        <div>
          {[
            ['Carrier field', 'Chitosan carrier systems shown as a live material cloud.'],
            ['Release behavior', 'Slow-release logic explained through movement, density, and orbit.'],
            ['Evidence layer', 'Awards, partners, and incorporation proof become part of the scan.'],
          ].map(([title, text]) => (
            <article key={title}>
              <ScanLine size={26} />
              <strong>{title}</strong>
              <span>{text}</span>
            </article>
          ))}
        </div>
      </section>

      <section id="applications" className="award-section award-editorial-band">
        <div>
          <p className="standalone-kicker">Applications</p>
          <h2>Designed as a flagship nanoWISS product story, not a brochure.</h2>
        </div>
        <div>
          <article>
            <span>01</span>
            <strong>Agricultural biotechnology</strong>
            <p>AgroWISS is presented as one application branch of the nanoWISS platform.</p>
          </article>
          <article>
            <span>02</span>
            <strong>Material translation</strong>
            <p>nanoWISS remains visible as the platform behind nanoparticle synthesis and scale-up.</p>
          </article>
        </div>
      </section>

      <EvidenceGrid />
      <TeamStrip />
      <ContactBand title="Discuss a spatial product story" />
    </main>
    <SimpleFooter />
  </div>
);

export const NanoInstrumentSite = () => (
  <div id="top" className="award-site award-nano-instrument">
    <StandaloneNav />
    <main>
      <section className="award-hero award-instrument-hero">
        <div className="award-hero-copy">
          <p>nanoWISS Systems</p>
          <h1>nanoWISS turns particle science into usable systems.</h1>
          <span>
            nanoWISS brings together synthesis discipline, scale-up thinking, application
            pathways, and the team behind the platform.
          </span>
          <div className="standalone-actions">
            <a href="#platform">Inspect system <Gauge size={18} /></a>
            <a href="mailto:info@nanowiss.com">Contact <Mail size={18} /></a>
          </div>
        </div>
        <div className="award-hero-stage">
          <NanoInstrumentCanvas />
          <div className="award-stage-caption">
            <strong>Material decision center</strong>
            <span>Particle behavior, process context, and application fit arranged as one nanoWISS system.</span>
          </div>
        </div>
      </section>

      <section id="platform" className="award-section award-console-grid">
        <p className="standalone-kicker">Platform</p>
        <h2>A decision map for nanoparticle systems.</h2>
        <div>
          {[
            ['Synthesis core', 'A central reactor metaphor for formulation, particle behavior, and iteration.', Microscope],
            ['Scale-up console', 'Process context makes production-system thinking visible.', Gauge],
            ['Application orbit', 'Health, biofilm, and AgroWISS applications move around the same scientific core.', Orbit],
          ].map(([title, text, Icon]) => (
            <article key={title}>
              <Icon size={28} />
              <strong>{title}</strong>
              <span>{text}</span>
            </article>
          ))}
        </div>
      </section>

      <section id="applications" className="award-section award-proof-theater">
        <div>
          <p className="standalone-kicker">Applications</p>
          <h2>Applications are connected to company proof.</h2>
        </div>
        <div className="award-proof-cards">
          {[
            ['Health interfaces', labImage, 'Biofilm and respiratory research framed through careful validation.'],
            ['Production systems', deviceImage, 'The nanoWISS production device becomes tangible product proof.'],
            ['AgroWISS branch', agrowissProduct, 'Agricultural biotechnology sits as a productized application branch.'],
          ].map(([title, image, text]) => (
            <article key={title}>
              <img src={image} alt={title} />
              <strong>{title}</strong>
              <span>{text}</span>
            </article>
          ))}
        </div>
      </section>

      <EvidenceGrid />
      <TeamStrip />
      <ContactBand title="Discuss a nanoWISS collaboration" />
    </main>
    <SimpleFooter />
  </div>
);

export const SignalObservatorySite = () => (
  <StandaloneShell
    variant="signal-observatory"
    eyebrow="Signal Observatory"
    title="Reading the signals hidden at particle scale."
    text="A waveform observatory homepage for nanoWISS, built around sensing, interpreting, and validating material behavior."
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
