"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { REGION_LABELS } from "@/data/injuryRiskTables";
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
    <div className="h-56 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ left: 8, right: 8 }}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.25} />
          <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 10 }} unit="%" />
          <YAxis type="category" dataKey="name" width={88} tick={{ fontSize: 10 }} />
          <Tooltip formatter={(value) => [`${String(value)}%`, "Risk"]} />
          <Bar dataKey="risk" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
