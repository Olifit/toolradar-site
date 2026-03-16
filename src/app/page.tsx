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
        <h1 className="text-4xl font-bold tracking-tight text-base sm:text-5xl">
          Die besten AI-Tools,{" "}
          <span className="text-blue">ehrlich verglichen</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
          Unabhängige Tests, transparente Preise und ehrliche Meinungen — für
          den DACH-Markt, auf Deutsch.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <a href="/tools" className="btn-primary rounded-lg px-6 py-3 font-semibold shadow-sm">
            Tools entdecken →
          </a>
          <a
            href="#kategorien"
            className="rounded-lg border border-base px-6 py-3 font-semibold text-base hover:bg-subtle transition"
          >
            Nach Kategorie
          </a>
        </div>
      </section>

      {/* Stats */}
      <section className="mb-16 grid gap-6 rounded-xl hero-gradient p-8 text-center sm:grid-cols-3">
        <div>
          <p className="text-4xl font-bold text-blue">{tools.length}</p>
          <p className="mt-1 text-sm font-medium text-muted">Getestete Tools</p>
        </div>
        <div>
          <p className="text-4xl font-bold text-blue">{categories.length}</p>
          <p className="mt-1 text-sm font-medium text-muted">Kategorien</p>
        </div>
        <div>
          <p className="text-4xl font-bold text-blue">100%</p>
          <p className="mt-1 text-sm font-medium text-muted">Unabhängig</p>
        </div>
      </section>

      {/* Top Tools */}
      {topTools.length > 0 && (
        <section className="mb-16">
          <h2 className="mb-8 text-2xl font-semibold text-base">
            Beliebte AI-Tools
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {topTools.map((tool) => (
              <a key={tool.slug} href={`/tools/${tool.slug}`} className="card group p-6 block">
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-semibold text-base group-hover:text-blue transition-colors">
                    {tool.name}
                  </h3>
                  {tool.rating && (
                    <span className="flex items-center gap-1 text-sm font-medium text-amber-dm">
                      ★ {tool.rating}/5
                    </span>
                  )}
                </div>
                <p className="mt-2 text-sm text-muted leading-relaxed">{tool.tagline}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="rounded-full bg-subtle px-3 py-1 text-xs font-medium text-muted">
                    {CATEGORY_LABELS[tool.category] ?? tool.category}
                  </span>
                  <span className="text-sm font-medium text-blue group-hover:underline">
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
        <h2 className="mb-8 text-2xl font-semibold text-base">
          Nach Kategorie
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <a
              key={cat.slug}
              href={`/kategorie/${cat.slug}`}
              className="card flex items-center justify-between px-6 py-4 block"
            >
              <span className="font-medium text-base">
                {CATEGORY_LABELS[cat.slug] ?? cat.slug}
              </span>
              <span className="rounded-full bg-accent px-3 py-1 text-sm font-medium text-blue">
                {cat.count} {cat.count === 1 ? "Tool" : "Tools"}
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="mb-16">
        <h2 className="mb-8 text-2xl font-semibold text-base">
          So funktioniert&apos;s
        </h2>
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="card p-6">
            <p className="text-3xl">🔍</p>
            <h3 className="mt-3 font-semibold text-base">Vergleichen</h3>
            <p className="mt-2 text-sm text-muted leading-relaxed">
              Filter nach Kategorie, Preis oder Funktion — finde das passende
              Tool für deine Anforderungen.
            </p>
          </div>
          <div className="card p-6">
            <p className="text-3xl">📊</p>
            <h3 className="mt-3 font-semibold text-base">Bewerten</h3>
            <p className="mt-2 text-sm text-muted leading-relaxed">
              Ehrliche Tests mit Vor- und Nachteilen, keine bezahlten Rankings.
              Wir testen wirklich.
            </p>
          </div>
          <div className="card p-6">
            <p className="text-3xl">🚀</p>
            <h3 className="mt-3 font-semibold text-base">Starten</h3>
            <p className="mt-2 text-sm text-muted leading-relaxed">
              Direktlink zum Tool — Affiliate-Links finanzieren diese Seite.
              Für dich kein Aufpreis.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="rounded-xl bg-blue p-10 text-center text-white" style={{backgroundColor: 'var(--blue)'}}>
        <h2 className="text-2xl font-bold">
          Das richtige Tool finden — ohne Marketing-Blabla
        </h2>
        <p className="mt-3 opacity-80 max-w-xl mx-auto">
          Wir testen AI-Tools unabhängig und zeigen dir, was wirklich taugt.
          Keine bezahlten Platzierungen, keine Affiliate-Bias.
        </p>
        <a
          href="/tools"
          className="mt-6 inline-block rounded-lg bg-white px-8 py-3 font-semibold hover:opacity-90 transition"
          style={{color: 'var(--blue)'}}
        >
          Alle Tools ansehen →
        </a>
      </section>
    </>
  );
}
