"use client";

import { VEHICLES } from "@/data/vehicles";
import { Field } from "@/components/common/Field";
import { InfoTip } from "@/components/common/InfoTip";
import { useSimulationStore } from "@/store/simulationStore";

export function VehicleSelector() {
  const vehicleId = useSimulationStore((s) => s.scenario.vehicleId);
  const setVehicleId = useSimulationStore((s) => s.setVehicleId);
  const selected = VEHICLES.find((v) => v.id === vehicleId);

  return (
    <div className="space-y-3">
      <Field
        id="vehicle"
        label="Araç"
        hint={<InfoTip text="H-point ve kemer ankraj geometrisi sedan ile SUV arasında farklıdır." />}
      >
        <select
          id="vehicle"
          className="h-11 w-full rounded-md border border-input bg-background px-3 text-base lg:h-9 lg:px-2 lg:text-sm"
          value={vehicleId}
          onChange={(e) => setVehicleId(e.target.value)}
        >
          {VEHICLES.map((v) => (
            <option key={v.id} value={v.id}>
              {v.name} ({v.mass} kg)
            </option>
          ))}
        </select>
      </Field>
      {selected && <p className="text-xs text-muted-foreground">{selected.description}</p>}
    </div>
  );
}
