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
    <div className="rounded-lg border border-border bg-card p-3 shadow-md">
      <p className="mb-1 text-sm font-medium">{label}</p>
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
    <Card className="border-border/50 bg-card py-0 shadow-sm">
      <CardContent className="p-6">
        <h3 className="mb-6 text-lg font-bold">Revenus vs Dépenses</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} barGap={2}>
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
              iconType="square"
              iconSize={10}
            />
            <Bar
              dataKey="revenus"
              name="Revenus"
              fill="#c8722a"
              radius={[3, 3, 0, 0]}
              maxBarSize={24}
            />
            <Bar
              dataKey="depenses"
              name="Dépenses"
              fill="#d4a843"
              radius={[3, 3, 0, 0]}
              maxBarSize={24}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
