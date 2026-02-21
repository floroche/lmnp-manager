import { Card, CardContent } from "@/components/ui/card"
import { Calendar, ShieldCheck, FileText } from "lucide-react"

interface Echeance {
  titre: string
  date: string
  type: "loyer" | "assurance" | "fiscal"
}

interface ProchinesEcheancesProps {
  echeances: Echeance[]
}

const typeConfig = {
  loyer: {
    icon: Calendar,
    bg: "bg-[#3A8B5C]",
  },
  assurance: {
    icon: ShieldCheck,
    bg: "bg-[#F5B731]",
    iconColor: "text-[#1A3C2A]",
  },
  fiscal: {
    icon: FileText,
    bg: "bg-[#E8712A]",
  },
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
            const iconColor = "iconColor" in config ? config.iconColor : "text-white"
            return (
              <div key={i} className="flex items-center gap-4 rounded-xl bg-secondary/60 px-4 py-3">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${config.bg}`}
                >
                  <Icon className={`h-4 w-4 ${iconColor}`} />
                </div>
                <div>
                  <p className="text-sm font-medium">{e.titre}</p>
                  <p className="text-xs text-muted-foreground">{e.date}</p>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
