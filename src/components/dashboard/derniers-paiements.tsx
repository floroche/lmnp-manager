import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { formatEuros, formatMois, formatDateShort, statutLabel } from "@/lib/utils"

interface Paiement {
  mois: string
  montantRecu: number
  datePaiement: string | null
  statut: string
}

interface DerniersPaiementsProps {
  paiements: Paiement[]
}

function statutStyle(statut: string): { bg: string; color: string } {
  switch (statut) {
    case "paye": return { bg: "#3A8B5C15", color: "#2A6B45" }
    case "en_retard": return { bg: "#F4C43020", color: "#A07C10" }
    case "impaye": return { bg: "#E8743B15", color: "#C45520" }
    default: return { bg: "#1A1A1A10", color: "#1A1A1A60" }
  }
}

export function DerniersPaiements({ paiements }: DerniersPaiementsProps) {
  return (
    <div className="rounded-xl bg-white p-6" style={{ border: "1px solid #DDD0B4" }}>
      <h3 className="mb-5 text-lg font-bold" style={{ fontFamily: "var(--font-fraunces)", color: "#1A1A1A" }}>
        Derniers paiements
      </h3>
      <Table>
        <TableHeader>
          <TableRow className="border-[#1A1A1A08]">
            <TableHead className="text-[11px] font-bold uppercase tracking-[0.14em]"
              style={{ fontFamily: "var(--font-inter)", color: "#1A1A1A40" }}>Mois</TableHead>
            <TableHead className="text-[11px] font-bold uppercase tracking-[0.14em]"
              style={{ fontFamily: "var(--font-inter)", color: "#1A1A1A40" }}>Montant</TableHead>
            <TableHead className="text-[11px] font-bold uppercase tracking-[0.14em]"
              style={{ fontFamily: "var(--font-inter)", color: "#1A1A1A40" }}>Date</TableHead>
            <TableHead className="text-[11px] font-bold uppercase tracking-[0.14em]"
              style={{ fontFamily: "var(--font-inter)", color: "#1A1A1A40" }}>Statut</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paiements.map((p, i) => {
            const style = statutStyle(p.statut)
            return (
              <TableRow key={i} className="border-[#1A1A1A06] transition-colors hover:bg-[#FBF5E8]">
                <TableCell className="font-semibold" style={{ color: "#1A1A1A" }}>
                  {formatMois(p.mois)}
                </TableCell>
                <TableCell className="tabular-nums font-semibold" style={{ color: "#1A1A1A" }}>
                  {formatEuros(p.montantRecu)}
                </TableCell>
                <TableCell style={{ color: "#1A1A1A55" }}>
                  {p.datePaiement ? formatDateShort(p.datePaiement) : "—"}
                </TableCell>
                <TableCell>
                  <span className="rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider"
                    style={{ background: style.bg, color: style.color, fontFamily: "var(--font-inter)" }}>
                    {statutLabel(p.statut)}
                  </span>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
