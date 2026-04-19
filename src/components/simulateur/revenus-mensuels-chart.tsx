"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts"
import { formatEuros } from "@/lib/utils"

interface RevenusMensuelsChartProps {
  loyerCC: number
  mensualiteCredit: number
  tresorerieMensuelle: number
}

function CustomTooltip({
  active,
  payload,
}: {
  active?: boolean
  payload?: { name: string; value: number; payload: { label: string } }[]
}) {
  if (!active || !payload?.[0]) return null
  return (
    <div className="rounded-xl bg-white px-4 py-3">
      <p className="text-xs font-bold uppercase tracking-[0.14em]"
        style={{ fontFamily: "var(--font-inter)", color: "#1A1A1A" }}>
        {payload[0].payload.label}
      </p>
      <p className="text-sm tabular-nums font-semibold" style={{ color: "#1A1A1A70" }}>
        {formatEuros(payload[0].value)}
      </p>
    </div>
  )
}

export function RevenusMensuelsChart({
  loyerCC,
  mensualiteCredit,
  tresorerieMensuelle,
}: RevenusMensuelsChartProps) {
  const data = [
    { label: "Loyer CC", value: loyerCC, color: "#3A8B5C" },
    { label: "Mensualité crédit", value: -mensualiteCredit, color: "#E8712A" },
    {
      label: "Trésorerie",
      value: tresorerieMensuelle,
      color: tresorerieMensuelle >= 0 ? "#3A8B5C" : "#D4622B",
    },
  ]

  return (
    <div className="rounded-xl bg-white p-6" style={{ border: "1px solid #DDD0B4" }}>
      <h3 className="mb-4 text-lg font-bold"
        style={{ fontFamily: "var(--font-fraunces)", color: "#1A1A1A" }}>
        Revenus mensuels
      </h3>
      <ResponsiveContainer width="100%" height={160}>
        <BarChart data={data} layout="vertical" margin={{ left: 10, right: 10 }}>
          <XAxis type="number" hide />
          <YAxis
            type="category"
            dataKey="label"
            width={120}
            tick={{ fill: "#1A1A1A70", fontSize: 13 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={24}>
            {data.map((d, i) => (
              <Cell key={i} fill={d.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
