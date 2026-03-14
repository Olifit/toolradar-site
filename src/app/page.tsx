import { getAllTools, getCategories } from "@/lib/tools";
import type { Metadata } from "next";

export const revalidate = 3600;

export const metadata: Metadata = {
  description:
    "Der unabhängige Vergleich für AI-Tools im DACH-Raum. Ehrliche Tests, Preise im Überblick und die besten Empfehlungen für KI-Software.",
};

const CATEGORY_LABELS: Record<string, string> = {
  "text-generation": "✍️ Text & KI-Schreiben",
  "bildgenerierung": "🎨 Bildgenerierung",
  "audio-video": "🎬 Audio & Video",
  seo: "🔍 SEO",
  "email-marketing": "📧 E-Mail-Marketing",
  produktivitaet: "⚡ Produktivität",
  chatbots: "🤖 Chatbots",
  code: "💻 Code & Entwicklung",
  design: "🎯 Design",
  social: "📱 Social Media",
};

export default function HomePage() {
  const tools = getAllTools();
  const categories = getCategories();
  const topTools = tools.slice(0, 6);

  return (
    <>
      {/* Hero */}
      <section className="mb-16 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Die besten AI-Tools,{" "}
          <span className="text-blue-600">ehrlich verglichen</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
          Unabhängige Tests, transparente Preise und ehrliche Meinungen — für
          den DACH-Markt, auf Deutsch.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <a
            href="/tools"
            className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow-sm hover:bg-blue-700 transition"
          >
            Tools entdecken →
          </a>
          <a
            href="#kategorien"
            className="rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 hover:bg-gray-50 transition"
          >
            Nach Kategorie
          </a>
        </div>
      </section>

      {/* Stats */}
      <section className="mb-16 grid gap-6 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 p-8 text-center sm:grid-cols-3">
        <div>
          <p className="text-4xl font-bold text-blue-600">{tools.length}</p>
          <p className="mt-1 text-sm font-medium text-gray-600">Getestete Tools</p>
        </div>
        <div>
          <p className="text-4xl font-bold text-blue-600">{categories.length}</p>
          <p className="mt-1 text-sm font-medium text-gray-600">Kategorien</p>
        </div>
        <div>
          <p className="text-4xl font-bold text-blue-600">100%</p>
          <p className="mt-1 text-sm font-medium text-gray-600">Unabhängig</p>
        </div>
      </section>

      {/* Top Tools */}
      {topTools.length > 0 && (
        <section className="mb-16">
          <h2 className="mb-8 text-2xl font-semibold text-gray-900">
            Beliebte AI-Tools
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {topTools.map((tool) => (
              <a
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="group rounded-xl border border-gray-200 p-6 transition hover:border-blue-300 hover:shadow-md"
              >
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-semibold group-hover:text-blue-600 transition">
                    {tool.name}
                  </h3>
                  {tool.rating && (
                    <span className="flex items-center gap-1 text-sm font-medium text-amber-500">
                      ★ {tool.rating}/5
                    </span>
                  )}
                </div>
                <p className="mt-2 text-sm text-gray-500 leading-relaxed">{tool.tagline}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                    {CATEGORY_LABELS[tool.category] ?? tool.category}
                  </span>
                  <span className="text-sm font-medium text-blue-600 group-hover:underline">
                    Mehr erfahren →
                  </span>
                </div>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Categories */}
      <section id="kategorien" className="mb-16">
        <h2 className="mb-8 text-2xl font-semibold text-gray-900">
          Nach Kategorie
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <a
              key={cat.slug}
              href={`/kategorie/${cat.slug}`}
              className="flex items-center justify-between rounded-xl border border-gray-200 px-6 py-4 transition hover:border-blue-300 hover:shadow-sm"
            >
              <span className="font-medium text-gray-900">
                {CATEGORY_LABELS[cat.slug] ?? cat.slug}
              </span>
              <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600">
                {cat.count} {cat.count === 1 ? "Tool" : "Tools"}
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="mb-16">
        <h2 className="mb-8 text-2xl font-semibold text-gray-900">
          So funktioniert&apos;s
        </h2>
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="rounded-xl border border-gray-200 p-6">
            <p className="text-3xl">🔍</p>
            <h3 className="mt-3 font-semibold text-gray-900">Vergleichen</h3>
            <p className="mt-2 text-sm text-gray-600 leading-relaxed">
              Filter nach Kategorie, Preis oder Funktion — finde das passende
              Tool für deine Anforderungen.
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 p-6">
            <p className="text-3xl">📊</p>
            <h3 className="mt-3 font-semibold text-gray-900">Bewerten</h3>
            <p className="mt-2 text-sm text-gray-600 leading-relaxed">
              Ehrliche Tests mit Vor- und Nachteilen, keine bezahlten Rankings.
              Wir testen wirklich.
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 p-6">
            <p className="text-3xl">🚀</p>
            <h3 className="mt-3 font-semibold text-gray-900">Starten</h3>
            <p className="mt-2 text-sm text-gray-600 leading-relaxed">
              Direktlink zum Tool — Affiliate-Links finanzieren diese Seite.
              Für dich kein Aufpreis.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="rounded-xl bg-blue-600 p-10 text-center text-white">
        <h2 className="text-2xl font-bold">
          Das richtige Tool finden — ohne Marketing-Blabla
        </h2>
        <p className="mt-3 text-blue-100 max-w-xl mx-auto">
          Wir testen AI-Tools unabhängig und zeigen dir, was wirklich taugt.
          Keine bezahlten Platzierungen, keine Affiliate-Bias.
        </p>
        <a
          href="/tools"
          className="mt-6 inline-block rounded-lg bg-white px-8 py-3 font-semibold text-blue-600 hover:bg-blue-50 transition"
        >
          Alle Tools ansehen →
        </a>
      </section>
    </>
  );
}
