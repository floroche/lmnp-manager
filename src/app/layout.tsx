import type { Metadata } from "next";
import { Fredoka, Nunito } from "next/font/google";
import { Sidebar } from "@/components/layout/sidebar";
import "./globals.css";

const fredoka = Fredoka({
  variable: "--font-heading",
  subsets: ["latin"],
});

const nunito = Nunito({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LMNP Manager — Gestion locative",
  description: "Application de gestion locative pour LMNP",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${fredoka.variable} ${nunito.variable} antialiased`}
      >
        <Sidebar />
        <main className="ml-[280px] min-h-screen p-8">{children}</main>
      </body>
    </html>
  );
}
