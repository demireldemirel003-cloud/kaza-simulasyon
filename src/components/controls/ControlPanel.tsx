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
    <aside className="flex h-auto min-h-0 flex-col rounded-xl border bg-card lg:h-full lg:rounded-none lg:border-y-0 lg:border-l-0">
      <div className="p-5 pb-3 lg:p-4 lg:pb-2">
        <h2 className="text-base font-semibold lg:text-sm">Kontrol paneli</h2>
        <p className="text-sm text-muted-foreground lg:text-xs">Antropometri, kemer ve çarpışma</p>
      </div>
      <Separator />
      <ScrollArea className="flex-none lg:flex-1">
        <Accordion type="multiple" defaultValue={["human", "vehicle", "belt", "crash"]} className="px-5 lg:px-4">
          <AccordionItem value="human">
            <AccordionTrigger className="py-4 text-base lg:py-3 lg:text-sm">İnsan modeli</AccordionTrigger>
            <AccordionContent>
              <HumanSelector />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="vehicle">
            <AccordionTrigger className="py-4 text-base lg:py-3 lg:text-sm">Araç</AccordionTrigger>
            <AccordionContent>
              <VehicleSelector />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="belt">
            <AccordionTrigger className="py-4 text-base lg:py-3 lg:text-sm">Emniyet kemeri</AccordionTrigger>
            <AccordionContent>
              <SeatbeltControls />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="crash">
            <AccordionTrigger className="py-4 text-base lg:py-3 lg:text-sm">Çarpışma parametreleri</AccordionTrigger>
            <AccordionContent>
              <CrashParameters />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </ScrollArea>
      <Separator />
      <div className="p-5 lg:p-4">
        <SimulationControls />
      </div>
    </aside>
  );
}
