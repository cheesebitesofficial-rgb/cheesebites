import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticlesProps {
  count?: number;
  color?: string;
}

const ParticlePoints: React.FC<ParticlesProps> = ({ count = 80, color = '#f59e0b' }) => {
  const meshRef = useRef<THREE.Points>(null!);

  const { positions, speeds } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;

      spd[i * 3] = (Math.random() - 0.5) * 0.005;
      spd[i * 3 + 1] = Math.random() * 0.008 + 0.002; // Upward float
      spd[i * 3 + 2] = (Math.random() - 0.5) * 0.005;
    }

    return { positions: pos, speeds: spd };
  }, [count]);

  useFrame(() => {
    if (!meshRef.current) return;
    const geom = meshRef.current.geometry;
    const posAttr = geom.attributes.position as THREE.BufferAttribute;
    const array = posAttr.array as Float32Array;

    for (let i = 0; i < count; i++) {
      array[i * 3] += speeds[i * 3];
      array[i * 3 + 1] += speeds[i * 3 + 1];
      array[i * 3 + 2] += speeds[i * 3 + 2];

      // Reset when particle floats too high
      if (array[i * 3 + 1] > 5) {
        array[i * 3 + 1] = -5;
        array[i * 3] = (Math.random() - 0.5) * 12;
      }
    }
    posAttr.needsUpdate = true;
    meshRef.current.rotation.y += 0.001;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.12}
        color={color}
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

export const AmbientParticleSystem: React.FC<{ count?: number; color?: string; className?: string }> = ({
  count = 80,
  color = '#f59e0b',
  className = 'w-full h-full absolute inset-0 pointer-events-none z-0',
}) => {
  return (
    <div className={className}>
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }} gl={{ alpha: true }}>
        <ParticlePoints count={count} color={color} />
      </Canvas>
    </div>
  );
};
