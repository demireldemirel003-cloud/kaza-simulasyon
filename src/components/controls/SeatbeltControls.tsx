"use client";

import { Field } from "@/components/common/Field";
import { InfoTip } from "@/components/common/InfoTip";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useSimulationStore } from "@/store/simulationStore";
import type { LapFit, SeatbeltType, ShoulderFit } from "@/types";

const TYPES: { id: SeatbeltType; label: string }[] = [
  { id: "3point", label: "3 noktalı" },
  { id: "4point", label: "4 noktalı" },
  { id: "none", label: "Kemersiz" },
];

const SHOULDER: { id: ShoulderFit; label: string }[] = [
  { id: "correct", label: "Doğru (klavikula)" },
  { id: "tooCloseToNeck", label: "Boyuna çok yakın" },
  { id: "offShoulder", label: "Omuzdan kaymış" },
  { id: "underArm", label: "Koltuk altı" },
];

const LAP: { id: LapFit; label: string }[] = [
  { id: "correct", label: "Doğru (iliak)" },
  { id: "onAbdomen", label: "Karın üzerinde" },
  { id: "tooHigh", label: "Çok yüksek" },
  { id: "loose", label: "Gevşek" },
];

export function SeatbeltControls() {
  const belt = useSimulationStore((s) => s.scenario.seatbelt);
  const patch = useSimulationStore((s) => s.patchSeatbelt);
  const disabled = belt.type === "none";

  return (
    <div className="space-y-4">
      <Field
        id="belt-type"
        label="Kemer tipi"
        hint={<InfoTip text="Kemersiz koşul, IIHS/NHTSA karşılaştırmalarında taban çizgisi olarak kullanılır." />}
      >
        <select
          id="belt-type"
          className="h-9 w-full rounded-md border border-input bg-background px-2 text-sm"
          value={belt.type}
          onChange={(e) => patch({ type: e.target.value as SeatbeltType })}
        >
          {TYPES.map((t) => (
            <option key={t.id} value={t.id}>
              {t.label}
            </option>
          ))}
        </select>
      </Field>

      <Field
        id="shoulder-fit"
        label="Omuz kemeri yerleşimi"
        hint={<InfoTip text="Boyuna yakın yerleşim boyun yükünü; omuzdan kaçış göğüs ve kafa hareketini artırır." />}
      >
        <select
          id="shoulder-fit"
          disabled={disabled}
          className="h-9 w-full rounded-md border border-input bg-background px-2 text-sm disabled:opacity-50"
          value={belt.shoulderFit}
          onChange={(e) => patch({ shoulderFit: e.target.value as ShoulderFit })}
        >
          {SHOULDER.map((t) => (
            <option key={t.id} value={t.id}>
              {t.label}
            </option>
          ))}
        </select>
      </Field>

      <Field
        id="lap-fit"
        label="Bel kemeri yerleşimi"
        hint={<InfoTip text="Karın üzerine binen lap belt, submarining ve abdominal yaralanma riskini yükseltir." />}
      >
        <select
          id="lap-fit"
          disabled={disabled}
          className="h-9 w-full rounded-md border border-input bg-background px-2 text-sm disabled:opacity-50"
          value={belt.lapFit}
          onChange={(e) => patch({ lapFit: e.target.value as LapFit })}
        >
          {LAP.map((t) => (
            <option key={t.id} value={t.id}>
              {t.label}
            </option>
          ))}
        </select>
      </Field>

      <div className="flex items-center justify-between gap-3">
        <Label htmlFor="pretensioner">Ön gerdirici (pretensioner)</Label>
        <Switch
          id="pretensioner"
          checked={belt.pretensioner}
          disabled={disabled}
          onCheckedChange={(v) => patch({ pretensioner: v })}
        />
      </div>
      <div className="flex items-center justify-between gap-3">
        <Label htmlFor="loadLimiter">Yük sınırlayıcı</Label>
        <Switch
          id="loadLimiter"
          checked={belt.loadLimiter}
          disabled={disabled}
          onCheckedChange={(v) => patch({ loadLimiter: v })}
        />
      </div>
    </div>
  );
}
