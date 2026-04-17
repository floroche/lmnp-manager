import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Home } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <Image src="/mascot-house.png" alt="Mascotte LMNP" width={100} height={100} className="object-contain" />
      <h1 className="mt-6 text-4xl font-bold">404</h1>
      <p className="mt-2 text-lg text-muted-foreground">
        Oups, cette page n'existe pas !
      </p>
      <Button asChild className="mt-6">
        <Link href="/dashboard">
          <Home className="h-4 w-4" />
          Retour au tableau de bord
        </Link>
      </Button>
    </div>
  )
}
