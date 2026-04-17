import Image from "next/image"
import Link from "next/link"
import {
  LayoutDashboard,
  Landmark,
  Calculator,
  Users,
  ArrowRight,
  Receipt,
  TrendingUp,
  Mail,
  Twitter,
  Instagram,
  Star,
  Check,
} from "lucide-react"
import { DaisyCorner } from "@/components/daisy-corner"
import { GroovyButton } from "@/components/groovy-button"
import { AnimatedHero } from "@/components/animated-hero"

const TICKER_WORDS = [
  "LMNP", "GESTION LOCATIVE", "CRÉDIT IMMOBILIER", "SIMULATEUR",
  "QUITTANCES", "CONTACTS PRO", "RENDEMENT NET", "CASH-FLOW",
]

export default function LandingPage() {
  return (
    <div className="overflow-x-hidden" style={{ background: "#FBF5E8" }}>

      {/* ══ 1. HERO ══════════════════════════════════════════════════════════ */}
      <AnimatedHero />

      {/* ══ 2. TICKER ════════════════════════════════════════════════════════ */}
      <div className="overflow-hidden border-y-2 border-[#1A1A1A]" style={{ background: "#F4C430" }} aria-hidden>
        <div className="flex w-max whitespace-nowrap py-3" style={{ animation: "ticker 24s linear infinite" }}>
          {[0, 1].map(c => (
            <span key={c} className="flex">
              {TICKER_WORDS.map(w => (
                <span key={`${c}-${w}`} className="px-8 text-sm font-bold uppercase tracking-widest"
                  style={{ fontFamily: "var(--font-display)", color: "#1A1A1A" }}>
                  {w} ·
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ══ 3. STATEMENT — éditorial avant/après ═════════════════════════════ */}
      <section className="relative overflow-hidden py-20 sm:py-28" style={{ background: "#FBF5E8" }}>
        <DaisyCorner position="tr" size={56} rotation={8} />

        <div className="mx-auto max-w-[1200px] px-6 sm:px-10">

          {/* Accent bar */}
          <div className="mb-10 h-[3px] w-14 rounded-full" style={{ background: "#E8743B" }} />

          <div className="grid items-end gap-16 lg:grid-cols-2">

            {/* Gauche — le problème */}
            <div>
              <p className="-rotate-1 mb-5 inline-block text-xl"
                style={{ fontFamily: "var(--font-accent)", color: "#E8743B" }}>
                avant LMNP Manager…
              </p>
              <h2
                className="font-bold uppercase leading-[0.84]"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(52px, 7vw, 108px)",
                  color: "#1A1A1A",
                }}
              >
                3H PAR
                <br />
                <span
                  className="relative inline-block"
                  style={{ color: "#E8743B" }}
                >
                  SEMAINE
                  {/* Barré */}
                  <svg aria-hidden className="absolute left-0 top-1/2 w-full" viewBox="0 0 300 12" preserveAspectRatio="none" style={{ transform: "translateY(-50%)" }}>
                    <line x1="0" y1="6" x2="300" y2="6" stroke="#1A1A1A" strokeWidth="5" strokeLinecap="round" />
                  </svg>
                </span>
                <br />
                sur Excel.
              </h2>
            </div>

            {/* Droite — la solution */}
            <div className="flex flex-col gap-6">
              <div
                className="groovy-sticker px-8 py-7"
                style={{ background: "#1A3C2A" }}
              >
                <p className="-rotate-1 mb-2 inline-block text-xl"
                  style={{ fontFamily: "var(--font-accent)", color: "#F4C430" }}>
                  avec LMNP Manager
                </p>
                <p
                  className="font-bold uppercase tabular-nums leading-none"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(52px, 7vw, 88px)",
                    color: "#6FB04A",
                  }}
                >
                  20 MIN.
                </p>
                <p className="mt-2 text-sm" style={{ fontFamily: "var(--font-body)", color: "#FBF5E855" }}>
                  C'est 87 % de temps en moins.
                </p>
              </div>

              <ul className="space-y-2.5">
                {[
                  "Dashboard auto-mis à jour en temps réel",
                  "Quittances générées en 1 clic",
                  "Simulation 30 ans instantanée",
                ].map(item => (
                  <li key={item} className="flex items-center gap-3">
                    <span
                      className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                      style={{ background: "#3A8B5C" }}
                    >
                      <Check className="h-3 w-3 text-white" strokeWidth={3} />
                    </span>
                    <span className="text-sm" style={{ fontFamily: "var(--font-body)", color: "#1A1A1A80" }}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 4. FEATURES — bento grid ═════════════════════════════════════════ */}
      <section className="border-t-2 border-[#1A1A1A] py-20 sm:py-24" style={{ background: "#0B1A10" }}>
        <div className="mx-auto max-w-[1200px] px-6 sm:px-10">

          <div className="mb-12">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em]"
              style={{ fontFamily: "var(--font-display)", color: "#FBF5E830" }}>
              5 outils · une seule interface
            </p>
            <h2 className="font-bold uppercase leading-[0.88]"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(28px, 3.5vw, 52px)",
                color: "#FBF5E8",
              }}>
              Tout ce dont vous avez besoin
            </h2>
          </div>

          {/* Bento */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">

            {/* Dashboard — large */}
            <div className="groovy-sticker col-span-1 flex flex-col gap-5 p-7 sm:col-span-2"
              style={{ background: "#132718", borderColor: "#FBF5E810" }}>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl" style={{ background: "#5EC4E818" }}>
                <TrendingUp className="h-5 w-5" style={{ color: "#5EC4E8" }} />
              </div>
              <div>
                <h3 className="text-xl font-bold uppercase" style={{ fontFamily: "var(--font-display)", color: "#FBF5E8" }}>
                  Dashboard temps réel
                </h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ fontFamily: "var(--font-body)", color: "#FBF5E858" }}>
                  Loyer encaissé, revenus annuels, rendement brut — une seule vue, zéro Excel. Tout se met à jour automatiquement.
                </p>
              </div>
              <div className="mt-auto flex items-baseline gap-2">
                <span className="tabular-nums text-4xl font-bold"
                  style={{ fontFamily: "var(--font-display)", color: "#5EC4E8" }}>100%</span>
                <span className="text-xs uppercase tracking-wide"
                  style={{ fontFamily: "var(--font-display)", color: "#FBF5E835" }}>automatique</span>
              </div>
            </div>

            {/* Crédit */}
            <div className="groovy-sticker flex flex-col gap-4 p-7"
              style={{ background: "#F4C43010", borderColor: "#F4C43020" }}>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl" style={{ background: "#F4C43020" }}>
                <Landmark className="h-5 w-5" style={{ color: "#F4C430" }} />
              </div>
              <div>
                <h3 className="text-lg font-bold uppercase" style={{ fontFamily: "var(--font-display)", color: "#FBF5E8" }}>
                  Crédit immobilier
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed" style={{ fontFamily: "var(--font-body)", color: "#FBF5E855" }}>
                  Tableau d'amortissement complet, modifiable mois par mois.
                </p>
              </div>
            </div>

            {/* Simulateur */}
            <div className="groovy-sticker flex flex-col gap-4 p-7"
              style={{ background: "#E8743B10", borderColor: "#E8743B20" }}>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl" style={{ background: "#E8743B20" }}>
                <Calculator className="h-5 w-5" style={{ color: "#E8743B" }} />
              </div>
              <div>
                <h3 className="text-lg font-bold uppercase" style={{ fontFamily: "var(--font-display)", color: "#FBF5E8" }}>
                  Simulateur 30 ans
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed" style={{ fontFamily: "var(--font-body)", color: "#FBF5E855" }}>
                  Cash-flow, rendement net et revente simulés sur 30 ans.
                </p>
              </div>
            </div>

            {/* Quittances */}
            <div className="groovy-sticker flex flex-col gap-4 p-7"
              style={{ background: "#6FB04A10", borderColor: "#6FB04A20" }}>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl" style={{ background: "#6FB04A20" }}>
                <Receipt className="h-5 w-5" style={{ color: "#6FB04A" }} />
              </div>
              <div>
                <h3 className="text-lg font-bold uppercase" style={{ fontFamily: "var(--font-display)", color: "#FBF5E8" }}>
                  Quittances auto
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed" style={{ fontFamily: "var(--font-body)", color: "#FBF5E855" }}>
                  Génère et envoie les quittances PDF. Suivi des paiements intégré.
                </p>
              </div>
            </div>

            {/* Contacts */}
            <div className="groovy-sticker col-span-1 flex flex-col gap-4 p-7 sm:col-span-2 lg:col-span-1"
              style={{ background: "#F28CAD10", borderColor: "#F28CAD20" }}>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl" style={{ background: "#F28CAD20" }}>
                <Users className="h-5 w-5" style={{ color: "#F28CAD" }} />
              </div>
              <div>
                <h3 className="text-lg font-bold uppercase" style={{ fontFamily: "var(--font-display)", color: "#FBF5E8" }}>
                  Contacts utiles
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed" style={{ fontFamily: "var(--font-body)", color: "#FBF5E855" }}>
                  Plombier, notaire, assureur — rangés par métier, 1 clic.
                </p>
              </div>
            </div>

          </div>

          <div className="mt-10 flex justify-center">
            <GroovyButton href="/dashboard" size="lg">
              Accéder à l'app <ArrowRight className="h-4 w-4" />
            </GroovyButton>
          </div>
        </div>
      </section>

      {/* ══ 5. TESTIMONIAL ═══════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden border-t-2 border-[#1A1A1A] py-24 sm:py-32"
        style={{ background: "#FBF5E8" }}>
        <DaisyCorner position="tl" size={56} rotation={-12} />
        <DaisyCorner position="br" size={48} rotation={9} />

        <div className="mx-auto max-w-[900px] px-6 sm:px-10">

          {/* Guillemet déco */}
          <div
            className="mb-6 text-[120px] font-bold leading-none"
            style={{ fontFamily: "var(--font-display)", color: "#1A1A1A08", lineHeight: 0.8 }}
            aria-hidden
          >
            "
          </div>

          <div className="mb-6 flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-[#F4C430] stroke-none" />
            ))}
          </div>

          <blockquote
            className="leading-tight"
            style={{
              fontFamily: "var(--font-accent)",
              color: "#1A1A1A",
              fontSize: "clamp(30px, 4.5vw, 62px)",
            }}
          >
            "Mon expert-comptable est bluffé. Setup en 3 minutes, zéro Excel depuis."
          </blockquote>

          <div className="mt-10 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full text-base font-bold"
              style={{ background: "#E8743B", color: "#FBF5E8" }}>
              J
            </div>
            <div>
              <p className="font-bold" style={{ fontFamily: "var(--font-display)", color: "#1A1A1A" }}>
                Julien R.
              </p>
              <p className="text-sm" style={{ fontFamily: "var(--font-body)", color: "#1A1A1A55" }}>
                2 biens LMNP · Lyon
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 6. CTA SPLIT ═════════════════════════════════════════════════════ */}
      <section className="grid border-t-2 border-[#1A1A1A] lg:min-h-[500px] lg:grid-cols-2">

        {/* Or — mascotte */}
        <div className="relative flex items-end justify-center border-b-2 border-[#1A1A1A] lg:border-b-0 lg:border-r-2"
          style={{ background: "#F4C430", minHeight: "280px" }}>
          <DaisyCorner position="tr" size={52} rotation={12} />
          <DaisyCorner position="bl" size={40} rotation={-6} />
          <Image
            src="/mascot-hero.png"
            alt="Mascotte LMNP Manager"
            width={210}
            height={264}
            quality={100}
            className="relative z-10 object-contain drop-shadow-2xl"
            style={{ marginBottom: "-2px" }}
          />
        </div>

        {/* Vert — texte */}
        <div className="relative flex flex-col justify-center px-10 py-20 sm:px-16"
          style={{ background: "#0B1A10" }}>
          <DaisyCorner position="br" size={48} rotation={7} />

          <span className="-rotate-1 mb-5 block text-xl"
            style={{ fontFamily: "var(--font-accent)", color: "#F4C430" }}>
            prêt à simplifier votre gestion ?
          </span>

          <h2
            className="font-bold uppercase leading-[0.86]"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(38px, 5vw, 80px)",
              color: "#FBF5E8",
            }}
          >
            Rejoignez
            <br />
            la team{" "}
            <span className="inline-block rotate-1"
              style={{ fontFamily: "var(--font-accent)", color: "#F4C430", textTransform: "none" }}>
              groovy.
            </span>
          </h2>

          <div className="mt-10">
            <GroovyButton href="/dashboard" size="lg">
              <LayoutDashboard className="h-4 w-4" /> Commencer gratuitement
            </GroovyButton>
          </div>
          <p className="mt-4 text-sm" style={{ fontFamily: "var(--font-body)", color: "#FBF5E835" }}>
            14 jours gratuits · sans carte bancaire · sans engagement
          </p>
        </div>
      </section>

      {/* ══ 7. FOOTER ════════════════════════════════════════════════════════ */}
      <footer className="border-t-2 border-[#1A1A1A] px-6 py-5 sm:px-10" style={{ background: "#FBF5E8" }}>
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 opacity-35">
            <Image src="/mascot-house.png" alt="" width={14} height={18} quality={100} className="object-contain" />
            <span className="text-xs font-bold uppercase tracking-widest"
              style={{ fontFamily: "var(--font-display)", color: "#1A1A1A" }}>
              LMNP Manager
            </span>
          </div>
          <span className="text-xs opacity-25" style={{ fontFamily: "var(--font-body)", color: "#1A1A1A" }}>
            © 2026 · Fait avec ♥ en France
          </span>
          <div className="flex items-center gap-4 opacity-25" style={{ color: "#1A1A1A" }}>
            <Link href="#" aria-label="Email" className="transition-opacity hover:opacity-60"><Mail className="h-4 w-4" /></Link>
            <Link href="#" aria-label="Twitter" className="transition-opacity hover:opacity-60"><Twitter className="h-4 w-4" /></Link>
            <Link href="#" aria-label="Instagram" className="transition-opacity hover:opacity-60"><Instagram className="h-4 w-4" /></Link>
          </div>
        </div>
      </footer>

    </div>
  )
}
