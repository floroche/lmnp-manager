export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Grain texture — landing page only */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[999]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          backgroundSize: "220px",
          opacity: 0.045,
          mixBlendMode: "multiply",
        }}
      />
      {children}
    </>
  )
}
