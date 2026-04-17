import { Card, CardContent } from "@/components/ui/card"
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
  loyer: { icon: Calendar, bg: "bg-primary", iconColor: "text-white" },
  assurance: { icon: ShieldCheck, bg: "bg-accent", iconColor: "text-foreground" },
  fiscal: { icon: FileText, bg: "bg-[#E8712A]", iconColor: "text-white" },
}

function joursRestants(dateISO: string): number {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const target = new Date(dateISO)
  target.setHours(0, 0, 0, 0)
  return Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
}

function urgenceBadge(jours: number) {
  if (jours < 0) return { label: "Dépassé", cls: "bg-destructive/10 text-destructive" }
  if (jours < 30) return { label: `J-${jours}`, cls: "bg-destructive/10 text-destructive" }
  if (jours < 90) return { label: `J-${jours}`, cls: "bg-[#E8712A]/10 text-[#E8712A]" }
  return { label: `J-${jours}`, cls: "bg-primary/10 text-primary" }
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
    <Card className="py-0">
      <CardContent className="p-6">
        <h3 className="mb-5 text-lg font-bold">Prochaines échéances</h3>
        <div className="space-y-3">
          {echeances.map((e, i) => {
            const config = typeConfig[e.type]
            const Icon = config.icon
            const jours = joursRestants(e.dateISO)
            const badge = urgenceBadge(jours)
            return (
              <div key={i} className="flex items-center gap-3 rounded-xl bg-secondary/60 px-4 py-3">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${config.bg}`}
                >
                  <Icon className={`h-4 w-4 ${config.iconColor}`} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">{e.titre}</p>
                  <p className="text-xs text-muted-foreground">{formatDateFR(e.dateISO)}</p>
                </div>
                <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold tabular-nums ${badge.cls}`}>
                  {badge.label}
                </span>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
