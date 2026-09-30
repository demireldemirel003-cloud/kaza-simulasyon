import Link from "next/link";
import { Activity } from "lucide-react";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-[1600px] items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <Activity className="h-5 w-5 text-primary" />
          <span>SACS</span>
          <span className="hidden text-xs font-normal text-muted-foreground sm:inline">
            Seatbelt Anthropometry Crash Simulator
          </span>
        </Link>
        <nav className="flex items-center gap-2">
          <Link
            href="/simulate"
            className="rounded-md px-3 py-1.5 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          >
            Simülasyon
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
