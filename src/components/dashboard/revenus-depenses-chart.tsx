"use client"

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
    <div className="rounded-xl bg-white px-4 py-3" style={{ border: "1px solid #DDD0B4" }}>
      <p className="mb-1.5 text-xs font-bold uppercase tracking-[0.14em]"
        style={{ fontFamily: "var(--font-inter)", color: "#1A1A1A" }}>{label}</p>
      {payload.map((entry, i) => (
        <p key={i} className="text-sm font-medium tabular-nums" style={{ color: entry.color }}>
          {entry.name} : {entry.value.toLocaleString("fr-FR")} €
        </p>
      ))}
    </div>
  )
}

export function RevenusDepensesChart({ data }: RevenusDepensesChartProps) {
  return (
    <div className="rounded-xl bg-white p-6" style={{ border: "1px solid #DDD0B4" }}>
      <div className="mb-6 flex items-baseline justify-between">
        <h3 className="text-lg font-bold" style={{ fontFamily: "var(--font-fraunces)", color: "#1A1A1A" }}>
          Revenus vs Dépenses
        </h3>
        <span className="text-[11px] font-bold uppercase tracking-[0.14em]"
          style={{ fontFamily: "var(--font-inter)", color: "#1A1A1A40" }}>
          12 derniers mois
        </span>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} barGap={4}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1A1A1A08" vertical={false} />
          <XAxis
            dataKey="mois"
            tick={{ fill: "#1A1A1A55", fontSize: 12, fontFamily: "var(--font-inter)" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "#1A1A1A55", fontSize: 12, fontFamily: "var(--font-inter)" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `${v}€`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ fontSize: 13 }} iconType="circle" iconSize={10} />
          <Bar dataKey="revenus" name="Revenus" fill="#3A8B5C" radius={[8, 8, 0, 0]} maxBarSize={28} />
          <Bar dataKey="depenses" name="Dépenses" fill="#E8743B" radius={[8, 8, 0, 0]} maxBarSize={28} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
