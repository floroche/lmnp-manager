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
import { ScrollTest } from "@/components/scroll-test"
import { DaisyCorner } from "@/components/daisy-corner"
import { GroovyButton } from "@/components/groovy-button"
import {
  MascotSun,
  MascotCoin,
  MascotBank,
  MascotFlower,
  MascotStar,
} from "@/components/groovy-mascots"

// ─── data ────────────────────────────────────────────────────────────────────

const TICKER_WORDS = [
  "LMNP", "GESTION LOCATIVE", "CRÉDIT IMMOBILIER", "SIMULATEUR",
  "QUITTANCES", "CONTACTS PRO", "RENDEMENT NET", "CASH-FLOW",
]

const features = [
  {
    num: "01",
    icon: TrendingUp,
    Mascot: MascotSun,
    color: "#5EC4E8",
    bg: "#5EC4E812",
    title: "Dashboard temps réel",
    desc: "Loyer encaissé, revenus annuels, rendement brut — une seule vue, zéro Excel. Tout se met à jour automatiquement.",
    href: "/dashboard",
  },
  {
    num: "02",
    icon: Landmark,
    Mascot: MascotBank,
    color: "#F4C430",
    bg: "#F4C43012",
    title: "Crédit immobilier",
    desc: "Tableau d'amortissement complet mois par mois. Modifie chaque échéance manuellement pour les cas hors-norme.",
    href: "/credit",
  },
  {
    num: "03",
    icon: Calculator,
    Mascot: MascotStar,
    color: "#E8743B",
    bg: "#E8743B12",
    title: "Simulateur 30 ans",
    desc: "Cash-flow, rendement net, revalorisation et revente simulés sur 30 ans. Partage le résultat en un clic.",
    href: "/simulateur",
  },
  {
    num: "04",
    icon: Receipt,
    Mascot: MascotCoin,
    color: "#6FB04A",
    bg: "#6FB04A12",
    title: "Quittances auto",
    desc: "Génère et envoie les quittances en PDF à ton locataire. Suivi des paiements intégré.",
    href: "/dashboard",
  },
  {
    num: "05",
    icon: Users,
    Mascot: MascotFlower,
    color: "#F28CAD",
    bg: "#F28CAD12",
    title: "Contacts utiles",
    desc: "Plombier, notaire, assureur, gestionnaire — rangés par métier, accessibles en 1 clic depuis n'importe où.",
    href: "/contacts",
  },
]

const perks = [
  "14 jours gratuits, sans carte bancaire",
  "Interface 100 % en français",
  "Données stockées en France",
  "Aucune connaissance comptable requise",
]

// ─── page ────────────────────────────────────────────────────────────────────

