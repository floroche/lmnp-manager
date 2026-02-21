/*
 * Mascottes groovy style "rubber hose" cartoon / sticker art
 * Gros yeux expressifs, mains gantées, jambes fines + sneakers, outlines épaisses
 */

/** Maison cartoon — grands yeux, bouche ouverte, bras écartés, jambes + sneakers */
export function MascotHouse({ size = 48, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size * 1.25} viewBox="-4 0 108 125" fill="none" className={className}>
      {/* Toit */}
      <path d="M50 6L14 38H86L50 6Z" fill="#3A8B5C" stroke="#1A3C2A" strokeWidth="3" strokeLinejoin="round" />
      {/* Cheminée */}
      <rect x="64" y="12" width="10" height="18" rx="2" fill="#E8712A" stroke="#1A3C2A" strokeWidth="2.5" />
      {/* Corps maison */}
      <rect x="22" y="38" width="56" height="38" rx="5" fill="white" stroke="#1A3C2A" strokeWidth="3" />

      {/* Grands yeux (style sticker — ovales blancs + grosses pupilles) */}
      <ellipse cx="38" cy="52" rx="9" ry="10" fill="white" stroke="#1A3C2A" strokeWidth="2.5" />
      <ellipse cx="62" cy="52" rx="9" ry="10" fill="white" stroke="#1A3C2A" strokeWidth="2.5" />
      {/* Pupilles */}
      <ellipse cx="40" cy="53" rx="4.5" ry="5.5" fill="#1A3C2A" />
      <ellipse cx="64" cy="53" rx="4.5" ry="5.5" fill="#1A3C2A" />
      {/* Reflets */}
      <circle cx="42" cy="50" r="2" fill="white" />
      <circle cx="66" cy="50" r="2" fill="white" />
      {/* Petits sourcils joyeux */}
      <path d="M31 44C33 41 37 40 41 42" stroke="#1A3C2A" strokeWidth="2" strokeLinecap="round" />
      <path d="M59 42C63 40 67 41 69 44" stroke="#1A3C2A" strokeWidth="2" strokeLinecap="round" />

      {/* Grande bouche ouverte souriante */}
      <path d="M38 64C42 72 58 72 62 64" fill="#E8712A" stroke="#1A3C2A" strokeWidth="2.5" strokeLinecap="round" />
      {/* Langue */}
      <ellipse cx="50" cy="69" rx="5" ry="3" fill="#F07050" />

      {/* Bras gauche écarté + main gantée */}
      <path d="M22 52C14 46 6 48 6 52" stroke="#1A3C2A" strokeWidth="3" strokeLinecap="round" />
      {/* Main gantée gauche (doigts écartés) */}
      <circle cx="5" cy="50" r="6" fill="white" stroke="#1A3C2A" strokeWidth="2.5" />
      <path d="M2 47L0 44" stroke="#1A3C2A" strokeWidth="2" strokeLinecap="round" />
      <path d="M5 46L5 42" stroke="#1A3C2A" strokeWidth="2" strokeLinecap="round" />
      <path d="M8 47L10 44" stroke="#1A3C2A" strokeWidth="2" strokeLinecap="round" />

      {/* Bras droit levé + main gantée */}
      <path d="M78 52C86 44 92 42 94 46" stroke="#1A3C2A" strokeWidth="3" strokeLinecap="round" />
      {/* Main gantée droite */}
      <circle cx="95" cy="44" r="6" fill="white" stroke="#1A3C2A" strokeWidth="2.5" />
      <path d="M92 41L90 38" stroke="#1A3C2A" strokeWidth="2" strokeLinecap="round" />
      <path d="M95 40L95 36" stroke="#1A3C2A" strokeWidth="2" strokeLinecap="round" />
      <path d="M98 41L100 38" stroke="#1A3C2A" strokeWidth="2" strokeLinecap="round" />

      {/* Jambes fines */}
      <path d="M38 76L34 100" stroke="#1A3C2A" strokeWidth="3" strokeLinecap="round" />
      <path d="M62 76L66 100" stroke="#1A3C2A" strokeWidth="3" strokeLinecap="round" />
      {/* Sneakers gauche */}
      <ellipse cx="30" cy="104" rx="10" ry="6" fill="white" stroke="#1A3C2A" strokeWidth="2.5" />
      <path d="M24 103H36" stroke="#1A3C2A" strokeWidth="1.5" />
      <circle cx="27" cy="101" r="1.2" fill="#3A8B5C" />
      {/* Sneakers droite */}
      <ellipse cx="70" cy="104" rx="10" ry="6" fill="white" stroke="#1A3C2A" strokeWidth="2.5" />
      <path d="M64 103H76" stroke="#1A3C2A" strokeWidth="1.5" />
      <circle cx="73" cy="101" r="1.2" fill="#3A8B5C" />
    </svg>
  )
}

