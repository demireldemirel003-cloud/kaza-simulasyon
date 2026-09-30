import { NextResponse } from "next/server";
import { runInjuryModel } from "@/lib/injury-risk";
import { crashScenarioSchema } from "@/lib/schemas/scenario";

/** Senaryo gövdesinden bölgesel risk üretir (ileride sunucu tarafı doğrulama). */
export async function POST(request: Request) {
  const json: unknown = await request.json();
  const parsed = crashScenarioSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Geçersiz senaryo" }, { status: 400 });
  }
  try {
    const data = runInjuryModel(parsed.data);
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Geçersiz senaryo" }, { status: 400 });
  }
}
