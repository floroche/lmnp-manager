import { Sidebar } from "@/components/layout/sidebar"
import { MobileHeader } from "@/components/layout/mobile-header"

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <MobileHeader />
      <Sidebar />
      <main className="min-h-dvh pt-14 p-4 lg:ml-[280px] lg:pt-0 lg:p-8">
        {children}
      </main>
    </>
  )
}
