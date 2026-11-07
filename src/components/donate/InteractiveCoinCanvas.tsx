import { useRef, useEffect, useState, useCallback } from 'react';
import * as THREE from 'three';
import coinHeadsImg from '@/assets/donate/coin-heads-final.png';
import coinHeadsBump from '@/assets/donate/coin-heads-bump.png';
import coinTailsImg from '@/assets/donate/coin-tails-final.png';
import coinTailsBump from '@/assets/donate/coin-tails-bump.png';
import { RotateCw, Sparkles, Hand, Volume2, VolumeX, Eye } from 'lucide-react';

interface InteractiveCoinCanvasProps {
  className?: string;
  onFlipEnd?: (side: 'heads' | 'tails') => void;
}

export default function InteractiveCoinCanvas({
  className = '',
  onFlipEnd,
}: InteractiveCoinCanvasProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [isFlipping, setIsFlipping] = useState(false);
  const [currentSide, setCurrentSide] = useState<'heads' | 'tails'>('heads');
  const [flipCount, setFlipCount] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const flipActionRef = useRef<() => void>(() => {});
  const showSideRef = useRef<(side: 'heads' | 'tails') => void>(() => {});

  // Web Audio synthetic realistic coin ring clink
  const playCoinSound = useCallback(() => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      if (ctx.state === 'suspended') ctx.resume();

      const now = ctx.currentTime;
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(2800, now);
      osc1.frequency.exponentialRampToValueAtTime(1600, now + 0.5);

      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(5600, now);
      osc2.frequency.exponentialRampToValueAtTime(3200, now + 0.35);

      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.65);
      osc2.stop(now + 0.65);
      osc2.onended = () => { void ctx.close(); };
    } catch {
      // Audio not permitted yet
    }
  }, [soundEnabled]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // ─── 1. THREE.JS SCENE SETUP ───
    const width = mount.clientWidth || 500;
    const height = mount.clientHeight || 500;

    const scene = new THREE.Scene();

    // Balanced perspective camera: coin fills ~60% of viewport, leaving room for 3D depth & shadow
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    mount.appendChild(renderer.domElement);

    // ─── 2. REEDED EDGE TEXTURE (Milled metallic ridges) ───
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

    // ─── 3. SOFT CONTACT SHADOW (Velvety floating shadow) ───
    const createShadowTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const grad = ctx.createRadialGradient(256, 256, 30, 256, 256, 235);
        grad.addColorStop(0, 'rgba(0, 0, 0, 0.60)');
        grad.addColorStop(0.3, 'rgba(0, 0, 0, 0.38)');
        grad.addColorStop(0.65, 'rgba(0, 0, 0, 0.12)');
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 512, 512);
      }
      return new THREE.CanvasTexture(canvas);
    };

    const shadowTex = createShadowTexture();
    const shadowGeo = new THREE.PlaneGeometry(6.2, 6.2);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      opacity: 0.70,
      depthWrite: false,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -2.35;
    scene.add(shadowMesh);

    // ─── 4. COIN GEOMETRY & PBR MATERIALS ───
    // Diameter = 3.8, Thickness = 0.24 (Prominent 3D thickness so bevel & reeded rim are unmistakable!)
    const coinGeometry = new THREE.CylinderGeometry(1.9, 1.9, 0.24, 128, 1, false);

    const textureLoader = new THREE.TextureLoader();

    // Side Rim Material
    const reededTex = createReededEdgeTexture();
    const edgeMaterial = new THREE.MeshStandardMaterial({
      color: 0xd8a252,
      roughness: 0.28,
      metalness: 0.94,
      map: reededTex,
      bumpMap: reededTex,
      bumpScale: 0.04,
    });

    // Top Cap: HEADS SIDE (President John F. Kennedy • LIBERTY • 2015)
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
      color: 0xdfa058, // Warm lustrous mint gold / bronze
      map: headsTex,
      bumpMap: headsBump,
      bumpScale: 0.075,
      roughness: 0.24,
      metalness: 0.92,
    });

    // Bottom Cap: TAILS SIDE (Presidential Seal • Eagle • HALF DOLLAR)
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
      color: 0xdfa058, // Matching warm lustrous metal
      map: tailsTex,
      bumpMap: tailsBump,
      bumpScale: 0.075,
      roughness: 0.24,
      metalness: 0.92,
    });

    // Cylinder materials: [0: side, 1: top (Heads), 2: bottom (Tails)]
    const materials = [edgeMaterial, headsMaterial, tailsMaterial];
    const coinMesh = new THREE.Mesh(coinGeometry, materials);

    // Initial dramatic 3D perspective angle (clearly exposes front face, thickness, and rim bevel)
    const defaultRotX = 0.42; // Tilted back so top face is facing viewer at 3D angle
    const defaultRotY = -0.55; // Turned sideways so side thickness & reeded edge are prominent!
    const defaultRotZ = 0.12;

    coinMesh.rotation.set(defaultRotX, defaultRotY, defaultRotZ);
    scene.add(coinMesh);

    // ─── 5. STUDIO LIGHTING RIG (Oryzo.ai Cinematic Model) ───
    const ambientLight = new THREE.AmbientLight(0xfff6ec, 1.4);
    scene.add(ambientLight);

    // Main Key Spotlight (Picks out relief of the portrait and eagle)
    const keyLight = new THREE.DirectionalLight(0xfffaed, 4.0);
    keyLight.position.set(4, 7, 6);
    scene.add(keyLight);

    // Searing Golden Rim Light (Ignites the reeded edge ridges)
    const rimLight = new THREE.DirectionalLight(0xf97316, 4.8);
    rimLight.position.set(-6, -2, -5);
    scene.add(rimLight);

    // Soft Upward Fill Light
    const fillLight = new THREE.DirectionalLight(0xffdfbe, 1.8);
    fillLight.position.set(2, -5, 4);
    scene.add(fillLight);

    // Interactive Specular Cursor Gleam
    const gleamLight = new THREE.PointLight(0xffffff, 3.5, 15);
    gleamLight.position.set(0, 0, 5);
    scene.add(gleamLight);

    // ─── 6. DRAG & MOUSE TILT PHYSICS ───
    let mouseTargetX = 0;
    let mouseTargetY = 0;
    let mouseCurrentX = 0;
    let mouseCurrentY = 0;

    let isDragging = false;
    let dragStartX = 0;
    let dragStartY = 0;
    let dragRotY = defaultRotY;
    let dragRotX = defaultRotX;

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      dragStartX = e.clientX;
      dragStartY = e.clientY;
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = mount.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      gleamLight.position.x = x * 4.0;
      gleamLight.position.y = y * 4.0;

      if (isDragging) {
        const deltaX = (e.clientX - dragStartX) * 0.01;
        const deltaY = (e.clientY - dragStartY) * 0.01;
        dragRotY += deltaX;
        dragRotX += deltaY;
        dragStartX = e.clientX;
        dragStartY = e.clientY;
      } else {
        mouseTargetX = x * 0.45;
        mouseTargetY = y * 0.35;
      }
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerup', onPointerUp);
    mount.addEventListener('pointerdown', onPointerDown);

    // ─── 7. INTERACTIVE COIN TOSS & SIDE SWITCHING PHYSICS ───
    let flipping = false;
    let flipStartTime = 0;
    const flipDuration = 1.35;
    let targetSideIsHeads = true;

    const flipCoin = () => {
      if (flipping) return;
      flipping = true;
      setIsFlipping(true);
      flipStartTime = performance.now();
      // Decide landing side randomly
      targetSideIsHeads = Math.random() > 0.5;
      setFlipCount((prev) => prev + 1);
      playCoinSound();
    };

    const showSide = (side: 'heads' | 'tails') => {
      targetSideIsHeads = side === 'heads';
      if (side === 'heads') {
        dragRotX = defaultRotX;
        dragRotY = defaultRotY;
        setCurrentSide('heads');
      } else {
        dragRotX = defaultRotX + Math.PI;
        dragRotY = defaultRotY;
        setCurrentSide('tails');
      }
    };

    flipActionRef.current = flipCoin;
    showSideRef.current = showSide;

    // ─── 8. ANIMATION RENDER LOOP ───
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Inertia smoothing
      mouseCurrentX += (mouseTargetX - mouseCurrentX) * 0.07;
      mouseCurrentY += (mouseTargetY - mouseCurrentY) * 0.07;

      if (!flipping) {
        // Idle gentle weightless floating levitation
        const idleHover = Math.sin(elapsedTime * 1.5) * 0.07;
        coinMesh.position.y = idleHover;
        shadowMesh.scale.setScalar(1 - idleHover * 0.55);
        shadowMat.opacity = 0.70 - idleHover * 0.14;

        if (isDragging) {
          coinMesh.rotation.y = dragRotY;
          coinMesh.rotation.x = dragRotX;
        } else {
          // Slow continuous ambient turn + responsive mouse tilt
          dragRotY += 0.005;
          coinMesh.rotation.y = dragRotY + mouseCurrentX;
          coinMesh.rotation.x = dragRotX - mouseCurrentY;
          coinMesh.rotation.z = defaultRotZ + mouseCurrentX * 0.2;
        }

        // Detect which side is facing camera based on normal
        const normalZ = Math.cos(coinMesh.rotation.x);
        setCurrentSide(normalZ > 0 ? 'heads' : 'tails');
      } else {
        // Physics parabolic arc toss
        const now = performance.now();
        const progress = (now - flipStartTime) / (flipDuration * 1000);

        if (progress < 1) {
          const maxHeight = 3.2;
          const arc = 4 * maxHeight * progress * (1 - progress);
          coinMesh.position.y = arc;

          // Multi-axis high-speed spin
          const totalFlips = targetSideIsHeads ? 6 : 7;
          coinMesh.rotation.x = dragRotX + progress * Math.PI * totalFlips;
          coinMesh.rotation.y = dragRotY + progress * Math.PI * 3;
          coinMesh.rotation.z = Math.sin(progress * Math.PI * 4) * 0.35;

          shadowMesh.scale.setScalar(Math.max(0.35, 1 - arc * 0.22));
          shadowMat.opacity = Math.max(0.12, 0.70 - arc * 0.16);
        } else {
          // Settling
          flipping = false;
          setIsFlipping(false);
          coinMesh.position.y = 0;
          dragRotX = targetSideIsHeads ? defaultRotX : defaultRotX + Math.PI;
          dragRotY = defaultRotY;
          shadowMesh.scale.setScalar(1);
          shadowMat.opacity = 0.70;
          playCoinSound();
          const finalSide = targetSideIsHeads ? 'heads' : 'tails';
          setCurrentSide(finalSide);
          if (onFlipEnd) onFlipEnd(finalSide);
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // ─── 9. RESIZE LISTENER ───
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
      reededTex.dispose();
      shadowTex.dispose();
    };
  }, [onFlipEnd, playCoinSound]);

  return (
    <div className={`relative flex flex-col items-center justify-center select-none w-full max-w-4xl mx-auto ${className}`}>
      
      {/* ─── 3D Three.js WebGL Canvas (Constrained height so it never cuts off or overflows!) ─── */}
      <div
        ref={mountRef}
        onClick={() => flipActionRef.current()}
        className="w-full h-[360px] sm:h-[440px] md:h-[500px] max-h-[58vh] cursor-grab active:cursor-grabbing touch-none relative z-10"
        title="Click coin to toss, drag to inspect 360°"
      />

      {/* ─── Side Indicator Badge (Heads / Tails) ─── */}
      <div className="relative z-20 flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-sans text-stone-300">
        <Eye className="w-3.5 h-3.5 text-[#F97316]" />
        <span>Currently Viewing:</span>
        <strong className="text-white uppercase tracking-wider font-serif">
          {currentSide === 'heads' ? 'Heads (Liberty Profile)' : 'Tails (Heraldic Eagle)'}
        </strong>
      </div>

      {/* ─── Minimalist Control Pills ─── */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 relative z-20">
        
        {/* Toss Coin Button */}
        <button
          type="button"
          onClick={() => flipActionRef.current()}
          disabled={isFlipping}
          className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#F97316] hover:bg-[#ea580c] text-white text-xs sm:text-sm font-serif font-bold shadow-[0_8px_25px_rgba(249,115,22,0.4)] transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-60 cursor-pointer"
        >
          <RotateCw
            className={`w-4 h-4 text-white transition-transform duration-700 ${
              isFlipping ? 'animate-spin' : 'group-hover:rotate-180'
            }`}
          />
          <span>{isFlipping ? 'Tossing in the Air...' : 'Toss the Coin'}</span>
          <Sparkles className="w-4 h-4 text-white animate-pulse" />
        </button>

        {/* Quick Side View Toggles */}
        <button
          type="button"
          onClick={() => showSideRef.current('heads')}
          className={`px-3.5 py-2 rounded-full text-xs font-sans font-medium transition-all cursor-pointer border ${
            currentSide === 'heads'
              ? 'bg-white/20 border-white/40 text-white font-bold'
              : 'bg-white/5 border-white/10 text-stone-400 hover:text-white hover:bg-white/10'
          }`}
        >
          Heads
        </button>

        <button
          type="button"
          onClick={() => showSideRef.current('tails')}
          className={`px-3.5 py-2 rounded-full text-xs font-sans font-medium transition-all cursor-pointer border ${
            currentSide === 'tails'
              ? 'bg-white/20 border-white/40 text-white font-bold'
              : 'bg-white/5 border-white/10 text-stone-400 hover:text-white hover:bg-white/10'
          }`}
        >
          Tails
        </button>

        {/* Drag Hint */}
        <div className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/5 border border-white/10 text-white/60 text-xs font-sans">
          <Hand className="w-3.5 h-3.5 text-[#F97316]" />
          <span>Drag 360°</span>
        </div>

        {/* Sound Toggle */}
        <button
          type="button"
          onClick={() => setSoundEnabled((prev) => !prev)}
          className="p-2 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          title={soundEnabled ? 'Mute coin ring sound' : 'Unmute coin ring sound'}
          aria-label="Toggle coin sound"
        >
          {soundEnabled ? (
            <Volume2 className="w-3.5 h-3.5 text-[#F97316]" />
          ) : (
            <VolumeX className="w-3.5 h-3.5 text-stone-400" />
          )}
        </button>

      </div>

      {flipCount > 0 && (
        <span className="mt-2.5 text-xs font-sans text-stone-400 tracking-wider">
          Tosses: {flipCount} • Every coin represents tangible hope
        </span>
      )}

    </div>
  );
}
