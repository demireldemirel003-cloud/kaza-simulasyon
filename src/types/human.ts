/** Cinsiyet — antropometrik farkların temel ekseni. */
export type Gender = "female" | "male";

/**
 * İnsan manikeni. Ölçüler SI birimlerinde (m, kg, m³).
 * Gerçek glTF yolu `modelPath` üzerinden bağlanacak; MVP placeholder geometri kullanır.
 */
export interface HumanModel {
  id: string;
  name: string;
  /** Kısa bilimsel etiket, örn. "AF05", "AM50". */
  percentileLabel: string;
  gender: Gender;
  /** Boy (metre). */
  height: number;
  /** Kütle (kg). */
  weight: number;
  bmi: number;
  /** Biakromial omuz genişliği (m). */
  shoulderWidth: number;
  /** Biiliac / kalça genişliği (m). */
  hipWidth: number;
  /** Göğüs çevresi yaklaşık (m). */
  chestDepth: number;
  /**
   * Meme dokusu hacmi (m³). Erkek modellerde 0 veya undefined.
   * Kemerin göğüs üzerinden kaymasını etkiler.
   */
  breastVolume?: number;
  /** Göğüs yumuşak doku kalınlığı (m). */
  softTissueThickness: number;
  /** Pelvis eğimi (derece, nötr oturuşa göre). */
  pelvisAngle: number;
  /** Oturma yüksekliği (m) — kalça–baş. */
  sittingHeight: number;
  modelPath: string;
  description: string;
}
