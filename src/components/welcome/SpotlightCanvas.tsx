import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface AtmosphericMotesProps {
  count?: number;
  velocity?: number;
}

function AtmosphericMotes({ count = 160, velocity = 0 }: AtmosphericMotesProps) {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 16;
      spd[i] = Math.random() * 0.3 + 0.1;
    }
    return [pos, spd];
  }, [count]);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      const positionsAttr = pointsRef.current.geometry.attributes.position;
      const array = positionsAttr.array as Float32Array;

      // 3D forward stream along Z: ambient drift + scroll velocity warp
      const scrollPush = velocity * 45;

      for (let i = 0; i < count; i++) {
        // Slow ambient vertical float
        array[i * 3 + 1] += speeds[i] * delta * 0.2;
        if (array[i * 3 + 1] > 6) array[i * 3 + 1] = -6;

        // Move along Z toward camera
        array[i * 3 + 2] += (speeds[i] * 0.6 + scrollPush) * delta * 2.8;

        // Wrap around Z bounds (-12 to +7)
        if (array[i * 3 + 2] > 6.8) {
          array[i * 3 + 2] = -11.5;
          array[i * 3] = (Math.random() - 0.5) * 16;
          array[i * 3 + 1] = (Math.random() - 0.5) * 12;
        } else if (array[i * 3 + 2] < -12) {
          array[i * 3 + 2] = 6.5;
          array[i * 3] = (Math.random() - 0.5) * 16;
          array[i * 3 + 1] = (Math.random() - 0.5) * 12;
        }
      }
      positionsAttr.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        color="#fed7aa"
        transparent
        opacity={0.45}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export default function SpotlightCanvas({ velocity = 0 }: { velocity?: number }) {
  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.1} />
        <AtmosphericMotes velocity={velocity} />
      </Canvas>
    </div>
  );
}

