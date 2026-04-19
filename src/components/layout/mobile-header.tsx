"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Menu,
  LayoutDashboard,
  Home,
  UserRound,
  Coins,
  FileText,
  BarChart3,
  Calendar,
  FolderOpen,
  Landmark,
  Calculator,
  Users,
  User,
} from "lucide-react"
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet"
import Image from "next/image"
import { cn } from "@/lib/utils"

const navItems = [
  { name: "Tableau de bord", href: "/dashboard", icon: LayoutDashboard },
  { name: "Mon bien", href: "/bien", icon: Home, comingSoon: true },
  { name: "Locataire", href: "/locataire", icon: UserRound, comingSoon: true },
  { name: "Loyers", href: "/loyers", icon: Coins, comingSoon: true },
  { name: "Quittances", href: "/quittances", icon: FileText, comingSoon: true },
  { name: "Dépenses", href: "/depenses", icon: BarChart3, comingSoon: true },
  { name: "Crédit", href: "/credit", icon: Landmark },
  { name: "Simulateur", href: "/simulateur", icon: Calculator },
  { name: "Contacts", href: "/contacts", icon: Users },
  { name: "Calendrier", href: "/calendrier", icon: Calendar, comingSoon: true },
  { name: "Documents", href: "/documents", icon: FolderOpen, comingSoon: true },
]

export function MobileHeader() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex h-14 items-center justify-between bg-[#1A3C2A] px-4 lg:hidden shadow-lg">
      <div className="flex items-center gap-2.5">
        <Image src="/mascot.png" alt="Mascotte LMNP" width={26} height={26} quality={100} className="object-contain" />
        <span
          className="text-base font-bold text-[#F4C430]"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          LMNP Manager
        </span>
      </div>

      <button
        onClick={() => setOpen(true)}
        className="flex h-9 w-9 items-center justify-center rounded-lg text-white/70 transition-colors hover:bg-white/10 hover:text-white"
        aria-label="Ouvrir la navigation"
      >
        <Menu className="h-5 w-5" />
      </button>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-[280px] border-none bg-[#1A3C2A] p-0">
          <SheetTitle className="sr-only">Navigation principale</SheetTitle>

          <div className="flex items-center gap-3 px-5 py-5">
            <Image src="/mascot.png" alt="Mascotte LMNP" width={37} height={37} quality={100} className="object-contain" />
            <div>
              <p
                className="font-bold text-[#F4C430]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                LMNP Manager
              </p>
              <p className="text-xs text-white/40">Gestion locative</p>
            </div>
          </div>

          <nav className="mt-1 space-y-0.5 px-3">
            {navItems.map((item) => {
              const isActive =
                item.href === "/dashboard"
                  ? pathname === "/dashboard"
                  : pathname.startsWith(item.href)

              if (item.comingSoon) {
                return (
                  <div
                    key={item.name}
                    className="flex cursor-not-allowed items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-white/25"
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.name}</span>
                    <span className="ml-auto text-[10px] uppercase tracking-wider text-white/20">
                      Bientôt
                    </span>
                  </div>
                )
              }

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all",
                    isActive
                      ? "bg-[#F4C430]/20 text-[#F4C430] shadow-[0_2px_8px_-2px_rgba(0,0,0,0.2)]"
                      : "text-white/55 hover:bg-white/8 hover:text-white/80"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          <div className="mx-3 mt-4 flex items-center gap-3 rounded-xl bg-white/8 px-4 py-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F4C430]/20">
              <User className="h-4 w-4 text-[#F4C430]" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">Propriétaire</p>
              <p className="text-xs text-white/40">Usage personnel</p>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  )
}
