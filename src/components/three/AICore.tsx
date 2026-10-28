import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import AICoreCSS from './AICoreCSS';

function CoreMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef1 = useRef<THREE.Mesh>(null);
  const ringRef2 = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.3;
      meshRef.current.rotation.x = Math.sin(t * 0.4) * 0.2;
    }
    if (ringRef1.current) {
      ringRef1.current.rotation.z = t * 0.5;
      ringRef1.current.rotation.x = Math.PI / 4 + Math.sin(t * 0.2) * 0.1;
    }
    if (ringRef2.current) {
      ringRef2.current.rotation.z = -t * 0.3;
      ringRef2.current.rotation.y = Math.PI / 6 + Math.sin(t * 0.15) * 0.1;
    }
  });

  return (
    <>
      {/* Core sphere */}
      <Sphere ref={meshRef} args={[1, 64, 64]}>
        <MeshDistortMaterial
          color="#06b6d4"
          emissive="#0d1b3e"
          emissiveIntensity={0.6}
          distort={0.35}
          speed={2}
          roughness={0.1}
          metalness={0.8}
          wireframe={false}
        />
      </Sphere>

      {/* Wireframe overlay */}
      <Sphere args={[1.02, 16, 16]}>
        <meshBasicMaterial
          color="#22d3ee"
          wireframe
          transparent
          opacity={0.15}
        />
      </Sphere>

      {/* Orbital ring 1 */}
      <mesh ref={ringRef1} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[2, 0.015, 8, 128]} />
        <meshBasicMaterial color="#06b6d4" transparent opacity={0.6} />
      </mesh>

      {/* Orbital ring 2 */}
      <mesh ref={ringRef2} rotation={[0, Math.PI / 6, Math.PI / 4]}>
        <torusGeometry args={[2.5, 0.01, 8, 128]} />
        <meshBasicMaterial color="#a855f7" transparent opacity={0.4} />
      </mesh>

      {/* Point lights */}
      <pointLight position={[3, 3, 3]} color="#06b6d4" intensity={3} distance={10} />
      <pointLight position={[-3, -2, -3]} color="#a855f7" intensity={2} distance={10} />
      <ambientLight intensity={0.1} />
    </>
  );
}

interface AICoreProps {
  className?: string;
}

export default function AICore({ className }: AICoreProps) {
  return (
    <div
      className={className}
      style={{ width: '360px', height: '360px', flexShrink: 0 }}
      aria-hidden="true"
    >
      <Suspense fallback={<AICoreCSS />}>
        <ErrorBoundaryCanvas />
      </Suspense>
    </div>
  );
}

function ErrorBoundaryCanvas() {
  try {
    return (
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <CoreMesh />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          enableDamping
        />
      </Canvas>
    );
  } catch {
    return <AICoreCSS />;
  }
}

