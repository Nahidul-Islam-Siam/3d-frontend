import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import aerialForestBg from '@/assets/meet-us/misty-forest-bg.png';

export interface MistyForestCanvasProps {
  className?: string;
  scrollProgress?: number;
}

export default function MistyForestCanvas({
  className = '',
  scrollProgress = 0,
}: MistyForestCanvasProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const scrollProgressRef = useRef(scrollProgress);
  scrollProgressRef.current = scrollProgress;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // ─── 1. Scene, Camera, Renderer ───
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // ─── 2. Texture Loader with SRGB ColorSpace ───
    const textureLoader = new THREE.TextureLoader();
    const forestTexture = textureLoader.load(aerialForestBg);
    forestTexture.colorSpace = THREE.SRGBColorSpace;
    forestTexture.minFilter = THREE.LinearFilter;
    forestTexture.magFilter = THREE.LinearFilter;
    forestTexture.generateMipmaps = false;

    // ─── 3. Volumetric Fog GLSL Shader ───
    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      uniform sampler2D uTexture;
      uniform float uTime;
      uniform vec2 uMouse;
      uniform float uScrollProgress;
      uniform vec2 uResolution;

      varying vec2 vUv;

      // Fast Simplex Noise Implementation for Volumetric Mountain Fog
      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

      float snoise(vec2 v) {
        const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy) );
        vec2 x0 = v -   i + dot(i, C.xx);
        vec2 i1;
        i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod289(i);
        vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
        m = m*m ;
        m = m*m ;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
        vec3 g;
        g.x  = a0.x  * x0.x  + h.x  * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
      }

      float fbm(vec2 p) {
        float value = 0.0;
        float amp = 0.55;
        float freq = 1.0;
        for (int i = 0; i < 4; i++) {
          value += amp * snoise(p * freq);
          freq *= 2.05;
          amp *= 0.46;
        }
        return value;
      }

      void main() {
        // Precise aspect-ratio cover mapping (background-size: cover in GLSL)
        float screenAspect = uResolution.x / uResolution.y;
        float textureAspect = 1920.0 / 920.0;
        vec2 coverUv = vUv;
        if (screenAspect > textureAspect) {
          float scale = screenAspect / textureAspect;
          coverUv.y = (coverUv.y - 0.5) * scale + 0.5;
        } else {
          float scale = textureAspect / screenAspect;
          coverUv.x = (coverUv.x - 0.5) * scale + 0.5;
        }
        
        // Dynamic camera fly-through zoom driven by GSAP scroll
        float zoom = 1.0 + uScrollProgress * 0.16;
        vec2 centeredUv = (coverUv - 0.5) / zoom + 0.5;

        // Subtle mouse inertia parallax on background trees
        vec2 forestUv = centeredUv + uMouse * 0.018;
        forestUv = clamp(forestUv, 0.001, 0.999);

        vec4 rawForestColor = texture2D(uTexture, forestUv);

        // Enhance sunlight & vibrance on aerial forest canopy (matching Figma)
        vec3 forestColor = pow(rawForestColor.rgb, vec3(0.90)) * 1.25;

        // Volumetric mist layer 1 (drifts slowly eastward)
        vec2 fogUv1 = vUv * vec2(2.4, 1.3) + vec2(uTime * 0.022, uTime * 0.005) + uMouse * 0.045;
        float mist1 = fbm(fogUv1);

        // Volumetric mist layer 2 (drifts diagonally across ridges)
        vec2 fogUv2 = vUv * vec2(3.6, 1.9) - vec2(uTime * 0.034, -uTime * 0.012) + uMouse * 0.065;
        float mist2 = fbm(fogUv2);

        // Combined organic cloud billows
        float combinedMist = smoothstep(-0.25, 0.65, (mist1 * 0.58 + mist2 * 0.42));

        // Mask mist so valley depths and ridge tops have natural density
        float heightMask = smoothstep(0.02, 0.85, vUv.y);
        
        // As camera dives forward, mist parts and disperses
        float mistDispersion = 1.0 - smoothstep(0.20, 0.92, uScrollProgress);
        float finalMistStrength = combinedMist * heightMask * mistDispersion * 0.42;

        // Soft white-blue alpine mountain mist
        vec3 mistColor = vec3(0.92, 0.95, 0.98);
        vec3 finalColor = mix(forestColor, mistColor, finalMistStrength);

        // Atmospheric cinematic vignette
        vec2 vigUv = (vUv - 0.5) * vec2(1.0, 1.25);
        float vignette = 1.0 - smoothstep(0.48, 1.35, length(vigUv));
        finalColor *= mix(0.78, 1.0, vignette);

        gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTexture: { value: forestTexture },
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uScrollProgress: { value: 0 },
        uResolution: { value: new THREE.Vector2(width, height) },
      },
      depthWrite: false,
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // ─── 4. Mouse Move Parallax ───
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

    // ─── 5. Animation Loop ───
    let isVisible = true;
    let animationFrameId: number;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse interpolation
      currentMouseX += (targetMouseX - currentMouseX) * 0.05;
      currentMouseY += (targetMouseY - currentMouseY) * 0.05;

      material.uniforms.uTime.value = elapsedTime;
      material.uniforms.uMouse.value.set(currentMouseX, currentMouseY);
      material.uniforms.uScrollProgress.value = scrollProgressRef.current;

      renderer.render(scene, camera);
    };

    animate();

    // ─── 6. Resize Handler ───
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth || window.innerWidth;
      const newHeight = container.clientHeight || window.innerHeight;

      renderer.setSize(newWidth, newHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      material.uniforms.uResolution.value.set(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // ─── 7. Cleanup on Unmount ───
    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      geometry.dispose();
      material.dispose();
      forestTexture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none ${className}`}
      aria-hidden="true"
    />
  );
}
