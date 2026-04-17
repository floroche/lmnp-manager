import type { Metadata } from "next"
import { Fredoka, Caveat, Nunito } from "next/font/google"
import "./globals.css"

const fredoka = Fredoka({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
})

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

const nunito = Nunito({
  variable: "--font-body",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "LMNP Manager — Gestion locative",
  description: "Application de gestion locative pour LMNP",
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <head>
        <link rel="preload" as="image" href="/scroll-animation/frame-0001.webp" />
      </head>
      <body className={`${fredoka.variable} ${caveat.variable} ${nunito.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}
