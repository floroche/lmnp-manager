import type { LucideIcon } from "lucide-react"

interface FeatureChipProps {
  icon: LucideIcon
  label: string
}

export function FeatureChip({ icon: Icon, label }: FeatureChipProps) {
  return (
    <div
      className="groovy-sticker inline-flex items-center gap-3 px-5 py-3"
      style={{ background: "#FBF5E8" }}
    >
      <Icon className="h-5 w-5 shrink-0" style={{ color: "#E8743B" }} />
      <span
        className="text-sm font-bold uppercase tracking-wide"
        style={{ fontFamily: "var(--font-display)", color: "#1A1A1A" }}
      >
        {label}
      </span>
    </div>
  )
}
