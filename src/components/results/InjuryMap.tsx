"use client";

import { REGION_LABELS } from "@/data/injuryRiskTables";
import { getRiskColor } from "@/lib/injury-risk/presentation";
import { formatPercent } from "@/lib/utils";
import type { InjuryRegion, InjuryResult } from "@/types";

const ORDER: InjuryRegion[] = ["head", "neck", "chest", "abdomen", "pelvis", "lowerExtremity"];

export function InjuryMap({ results }: { results: InjuryResult[] }) {
  const byRegion = new Map(results.map((r) => [r.region, r]));

  return (
    <div className="space-y-3">
      <p className="text-xs text-muted-foreground">Bölgesel risk haritası (yeşil → kırmızı)</p>
      <svg
        aria-label="Vücut bölgelerine göre yaralanma riski"
        className="mx-auto block h-64 w-36"
        role="img"
        viewBox="0 0 160 300"
      >
        <g fill="#64748b" stroke="#25313c" strokeLinejoin="round" strokeWidth="4">
          <path d="M53 67 42 73 27 118l11 4 17-34 8-17ZM107 67l11 6 15 45-11 4-17-34-8-17Z" />
          <path d="M59 209h42l-4 78H77l-3-51-3 51H59Z" />
        </g>
        {ORDER.map((region) => {
          const risk = byRegion.get(region)?.risk ?? 0;
          const fill = getRiskColor(risk);
          const shared = {
            fill,
            stroke: "#25313c",
            strokeLinejoin: "round" as const,
            strokeWidth: 4,
          };

          switch (region) {
            case "head":
              return (
                <circle
                  key={region}
                  cx="80"
                  cy="28"
                  r="17"
                  {...shared}
                  aria-label={`${REGION_LABELS[region]}: ${formatPercent(risk)}`}
                />
              );
            case "neck":
              return <path key={region} d="M72 50h16l4 13H68Z" {...shared} />;
            case "chest":
              return <path key={region} d="m65 73 15-5 15 5 12 8-5 47H58l-5-47Z" {...shared} />;
            case "abdomen":
              return <path key={region} d="M58 133h44l5 47H53Z" {...shared} />;
            case "pelvis":
              return <path key={region} d="m52 186 56 1 8 12-16 10H60l-16-10Z" {...shared} />;
            case "lowerExtremity":
              return (
                <path
                  key={region}
                  d="M58 215h17l-3 26-2 48H54l2-44Zm27 0h17l2 30 6 44H94l-7-44Z"
                  {...shared}
                />
              );
          }
        })}
      </svg>
      <ul className="space-y-1 text-xs">
        {ORDER.map((region) => {
          const r = byRegion.get(region);
          return (
            <li key={region} className="flex items-center justify-between gap-2">
              <span className="flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: getRiskColor(r?.risk ?? 0) }}
                />
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
