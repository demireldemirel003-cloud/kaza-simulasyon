"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

export const CrashSceneCanvas = dynamic(
  () => import("@/components/scene/CrashScene").then((m) => m.CrashScene),
  {
    ssr: false,
    loading: () => <Skeleton className="h-full min-h-[420px] w-full rounded-xl" />,
  },
);
