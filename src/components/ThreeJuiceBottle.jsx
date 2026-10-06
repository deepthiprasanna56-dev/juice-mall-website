/* eslint-disable react-refresh/only-export-components */
import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box, Environment, Float, MeshTransmissionMaterial, Sphere, Cylinder } from '@react-three/drei';
import * as THREE from 'three';

/* ─── Liquid preset colors ─── */
export const PRESETS = {
  orange:     { liquid: '#ff8c00', cap: '#d4af37', glow: '#ff6a00', emissive: '#ff4500' },
  mango:      { liquid: '#f5c518', cap: '#d4af37', glow: '#e5a10a', emissive: '#c8880a' },
  watermelon: { liquid: '#e11d48', cap: '#d4af37', glow: '#be123c', emissive: '#9f1239' },
  berry:      { liquid: '#7c3aed', cap: '#d4af37', glow: '#6d28d9', emissive: '#4c1d95' },
  pineapple:  { liquid: '#84cc16', cap: '#d4af37', glow: '#65a30d', emissive: '#4d7c0f' },
  default:    { liquid: '#ff8c00', cap: '#d4af37', glow: '#ff6a00', emissive: '#ff4500' },
};

/* ─── Glass bottle mesh ─── */
function JuiceBottleMesh({ preset = 'default', featured = false }) {
  const groupRef  = useRef();
  const liquidRef = useRef();
  const capRef    = useRef();
  const glowRef   = useRef();
  const colors    = PRESETS[preset] ?? PRESETS.default;
  const scale     = featured ? 1.3 : 1.0;

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      // One complete, continuous 360° turn every ~9 seconds.
      groupRef.current.rotation.y = t * 0.7;
    }
    if (liquidRef.current) {
      liquidRef.current.position.y = -0.08 + Math.sin(t * 1.8) * 0.018;
    }
    if (glowRef.current) {
      glowRef.current.intensity = 1.2 + Math.sin(t * 2.5) * 0.4;
    }
  });

  const liquidColor = new THREE.Color(colors.liquid);
  const glowColor   = new THREE.Color(colors.glow);
  const capColor    = new THREE.Color(colors.cap);

  return (
    <group ref={groupRef} scale={scale}>
      {/* Inner point light — gives the glow-from-within effect */}
      <pointLight ref={glowRef} color={glowColor} intensity={1.8} distance={3.5} position={[0, -0.1, 0]} />

      {/* Liquid fill */}
      <Cylinder ref={liquidRef} args={[0.32, 0.36, 0.95, 32]} position={[0, -0.08, 0]}>
        <meshStandardMaterial color={liquidColor} transparent opacity={0.88} roughness={0.0} metalness={0.1} emissive={new THREE.Color(colors.emissive)} emissiveIntensity={0.35} />
      </Cylinder>

      {/* Glass body — MeshTransmissionMaterial gives real glass look */}
      <Cylinder args={[0.37, 0.40, 1.55, 48]} position={[0, 0, 0]}>
        <MeshTransmissionMaterial
          samples={8}
          resolution={256}
          transmission={0.96}
          thickness={0.4}
          roughness={0.04}
          ior={1.52}
          chromaticAberration={0.03}
          color="#e8f4ff"
          backside
        />
      </Cylinder>

      {/* Shoulder taper */}
      <Cylinder args={[0.18, 0.37, 0.38, 32]} position={[0, 0.965, 0]}>
        <MeshTransmissionMaterial transmission={0.94} thickness={0.3} roughness={0.04} ior={1.52} color="#d8eeff" backside />
      </Cylinder>

      {/* Neck */}
      <Cylinder args={[0.14, 0.18, 0.28, 24]} position={[0, 1.31, 0]}>
        <MeshTransmissionMaterial transmission={0.94} thickness={0.3} roughness={0.04} ior={1.52} color="#d8eeff" backside />
      </Cylinder>

      {/* Gold cap */}
      <Cylinder ref={capRef} args={[0.155, 0.145, 0.22, 24]} position={[0, 1.53, 0]}>
        <meshStandardMaterial color={capColor} metalness={1.0} roughness={0.12} emissive={capColor} emissiveIntensity={0.15} />
      </Cylinder>

      {/* Gold cap top rim */}
      <Cylinder args={[0.16, 0.16, 0.025, 24]} position={[0, 1.645, 0]}>
        <meshStandardMaterial color={capColor} metalness={1.0} roughness={0.1} />
      </Cylinder>

      {/* Label band */}
      <Cylinder args={[0.375, 0.405, 0.55, 48]} position={[0, -0.05, 0]}>
        <meshStandardMaterial color={new THREE.Color(colors.liquid).multiplyScalar(0.6)} metalness={0.05} roughness={0.5} transparent opacity={0.65} />
      </Cylinder>

      {/* Bottom base ring */}
      <Cylinder args={[0.41, 0.38, 0.06, 48]} position={[0, -0.79, 0]}>
        <meshStandardMaterial color="#c0c0c0" metalness={0.4} roughness={0.2} />
      </Cylinder>

      {/* Bubbles */}
      {Array.from({ length: 14 }, (_, i) => {
        const angle  = (i / 14) * Math.PI * 2;
        const radius = 0.15 + ((i * 37) % 12) / 100;
        return (
          <Bubble
            key={i}
            position={[Math.cos(angle) * radius, -0.5 + i * 0.08, Math.sin(angle) * radius]}
            speed={0.3 + i * 0.07}
            delay={i * 0.25}
            color={colors.liquid}
            size={0.012 + ((i * 17) % 18) / 1000}
          />
        );
      })}
    </group>
  );
}

