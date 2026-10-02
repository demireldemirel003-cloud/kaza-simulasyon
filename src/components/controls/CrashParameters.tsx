"use client";

import { Field } from "@/components/common/Field";
import { InfoTip } from "@/components/common/InfoTip";
import { Slider } from "@/components/ui/slider";
import {
  SEAT_BACK_MAX_DEG,
  SEAT_BACK_MIN_DEG,
  SPEED_MAX_KMH,
  SPEED_MIN_KMH,
} from "@/lib/constants";
import { useSimulationStore } from "@/store/simulationStore";
import type { ImpactType } from "@/types";

const IMPACTS: { id: ImpactType; label: string }[] = [
  { id: "frontal", label: "Tam frontal" },
  { id: "offsetFrontal", label: "Ofset frontal" },
  { id: "side", label: "Yan darbe" },
  { id: "rear", label: "Arkadan çarpma" },
];

export function CrashParameters() {
  const scenario = useSimulationStore((s) => s.scenario);
  const patch = useSimulationStore((s) => s.patchScenario);

  return (
    <div className="space-y-4">
      <Field
        id="speed"
        label={`Hız: ${scenario.speed} km/s`}
        hint={<InfoTip text="Delta-V yaklaşık hızın %90’ı olarak türetilir (eğitici varsayım)." />}
      >
        <Slider
          id="speed"
          min={SPEED_MIN_KMH}
          max={SPEED_MAX_KMH}
          step={1}
          value={[scenario.speed]}
          onValueChange={([v]) => patch({ speed: v ?? scenario.speed })}
        />
      </Field>

      <Field id="impact" label="Çarpışma tipi">
        <select
          id="impact"
          className="h-11 w-full rounded-md border border-input bg-background px-3 text-base lg:h-9 lg:px-2 lg:text-sm"
          value={scenario.impactType}
          onChange={(e) => patch({ impactType: e.target.value as ImpactType })}
        >
          {IMPACTS.map((t) => (
            <option key={t.id} value={t.id}>
              {t.label}
            </option>
          ))}
        </select>
      </Field>

      <Field
        id="angle"
        label={`Açı: ${scenario.angle}°`}
        hint={<InfoTip text="0° tam frontal; küçük sapmalar ofset kinematiğini taklit eder." />}
      >
        <Slider
          id="angle"
          min={-30}
          max={30}
          step={1}
          value={[scenario.angle]}
          onValueChange={([v]) => patch({ angle: v ?? 0 })}
        />
      </Field>

      <Field
        id="seatback"
        label={`Koltuk sırt açısı: ${scenario.seatBackAngle}°`}
        hint={<InfoTip text="Yatık sırt, pelvis rotasyonu ve submarining olasılığını artırır." />}
      >
        <Slider
          id="seatback"
          min={SEAT_BACK_MIN_DEG}
          max={SEAT_BACK_MAX_DEG}
          step={1}
          value={[scenario.seatBackAngle]}
          onValueChange={([v]) => patch({ seatBackAngle: v ?? scenario.seatBackAngle })}
        />
      </Field>
    </div>
  );
}
