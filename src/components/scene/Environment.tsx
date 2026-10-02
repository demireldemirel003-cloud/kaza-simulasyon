"use client";

import { Grid } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

/** Zemin, duvar/engel ve temel ışık. */
export function Environment() {
  return (
    <>
      <color attach="background" args={["#111a23"]} />
      <fog attach="fog" args={["#111a23", 9, 22]} />
      <hemisphereLight args={["#dbeafe", "#28333d", 0.75]} />
      <directionalLight
        position={[5, 8, 3]}
        intensity={2}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <directionalLight position={[-4, 4, -3]} intensity={0.65} color="#82c8e8" />
      <ambientLight intensity={0.35} />

      <Grid
        args={[20, 20]}
        cellColor="#2a3a47"
        sectionColor="#435969"
        fadeDistance={18}
        position={[0, 0.012, 0]}
      />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[24, 24]} />
        <meshStandardMaterial color="#1a252e" roughness={0.88} metalness={0.12} />
      </mesh>
      {[-2.4, 2.4].map((x) => (
        <mesh key={x} position={[x, 0.015, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.035, 18]} />
          <meshBasicMaterial color="#62727d" transparent opacity={0.55} />
        </mesh>
      ))}

      {/* Rijit çarpışma duvarı */}
      <RigidBody type="fixed" position={[0, 0.9, -4.2]} colliders="cuboid">
        <mesh castShadow receiveShadow>
          <boxGeometry args={[5, 1.8, 0.35]} />
          <meshStandardMaterial color="#455563" roughness={0.72} metalness={0.18} />
        </mesh>
        {[-2, -1, 0, 1, 2].map((x) => (
          <mesh key={x} position={[x, 0, 0.19]}>
            <boxGeometry args={[0.42, 1.68, 0.025]} />
            <meshStandardMaterial
              color={x % 2 === 0 ? "#d29b56" : "#263540"}
              roughness={0.72}
            />
          </mesh>
        ))}
      </RigidBody>
    </>
  );
}
