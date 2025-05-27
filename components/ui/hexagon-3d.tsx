'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { cn } from '@/lib/utils';

interface Hexagon3DProps {
  className?: string;
  animate?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

// 3D Hexagon Mesh Component
function HexagonMesh({ animate = true }: { animate?: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<any>(null);

  // Create hexagon geometry
  const hexagonGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    const radius = 1;
    const sides = 6;
    
    for (let i = 0; i < sides; i++) {
      const angle = (i / sides) * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      
      if (i === 0) {
        shape.moveTo(x, y);
      } else {
        shape.lineTo(x, y);
      }
    }
    shape.closePath();

    const extrudeSettings = {
      depth: 0.3,
      bevelEnabled: true,
      bevelSegments: 8,
      bevelSize: 0.1,
      bevelThickness: 0.05,
    };

    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
  }, []);

  // Animation loop
  useFrame((state) => {
    if (!animate || !meshRef.current || !materialRef.current) return;

    const time = state.clock.getElapsedTime();
    
    // Rotation animation
    meshRef.current.rotation.y = time * 0.3;
    meshRef.current.rotation.x = Math.sin(time * 0.5) * 0.1;
    
    // Subtle floating animation
    meshRef.current.position.y = Math.sin(time * 0.8) * 0.1;
    
    // Material distortion animation
    if (materialRef.current.distort !== undefined) {
      materialRef.current.distort = 0.1 + Math.sin(time * 2) * 0.05;
    }
  });

  return (
    <mesh ref={meshRef} geometry={hexagonGeometry} castShadow receiveShadow>
      <MeshDistortMaterial
        ref={materialRef}
        color="#B8860B"
        metalness={0.8}
        roughness={0.2}
        distort={0.1}
        speed={2}
        emissive="#CD853F"
        emissiveIntensity={0.2}
      />
    </mesh>
  );
}

// Lighting setup for the 3D scene
function Lighting() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color="#DAA520" />
      <spotLight
        position={[0, 10, 0]}
        angle={0.3}
        penumbra={1}
        intensity={0.8}
        color="#FFFF00"
        castShadow
      />
    </>
  );
}

// Main 3D Hexagon Component
export function Hexagon3D({ className, animate = true, size = 'md' }: Hexagon3DProps) {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12', 
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  return (
    <div className={cn('relative', sizes[size], className)}>
      <Canvas
        camera={{ position: [0, 0, 4], fov: 50 }}
        shadows
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance"
        }}
        style={{ background: 'transparent' }}
        dpr={[1, 2]} // Responsive pixel ratio
      >
        <Lighting />
        <HexagonMesh animate={animate} />
        
        {/* Optional orbit controls for interaction */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={animate}
          autoRotateSpeed={1}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Canvas>
      
      {/* Glow effect overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(184, 134, 11, 0.3) 0%, transparent 70%)',
          filter: 'blur(8px)',
          transform: 'scale(1.5)'
        }}
      />
    </div>
  );
}

export default Hexagon3D;
