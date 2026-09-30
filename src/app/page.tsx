import Link from "next/link";
import { ArrowRight, Shield, Users, Car } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:py-16">
      <section className="space-y-6">
        <p className="text-xs font-medium uppercase tracking-widest text-primary">
          Bilimsel-eğitici 3D simülasyon
        </p>
        <h1 className="max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">
          Emniyet kemeri, antropometri ve çarpışma kinematiğini birlikte görün
        </h1>
        <p className="max-w-2xl text-muted-foreground">
          SACS (Seatbelt Anthropometry Crash Simulator), kadın ve erkek vücut farklarının — omuz ve
          kalça genişliği, meme dokusu, yumuşak doku kalınlığı, pelvis geometrisi — kemer yerleşimi ve
          yaralanma riski üzerindeki etkisini 3D sahnede inceler. Amaç klinik tanı değil, literatüre
          dayalı sezgi kazandırmaktır.
        </p>
        <Button asChild size="lg">
          <Link href="/simulate">
            Simülasyona başla
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </section>

      <section className="mt-14 grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader>
            <Users className="h-5 w-5 text-primary" />
            <CardTitle>Antropometri</CardTitle>
            <CardDescription>AF05, AF50, AM50, AM95 manikenleri</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Yasal testlerin çoğu ortalama erkek (Hybrid III 50M) üzerine kuruludur. Kadın yolcularda
            kemer geometrisi ve göğüs eşiği farklıdır (Forman ve ark., 2019).
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Shield className="h-5 w-5 text-primary" />
            <CardTitle>Kemer fit’i</CardTitle>
            <CardDescription>Omuz ve bel kemeri yerleşimi</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Yanlış omuz kemeri boyun yükünü; karın üzerine binen bel kemeri submarining ve abdominal
            yaralanma riskini artırır.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Car className="h-5 w-5 text-primary" />
            <CardTitle>Araç ve delta-V</CardTitle>
            <CardDescription>Sedan / SUV, 20–80 km/s</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Ankraj noktaları ve H-point, kemerin vücut üzerindeki izini değiştirir. Risk skorları IIHS
            tarzı delta-V eğrileriyle ölçeklenir.
          </CardContent>
        </Card>
      </section>

      <section className="mt-12 rounded-xl border bg-card p-6 text-sm text-muted-foreground">
        <h2 className="mb-2 font-semibold text-foreground">Bilimsel arka plan (özet)</h2>
        <p>
          Saha verileri, aynı çarpışma şiddetinde kadın yolcularda özellikle göğüs ve boyun
          yaralanmalarının daha sık görülebildiğini gösterir. Bunun nedenleri arasında kemik
          geometrisi, yumuşak doku, kemerin tasarım manikenine göre kayması ve araç içi geometri yer
          alır. Bu uygulama, bu mekanizmaları basitleştirilmiş fizik ve şeffaf risk fonksiyonlarıyla
          öğretir; sonuçlar gerçek bir çarpışma testi veya tıbbi değerlendirme yerine geçmez.
        </p>
      </section>
    </div>
  );
}
