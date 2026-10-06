import React, { useRef, useState, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, OrbitControls, Float, Text, MeshReflectorMaterial, Sphere, Box, Cylinder } from '@react-three/drei';
import * as THREE from 'three';

const stalls = [
  { id: 'orange', name: 'Orange Citrus', color: '#ff7e00', position: [-6, 0, -4], rotation: [0, Math.PI / 4, 0] },
  { id: 'mango', name: 'Mango Sunrise', color: '#ffb300', position: [-3.5, 0, -8], rotation: [0, Math.PI / 8, 0] },
  { id: 'pineapple', name: 'Pineapple', color: '#cddc39', position: [0, 0, -9], rotation: [0, 0, 0] },
  { id: 'watermelon', name: 'Watermelon', color: '#ff4d6d', position: [3.5, 0, -8], rotation: [0, -Math.PI / 8, 0] },
  { id: 'berry', name: 'Berry Blast', color: '#9d4edd', position: [6, 0, -4], rotation: [0, -Math.PI / 4, 0] },
];

function Particles({ count = 200 }) {
  const mesh = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.01 + Math.random() / 200;
      const xFactor = -15 + Math.random() * 30;
      const yFactor = 1 + Math.random() * 15;
      const zFactor = -15 + Math.random() * 30;
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
    }
    return temp;
  }, [count]);

  useFrame(() => {
    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
      t = particle.t += speed / 2;
      const s = Math.cos(t);
      
      dummy.position.set(
        xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
        yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
        zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
      );
      dummy.scale.set(s, s, s);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[null, null, count]}>
      <sphereGeometry args={[0.04, 8, 8]} />
      <meshBasicMaterial color="#ffcc00" transparent opacity={0.5} />
    </instancedMesh>
  );
}

function Fountain() {
  const group = useRef();
  useFrame((state) => {
    group.current.rotation.y = state.clock.elapsedTime * 0.2;
  });

  return (
    <group position={[0, 0, 0]}>
      <Cylinder args={[3, 3.5, 0.5, 32]} position={[0, 0.25, 0]} castShadow receiveShadow>
        <meshStandardMaterial color="#eeeeee" roughness={0.2} metalness={0.7} />
      </Cylinder>
      <Cylinder args={[2.5, 2.5, 0.1, 32]} position={[0, 0.55, 0]} receiveShadow>
        <meshStandardMaterial color="#4fc3f7" transparent opacity={0.8} roughness={0.1} metalness={0.9} />
      </Cylinder>
      <group ref={group} position={[0, 1.5, 0]}>
        <Float speed={2} rotationIntensity={0.5} floatIntensity={2}>
          <Sphere args={[0.5, 32, 32]} castShadow>
            <meshStandardMaterial color="#81d4fa" emissive="#0277bd" emissiveIntensity={0.5} roughness={0} metalness={1} />
          </Sphere>
        </Float>
      </group>
      <pointLight position={[0, 2, 0]} color="#4fc3f7" intensity={2} distance={15} />
    </group>
  );
}

function Stall({ data, onClick }) {
  const [hovered, setHovered] = useState(false);
  const { name, color, position, rotation, id } = data;
  const group = useRef();

  useFrame((state) => {
    if (hovered && group.current) {
      group.current.scale.lerp(new THREE.Vector3(1.02, 1.02, 1.02), 0.1);
    } else if (group.current) {
      group.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
    }
  });

  return (
    <group 
      ref={group}
      position={position} 
      rotation={rotation} 
      onClick={(e) => { e.stopPropagation(); onClick?.(id); }}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
      onPointerOut={(e) => { e.stopPropagation(); setHovered(false); document.body.style.cursor = 'auto'; }}
    >
      {/* Base Counter */}
      <Box args={[3.5, 1.2, 1.5]} position={[0, 0.6, 0]} castShadow receiveShadow>
        <meshStandardMaterial color="#222" roughness={0.3} metalness={0.6} emissive={hovered ? color : '#000'} emissiveIntensity={0.15} />
      </Box>
      {/* Counter Top */}
      <Box args={[3.7, 0.1, 1.7]} position={[0, 1.25, 0]} castShadow receiveShadow>
        <meshStandardMaterial color="#fff" roughness={0.1} metalness={0.2} />
      </Box>
      
      {/* Back Wall */}
      <Box args={[3.5, 3.5, 0.2]} position={[0, 1.75, -0.65]} castShadow receiveShadow>
        <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
      </Box>

      {/* Floating Text Sign */}
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.5}>
        <Text 
          position={[0, 3.8, 0]} 
          fontSize={0.45} 
          color={color} 
          anchorX="center" 
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor={color}
        >
          {name}
        </Text>
      </Float>

      {/* Colored Light */}
      <pointLight position={[0, 2.5, 1]} color={color} intensity={hovered ? 5 : 2} distance={8} />

      {/* Bottles on counter */}
      <group position={[-0.8, 1.55, 0.2]}>
        <Cylinder args={[0.12, 0.12, 0.5, 16]} position={[0, 0, 0]} castShadow>
          <meshPhysicalMaterial color={color} transmission={0.9} opacity={1} transparent roughness={0.1} ior={1.5} thickness={0.5} />
        </Cylinder>
        <Cylinder args={[0.12, 0.12, 0.5, 16]} position={[0.4, 0, -0.15]} castShadow>
          <meshPhysicalMaterial color={color} transmission={0.9} opacity={1} transparent roughness={0.1} ior={1.5} thickness={0.5} />
        </Cylinder>
        <Cylinder args={[0.12, 0.12, 0.5, 16]} position={[0.2, 0, 0.2]} castShadow>
          <meshPhysicalMaterial color={color} transmission={0.9} opacity={1} transparent roughness={0.1} ior={1.5} thickness={0.5} />
        </Cylinder>
      </group>
    </group>
  );
}

function Scene({ onStallClick }) {
  return (
    <>
      <color attach="background" args={['#050505']} />
      <fog attach="fog" args={['#050505', 10, 35]} />
      
      <Environment preset="night" />
      
      <ambientLight intensity={0.1} />
      <directionalLight position={[10, 20, 5]} intensity={0.5} castShadow shadow-mapSize={[2048, 2048]} />
      
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[60, 60]} />
        <MeshReflectorMaterial
          blur={[400, 100]}
          resolution={1024}
          mixBlur={1}
          mixStrength={50}
          roughness={0.1}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#0a0a0a"
          metalness={0.5}
        />
      </mesh>

      <Fountain />

      {stalls.map((stall) => (
        <Stall key={stall.id} data={stall} onClick={onStallClick} />
      ))}

      <Particles count={250} />
      
      <OrbitControls 
        enablePan={false} 
        enableZoom={true}
        minDistance={5}
        maxDistance={25}
        maxPolarAngle={Math.PI / 2 - 0.05}
        autoRotate
        autoRotateSpeed={0.5}
        makeDefault
      />
    </>
  );
}

export default function MallScene({ onStallClick, className = '', style = {} }) {
  return (
    <div className={`w-full h-full min-h-[360px] sm:min-h-[460px] md:min-h-[540px] lg:min-h-[600px] ${className}`} style={style}>
      <Canvas shadows dpr={[1, 1.5]} camera={{ position: [0, 6, 16], fov: 45 }}>
        <Suspense fallback={null}>
          <Scene onStallClick={onStallClick} />
        </Suspense>
      </Canvas>
    </div>
  );
}
