import type { HumanModel, SeatbeltConfig } from "@/types";

/**
 * Forman et al. 2019 ve NHTSA saha analizi özeti:
 * Aynı delta-V'de kadın yolcularda özellikle göğüs ve boyun AIS2+/AIS3+
 * riskleri erkeklere göre daha yüksek raporlanır. Bu çarpanlar eğitici
 * ölçeklemedir; klinik tanı yerine geçmez.
 */
export function genderChestMultiplier(human: HumanModel): number {
  return human.gender === "female" ? 1.35 : 1;
}

export function genderNeckMultiplier(human: HumanModel): number {
  return human.gender === "female" ? 1.28 : 1;
}

/** Meme dokusu ve yumuşak doku, omuz kemerinin kayma eğilimini artırır. */
export function breastSlipFactor(human: HumanModel): number {
  const vol = human.breastVolume ?? 0;
  return 1 + vol * 400 + human.softTissueThickness * 6;
}

export function beltFitMultipliers(belt: SeatbeltConfig): {
  chest: number;
  abdomen: number;
  pelvis: number;
  neck: number;
  submarining: number;
} {
  if (belt.type === "none") {
    return { chest: 2.4, abdomen: 2.1, pelvis: 1.8, neck: 1.7, submarining: 2.6 };
  }

  let chest = 1;
  let abdomen = 1;
  let pelvis = 1;
  let neck = 1;
  let submarining = 1;

  switch (belt.shoulderFit) {
    case "tooCloseToNeck":
      neck += 0.55;
      chest += 0.1;
      break;
    case "offShoulder":
      chest += 0.7;
      neck += 0.2;
      break;
    case "underArm":
      chest += 0.9;
      abdomen += 0.45;
      break;
    default:
      break;
  }

  switch (belt.lapFit) {
    case "onAbdomen":
      abdomen += 0.85;
      submarining += 0.9;
      pelvis -= 0.15;
      break;
    case "loose":
      abdomen += 0.4;
      submarining += 0.7;
      break;
    case "tooHigh":
      abdomen += 0.55;
      submarining += 0.5;
      break;
    default:
      break;
  }

  if (!belt.pretensioner) {
    submarining += 0.25;
    chest += 0.12;
  }
  if (!belt.loadLimiter) {
    chest += 0.22;
  }

  chest += belt.slack * 0.8;
  return { chest, abdomen, pelvis, neck, submarining };
}
