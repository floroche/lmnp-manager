"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus } from "lucide-react"

const FAQS = [
  { q: "C'est quoi le statut LMNP ?", a: "Le Loueur Meublé Non Professionnel est un statut fiscal pour les particuliers qui louent des biens meublés. Il permet de bénéficier de l'amortissement comptable du bien, réduisant considérablement votre imposition sur les revenus locatifs." },
  { q: "Combien de temps prend la gestion avec LMNP Manager ?", a: "Nos utilisateurs passent en moyenne 20 minutes par semaine, contre 3h sans outil. Soit 87 % de temps économisé sur la gestion courante : loyers, quittances, suivi de crédit et simulation." },
  { q: "Puis-je importer mes données existantes ?", a: "Oui. L'assistant d'onboarding vous guide pour importer vos données depuis un fichier Excel ou saisir manuellement vos informations. Comptez moins de 10 minutes pour un setup complet." },
  { q: "Mes données sont-elles sécurisées ?", a: "Vos données sont hébergées en France, chiffrées en transit (TLS) et au repos. Nous ne partageons jamais vos informations avec des tiers et vous pouvez exporter ou supprimer vos données à tout moment." },
  { q: "Y a-t-il un engagement minimum ?", a: "Aucun engagement. L'abonnement est mensuel et résiliable en 2 clics depuis votre espace. Pas de frais cachés, pas de pénalité de résiliation." },
  { q: "Que couvre l'essai gratuit de 14 jours ?", a: "Accès complet à toutes les fonctionnalités : dashboard temps réel, gestion du crédit, simulateur 30 ans, génération de quittances PDF et annuaire de contacts. Sans carte bancaire requise." },
]

const vp = { once: true, amount: 0.08 }

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="border-t-2 border-[#1A1A1A] py-24 sm:py-28" style={{ background: "#FBF5E8" }}>
      <div className="mx-auto max-w-[760px] px-6 sm:px-10">

        <motion.div className="mb-14"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={vp}
        >
          <p className="mb-3 text-[12px] font-medium uppercase tracking-[0.18em]"
            style={{ fontFamily: "var(--font-inter)", color: "#1A1A1A40" }}>
            Tout ce que vous voulez savoir
          </p>
          <h2 className="leading-[0.9] tracking-[-0.02em]"
            style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(32px, 4vw, 52px)", color: "#1A1A1A", fontWeight: 700 }}>
            Questions fréquentes.
          </h2>
        </motion.div>

        <div className="divide-y divide-[#1A1A1A20] border-y border-[#1A1A1A20]">
          {FAQS.map((faq, i) => (
            <motion.div key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              viewport={vp}
            >
              <button
                className="flex w-full items-center justify-between gap-4 py-5 text-left"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="text-[15px] font-semibold leading-snug"
                  style={{ fontFamily: "var(--font-fraunces)", color: "#1A1A1A" }}>
                  {faq.q}
                </span>
                <motion.span
                  animate={{ rotate: open === i ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="shrink-0 rounded-full p-1.5"
                  style={{ background: open === i ? "#1A1A1A" : "#FFF", border: "1px solid #1A1A1A20" }}
                >
                  <Plus className="h-3.5 w-3.5" style={{ color: open === i ? "#FBF5E8" : "#1A1A1A" }} />
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    style={{ overflow: "hidden" }}
                  >
                    <p className="pb-5 text-[14px] leading-relaxed"
                      style={{ fontFamily: "var(--font-inter)", color: "#1A1A1A65" }}>
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
