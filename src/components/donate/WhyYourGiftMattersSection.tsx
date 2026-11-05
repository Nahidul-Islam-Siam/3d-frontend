import { useRef, useEffect, useState, useCallback } from 'react';
import * as THREE from 'three';
import { motion, useScroll, AnimatePresence } from 'framer-motion';
import coinHeadsImg from '@/assets/donate/coin-heads-final.png';
import coinHeadsBump from '@/assets/donate/coin-heads-bump.png';
import coinTailsImg from '@/assets/donate/coin-tails-final.png';
import coinTailsBump from '@/assets/donate/coin-tails-bump.png';
import story1Img from '@/assets/donate/story-1-living-room.png';
import story2Img from '@/assets/donate/story-2-woodworking.png';
import story3Img from '@/assets/donate/story-3-robotics.png';
import { Sparkles, Hand, RotateCw, Volume2, VolumeX } from 'lucide-react';

interface StoryItem {
  id: number;
  title: string;
  narrative: string;
  image: string;
  alt: string;
  side: 'heads' | 'edge' | 'tails';
}

const stories: StoryItem[] = [
  {
    id: 1,
    title: 'Creating spaces where people feel welcomed and seen.',
    narrative:
      'Isolation is the quietest crisis of our neighborhoods. Your gifts sustain open, unpoliced living rooms where unhoused neighbors, single parents, and young creatives gather without judgment or prerequisites.',
    image: story1Img,
    alt: 'Neighbors gathering warmly in community living room',
    side: 'heads',
  },
  {
    id: 2,
    title: 'Coming alongside people when they need someone to believe in them.',
    narrative:
      'Mentorship isn’t a curriculum; it’s consistency. When someone steps forward to rebuild their life, our mentors walk shoulder-to-shoulder with them through craft, trades, and personal healing.',
    image: story2Img,
    alt: 'Master craftsman mentoring an apprentice in woodworking studio',
    side: 'edge',
  },
  {
    id: 3,
    title: 'Helping make the next chapter possible.',
    narrative:
      'Tools, apprenticeships, studio time, and licensing funds. When a community member determines their pathway forward, your gift ensures that poverty of capital does not extinguish courage.',
    image: story3Img,
    alt: 'Youth students building robotics in hands-on STEM laboratory',
    side: 'tails',
  },
];

