import type { InjuryRegion, InjurySeverity } from "@/types";

/** Bölge etiketleri — UI. */
export const REGION_LABELS: Record<InjuryRegion, string> = {
  head: "Kafa",
  neck: "Boyun",
  chest: "Göğüs / kaburga",
  abdomen: "Karın",
  pelvis: "Pelvis",
  lowerExtremity: "Alt ekstremite",
};

export const SEVERITY_LABELS: Record<InjurySeverity, string> = {
  negligible: "İhmal edilebilir",
  minor: "Hafif",
  moderate: "Orta",
  serious: "Ciddi",
  severe: "Ağır",
};

/**
 * IIHS tarzı kaba AIS3+ eğrileri için referans delta-V (km/h).
 * Gerçek saha verisi yerine eğitici sigmoid parametreleri.
 */
export const DELTA_V_REFERENCE_KMH = 56;
