interface KpiCardProps {
  label: string
  value: string
  color?: "green" | "orange" | "red" | "gold"
}

const colorMap = {
  green: { bg: "#EEF7E8", valueColor: "#1A3C2A" },
  orange: { bg: "#FDEEE6", valueColor: "#C45520" },
  red: { bg: "#FDE8E0", valueColor: "#B03020" },
  gold: { bg: "#FFF8E0", valueColor: "#A07C10" },
}

export function KpiCard({ label, value, color = "green" }: KpiCardProps) {
  const c = colorMap[color]
  return (
    <div className="flex flex-col gap-2 rounded-xl p-5" style={{ background: c.bg }}>
      <p className="text-[11px] font-bold uppercase tracking-[0.16em]"
        style={{ fontFamily: "var(--font-inter)", color: "#1A1A1A45" }}>
        {label}
      </p>
      <p className="text-2xl font-bold tabular-nums"
        style={{ fontFamily: "var(--font-fraunces)", color: c.valueColor }}>
        {value}
      </p>
    </div>
  )
}
