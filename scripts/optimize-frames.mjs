/**
 * optimize-frames.mjs — Convertit des PNG en WebP optimisés pour la scroll animation
 *
 * Usage :
 *   node scripts/optimize-frames.mjs [--input ./frames-src] [--output ./public/scroll-animation]
 *
 * Pré-requis : npm install sharp --save-dev
 *
 * Paramètres :
 *   --input   Dossier source des PNG (défaut : ./frames-src)
 *   --output  Dossier de sortie WebP (défaut : ./public/scroll-animation)
 *   --mobile  Génère aussi les frames mobiles (720p)
 *   --quality Qualité WebP 1-100 (défaut : 82)
 */

import { createRequire } from "module"
import { readdir, mkdir } from "fs/promises"
import { join, extname, basename } from "path"

const require = createRequire(import.meta.url)
let sharp
try {
  sharp = require("sharp")
} catch {
  console.error("❌  sharp non installé. Lancez : npm install sharp --save-dev")
  process.exit(1)
}

// ─── Lecture des arguments ────────────────────────────────────────────────────
const args = process.argv.slice(2)
const get  = (flag, def) => { const i = args.indexOf(flag); return i !== -1 ? args[i + 1] : def }

const INPUT_DIR   = get("--input",   "./frames-src")
const OUTPUT_DIR  = get("--output",  "./public/scroll-animation")
const WITH_MOBILE = args.includes("--mobile")
const QUALITY     = parseInt(get("--quality", "82"), 10)

const DESKTOP_W = 1920
const MOBILE_W  = 720

// ─── Traitement ───────────────────────────────────────────────────────────────
await mkdir(OUTPUT_DIR, { recursive: true })

const files = (await readdir(INPUT_DIR))
  .filter(f => [".png", ".jpg", ".jpeg"].includes(extname(f).toLowerCase()))
  .sort()

if (files.length === 0) {
  console.error(`❌  Aucune image trouvée dans ${INPUT_DIR}`)
  process.exit(1)
}

console.log(`📸  ${files.length} frame(s) à traiter — qualité WebP ${QUALITY}`)

let i = 0
for (const file of files) {
  i++
  const num    = String(i).padStart(4, "0")
  const src    = join(INPUT_DIR, file)
  const dest   = join(OUTPUT_DIR, `frame-${num}.webp`)
  const destMo = join(OUTPUT_DIR, `frame-mobile-${num}.webp`)

  await sharp(src)
    .resize(DESKTOP_W, null, { withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toFile(dest)

  if (WITH_MOBILE) {
    await sharp(src)
      .resize(MOBILE_W, null, { withoutEnlargement: true })
      .webp({ quality: QUALITY - 5 })
      .toFile(destMo)
  }

  if (i % 10 === 0 || i === files.length) {
    process.stdout.write(`\r  ${i}/${files.length} frames converties…`)
  }
}

console.log(`\n✅  Frames exportées dans ${OUTPUT_DIR}`)
if (WITH_MOBILE) console.log(`   + frames mobiles (720p)`)
