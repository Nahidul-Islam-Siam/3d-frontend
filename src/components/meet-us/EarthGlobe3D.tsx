import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

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

    // ─── 1. Scene, Camera, Renderer ───
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 1000);
    // Low-orbit vantage point looking obliquely across Earth's limb
    camera.position.set(0, 9, 34);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);

    // ─── 2. Texture Loader with SRGB and Anisotropy ───
    const textureLoader = new THREE.TextureLoader();
    let loadedCount = 0;
    const checkAllLoaded = () => {
      loadedCount++;
      if (loadedCount >= 3) {
        setIsLoaded(true);
      }
    };

    const maxAnisotropy = renderer.capabilities.getMaxAnisotropy() || 8;

    const dayTexture = textureLoader.load(earthDayMap, checkAllLoaded);
    dayTexture.colorSpace = THREE.SRGBColorSpace;
    dayTexture.anisotropy = maxAnisotropy;

    const nightTexture = textureLoader.load(earthNightMap, checkAllLoaded);
    nightTexture.colorSpace = THREE.SRGBColorSpace;
    nightTexture.anisotropy = maxAnisotropy;

    const bumpRoughnessCloudsTexture = textureLoader.load(
      earthCloudsBumpRoughnessMap,
      checkAllLoaded
    );
    bumpRoughnessCloudsTexture.anisotropy = maxAnisotropy;

    // ─── 3. Background Starfield ───
    const starCount = 1500;
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3;
      starPositions[i3] = (Math.random() - 0.5) * 700;
      starPositions[i3 + 1] = Math.random() * 300 - 30;
      starPositions[i3 + 2] = -Math.random() * 450 - 60;

      const shade = 0.5 + Math.random() * 0.5;
      starColors[i3] = shade;
      starColors[i3 + 1] = shade * (0.92 + Math.random() * 0.08);
      starColors[i3 + 2] = shade * (1.0 + Math.random() * 0.2);
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    const starMaterial = new THREE.PointsMaterial({
      size: 1.3,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      sizeAttenuation: true,
    });
    const starField = new THREE.Points(starGeometry, starMaterial);
    scene.add(starField);

    // ─── 4. Globe Positioning & Orientation ───
    const globeGroup = new THREE.Group();
    const isMobile = width < 768;
    const earthRadius = isMobile ? 24 : 31;
    // Position globe so its dramatic illuminated limb arcs across bottom-left to top-right
    globeGroup.position.set(isMobile ? 3 : 11, isMobile ? -23.5 : -28, -4);
    globeGroup.rotation.z = THREE.MathUtils.degToRad(-14);
    globeGroup.rotation.x = THREE.MathUtils.degToRad(8);
    scene.add(globeGroup);

    // ─── 5. Sun Direction Uniform (Exact TSL Example Angles) ───
    // Sun positioned obliquely to create beautiful day/sunset/night terminator
    const sunDirection = new THREE.Vector3(1.2, 0.7, 1.1).normalize();

    // ─── 6. Three.js Journey / TSL Earth Surface GLSL Shader ───
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
      uniform sampler2D nightTexture;
      uniform sampler2D bumpRoughnessCloudsTexture;
      uniform vec3 sunDirection;
      uniform vec3 atmosphereDayColor;
      uniform vec3 atmosphereTwilightColor;
      uniform vec3 cameraWorldPos;

      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vWorldPosition;
      varying vec3 vWorldNormal;

      float remap(float value, float inMin, float inMax, float outMin, float outMax) {
        return outMin + (value - inMin) * (outMax - outMin) / (inMax - inMin);
      }

      void main() {
        // Sample textures
        vec4 dayColor = texture2D(dayTexture, vUv);
        vec4 nightColor = texture2D(nightTexture, vUv);
        vec4 brcData = texture2D(bumpRoughnessCloudsTexture, vUv);

        // Channel extraction:
        // R: bump elevation, G: roughness, B: clouds
        float cloudsStrength = smoothstep(0.2, 1.0, brcData.b);

        // Surface color mixed with clouds
        vec3 surfaceColor = mix(dayColor.rgb, vec3(1.0), cloudsStrength * 1.85);

        // Sun orientation (Dot product between normal and sun direction)
        float sunOrientation = dot(vWorldNormal, sunDirection);

        // Day / Night transition
        float dayStrength = smoothstep(-0.25, 0.5, sunOrientation);

        // Night city lights (boosted on dark side)
        vec3 nightLights = nightColor.rgb * 1.5;

        // View direction & Fresnel calculation
        vec3 viewDir = normalize(cameraWorldPos - vWorldPosition);
        float fresnel = 1.0 - max(0.0, dot(viewDir, vWorldNormal));

        // Atmospheric color gradient (Twilight amber sunset -> Cyan blue daytime)
        vec3 atmosphereColor = mix(atmosphereTwilightColor, atmosphereDayColor, smoothstep(-0.25, 0.75, sunOrientation));

        // Diffuse Lighting with subtle specular sheen for oceans
        float diffuse = max(0.0, sunOrientation);
        float roughness = max(brcData.g, step(0.01, cloudsStrength));
        roughness = remap(roughness, 0.0, 1.0, 0.25, 0.65);

        // Specular glint on ocean surface
        vec3 halfVector = normalize(sunDirection + viewDir);
        float NdotH = max(0.0, dot(vWorldNormal, halfVector));
        float specular = pow(NdotH, 32.0) * (1.0 - brcData.g) * (1.0 - cloudsStrength) * 0.85;

        // Base lit day surface
        vec3 litDay = surfaceColor * (diffuse + 0.08) + vec3(specular);

        // Mix Day and Night
        vec3 colorOutput = mix(nightLights, litDay, dayStrength);

        // Atmospheric rim blend on planet surface (TSL formula)
        float atmosphereDayStrength = smoothstep(-0.5, 1.0, sunOrientation);
        float atmosphereMix = clamp(atmosphereDayStrength * pow(fresnel, 2.5), 0.0, 1.0);
        colorOutput = mix(colorOutput, atmosphereColor, atmosphereMix * 0.95);

        gl_FragColor = vec4(colorOutput, 1.0);
      }
    `;

    const earthMaterial = new THREE.ShaderMaterial({
      vertexShader: earthVertexShader,
      fragmentShader: earthFragmentShader,
      uniforms: {
        dayTexture: { value: dayTexture },
        nightTexture: { value: nightTexture },
        bumpRoughnessCloudsTexture: { value: bumpRoughnessCloudsTexture },
        sunDirection: { value: sunDirection },
        atmosphereDayColor: { value: new THREE.Color('#4db2ff') }, // Edolus / TSL cyan-blue
        atmosphereTwilightColor: { value: new THREE.Color('#bc490b') }, // Sunset twilight amber
        cameraWorldPos: { value: camera.position },
      },
    });

    const earthGeometry = new THREE.SphereGeometry(earthRadius, 64, 64);
    const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
    globeGroup.add(earthMesh);

    // ─── 7. Outer Atmospheric Glow Shell (Exact TSL Remap & BackSide) ───
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

        // Exact TSL formula: remap(0.73, 1.0, 1.0, 0.0).pow(3) * smoothstep(-0.5, 1.0, sunOrientation)
        float alpha = pow(clamp(remap(fresnel, 0.73, 1.0, 1.0, 0.0), 0.0, 1.0), 3.0);
        float sunOrientation = dot(vWorldNormal, sunDirection);
        alpha *= smoothstep(-0.5, 1.0, sunOrientation);

        vec3 atmosphereColor = mix(atmosphereTwilightColor, atmosphereDayColor, smoothstep(-0.25, 0.75, sunOrientation));

        gl_FragColor = vec4(atmosphereColor, alpha * 0.95);
      }
    `;

    const atmosphereMaterial = new THREE.ShaderMaterial({
      vertexShader: atmosphereVertexShader,
      fragmentShader: atmosphereFragmentShader,
      uniforms: {
        sunDirection: { value: sunDirection },
        atmosphereDayColor: { value: new THREE.Color('#4db2ff') },
        atmosphereTwilightColor: { value: new THREE.Color('#bc490b') },
        cameraWorldPos: { value: camera.position },
      },
      side: THREE.BackSide,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const atmosphereGeometry = new THREE.SphereGeometry(earthRadius * 1.04, 64, 64);
    const atmosphereMesh = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    globeGroup.add(atmosphereMesh);

    // ─── 8. Interactive Mouse Tilt & Smooth Inertia ───
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      const rect = container.getBoundingClientRect();
      const xPct = (e.clientX - rect.left) / rect.width - 0.5;
      const yPct = (e.clientY - rect.top) / rect.height - 0.5;
      targetX = xPct * 0.09;
      targetY = yPct * 0.07;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // ─── 9. Animation Loop with Performance Auto-Pause ───
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

      // Slow orbital Earth rotation (TSL rate)
      if (autoRotate) {
        earthMesh.rotation.y += delta * 0.024;
      }

      // Smooth inertia mouse response
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      camera.position.x = mouseX * 20;
      camera.position.y = 9 + mouseY * 12;
      camera.lookAt(0, -3, 0);

      // Keep camera uniform updated for Fresnel calculations
      earthMaterial.uniforms.cameraWorldPos.value.copy(camera.position);
      atmosphereMaterial.uniforms.cameraWorldPos.value.copy(camera.position);

      renderer.render(scene, camera);
    };

    animate();

    // ─── 10. Responsive Window Resize ───
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth || window.innerWidth;
      const newHeight = container.clientHeight || window.innerHeight;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(newWidth, newHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      const nowMobile = newWidth < 768;
      globeGroup.position.set(nowMobile ? 3 : 11, nowMobile ? -23.5 : -28, -4);
    };

    window.addEventListener('resize', handleResize);

    // ─── 11. Cleanup on Unmount ───
    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      earthGeometry.dispose();
      earthMaterial.dispose();
      atmosphereGeometry.dispose();
      atmosphereMaterial.dispose();
      starGeometry.dispose();
      starMaterial.dispose();
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
