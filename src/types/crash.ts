import type { SeatbeltConfig } from "./seatbelt";

export type ImpactType = "frontal" | "offsetFrontal" | "side" | "rear";

export type InjuryRegion =
  | "head"
  | "neck"
  | "chest"
  | "abdomen"
  | "pelvis"
  | "lowerExtremity";

export type InjurySeverity = "negligible" | "minor" | "moderate" | "serious" | "severe";

export type SimulationStatus = "idle" | "running" | "completed";

export interface CrashScenario {
  impactType: ImpactType;
  /** Çarpışma hızı (km/h). */
  speed: number;
  /** Etki açısı (derece). 0 = tam frontal. */
  angle: number;
  vehicleId: string;
  humanId: string;
  seatbelt: SeatbeltConfig;
  /** Koltuk sırt açısı (derece, dikeyden). */
  seatBackAngle: number;
  /**
   * Delta-V (km/h). Belirtilmezse hızdan türetilir.
   * IIHS tarzı risk eğrilerinde birincil maruziyet ölçütü.
   */
  deltaV?: number;
}

export interface InjuryResult {
  region: InjuryRegion;
  /** 0–1 arası olasılık / risk skoru. */
  risk: number;
  severity: InjurySeverity;
  description: string;
}

export interface SimulationRun {
  id: string;
  startedAt: number;
  completedAt?: number;
  scenario: CrashScenario;
  results: InjuryResult[];
  /** Submarining olasılığı (0–1). */
  submariningRisk: number;
}
