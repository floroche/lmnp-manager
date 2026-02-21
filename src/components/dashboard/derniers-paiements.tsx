import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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

function statutBadgeClass(statut: string) {
  switch (statut) {
    case "paye":
      return "bg-[#4a5d3a]/15 text-[#4a5d3a] hover:bg-[#4a5d3a]/15 border-0"
    case "en_retard":
      return "bg-[#c8722a]/15 text-[#c8722a] hover:bg-[#c8722a]/15 border-0"
    case "impaye":
      return "bg-[#c44b2f]/15 text-[#c44b2f] hover:bg-[#c44b2f]/15 border-0"
    default:
      return ""
  }
}

export function DerniersPaiements({ paiements }: DerniersPaiementsProps) {
  return (
    <Card className="border-border/50 bg-card py-0 shadow-sm">
      <CardContent className="p-6">
        <h3 className="mb-5 text-lg font-bold">Derniers paiements</h3>
        <Table>
          <TableHeader>
            <TableRow className="border-border/50">
              <TableHead className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                Mois
              </TableHead>
              <TableHead className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                Montant
              </TableHead>
              <TableHead className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                Date
              </TableHead>
              <TableHead className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                Statut
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paiements.map((p, i) => (
              <TableRow key={i} className="border-border/30">
                <TableCell className="font-medium">
                  {formatMois(p.mois)}
                </TableCell>
                <TableCell>{formatEuros(p.montantRecu)}</TableCell>
                <TableCell className="text-muted-foreground">
                  {p.datePaiement
                    ? formatDateShort(p.datePaiement)
                    : "—"}
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className={statutBadgeClass(p.statut)}>
                    {statutLabel(p.statut)}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
