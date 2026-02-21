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
import { categorieLabel } from "@/lib/utils"

interface DepenseCategorie {
  categorie: string
  montant: number
}

interface RepartitionDepensesProps {
  data: DepenseCategorie[]
}

const COLORS = ["#c8722a", "#d4a843", "#8b5e34", "#4a5d3a", "#b8a88a", "#7a6e5d", "#c44b2f", "#6b8e5a"]

function CustomTooltip({
  active,
  payload,
}: {
  active?: boolean
  payload?: { name: string; value: number; payload: { categorie: string } }[]
}) {
  if (!active || !payload?.[0]) return null
  return (
    <div className="rounded-lg border border-border bg-card p-3 shadow-md">
      <p className="text-sm font-medium">
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

  return (
    <Card className="border-border/50 bg-card py-0 shadow-sm">
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
              paddingAngle={2}
              dataKey="montant"
              nameKey="name"
            >
              {chartData.map((_, i) => (
                <Cell
                  key={`cell-${i}`}
                  fill={COLORS[i % COLORS.length]}
                  stroke="none"
                />
              ))}
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
