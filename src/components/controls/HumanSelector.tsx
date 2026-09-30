"use client";

import { HUMAN_MODELS } from "@/data/humanModels";
import { Field } from "@/components/common/Field";
import { InfoTip } from "@/components/common/InfoTip";
import { Badge } from "@/components/ui/badge";
import { useSimulationStore } from "@/store/simulationStore";

export function HumanSelector() {
  const humanId = useSimulationStore((s) => s.scenario.humanId);
  const setHumanId = useSimulationStore((s) => s.setHumanId);
  const selected = HUMAN_MODELS.find((h) => h.id === humanId);

  return (
    <div className="space-y-3">
      <Field
        id="human"
        label="İnsan modeli"
        hint={
          <InfoTip text="AF05/AF50 kadın ve AM50/AM95 erkek manikenleri, omuz-kalça farkı ve yumuşak doku kalınlığını değiştirir." />
        }
      >
        <select
          id="human"
          className="h-9 w-full rounded-md border border-input bg-background px-2 text-sm"
          value={humanId}
          onChange={(e) => setHumanId(e.target.value)}
        >
          {HUMAN_MODELS.map((h) => (
            <option key={h.id} value={h.id}>
              {h.percentileLabel} — {h.name}
            </option>
          ))}
        </select>
      </Field>
      {selected && (
        <div className="space-y-2 rounded-lg bg-muted/60 p-3 text-xs text-muted-foreground">
          <div className="flex flex-wrap gap-1">
            <Badge>{selected.gender === "female" ? "Kadın" : "Erkek"}</Badge>
            <Badge>{selected.height * 100} cm</Badge>
            <Badge>{selected.weight} kg</Badge>
            <Badge>BMI {selected.bmi}</Badge>
          </div>
          <p>{selected.description}</p>
          <p>
            Omuz {Math.round(selected.shoulderWidth * 1000)} mm · Kalça{" "}
            {Math.round(selected.hipWidth * 1000)} mm · Yumuşak doku{" "}
            {Math.round(selected.softTissueThickness * 1000)} mm
          </p>
        </div>
      )}
    </div>
  );
}
