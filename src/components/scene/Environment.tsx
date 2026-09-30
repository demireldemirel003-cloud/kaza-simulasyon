"use client";

import { Grid } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

/** Zemin, duvar/engel ve temel ışık. */
export function Environment() {
  return (
    <>
      <color attach="background" args={["#0e141b"]} />
      <hemisphereLight args={["#c5d4e0", "#1a222c", 0.55]} />
      <directionalLight
        position={[6, 10, 4]}
        intensity={1.35}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <ambientLight intensity={0.25} />

      <Grid
        args={[20, 20]}
        cellColor="#243040"
        sectionColor="#3a5168"
        fadeDistance={18}
        position={[0, 0, 0]}
      />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[24, 24]} />
        <meshStandardMaterial color="#151c24" />
      </mesh>

      {/* Rijit çarpışma duvarı */}
      <RigidBody type="fixed" position={[0, 0.9, -4.2]} colliders="cuboid">
        <mesh castShadow receiveShadow>
          <boxGeometry args={[5, 1.8, 0.35]} />
          <meshStandardMaterial color="#8a6a4a" roughness={0.9} />
        </mesh>
      </RigidBody>
    </>
  );
}
