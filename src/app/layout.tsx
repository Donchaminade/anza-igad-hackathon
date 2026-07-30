import type { Metadata, Viewport } from "next";
import { Fraunces, Source_Sans_3 } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["500", "600", "700"],
});

const body = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source",
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "ANZA — From threshold to action",
  description:
    "Trigger-to-Action PWA: ICPAC-style drought thresholds explained into persona action briefs + SMS for Turkana, Kenya.",
  applicationName: "ANZA",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "ANZA",
  },
  openGraph: {
    title: "ANZA — From threshold to action",
    description:
      "When an ICPAC-style drought threshold trips, ANZA explains why and ships 3 early actions + SMS for field actors.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#b86b2e",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} h-full`}>
      <body
        className="min-h-full flex flex-col"
        style={
          {
            "--font-display": "var(--font-fraunces), Georgia, serif",
            "--font-body": "var(--font-source), Segoe UI, sans-serif",
          } as React.CSSProperties
        }
      >
        <header className="site-header">
          <Link href="/" className="brand">
            AN<span>ZA</span>
          </Link>
          <nav className="nav-links" aria-label="Primary">
            <Link href="/alerts">Alerts</Link>
            <Link href="/about">About</Link>
          </nav>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="site-footer">
          <strong>ANZA</strong> complements ICPAC early warning — it does not replace Drought Watch,
          Hazard Watch, or HUSIKA. Demo fixtures for IGAD Hackathon 2026.
        </footer>
      </body>
    </html>
  );
}
