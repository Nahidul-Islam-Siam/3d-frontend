import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import * as THREE from 'three';

interface InteractiveShapeProps {
  position?: [number, number, number];
}

function FloatingMesh({ position = [0, 0, 0] }: InteractiveShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.4;
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <Float
      speed={2.5}
      rotationIntensity={1.2}
      floatIntensity={2}
      floatingRange={[-0.2, 0.2]}
    >
      <mesh
        ref={meshRef}
        position={position}
        scale={clicked ? 1.3 : hovered ? 1.15 : 1}
        onClick={() => setClicked(!clicked)}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={() => setHovered(false)}
      >
        <icosahedronGeometry args={[1.5, 1]} />
        <meshStandardMaterial
          color={hovered ? '#6366f1' : '#3b82f6'}
          roughness={0.2}
          metalness={0.8}
          wireframe={clicked}
        />
      </mesh>
    </Float>
  );
}

export default function Scene() {
  return (
    <div className="relative w-full h-full min-h-[400px] overflow-hidden rounded-2xl bg-gradient-to-b from-slate-950/60 to-black/80 backdrop-blur-md border border-border/40 shadow-2xl">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={[1, 2]}
        className="w-full h-full"
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-10, -10, -5]} intensity={0.8} color="#a855f7" />
        
        <FloatingMesh />
        
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.8}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>

      <div className="pointer-events-none absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-muted-foreground/80 px-2">
        <span>Click mesh to toggle wireframe - Drag to rotate</span>
        <span className="font-mono text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded border border-primary/20">
          R3F / Three.js
        </span>
      </div>
    </div>
  );
}
