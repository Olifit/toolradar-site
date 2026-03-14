import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "toolradar.de – AI-Tools vergleichen & finden",
    template: "%s | toolradar.de",
  },
  description:
    "Der unabhängige Vergleich für AI-Tools im DACH-Raum. Ehrliche Tests, Preise im Überblick und die besten Empfehlungen für KI-Software.",
  metadataBase: new URL("https://toolradar.de"),
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: "toolradar.de",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="border-b border-gray-200 bg-white">
          <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <a href="/" className="text-xl font-bold text-gray-900">
              toolradar<span className="text-blue-600">.de</span>
            </a>
            <div className="flex gap-6 text-sm text-gray-600">
              <a href="/tools" className="hover:text-gray-900">
                Alle Tools
              </a>
              <a href="/#kategorien" className="hover:text-gray-900">
                Kategorien
              </a>
            </div>
          </nav>
        </header>
        <main className="mx-auto max-w-6xl px-6 py-8">{children}</main>
        <footer className="border-t border-gray-200 bg-gray-50">
          <div className="mx-auto max-w-6xl px-6 py-8 text-sm text-gray-500">
            <p>© 2026 toolradar.de — Ein IGNOVA Projekt</p>
            <p className="mt-1">
              Affiliate-Hinweis: Wir provisionieren über Partner-Links. Für dich
              entstehen keine Mehrkosten.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
