import Image from "next/image"
import { Star } from "lucide-react"
import { LandingHero } from "@/components/landing/landing-hero"
import { IntroOverlay } from "@/components/landing/intro-overlay"
import { StatementSection } from "@/components/statement-section"
import { FeaturesSection } from "@/components/features-section"
import { FaqSection } from "@/components/faq-section"
import { CtaSection } from "@/components/cta-section"

const TICKER_WORDS = [
  "LMNP", "GESTION LOCATIVE", "CRÉDIT IMMOBILIER", "SIMULATEUR",
  "QUITTANCES", "CONTACTS PRO", "RENDEMENT NET", "CASH-FLOW",
]

export default function LandingPage() {
  return (
    <div className="overflow-x-hidden" style={{ background: "#FBF5E8" }}>

      {/* ══ 0. INTRO VIDEO ═══════════════════════════════════════════════════ */}
      <IntroOverlay />

      {/* ══ 1. HERO ══════════════════════════════════════════════════════════ */}
      <LandingHero />

      {/* ══ 2. TICKER ════════════════════════════════════════════════════════ */}
      <div className="overflow-hidden border-y-2 border-[#1A1A1A]" style={{ background: "#F4C430" }} aria-hidden>
        <div className="flex w-max whitespace-nowrap py-3" style={{ animation: "ticker 28s linear infinite" }}>
          {[0, 1].map(c => (
            <span key={c} className="flex">
              {TICKER_WORDS.map(w => (
                <span key={`${c}-${w}`} className="px-8 text-[12px] font-bold uppercase tracking-[0.16em]"
                  style={{ fontFamily: "var(--font-inter)", color: "#1A1A1A" }}>
                  {w} ·
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ══ 3. STATEMENT ═════════════════════════════════════════════════════ */}
      <StatementSection />

      {/* ══ 4. FEATURES ══════════════════════════════════════════════════════ */}
      <FeaturesSection />

      {/* ══ 5. TESTIMONIAL ═══════════════════════════════════════════════════ */}
      <section className="border-t-2 border-[#1A1A1A] py-24 sm:py-32" style={{ background: "#0B1A10" }}>
        <div className="mx-auto max-w-[900px] px-6 sm:px-10">
          <div className="mb-8 flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-[#F4C430] stroke-none" />
            ))}
          </div>
          <blockquote
            className="italic leading-[0.95] tracking-[-0.02em]"
            style={{ fontFamily: "var(--font-fraunces)", color: "#FBF5E8", fontSize: "clamp(28px, 4.5vw, 60px)" }}
          >
            "Mon expert-comptable est bluffé. Setup en 3 minutes, zéro Excel depuis."
          </blockquote>
          <div className="mt-10 flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-full text-[15px] font-bold"
              style={{ background: "#E8743B", color: "#FBF5E8", fontFamily: "var(--font-fraunces)" }}>J</div>
            <div>
              <p className="font-semibold" style={{ fontFamily: "var(--font-fraunces)", color: "#FBF5E8" }}>Julien R.</p>
              <p className="text-[13px]" style={{ fontFamily: "var(--font-inter)", color: "#FBF5E850" }}>
                2 biens LMNP · Lyon
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 6. FAQ ═══════════════════════════════════════════════════════════ */}
      <FaqSection />

      {/* ══ 7. CTA ═══════════════════════════════════════════════════════════ */}
      <CtaSection />

      {/* ══ 8. FOOTER ════════════════════════════════════════════════════════ */}
      <footer className="border-t border-[#FFFFFF15] px-6 py-5 sm:px-10" style={{ background: "#1A3C2A" }}>
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Image src="/mascot-logo.png" alt="" width={20} height={26} quality={100} className="opacity-70" style={{ height: "auto" }} />
            <span className="text-[13px] font-semibold" style={{ fontFamily: "var(--font-fraunces)", color: "#FBF5E8" }}>
              LMNP Manager
            </span>
          </div>
          <span className="text-[12px]" style={{ fontFamily: "var(--font-inter)", color: "#FBF5E850" }}>
            Fait avec ♥ en France · Données hébergées à Paris
          </span>
        </div>
      </footer>

    </div>
  )
}
