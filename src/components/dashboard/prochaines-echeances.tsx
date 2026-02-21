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
    bg: "bg-[#4a5d3a]",
  },
  assurance: {
    icon: ShieldCheck,
    bg: "bg-[#c8722a]",
  },
  fiscal: {
    icon: FileText,
    bg: "bg-[#8b5e34]",
  },
}

export function ProchinesEcheances({ echeances }: ProchinesEcheancesProps) {
  return (
    <Card className="border-border/50 bg-card py-0 shadow-sm">
      <CardContent className="p-6">
        <h3 className="mb-5 text-lg font-bold">Prochaines échéances</h3>
        <div className="space-y-4">
          {echeances.map((e, i) => {
            const config = typeConfig[e.type]
            const Icon = config.icon
            return (
              <div key={i} className="flex items-center gap-4">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${config.bg}`}
                >
                  <Icon className="h-4 w-4 text-white" />
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
