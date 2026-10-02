"use client";

import { ComparisonView } from "@/components/results/ComparisonView";
import { InjuryMap } from "@/components/results/InjuryMap";
import { RiskCharts } from "@/components/results/RiskCharts";
import { SimulationSummary } from "@/components/results/SimulationSummary";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSimulationStore } from "@/store/simulationStore";

export function ResultsPanel() {
  const results = useSimulationStore((s) => s.results);

  return (
    <aside className="flex h-auto min-h-0 flex-col rounded-xl border bg-card lg:h-full lg:rounded-none lg:border-y-0 lg:border-r-0">
      <div className="p-5 pb-3 lg:p-4 lg:pb-2">
        <h2 className="text-base font-semibold lg:text-sm">Sonuçlar</h2>
        <p className="text-sm text-muted-foreground lg:text-xs">Yaralanma riski ve özet</p>
      </div>
      <Separator />
      <ScrollArea className="flex-none lg:flex-1">
        <div className="space-y-5 p-5 lg:space-y-4 lg:p-4">
          <SimulationSummary />
          <Tabs defaultValue="map">
            <TabsList className="w-full">
              <TabsTrigger value="map" className="flex-1">
                Harita
              </TabsTrigger>
              <TabsTrigger value="chart" className="flex-1">
                Grafik
              </TabsTrigger>
              <TabsTrigger value="cmp" className="flex-1">
                Karşılaştır
              </TabsTrigger>
            </TabsList>
            <TabsContent value="map">
              <InjuryMap results={results} />
            </TabsContent>
            <TabsContent value="chart">
              <RiskCharts results={results} />
            </TabsContent>
            <TabsContent value="cmp">
              <ComparisonView />
            </TabsContent>
          </Tabs>
        </div>
      </ScrollArea>
    </aside>
  );
}
