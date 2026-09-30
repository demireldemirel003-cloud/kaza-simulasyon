"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CrashParameters } from "@/components/controls/CrashParameters";
import { HumanSelector } from "@/components/controls/HumanSelector";
import { SeatbeltControls } from "@/components/controls/SeatbeltControls";
import { SimulationControls } from "@/components/controls/SimulationControls";
import { VehicleSelector } from "@/components/controls/VehicleSelector";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

export function ControlPanel() {
  return (
    <aside className="flex h-full min-h-0 flex-col border-r bg-card">
      <div className="p-4 pb-2">
        <h2 className="text-sm font-semibold">Kontrol paneli</h2>
        <p className="text-xs text-muted-foreground">Antropometri, kemer ve çarpışma</p>
      </div>
      <Separator />
      <ScrollArea className="flex-1">
        <Accordion type="multiple" defaultValue={["human", "vehicle", "belt", "crash"]} className="px-4">
          <AccordionItem value="human">
            <AccordionTrigger>İnsan modeli</AccordionTrigger>
            <AccordionContent>
              <HumanSelector />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="vehicle">
            <AccordionTrigger>Araç</AccordionTrigger>
            <AccordionContent>
              <VehicleSelector />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="belt">
            <AccordionTrigger>Emniyet kemeri</AccordionTrigger>
            <AccordionContent>
              <SeatbeltControls />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="crash">
            <AccordionTrigger>Çarpışma parametreleri</AccordionTrigger>
            <AccordionContent>
              <CrashParameters />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </ScrollArea>
      <Separator />
      <div className="p-4">
        <SimulationControls />
      </div>
    </aside>
  );
}
