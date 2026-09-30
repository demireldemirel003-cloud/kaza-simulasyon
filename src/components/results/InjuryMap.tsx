"use client";

import { REGION_LABELS } from "@/data/injuryRiskTables";
import { formatPercent } from "@/lib/utils";
import type { InjuryRegion, InjuryResult } from "@/types";

const ORDER: InjuryRegion[] = ["head", "neck", "chest", "abdomen", "pelvis", "lowerExtremity"];

function riskColor(risk: number): string {
  if (risk < 0.2) return "bg-emerald-500";
  if (risk < 0.4) return "bg-lime-500";
  if (risk < 0.55) return "bg-yellow-500";
  if (risk < 0.7) return "bg-orange-500";
  return "bg-red-500";
}

export function InjuryMap({ results }: { results: InjuryResult[] }) {
  const byRegion = new Map(results.map((r) => [r.region, r]));

  return (
    <div className="space-y-3">
      <p className="text-xs text-muted-foreground">Bölgesel risk haritası (yeşil → kırmızı)</p>
      <div className="relative mx-auto h-64 w-28">
        {ORDER.map((region, i) => {
          const r = byRegion.get(region);
          const risk = r?.risk ?? 0;
          return (
            <div
              key={region}
              className={`absolute left-1/2 w-[72%] -translate-x-1/2 rounded-md ${riskColor(risk)} opacity-90 shadow`}
              style={{
                top: `${8 + i * 15}%`,
                height: region === "chest" ? "18%" : "12%",
              }}
              title={`${REGION_LABELS[region]}: ${formatPercent(risk)}`}
            />
          );
        })}
      </div>
      <ul className="space-y-1 text-xs">
        {ORDER.map((region) => {
          const r = byRegion.get(region);
          return (
            <li key={region} className="flex items-center justify-between gap-2">
              <span className="flex items-center gap-2">
                <span className={`h-2 w-2 rounded-full ${riskColor(r?.risk ?? 0)}`} />
                {REGION_LABELS[region]}
              </span>
              <span className="font-mono">{formatPercent(r?.risk ?? 0)}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
