import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

// 3D Mozzarella Cube
const MozzarellaBlock: React.FC<{ position: [number, number, number]; rotation?: [number, number, number] }> = ({ position, rotation = [0, 0, 0] }) => {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.008;
      ref.current.rotation.x += 0.004;
    }
  });

  return (
    <mesh ref={ref} position={position} rotation={rotation} castShadow>
      <boxGeometry args={[0.6, 0.6, 0.6]} />
      <meshStandardMaterial color="#fffbe6" roughness={0.3} metalness={0.1} />
    </mesh>
  );
};

// 3D Ripe Tomato Slice
const TomatoSlice: React.FC<{ position: [number, number, number]; rotation?: [number, number, number] }> = ({ position, rotation = [0, 0, 0] }) => {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.z += 0.006;
    }
  });

  return (
    <mesh ref={ref} position={position} rotation={rotation} castShadow>
      <cylinderGeometry args={[0.5, 0.5, 0.12, 24]} />
      <meshStandardMaterial color="#e63946" roughness={0.4} />
    </mesh>
  );
};

// 3D Fresh Basil Leaf
const BasilLeaf: React.FC<{ position: [number, number, number]; rotation?: [number, number, number] }> = ({ position, rotation = [0, 0, 0] }) => {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={ref} position={position} rotation={rotation} castShadow>
      <sphereGeometry args={[0.4, 16, 8]} />
      <meshStandardMaterial color="#2a9d8f" roughness={0.5} />
    </mesh>
  );
};

// 3D Onion Ring
const OnionRing: React.FC<{ position: [number, number, number]; rotation?: [number, number, number] }> = ({ position, rotation = [0, 0, 0] }) => {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.x += 0.007;
    }
  });

  return (
    <mesh ref={ref} position={position} rotation={rotation} castShadow>
      <torusGeometry args={[0.45, 0.06, 16, 32]} />
      <meshStandardMaterial color="#d8b4e2" roughness={0.4} />
    </mesh>
  );
};

export const IngredientsAssemblyCanvas: React.FC<{ className?: string }> = ({ className = 'w-full h-full absolute inset-0 z-0' }) => {
  return (
    <div className={className}>
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }} gl={{ alpha: true, antialias: true }}>
        <ambientLight intensity={0.9} />
        <directionalLight position={[4, 6, 4]} intensity={1.5} color="#ffecd1" castShadow />
        <pointLight position={[-3, -2, 2]} intensity={1.2} color="#f59e0b" />

        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
          <MozzarellaBlock position={[-2.2, 1.2, 0]} rotation={[0.4, 0.2, 0]} />
          <TomatoSlice position={[2.0, 1.5, -0.5]} rotation={[0.8, -0.4, 0]} />
          <BasilLeaf position={[-1.8, -1.2, 0.5]} rotation={[-0.3, 0.5, 0.2]} />
          <OnionRing position={[2.2, -1.0, -0.2]} rotation={[0.5, 0, 0.4]} />
          <MozzarellaBlock position={[0.2, -1.8, -1]} rotation={[0.1, -0.5, 0.3]} />
        </Float>

        <ContactShadows position={[0, -2.5, 0]} opacity={0.4} scale={10} blur={2.5} far={4} />
      </Canvas>
    </div>
  );
};
