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
} from "lucide-react"
import { HeroAnimation } from "@/components/hero-animation"
import { DaisyCorner } from "@/components/daisy-corner"
import { GroovyButton } from "@/components/groovy-button"

// ─── data ────────────────────────────────────────────────────────────────────

const features = [
  {
    icon: Landmark,
    color: "#E8743B",
    num: "01",
    title: "Crédit immo",
    desc: "Tableau d'amortissement complet, échéances mois par mois, dérogations manuelles.",
  },
  {
    icon: Calculator,
    color: "#D9362C",
    num: "02",
    title: "Simulateur",
    desc: "Cash-flow, rendement brut et net, revalorisation sur 30 ans avec revente.",
  },
  {
    icon: Receipt,
    color: "#6FB04A",
    num: "03",
    title: "Quittances",
    desc: "Génération automatique en PDF, envoi locataire, suivi des paiements.",
  },
  {
    icon: TrendingUp,
    color: "#5EC4E8",
    num: "04",
    title: "Dashboard",
    desc: "Loyer du mois, revenus annuels, rendement brut — en temps réel.",
  },
  {
    icon: Users,
    color: "#F28CAD",
    num: "05",
    title: "Contacts",
    desc: "Plombier, notaire, assureur — accessibles en 1 clic depuis l'app.",
  },
]

const stats = [
  { value: "2 500+", label: "Propriétaires" },
  { value: "14 j", label: "Essai gratuit" },
  { value: "0 €", label: "Sans CB" },
]

// ─── page ────────────────────────────────────────────────────────────────────

