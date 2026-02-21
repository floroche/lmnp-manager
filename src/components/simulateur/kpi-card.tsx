import { Card, CardContent } from "@/components/ui/card"

interface KpiCardProps {
  label: string
  value: string
  color?: "green" | "orange" | "red" | "gold"
}

const colorMap = {
  green: { gradient: "from-[#3A8B5C] to-[#5BAF7A]", text: "text-[#3A8B5C]" },
  orange: { gradient: "from-[#E8712A] to-[#F5B731]", text: "text-[#E8712A]" },
  red: { gradient: "from-[#D4622B] to-[#E8712A]", text: "text-[#D4622B]" },
  gold: { gradient: "from-[#F5B731] to-[#F5D76E]", text: "text-[#D49A1A]" },
}

export function KpiCard({ label, value, color = "green" }: KpiCardProps) {
  const c = colorMap[color]
  return (
    <Card className="py-0 groovy-hover overflow-hidden">
      <div className={`h-1.5 bg-gradient-to-r ${c.gradient}`} />
      <CardContent className="p-5">
        <p className="groovy-label text-xs text-muted-foreground">{label}</p>
        <p
          className={`mt-2 text-2xl font-bold ${c.text}`}
          style={{ fontFamily: "var(--font-display)" }}
        >
          {value}
        </p>
      </CardContent>
    </Card>
  )
}
