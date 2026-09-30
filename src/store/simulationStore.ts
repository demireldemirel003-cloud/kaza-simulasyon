import { create } from "zustand";
import { HUMAN_MODELS } from "@/data/humanModels";
import { VEHICLES } from "@/data/vehicles";
import { DEFAULT_SEATBELT, type CameraPresetId } from "@/lib/constants";
import { runInjuryModel } from "@/lib/injury-risk";
import { SIM_DURATION_MS } from "@/lib/physics";
import type {
  CrashScenario,
  InjuryResult,
  SeatbeltConfig,
  SimulationRun,
  SimulationStatus,
} from "@/types";

export interface SimulationState {
  scenario: CrashScenario;
  status: SimulationStatus;
  progress: number;
  results: InjuryResult[];
  submariningRisk: number;
  lastRun: SimulationRun | null;
  comparisonRun: SimulationRun | null;
  cameraPreset: CameraPresetId;
  setHumanId: (humanId: string) => void;
  setVehicleId: (vehicleId: string) => void;
  patchSeatbelt: (patch: Partial<SeatbeltConfig>) => void;
  patchScenario: (patch: Partial<Omit<CrashScenario, "seatbelt">>) => void;
  setCameraPreset: (preset: CameraPresetId) => void;
  runSimulation: () => void;
  resetSimulation: () => void;
  saveComparison: () => void;
}

function defaultScenario(): CrashScenario {
  return {
    impactType: "frontal",
    speed: 56,
    angle: 0,
    vehicleId: VEHICLES[0].id,
    humanId: HUMAN_MODELS[1].id,
    seatbelt: { ...DEFAULT_SEATBELT },
    seatBackAngle: 22,
  };
}

let runTimer: ReturnType<typeof setTimeout> | undefined;
let progressTimer: ReturnType<typeof setInterval> | undefined;

function clearTimers(): void {
  if (runTimer) clearTimeout(runTimer);
  if (progressTimer) clearInterval(progressTimer);
  runTimer = undefined;
  progressTimer = undefined;
}

export const useSimulationStore = create<SimulationState>((set, get) => ({
  scenario: defaultScenario(),
  status: "idle",
  progress: 0,
  results: [],
  submariningRisk: 0,
  lastRun: null,
  comparisonRun: null,
  cameraPreset: "side",

  setHumanId: (humanId) =>
    set((s) => ({ scenario: { ...s.scenario, humanId } })),

  setVehicleId: (vehicleId) =>
    set((s) => ({ scenario: { ...s.scenario, vehicleId } })),

  patchSeatbelt: (patch) =>
    set((s) => ({
      scenario: { ...s.scenario, seatbelt: { ...s.scenario.seatbelt, ...patch } },
    })),

  patchScenario: (patch) =>
    set((s) => ({ scenario: { ...s.scenario, ...patch } })),

  setCameraPreset: (cameraPreset) => set({ cameraPreset }),

  runSimulation: () => {
    clearTimers();
    const { scenario } = get();
    set({ status: "running", progress: 0, results: [], submariningRisk: 0 });

    const started = Date.now();
    progressTimer = setInterval(() => {
      const p = Math.min(0.95, (Date.now() - started) / SIM_DURATION_MS);
      set({ progress: p });
    }, 50);

    runTimer = setTimeout(() => {
      clearTimers();
      const { results, submariningRisk } = runInjuryModel(scenario);
      const run: SimulationRun = {
        id: crypto.randomUUID(),
        startedAt: started,
        completedAt: Date.now(),
        scenario: { ...scenario, seatbelt: { ...scenario.seatbelt } },
        results,
        submariningRisk,
      };
      set({
        status: "completed",
        progress: 1,
        results,
        submariningRisk,
        lastRun: run,
      });
    }, SIM_DURATION_MS);
  },

  resetSimulation: () => {
    clearTimers();
    set({
      scenario: defaultScenario(),
      status: "idle",
      progress: 0,
      results: [],
      submariningRisk: 0,
      lastRun: null,
      cameraPreset: "side",
    });
  },

  saveComparison: () => {
    const { lastRun } = get();
    if (lastRun) set({ comparisonRun: lastRun });
  },
}));
