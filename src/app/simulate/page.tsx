"use client";

import "@/lib/react-compat";
import dynamic from "next/dynamic";
import { ControlPanel } from "@/components/controls/ControlPanel";
import { ResultsPanel } from "@/components/results/ResultsPanel";

const CrashScene = dynamic(
  () => import("@/components/scene/CrashScene"),
  { 
    ssr: false,
    loading: () => <div className="flex items-center justify-center h-full">3D Sahne yükleniyor...</div>
  }
);

export default function SimulatePage() {
  return (
    <div className="flex h-[calc(100vh-3.5rem)] min-h-0 flex-col lg:flex-row">
      <div className="h-[min(48vh,420px)] w-full shrink-0 lg:h-full lg:w-[320px]">
        <ControlPanel />
      </div>
      <div className="min-h-0 min-w-0 flex-1 p-3">
        <CrashScene />
      </div>
      <div className="h-[min(48vh,420px)] w-full shrink-0 lg:h-full lg:w-[300px]">
        <ResultsPanel />
      </div>
    </div>
  );
}
