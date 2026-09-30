import type { VehicleModel } from "@/types";

export const VEHICLES: VehicleModel[] = [
  {
    id: "sedan",
    name: "Sedan",
    type: "sedan",
    mass: 1450,
    modelPath: "/models/vehicles/sedan.glb",
    seatPosition: [0.38, 0.42, 0.15],
    beltAnchorPoints: {
      upperShoulder: [0.72, 1.12, 0.22],
      buckle: [0.18, 0.48, 0.05],
      outboardLap: [0.7, 0.46, 0.12],
    },
    description:
      "Düşük H-point, daha yatay bel kemeri geometrisi. Küçük kadınlarda submarining açısından hassas.",
  },
  {
    id: "suv",
    name: "SUV",
    type: "suv",
    mass: 1950,
    modelPath: "/models/vehicles/suv.glb",
    seatPosition: [0.4, 0.58, 0.12],
    beltAnchorPoints: {
      upperShoulder: [0.78, 1.28, 0.2],
      buckle: [0.2, 0.62, 0.02],
      outboardLap: [0.74, 0.6, 0.1],
    },
    description:
      "Yüksek oturma konumu ve daha dik omuz ankrajı. Omuz kemeri yerleşimi kısa boylu yolcular için değişir.",
  },
];

export function getVehicleById(id: string): VehicleModel | undefined {
  return VEHICLES.find((v) => v.id === id);
}
