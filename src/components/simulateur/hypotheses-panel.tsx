"use client"

import type { SimulateurParams } from "@/types"
import { formatEuros } from "@/lib/utils"
import { RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HypothesesPanelProps {
  params: SimulateurParams
  defaults: SimulateurParams
  onChange: (params: SimulateurParams) => void
}

function SliderField({
  label,
  value,
  min,
  max,
  step,
  format,
  onChange,
}: {
  label: string
  value: number
  min: number
  max: number
  step: number
  format: (v: number) => string
  onChange: (v: number) => void
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">{label}</span>
        <span className="text-sm font-semibold">{format(value)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  )
}

const DUREES = [7, 10, 15, 20, 25]

export function HypothesesPanel({ params, defaults, onChange }: HypothesesPanelProps) {
  const set = (key: keyof SimulateurParams, value: number) => {
    onChange({ ...params, [key]: value })
  }

  const fmtEur = (v: number) => formatEuros(v)
  const fmtPct = (v: number) => `${v.toFixed(1).replace(".", ",")} %`
  const fmtAns = (v: number) => `${v} an${v > 1 ? "s" : ""}`

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="groovy-label text-sm text-muted-foreground">Hypothèses</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onChange(defaults)}
          className="h-8 gap-1.5 text-xs text-muted-foreground hover:text-foreground"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Réinitialiser
        </Button>
      </div>

      {/* Acquisition */}
      <details open className="group rounded-xl border bg-card p-4">
        <summary className="cursor-pointer text-sm font-bold select-none">
          Acquisition
        </summary>
        <div className="mt-4 space-y-4">
          <SliderField
            label="Prix FAI"
            value={params.prixFAI}
            min={50000}
            max={500000}
            step={1000}
            format={fmtEur}
            onChange={(v) => set("prixFAI", v)}
          />
          <SliderField
            label="Travaux"
            value={params.travaux}
            min={0}
            max={50000}
            step={500}
            format={fmtEur}
            onChange={(v) => set("travaux", v)}
          />
        </div>
      </details>

      {/* Location */}
      <details open className="group rounded-xl border bg-card p-4">
        <summary className="cursor-pointer text-sm font-bold select-none">
          Location
        </summary>
        <div className="mt-4 space-y-4">
          <SliderField
            label="Loyer CC"
            value={params.loyerMensuelCC}
            min={200}
            max={3000}
            step={10}
            format={fmtEur}
            onChange={(v) => set("loyerMensuelCC", v)}
          />
          <SliderField
            label="Évolution loyer"
            value={params.evolutionLoyer}
            min={0}
            max={5}
            step={0.1}
            format={fmtPct}
            onChange={(v) => set("evolutionLoyer", v)}
          />
        </div>
      </details>

      {/* Financement */}
      <details open className="group rounded-xl border bg-card p-4">
        <summary className="cursor-pointer text-sm font-bold select-none">
          Financement
        </summary>
        <div className="mt-4 space-y-4">
          <SliderField
            label="Apport"
            value={params.apport}
            min={0}
            max={300000}
            step={1000}
            format={fmtEur}
            onChange={(v) => set("apport", v)}
          />
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Durée emprunt</span>
              <span className="text-sm font-semibold">{params.dureeEmprunt} ans</span>
            </div>
            <div className="flex gap-2">
              {DUREES.map((d) => (
                <button
                  key={d}
                  onClick={() => set("dureeEmprunt", d)}
                  className={`flex-1 rounded-lg border py-1.5 text-xs font-semibold transition-colors ${
                    params.dureeEmprunt === d
                      ? "border-[#3A8B5C] bg-[#3A8B5C] text-white"
                      : "border-border bg-card text-muted-foreground hover:border-[#3A8B5C]/40"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
          <SliderField
            label="Taux intérêt"
            value={params.tauxInteret}
            min={0.5}
            max={8}
            step={0.05}
            format={fmtPct}
            onChange={(v) => set("tauxInteret", v)}
          />
        </div>
      </details>

      {/* Revente */}
      <details open className="group rounded-xl border bg-card p-4">
        <summary className="cursor-pointer text-sm font-bold select-none">
          Revente
        </summary>
        <div className="mt-4 space-y-4">
          <SliderField
            label="Évolution prix"
            value={params.evolutionPrix}
            min={-3}
            max={8}
            step={0.1}
            format={fmtPct}
            onChange={(v) => set("evolutionPrix", v)}
          />
          <SliderField
            label="Revente après"
            value={params.anneeRevente}
            min={1}
            max={30}
            step={1}
            format={fmtAns}
            onChange={(v) => set("anneeRevente", v)}
          />
        </div>
      </details>
    </div>
  )
}
