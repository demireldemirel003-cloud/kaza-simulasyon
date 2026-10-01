export function getRiskColor(risk: number): string {
  if (risk < 0.2) return "#10b981";
  if (risk < 0.4) return "#84cc16";
  if (risk < 0.55) return "#eab308";
  if (risk < 0.7) return "#f97316";
  return "#ef4444";
}