/** Soleil cartoon — lunettes, bouche ouverte, bras + mains gantées, jambes + sneakers */
export function MascotSun({ size = 48, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size * 1.4} viewBox="-4 0 110 140" fill="none" className={className}>
      {/* Rayons (épais, arrondis) */}
      {[0, 40, 80, 120, 160, 200, 240, 280, 320].map((angle) => (
        <line
          key={angle}
          x1="50"
          y1="44"
          x2={50 + 40 * Math.cos((angle * Math.PI) / 180)}
          y2={44 + 40 * Math.sin((angle * Math.PI) / 180)}
          stroke="#F5B731"
          strokeWidth="6"
          strokeLinecap="round"
        />
      ))}
      {/* Corps */}
      <circle cx="50" cy="44" r="28" fill="#F5B731" stroke="#1A3C2A" strokeWidth="3" />

      {/* Grands yeux */}
      <ellipse cx="40" cy="40" rx="8" ry="9" fill="white" stroke="#1A3C2A" strokeWidth="2.5" />
      <ellipse cx="60" cy="40" rx="8" ry="9" fill="white" stroke="#1A3C2A" strokeWidth="2.5" />
      {/* Pupilles */}
      <ellipse cx="42" cy="41" rx="4" ry="5" fill="#1A3C2A" />
      <ellipse cx="62" cy="41" rx="4" ry="5" fill="#1A3C2A" />
      {/* Reflets */}
      <circle cx="44" cy="38" r="1.8" fill="white" />
      <circle cx="64" cy="38" r="1.8" fill="white" />
      {/* Sourcils */}
      <path d="M34 33C36 30 40 29 44 31" stroke="#1A3C2A" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M56 31C60 29 64 30 66 33" stroke="#1A3C2A" strokeWidth="2.5" strokeLinecap="round" />

      {/* Joues rosées */}
      <circle cx="30" cy="50" r="4" fill="#E8712A" opacity="0.25" />
      <circle cx="70" cy="50" r="4" fill="#E8712A" opacity="0.25" />

      {/* Grande bouche souriante ouverte */}
      <path d="M38 54C43 64 57 64 62 54" fill="#E8712A" stroke="#1A3C2A" strokeWidth="2.5" strokeLinecap="round" />
      <ellipse cx="50" cy="59" rx="5" ry="3" fill="#F07050" />

      {/* Bras gauche + main gantée */}
      <path d="M24 56C12 62 4 58 4 54" stroke="#1A3C2A" strokeWidth="3" strokeLinecap="round" />
      <circle cx="3" cy="52" r="6" fill="white" stroke="#1A3C2A" strokeWidth="2.5" />
      <path d="M0 49L-2 46" stroke="#1A3C2A" strokeWidth="2" strokeLinecap="round" />
      <path d="M3 48L3 44" stroke="#1A3C2A" strokeWidth="2" strokeLinecap="round" />
      <path d="M6 49L8 46" stroke="#1A3C2A" strokeWidth="2" strokeLinecap="round" />

      {/* Bras droit levé + main gantée (salut!) */}
      <path d="M76 48C86 38 92 34 96 38" stroke="#1A3C2A" strokeWidth="3" strokeLinecap="round" />
      <circle cx="97" cy="36" r="6" fill="white" stroke="#1A3C2A" strokeWidth="2.5" />
      <path d="M94 33L92 30" stroke="#1A3C2A" strokeWidth="2" strokeLinecap="round" />
      <path d="M97 32L97 28" stroke="#1A3C2A" strokeWidth="2" strokeLinecap="round" />
      <path d="M100 33L102 30" stroke="#1A3C2A" strokeWidth="2" strokeLinecap="round" />

      {/* Jambes fines (une jambe levée = danse!) */}
      <path d="M42 72L36 104" stroke="#1A3C2A" strokeWidth="3" strokeLinecap="round" />
      <path d="M58 72L68 96" stroke="#1A3C2A" strokeWidth="3" strokeLinecap="round" />
      {/* Sneaker gauche (au sol) */}
      <ellipse cx="32" cy="108" rx="10" ry="6" fill="white" stroke="#1A3C2A" strokeWidth="2.5" />
      <path d="M26 107H38" stroke="#1A3C2A" strokeWidth="1.5" />
      <circle cx="29" cy="105" r="1.2" fill="#F5B731" />
      {/* Sneaker droite (en l'air — kick!) */}
      <ellipse cx="74" cy="96" rx="9" ry="5.5" fill="white" stroke="#1A3C2A" strokeWidth="2.5" transform="rotate(-20 74 96)" />
      <path d="M68 95.5H80" stroke="#1A3C2A" strokeWidth="1.5" transform="rotate(-20 74 96)" />
      <circle cx="71" cy="93" r="1.2" fill="#F5B731" />
    </svg>
  )
}

