import { prisma } from "@/lib/db"
import Image from "next/image"
import { ContactsList } from "@/components/contacts/contacts-list"

export const dynamic = "force-dynamic"

export default async function ContactsPage() {
  const property = await prisma.property.findFirst()
  const propertyId = property?.id ?? ""

  const contacts = property
    ? await prisma.contact.findMany({
        where: { propertyId: property.id },
        orderBy: { metier: "asc" },
      })
    : []

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      {/* En-tête */}
      <div className="flex items-center gap-4">
        <Image src="/mascot-house.png" alt="Mascotte LMNP" width={56} height={56} className="object-contain" />
        <div>
          <h1 className="text-3xl font-bold">Contacts utiles</h1>
          <p className="mt-1 text-muted-foreground">
            Vos prestataires et interlocuteurs pour la gestion du bien
          </p>
        </div>
      </div>

      <div className="groovy-stripe" />

      <ContactsList contacts={contacts} propertyId={propertyId} />
    </div>
  )
}
