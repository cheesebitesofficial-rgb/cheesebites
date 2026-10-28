import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Float, MeshWobbleMaterial } from '@react-three/drei';
import * as THREE from 'three';

// 3D Procedural Pizza Slice Lift & Cheese Pull Scene
const PizzaSliceLiftModel: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null!);
  const heroSliceRef = useRef<THREE.Group>(null!);
  const cheeseStrandsRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const mouse = state.pointer;

    // Smooth overall model tilt responding to mouse pointer
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mouse.x * 0.35 + Math.sin(time * 0.5) * 0.15, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -mouse.y * 0.25 + 0.35, 0.05);
    }

    // Dynamic 3D Slice Lift & Float movement
    if (heroSliceRef.current) {
      const liftHeight = 0.85 + Math.sin(time * 1.5) * 0.08;
      heroSliceRef.current.position.y = THREE.MathUtils.lerp(heroSliceRef.current.position.y, liftHeight, 0.08);
      heroSliceRef.current.position.z = THREE.MathUtils.lerp(heroSliceRef.current.position.z, 0.45, 0.08);
      heroSliceRef.current.position.x = THREE.MathUtils.lerp(heroSliceRef.current.position.x, 0.35, 0.08);
      heroSliceRef.current.rotation.x = 0.32 + Math.sin(time * 1.2) * 0.04;
      heroSliceRef.current.rotation.z = -0.25 + Math.cos(time * 1.2) * 0.03;
    }

    // Animated stretching cheese strands
    if (cheeseStrandsRef.current) {
      cheeseStrandsRef.current.children.forEach((child, idx) => {
        const mesh = child as THREE.Mesh;
        if (mesh) {
          mesh.scale.set(1 + Math.sin(time * 3 + idx) * 0.15, 1 + Math.cos(time * 2 + idx) * 0.1, 1);
        }
      });
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.3, 0]} scale={[1.35, 1.35, 1.35]}>
      {/* Platter / Wooden Board Base */}
      <mesh position={[0, -0.22, 0]} receiveShadow>
        <cylinderGeometry args={[2.7, 2.75, 0.15, 64]} />
        <meshStandardMaterial color="#3a2312" roughness={0.6} metalness={0.1} />
      </mesh>
      {/* Wooden Platter Handle Accent */}
      <mesh position={[0, -0.22, -3.2]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.22, 0.22, 1.2, 24]} />
        <meshStandardMaterial color="#2d1a0d" roughness={0.7} />
      </mesh>

      {/* Main Base Pizza (7 Joined Slices forming 7/8th pie) */}
      <group position={[0, 0, 0]}>
        {/* Deep Crust Outer Ring */}
        <mesh position={[0, 0.02, 0]} receiveShadow castShadow>
          <cylinderGeometry args={[2.3, 2.38, 0.32, 56, 1, false, 0, Math.PI * 1.75]} />
          <meshStandardMaterial color="#d48c3b" roughness={0.65} />
        </mesh>

        {/* Crown Stuffed Cheese Knots Edge */}
        {Array.from({ length: 10 }).map((_, i) => {
          const angle = (i / 10) * Math.PI * 1.75 + 0.1;
          const r = 2.32;
          return (
            <mesh key={i} position={[Math.cos(angle) * r, 0.2, Math.sin(angle) * r]} castShadow>
              <sphereGeometry args={[0.26, 20, 20]} />
              <meshStandardMaterial color="#e89d2c" roughness={0.5} />
            </mesh>
          );
        })}

        {/* Molten Mozzarella Cheese Bed */}
        <mesh position={[0, 0.18, 0]} receiveShadow castShadow>
          <cylinderGeometry args={[2.1, 2.1, 0.08, 56, 1, false, 0, Math.PI * 1.75]} />
          <MeshWobbleMaterial factor={0.05} speed={1.2} color="#ffbe33" roughness={0.3} metalness={0.15} />
        </mesh>

        {/* Pepperoni Slices on Base */}
        {Array.from({ length: 7 }).map((_, i) => {
          const angle = (i / 7) * Math.PI * 1.65 + 0.25;
          const r = 1.35;
          return (
            <mesh key={`pep-${i}`} position={[Math.cos(angle) * r, 0.24, Math.sin(angle) * r]} castShadow>
              <cylinderGeometry args={[0.34, 0.34, 0.03, 24]} />
              <meshStandardMaterial color="#ab2716" roughness={0.4} />
            </mesh>
          );
        })}

        {/* Green Peppers on Base */}
        {Array.from({ length: 6 }).map((_, i) => {
          const angle = (i / 6) * Math.PI * 1.7 + 0.4;
          const r = 0.85;
          return (
            <mesh key={`pep-green-${i}`} position={[Math.cos(angle) * r, 0.24, Math.sin(angle) * r]} rotation={[0, angle, 0]} castShadow>
              <boxGeometry args={[0.35, 0.04, 0.12]} />
              <meshStandardMaterial color="#2d7d32" roughness={0.4} />
            </mesh>
          );
        })}
      </group>

      {/* ============================================================ */}
      {/* HERO SEPARATED 3D PIZZA SLICE LIFTING AWAY FROM BASE */}
      {/* ============================================================ */}
      <group ref={heroSliceRef} position={[0.35, 0.85, 0.45]} rotation={[0.32, -0.4, -0.25]}>
        {/* Slice Crust Edge */}
        <mesh position={[0, 0.05, 1.4]} castShadow>
          <boxGeometry args={[1.2, 0.32, 0.35]} />
          <meshStandardMaterial color="#d48c3b" roughness={0.6} />
        </mesh>
        {/* Slice Stuffed Crown Knots */}
        <mesh position={[-0.45, 0.2, 1.45]} castShadow>
          <sphereGeometry args={[0.26, 20, 20]} />
          <meshStandardMaterial color="#e89d2c" roughness={0.5} />
        </mesh>
        <mesh position={[0.45, 0.2, 1.45]} castShadow>
          <sphereGeometry args={[0.26, 20, 20]} />
          <meshStandardMaterial color="#e89d2c" roughness={0.5} />
        </mesh>

        {/* Slice Main Triangular Body */}
        <mesh position={[0, 0.05, 0.4]} rotation={[-Math.PI / 2, 0, 0]} castShadow>
          <coneGeometry args={[0.75, 1.9, 3]} />
          <meshStandardMaterial color="#ffc038" roughness={0.3} metalness={0.1} />
        </mesh>

        {/* Slice Pepperoni Toppings */}
        <mesh position={[0, 0.16, 0.7]} castShadow>
          <cylinderGeometry args={[0.32, 0.32, 0.03, 24]} />
          <meshStandardMaterial color="#ab2716" roughness={0.4} />
        </mesh>
        <mesh position={[-0.15, 0.16, 0.15]} castShadow>
          <cylinderGeometry args={[0.28, 0.28, 0.03, 24]} />
          <meshStandardMaterial color="#ab2716" roughness={0.4} />
        </mesh>

        {/* Slice Bell Pepper & Olive Accents */}
        <mesh position={[0.18, 0.16, 0.35]} rotation={[0, 0.6, 0]} castShadow>
          <boxGeometry args={[0.3, 0.04, 0.1]} />
          <meshStandardMaterial color="#2d7d32" roughness={0.4} />
        </mesh>
        <mesh position={[-0.2, 0.16, 0.8]} castShadow>
          <torusGeometry args={[0.1, 0.04, 12, 24]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.3} />
        </mesh>
      </group>

      {/* Dynamic Molten Mozzarella Cheese Pull Strands */}
      <group ref={cheeseStrandsRef} position={[0.45, 0.28, 0.35]}>
        {Array.from({ length: 6 }).map((_, i) => {
          const x = (i - 2.5) * 0.14;
          const z = (i % 2) * 0.1;
          return (
            <mesh key={`strand-${i}`} position={[x, 0.25, z]} rotation={[0.15, 0, (i - 2.5) * -0.08]}>
              <cylinderGeometry args={[0.02, 0.04, 0.75, 12]} />
              <meshStandardMaterial color="#ffec9e" roughness={0.2} transparent opacity={0.88} />
            </mesh>
          );
        })}
      </group>

      {/* Floating 3D Topping Ingredients floating around */}
      <Float speed={2.5} rotationIntensity={0.6} floatIntensity={0.8}>
        {/* Floating Basil Leaf */}
        <mesh position={[-1.8, 1.2, 0.8]} rotation={[0.4, 0.5, -0.3]}>
          <boxGeometry args={[0.35, 0.02, 0.5]} />
          <meshStandardMaterial color="#388e3c" roughness={0.4} />
        </mesh>

        {/* Floating Pepperoni Slice */}
        <mesh position={[2.1, 1.4, -0.4]} rotation={[0.6, -0.4, 0.5]}>
          <cylinderGeometry args={[0.3, 0.3, 0.03, 24]} />
          <meshStandardMaterial color="#b71c1c" roughness={0.4} />
        </mesh>

        {/* Floating Mushroom */}
        <mesh position={[-2.2, 0.6, -1.2]} rotation={[-0.3, 0.8, 0.4]}>
          <sphereGeometry args={[0.22, 16, 16]} />
          <meshStandardMaterial color="#d7ccc8" roughness={0.5} />
        </mesh>
      </Float>
    </group>
  );
};

export const PizzaHeroCanvas: React.FC<{ className?: string }> = ({
  className = 'w-full h-full absolute inset-0 z-0 pointer-events-none',
}) => {
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 2.4, 5.5], fov: 42 }}
        shadows
        gl={{ alpha: true, antialias: true }}
      >
        {/* Lighting Setup */}
        <ambientLight intensity={0.9} />
        <directionalLight
          position={[6, 9, 6]}
          intensity={2.0}
          color="#fff6e5"
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <directionalLight position={[-6, 5, -4]} intensity={1.4} color="#ff9900" />
        <pointLight position={[0, 4, 3]} intensity={1.8} color="#ffb703" />

        {/* 3D Pizza Slice Lift Model */}
        <PizzaSliceLiftModel />

        {/* Realistic Contact Shadow */}
        <ContactShadows
          position={[0, -1.6, 0]}
          opacity={0.7}
          scale={11}
          blur={2.4}
          far={4.5}
        />

        {/* Smooth Orbit Control */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2.15}
          minPolarAngle={Math.PI / 4.5}
          rotateSpeed={0.4}
        />
      </Canvas>
    </div>
  );
};