export default function LandingPage() {
  return (
    <div className="overflow-x-hidden" style={{ background: "#FBF5E8" }}>

      {/* ══════════════════════════════════════════════
          HERO — scroll-driven GSAP + header flottant
      ══════════════════════════════════════════════ */}
      <ScrollTest>
        <header
          className="absolute inset-x-0 top-0 z-40 flex h-16 items-center justify-between px-6 sm:px-10"
          style={{ background: "linear-gradient(to bottom, #FBF5E8CC 0%, transparent 100%)" }}
        >
          <div className="flex items-center gap-3">
            <Image src="/mascot-house.png" alt="" width={38} height={50} className="object-contain" priority />
            <span
              className="text-base font-bold uppercase tracking-widest"
              style={{ fontFamily: "var(--font-display)", color: "#1A1A1A" }}
            >
              LMNP Manager
            </span>
          </div>

          <nav className="hidden items-center gap-8 lg:flex">
            {["Fonctionnalités", "Simulateur", "Tarifs"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-xs font-semibold uppercase tracking-wider transition-opacity hover:opacity-40"
                style={{ fontFamily: "var(--font-display)", color: "#1A1A1A" }}
              >
                {item}
              </a>
            ))}
            <GroovyButton href="/dashboard">Accéder →</GroovyButton>
          </nav>

          <div className="lg:hidden">
            <GroovyButton href="/dashboard">
              <LayoutDashboard className="h-3.5 w-3.5" />
              App
            </GroovyButton>
          </div>
        </header>
      </ScrollTest>

      {/* ══════════════════════════════════════════════
          TICKER — bande dorée défilante
      ══════════════════════════════════════════════ */}
      <div
        className="overflow-hidden border-y-2 border-[#1A1A1A]"
        style={{ background: "#F4C430" }}
        aria-hidden="true"
      >
        <div
          className="flex w-max whitespace-nowrap py-3"
          style={{ animation: "ticker 22s linear infinite" }}
        >
          {[0, 1].map((copy) => (
            <span key={copy} className="flex">
              {TICKER_WORDS.map((word) => (
                <span
                  key={`${copy}-${word}`}
                  className="px-8 text-sm font-bold uppercase tracking-widest"
                  style={{ fontFamily: "var(--font-display)", color: "#1A1A1A" }}
                >
                  {word} ·
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          STATEMENT — headline éditoriale + perks
      ══════════════════════════════════════════════ */}
      <section className="relative py-20 sm:py-28">
        <DaisyCorner position="tr" size={52} rotation={9} />
        <DaisyCorner position="bl" size={40} rotation={-7} />

        <div className="mx-auto max-w-[1200px] px-6 sm:px-10">
          <div className="grid gap-16 lg:grid-cols-[1fr_380px] lg:items-center">

            {/* Gauche — texte */}
            <div>
              <p
                className="-rotate-1 mb-4 inline-block text-xl"
                style={{ fontFamily: "var(--font-accent)", color: "#E8743B" }}
              >
                enfin une appli qui comprend les propriétaires LMNP
              </p>

              <h1
                className="font-bold uppercase leading-[0.88]"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "#1A1A1A",
                  fontSize: "clamp(56px, 8vw, 120px)",
                }}
              >
                Gérez votre
                <br />
                <span style={{ color: "#E8743B" }}>LMNP</span>
                <br />
                sans prise
                <br />
                de tête.
              </h1>

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

              {/* Perks list */}
              <ul className="mt-8 space-y-2">
                {perks.map((p) => (
                  <li key={p} className="flex items-center gap-2.5">
                    <span
                      className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                      style={{ background: "#3A8B5C" }}
                    >
                      <Check className="h-3 w-3 text-white" strokeWidth={3} />
                    </span>
                    <span
                      className="text-sm"
                      style={{ fontFamily: "var(--font-body)", color: "#1A1A1A88" }}
                    >
                      {p}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Droite — mascot card avec bulle */}
            <div className="relative flex flex-col items-center gap-5">
              {/* Speech bubble */}
              <div
                className="groovy-sticker -rotate-2 px-5 py-3 text-center"
                style={{ background: "#F4C430" }}
              >
                <p
                  className="text-sm font-bold"
                  style={{ fontFamily: "var(--font-display)", color: "#1A1A1A", textTransform: "uppercase", letterSpacing: "0.05em" }}
                >
                  "Setup en 3 min, zéro Excel depuis !"
                </p>
                <p
                  className="mt-1 text-xs"
                  style={{ fontFamily: "var(--font-body)", color: "#1A1A1A66" }}
                >
                  — Julien R., 2 biens LMNP
                </p>
              </div>

              {/* Mascot card */}
              <div
                className="groovy-sticker relative w-full overflow-hidden"
                style={{ background: "#F4C43018", aspectRatio: "4/5" }}
              >
                <DaisyCorner position="tl" size={24} rotation={-10} />
                <DaisyCorner position="br" size={20} rotation={8} />
                <Image
                  src="/mascot-house.png"
                  alt="Mascotte LMNP Manager"
                  fill
                  className="object-contain object-bottom p-6"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          STATS — 3 chiffres forts, fond vert
      ══════════════════════════════════════════════ */}
      <section
        className="border-y-2 border-[#1A1A1A]"
        style={{ background: "#1A3C2A" }}
      >
        <div className="mx-auto grid max-w-[1200px] grid-cols-3 divide-x-2 divide-[#FBF5E820] px-6 sm:px-10">
          {[
            { value: "2 500+", label: "Propriétaires actifs", accent: "#F4C430" },
            { value: "14 j", label: "Essai gratuit", accent: "#5EC4E8" },
            { value: "0 €", label: "Sans carte bancaire", accent: "#6FB04A" },
          ].map((s) => (
            <div key={s.label} className="py-10 px-6 text-center">
              <div
                className="tabular-nums font-bold leading-none"
                style={{
                  fontFamily: "var(--font-display)",
                  color: s.accent,
                  fontSize: "clamp(40px, 5vw, 72px)",
                }}
              >
                {s.value}
              </div>
              <div
                className="mt-2 text-xs uppercase tracking-wider"
                style={{ fontFamily: "var(--font-display)", color: "#FBF5E860" }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          FEATURES — rangées alternées avec mascottes SVG
      ══════════════════════════════════════════════ */}
      <section className="py-20 sm:py-28" style={{ background: "#FBF5E8" }}>
        <div className="mx-auto max-w-[1200px] px-6 sm:px-10">

          {/* Section label */}
          <div className="mb-16 flex items-center gap-4">
            <div className="h-0.5 flex-1" style={{ background: "#1A1A1A15" }} />
            <span
              className="text-xs font-bold uppercase tracking-widest"
              style={{ fontFamily: "var(--font-display)", color: "#1A1A1A40" }}
            >
              5 outils · une seule interface
            </span>
            <div className="h-0.5 flex-1" style={{ background: "#1A1A1A15" }} />
          </div>

          <div className="space-y-6">
            {features.map((f, i) => (
              <div
                key={f.num}
                className="group grid items-center gap-6 rounded-2xl border-2 border-[#1A1A1A08] p-6 transition-all duration-200 hover:border-[#1A1A1A15] hover:shadow-[4px_4px_0_#1A1A1A08] sm:p-8 lg:grid-cols-[80px_1fr_160px]"
                style={{ background: f.bg }}
              >
                {/* Numéro */}
                <span
                  className="hidden text-5xl font-bold tabular-nums lg:block"
                  style={{ fontFamily: "var(--font-display)", color: `${f.color}50` }}
                >
                  {f.num}
                </span>

                {/* Contenu */}
                <div>
                  <div className="mb-3 flex items-center gap-3">
                    <div
                      className="flex h-9 w-9 items-center justify-center rounded-xl"
                      style={{ background: `${f.color}20` }}
                    >
                      <f.icon className="h-4.5 w-4.5" style={{ color: f.color }} />
                    </div>
                    <h3
                      className="text-xl font-bold uppercase"
                      style={{ fontFamily: "var(--font-display)", color: "#1A1A1A" }}
                    >
                      {f.title}
                    </h3>
                  </div>
                  <p
                    className="max-w-[520px] text-sm leading-relaxed"
                    style={{ fontFamily: "var(--font-body)", color: "#1A1A1A77" }}
                  >
                    {f.desc}
                  </p>
                </div>

                {/* Mascot SVG */}
                <div className="hidden items-center justify-center lg:flex">
                  <f.Mascot size={96} />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <GroovyButton href="/dashboard" size="lg">
              Accéder à l'app
              <ArrowRight className="h-4 w-4" />
            </GroovyButton>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          TESTIMONIAL — grande citation
      ══════════════════════════════════════════════ */}
      <section className="relative border-t-2 border-[#1A1A1A] py-24 sm:py-32" style={{ background: "#1A3C2A" }}>
        <DaisyCorner position="tl" size={52} rotation={-10} />
        <DaisyCorner position="br" size={44} rotation={7} />

        <div className="mx-auto max-w-[800px] px-6 text-center sm:px-10">
          <div className="mb-6 flex justify-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-[#F4C430] stroke-none" />
            ))}
          </div>

          <blockquote
            className="leading-tight"
            style={{
              fontFamily: "var(--font-accent)",
              color: "#FBF5E8",
              fontSize: "clamp(28px, 4.5vw, 60px)",
            }}
          >
            "Mon expert-comptable est bluffé. Setup en 3 minutes, zéro Excel depuis."
          </blockquote>

          <div className="mt-8 flex items-center justify-center gap-3">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold"
              style={{ background: "#E8743B", color: "#FBF5E8" }}
            >
              J
            </div>
            <div className="text-left">
              <p className="text-sm font-bold" style={{ fontFamily: "var(--font-display)", color: "#FBF5E8" }}>
                Julien R.
              </p>
              <p className="text-xs" style={{ fontFamily: "var(--font-body)", color: "#FBF5E855" }}>
                2 biens LMNP · Lyon
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          CTA — split or / vert
      ══════════════════════════════════════════════ */}
      <section className="grid border-t-2 border-[#1A1A1A] lg:min-h-[480px] lg:grid-cols-2">

        {/* Gauche — or, mascot */}
        <div
          className="relative flex items-end justify-center border-b-2 border-[#1A1A1A] lg:border-b-0 lg:border-r-2"
          style={{ background: "#F4C430", minHeight: "300px" }}
        >
          <DaisyCorner position="tr" size={48} rotation={10} />
          <DaisyCorner position="bl" size={36} rotation={-5} />
          <Image
            src="/mascot-house.png"
            alt="Mascotte LMNP Manager"
            width={240}
            height={312}
            className="relative z-10 object-contain drop-shadow-xl"
            style={{ marginBottom: "-2px" }}
          />
        </div>

        {/* Droite — vert, texte CTA */}
        <div
          className="relative flex flex-col justify-center px-10 py-20 sm:px-16"
          style={{ background: "#1A3C2A" }}
        >
          <DaisyCorner position="br" size={44} rotation={6} />

          <span
            className="-rotate-1 mb-4 block text-xl"
            style={{ fontFamily: "var(--font-accent)", color: "#F4C430" }}
          >
            prêt à simplifier votre gestion ?
          </span>

          <h2
            className="font-bold uppercase leading-[0.88]"
            style={{
              fontFamily: "var(--font-display)",
              color: "#FBF5E8",
              fontSize: "clamp(36px, 4.5vw, 72px)",
            }}
          >
            Rejoignez
            <br />
            la team{" "}
            <span
              className="inline-block rotate-1"
              style={{ fontFamily: "var(--font-accent)", color: "#F4C430", textTransform: "none" }}
            >
              groovy.
            </span>
          </h2>

          <div className="mt-10 flex flex-wrap gap-4">
            <GroovyButton href="/dashboard" size="lg">
              <LayoutDashboard className="h-4 w-4" />
              Commencer gratuitement
            </GroovyButton>
          </div>

          <p
            className="mt-4 text-sm"
            style={{ fontFamily: "var(--font-body)", color: "#FBF5E840" }}
          >
            14 jours gratuits · sans carte bancaire · sans engagement
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════════ */}
      <footer
        className="border-t-2 border-[#1A1A1A] px-6 py-6 sm:px-10"
        style={{ background: "#FBF5E8" }}
      >
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Image src="/mascot-house.png" alt="" width={18} height={24} className="object-contain opacity-40" />
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
      </footer>

    </div>
  )
}
