import { prisma } from "@/lib/db"
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
      <div>
        <h1 className="text-3xl font-bold tracking-tight"
          style={{ fontFamily: "var(--font-fraunces)", color: "#1A1A1A" }}>
          Contacts utiles
        </h1>
        <p className="mt-0.5 text-sm" style={{ fontFamily: "var(--font-inter)", color: "#1A1A1A55" }}>
          Vos prestataires et interlocuteurs pour la gestion du bien
        </p>
      </div>

      <ContactsList contacts={contacts} propertyId={propertyId} />
    </div>
  )
}
