import { bmiFrom } from "@/lib/utils";
import type { HumanModel } from "@/types";

/**
 * Antropometri kaynakları (özet):
 * - UMTRI / WWU: AF05, AF50, AM50, AM95 oturma ölçüleri
 * - Forman et al. 2019: cinsiyete bağlı yaralanma eşikleri bağlamı
 * Ölçüler metre / kg. Placeholder maniken ölçeklemesi için kullanılır.
 */
export const HUMAN_MODELS: HumanModel[] = [
  {
    id: "female-small",
    name: "Küçük kadın",
    percentileLabel: "AF05",
    gender: "female",
    height: 1.51,
    weight: 48,
    bmi: bmiFrom(1.51, 48),
    shoulderWidth: 0.34,
    hipWidth: 0.33,
    chestDepth: 0.21,
    breastVolume: 0.00035,
    softTissueThickness: 0.018,
    pelvisAngle: 12,
    sittingHeight: 0.79,
    modelPath: "/models/humans/female-small.glb",
    description:
      "5. yüzdelik kadın. Daha kısa oturma yüksekliği ve dar omuz, omuz kemerinin boyuna yaklaşma riskini artırır.",
  },
  {
    id: "female-50th",
    name: "Ortalama kadın",
    percentileLabel: "AF50",
    gender: "female",
    height: 1.618,
    weight: 62,
    bmi: bmiFrom(1.618, 62),
    shoulderWidth: 0.365,
    hipWidth: 0.375,
    chestDepth: 0.24,
    breastVolume: 0.0005,
    softTissueThickness: 0.022,
    pelvisAngle: 10,
    sittingHeight: 0.85,
    modelPath: "/models/humans/female-50th.glb",
    description:
      "50. yüzdelik kadın. Daha geniş kalça ve meme dokusu, kemer kayması ve bel kemeri yüksekliği açısından kritiktir.",
  },
  {
    id: "male-50th",
    name: "Ortalama erkek",
    percentileLabel: "AM50",
    gender: "male",
    height: 1.755,
    weight: 78,
    bmi: bmiFrom(1.755, 78),
    shoulderWidth: 0.415,
    hipWidth: 0.34,
    chestDepth: 0.25,
    breastVolume: 0,
    softTissueThickness: 0.016,
    pelvisAngle: 8,
    sittingHeight: 0.91,
    modelPath: "/models/humans/male-50th.glb",
    description:
      "50. yüzdelik erkek. Çoğu yasal test manikeninin (Hybrid III 50M) temel aldığı antropometri.",
  },
  {
    id: "male-large",
    name: "Büyük erkek",
    percentileLabel: "AM95",
    gender: "male",
    height: 1.88,
    weight: 102,
    bmi: bmiFrom(1.88, 102),
    shoulderWidth: 0.46,
    hipWidth: 0.38,
    chestDepth: 0.29,
    breastVolume: 0,
    softTissueThickness: 0.02,
    pelvisAngle: 7,
    sittingHeight: 0.97,
    modelPath: "/models/humans/male-large.glb",
    description:
      "95. yüzdelik erkek. Yüksek kütle ve omuz genişliği, yük sınırlayıcı ve koltuk geometrisi etkileşimini değiştirir.",
  },
];

export function getHumanById(id: string): HumanModel | undefined {
  return HUMAN_MODELS.find((h) => h.id === id);
}