export default function WhyYourGiftMattersSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasMountRef = useRef<HTMLDivElement | null>(null);

  const [activeStoryIndex, setActiveStoryIndex] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isFlipping, setIsFlipping] = useState(false);

  const triggerFlipRef = useRef<() => void>(() => {});
  const scrubRotYRef = useRef(0);

  // Scroll Progress across 300vh
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Map scroll progress to active story index
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      if (latest < 0.35) {
        setActiveStoryIndex(0);
      } else if (latest < 0.70) {
        setActiveStoryIndex(1);
      } else {
        setActiveStoryIndex(2);
      }
      // Scrub coin rotation with scroll (Oryzo.ai scroll scrubbing)
      scrubRotYRef.current = latest * Math.PI * 3;
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  // Web Audio clink
  const playCoinSound = useCallback(() => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      if (ctx.state === 'suspended') ctx.resume();

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(2800, now);
      osc.frequency.exponentialRampToValueAtTime(1400, now + 0.45);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.6);
    } catch {
      // Audio not permitted yet
    }
  }, [soundEnabled]);

  // ─── THREE.JS 3D COIN ENGINE (Oryzo.ai Scrubbed Coin) ───
  useEffect(() => {
    const mount = canvasMountRef.current;
    if (!mount) return;

    const width = mount.clientWidth || 360;
    const height = mount.clientHeight || 360;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.2);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.4;
    mount.appendChild(renderer.domElement);

    // Milled Reeded Edge Texture
    const createReededEdgeTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#b3823f';
        ctx.fillRect(0, 0, 1024, 64);
        for (let x = 0; x < 1024; x += 4) {
          ctx.fillStyle = '#4a2c08';
          ctx.fillRect(x, 0, 1.5, 64);
          ctx.fillStyle = '#fed789';
          ctx.fillRect(x + 1.5, 0, 1.5, 64);
        }
      }
      const tex = new THREE.CanvasTexture(canvas);
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.ClampToEdgeWrapping;
      tex.repeat.set(16, 1);
      return tex;
    };

    // Soft Shadow
    const createShadowTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const grad = ctx.createRadialGradient(256, 256, 30, 256, 256, 235);
        grad.addColorStop(0, 'rgba(0, 0, 0, 0.65)');
        grad.addColorStop(0.35, 'rgba(0, 0, 0, 0.40)');
        grad.addColorStop(0.7, 'rgba(0, 0, 0, 0.12)');
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 512, 512);
      }
      return new THREE.CanvasTexture(canvas);
    };

    const shadowTex = createShadowTexture();
    const shadowGeo = new THREE.PlaneGeometry(5.8, 5.8);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      opacity: 0.70,
      depthWrite: false,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -2.25;
    scene.add(shadowMesh);

    // Coin Mesh (Radius = 1.8, Thickness = 0.22)
    const coinGeometry = new THREE.CylinderGeometry(1.8, 1.8, 0.22, 128, 1, false);

    const textureLoader = new THREE.TextureLoader();

    const reededTex = createReededEdgeTexture();
    const edgeMaterial = new THREE.MeshStandardMaterial({
      color: 0xd8a252,
      roughness: 0.28,
      metalness: 0.94,
      map: reededTex,
      bumpMap: reededTex,
      bumpScale: 0.04,
    });

    // Heads Face
    const headsTex = textureLoader.load(coinHeadsImg);
    headsTex.colorSpace = THREE.SRGBColorSpace;
    headsTex.anisotropy = 16;
    headsTex.center.set(0.5, 0.5);
    headsTex.rotation = Math.PI / 2;

    const headsBump = textureLoader.load(coinHeadsBump);
    headsBump.anisotropy = 16;
    headsBump.center.set(0.5, 0.5);
    headsBump.rotation = Math.PI / 2;

    const headsMaterial = new THREE.MeshStandardMaterial({
      color: 0xdfa058,
      map: headsTex,
      bumpMap: headsBump,
      bumpScale: 0.075,
      roughness: 0.24,
      metalness: 0.92,
    });

    // Tails Face
    const tailsTex = textureLoader.load(coinTailsImg);
    tailsTex.colorSpace = THREE.SRGBColorSpace;
    tailsTex.anisotropy = 16;
    tailsTex.center.set(0.5, 0.5);
    tailsTex.rotation = -Math.PI / 2;

    const tailsBump = textureLoader.load(coinTailsBump);
    tailsBump.anisotropy = 16;
    tailsBump.center.set(0.5, 0.5);
    tailsBump.rotation = -Math.PI / 2;

    const tailsMaterial = new THREE.MeshStandardMaterial({
      color: 0xdfa058,
      map: tailsTex,
      bumpMap: tailsBump,
      bumpScale: 0.075,
      roughness: 0.24,
      metalness: 0.92,
    });

    const materials = [edgeMaterial, headsMaterial, tailsMaterial];
    const coinMesh = new THREE.Mesh(coinGeometry, materials);

    const defaultRotX = 0.40;
    const defaultRotY = -0.50;
    coinMesh.rotation.set(defaultRotX, defaultRotY, 0.1);
    scene.add(coinMesh);

    // Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xfff6ec, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfffaed, 4.0);
    keyLight.position.set(4, 7, 6);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xf97316, 4.8);
    rimLight.position.set(-6, -2, -5);
    scene.add(rimLight);

    const fillLight = new THREE.DirectionalLight(0xffdfbe, 1.8);
    fillLight.position.set(2, -5, 4);
    scene.add(fillLight);

    const gleamLight = new THREE.PointLight(0xffffff, 3.5, 14);
    gleamLight.position.set(0, 0, 5);
    scene.add(gleamLight);

    // Pointer Interaction & Physics
    let isDragging = false;
    let dragStartX = 0;
    let dragStartY = 0;
    let dragRotY = defaultRotY;
    let dragRotX = defaultRotX;
    let mouseTargetX = 0;
    let mouseTargetY = 0;
    let mouseCurrentX = 0;
    let mouseCurrentY = 0;

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      dragStartX = e.clientX;
      dragStartY = e.clientY;
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = mount.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      gleamLight.position.x = x * 4;
      gleamLight.position.y = y * 4;

      if (isDragging) {
        const deltaX = (e.clientX - dragStartX) * 0.01;
        const deltaY = (e.clientY - dragStartY) * 0.01;
        dragRotY += deltaX;
        dragRotX += deltaY;
        dragStartX = e.clientX;
        dragStartY = e.clientY;
      } else {
        mouseTargetX = x * 0.35;
        mouseTargetY = y * 0.25;
      }
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerup', onPointerUp);
    mount.addEventListener('pointerdown', onPointerDown);

    // Flip physics
    let flipping = false;
    let flipStartTime = 0;
    const flipDuration = 1.3;

    const flipCoin = () => {
      if (flipping) return;
      flipping = true;
      setIsFlipping(true);
      flipStartTime = performance.now();
      playCoinSound();
    };

    triggerFlipRef.current = flipCoin;

    // Render loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      mouseCurrentX += (mouseTargetX - mouseCurrentX) * 0.08;
      mouseCurrentY += (mouseTargetY - mouseCurrentY) * 0.08;

      if (!flipping) {
        const idleHover = Math.sin(elapsedTime * 1.6) * 0.06;
        coinMesh.position.y = idleHover;
        shadowMesh.scale.setScalar(1 - idleHover * 0.5);

        if (isDragging) {
          coinMesh.rotation.y = dragRotY;
          coinMesh.rotation.x = dragRotX;
        } else {
          // Combination of scroll scrubbing + ambient drift + cursor tilt
          const targetY = defaultRotY + scrubRotYRef.current + mouseCurrentX;
          coinMesh.rotation.y += (targetY - coinMesh.rotation.y) * 0.1;
          coinMesh.rotation.x = defaultRotX - mouseCurrentY;
          coinMesh.rotation.z = mouseCurrentX * 0.15;
        }
      } else {
        const now = performance.now();
        const progress = (now - flipStartTime) / (flipDuration * 1000);

        if (progress < 1) {
          const maxHeight = 3.0;
          const arc = 4 * maxHeight * progress * (1 - progress);
          coinMesh.position.y = arc;
          coinMesh.rotation.x = dragRotX + progress * Math.PI * 8;
          coinMesh.rotation.y = dragRotY + progress * Math.PI * 4;
        } else {
          flipping = false;
          setIsFlipping(false);
          coinMesh.position.y = 0;
          dragRotX = defaultRotX;
          dragRotY = dragRotY % (Math.PI * 2);
          playCoinSound();
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!mount) return;
      const newW = mount.clientWidth;
      const newH = mount.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('resize', handleResize);
      mount.removeEventListener('pointerdown', onPointerDown);
      cancelAnimationFrame(animationFrameId);
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
      coinGeometry.dispose();
      materials.forEach((m) => m.dispose());
      shadowGeo.dispose();
      shadowMat.dispose();
      headsTex.dispose();
      headsBump.dispose();
      tailsTex.dispose();
      tailsBump.dispose();
    };
  }, [playCoinSound]);

  const currentStory = stories[activeStoryIndex];

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[300vh] bg-[#08070B] text-white"
    >
      {/* ─── STICKY VIEWPORT CONTAINER (Locked in screen during 300vh scroll) ─── */}
      <div className="sticky top-0 w-full h-screen flex flex-col justify-between overflow-hidden px-6 sm:px-10 lg:px-16 xl:px-24 py-10 lg:py-14 select-none">
        
        {/* Background Ambient Spotlights */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(249, 115, 22, 0.16) 0%, rgba(217, 119, 6, 0.04) 40%, transparent 75%)',
          }}
          aria-hidden="true"
        />

        {/* ─── 1. TOP PINNED HEADER (Figma Frame matching) ─── */}
        <div className="relative z-20 w-full max-w-7xl mx-auto flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div>
            <h2
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight uppercase"
            >
              WHY YOUR GIFT <br />
              MATTERS
            </h2>
          </div>

          <div className="max-w-md md:text-right">
            <p className="text-stone-300 text-xs sm:text-sm lg:text-[15px] font-sans leading-relaxed">
              Your generosity helps create moments of hope, belonging, and new beginnings. We refuse to commodify human struggle into abstract vanity charts. Here is what actually happens.
            </p>
          </div>
        </div>

        {/* ─── 2. SCENIC DIVIDER TRACK WITH EMBEDDED 3D COIN ─── */}
        <div className="relative z-20 w-full max-w-7xl mx-auto my-auto py-4">
          
          {/* Horizontal Line behind Coin */}
          <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />

          {/* 3-Column Center Stage: Story Text (Left) + 3D Coin (Center) + Story Card (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Dynamic Story Narrative */}
            <div className="lg:col-span-5 relative min-h-[180px] sm:min-h-[220px] flex items-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStory.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="space-y-3.5 text-left"
                >
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/25 text-[#F97316] text-[11px] font-sans font-bold uppercase tracking-wider">
                    <Sparkles className="w-3 h-3 text-[#F97316]" />
                    <span>Impact Story 0{currentStory.id}</span>
                  </div>

                  <h3
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight"
                  >
                    {currentStory.title}
                  </h3>

                  <p className="text-stone-300 text-xs sm:text-sm lg:text-[15px] font-sans leading-relaxed">
                    {currentStory.narrative}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Center: The Interactive 3D Coin (Scrubbed with scroll) */}
            <div className="lg:col-span-3 flex flex-col items-center justify-center relative">
              
              {/* Radial Amber Halo behind Coin */}
              <div
                className="absolute inset-0 w-[280px] h-[280px] m-auto rounded-full pointer-events-none"
                style={{
                  background:
                    'radial-gradient(circle, rgba(249, 115, 22, 0.35) 0%, rgba(249, 115, 22, 0.08) 50%, transparent 75%)',
                  filter: 'blur(30px)',
                }}
                aria-hidden="true"
              />

              {/* Three.js Canvas */}
              <div
                ref={canvasMountRef}
                onClick={() => triggerFlipRef.current()}
                className="w-[280px] sm:w-[320px] lg:w-[360px] aspect-square cursor-grab active:cursor-grabbing touch-none relative z-10"
                title="Scroll to rotate coin, click to toss, or drag 360°"
              />

              {/* Interactive Micro-Cues */}
              <div className="flex items-center gap-2 mt-2 relative z-20">
                <button
                  type="button"
                  onClick={() => triggerFlipRef.current()}
                  disabled={isFlipping}
                  className="p-2 rounded-full bg-white/10 hover:bg-[#F97316] text-white transition-all cursor-pointer border border-white/15"
                  title="Toss Coin"
                >
                  <RotateCw className={`w-3.5 h-3.5 ${isFlipping ? 'animate-spin' : ''}`} />
                </button>

                <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-stone-300 text-[11px] font-sans flex items-center gap-1.5">
                  <Hand className="w-3 h-3 text-[#F97316]" />
                  <span>Scroll or drag 360°</span>
                </div>

                <button
                  type="button"
                  onClick={() => setSoundEnabled((prev) => !prev)}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer border border-white/15"
                  title={soundEnabled ? 'Mute' : 'Unmute'}
                >
                  {soundEnabled ? (
                    <Volume2 className="w-3.5 h-3.5 text-[#F97316]" />
                  ) : (
                    <VolumeX className="w-3.5 h-3.5 text-stone-400" />
                  )}
                </button>
              </div>

            </div>

            {/* Right: Dynamic Story Image Card */}
            <div className="lg:col-span-4 flex items-center justify-center lg:justify-end">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStory.id}
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="relative w-full max-w-[380px] aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-black/60"
                >
                  <img
                    src={currentStory.image}
                    alt={currentStory.alt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                </motion.div>
              </AnimatePresence>
            </div>

          </div>

        </div>

        {/* ─── 3. BOTTOM PROGRESS INDICATOR DOCK ─── */}
        <div className="relative z-20 w-full max-w-7xl mx-auto flex items-center justify-between border-t border-white/10 pt-4 text-xs font-sans text-stone-400">
          <div className="flex items-center gap-2">
            <span className="text-[#F97316] font-bold uppercase tracking-wider text-[11px]">
              Scroll Journey:
            </span>
            <span>Stage 0{activeStoryIndex + 1} of 03</span>
          </div>

          {/* Stepper Pills */}
          <div className="flex items-center gap-2">
            {stories.map((s, idx) => (
              <div
                key={s.id}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeStoryIndex === idx
                    ? 'w-8 bg-[#F97316]'
                    : 'w-2 bg-white/20'
                }`}
              />
            ))}
          </div>

          <div className="text-[11px] text-stone-400 uppercase tracking-widest hidden sm:inline">
            A single coin creates an enduring ripple
          </div>
        </div>

      </div>
    </div>
  );
}