/** Pièce de monnaie dansante — mêmes traits cartoon */
export function MascotCoin({ size = 48, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size * 1.3} viewBox="0 0 100 130" fill="none" className={className}>
      {/* Corps pièce */}
      <circle cx="50" cy="44" r="28" fill="#F5B731" stroke="#1A3C2A" strokeWidth="3" />
      <circle cx="50" cy="44" r="20" stroke="#E8A00E" strokeWidth="2" strokeDasharray="4 4" />

      {/* Grands yeux */}
      <ellipse cx="40" cy="38" rx="8" ry="9" fill="white" stroke="#1A3C2A" strokeWidth="2.5" />
      <ellipse cx="60" cy="38" rx="8" ry="9" fill="white" stroke="#1A3C2A" strokeWidth="2.5" />
      <ellipse cx="42" cy="39" rx="4" ry="5" fill="#1A3C2A" />
      <ellipse cx="62" cy="39" rx="4" ry="5" fill="#1A3C2A" />
      <circle cx="44" cy="36" r="1.8" fill="white" />
      <circle cx="64" cy="36" r="1.8" fill="white" />
      {/* Sourcils */}
      <path d="M34 31C36 28 40 27 44 29" stroke="#1A3C2A" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M56 29C60 27 64 28 66 31" stroke="#1A3C2A" strokeWidth="2.5" strokeLinecap="round" />

      {/* Bouche ouverte */}
      <path d="M40 52C44 60 56 60 60 52" fill="#E8712A" stroke="#1A3C2A" strokeWidth="2.5" strokeLinecap="round" />
      <ellipse cx="50" cy="56" rx="4" ry="2.5" fill="#F07050" />

      {/* Bras gauche + main gantée levée */}
      <path d="M22 44C12 34 6 32 4 36" stroke="#1A3C2A" strokeWidth="3" strokeLinecap="round" />
      <circle cx="3" cy="34" r="6" fill="white" stroke="#1A3C2A" strokeWidth="2.5" />
      <path d="M0 31L-2 28" stroke="#1A3C2A" strokeWidth="2" strokeLinecap="round" />
      <path d="M3 30L3 26" stroke="#1A3C2A" strokeWidth="2" strokeLinecap="round" />
      <path d="M6 31L8 28" stroke="#1A3C2A" strokeWidth="2" strokeLinecap="round" />

      {/* Bras droit + main gantée levée */}
      <path d="M78 44C88 34 94 32 96 36" stroke="#1A3C2A" strokeWidth="3" strokeLinecap="round" />
      <circle cx="97" cy="34" r="6" fill="white" stroke="#1A3C2A" strokeWidth="2.5" />
      <path d="M94 31L92 28" stroke="#1A3C2A" strokeWidth="2" strokeLinecap="round" />
      <path d="M97 30L97 26" stroke="#1A3C2A" strokeWidth="2" strokeLinecap="round" />
      <path d="M100 31L102 28" stroke="#1A3C2A" strokeWidth="2" strokeLinecap="round" />

      {/* Jambes (une pliée, danse) */}
      <path d="M42 72L36 102" stroke="#1A3C2A" strokeWidth="3" strokeLinecap="round" />
      <path d="M58 72L64 94L58 102" stroke="#1A3C2A" strokeWidth="3" strokeLinecap="round" fill="none" />
      {/* Sneaker gauche */}
      <ellipse cx="32" cy="106" rx="10" ry="6" fill="white" stroke="#1A3C2A" strokeWidth="2.5" />
      <path d="M26 105H38" stroke="#1A3C2A" strokeWidth="1.5" />
      <circle cx="29" cy="103" r="1.2" fill="#3A8B5C" />
      {/* Sneaker droite */}
      <ellipse cx="54" cy="106" rx="10" ry="6" fill="white" stroke="#1A3C2A" strokeWidth="2.5" />
      <path d="M48 105H60" stroke="#1A3C2A" strokeWidth="1.5" />
      <circle cx="51" cy="103" r="1.2" fill="#3A8B5C" />
    </svg>
  )
}

