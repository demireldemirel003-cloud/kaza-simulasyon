export type VehicleType = "sedan" | "suv";

export type Vec3 = [number, number, number];

/** Kemer ankraj noktaları araç yerel koordinatında (metre). */
export interface BeltAnchorPoints {
  upperShoulder: Vec3;
  buckle: Vec3;
  outboardLap: Vec3;
  /** 4 noktalı kemer için ikinci omuz ankrajı. */
  upperShoulderOpposite?: Vec3;
}

export interface VehicleModel {
  id: string;
  name: string;
  type: VehicleType;
  /** Araç kütlesi (kg). */
  mass: number;
  modelPath: string;
  /** Koltuk H-point yaklaşık konumu. */
  seatPosition: Vec3;
  beltAnchorPoints: BeltAnchorPoints;
  description: string;
}
