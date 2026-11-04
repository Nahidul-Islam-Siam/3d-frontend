import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface AtmosphericDescentTransitionProps {
  className?: string;
  onDescentComplete?: () => void;
}

export default function AtmosphericDescentTransition({
  className = '',
  onDescentComplete,
}: AtmosphericDescentTransitionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const mountRef = useRef<HTMLDivElement>(null);
  const [altitude, setAltitude] = useState(48000);
  const [flightPhase, setFlightPhase] = useState('STRATOSPHERIC ENTRY');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const container = mountRef.current;
    if (!section || !container) return;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // ─── 1. Three.js Scene, Camera, High-Precision WebGL Renderer ───
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // ─── 2. Stratosphere & Volumetric Cloud Deck Raymarching Shader ───
    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      uniform float uTime;
      uniform float uProgress;
      uniform vec2 uResolution;
      uniform vec2 uMouse;

      varying vec2 vUv;

      // ─── 3D Perlin / Simplex Noise Utilities ───
      float hash(vec3 p) {
        p = fract(p * 0.3183099 + 0.1);
        p *= 17.0;
        return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
      }

      float noise(vec3 x) {
        vec3 i = floor(x);
        vec3 f = fract(x);
        f = f * f * (3.0 - 2.0 * f);
        return mix(
          mix(
            mix(hash(i + vec3(0.0, 0.0, 0.0)), hash(i + vec3(1.0, 0.0, 0.0)), f.x),
            mix(hash(i + vec3(0.0, 1.0, 0.0)), hash(i + vec3(1.0, 1.0, 0.0)), f.x), f.y
          ),
          mix(
            mix(hash(i + vec3(0.0, 0.0, 1.0)), hash(i + vec3(1.0, 0.0, 1.0)), f.x),
            mix(hash(i + vec3(0.0, 1.0, 1.0)), hash(i + vec3(1.0, 1.0, 1.0)), f.x), f.y
          ), f.z
        );
      }

      // Fractional Brownian Motion for Soft Fluffy Cloud Billows
      float fbm(vec3 p) {
        float f = 0.0;
        float amp = 0.52;
        for (int i = 0; i < 5; i++) {
          f += amp * noise(p);
          p = p * 2.08 + vec3(0.24, 0.18, 0.36);
          amp *= 0.48;
        }
        return f;
      }

      // High-Frequency Detail Noise for Cloud Edges
      float fbmDetail(vec3 p) {
        float f = 0.0;
        float amp = 0.5;
        for (int i = 0; i < 3; i++) {
          f += amp * noise(p);
          p = p * 2.4 + vec3(0.12, 0.31, 0.19);
          amp *= 0.5;
        }
        return f;
      }

      void main() {
        vec2 uv = (vUv - 0.5) * 2.0;
        float aspect = uResolution.x / uResolution.y;
        uv.x *= aspect;

        // Camera trajectory: Descents from upper stratosphere into and through cloud deck
        // uProgress: 0.0 (high orbit) -> 0.5 (skimming cloud tops) -> 0.75 (inside cloud) -> 1.0 (sub-cloud canopy)
        float camY = mix(3.8, -1.1, uProgress);
        float pitch = mix(-0.20, -0.62, smoothstep(0.0, 0.65, uProgress));

        vec3 ro = vec3(uMouse.x * 0.45, camY, 3.2 - uProgress * 2.2);
        vec3 rd = normalize(vec3(uv.x, uv.y + pitch, -1.85));

        // Sun Direction (positioned high right for dramatic silver-lining rim light)
        vec3 sunDir = normalize(vec3(0.65, 0.75, -0.42));

        // ─── 1. Sky Dome Background (Edolus Palette: Cosmic Navy to Stratospheric Blue) ───
        float skyElev = clamp(rd.y * 0.5 + 0.5, 0.0, 1.0);
        
        // Deep space black at zenith, transitioning through sapphire to horizon azure
        vec3 spaceBlack = vec3(0.008, 0.015, 0.035);
        vec3 stratosphereNavy = vec3(0.045, 0.125, 0.285);
        vec3 troposphereBlue = vec3(0.12, 0.29, 0.58);
        vec3 horizonGlow = vec3(0.58, 0.72, 0.88);

        vec3 skyColor = mix(spaceBlack, stratosphereNavy, smoothstep(0.68, 0.98, skyElev));
        skyColor = mix(troposphereBlue, skyColor, smoothstep(0.35, 0.70, skyElev));
        skyColor = mix(horizonGlow, skyColor, smoothstep(0.05, 0.35, skyElev));

        // Atmospheric Mie scattering glow around sun
        float sunScatter = pow(max(dot(rd, sunDir), 0.0), 12.0) * 0.65;
        skyColor += vec3(1.0, 0.95, 0.85) * sunScatter;

        // ─── 2. Volumetric Cumulus Cloud Deck Raymarching ───
        vec3 cloudColorAcc = vec3(0.0);
        float transmittance = 1.0;

        // Cloud stratum bounds
        float cloudMinY = -0.8;
        float cloudMaxY = 1.6;

        // Fast Raymarch through cloud slab
        const int STEPS = 28;
        float stepSize = 0.22;
        float t = 0.8;

        for (int i = 0; i < STEPS; i++) {
          if (transmittance < 0.02) break;

          vec3 p = ro + rd * t;

          // Height envelope for cumulus cloud slab
          float heightMask = smoothstep(cloudMinY, cloudMinY + 0.6, p.y) * 
                             smoothstep(cloudMaxY, cloudMaxY - 0.7, p.y);

          if (heightMask > 0.01) {
            // Wind drift animation
            vec3 wind = vec3(uTime * 0.035, 0.0, uTime * 0.015);
            vec3 samplePos = p * 0.75 + wind;

            float baseNoise = fbm(samplePos);
            // Billowy shape threshold
            float density = smoothstep(0.38, 0.75, baseNoise) * heightMask;

            if (density > 0.01) {
              // Add high frequency edge turbulence
              float detail = fbmDetail(samplePos * 2.2);
              density = clamp(density - detail * 0.14, 0.0, 1.0);

              // Surface normal estimation for realistic sun diffuse
              float eps = 0.08;
              float dX = fbm(samplePos + vec3(eps, 0.0, 0.0)) - baseNoise;
              float dY = fbm(samplePos + vec3(0.0, eps, 0.0)) - baseNoise;
              float dZ = fbm(samplePos + vec3(0.0, 0.0, eps)) - baseNoise;
              vec3 cloudNorm = normalize(vec3(-dX, -dY, -dZ));

              // Sunlight direct + forward Mie scattering (Silver Lining effect)
              float sunDiffuse = max(dot(cloudNorm, sunDir), 0.0);
              float forwardMie = pow(max(dot(rd, sunDir), 0.0), 5.0) * 1.65;

              vec3 sunLightColor = vec3(1.0, 0.98, 0.94) * (sunDiffuse * 0.75 + forwardMie + 0.35);
              
              // Ambient skylight in crevice shadows
              vec3 ambientLight = mix(vec3(0.25, 0.38, 0.58), vec3(0.62, 0.74, 0.88), p.y * 0.5 + 0.5);

              vec3 stepShading = mix(ambientLight, sunLightColor, sunDiffuse * 0.8 + 0.2);

              // Volumetric extinction
              float stepExtinction = density * 0.42;
              cloudColorAcc += stepShading * stepExtinction * transmittance;
              transmittance *= max(1.0 - stepExtinction, 0.0);
            }
          }

          t += stepSize;
        }

        // Composite sky and clouds
        vec3 finalColor = skyColor * transmittance + cloudColorAcc;

        // ─── 3. Full Cloud Plunge Envelopment (Progress 0.50 -> 0.82) ───
        // When camera plunges directly through the cloud layer, view gets immersed in radiant white-blue cloud mist
        float plungeCurve = smoothstep(0.38, 0.62, uProgress) * (1.0 - smoothstep(0.72, 0.95, uProgress));
        vec3 plungeMist = vec3(0.88, 0.92, 0.97);
        finalColor = mix(finalColor, plungeMist, plungeCurve * 0.72);

        // ─── 4. Seamless Transition into Section 2 (Progress 0.82 -> 1.0) ───
        // Mist clears smoothly to reveal the top canopy of Section 2
        float exitTransition = smoothstep(0.82, 1.0, uProgress);
        // Fade to dark forest ambient at bottom edge of transition
        vec3 forestUnderstory = vec3(0.045, 0.08, 0.08);
        finalColor = mix(finalColor, forestUnderstory, exitTransition * 0.85);

        // Subtle film grain
        float grain = (hash(vec3(vUv * 800.0, fract(uTime))) - 0.5) * 0.035;
        finalColor += grain;

        gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

    const cloudMaterial = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uProgress: { value: 0 },
        uResolution: { value: new THREE.Vector2(width, height) },
        uMouse: { value: new THREE.Vector2(0, 0) },
      },
      depthWrite: false,
    });

    const cloudMesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), cloudMaterial);
    scene.add(cloudMesh);

    // ─── 3. High-Speed Atmospheric Speed Streak Particles ───
    const particleCount = 420;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const speeds = new Float32Array(particleCount);
    const alphas = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 2.8;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 2.8;
      positions[i * 3 + 2] = 0;
      speeds[i] = 0.8 + Math.random() * 1.6;
      alphas[i] = 0.2 + Math.random() * 0.65;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('speed', new THREE.BufferAttribute(speeds, 1));
    particleGeometry.setAttribute('alpha', new THREE.BufferAttribute(alphas, 1));

    // Particle texture (elongated soft vertical speed streak)
    const particleCanvas = document.createElement('canvas');
    particleCanvas.width = 16;
    particleCanvas.height = 64;
    const pCtx = particleCanvas.getContext('2d');
    if (pCtx) {
      const grad = pCtx.createLinearGradient(8, 0, 8, 64);
      grad.addColorStop(0, 'rgba(255, 255, 255, 0)');
      grad.addColorStop(0.3, 'rgba(230, 245, 255, 0.45)');
      grad.addColorStop(0.5, 'rgba(255, 255, 255, 0.95)');
      grad.addColorStop(0.7, 'rgba(210, 235, 255, 0.45)');
      grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      pCtx.fillStyle = grad;
      pCtx.fillRect(4, 0, 8, 64);
    }
    const particleTexture = new THREE.CanvasTexture(particleCanvas);

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.14,
      map: particleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // ─── 4. Mouse Move Tilt ───
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const xPct = (e.clientX - rect.left) / rect.width - 0.5;
      const yPct = (e.clientY - rect.top) / rect.height - 0.5;
      targetMouseX = xPct;
      targetMouseY = yPct;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // ─── 5. GSAP ScrollTrigger Cinematic Scrub ───
    let currentProgress = 0;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=130%',
        pin: true,
        scrub: 1.0,
        anticipatePin: 1,
        onUpdate: (self) => {
          const p = self.progress;
          currentProgress = p;
          setScrollProgress(p);
          cloudMaterial.uniforms.uProgress.value = p;

          // Update HUD altitude & phase
          const alt = Math.round(48000 - p * 41500);
          setAltitude(alt);

          if (p < 0.32) {
            setFlightPhase('STRATOSPHERIC ENTRY');
          } else if (p < 0.76) {
            setFlightPhase('CLOUD DECK PENETRATION');
          } else {
            setFlightPhase('APPROACHING MISSION TERRAIN');
          }

          // Streak particle opacity ramps up during high-speed plunge
          const speedOpacity = Math.sin(p * Math.PI) * 0.85;
          particleMaterial.opacity = speedOpacity;

          if (p >= 0.99 && onDescentComplete) {
            onDescentComplete();
          }
        },
      },
    });

    // ─── 6. Animation Loop ───
    const clock = new THREE.Clock();
    let animationFrameId: number;
    let isVisible = true;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(section);

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const elapsed = clock.getElapsedTime();
      cloudMaterial.uniforms.uTime.value = elapsed;

      // Mouse smoothing
      currentMouseX += (targetMouseX - currentMouseX) * 0.05;
      currentMouseY += (targetMouseY - currentMouseY) * 0.05;
      cloudMaterial.uniforms.uMouse.value.set(currentMouseX, currentMouseY);

      // Particle update: Upward rushing stream
      const posAttr = particleGeometry.attributes.position as THREE.BufferAttribute;
      const posArray = posAttr.array as Float32Array;
      const speedMultiplier = 1.0 + currentProgress * 2.8;

      for (let i = 0; i < particleCount; i++) {
        posArray[i * 3 + 1] += speeds[i] * 0.015 * speedMultiplier;
        if (posArray[i * 3 + 1] > 1.4) {
          posArray[i * 3 + 1] = -1.4;
          posArray[i * 3 + 0] = (Math.random() - 0.5) * 2.8;
        }
      }
      posAttr.needsUpdate = true;

      renderer.render(scene, camera);
    };
    animate();

    // ─── 7. Resize Handler ───
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth || window.innerWidth;
      const newHeight = container.clientHeight || window.innerHeight;
      renderer.setSize(newWidth, newHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      cloudMaterial.uniforms.uResolution.value.set(newWidth, newHeight);
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', handleResize);

    // ─── 8. Cleanup ───
    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);

      tl.scrollTrigger?.kill();
      tl.kill();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      cloudMaterial.dispose();
      particleMaterial.dispose();
      particleTexture.dispose();
      particleGeometry.dispose();
      renderer.dispose();
    };
  }, [onDescentComplete]);

  return (
    <section
      ref={sectionRef}
      id="atmospheric-descent"
      className={`relative w-full h-screen min-h-[640px] max-h-[960px] bg-black overflow-hidden flex flex-col justify-between select-none ${className}`}
    >
      {/* ─── Realtime WebGL Stratosphere & 3D Cloud Deck Canvas ─── */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* ─── Minimalist Cinematic HUD Telemetry Overlay (Edolus Style) ─── */}
      <div className="relative z-10 w-full max-w-[1416px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-0 pt-20 sm:pt-24 flex justify-between items-start pointer-events-none">
        {/* Top-Left Telemetry Readout */}
        <div
          className="flex flex-col gap-1 transition-opacity duration-300"
          style={{ opacity: scrollProgress > 0.85 ? 1 - (scrollProgress - 0.85) / 0.15 : 1 }}
        >
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] animate-pulse" />
            <span className="text-[10px] tracking-[0.24em] font-mono uppercase text-sky-300/90">
              ATMOSPHERIC RE-ENTRY // {flightPhase}
            </span>
          </div>

          <div className="flex items-baseline gap-2 mt-0.5">
            <span
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              className="text-white text-xl sm:text-2xl font-bold tracking-tight"
            >
              {altitude.toLocaleString()}
            </span>
            <span className="text-[11px] font-mono tracking-widest text-white/70">
              FEET ALTITUDE
            </span>
          </div>
        </div>

        {/* Top-Right Trajectory Indicator */}
        <div
          className="hidden sm:flex flex-col items-end gap-1 transition-opacity duration-300"
          style={{ opacity: scrollProgress > 0.85 ? 1 - (scrollProgress - 0.85) / 0.15 : 1 }}
        >
          <span className="text-[10px] tracking-[0.22em] font-mono uppercase text-white/60">
            DESCENT VECTOR: NORMAL
          </span>
          <span className="text-[10px] tracking-[0.22em] font-mono uppercase text-[#38bdf8]/80">
            AIR BRAKING: ENGAGED
          </span>
        </div>
      </div>

      {/* ─── Center Plunge Prompt (Fades out quickly upon scroll) ─── */}
      <div
        className="relative z-10 w-full flex flex-col items-center justify-center text-center px-4 transition-opacity duration-500 pointer-events-none"
        style={{
          opacity: Math.max(0, 1 - scrollProgress * 3.5),
          transform: `translateY(${scrollProgress * 40}px)`,
        }}
      >
        <span
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          className="text-white/80 text-xs sm:text-sm tracking-[0.28em] uppercase font-medium drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]"
        >
          DESCENDING THROUGH CLOUD COVER
        </span>
        <div className="w-8 h-[1px] bg-white/40 my-3" />
        <span className="text-[10px] sm:text-[11px] font-sans tracking-[0.2em] uppercase text-white/60">
          SCROLL TO DIVE
        </span>
      </div>

      {/* ─── Bottom Status Bar ─── */}
      <div className="relative z-10 w-full max-w-[1416px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-0 pb-10 sm:pb-12 flex justify-between items-end pointer-events-none">
        <div
          className="flex items-center gap-2 text-white/60 text-[10px] font-mono tracking-widest uppercase transition-opacity duration-300"
          style={{ opacity: scrollProgress > 0.85 ? 1 - (scrollProgress - 0.85) / 0.15 : 1 }}
        >
          <span>MISSION APPROACH</span>
          <span>•</span>
          <span className="text-white/90">LIVE ACHIEVE BELIEVE</span>
        </div>

        {/* Minimal Scroll Down Pulse Indicator */}
        <div
          className="flex items-center gap-2 text-white/70 transition-opacity duration-300"
          style={{ opacity: Math.max(0, 1 - scrollProgress * 2.5) }}
        >
          <span className="w-5 h-5 rounded-full border border-white/50 flex items-center justify-center animate-bounce">
            <svg
              className="w-2.5 h-2.5 text-white"
              viewBox="0 0 10 10"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.25"
            >
              <line x1="5" y1="2" x2="5" y2="8" strokeLinecap="round" />
              <polyline
                points="2.5,5.5 5,8 7.5,5.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </div>
    </section>
  );
}

