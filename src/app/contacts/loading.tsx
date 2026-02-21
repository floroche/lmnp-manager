import { Card } from "@/components/ui/card"

export default function ContactsLoading() {
  return (
    <div className="mx-auto max-w-6xl space-y-6">
      {/* En-tête skeleton */}
      <div className="flex items-center gap-4">
        <div className="h-[70px] w-[48px] animate-pulse rounded-lg bg-muted" />
        <div className="space-y-2">
          <div className="h-8 w-48 animate-pulse rounded-md bg-muted" />
          <div className="h-4 w-72 animate-pulse rounded-md bg-muted" />
        </div>
      </div>

      <div className="groovy-stripe" />

      {/* Bouton skeleton */}
      <div className="flex justify-end">
        <div className="h-9 w-28 animate-pulse rounded-md bg-muted" />
      </div>

      {/* Grille de cartes skeleton */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="gap-0 py-0">
            <div className="flex items-start gap-3 px-5 pt-5 pb-3">
              <div className="h-10 w-10 shrink-0 animate-pulse rounded-xl bg-muted" />
              <div className="flex-1 space-y-2">
                <div className="h-3 w-16 animate-pulse rounded bg-muted" />
                <div className="h-4 w-32 animate-pulse rounded bg-muted" />
              </div>
            </div>
            <div className="space-y-2 px-5 pb-3">
              <div className="h-3.5 w-36 animate-pulse rounded bg-muted" />
              <div className="h-3.5 w-28 animate-pulse rounded bg-muted" />
            </div>
            <div className="border-t px-3 py-3">
              <div className="h-4 w-16 animate-pulse rounded bg-muted" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
