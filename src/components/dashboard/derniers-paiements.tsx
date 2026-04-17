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
      return "bg-[#3A8B5C]/12 text-[#3A8B5C] hover:bg-[#3A8B5C]/12 border-0"
    case "en_retard":
      return "bg-[#F5B731]/15 text-[#D49A1A] hover:bg-[#F5B731]/15 border-0"
    case "impaye":
      return "bg-[#D4622B]/12 text-[#D4622B] hover:bg-[#D4622B]/12 border-0"
    default:
      return ""
  }
}

export function DerniersPaiements({ paiements }: DerniersPaiementsProps) {
  return (
    <Card className="py-0">
      <CardContent className="p-6">
        <h3 className="mb-5 text-lg font-bold">Derniers paiements</h3>
        <Table>
          <TableHeader>
            <TableRow className="border-border/50">
              <TableHead className="groovy-label text-xs text-muted-foreground">
                Mois
              </TableHead>
              <TableHead className="groovy-label text-xs text-muted-foreground">
                Montant
              </TableHead>
              <TableHead className="groovy-label text-xs text-muted-foreground">
                Date
              </TableHead>
              <TableHead className="groovy-label text-xs text-muted-foreground">
                Statut
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paiements.map((p, i) => (
              <TableRow key={i} className="border-border/30 transition-colors hover:bg-secondary/40">
                <TableCell className="font-medium">
                  {formatMois(p.mois)}
                </TableCell>
                <TableCell className="tabular-nums font-medium">{formatEuros(p.montantRecu)}</TableCell>
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
