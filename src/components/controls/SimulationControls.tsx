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
    <div className="space-y-4 lg:space-y-3">
      <div className="flex flex-wrap gap-2">
        <Button onClick={run} disabled={status === "running"} className="min-h-11 flex-1 lg:min-h-9">
          <Play className="h-4 w-4" />
          Simülasyonu çalıştır
        </Button>
        <Button variant="outline" onClick={reset} className="min-h-11 lg:min-h-9">
          <RotateCcw className="h-4 w-4" />
          Sıfırla
        </Button>
      </div>
      <Button variant="secondary" className="min-h-11 w-full lg:min-h-9" disabled={!lastRun} onClick={saveComparison}>
        <GitCompare className="h-4 w-4" />
        Karşılaştırmaya kaydet
      </Button>
      <div className="flex flex-wrap gap-2">
        <Camera className="mt-2 h-4 w-4 text-muted-foreground lg:mt-1 lg:h-3.5 lg:w-3.5" />
        {(Object.keys(CAMERA_PRESETS) as CameraPresetId[]).map((id) => (
          <Button
            key={id}
            size="sm"
            variant={cameraPreset === id ? "default" : "outline"}
            className="h-10 px-3 text-sm lg:h-8 lg:px-3 lg:text-xs"
            onClick={() => setCamera(id)}
          >
            {PRESET_LABELS[id]}
          </Button>
        ))}
      </div>
    </div>
  );
}
