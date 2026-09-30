"use client";

import { SEVERITY_LABELS } from "@/data/injuryRiskTables";
import { formatPercent } from "@/lib/utils";
import { useSimulationStore } from "@/store/simulationStore";

export function SimulationSummary() {
  const status = useSimulationStore((s) => s.status);
  const progress = useSimulationStore((s) => s.progress);
  const sub = useSimulationStore((s) => s.submariningRisk);
  const results = useSimulationStore((s) => s.results);
  const scenario = useSimulationStore((s) => s.scenario);

  const peak = results.reduce<(typeof results)[0] | null>((acc, r) => {
    if (!acc || r.risk > acc.risk) return r;
    return acc;
  }, null);

  return (
    <div className="space-y-2 text-xs">
      <p>
        Durum:{" "}
        <span className="font-medium">
          {status === "idle" ? "Hazır" : status === "running" ? "Çalışıyor" : "Tamamlandı"}
        </span>
      </p>
      {status === "running" && (
        <div className="h-1.5 overflow-hidden rounded-full bg-muted">
          <div className="h-full bg-primary transition-all" style={{ width: `${progress * 100}%` }} />
        </div>
      )}
      <p>
        Senaryo: {scenario.speed} km/s · {scenario.impactType}
      </p>
      {status === "completed" && (
        <>
          <p>
            Submarining riski: <span className="font-mono">{formatPercent(sub)}</span>
          </p>
          {peak && (
            <p>
              En yüksek bölgesel risk: {peak.region} ({SEVERITY_LABELS[peak.severity]})
            </p>
          )}
        </>
      )}
    </div>
  );
}
