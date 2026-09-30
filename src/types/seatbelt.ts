export type SeatbeltType = "3point" | "4point" | "none";

/** Omuz kemeri yerleşim kalitesi. */
export type ShoulderFit =
  | "correct"
  | "tooCloseToNeck"
  | "offShoulder"
  | "underArm";

/** Bel kemeri yerleşim kalitesi — submarining ile doğrudan ilişkili. */
export type LapFit = "correct" | "onAbdomen" | "loose" | "tooHigh";

export interface SeatbeltConfig {
  type: SeatbeltType;
  shoulderFit: ShoulderFit;
  lapFit: LapFit;
  pretensioner: boolean;
  loadLimiter: boolean;
  /** 0–1 arası kayma/gerilme görselleştirme katsayısı. */
  slack: number;
}
