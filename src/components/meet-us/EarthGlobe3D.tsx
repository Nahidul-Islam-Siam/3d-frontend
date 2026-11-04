import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// 4K Official Textures from Three.js TSL Earth Example (Solar System Scope / NASA)
import earthDayMap from '@/assets/textures/earth/earth_day_4096.jpg';
import earthNightMap from '@/assets/textures/earth/earth_night_4096.jpg';
import earthCloudsBumpRoughnessMap from '@/assets/textures/earth/earth_bump_roughness_clouds_4096.jpg';

export interface EarthGlobe3DProps {
  className?: string;
  autoRotate?: boolean;
  interactive?: boolean;
}

export default function EarthGlobe3D({
  className = '',
  autoRotate = true,
  interactive = true,
}: EarthGlobe3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // ─── 1. Scene, Camera, High-Precision WebGL Renderer ───
    const scene = new THREE.Scene();    

    const camera = new THREE.PerspectiveCamera(34, width / height, 0.1, 100);
    // Tuned camera distance for optimal texel density & zero blur
    camera.position.set(0, 0, 16);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    // Pin crisp rendering on high-DPI screens
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);

    // ─── 2. Ultra-Crisp Texture Loading (Disable Blurry Mipmaps, 16x Anisotropy) ───
    const textureLoader = new THREE.TextureLoader();
    let loadedCount = 0;
    const checkAllLoaded = () => {
      loadedCount++;
      if (loadedCount >= 3) {
        setIsLoaded(true);
      }
    };

    const maxAnisotropy = renderer.capabilities.getMaxAnisotropy() || 16;

    // Day Texture: Force full 4096 linear filtering with zero mipmap downgrades
    const dayTexture = textureLoader.load(earthDayMap, checkAllLoaded);
    dayTexture.colorSpace = THREE.SRGBColorSpace;
    dayTexture.minFilter = THREE.LinearFilter;
    dayTexture.magFilter = THREE.LinearFilter;
    dayTexture.generateMipmaps = false;
    dayTexture.anisotropy = maxAnisotropy;

    const nightTexture = textureLoader.load(earthNightMap, checkAllLoaded);
    nightTexture.colorSpace = THREE.SRGBColorSpace;
    nightTexture.minFilter = THREE.LinearFilter;
    nightTexture.magFilter = THREE.LinearFilter;
    nightTexture.generateMipmaps = false;
    nightTexture.anisotropy = maxAnisotropy;

    // Bump + Roughness + Clouds Texture: Crisp linear sampling
    const bumpRoughnessCloudsTexture = textureLoader.load(
      earthCloudsBumpRoughnessMap,
      checkAllLoaded
    );
    bumpRoughnessCloudsTexture.minFilter = THREE.LinearFilter;
    bumpRoughnessCloudsTexture.magFilter = THREE.LinearFilter;
    bumpRoughnessCloudsTexture.generateMipmaps = false;
    bumpRoughnessCloudsTexture.anisotropy = maxAnisotropy;

    // ─── 3. Anti-Aliased Soft Circular Starfield (No Square Pixel Blocks) ───
    const starCanvas = document.createElement('canvas');
    starCanvas.width = 16;
    starCanvas.height = 16;
    const ctx = starCanvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.25, 'rgba(215, 235, 255, 0.85)');
      grad.addColorStop(0.7, 'rgba(120, 180, 255, 0.18)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 16, 16);
    }
    const starTexture = new THREE.CanvasTexture(starCanvas);

    const starCount = 1000;
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3;
      // Scatter in upper-left space behind typography
      starPositions[i3] = (Math.random() - 0.68) * 350;
      starPositions[i3 + 1] = Math.random() * 180 - 15;
      starPositions[i3 + 2] = -Math.random() * 250 - 30;

      const shade = 0.55 + Math.random() * 0.45;
      starColors[i3] = shade;
      starColors[i3 + 1] = shade * (0.92 + Math.random() * 0.08);
      starColors[i3 + 2] = shade * (1.0 + Math.random() * 0.2);
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    const starMaterial = new THREE.PointsMaterial({
      size: 1.25,
      map: starTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.92,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });
    const starField = new THREE.Points(starGeometry, starMaterial);
    scene.add(starField);

    // ─── 4. Exact Three.js Journey Horizon Geometry (Optimized Scale for 100% Clarity) ───
    const globeGroup = new THREE.Group();
    const isMobile = width < 768;

    // Radius tuned so 25% of the 4K texture is visible at once (5x higher texel clarity)
    const earthRadius = isMobile ? 9.5 : 12.8;
    const initialPosX = isMobile ? 3.8 : 6.2;
    const initialPosY = isMobile ? -8.8 : -11.6;
    const posZ = 0;

    globeGroup.position.set(initialPosX, initialPosY, posZ);
    globeGroup.rotation.z = THREE.MathUtils.degToRad(-16);
    globeGroup.rotation.x = THREE.MathUtils.degToRad(12);
    scene.add(globeGroup);

    // ─── 5. Daylight Sun Orientation (Matches Three.js TSL Earth Example) ───
    const sunDirection = new THREE.Vector3(-0.15, 0.92, 0.55).normalize();

    // ─── 6. Earth Surface Shader with Bump Mapping & Crisp 3D Relief ───
    const earthVertexShader = `
      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vWorldPosition;
      varying vec3 vWorldNormal;

      void main() {
        vUv = uv;
        vNormal = normalize(normalMatrix * normal);
        vec4 worldPos = modelMatrix * vec4(position, 1.0);
        vWorldPosition = worldPos.xyz;
        vWorldNormal = normalize((modelMatrix * vec4(normal, 0.0)).xyz);
        gl_Position = projectionMatrix * viewMatrix * worldPos;
      }
    `;

    const earthFragmentShader = `
      uniform sampler2D dayTexture;
      uniform sampler2D bumpRoughnessCloudsTexture;
      uniform vec3 sunDirection;
      uniform vec3 atmosphereDayColor;
      uniform vec3 atmosphereTwilightColor;
      uniform vec3 cameraWorldPos;

      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vWorldPosition;
      varying vec3 vWorldNormal;

      // Official Three.js standard derivative bump mapping (dFdx / dFdy)
      vec3 perturbNormal(vec3 surf_pos, vec3 surf_norm, float height, float bumpScale) {
        vec3 vSigmaX = dFdx(surf_pos);
        vec3 vSigmaY = dFdy(surf_pos);
        vec3 vN = surf_norm;
        vec3 R1 = cross(vSigmaY, vN);
        vec3 R2 = cross(vN, vSigmaX);
        float fDet = dot(vSigmaX, R1);
        float dHdx = dFdx(height);
        float dHdy = dFdy(height);
        vec3 vGrad = sign(fDet) * (dHdx * R1 + dHdy * R2);
        return normalize(abs(fDet) * surf_norm - bumpScale * vGrad);
      }

      void main() {
        // High-precision texture sampling
        vec4 dayColor = texture2D(dayTexture, vUv);
        vec4 brcData = texture2D(bumpRoughnessCloudsTexture, vUv);

        // Three.js TSL cloud strength: smoothstep(0.2, 1.0)
        float cloudsStrength = smoothstep(0.20, 0.88, brcData.b);

        // Perturb surface normals with elevation & cloud relief for 3D crisp edges
        float bumpHeight = max(brcData.r * 0.35, cloudsStrength * 0.75);
        vec3 perturbedNormal = perturbNormal(vWorldPosition, vWorldNormal, bumpHeight, 0.06);

        // Deep royal ocean blue base mixed with daytime map
        vec3 oceanBase = vec3(0.04, 0.22, 0.48);
        vec3 dayBase = mix(oceanBase, dayColor.rgb, 0.82);

        // Crisp white clouds (Three.js Journey formula: mix(day, vec3(1.0), clouds * 2.0))
        vec3 surfaceColor = mix(dayBase, vec3(1.0, 1.0, 1.0), clamp(cloudsStrength * 1.85, 0.0, 1.0));

        // Sun orientation with perturbed 3D normal for relief shading
        float sunOrientation = dot(perturbedNormal, sunDirection);
        float diffuse = clamp(sunOrientation * 0.88 + 0.22, 0.0, 1.0);

        // View direction & Fresnel calculation
        vec3 viewDir = normalize(cameraWorldPos - vWorldPosition);
        float fresnel = 1.0 - max(0.0, dot(viewDir, vWorldNormal));

        // Specular sun glint on ocean waters
        vec3 halfVector = normalize(sunDirection + viewDir);
        float NdotH = max(0.0, dot(perturbedNormal, halfVector));
        float specular = pow(NdotH, 32.0) * (1.0 - brcData.g) * (1.0 - cloudsStrength) * 0.85;

        // Lit daytime surface
        vec3 colorOutput = surfaceColor * diffuse + vec3(specular);

        // Radiant electric cyan atmospheric limb along the horizon curve
        vec3 atmosphereColor = mix(atmosphereTwilightColor, atmosphereDayColor, smoothstep(-0.2, 0.8, sunOrientation));
        float atmosphereMix = pow(fresnel, 2.0) * 1.35;
        colorOutput = mix(colorOutput, atmosphereColor, clamp(atmosphereMix, 0.0, 1.0));

        gl_FragColor = vec4(colorOutput, 1.0);
      }
    `;

    const earthMaterial = new THREE.ShaderMaterial({
      vertexShader: earthVertexShader,
      fragmentShader: earthFragmentShader,
      uniforms: {
        dayTexture: { value: dayTexture },
        bumpRoughnessCloudsTexture: { value: bumpRoughnessCloudsTexture },
        sunDirection: { value: sunDirection },
        atmosphereDayColor: { value: new THREE.Color('#38bdf8') }, // Radiant electric cyan
        atmosphereTwilightColor: { value: new THREE.Color('#60a5fa') }, // Celestial blue
        cameraWorldPos: { value: camera.position },
      },
    });

    // 128x128 SphereGeometry for razor-sharp, perfectly round horizon curvature
    const earthGeometry = new THREE.SphereGeometry(earthRadius, 128, 128);
    const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
    earthMesh.rotation.y = THREE.MathUtils.degToRad(75);
    globeGroup.add(earthMesh);

    // ─── 7. Outer Atmospheric Glow Shell (Exact Three.js TSL Formula: pow(3.0)) ───
    const atmosphereVertexShader = `
      varying vec3 vNormal;
      varying vec3 vWorldPosition;
      varying vec3 vWorldNormal;

      void main() {
        vNormal = normalize(normalMatrix * normal);
        vec4 worldPos = modelMatrix * vec4(position, 1.0);
        vWorldPosition = worldPos.xyz;
        vWorldNormal = normalize((modelMatrix * vec4(normal, 0.0)).xyz);
        gl_Position = projectionMatrix * viewMatrix * worldPos;
      }
    `;

    const atmosphereFragmentShader = `
      uniform vec3 sunDirection;
      uniform vec3 atmosphereDayColor;
      uniform vec3 atmosphereTwilightColor;
      uniform vec3 cameraWorldPos;

      varying vec3 vNormal;
      varying vec3 vWorldPosition;
      varying vec3 vWorldNormal;

      float remap(float value, float inMin, float inMax, float outMin, float outMax) {
        return outMin + (value - inMin) * (outMax - outMin) / (inMax - inMin);
      }

      void main() {
        vec3 viewDir = normalize(cameraWorldPos - vWorldPosition);
        float fresnel = 1.0 - abs(dot(viewDir, vWorldNormal));

        // Exact Three.js TSL formula: remap(0.73, 1.0, 1.0, 0.0).pow(3.0)
        float alpha = pow(clamp(remap(fresnel, 0.73, 1.0, 1.0, 0.0), 0.0, 1.0), 3.0);
        float sunOrientation = dot(vWorldNormal, sunDirection);
        alpha *= smoothstep(-0.4, 1.0, sunOrientation);

        vec3 atmosphereColor = mix(atmosphereTwilightColor, atmosphereDayColor, smoothstep(-0.25, 0.75, sunOrientation));

        // Razor-sharp luminous cyan atmospheric streak
        gl_FragColor = vec4(atmosphereColor, alpha * 1.6);
      }
    `;

    const atmosphereMaterial = new THREE.ShaderMaterial({
      vertexShader: atmosphereVertexShader,
      fragmentShader: atmosphereFragmentShader,
      uniforms: {
        sunDirection: { value: sunDirection },
        atmosphereDayColor: { value: new THREE.Color('#38bdf8') },
        atmosphereTwilightColor: { value: new THREE.Color('#60a5fa') },
        cameraWorldPos: { value: camera.position },
      },
      side: THREE.BackSide,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const atmosphereGeometry = new THREE.SphereGeometry(earthRadius * 1.03, 128, 128);
    const atmosphereMesh = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    globeGroup.add(atmosphereMesh);

    // ─── 8. GSAP ScrollTrigger Choreography (Edolus 3-Stage Orbital Flight) ───
    const banner = container.closest('#meet-us-banner') as HTMLElement | null;
    let scrollTriggerInstance: ScrollTrigger | null | undefined = null;
    let timelineInstance: gsap.core.Timeline | null = null;

    if (banner) {
      timelineInstance = gsap.timeline({
        scrollTrigger: {
          trigger: banner,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
        },
      });

      scrollTriggerInstance = timelineInstance.scrollTrigger;

      // Stage 1 -> Stage 2: "MEET US" floats up and fades out (0% -> 38%)
      timelineInstance.to(
        '#meet-us-hero-text',
        {
          opacity: 0,
          y: -70,
          ease: 'power2.inOut',
          duration: 0.38,
        },
        0
      );

      timelineInstance.to(
        '#meet-us-step-inside',
        {
          opacity: 0,
          y: 35,
          ease: 'power2.inOut',
          duration: 0.3,
        },
        0
      );

      // Stage 1 -> Stage 2 -> Stage 3: Earth rolls down-left & exits viewport (0% -> 100%)
      // Scaled coordinates for crisp geometry
      timelineInstance.to(
        globeGroup.position,
        {
          x: isMobile ? -2.5 : -3.6,
          y: isMobile ? -14.5 : -19.5,
          ease: 'power1.inOut',
          duration: 1,
        },
        0
      );

      timelineInstance.to(
        globeGroup.rotation,
        {
          z: THREE.MathUtils.degToRad(-34),
          ease: 'power1.inOut',
          duration: 1,
        },
        0
      );

      timelineInstance.to(
        earthMesh.rotation,
        {
          y: '+=0.85',
          ease: 'none',
          duration: 1,
        },
        0
      );

      // Stage 2 -> Stage 3: Center teaser prompt ("SCROLL TO ENTER STORY")
      timelineInstance.fromTo(
        '#meet-us-teaser',
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, ease: 'power2.out', duration: 0.35 },
        0.35
      );

      timelineInstance.to(
        '#meet-us-teaser',
        {
          opacity: 0,
          y: -25,
          ease: 'power2.in',
          duration: 0.25,
        },
        0.75
      );
    }

    // ─── 9. Interactive Mouse Parallax Inertia ───
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      const rect = container.getBoundingClientRect();
      const xPct = (e.clientX - rect.left) / rect.width - 0.5;
      const yPct = (e.clientY - rect.top) / rect.height - 0.5;
      targetX = xPct * 0.08;
      targetY = yPct * 0.06;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // ─── 10. Animation Loop with Performance Auto-Pause ───
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

      const delta = clock.getDelta();

      // Continuous orbital rotation
      if (autoRotate) {
        earthMesh.rotation.y += delta * 0.012;
      }

      // Smooth inertia mouse response
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      camera.position.x = mouseX * 2.5;
      camera.position.y = mouseY * 2.0;
      camera.lookAt(0, 0, 0);

      // Keep camera uniform updated
      earthMaterial.uniforms.cameraWorldPos.value.copy(camera.position);
      atmosphereMaterial.uniforms.cameraWorldPos.value.copy(camera.position);

      renderer.render(scene, camera);
    };

    animate();

    // ─── 11. Responsive Window Resize ───
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth || window.innerWidth;
      const newHeight = container.clientHeight || window.innerHeight;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(newWidth, newHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2.5));

      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    // ─── 12. Cleanup on Unmount ───
    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);

      scrollTriggerInstance?.kill();
      timelineInstance?.kill();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      earthGeometry.dispose();
      earthMaterial.dispose();
      atmosphereGeometry.dispose();
      atmosphereMaterial.dispose();
      starGeometry.dispose();
      starMaterial.dispose();
      starTexture.dispose();
      dayTexture.dispose();
      nightTexture.dispose();
      bumpRoughnessCloudsTexture.dispose();
      renderer.dispose();
    };
  }, [autoRotate, interactive]);

  return (
    <div
      ref={mountRef}
      className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none ${className}`}
      style={{
        background: 'radial-gradient(ellipse at 75% 85%, #031735 0%, #010612 45%, #000206 100%)',
      }}
      aria-hidden="true"
    >
      {/* Subtle fade-in transition once 4K textures are ready */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${
          isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100 bg-[#000206]'
        }`}
      />
    </div>
  );
}
