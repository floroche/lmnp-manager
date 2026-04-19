"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Check } from "lucide-react"

export function CtaSection() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setSubmitted(true)
    setTimeout(() => { window.location.href = "/dashboard" }, 1500)
  }

  return (
    <section className="border-t-2 border-[#1A1A1A] py-24 sm:py-32" style={{ background: "#F4C430" }}>
      <div className="mx-auto max-w-[760px] px-6 text-center sm:px-10">

        <motion.p className="mb-4 text-[14px] italic"
          style={{ fontFamily: "var(--font-fraunces)", color: "#1A3C2A" }}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          viewport={{ once: true }}
        >
          Prêt à simplifier votre gestion ?
        </motion.p>

        <motion.h2
          className="leading-[0.88] tracking-[-0.02em]"
          style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(40px, 6vw, 86px)", color: "#1A1A1A", fontWeight: 700 }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08 }}
          viewport={{ once: true }}
        >
          Essayez gratuitement<br />
          <em style={{ color: "#1A3C2A" }}>pendant 14 jours.</em>
        </motion.h2>

        <motion.div className="mt-10"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.18 }}
          viewport={{ once: true }}
        >
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form key="form" onSubmit={handleSubmit}
                className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
                exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}
              >
                <input
                  type="email" required value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="votre@email.fr"
                  className="w-full rounded-full px-5 py-3 text-[14px] outline-none sm:w-72"
                  style={{
                    fontFamily: "var(--font-inter)",
                    color: "#1A1A1A",
                    background: "#FFFFFF",
                    border: "1.5px solid #1A1A1A",
                    boxShadow: "2px 2px 0 #1A1A1A",
                  }}
                />
                <button type="submit"
                  className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-[13px] font-bold transition-all hover:opacity-85 whitespace-nowrap"
                  style={{
                    fontFamily: "var(--font-inter)",
                    background: "#1A1A1A",
                    color: "#FBF5E8",
                    border: "1.5px solid #1A1A1A",
                    boxShadow: "2px 2px 0 #1A3C2A",
                  }}
                >
                  Démarrer <ArrowRight className="h-4 w-4" />
                </button>
              </motion.form>
            ) : (
              <motion.div key="ok"
                className="flex flex-col items-center gap-3"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 18 }}
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full"
                  style={{ background: "#1A3C2A" }}>
                  <Check className="h-6 w-6" style={{ color: "#6FB04A" }} strokeWidth={3} />
                </span>
                <p className="text-[15px] font-semibold" style={{ fontFamily: "var(--font-fraunces)", color: "#1A3C2A" }}>
                  C'est parti ! On vous prépare tout.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <p className="mt-6 text-[13px]" style={{ fontFamily: "var(--font-inter)", color: "#1A1A1A60" }}>
          14 jours gratuits · sans carte bancaire · sans engagement
        </p>
      </div>
    </section>
  )
}
