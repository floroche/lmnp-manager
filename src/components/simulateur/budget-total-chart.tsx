"use client"

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

const COLORS = ["#1A3C2A", "#F4C430", "#E8743B"]

function CustomTooltip({
  active,
  payload,
}: {
  active?: boolean
  payload?: { name: string; value: number }[]
}) {
  if (!active || !payload?.[0]) return null
  return (
    <div className="rounded-xl bg-white px-4 py-3">
      <p className="text-xs font-bold uppercase tracking-[0.14em]"
        style={{ fontFamily: "var(--font-inter)", color: "#1A1A1A" }}>
        {payload[0].name}
      </p>
      <p className="text-sm tabular-nums font-semibold" style={{ color: "#1A1A1A70" }}>
        {formatEuros(payload[0].value)}
      </p>
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
    <div className="rounded-xl bg-white p-6" style={{ border: "1px solid #DDD0B4" }}>
      <h3 className="mb-1 text-lg font-bold"
        style={{ fontFamily: "var(--font-fraunces)", color: "#1A1A1A" }}>
        Budget total
      </h3>
      <p className="mb-4 text-2xl font-bold tabular-nums" style={{ fontFamily: "var(--font-fraunces)", color: "#1A3C2A" }}>
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
    </div>
  )
}
