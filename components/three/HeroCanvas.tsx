"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

/* ──── Floating particle field ──── */
function ParticleField() {
  const ref = useRef<THREE.Points>(null!);

  const count = 900;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2.5 + Math.random() * 2.5;
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame(({ clock, pointer }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.getElapsedTime() * 0.035;
    ref.current.rotation.x = clock.getElapsedTime() * 0.012 + pointer.y * 0.08;
    ref.current.rotation.z = pointer.x * 0.06;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#38bdf8"
        size={0.022}
        sizeAttenuation
        depthWrite={false}
        opacity={0.55}
      />
    </Points>
  );
}

/* ──── Glowing orbital ring ──── */
function OrbitalRing({ radius, speed, color, opacity }: {
  radius: number; speed: number; color: string; opacity: number;
}) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.z = clock.getElapsedTime() * speed;
    ref.current.rotation.x = Math.PI / 2 + Math.sin(clock.getElapsedTime() * 0.3) * 0.2;
  });
  return (
    <mesh ref={ref}>
      <torusGeometry args={[radius, 0.006, 8, 120]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} />
    </mesh>
  );
}

/* ──── Exported Canvas ──── */
export function HeroCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.5], fov: 65 }}
      dpr={[1, 1.5]}
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      gl={{ antialias: false, alpha: true }}
    >
      <ambientLight intensity={0.2} />
      <ParticleField />
      <OrbitalRing radius={2.0} speed={0.18}  color="#22d3ee" opacity={0.22} />
      <OrbitalRing radius={2.7} speed={-0.11} color="#a855f7" opacity={0.14} />
      <OrbitalRing radius={3.4} speed={0.08}  color="#3b82f6" opacity={0.10} />
    </Canvas>
  );
}