/** Mini banque cartoon — fronton à colonnes, grands yeux, bras + mains gantées, jambes + sneakers */
export function MascotBank({ size = 48, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size * 1.25} viewBox="-4 0 108 125" fill="none" className={className}>
      {/* Fronton triangulaire */}
      <path d="M50 4L16 32H84L50 4Z" fill="#3A8B5C" stroke="#1A3C2A" strokeWidth="3" strokeLinejoin="round" />
      {/* Symbole € dans le fronton */}
      <text x="50" y="26" textAnchor="middle" fill="#F5B731" fontWeight="bold" fontSize="14" fontFamily="sans-serif">€</text>

      {/* Corps bâtiment */}
      <rect x="20" y="32" width="60" height="40" rx="4" fill="white" stroke="#1A3C2A" strokeWidth="3" />

      {/* Colonnes */}
      <rect x="28" y="34" width="5" height="36" rx="2.5" fill="#E6F0E9" stroke="#1A3C2A" strokeWidth="1.5" />
      <rect x="67" y="34" width="5" height="36" rx="2.5" fill="#E6F0E9" stroke="#1A3C2A" strokeWidth="1.5" />

      {/* Grands yeux */}
      <ellipse cx="41" cy="48" rx="8" ry="9" fill="white" stroke="#1A3C2A" strokeWidth="2.5" />
      <ellipse cx="59" cy="48" rx="8" ry="9" fill="white" stroke="#1A3C2A" strokeWidth="2.5" />
      {/* Pupilles */}
      <ellipse cx="43" cy="49" rx="4" ry="5" fill="#1A3C2A" />
      <ellipse cx="61" cy="49" rx="4" ry="5" fill="#1A3C2A" />
      {/* Reflets */}
      <circle cx="45" cy="46" r="1.8" fill="white" />
      <circle cx="63" cy="46" r="1.8" fill="white" />
      {/* Sourcils */}
      <path d="M35 40C37 37 41 36 45 38" stroke="#1A3C2A" strokeWidth="2" strokeLinecap="round" />
      <path d="M55 38C59 36 63 37 65 40" stroke="#1A3C2A" strokeWidth="2" strokeLinecap="round" />

      {/* Bouche souriante */}
      <path d="M41 60C45 67 55 67 59 60" fill="#E8712A" stroke="#1A3C2A" strokeWidth="2.5" strokeLinecap="round" />
      <ellipse cx="50" cy="64" rx="4" ry="2.5" fill="#F07050" />

      {/* Bras gauche + main gantée */}
      <path d="M20 50C12 44 6 46 6 50" stroke="#1A3C2A" strokeWidth="3" strokeLinecap="round" />
      <circle cx="5" cy="48" r="6" fill="white" stroke="#1A3C2A" strokeWidth="2.5" />
      <path d="M2 45L0 42" stroke="#1A3C2A" strokeWidth="2" strokeLinecap="round" />
      <path d="M5 44L5 40" stroke="#1A3C2A" strokeWidth="2" strokeLinecap="round" />
      <path d="M8 45L10 42" stroke="#1A3C2A" strokeWidth="2" strokeLinecap="round" />

      {/* Bras droit + main gantée */}
      <path d="M80 50C88 44 94 42 96 46" stroke="#1A3C2A" strokeWidth="3" strokeLinecap="round" />
      <circle cx="97" cy="44" r="6" fill="white" stroke="#1A3C2A" strokeWidth="2.5" />
      <path d="M94 41L92 38" stroke="#1A3C2A" strokeWidth="2" strokeLinecap="round" />
      <path d="M97 40L97 36" stroke="#1A3C2A" strokeWidth="2" strokeLinecap="round" />
      <path d="M100 41L102 38" stroke="#1A3C2A" strokeWidth="2" strokeLinecap="round" />

      {/* Jambes */}
      <path d="M40 72L36 98" stroke="#1A3C2A" strokeWidth="3" strokeLinecap="round" />
      <path d="M60 72L64 98" stroke="#1A3C2A" strokeWidth="3" strokeLinecap="round" />
      {/* Sneaker gauche */}
      <ellipse cx="32" cy="102" rx="10" ry="6" fill="white" stroke="#1A3C2A" strokeWidth="2.5" />
      <path d="M26 101H38" stroke="#1A3C2A" strokeWidth="1.5" />
      <circle cx="29" cy="99" r="1.2" fill="#3A8B5C" />
      {/* Sneaker droite */}
      <ellipse cx="68" cy="102" rx="10" ry="6" fill="white" stroke="#1A3C2A" strokeWidth="2.5" />
      <path d="M62 101H74" stroke="#1A3C2A" strokeWidth="1.5" />
      <circle cx="71" cy="99" r="1.2" fill="#3A8B5C" />
    </svg>
  )
}

