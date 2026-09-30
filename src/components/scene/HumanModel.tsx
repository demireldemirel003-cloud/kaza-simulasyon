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
  const skin = human.gender === "female" ? "#d4a574" : "#c4a882";
  const reclineRad = ((seatBackAngle - 20) * Math.PI) / 180;

  return (
    <group
      position={[seatPosition[0], seatPosition[1] + 0.18, seatPosition[2]]}
      rotation={[-reclineRad - lean * 0.15, 0, 0]}
    >
      {/* Pelvis / kalça — kadınlarda daha geniş */}
      <mesh position={[0, 0.12, 0]} scale={scale.pelvis} castShadow>
        <sphereGeometry args={[0.16, 12, 10]} />
        <meshStandardMaterial color={skin} roughness={0.7} />
      </mesh>
      {/* Gövde */}
      <mesh position={[0, 0.42, 0]} scale={scale.torso} castShadow>
        <capsuleGeometry args={[0.16, 0.38, 6, 12]} />
        <meshStandardMaterial color={skin} roughness={0.65} />
      </mesh>
      {/* Meme dokusu göstergesi (sadece kadın) */}
      {human.gender === "female" && (
        <mesh position={[0, 0.48, 0.12]} castShadow>
          <sphereGeometry args={[0.07 + (human.breastVolume ?? 0) * 40, 10, 8]} />
          <meshStandardMaterial color={skin} roughness={0.8} />
        </mesh>
      )}
      {/* Boyun + kafa */}
      <mesh position={[0, 0.72, 0]} castShadow>
        <cylinderGeometry args={[0.045, 0.05, 0.1, 8]} />
        <meshStandardMaterial color={skin} />
      </mesh>
      <mesh position={[0, 0.88, 0.02]} scale={scale.head} castShadow>
        <sphereGeometry args={[0.11, 12, 10]} />
        <meshStandardMaterial color={skin} />
      </mesh>
      {/* Üst bacaklar */}
      <mesh position={[-0.09, 0.02, 0.22]} rotation={[1.2, 0, 0]} castShadow>
        <capsuleGeometry args={[0.055, 0.32, 4, 8]} />
        <meshStandardMaterial color={skin} />
      </mesh>
      <mesh position={[0.09, 0.02, 0.22]} rotation={[1.2, 0, 0]} castShadow>
        <capsuleGeometry args={[0.055, 0.32, 4, 8]} />
        <meshStandardMaterial color={skin} />
      </mesh>
    </group>
  );
}
