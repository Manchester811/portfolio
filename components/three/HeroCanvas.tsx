"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

interface NeuralMeshProps {
  progress?: number;
}

function NeuralLattice({ progress = 0 }: NeuralMeshProps) {
  const pointsRef = useRef<THREE.Points>(null!);
  const count = 1200;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 2.4 + Math.random() * 3.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = radius * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame(({ clock, pointer }) => {
    if (!pointsRef.current) return;
    const t = clock.getElapsedTime();
    // Base rotation accelerated by scroll progress
    pointsRef.current.rotation.y = t * 0.04 + progress * Math.PI * 1.5;
    pointsRef.current.rotation.x = t * 0.02 + pointer.y * 0.06;
    pointsRef.current.rotation.z = pointer.x * 0.04;
    // Dynamic scale pulse
    const s = 1 + Math.sin(t * 0.8) * 0.03 + progress * 0.15;
    pointsRef.current.scale.set(s, s, s);
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#38bdf8"
        size={0.024}
        sizeAttenuation
        depthWrite={false}
        opacity={0.65}
      />
    </Points>
  );
}

function ConcentricRings({ progress = 0 }: { progress?: number }) {
  const ring1 = useRef<THREE.Mesh>(null!);
  const ring2 = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ring1.current) {
      ring1.current.rotation.z = t * 0.15 + progress * 2;
      ring1.current.rotation.x = Math.PI / 2 + Math.sin(t * 0.4) * 0.2;
    }
    if (ring2.current) {
      ring2.current.rotation.z = -t * 0.1 - progress * 1.8;
      ring2.current.rotation.y = Math.cos(t * 0.3) * 0.25;
    }
  });

  return (
    <group>
      <mesh ref={ring1}>
        <torusGeometry args={[2.5, 0.005, 8, 120]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.25} />
      </mesh>
      <mesh ref={ring2}>
        <torusGeometry args={[3.2, 0.004, 8, 120]} />
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.16} />
      </mesh>
    </group>
  );
}

export function HeroCanvas({ progress = 0 }: { progress?: number }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.8], fov: 60 }}
      dpr={[1, 1.5]}
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
    >
      <ambientLight intensity={0.4} />
      <NeuralLattice progress={progress} />
      <ConcentricRings progress={progress} />
    </Canvas>
  );
}
