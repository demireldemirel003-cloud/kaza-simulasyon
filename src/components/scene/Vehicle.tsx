"use client";

import type { VehicleModel } from "@/types";

interface VehicleProps {
  vehicle: VehicleModel;
}

/** Placeholder araç gövdesi. Gerçek glTF `vehicle.modelPath` ile değiştirilecek. */
export function Vehicle({ vehicle }: VehicleProps) {
  const isSuv = vehicle.type === "suv";
  const bodyH = isSuv ? 1.15 : 0.95;
  const bodyY = isSuv ? 0.72 : 0.58;

  return (
    <group>
      <mesh position={[0, bodyY, 0.2]} castShadow receiveShadow>
        <boxGeometry args={[1.85, bodyH, 4.2]} />
        <meshStandardMaterial color={isSuv ? "#3d4f63" : "#4a5d72"} metalness={0.35} roughness={0.45} />
      </mesh>
      {/* Cam bandı */}
      <mesh position={[0, bodyY + bodyH * 0.28, 0.35]}>
        <boxGeometry args={[1.7, 0.35, 2.4]} />
        <meshStandardMaterial color="#9ec9e8" transparent opacity={0.22} />
      </mesh>
      {/* Koltuk */}
      <mesh position={vehicle.seatPosition} castShadow>
        <boxGeometry args={[0.48, 0.12, 0.5]} />
        <meshStandardMaterial color="#2a2f36" />
      </mesh>
      <mesh
        position={[
          vehicle.seatPosition[0],
          vehicle.seatPosition[1] + 0.32,
          vehicle.seatPosition[2] - 0.22,
        ]}
        castShadow
      >
        <boxGeometry args={[0.48, 0.55, 0.1]} />
        <meshStandardMaterial color="#2a2f36" />
      </mesh>
    </group>
  );
}