/** Fleur 70s décorative avec mini visage */
export function MascotFlower({ size = 32, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      {/* Pétales */}
      {[0, 60, 120, 180, 240, 300].map((angle) => (
        <ellipse
          key={angle}
          cx={24 + 12 * Math.cos((angle * Math.PI) / 180)}
          cy={24 + 12 * Math.sin((angle * Math.PI) / 180)}
          rx="8"
          ry="8"
          fill="#3A8B5C"
          stroke="#1A3C2A"
          strokeWidth="1.5"
          transform={`rotate(${angle} ${24 + 12 * Math.cos((angle * Math.PI) / 180)} ${24 + 12 * Math.sin((angle * Math.PI) / 180)})`}
        />
      ))}
      {/* Centre */}
      <circle cx="24" cy="24" r="9" fill="#F5B731" stroke="#1A3C2A" strokeWidth="2" />
      {/* Yeux */}
      <ellipse cx="21" cy="23" rx="2" ry="2.5" fill="white" stroke="#1A3C2A" strokeWidth="1" />
      <ellipse cx="27" cy="23" rx="2" ry="2.5" fill="white" stroke="#1A3C2A" strokeWidth="1" />
      <circle cx="21.5" cy="23.5" r="1.2" fill="#1A3C2A" />
      <circle cx="27.5" cy="23.5" r="1.2" fill="#1A3C2A" />
      {/* Sourire */}
      <path d="M21 27.5C22.5 29.5 25.5 29.5 27 27.5" stroke="#1A3C2A" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

/** Étoile joyeuse — grands yeux, bouche ouverte, bras + mains gantées, jambes + sneakers */
export function MascotStar({ size = 48, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size * 1.25} viewBox="-4 0 108 125" fill="none" className={className}>
      {/* Corps étoile */}
      <path
        d="M50 4L60 32H90L66 50L74 78L50 60L26 78L34 50L10 32H40L50 4Z"
        fill="#F5B731"
        stroke="#1A3C2A"
        strokeWidth="3"
        strokeLinejoin="round"
      />

      {/* Grands yeux (style sticker — ovales blancs + grosses pupilles) */}
      <ellipse cx="40" cy="40" rx="8" ry="9" fill="white" stroke="#1A3C2A" strokeWidth="2.5" />
      <ellipse cx="60" cy="40" rx="8" ry="9" fill="white" stroke="#1A3C2A" strokeWidth="2.5" />
      {/* Pupilles */}
      <ellipse cx="42" cy="41" rx="4" ry="5" fill="#1A3C2A" />
      <ellipse cx="62" cy="41" rx="4" ry="5" fill="#1A3C2A" />
      {/* Reflets */}
      <circle cx="44" cy="38" r="1.8" fill="white" />
      <circle cx="64" cy="38" r="1.8" fill="white" />
      {/* Sourcils joyeux */}
      <path d="M34 33C36 30 40 29 44 31" stroke="#1A3C2A" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M56 31C60 29 64 30 66 33" stroke="#1A3C2A" strokeWidth="2.5" strokeLinecap="round" />

      {/* Joues rosées */}
      <circle cx="32" cy="50" r="4" fill="#E8712A" opacity="0.25" />
      <circle cx="68" cy="50" r="4" fill="#E8712A" opacity="0.25" />

      {/* Grande bouche ouverte souriante */}
      <path d="M40 54C44 63 56 63 60 54" fill="#E8712A" stroke="#1A3C2A" strokeWidth="2.5" strokeLinecap="round" />
      <ellipse cx="50" cy="59" rx="5" ry="3" fill="#F07050" />

      {/* Bras gauche + main gantée */}
      <path d="M22 48C12 42 4 44 4 48" stroke="#1A3C2A" strokeWidth="3" strokeLinecap="round" />
      <circle cx="3" cy="46" r="6" fill="white" stroke="#1A3C2A" strokeWidth="2.5" />
      <path d="M0 43L-2 40" stroke="#1A3C2A" strokeWidth="2" strokeLinecap="round" />
      <path d="M3 42L3 38" stroke="#1A3C2A" strokeWidth="2" strokeLinecap="round" />
      <path d="M6 43L8 40" stroke="#1A3C2A" strokeWidth="2" strokeLinecap="round" />

      {/* Bras droit levé + main gantée (salut!) */}
      <path d="M78 48C88 38 92 34 96 38" stroke="#1A3C2A" strokeWidth="3" strokeLinecap="round" />
      <circle cx="97" cy="36" r="6" fill="white" stroke="#1A3C2A" strokeWidth="2.5" />
      <path d="M94 33L92 30" stroke="#1A3C2A" strokeWidth="2" strokeLinecap="round" />
      <path d="M97 32L97 28" stroke="#1A3C2A" strokeWidth="2" strokeLinecap="round" />
      <path d="M100 33L102 30" stroke="#1A3C2A" strokeWidth="2" strokeLinecap="round" />

      {/* Jambes fines */}
      <path d="M42 74L36 100" stroke="#1A3C2A" strokeWidth="3" strokeLinecap="round" />
      <path d="M58 74L64 100" stroke="#1A3C2A" strokeWidth="3" strokeLinecap="round" />
      {/* Sneaker gauche */}
      <ellipse cx="32" cy="104" rx="10" ry="6" fill="white" stroke="#1A3C2A" strokeWidth="2.5" />
      <path d="M26 103H38" stroke="#1A3C2A" strokeWidth="1.5" />
      <circle cx="29" cy="101" r="1.2" fill="#F5B731" />
      {/* Sneaker droite */}
      <ellipse cx="68" cy="104" rx="10" ry="6" fill="white" stroke="#1A3C2A" strokeWidth="2.5" />
      <path d="M62 103H74" stroke="#1A3C2A" strokeWidth="1.5" />
      <circle cx="71" cy="101" r="1.2" fill="#F5B731" />
    </svg>
  )
}
