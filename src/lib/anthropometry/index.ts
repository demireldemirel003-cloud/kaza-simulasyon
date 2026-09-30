import type { HumanModel } from "@/types";

/** Placeholder maniken ölçekleri — gerçek glTF gelince kemik hiyerarşisine taşınır. */
export function bodyScale(human: HumanModel) {
  const h = human.height / 1.755;
  return {
    torso: [human.shoulderWidth / 0.415, h * 0.95, human.chestDepth / 0.25] as const,
    pelvis: [human.hipWidth / 0.34, 0.85 + human.softTissueThickness * 4, 0.9] as const,
    head: 0.88 + h * 0.12,
    heightFactor: h,
  };
}
