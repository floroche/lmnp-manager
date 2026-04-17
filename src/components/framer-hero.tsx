"use client"

/**
 * FramerHero — Landing hero 100% Framer Motion.
 * Pas de vidéo, pas de canvas, pas de GSAP. Juste Framer + le PNG mascotte.
 *
 * Patterns utilisés :
 *  - Flottement infini (y + rotate)
 *  - Entrée staggered au mount (variants)
 *  - Parallaxe scroll sur la mascotte (useScroll + useTransform)
 *  - Hover spring sur CTAs
 *  - Mascottes SVG qui apparaissent en spring autour de la maison
 */

import Image from "next/image"
import { motion, useScroll, useTransform, type Variants } from "framer-motion"
import { useRef } from "react"
import { LayoutDashboard, ArrowRight } from "lucide-react"
import { GroovyButton } from "@/components/groovy-button"
import {
  MascotSun,
  MascotFlower,
  MascotStar,
  MascotCoin,
} from "@/components/groovy-mascots"

// ─── Variants ───────────────────────────────────────────────────────────────

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
}

const slideUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 18 },
  },
}

const spring: Variants = {
  hidden: { opacity: 0, scale: 0.3, rotate: -30 },
  show: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { type: "spring", stiffness: 200, damping: 14 },
  },
}

// ─── Component ──────────────────────────────────────────────────────────────

export function FramerHero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  // Parallaxe : la mascotte monte plus lentement que le scroll
  const mascotY = useTransform(scrollYProgress, [0, 1], [0, -120])
  const mascotOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section
      ref={ref}
      className="relative flex min-h-dvh items-center justify-center overflow-hidden pt-20 pb-10"
      style={{ background: "#FBF5E8" }}
    >
      {/* ── Décor flottant : étoiles, fleurs, soleil, pièces ─── */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        <motion.div
          variants={spring}
          className="absolute left-[8%] top-[18%]"
          animate={{
            rotate: [0, 360],
            transition: { duration: 18, repeat: Infinity, ease: "linear" },
          }}
        >
          <MascotSun size={72} />
        </motion.div>

        <motion.div
          variants={spring}
          className="absolute right-[10%] top-[22%]"
          animate={{
            y: [0, -16, 0],
            rotate: [-8, 8, -8],
            transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <MascotStar size={56} />
        </motion.div>

        <motion.div
          variants={spring}
          className="absolute left-[12%] bottom-[18%]"
          animate={{
            y: [0, -10, 0],
            transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <MascotFlower size={48} />
        </motion.div>

        <motion.div
          variants={spring}
          className="absolute right-[14%] bottom-[22%]"
          animate={{
            y: [0, 14, 0],
            rotate: [0, 15, 0],
            transition: { duration: 5, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <MascotCoin size={56} />
        </motion.div>

        <motion.div
          variants={spring}
          className="absolute left-[22%] top-[55%]"
          animate={{
            rotate: [0, -360],
            transition: { duration: 24, repeat: Infinity, ease: "linear" },
          }}
        >
          <MascotFlower size={36} />
        </motion.div>

        <motion.div
          variants={spring}
          className="absolute right-[26%] top-[12%]"
          animate={{
            y: [0, -8, 0],
            transition: { duration: 3.5, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <MascotStar size={38} />
        </motion.div>
      </motion.div>

      {/* ── Contenu principal ─── */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto grid max-w-[1200px] items-center gap-12 px-6 sm:px-10 lg:grid-cols-[1fr_400px] lg:gap-16"
      >
        {/* Headline + CTAs */}
        <div>
          <motion.p
            variants={slideUp}
            className="-rotate-1 mb-5 inline-block text-xl sm:text-2xl"
            style={{ fontFamily: "var(--font-accent)", color: "#E8743B" }}
          >
            enfin une appli qui comprend les proprios LMNP
          </motion.p>

          <motion.h1
            variants={slideUp}
            className="font-bold uppercase leading-[0.85]"
            style={{
              fontFamily: "var(--font-display)",
              color: "#1A1A1A",
              fontSize: "clamp(54px, 8vw, 120px)",
            }}
          >
            Gérez votre
            <br />
            <span style={{ color: "#E8743B" }}>LMNP</span>
            <br />
            sans prise
            <br />
            de tête.
          </motion.h1>

          <motion.div
            variants={slideUp}
            className="mt-10 flex flex-wrap gap-4"
          >
            <motion.div whileHover={{ scale: 1.05, rotate: -2 }} whileTap={{ scale: 0.97 }}>
              <GroovyButton href="/dashboard" size="lg">
                <LayoutDashboard className="h-4 w-4" />
                Essayer gratuitement
              </GroovyButton>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05, rotate: 2 }} whileTap={{ scale: 0.97 }}>
              <GroovyButton href="/simulateur" variant="secondary" size="lg">
                Simuler ma rentabilité
                <ArrowRight className="h-4 w-4" />
              </GroovyButton>
            </motion.div>
          </motion.div>

          <motion.p
            variants={slideUp}
            className="mt-4 text-sm"
            style={{ fontFamily: "var(--font-body)", color: "#1A1A1A55" }}
          >
            14 jours gratuits · sans carte bancaire · sans engagement
          </motion.p>
        </div>

        {/* Mascotte PNG : flottement + parallaxe scroll */}
        <motion.div
          variants={spring}
          style={{ y: mascotY, opacity: mascotOpacity }}
          className="relative mx-auto aspect-[3/4] w-[280px] sm:w-[340px] lg:w-[400px]"
        >
          <motion.div
            animate={{
              y: [0, -18, 0],
              rotate: [-2, 2, -2],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="h-full w-full"
          >
            <Image
              src="/mascot-house.png"
              alt="Mascotte LMNP Manager"
              fill
              priority
              className="object-contain drop-shadow-xl"
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* ── Scroll hint ─── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="pointer-events-none absolute inset-x-0 bottom-6 flex flex-col items-center gap-1.5"
      >
        <span
          className="text-lg sm:text-xl"
          style={{ fontFamily: "var(--font-accent)", color: "#1A1A1A88" }}
        >
          défiler pour en savoir plus
        </span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          className="text-xl"
          style={{ color: "#1A1A1A66" }}
        >
          ↓
        </motion.span>
      </motion.div>
    </section>
  )
}
