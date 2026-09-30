import type { SeatbeltConfig } from "@/types";

/** Varsayılan 3 noktalı kemer — doğru yerleşim. */
export const DEFAULT_SEATBELT: SeatbeltConfig = {
  type: "3point",
  shoulderFit: "correct",
  lapFit: "correct",
  pretensioner: true,
  loadLimiter: true,
  slack: 0.08,
};

export const SPEED_MIN_KMH = 20;
export const SPEED_MAX_KMH = 80;
export const SEAT_BACK_MIN_DEG = 10;
export const SEAT_BACK_MAX_DEG = 40;

/** Önceden ayarlanmış kamera konumları (sahne dünya koordinatı). */
export const CAMERA_PRESETS = {
  cockpit: { position: [1.6, 1.35, 2.4] as const, target: [0, 0.85, 0] as const },
  side: { position: [3.4, 1.2, 0.2] as const, target: [0, 0.9, 0] as const },
  front: { position: [0.2, 1.1, 4.2] as const, target: [0, 0.8, 0] as const },
  overview: { position: [4.5, 3.2, 4.5] as const, target: [0, 0.6, 0] as const },
} as const;

export type CameraPresetId = keyof typeof CAMERA_PRESETS;
