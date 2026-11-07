import { useEffect, useRef, useState, type RefObject } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import InteractiveCoinCanvas from './InteractiveCoinCanvas';
import headsUrl from '@/assets/donate/coin-heads-final.png';
import headsBumpUrl from '@/assets/donate/coin-heads-bump.png';
import tailsUrl from '@/assets/donate/coin-tails-final.png';
import tailsBumpUrl from '@/assets/donate/coin-tails-bump.png';

export interface Coin3DCanvasProps {
  className?: string;
  onFlipEnd?: (side: 'heads' | 'tails') => void;
  /** Already damped stage progress. Reading a ref avoids React renders per frame. */
  progressRef?: RefObject<number>;
}

export default function Coin3DCanvas(props: Coin3DCanvasProps) {
  return props.progressRef
    ? <ScrollCoinCanvas progressRef={props.progressRef} className={props.className} />
    : <InteractiveCoinCanvas className={props.className} onFlipEnd={props.onFlipEnd} />;
}

function ScrollCoinCanvas({ progressRef, className = '' }: {
  progressRef: RefObject<number>;
  className?: string;
}) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
    } catch {
      // The textured image remains visible when WebGL is unavailable.
      return;
    }
    let disposed = false;
    let frame = 0;
    let visible = false;
    let previousTime = 0;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 50);
    camera.position.z = 9.4;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.95;
    mount.appendChild(renderer.domElement);

    // Metals need reflected light as well as direct lights to retain their relief.
    const pmrem = new THREE.PMREMGenerator(renderer);
    const room = new RoomEnvironment();
    const environment = pmrem.fromScene(room, 0.04);
    scene.environment = environment.texture;
    scene.environmentIntensity = 1.1;
    room.dispose();
    pmrem.dispose();

    const textures: THREE.Texture[] = [];
    const loader = new THREE.TextureLoader();
    let loaded = 0;
    const load = (url: string, color: boolean) => {
      const texture = loader.load(url, () => {
        if (disposed) { texture.dispose(); return; }
        loaded += 1;
        if (loaded === 4) setReady(true);
      });
      if (color) texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
      textures.push(texture);
      return texture;
    };
    const heads = load(headsUrl, true);
    const headsBump = load(headsBumpUrl, false);
    const tails = load(tailsUrl, true);
    const tailsBump = load(tailsBumpUrl, false);

    const edgeCanvas = document.createElement('canvas');
    edgeCanvas.width = 1024;
    edgeCanvas.height = 32;
    const context = edgeCanvas.getContext('2d');
    if (context) {
      context.fillStyle = '#D4AF37';
      context.fillRect(0, 0, 1024, 32);
      for (let x = 0; x < 1024; x += 8) {
        context.fillStyle = '#B8860B';
        context.fillRect(x, 0, 3, 32);
        context.fillStyle = '#f5d886';
        context.fillRect(x + 3, 0, 2, 32);
      }
    }
    const edgeTexture = new THREE.CanvasTexture(edgeCanvas);
    edgeTexture.colorSpace = THREE.SRGBColorSpace;
    textures.push(edgeTexture);
    const rim = new THREE.MeshStandardMaterial({
      color: '#D4AF37', map: edgeTexture, bumpMap: edgeTexture,
      bumpScale: 0.035, metalness: 0.9, roughness: 0.3,
    });
    const face = (map: THREE.Texture, bumpMap: THREE.Texture) => new THREE.MeshStandardMaterial({
      color: '#d4af6a', map, bumpMap, bumpScale: 0.045, metalness: 0.85, roughness: 0.28,
    });
    const materials = [rim, face(heads, headsBump), face(tails, tailsBump)];
    const geometry = new THREE.CylinderGeometry(2.2, 2.2, 0.2, 128, 1);
    // Bake the cylinder's Y axis into Z. Heads now faces the camera at rotation.y = 0.
    geometry.rotateX(Math.PI / 2);
    // Map each cap in world XY so both artwork faces are upright and never mirrored.
    const positions = geometry.getAttribute('position');
    const uv = geometry.getAttribute('uv');
    for (const group of geometry.groups.slice(1)) {
      const index = geometry.getIndex();
      if (!index) continue;
      for (let i = group.start; i < group.start + group.count; i++) {
        const vertex = index.getX(i);
        const x = positions.getX(vertex) / 4.4;
        uv.setXY(vertex, 0.5 + (group.materialIndex === 2 ? -x : x), 0.5 + positions.getY(vertex) / 4.4);
      }
    }
    uv.needsUpdate = true;
    const coin = new THREE.Mesh(geometry, materials);
    scene.add(coin);
    scene.add(new THREE.AmbientLight('#fff0dc', 0.8));
    const key = new THREE.DirectionalLight('#fff7e7', 3.5);
    key.position.set(-3, 4, 6);
    const warm = new THREE.DirectionalLight('#FFA500', 2);
    warm.position.set(5, 1, -3);
    const rimLight = new THREE.DirectionalLight('#F97316', 2.5);
    rimLight.position.set(-4, -2, -2);
    scene.add(key, warm, rimLight);

    let pointerX = 0;
    let pointerY = 0;
    let tiltX = 0;
    let tiltY = 0;
    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      const rect = mount.getBoundingClientRect();
      pointerX = THREE.MathUtils.clamp((event.clientX - rect.left) / rect.width * 2 - 1, -1, 1);
      pointerY = THREE.MathUtils.clamp((event.clientY - rect.top) / rect.height * 2 - 1, -1, 1);
    };
    const resetPointer = () => { pointerX = 0; pointerY = 0; };
    mount.addEventListener('pointermove', onMove, { passive: true });
    mount.addEventListener('pointerleave', resetPointer);
    const resize = new ResizeObserver(() => {
      const { width, height } = mount.getBoundingClientRect();
      if (!width || !height) return;
      camera.aspect = width / height;
      // Keep the whole coin in view, even in narrow portrait containers.
      camera.position.z = 9.4 / Math.min(camera.aspect, 1);
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    });
    resize.observe(mount);

    const render = (time: number) => {
      if (disposed || !visible) return;
      const delta = Math.min((time - previousTime) / 1000, 0.05);
      previousTime = time;
      const damping = 1 - Math.exp(-10 * delta);
      tiltX += (pointerY * Math.PI / 18 - tiltX) * damping;
      tiltY += (pointerX * Math.PI / 18 - tiltY) * damping;
      const p = THREE.MathUtils.clamp(progressRef.current, 0, 1);
      // Hold heads, turn through the edge at 0.5, then settle on tails.
      const turn = THREE.MathUtils.smoothstep(p, 0.28, 0.72);
      coin.rotation.set(0.07 + tiltX, turn * Math.PI + tiltY, -0.035);
      renderer.render(scene, camera);
      frame = requestAnimationFrame(render);
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(frame);
      if (visible) {
        previousTime = performance.now();
        frame = requestAnimationFrame(render);
      }
    }, { rootMargin: '100px' });
    observer.observe(mount);

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      resize.disconnect();
      mount.removeEventListener('pointermove', onMove);
      mount.removeEventListener('pointerleave', resetPointer);
      geometry.dispose();
      materials.forEach(material => material.dispose());
      textures.forEach(texture => texture.dispose());
      environment.dispose();
      scene.clear();
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
    };
  }, [progressRef]);

  return (
    <div className={`relative ${className}`} role="img" aria-label="A gold coin turns from heads through its reeded edge to tails as you scroll.">
      <img src={headsUrl} alt="" aria-hidden="true" className={`absolute inset-0 m-auto w-3/4 h-3/4 object-contain ${ready ? 'invisible' : ''}`} />
      <div ref={mountRef} className={`absolute inset-0 ${ready ? 'opacity-100' : 'opacity-0'}`} aria-hidden="true" />
    </div>
  );
}
