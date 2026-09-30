"use client";

import { REGION_LABELS } from "@/data/injuryRiskTables";
import { formatPercent } from "@/lib/utils";
import { useSimulationStore } from "@/store/simulationStore";

export function ComparisonView() {
  const last = useSimulationStore((s) => s.lastRun);
  const saved = useSimulationStore((s) => s.comparisonRun);

  if (!saved) {
    return (
      <p className="text-xs text-muted-foreground">
        Bir koşuyu tamamlayıp «Karşılaştırmaya kaydet» ile referans alın.
      </p>
    );
  }

  if (!last) {
    return <p className="text-xs text-muted-foreground">Yeni bir simülasyon çalıştırın.</p>;
  }

  return (
    <div className="space-y-2 text-xs">
      <div className="grid grid-cols-3 gap-1 font-medium">
        <span>Bölge</span>
        <span>Kayıtlı</span>
        <span>Güncel</span>
      </div>
      {last.results.map((r) => {
        const prev = saved.results.find((x) => x.region === r.region);
        return (
          <div key={r.region} className="grid grid-cols-3 gap-1 text-muted-foreground">
            <span>{REGION_LABELS[r.region]}</span>
            <span className="font-mono">{formatPercent(prev?.risk ?? 0)}</span>
            <span className="font-mono text-foreground">{formatPercent(r.risk)}</span>
          </div>
        );
      })}
      <p className="pt-1">
        Submarining: {formatPercent(saved.submariningRisk)} → {formatPercent(last.submariningRisk)}
      </p>
    </div>
  );
}
