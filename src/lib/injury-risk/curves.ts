import { clamp } from "@/lib/utils";
import type { InjurySeverity } from "@/types";

/** Lojistik risk eğrisi: x = maruziyet, x0 = %50 eşik. */
export function logistic(x: number, x0: number, k: number): number {
  return 1 / (1 + Math.exp(-k * (x - x0)));
}

export function severityFromRisk(risk: number): InjurySeverity {
  if (risk < 0.08) return "negligible";
  if (risk < 0.2) return "minor";
  if (risk < 0.4) return "moderate";
  if (risk < 0.65) return "serious";
  return "severe";
}

export function boundedRisk(value: number): number {
  return clamp(value, 0, 0.95);
}
