"use client"

import { Card, CardContent } from "@/components/ui/card"
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

const COLORS = ["#3A8B5C", "#F5B731", "#2D6B45", "#E8712A", "#7BC4A0", "#D4622B", "#A8D88E", "#D49A1A"]

function CustomTooltip({
  active,
  payload,
}: {
  active?: boolean
  payload?: { name: string; value: number; payload: { categorie: string } }[]
}) {
  if (!active || !payload?.[0]) return null
  return (
    <div className="rounded-xl border bg-white p-3 shadow-[0_8px_24px_-4px_rgba(26,60,42,0.12)]">
      <p className="text-sm font-semibold">
        {categorieLabel(payload[0].payload.categorie)}
      </p>
      <p className="text-sm text-muted-foreground">
        {payload[0].value.toLocaleString("fr-FR")} &euro;
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
    <Card className="py-0">
      <CardContent className="p-6">
        <h3 className="mb-6 text-lg font-bold">Répartition des dépenses</h3>
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
                <Cell
                  key={`cell-${i}`}
                  fill={COLORS[i % COLORS.length]}
                />
              ))}
              <Label
                content={({ viewBox }) => {
                  if (!viewBox || !("cx" in viewBox)) return null
                  const { cx, cy = 0 } = viewBox as { cx: number; cy: number }
                  return (
                    <g>
                      <text x={cx} y={cy - 8} textAnchor="middle" fill="#1A3C2A" fontSize={17} fontWeight="bold">
                        {total.toLocaleString("fr-FR")} €
                      </text>
                      <text x={cx} y={cy + 11} textAnchor="middle" fill="#5A7D66" fontSize={11}>
                        Total
                      </text>
                    </g>
                  )
                }}
              />
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ fontSize: 13 }}
              iconType="circle"
              iconSize={10}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