export default function LandingPage() {
  return (
    <div className="overflow-x-hidden" style={{ background: "#FBF5E8" }}>

      {/* ══════════════════════════════════════════════
          HERO — animation plein écran + header flottant
      ══════════════════════════════════════════════ */}
      <div className="relative h-dvh">
        <HeroAnimation />

        {/* Header flottant */}
        <header
          className="absolute inset-x-0 top-0 z-40 flex h-16 items-center justify-between px-6 sm:px-10"
          style={{ background: "linear-gradient(to bottom, #FBF5E8DD 0%, transparent 100%)" }}
        >
          <div className="flex items-center gap-3">
            <Image src="/mascot-house.png" alt="" width={38} height={50} className="object-contain" priority />
            <span
              className="text-lg font-bold uppercase tracking-widest"
              style={{ fontFamily: "var(--font-display)", color: "#1A1A1A" }}
            >
              LMNP Manager
            </span>
          </div>

          <nav className="hidden items-center gap-7 lg:flex">
            {["Fonctionnalités", "Simulateur", "Tarifs", "Contact"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-xs font-semibold uppercase tracking-wider transition-opacity hover:opacity-40"
                style={{ fontFamily: "var(--font-display)", color: "#1A1A1A" }}
              >
                {item}
              </a>
            ))}
            <GroovyButton href="/dashboard">Se connecter</GroovyButton>
          </nav>

          <div className="lg:hidden">
            <GroovyButton href="/dashboard">
              <LayoutDashboard className="h-3.5 w-3.5" />
              Accéder
            </GroovyButton>
          </div>
        </header>
      </div>

      {/* ══════════════════════════════════════════════
          SECTION A — Headline éditoriale + stats
      ══════════════════════════════════════════════ */}
      <section className="relative border-t border-[#1A1A1A10]">
        {/* Bande orange décorative */}
        <div className="h-1.5 w-full" style={{ background: "linear-gradient(90deg, #E8743B, #F4C430, #D9362C)" }} />

        <div className="mx-auto max-w-[1200px] px-6 py-12 sm:px-10 sm:py-16">
          <div className="grid gap-10 lg:grid-cols-[1fr_340px] lg:gap-16">

            {/* Headline */}
            <div>
              <p
                className="-rotate-1 mb-6 inline-block text-2xl sm:text-3xl"
                style={{ fontFamily: "var(--font-accent)", color: "#E8743B" }}
              >
                enfin une appli qui comprend les propriétaires LMNP
              </p>

              <h1
                className="font-bold uppercase leading-[0.85]"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "#1A1A1A",
                  fontSize: "clamp(52px, 7.5vw, 112px)",
                }}
              >
                Gérez votre
                <br />
                <span style={{ color: "#E8743B" }}>LMNP</span>
                <br />
                sans
                <br />
                prise de tête.
              </h1>

              <p
                className="mt-8 max-w-[500px] text-base leading-relaxed sm:text-lg"
                style={{ fontFamily: "var(--font-body)", color: "#1A1A1ACC" }}
              >
                Loyers, charges, crédit, simulateur de rentabilité et contacts — réunis dans une interface conçue pour les particuliers. Pas de jargon, pas d'Excel.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <GroovyButton href="/dashboard" size="lg">
                  <LayoutDashboard className="h-4 w-4" />
                  Essayer gratuitement
                </GroovyButton>
                <GroovyButton href="/simulateur" variant="secondary" size="lg">
                  Simuler ma rentabilité
                  <ArrowRight className="h-4 w-4" />
                </GroovyButton>
              </div>
            </div>

            {/* Colonne droite : mascot card + stats */}
            <div className="flex flex-col gap-6">
              {/* Mascot card */}
              <div
                className="groovy-sticker relative overflow-hidden"
                style={{ background: "#F4C43018", aspectRatio: "3/4" }}
              >
                <DaisyCorner position="tl" size={28} rotation={-10} />
                <DaisyCorner position="br" size={24} rotation={8} />
                <Image
                  src="/mascot-house.png"
                  alt="Mascotte LMNP Manager"
                  fill
                  className="object-contain object-bottom p-4"
                />
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3">
                {stats.map((s) => (
                  <div
                    key={s.label}
                    className="groovy-sticker flex flex-col items-center py-4 text-center"
                    style={{ background: "#FBF5E8" }}
                  >
                    <span
                      className="tabular-nums text-2xl font-bold"
                      style={{ fontFamily: "var(--font-display)", color: "#1A1A1A" }}
                    >
                      {s.value}
                    </span>
                    <span
                      className="mt-0.5 text-[11px] uppercase tracking-wider"
                      style={{ fontFamily: "var(--font-display)", color: "#1A1A1A77" }}
                    >
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SECTION B — Fonctionnalités
          Layout : large numéro à gauche, contenu à droite
      ══════════════════════════════════════════════ */}
      <section className="relative border-t border-[#1A1A1A10] py-12 sm:py-16">
        <DaisyCorner position="tl" size={44} rotation={-8} />
        <DaisyCorner position="br" size={40} rotation={6} />

        <div className="mx-auto max-w-[1200px] px-6 sm:px-10">
          {/* Section header */}
          <div className="mb-10 flex items-end justify-between gap-8">
            <h2
              className="font-bold uppercase leading-[0.88]"
              style={{
                fontFamily: "var(--font-display)",
                color: "#1A1A1A",
                fontSize: "clamp(36px, 5vw, 72px)",
              }}
            >
              Ce que vous
              <br />
              <span style={{ color: "#E8743B" }}>obtenez.</span>
            </h2>
            <p
              className="hidden max-w-[240px] text-sm sm:block"
              style={{ fontFamily: "var(--font-body)", color: "#1A1A1A66" }}
            >
              5 outils, une seule interface. Rien de superflu.
            </p>
          </div>

          {/* Feature list */}
          <div className="divide-y divide-[#1A1A1A10]">
            {features.map((f) => (
              <div
                key={f.num}
                className="group flex items-center gap-6 py-6 transition-colors hover:bg-[#1A1A1A03] sm:gap-10 sm:py-8"
              >
                {/* Number */}
                <span
                  className="w-12 shrink-0 text-right text-xs font-bold tabular-nums"
                  style={{ fontFamily: "var(--font-display)", color: "#1A1A1A30" }}
                >
                  {f.num}
                </span>

                {/* Icon */}
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                  style={{ background: `${f.color}18` }}
                >
                  <f.icon className="h-5 w-5" style={{ color: f.color }} />
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col gap-1 sm:flex-row sm:items-center sm:gap-10">
                  <h3
                    className="min-w-[160px] font-bold uppercase"
                    style={{ fontFamily: "var(--font-display)", color: "#1A1A1A", fontSize: "18px" }}
                  >
                    {f.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ fontFamily: "var(--font-body)", color: "#1A1A1A88" }}
                  >
                    {f.desc}
                  </p>
                </div>

                {/* Arrow */}
                <ArrowRight
                  className="h-5 w-5 shrink-0 opacity-0 transition-opacity group-hover:opacity-40"
                  style={{ color: "#1A1A1A" }}
                />
              </div>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <GroovyButton href="/dashboard" size="lg">
              Accéder à l'app
              <ArrowRight className="h-4 w-4" />
            </GroovyButton>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SECTION C — Bande testimonials
      ══════════════════════════════════════════════ */}
      <section className="border-y border-[#1A1A1A10] py-12">
        <div className="mx-auto max-w-[1200px] px-6 sm:px-10">
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              { q: "Enfin un truc simple !", a: "Marie T., Paris", role: "Proprio depuis 3 ans" },
              { q: "Mon expert-comptable l'adore.", a: "Julien R., Lyon", role: "2 biens LMNP" },
              { q: "Setup en 3 minutes chrono.", a: "Sophie M., Bordeaux", role: "Primo-investisseuse" },
            ].map((t) => (
              <div
                key={t.a}
                className="groovy-sticker px-6 py-5"
                style={{ background: "#FBF5E8" }}
              >
                <p
                  className="text-base font-semibold leading-snug"
                  style={{ fontFamily: "var(--font-body)", color: "#1A1A1A" }}
                >
                  &ldquo;{t.q}&rdquo;
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <div
                    className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold text-white"
                    style={{ background: "#E8743B" }}
                  >
                    {t.a[0]}
                  </div>
                  <div>
                    <p className="text-xs font-bold" style={{ fontFamily: "var(--font-display)", color: "#1A1A1A" }}>
                      {t.a}
                    </p>
                    <p className="text-[11px]" style={{ fontFamily: "var(--font-body)", color: "#1A1A1A55" }}>
                      {t.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SECTION D — CTA final
      ══════════════════════════════════════════════ */}
      <section className="relative py-16 sm:py-24">
        <DaisyCorner position="tl" size={52} rotation={-10} />
        <DaisyCorner position="tr" size={44} rotation={9} />
        <DaisyCorner position="bl" size={40} rotation={6} />
        <DaisyCorner position="br" size={56} rotation={-8} />

        {/* Radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, #E8743B0F 0%, transparent 70%)" }}
        />

        <div className="relative mx-auto max-w-[900px] px-6 text-center sm:px-10">
          {/* Large mascot */}
          <div className="mx-auto mb-6 h-28 w-22 sm:h-36 sm:w-28">
            <Image
              src="/mascot-house.png"
              alt="Mascotte LMNP Manager"
              width={144}
              height={188}
              className="h-full w-full object-contain drop-shadow-lg"
            />
          </div>

          <span
            className="-rotate-1 mb-4 block text-2xl sm:text-4xl"
            style={{ fontFamily: "var(--font-accent)", color: "#E8743B" }}
          >
            prêt à simplifier votre gestion ?
          </span>

          <h2
            className="font-bold uppercase leading-[0.88]"
            style={{
              fontFamily: "var(--font-display)",
              color: "#1A1A1A",
              fontSize: "clamp(52px, 9vw, 120px)",
            }}
          >
            Rejoignez
            <br />
            la team{" "}
            <span
              className="inline-block rotate-1"
              style={{ fontFamily: "var(--font-accent)", color: "#D9362C", textTransform: "none" }}
            >
              groovy.
            </span>
          </h2>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <GroovyButton href="/dashboard" size="lg">
              <LayoutDashboard className="h-4 w-4" />
              Commencer gratuitement
            </GroovyButton>
            <GroovyButton href="/simulateur" variant="secondary" size="lg">
              Voir le simulateur
            </GroovyButton>
          </div>

          <p
            className="mt-5 text-sm"
            style={{ fontFamily: "var(--font-body)", color: "#1A1A1A55" }}
          >
            14 jours gratuits · sans carte bancaire · sans engagement
          </p>

          {/* Footer */}
          <div
            className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t pt-6"
            style={{ borderColor: "#1A1A1A10" }}
          >
            <div className="flex items-center gap-2">
              <Image src="/mascot-house.png" alt="" width={20} height={26} className="object-contain opacity-50" />
              <span
                className="text-xs font-bold uppercase tracking-widest opacity-40"
                style={{ fontFamily: "var(--font-display)", color: "#1A1A1A" }}
              >
                LMNP Manager
              </span>
            </div>
            <span
              className="text-xs opacity-30"
              style={{ fontFamily: "var(--font-body)", color: "#1A1A1A" }}
            >
              © 2026 · Fait avec ♥ en France
            </span>
            <div className="flex items-center gap-4 opacity-30" style={{ color: "#1A1A1A" }}>
              <Link href="#" aria-label="Email" className="transition-opacity hover:opacity-70">
                <Mail className="h-4 w-4" />
              </Link>
              <Link href="#" aria-label="Twitter" className="transition-opacity hover:opacity-70">
                <Twitter className="h-4 w-4" />
              </Link>
              <Link href="#" aria-label="Instagram" className="transition-opacity hover:opacity-70">
                <Instagram className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
