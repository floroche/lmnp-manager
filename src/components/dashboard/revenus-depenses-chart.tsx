"use client"

import { Card, CardContent } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

interface RevenusDepensesData {
  mois: string
  revenus: number
  depenses: number
}

interface RevenusDepensesChartProps {
  data: RevenusDepensesData[]
}

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean
  payload?: { value: number; name: string; color: string }[]
  label?: string
}) {
  if (!active || !payload) return null
  return (
    <div className="rounded-xl border bg-white p-3 shadow-[0_8px_24px_-4px_rgba(26,60,42,0.12)]">
      <p className="mb-1 text-sm font-semibold">{label}</p>
      {payload.map((entry, i) => (
        <p key={i} className="text-sm" style={{ color: entry.color }}>
          {entry.name} : {entry.value.toLocaleString("fr-FR")} &euro;
        </p>
      ))}
    </div>
  )
}

export function RevenusDepensesChart({ data }: RevenusDepensesChartProps) {
  return (
    <Card className="py-0">
      <CardContent className="p-6">
        <h3 className="mb-6 text-lg font-bold">Revenus vs Dépenses</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} barGap={4}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--border)"
              vertical={false}
            />
            <XAxis
              dataKey="mois"
              tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `${v}€`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ fontSize: 13 }}
              iconType="circle"
              iconSize={10}
            />
            <Bar
              dataKey="revenus"
              name="Revenus"
              fill="#3A8B5C"
              radius={[8, 8, 0, 0]}
              maxBarSize={28}
            />
            <Bar
              dataKey="depenses"
              name="Dépenses"
              fill="#F5B731"
              radius={[8, 8, 0, 0]}
              maxBarSize={28}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
