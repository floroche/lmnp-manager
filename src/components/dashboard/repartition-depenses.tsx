"use client"

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
} from "recharts"
import { categorieLabel } from "@/lib/utils"

interface DepenseCategorie {
  categorie: string
  montant: number
}

interface RepartitionDepensesProps {
  data: DepenseCategorie[]
}

const COLORS = ["#1A3C2A", "#F4C430", "#E8743B", "#3A8B5C", "#6FB04A", "#5EC4E8", "#A07C10", "#2D5A3F"]

function CustomTooltip({
  active,
  payload,
}: {
  active?: boolean
  payload?: { name: string; value: number; payload: { categorie: string } }[]
}) {
  if (!active || !payload?.[0]) return null
  return (
    <div className="rounded-xl bg-white px-4 py-3" style={{ border: "1px solid #DDD0B4" }}>
      <p className="text-xs font-bold uppercase tracking-[0.14em]"
        style={{ fontFamily: "var(--font-inter)", color: "#1A1A1A" }}>
        {categorieLabel(payload[0].payload.categorie)}
      </p>
      <p className="mt-0.5 text-sm tabular-nums font-semibold" style={{ color: "#1A1A1A80" }}>
        {payload[0].value.toLocaleString("fr-FR")} €
      </p>
    </div>
  )
}

export function RepartitionDepenses({ data }: RepartitionDepensesProps) {
  const chartData = data.map((d) => ({
    ...d,
    name: categorieLabel(d.categorie),
  }))
  const total = data.reduce((s, d) => s + d.montant, 0)

  return (
    <div className="rounded-xl bg-white p-6" style={{ border: "1px solid #DDD0B4" }}>
      <h3 className="mb-6 text-lg font-bold" style={{ fontFamily: "var(--font-fraunces)", color: "#1A1A1A" }}>
        Répartition des dépenses
      </h3>
      <ResponsiveContainer width="100%" height={320}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={110}
            paddingAngle={3}
            dataKey="montant"
            nameKey="name"
            stroke="white"
            strokeWidth={3}
            cornerRadius={4}
          >
            {chartData.map((_, i) => (
              <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
            ))}
            <Label
              content={({ viewBox }) => {
                if (!viewBox || !("cx" in viewBox)) return null
                const { cx, cy = 0 } = viewBox as { cx: number; cy: number }
                return (
                  <g>
                    <text x={cx} y={cy - 8} textAnchor="middle" fill="#1A1A1A" fontSize={17} fontWeight="bold">
                      {total.toLocaleString("fr-FR")} €
                    </text>
                    <text x={cx} y={cy + 11} textAnchor="middle" fill="#1A1A1A55" fontSize={11}>
                      Total
                    </text>
                  </g>
                )
              }}
            />
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ fontSize: 13 }} iconType="circle" iconSize={10} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
