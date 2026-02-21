"use client"

import { Card, CardContent } from "@/components/ui/card"
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { formatEuros } from "@/lib/utils"

interface BudgetTotalChartProps {
  prixFAI: number
  travaux: number
  fraisNotaire: number
  budgetTotal: number
}

const COLORS = ["#3A8B5C", "#F5B731", "#E8712A"]

function CustomTooltip({
  active,
  payload,
}: {
  active?: boolean
  payload?: { name: string; value: number }[]
}) {
  if (!active || !payload?.[0]) return null
  return (
    <div className="rounded-xl border bg-white p-3 shadow-[0_8px_24px_-4px_rgba(26,60,42,0.12)]">
      <p className="text-sm font-semibold">{payload[0].name}</p>
      <p className="text-sm text-muted-foreground">{formatEuros(payload[0].value)}</p>
    </div>
  )
}

export function BudgetTotalChart({
  prixFAI,
  travaux,
  fraisNotaire,
  budgetTotal,
}: BudgetTotalChartProps) {
  const data = [
    { name: "Prix FAI", value: prixFAI },
    { name: "Travaux", value: travaux },
    { name: "Frais notaire", value: fraisNotaire },
  ].filter((d) => d.value > 0)

  return (
    <Card className="py-0">
      <CardContent className="p-6">
        <h3 className="mb-1 text-lg font-bold">Budget total</h3>
        <p className="mb-4 text-2xl font-bold text-[#3A8B5C]" style={{ fontFamily: "var(--font-display)" }}>
          {formatEuros(budgetTotal)}
        </p>
        <ResponsiveContainer width="100%" height={240}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={95}
              paddingAngle={3}
              dataKey="value"
              nameKey="name"
              stroke="white"
              strokeWidth={3}
              cornerRadius={4}
            >
              {data.map((_, i) => (
                <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: 13 }} iconType="circle" iconSize={10} />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
