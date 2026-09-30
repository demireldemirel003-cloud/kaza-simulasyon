import { DELTA_V_REFERENCE_KMH } from "@/data/injuryRiskTables";
import { getHumanById } from "@/data/humanModels";
import { getVehicleById } from "@/data/vehicles";
import { deltaVFromSpeed } from "@/lib/physics";
import { boundedRisk, logistic, severityFromRisk } from "@/lib/injury-risk/curves";
import {
  beltFitMultipliers,
  breastSlipFactor,
  genderChestMultiplier,
  genderNeckMultiplier,
} from "@/lib/injury-risk/modifiers";
import type {
  CrashScenario,
  HumanModel,
  InjuryResult,
  InjurySeverity,
} from "@/types";

function describe(
  regionLabel: string,
  severity: InjurySeverity,
  extra: string,
): string {
  const sev =
    severity === "negligible"
      ? "düşük"
      : severity === "minor"
        ? "hafif"
        : severity === "moderate"
          ? "orta"
          : severity === "serious"
            ? "ciddi"
            : "yüksek";
  return `${regionLabel} yaralanma riski ${sev}. ${extra}`;
}

function impactScale(scenario: CrashScenario): number {
  switch (scenario.impactType) {
    case "offsetFrontal":
      return 1.08;
    case "side":
      return 0.85;
    case "rear":
      return 0.72;
    default:
      return 1;
  }
}

/**
 * Bölgesel risk üretimi.
 * Kaynak yaklaşımı: IIHS delta-V eğrisi + Forman 2019 cinsiyet etkisi + kemer fit.
 */
export function computeInjuryResults(
  scenario: CrashScenario,
  human: HumanModel,
): InjuryResult[] {
  const dv = scenario.deltaV ?? deltaVFromSpeed(scenario.speed);
  const fit = beltFitMultipliers(scenario.seatbelt);
  const slip = breastSlipFactor(human);
  const impact = impactScale(scenario);
  const recline = 1 + Math.max(0, scenario.seatBackAngle - 20) * 0.018;

  const chestBase = logistic(dv * impact, DELTA_V_REFERENCE_KMH * 0.92, 0.085);
  const neckBase = logistic(dv * impact, 62, 0.07);
  const headBase = logistic(dv * impact, 70, 0.065);
  const abdBase = logistic(dv * impact, 58, 0.08);
  const pelvisBase = logistic(dv * impact, 60, 0.075);
  const legBase = logistic(dv * impact, 64, 0.06);

  const chestRisk = boundedRisk(
    chestBase * genderChestMultiplier(human) * fit.chest * slip * recline,
  );
  const neckRisk = boundedRisk(
    neckBase * genderNeckMultiplier(human) * fit.neck * (human.height < 1.6 ? 1.15 : 1),
  );
  const headRisk = boundedRisk(
    headBase * (scenario.seatbelt.type === "none" ? 1.8 : 1) * recline,
  );
  const abdomenRisk = boundedRisk(abdBase * fit.abdomen * recline);
  const pelvisRisk = boundedRisk(
    pelvisBase * fit.pelvis * (human.hipWidth > 0.36 ? 1.08 : 1),
  );
  const legRisk = boundedRisk(legBase * (human.height > 1.8 ? 1.12 : 1));

  const items: InjuryResult[] = [
    {
      region: "head",
      risk: headRisk,
      severity: severityFromRisk(headRisk),
      description: describe("Kafa", severityFromRisk(headRisk), "Hava yastığı bu sürümde modellenmedi."),
    },
    {
      region: "neck",
      risk: neckRisk,
      severity: severityFromRisk(neckRisk),
      description: describe(
        "Boyun",
        severityFromRisk(neckRisk),
        "Kısa boy ve boyuna yakın omuz kemeri riski yükseltir.",
      ),
    },
    {
      region: "chest",
      risk: chestRisk,
      severity: severityFromRisk(chestRisk),
      description: describe(
        "Göğüs",
        severityFromRisk(chestRisk),
        "Kadınlarda kaburga kırığı eşiği daha düşüktür (Forman 2019).",
      ),
    },
    {
      region: "abdomen",
      risk: abdomenRisk,
      severity: severityFromRisk(abdomenRisk),
      description: describe(
        "Karın",
        severityFromRisk(abdomenRisk),
        "Bel kemerinin karın üzerine binmesi iç organ yükünü artırır.",
      ),
    },
    {
      region: "pelvis",
      risk: pelvisRisk,
      severity: severityFromRisk(pelvisRisk),
      description: describe("Pelvis", severityFromRisk(pelvisRisk), "Doğru iliak yerleşim yükü kemik üzerine alır."),
    },
    {
      region: "lowerExtremity",
      risk: legRisk,
      severity: severityFromRisk(legRisk),
      description: describe(
        "Alt ekstremite",
        severityFromRisk(legRisk),
        "Ayak boşluğu ve pedal etkileşimi sadeleştirilmiştir.",
      ),
    },
  ];

  return items;
}

export function computeSubmariningRisk(scenario: CrashScenario, human: HumanModel): number {
  const dv = scenario.deltaV ?? deltaVFromSpeed(scenario.speed);
  const fit = beltFitMultipliers(scenario.seatbelt);
  const pelvis = human.pelvisAngle / 10;
  const recline = 1 + Math.max(0, scenario.seatBackAngle - 22) * 0.03;
  const femaleHip = human.gender === "female" ? 1.2 : 1;
  const base = logistic(dv, 48, 0.07);
  return boundedRisk(base * fit.submarining * pelvis * recline * femaleHip);
}

export function runInjuryModel(scenario: CrashScenario): {
  results: InjuryResult[];
  submariningRisk: number;
} {
  const human = getHumanById(scenario.humanId);
  const vehicle = getVehicleById(scenario.vehicleId);
  if (!human || !vehicle) {
    throw new Error("Geçersiz insan veya araç kimliği.");
  }

  return {
    results: computeInjuryResults(scenario, human),
    submariningRisk: computeSubmariningRisk(scenario, human),
  };
}
