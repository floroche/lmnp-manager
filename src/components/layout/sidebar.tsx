"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
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
import Image from "next/image"

const navigation = [
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

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-[280px] flex-col bg-[#1A3C2A] lg:flex">
      {/* Logo avec mascotte */}
      <div className="flex items-center gap-3 px-5 py-5">
        <Image src="/mascot-house.png" alt="Mascotte LMNP" width={40} height={52} className="object-contain" />
        <div>
          <h1 className="text-lg font-bold text-[#F5B731]" style={{ fontFamily: "var(--font-display)" }}>
            LMNP Manager
          </h1>
          <p className="text-xs text-white/45">
            Gestion locative
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="mt-2 flex-1 space-y-0.5 px-3">
        {navigation.map((item) => {
          const isActive =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(item.href)

          if (item.comingSoon) {
            return (
              <div
                key={item.name}
                className="flex cursor-not-allowed items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-white/25"
                title="Bientôt disponible"
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
                <span className="ml-auto rounded-full bg-white/10 px-1.5 py-0.5 text-[10px] uppercase tracking-wider text-white/30">
                  Bientôt
                </span>
              </div>
            )
          }

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all",
                isActive
                  ? "bg-white/15 text-white shadow-[0_2px_8px_-2px_rgba(0,0,0,0.2)]"
                  : "text-white/55 hover:bg-white/8 hover:text-white/85"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>

      {/* Profil utilisateur */}
      <div className="mx-3 mb-4 flex items-center gap-3 rounded-xl bg-white/8 px-4 py-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F5B731]/20">
          <User className="h-5 w-5 text-[#F5B731]" />
        </div>
        <div>
          <p className="text-sm font-medium text-white">Propriétaire</p>
          <p className="text-xs text-white/40">
            Usage personnel
          </p>
        </div>
      </div>
    </aside>
  )
}
