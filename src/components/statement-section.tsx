"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"

const vp = { once: true, amount: 0.2 }

export function StatementSection() {
  return (
    <section className="border-t-2 border-[#1A1A1A] py-24 sm:py-32" style={{ background: "#FBF5E8" }}>
      <div className="mx-auto max-w-[1200px] px-6 sm:px-10">
        <div className="grid items-center gap-16 lg:grid-cols-2">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            viewport={vp}
          >
            <p className="mb-5 text-[13px] italic" style={{ fontFamily: "var(--font-fraunces)", color: "#E8743B" }}>
              avant LMNP Manager…
            </p>
            <h2 className="leading-[0.88] tracking-[-0.02em]"
              style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(52px, 7vw, 100px)", color: "#1A1A1A", fontWeight: 700 }}>
              3H PAR<br />
              <span className="relative inline-block" style={{ color: "#E8743B" }}>
                SEMAINE
                <svg aria-hidden className="absolute left-0 top-[52%] w-full" viewBox="0 0 300 10" preserveAspectRatio="none">
                  <motion.path d="M0,5 L300,5" stroke="#1A1A1A" strokeWidth="5" strokeLinecap="round" fill="none"
                    initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
                    transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }} viewport={vp} />
                </svg>
              </span><br />
              sur Excel.
            </h2>
          </motion.div>

          {/* Right */}
          <motion.div className="flex flex-col gap-5"
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            viewport={vp}
          >
            <motion.div
              className="rounded-2xl px-8 py-7"
              style={{ background: "#1A3C2A", border: "1px solid #0D2318" }}
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.28, type: "spring", stiffness: 120, damping: 14 }}
              viewport={vp}
            >
              <p className="mb-2 text-[13px] italic" style={{ fontFamily: "var(--font-fraunces)", color: "#F4C430" }}>
                avec LMNP Manager
              </p>
              <p className="font-bold tabular-nums leading-none"
                style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(52px, 7vw, 88px)", color: "#6FB04A" }}>
                20 MIN.
              </p>
              <p className="mt-3 text-[14px]" style={{ fontFamily: "var(--font-inter)", color: "#FBF5E855" }}>
                Soit 87 % de temps en moins sur la gestion courante.
              </p>
            </motion.div>

            <ul className="flex flex-col gap-2.5">
              {[
                "Dashboard mis à jour en temps réel",
                "Quittances générées en 1 clic",
                "Simulation 30 ans instantanée",
              ].map((item, i) => (
                <motion.li key={item} className="flex items-center gap-3"
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: 0.4 + i * 0.08 }}
                  viewport={vp}
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full" style={{ background: "#3A8B5C" }}>
                    <Check className="h-3 w-3 text-white" strokeWidth={3} />
                  </span>
                  <span className="text-[14px]" style={{ fontFamily: "var(--font-inter)", color: "#1A1A1A70" }}>{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
