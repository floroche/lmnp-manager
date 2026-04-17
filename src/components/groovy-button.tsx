import { cn } from "@/lib/utils"
import Link from "next/link"

interface GroovyButtonProps {
  href?: string
  onClick?: () => void
  children: React.ReactNode
  variant?: "primary" | "secondary"
  size?: "default" | "lg"
  className?: string
}

export function GroovyButton({
  href,
  onClick,
  children,
  variant = "primary",
  size = "default",
  className,
}: GroovyButtonProps) {
  const cls = cn(
    "groovy-sticker inline-flex cursor-pointer items-center justify-center gap-2 font-bold uppercase tracking-wide",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#1A1A1A]",
    variant === "primary" ? "bg-[#F4C430] text-[#1A1A1A]" : "bg-[#FBF5E8] text-[#1A1A1A]",
    size === "lg"
      ? "px-7 py-3.5 text-sm sm:px-10 sm:py-5 sm:text-base"
      : "px-5 py-3 text-sm",
    className,
  )

  const style = { fontFamily: "var(--font-display)" }

  if (href) {
    return (
      <Link href={href} className={cls} style={style}>
        {children}
      </Link>
    )
  }

  return (
    <button type="button" onClick={onClick} className={cls} style={style}>
      {children}
    </button>
  )
}