/* ─── Single rising bubble ─── */
function Bubble({ position, speed, delay, color, size }) {
  const ref  = useRef();
  useFrame(({ clock }) => {
    const t = (clock.getElapsedTime() + delay) * speed;
    if (ref.current) {
      ref.current.position.y = position[1] + ((t % 1.2) - 0.1) * 0.9;
      ref.current.scale.setScalar(1 + Math.sin(t * 3) * 0.15);
    }
  });
  return (
    <Sphere ref={ref} args={[size, 8, 8]} position={position}>
      <meshStandardMaterial color={color} transparent opacity={0.55} roughness={0.0} />
    </Sphere>
  );
}

/* ─── Floating fruit orbs ─── */
function FloatingFruit({ position, delay = 0, fruit = 'orange' }) {
  const ref = useRef();
  const fruitStyle = {
    orange: { color: '#f28a19', scale: [1, 1, 0.88], leaf: '#54733a' },
    lemon: { color: '#f4d74b', scale: [1.18, 0.76, 0.76], leaf: '#5b7d3b' },
    lime: { color: '#82a944', scale: [1, 0.92, 0.84], leaf: '#466b35' },
    apple: { color: '#ce4434', scale: [0.9, 1.05, 0.82], leaf: '#456c37' },
  }[fruit];
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() + delay;
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(t * 0.6) * 0.18;
      ref.current.rotation.y = t * 0.4;
      ref.current.rotation.z = Math.sin(t * 0.45) * 0.12;
    }
  });
  return (
    <group ref={ref} position={position}>
      <Sphere args={[0.22, 24, 24]} scale={fruitStyle.scale}>
        <meshStandardMaterial color={fruitStyle.color} roughness={0.32} metalness={0.02} />
      </Sphere>
      <Cylinder args={[0.025, 0.035, 0.09, 8]} position={[0, 0.205, 0]}>
        <meshStandardMaterial color="#60432b" roughness={0.75} />
      </Cylinder>
      <Sphere args={[0.12, 16, 12]} position={[0.105, 0.21, 0]} scale={[1, 0.18, 0.48]} rotation={[0, 0, 0.42]}>
        <meshStandardMaterial color={fruitStyle.leaf} roughness={0.58} />
      </Sphere>
    </group>
  );
}

function CitrusSlice({ position, delay = 0, color = '#ffad32' }) {
  const ref = useRef();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() + delay;
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(t * 0.7) * 0.14;
      ref.current.rotation.z = Math.sin(t * 0.45) * 0.16;
      ref.current.rotation.y = Math.sin(t * 0.3) * 0.12;
    }
  });
  return (
    <group ref={ref} position={position} rotation={[Math.PI / 2, 0.15, 0]}>
      <Cylinder args={[0.2, 0.2, 0.055, 32]}>
        <meshStandardMaterial color="#ef8b22" roughness={0.38} />
      </Cylinder>
      <Cylinder args={[0.17, 0.17, 0.06, 32]} position={[0, 0, 0.008]}>
        <meshStandardMaterial color="#fff0c1" roughness={0.62} />
      </Cylinder>
      <Cylinder args={[0.145, 0.145, 0.065, 32]} position={[0, 0, 0.014]}>
        <meshStandardMaterial color={color} roughness={0.42} />
      </Cylinder>
      {Array.from({ length: 6 }, (_, i) => (
        <Box key={i} args={[0.008, 0.105, 0.008]} position={[0, 0, 0.052]} rotation={[0, 0, i * Math.PI / 3]}>
          <meshStandardMaterial color="#fff0c1" roughness={0.7} />
        </Box>
      ))}
      <Cylinder args={[0.018, 0.018, 0.012, 12]} position={[0, 0, 0.055]}>
        <meshStandardMaterial color="#fff3d4" roughness={0.65} />
      </Cylinder>
    </group>
  );
}

/* ─── Public exports ─── */
export function JuiceBottleScene({ preset = 'default', featured = false, fruits = false }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.2], fov: 40 }}
      dpr={[1, 1.5]}
      style={{ width: '100%', height: '100%' }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 6, 4]} intensity={1.2} castShadow />
      <directionalLight position={[-4, -2, -4]} intensity={0.4} color="#ffe4c4" />
      <Suspense fallback={null}>
        <Environment preset="city" />
        <Cylinder args={[0.68, 0.76, 0.12, 48]} position={[0, -1.19, 0]}>
          <meshStandardMaterial color="#55545a" metalness={0.92} roughness={0.2} />
        </Cylinder>
        <Cylinder args={[0.72, 0.72, 0.025, 48]} position={[0, -1.115, 0]}>
          <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.17} />
        </Cylinder>
        <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.4}>
          <JuiceBottleMesh preset={preset} featured={featured} />
        </Float>
        {fruits && (
          <>
            <FloatingFruit position={[-1.15, 0.62, -0.35]} delay={0} fruit="orange" />
            <FloatingFruit position={[1.12, 0.42, -0.45]} delay={1.2} fruit="lime" />
            <FloatingFruit position={[-1.05, -0.62, -0.25]} delay={2.4} fruit="apple" />
            <FloatingFruit position={[1.12, -0.72, -0.3]} delay={0.8} fruit="lemon" />
            <CitrusSlice position={[-1.38, -0.02, 0.1]} delay={0.4} />
            <CitrusSlice position={[1.34, -0.12, 0]} delay={1.8} color="#f6d34e" />
          </>
        )}
      </Suspense>
    </Canvas>
  );
}

/* Default export keeps backward compat with lazy-import in Hero */
export default function ThreeJuiceBottle({ preset = 'default', featured = false, fruits = false }) {
  return <JuiceBottleScene preset={preset} featured={featured} fruits={fruits} />;
}
