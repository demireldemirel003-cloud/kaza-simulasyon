"use client";

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
    <div className="flex min-h-[calc(100dvh-3.5rem)] flex-col gap-4 p-4 pb-6 lg:h-[calc(100vh-3.5rem)] lg:min-h-0 lg:flex-row lg:gap-0 lg:p-0">
      <div className="w-full shrink-0 lg:h-full lg:w-[320px]">
        <ControlPanel />
      </div>
      <div className="h-[min(75vw,400px)] min-h-[280px] w-full shrink-0 lg:h-full lg:min-h-0 lg:min-w-0 lg:flex-1 lg:p-3">
        <CrashScene />
      </div>
      <div className="w-full shrink-0 lg:h-full lg:w-[300px]">
        <ResultsPanel />
      </div>
    </div>
  );
}
