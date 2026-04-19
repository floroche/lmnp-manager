import { Sidebar } from "@/components/layout/sidebar"
import { MobileHeader } from "@/components/layout/mobile-header"
import { AppLoader } from "@/components/app-loader"

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <AppLoader />
      <MobileHeader />
      <Sidebar />
      <main className="min-h-dvh pt-14 p-4 lg:ml-[280px] lg:pt-10 lg:p-8">
        {children}
      </main>
    </>
  )
}
