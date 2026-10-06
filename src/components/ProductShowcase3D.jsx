import React, { useRef, useMemo, useState, useCallback, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  Environment, 
  Float, 
  MeshTransmissionMaterial, 
  Sphere, 
  Cylinder, 
  Box, 
  Points, 
  PointMaterial, 
  SpotLight, 
  ContactShadows 
} from '@react-three/drei';
import * as THREE from 'three';

export const SHOWCASE_PRODUCTS = [
  { id: 'orange', name: 'Fresh Orange', preset: 'orange', color: '#ff8c00', price: '$4.99' },
  { id: 'mango', name: 'Mango Magic', preset: 'mango', color: '#f5c518', price: '$5.49' },
  { id: 'watermelon', name: 'Watermelon Splash', preset: 'watermelon', color: '#e11d48', price: '$4.99' },
  { id: 'berry', name: 'Berry Blast', preset: 'berry', color: '#7c3aed', price: '$5.99' },
  { id: 'pineapple', name: 'Pineapple Paradise', preset: 'pineapple', color: '#84cc16', price: '$5.49' }
];

function Bottle({ color, active, position, rotation, onClick, scale = 1 }) {
  const group = useRef();
  
  useFrame((state, delta) => {
    // Lerp position, rotation, and scale based on active state
    const targetScale = active ? scale * 1.3 : scale;
    const targetY = active ? position[1] + 1.5 : position[1];
    const targetZ = active ? position[2] + 1.5 : position[2];
    
    group.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    group.current.position.lerp(new THREE.Vector3(position[0], targetY, targetZ), 0.1);
  });

  return (
    <group ref={group} position={position} rotation={rotation} onClick={onClick}>
      {/* Bottle Glass */}
      <mesh castShadow receiveShadow position={[0, 1.5, 0]}>
        <cylinderGeometry args={[0.6, 0.6, 3, 32]} />
        <MeshTransmissionMaterial 
          backside 
          samples={4} 
          thickness={0.2} 
          chromaticAberration={0.05} 
          anisotropy={0.1} 
          distortion={0.1} 
          distortionScale={0.3} 
          temporalDistortion={0.1} 
          ior={1.5} 
          color="#ffffff" 
        />
      </mesh>

      {/* Liquid */}
      <mesh position={[0, 1.3, 0]}>
        <cylinderGeometry args={[0.55, 0.55, 2.6, 32]} />
        <meshPhysicalMaterial 
          color={color} 
          transparent 
          opacity={0.9} 
          roughness={0.2} 
          transmission={0.5} 
        />
      </mesh>

      {/* Cap */}
      <mesh position={[0, 3.1, 0]}>
        <cylinderGeometry args={[0.6, 0.6, 0.2, 32]} />
        <meshStandardMaterial color="#ffd700" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Label */}
      <mesh position={[0, 1.5, 0]}>
        <cylinderGeometry args={[0.61, 0.61, 1.2, 32]} />
        <meshStandardMaterial color="#222222" metalness={0.1} roughness={0.8} />
      </mesh>
      
      {/* Bubbles */}
      <Points limit={20}>
        <sphereGeometry args={[0.5, 16, 16]} />
        <pointsMaterial size={0.05} color="#ffffff" transparent opacity={0.5} />
      </Points>
      
      {/* Light for active bottle */}
      {active && <pointLight color={color} intensity={2} distance={5} position={[0, 1.5, 1]} />}
    </group>
  );
}

function Platform({ activeIndex, scrollProgress }) {
  const group = useRef();
  
  useFrame(() => {
    // Scroll progress from 0 to 1 cycles through the 5 products
    // The base index should map the first item to face the camera.
    // 0 progress -> 0 rotation.
    const targetRotation = -scrollProgress * Math.PI * 2;
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetRotation, 0.1);
  });

  const radius = 3;

  return (
    <group ref={group} position={[0, -2, 0]}>
      {/* Base */}
      <mesh receiveShadow position={[0, -0.2, 0]}>
        <cylinderGeometry args={[5, 5, 0.4, 64]} />
        <meshStandardMaterial color="#111111" metalness={0.9} roughness={0.1} />
      </mesh>
      
      {/* Gold Trim */}
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[4.8, 5, 64]} />
        <meshStandardMaterial color="#ffd700" metalness={0.8} roughness={0.2} side={THREE.DoubleSide} />
      </mesh>

      {SHOWCASE_PRODUCTS.map((product, i) => {
        const angle = (i / SHOWCASE_PRODUCTS.length) * Math.PI * 2;
        const x = Math.sin(angle) * radius;
        const z = Math.cos(angle) * radius;
        
        return (
          <Bottle 
            key={product.id}
            color={product.color}
            active={activeIndex === i}
            position={[x, 0, z]}
            rotation={[0, angle, 0]}
          />
        );
      })}
    </group>
  );
}

function Particles() {
  const count = 200;
  const positions = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 10;
      p[i * 3 + 1] = (Math.random() - 0.5) * 10;
      p[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return p;
  }, [count]);

  const ref = useRef();
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y -= delta * 0.05;
      ref.current.rotation.x -= delta * 0.05;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial transparent color="#ffd700" size={0.05} sizeAttenuation={true} depthWrite={false} />
    </Points>
  );
}

export default function ProductShowcase3D({ activeIndex = 0, scrollProgress = 0, onProductClick, className, style }) {
  const activeProduct = SHOWCASE_PRODUCTS[activeIndex] || SHOWCASE_PRODUCTS[0];

  return (
    <div className={className} style={{ width: '100%', height: '100%', minHeight: '340px', ...style }}>
      <Canvas shadows camera={{ position: [0, 2, 10], fov: 45 }}>
        <color attach="background" args={['#050505']} />
        
        <ambientLight intensity={0.5} />
        
        <SpotLight
          position={[0, 10, 5]}
          angle={0.3}
          penumbra={1}
          intensity={4}
          castShadow
          color="#ffffff"
        />
        
        <SpotLight
          position={[0, 5, 10]}
          angle={0.5}
          penumbra={1}
          intensity={2}
          color={activeProduct.color}
        />

        <Suspense fallback={null}>
          <Platform activeIndex={activeIndex} scrollProgress={scrollProgress} />
          <Particles />
          <Environment preset="city" />
          <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={20} blur={2} far={4} />
        </Suspense>
      </Canvas>
    </div>
  );
}
