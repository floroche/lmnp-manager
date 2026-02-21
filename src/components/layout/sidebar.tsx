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
  User,
} from "lucide-react"

const navigation = [
  { name: "Tableau de bord", href: "/", icon: LayoutDashboard },
  { name: "Mon bien", href: "/bien", icon: Home },
  { name: "Locataire", href: "/locataire", icon: UserRound },
  { name: "Loyers", href: "/loyers", icon: Coins },
  { name: "Quittances", href: "/quittances", icon: FileText },
  { name: "Dépenses", href: "/depenses", icon: BarChart3 },
  { name: "Calendrier", href: "/calendrier", icon: Calendar },
  { name: "Documents", href: "/documents", icon: FolderOpen },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed inset-y-0 left-0 z-50 flex w-[280px] flex-col bg-[var(--sidebar)]">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-6">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#c8722a]">
          <Home className="h-5 w-5 text-white" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-white">LMNP Manager</h1>
          <p className="text-xs text-[var(--sidebar-foreground)] opacity-70">
            Gestion locative
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="mt-2 flex-1 space-y-1 px-4">
        {navigation.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href)
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-[var(--sidebar-accent)] text-white"
                  : "text-[var(--sidebar-foreground)] hover:bg-[var(--sidebar-accent)]/50 hover:text-white"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>

      {/* Profil utilisateur */}
      <div className="mx-4 mb-4 flex items-center gap-3 rounded-xl bg-[var(--sidebar-accent)]/60 px-4 py-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#c8722a]/30">
          <User className="h-5 w-5 text-[#c8722a]" />
        </div>
        <div>
          <p className="text-sm font-medium text-white">Propriétaire</p>
          <p className="text-xs text-[var(--sidebar-foreground)] opacity-70">
            Usage personnel
          </p>
        </div>
      </div>
    </aside>
  )
}
