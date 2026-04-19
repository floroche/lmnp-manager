import { Calendar, ShieldCheck, FileText } from "lucide-react"

interface Echeance {
  titre: string
  dateISO: string
  type: "loyer" | "assurance" | "fiscal"
}

interface ProchinesEcheancesProps {
  echeances: Echeance[]
}

const typeConfig = {
  loyer: { icon: Calendar, bg: "#1A3C2A", iconColor: "#FBF5E8" },
  assurance: { icon: ShieldCheck, bg: "#F4C430", iconColor: "#1A1A1A" },
  fiscal: { icon: FileText, bg: "#E8743B", iconColor: "#FBF5E8" },
}

function joursRestants(dateISO: string): number {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const target = new Date(dateISO)
  target.setHours(0, 0, 0, 0)
  return Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
}

function urgenceBadge(jours: number): { label: string; bg: string; color: string } {
  if (jours < 0) return { label: "Dépassé", bg: "#E8743B18", color: "#C45520" }
  if (jours < 30) return { label: `J-${jours}`, bg: "#E8743B18", color: "#C45520" }
  if (jours < 90) return { label: `J-${jours}`, bg: "#F4C43020", color: "#A07C10" }
  return { label: `J-${jours}`, bg: "#3A8B5C18", color: "#2A6B45" }
}

function formatDateFR(dateISO: string): string {
  return new Date(dateISO).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

export function ProchinesEcheances({ echeances }: ProchinesEcheancesProps) {
  return (
    <div className="rounded-xl bg-white p-6" style={{ border: "1px solid #DDD0B4" }}>
      <h3 className="mb-5 text-lg font-bold" style={{ fontFamily: "var(--font-fraunces)", color: "#1A1A1A" }}>
        Prochaines échéances
      </h3>
      <div className="space-y-3">
        {echeances.map((e, i) => {
          const config = typeConfig[e.type]
          const Icon = config.icon
          const jours = joursRestants(e.dateISO)
          const badge = urgenceBadge(jours)
          return (
            <div key={i} className="flex items-center gap-3 rounded-xl px-4 py-3"
              style={{ background: "#FBF5E8" }}>
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                style={{ background: config.bg }}>
                <Icon className="h-4 w-4" style={{ color: config.iconColor }} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold" style={{ color: "#1A1A1A" }}>{e.titre}</p>
                <p className="text-xs" style={{ color: "#1A1A1A55" }}>{formatDateFR(e.dateISO)}</p>
              </div>
              <span className="shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider tabular-nums"
                style={{ background: badge.bg, color: badge.color, fontFamily: "var(--font-inter)" }}>
                {badge.label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
