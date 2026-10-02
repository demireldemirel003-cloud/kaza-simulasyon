"use client";

import type { VehicleModel } from "@/types";

interface VehicleProps {
  vehicle: VehicleModel;
}

const WHEEL_POSITIONS = [
  [-0.94, 0.35, -1.28],
  [0.94, 0.35, -1.28],
  [-0.94, 0.35, 1.28],
  [0.94, 0.35, 1.28],
] as const;

export function Vehicle({ vehicle }: VehicleProps) {
  const isSuv = vehicle.type === "suv";
  const paint = isSuv ? "#35566b" : "#245b78";
  const roofY = isSuv ? 1.72 : 1.52;
  const cabinHeight = roofY - 0.72;

  return (
    <group>
      {/* Open cabin keeps the occupant and restraint visible from every camera angle. */}
      <mesh position={[0, 0.25, 0.12]} castShadow receiveShadow>
        <boxGeometry args={[1.72, 0.22, 3.82]} />
        <meshStandardMaterial color="#202b36" metalness={0.35} roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.58, -1.18]} castShadow receiveShadow>
        <boxGeometry args={[1.78, 0.48, 1.34]} />
        <meshStandardMaterial color={paint} metalness={0.48} roughness={0.32} />
      </mesh>
      <mesh position={[0, 0.53, 1.48]} castShadow receiveShadow>
        <boxGeometry args={[1.74, 0.4, 0.78]} />
        <meshStandardMaterial color={paint} metalness={0.48} roughness={0.32} />
      </mesh>
      {[-1, 1].map((side) => (
        <group key={side}>
          <mesh position={[side * 0.82, 0.42, 0.12]} castShadow receiveShadow>
            <boxGeometry args={[0.16, 0.32, 2.52]} />
            <meshStandardMaterial color={paint} metalness={0.48} roughness={0.34} />
          </mesh>
          <mesh position={[side * 0.9, 0.72, 0.28]} castShadow>
            <boxGeometry args={[0.1, 0.48, 1.55]} />
            <meshStandardMaterial color={paint} metalness={0.42} roughness={0.36} />
          </mesh>
          <mesh
            position={[side * 0.68, (roofY + 0.72) / 2, -0.58]}
            rotation={[0.42, 0, side * -0.08]}
            castShadow
          >
            <boxGeometry args={[0.09, cabinHeight, 0.1]} />
            <meshStandardMaterial color={paint} metalness={0.45} roughness={0.34} />
          </mesh>
          <mesh
            position={[side * 0.69, (roofY + 0.72) / 2, 0.98]}
            rotation={[-0.12, 0, side * -0.08]}
            castShadow
          >
            <boxGeometry args={[0.09, cabinHeight, 0.1]} />
            <meshStandardMaterial color={paint} metalness={0.45} roughness={0.34} />
          </mesh>
          <mesh position={[side * 0.69, (roofY + 0.72) / 2, 0.24]} castShadow>
            <boxGeometry args={[0.08, cabinHeight, 0.09]} />
            <meshStandardMaterial color={paint} metalness={0.45} roughness={0.34} />
          </mesh>
          <mesh position={[side * 0.75, 1.13, 0.12]}>
            <boxGeometry args={[0.025, 0.42, 0.92]} />
            <meshStandardMaterial
              color="#9dd9ed"
              metalness={0.12}
              roughness={0.18}
              transparent
              opacity={0.2}
              depthWrite={false}
            />
          </mesh>
          <mesh position={[side * 0.94, 0.99, -0.57]} castShadow>
            <boxGeometry args={[0.22, 0.12, 0.18]} />
            <meshStandardMaterial color={paint} metalness={0.4} roughness={0.38} />
          </mesh>
        </group>
      ))}
      <mesh position={[0, (roofY + 0.76) / 2, -0.62]} rotation={[0.42, 0, 0]}>
        <boxGeometry args={[1.3, cabinHeight * 0.78, 0.035]} />
        <meshStandardMaterial
          color="#9dd9ed"
          metalness={0.12}
          roughness={0.18}
          transparent
          opacity={0.16}
          depthWrite={false}
        />
      </mesh>
      <mesh position={[0, (roofY + 0.76) / 2, 1.02]} rotation={[-0.12, 0, 0]}>
        <boxGeometry args={[1.3, cabinHeight * 0.7, 0.035]} />
        <meshStandardMaterial
          color="#9dd9ed"
          metalness={0.12}
          roughness={0.18}
          transparent
          opacity={0.16}
          depthWrite={false}
        />
      </mesh>
      <mesh position={[0, roofY, 0.12]} castShadow receiveShadow>
        <boxGeometry args={[1.47, 0.13, 1.78]} />
        <meshStandardMaterial color={paint} metalness={0.48} roughness={0.32} />
      </mesh>
      <mesh position={[0, 0.38, -2.02]} castShadow>
        <boxGeometry args={[1.82, 0.2, 0.18]} />
        <meshStandardMaterial color="#253440" metalness={0.55} roughness={0.38} />
      </mesh>
      <mesh position={[0, 0.37, 1.94]} castShadow>
        <boxGeometry args={[1.8, 0.18, 0.16]} />
        <meshStandardMaterial color="#253440" metalness={0.55} roughness={0.38} />
      </mesh>
      <mesh position={[0, 0.57, -1.87]}>
        <boxGeometry args={[0.55, 0.22, 0.035]} />
        <meshStandardMaterial color="#1b2831" metalness={0.35} roughness={0.62} />
      </mesh>
      {[-1, 1].map((side) => (
        <group key={`lights-${side}`}>
          <mesh position={[side * 0.55, 0.67, -1.87]}>
            <boxGeometry args={[0.34, 0.1, 0.035]} />
            <meshStandardMaterial color="#f5e6b3" emissive="#9d7e3d" emissiveIntensity={0.25} />
          </mesh>
          <mesh position={[side * 0.58, 0.65, 1.88]}>
            <boxGeometry args={[0.25, 0.12, 0.035]} />
            <meshStandardMaterial color="#e65b4f" emissive="#8f2520" emissiveIntensity={0.2} />
          </mesh>
        </group>
      ))}
      {WHEEL_POSITIONS.map(([x, y, z]) => (
        <group key={`${x}-${z}`} position={[x, y, z]} rotation={[0, 0, Math.PI / 2]}>
          <mesh castShadow receiveShadow>
            <cylinderGeometry args={[0.36, 0.36, 0.18, 24]} />
            <meshStandardMaterial color="#18212a" roughness={0.88} />
          </mesh>
          <mesh position={[0, 0.1, 0]} castShadow>
            <cylinderGeometry args={[0.21, 0.21, 0.035, 16]} />
            <meshStandardMaterial color="#a8b5bd" metalness={0.72} roughness={0.3} />
          </mesh>
        </group>
      ))}

      <mesh position={vehicle.seatPosition} castShadow>
        <boxGeometry args={[0.52, 0.12, 0.5]} />
        <meshStandardMaterial color="#263643" roughness={0.82} />
      </mesh>
      <mesh
        position={[
          vehicle.seatPosition[0],
          vehicle.seatPosition[1] + 0.32,
          vehicle.seatPosition[2] - 0.22,
        ]}
        castShadow
      >
        <boxGeometry args={[0.52, 0.55, 0.12]} />
        <meshStandardMaterial color="#263643" roughness={0.82} />
      </mesh>
      <mesh
        position={[
          vehicle.seatPosition[0],
          vehicle.seatPosition[1] + 0.66,
          vehicle.seatPosition[2] - 0.26,
        ]}
        castShadow
      >
        <boxGeometry args={[0.34, 0.2, 0.13]} />
        <meshStandardMaterial color="#314856" roughness={0.78} />
      </mesh>
    </group>
  );
}
