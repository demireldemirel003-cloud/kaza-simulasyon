import { z } from "zod";

export const seatbeltSchema = z.object({
  type: z.enum(["3point", "4point", "none"]),
  shoulderFit: z.enum(["correct", "tooCloseToNeck", "offShoulder", "underArm"]),
  lapFit: z.enum(["correct", "onAbdomen", "loose", "tooHigh"]),
  pretensioner: z.boolean(),
  loadLimiter: z.boolean(),
  slack: z.number().min(0).max(1),
});

export const crashScenarioSchema = z.object({
  impactType: z.enum(["frontal", "offsetFrontal", "side", "rear"]),
  speed: z.number().min(20).max(80),
  angle: z.number().min(-45).max(45),
  vehicleId: z.string().min(1),
  humanId: z.string().min(1),
  seatbelt: seatbeltSchema,
  seatBackAngle: z.number().min(10).max(40),
  deltaV: z.number().optional(),
});

export type CrashScenarioInput = z.infer<typeof crashScenarioSchema>;
