import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

function CapsuleMouse() {
  const beadRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (beadRef.current) {
      // Smooth oscillating downward scroll motion
      const t = clock.getElapsedTime() * 2.2;
      const progress = (Math.sin(t) + 1) / 2; // 0 to 1
      beadRef.current.position.y = 0.28 - progress * 0.56;
      
      // Fade out near bottom of cycle
      const mat = beadRef.current.material as THREE.MeshBasicMaterial;
      if (mat) {
        mat.opacity = 0.3 + (1 - progress) * 0.7;
      }
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.3}>
      <group>
        {/* Outer Minimal Capsule Frame */}
        <mesh position={[0, 0, 0]}>
          <capsuleGeometry args={[0.3, 0.7, 16, 32]} />
          <meshBasicMaterial
            color="#FAF4E6"
            wireframe
            transparent
            opacity={0.35}
          />
        </mesh>

        {/* Inner Solid Capsule with Glass Glow */}
        <mesh position={[0, 0, 0]}>
          <capsuleGeometry args={[0.29, 0.68, 16, 32]} />
          <meshStandardMaterial
            color="#1c1917"
            roughness={0.2}
            metalness={0.8}
            transparent
            opacity={0.4}
          />
        </mesh>

        {/* Animated 3D Scroll Bead */}
        <mesh ref={beadRef} position={[0, 0.28, 0]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshBasicMaterial color="#F97316" transparent opacity={0.9} />
        </mesh>
      </group>
    </Float>
  );
}

interface ScrollIndicator3DProps {
  onClick?: () => void;
}

export default function ScrollIndicator3D({ onClick }: ScrollIndicator3DProps) {
  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label="Scroll to explore"
      className="group flex flex-col items-center gap-1.5 cursor-pointer select-none transition-transform hover:scale-110"
    >
      <div className="w-12 h-16 pointer-events-none">
        <Canvas
          camera={{ position: [0, 0, 2.4], fov: 40 }}
          gl={{ antialias: true, alpha: true }}
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[0, 2, 2]} intensity={2} color="#f97316" />
          <CapsuleMouse />
        </Canvas>
      </div>

      <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-stone-400 group-hover:text-white transition-colors drop-shadow">
        SCROLL
      </span>
    </div>
  );
}

