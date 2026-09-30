"use client";

import { Camera, GitCompare, Play, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CAMERA_PRESETS, type CameraPresetId } from "@/lib/constants";
import { useSimulationStore } from "@/store/simulationStore";

const PRESET_LABELS: Record<CameraPresetId, string> = {
  cockpit: "Kokpit",
  side: "Yan",
  front: "Ön",
  overview: "Genel",
};

export function SimulationControls() {
  const status = useSimulationStore((s) => s.status);
  const run = useSimulationStore((s) => s.runSimulation);
  const reset = useSimulationStore((s) => s.resetSimulation);
  const saveComparison = useSimulationStore((s) => s.saveComparison);
  const setCamera = useSimulationStore((s) => s.setCameraPreset);
  const cameraPreset = useSimulationStore((s) => s.cameraPreset);
  const lastRun = useSimulationStore((s) => s.lastRun);

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        <Button onClick={run} disabled={status === "running"} className="flex-1">
          <Play className="h-4 w-4" />
          Simülasyonu çalıştır
        </Button>
        <Button variant="outline" onClick={reset}>
          <RotateCcw className="h-4 w-4" />
          Sıfırla
        </Button>
      </div>
      <Button variant="secondary" className="w-full" disabled={!lastRun} onClick={saveComparison}>
        <GitCompare className="h-4 w-4" />
        Karşılaştırmaya kaydet
      </Button>
      <div className="flex flex-wrap gap-1.5">
        <Camera className="mt-1 h-3.5 w-3.5 text-muted-foreground" />
        {(Object.keys(CAMERA_PRESETS) as CameraPresetId[]).map((id) => (
          <Button
            key={id}
            size="sm"
            variant={cameraPreset === id ? "default" : "outline"}
            onClick={() => setCamera(id)}
          >
            {PRESET_LABELS[id]}
          </Button>
        ))}
      </div>
    </div>
  );
}
