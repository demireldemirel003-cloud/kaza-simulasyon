"use client";

import {
  Bar,
  BarChart,
  Cell,
  CartesianGrid,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { REGION_LABELS } from "@/data/injuryRiskTables";
import { getRiskColor } from "@/lib/injury-risk/presentation";
import type { InjuryResult } from "@/types";

export function RiskCharts({ results }: { results: InjuryResult[] }) {
  const data = results.map((r) => ({
    name: REGION_LABELS[r.region],
    risk: Number((r.risk * 100).toFixed(1)),
  }));

  if (data.length === 0) {
    return <p className="text-xs text-muted-foreground">Grafik için simülasyonu çalıştırın.</p>;
  }

  return (
    <div className="space-y-4 pt-2">
      <section aria-label="Bölgesel risk dağılımı">
        <h3 className="mb-1 text-xs font-medium text-muted-foreground">
          Bölgesel riskin toplam içindeki payı
        </h3>
        <div className="h-44 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="risk"
                nameKey="name"
                innerRadius="48%"
                outerRadius="78%"
                paddingAngle={2}
                stroke="hsl(var(--card))"
                strokeWidth={2}
              >
                {data.map((entry) => (
                  <Cell key={entry.name} fill={getRiskColor(entry.risk / 100)} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${String(value)}%`, "Risk"]} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <ul className="grid grid-cols-2 gap-x-3 gap-y-1 text-[11px]">
          {data.map((entry) => (
            <li key={entry.name} className="flex min-w-0 items-center gap-1.5">
              <span
                aria-hidden="true"
                className="h-2 w-2 shrink-0 rounded-full"
                style={{ backgroundColor: getRiskColor(entry.risk / 100) }}
              />
              <span className="truncate">{entry.name}</span>
              <span className="ml-auto shrink-0 font-mono text-muted-foreground">{entry.risk}%</span>
            </li>
          ))}
        </ul>
      </section>
      <section aria-label="Bölgelere göre risk karşılaştırması">
        <h3 className="mb-1 text-xs font-medium text-muted-foreground">Bölgelere göre risk</h3>
        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical" margin={{ left: 8, right: 8 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.25} />
              <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 10 }} unit="%" />
              <YAxis type="category" dataKey="name" width={88} tick={{ fontSize: 10 }} />
              <Tooltip formatter={(value) => [`${String(value)}%`, "Risk"]} />
              <Bar dataKey="risk" radius={[0, 4, 4, 0]}>
                {data.map((entry) => (
                  <Cell key={entry.name} fill={getRiskColor(entry.risk / 100)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
}
