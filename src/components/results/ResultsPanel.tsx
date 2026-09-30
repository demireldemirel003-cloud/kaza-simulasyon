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
    <aside className="flex h-full min-h-0 flex-col border-l bg-card">
      <div className="p-4 pb-2">
        <h2 className="text-sm font-semibold">Sonuçlar</h2>
        <p className="text-xs text-muted-foreground">Yaralanma riski ve özet</p>
      </div>
      <Separator />
      <ScrollArea className="flex-1">
        <div className="space-y-4 p-4">
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
