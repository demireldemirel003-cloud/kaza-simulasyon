"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import type { Group } from "three";
import { Environment } from "@/components/scene/Environment";
import { HumanFigure } from "@/components/scene/HumanModel";
import { Seatbelt } from "@/components/scene/Seatbelt";
import { Vehicle } from "@/components/scene/Vehicle";
import { CAMERA_PRESETS } from "@/lib/constants";
import { getHumanById } from "@/data/humanModels";
import { getVehicleById } from "@/data/vehicles";
import { useSimulationStore } from "@/store/simulationStore";

function CrashRig() {
  const group = useRef<Group>(null);
  const scenario = useSimulationStore((s) => s.scenario);
  const status = useSimulationStore((s) => s.status);
  const progress = useSimulationStore((s) => s.progress);
  const cameraPreset = useSimulationStore((s) => s.cameraPreset);

  const human = getHumanById(scenario.humanId) ?? getHumanById("female-50th");
  const vehicle = getVehicleById(scenario.vehicleId) ?? getVehicleById("sedan");

  const preset = CAMERA_PRESETS[cameraPreset];

  const crashPhase = status === "idle" ? 0 : progress;

  const startZ = 2.4;
  const impactZ = -1.35;

  useFrame(() => {
    if (!group.current) return;
    const z = startZ + (impactZ - startZ) * crashPhase;
    group.current.position.z = z;
    group.current.position.x = Math.sin((scenario.angle * Math.PI) / 180) * crashPhase * 0.4;
  });

  const controlsTarget = useMemo(() => [...preset.target] as [number, number, number], [preset]);

  if (!human || !vehicle) return null;

  return (
    <>
      <PerspectiveCamera makeDefault position={[...preset.position]} fov={45} />
      <OrbitControls enableDamping makeDefault target={controlsTarget} maxPolarAngle={Math.PI / 1.85} />
      <Physics gravity={[0, -9.81, 0]} interpolate>
        <Environment />
        <group ref={group}>
          <Vehicle vehicle={vehicle} />
          <HumanFigure
            human={human}
            seatPosition={vehicle.seatPosition}
            seatBackAngle={scenario.seatBackAngle}
            crashPhase={crashPhase}
          />
          <Seatbelt vehicle={vehicle} human={human} belt={scenario.seatbelt} crashPhase={crashPhase} />
        </group>
      </Physics>
    </>
  );
}

/** R3F tuvali — yalnızca istemci. */
export function CrashScene() {
  return (
    <div className="relative h-full min-h-[420px] w-full overflow-hidden rounded-xl border bg-[#0e141b]">
      <Canvas shadows dpr={[1, 1.75]} gl={{ antialias: true }}>
        <CrashRig />
      </Canvas>
      <p className="pointer-events-none absolute bottom-3 left-3 text-[11px] text-white/70">
        Placeholder geometri · glTF modeller sonraki aşamada bağlanacak
      </p>
    </div>
  );
}

export default CrashScene;
