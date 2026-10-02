"use client";

import { bodyScale } from "@/lib/anthropometry";
import type { HumanModel } from "@/types";

interface HumanModelProps {
  human: HumanModel;
  seatPosition: [number, number, number];
  seatBackAngle: number;
  /** 0–1 simülasyon ilerlemesi — hafif öne eğilme. */
  crashPhase: number;
}

/**
 * Low-poly kapsül maniken. Ölçek antropometriden gelir.
 * glTF eklendiğinde bu grup `useGLTF(human.modelPath)` ile değiştirilir.
 */
export function HumanFigure({ human, seatPosition, seatBackAngle, crashPhase }: HumanModelProps) {
  const scale = bodyScale(human);
  const lean = crashPhase * 0.35;
  const skin = human.gender === "female" ? "#c89068" : "#b99472";
  const clothing = "#456b80";
  const reclineRad = ((seatBackAngle - 20) * Math.PI) / 180;

  return (
    <group
      position={[seatPosition[0], seatPosition[1] + 0.18, seatPosition[2]]}
      rotation={[-reclineRad - lean * 0.15, 0, 0]}
    >
      {/* Pelvis / kalça — kadınlarda daha geniş */}
      <mesh position={[0, 0.12, 0]} scale={scale.pelvis} castShadow>
        <sphereGeometry args={[0.16, 12, 10]} />
        <meshStandardMaterial color={clothing} roughness={0.82} />
      </mesh>
      {/* Gövde */}
      <mesh position={[0, 0.42, 0]} scale={scale.torso} castShadow>
        <capsuleGeometry args={[0.16, 0.38, 6, 12]} />
        <meshStandardMaterial color={clothing} roughness={0.78} />
      </mesh>
      {/* Boyun + kafa */}
      <mesh position={[0, 0.72, 0]} castShadow>
        <cylinderGeometry args={[0.045, 0.05, 0.1, 8]} />
        <meshStandardMaterial color={skin} roughness={0.72} />
      </mesh>
      <mesh position={[0, 0.88, 0.02]} scale={scale.head} castShadow>
        <sphereGeometry args={[0.11, 12, 10]} />
        <meshStandardMaterial color={skin} roughness={0.72} />
      </mesh>
      {[-1, 1].map((side) => (
        <group key={side}>
          <mesh position={[side * 0.2, 0.43, 0.03]} rotation={[0, 0, side * -0.25]} castShadow>
            <capsuleGeometry args={[0.065, 0.22, 5, 9]} />
            <meshStandardMaterial color={clothing} roughness={0.8} />
          </mesh>
          <mesh position={[side * 0.27, 0.19, 0.14]} rotation={[0, 0, side * -0.38]} castShadow>
            <capsuleGeometry args={[0.05, 0.2, 5, 9]} />
            <meshStandardMaterial color={skin} roughness={0.76} />
          </mesh>
          <mesh position={[side * 0.32, 0.055, 0.2]} castShadow>
            <sphereGeometry args={[0.055, 10, 8]} />
            <meshStandardMaterial color={skin} roughness={0.76} />
          </mesh>
          <mesh position={[side * 0.09, 0.02, 0.22]} rotation={[1.2, 0, 0]} castShadow>
            <capsuleGeometry args={[0.065, 0.32, 5, 9]} />
            <meshStandardMaterial color={clothing} roughness={0.8} />
          </mesh>
          <mesh position={[side * 0.09, -0.23, 0.47]} rotation={[0.2, 0, 0]} castShadow>
            <capsuleGeometry args={[0.045, 0.24, 5, 9]} />
            <meshStandardMaterial color={skin} roughness={0.76} />
          </mesh>
          <mesh position={[side * 0.09, -0.34, 0.58]} castShadow>
            <boxGeometry args={[0.13, 0.1, 0.23]} />
            <meshStandardMaterial color="#27333b" roughness={0.9} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
