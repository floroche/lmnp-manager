interface DaisyCornerProps {
  position: "tl" | "tr" | "bl" | "br"
  size?: number
  rotation?: number
}

const positions: Record<string, string> = {
  tl: "top-6 left-6 sm:top-8 sm:left-8",
  tr: "top-6 right-6 sm:top-8 sm:right-8",
  bl: "bottom-6 left-6 sm:bottom-8 sm:left-8",
  br: "bottom-6 right-6 sm:bottom-8 sm:right-8",
}

export function DaisyCorner({ position, size = 36, rotation = 0 }: DaisyCornerProps) {
  return (
    <div
      className={`absolute pointer-events-none ${positions[position]}`}
      style={{ transform: `rotate(${rotation}deg)` }}
      aria-hidden="true"
    >
      <svg width={size} height={size} viewBox="-2 -2 44 44" fill="none">
        <ellipse cx="20" cy="8" rx="5" ry="9" fill="white" stroke="#1A1A1A" strokeWidth="2.5" />
        <ellipse cx="20" cy="32" rx="5" ry="9" fill="white" stroke="#1A1A1A" strokeWidth="2.5" />
        <ellipse cx="8" cy="20" rx="9" ry="5" fill="white" stroke="#1A1A1A" strokeWidth="2.5" />
        <ellipse cx="32" cy="20" rx="9" ry="5" fill="white" stroke="#1A1A1A" strokeWidth="2.5" />
        <circle cx="20" cy="20" r="7" fill="#F4C430" stroke="#1A1A1A" strokeWidth="2.5" />
        <circle cx="20" cy="20" r="2.5" fill="#1A1A1A" />
      </svg>
    </div>
  )
}
