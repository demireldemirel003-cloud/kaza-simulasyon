"use client";

import { useMemo } from "react";
import { CatmullRomCurve3, Vector3 } from "three";
import { Line } from "@react-three/drei";
import type { HumanModel, SeatbeltConfig, VehicleModel } from "@/types";

interface SeatbeltProps {
  vehicle: VehicleModel;
  human: HumanModel;
  belt: SeatbeltConfig;
  crashPhase: number;
}

function fitOffset(belt: SeatbeltConfig, human: HumanModel): { shoulder: Vector3; lap: Vector3 } {
  const shoulder = new Vector3(0, 0, 0);
  const lap = new Vector3(0, 0, 0);

  switch (belt.shoulderFit) {
    case "tooCloseToNeck":
      shoulder.set(-0.08, 0.04, 0.02);
      break;
    case "offShoulder":
      shoulder.set(0.12, -0.02, 0.04);
      break;
    case "underArm":
      shoulder.set(0.02, -0.16, 0.06);
      break;
    default:
      shoulder.set(0, 0, 0);
  }

  switch (belt.lapFit) {
    case "onAbdomen":
      lap.set(0, 0.1, 0.04);
      break;
    case "tooHigh":
      lap.set(0, 0.08, 0.02);
      break;
    case "loose":
      lap.set(0, 0.02, 0.08);
      break;
    default:
      lap.set(0, 0, 0);
  }

  // Meme dokusu omuz kemerini öne kaydırır
  shoulder.z += (human.breastVolume ?? 0) * 80;
  return { shoulder, lap };
}

/**
 * Omuz + bel kemeri spline'ı. Constraint yerine görsel katman;
 * Rapier joint'leri sonraki aşamada bağlanacak.
 */
export function Seatbelt({ vehicle, human, belt, crashPhase }: SeatbeltProps) {
  const { upperShoulder, buckle, outboardLap } = vehicle.beltAnchorPoints;
  const seat = vehicle.seatPosition;
  const offsets = fitOffset(belt, human);
  const tension = crashPhase * (1 - belt.slack);

  const chestPoint = new Vector3(
    seat[0] + 0.02 + offsets.shoulder.x,
    seat[1] + 0.62 + offsets.shoulder.y - tension * 0.05,
    seat[2] + 0.16 + offsets.shoulder.z,
  );
  const hipPoint = new Vector3(
    seat[0] + offsets.lap.x,
    seat[1] + 0.22 + offsets.lap.y + tension * 0.03,
    seat[2] + 0.12 + offsets.lap.z,
  );

  const shoulderPts = useMemo(() => {
    const curve = new CatmullRomCurve3([
      new Vector3(...upperShoulder),
      chestPoint,
      new Vector3(...buckle),
    ]);
    return curve.getPoints(24);
    // crashPhase kemer gerilimini günceller
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [upperShoulder, buckle, chestPoint.x, chestPoint.y, chestPoint.z]);

  const lapPts = useMemo(() => {
    const curve = new CatmullRomCurve3([
      new Vector3(...outboardLap),
      hipPoint,
      new Vector3(...buckle),
    ]);
    return curve.getPoints(16);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [outboardLap, buckle, hipPoint.x, hipPoint.y, hipPoint.z]);

  if (belt.type === "none") return null;

  const color = belt.shoulderFit === "correct" && belt.lapFit === "correct" ? "#e8e4dc" : "#f0b429";

  return (
    <group>
      <Line points={shoulderPts} color={color} lineWidth={3} />
      <Line points={lapPts} color={color} lineWidth={3} />
      {belt.type === "4point" && vehicle.beltAnchorPoints.upperShoulderOpposite && (
        <Line
          points={[
            new Vector3(...vehicle.beltAnchorPoints.upperShoulderOpposite),
            chestPoint.clone().setX(chestPoint.x - 0.12),
            new Vector3(...buckle),
          ]}
          color={color}
          lineWidth={2.5}
        />
      )}
    </group>
  );
}
