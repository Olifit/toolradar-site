import { getAllTools, getCategories } from "@/lib/tools";

export const revalidate = 3600;

export default function HomePage() {
  const tools = getAllTools();
  const categories = getCategories();
  const topTools = tools.slice(0, 6);

  return (
    <>
      {/* Hero */}
      <section className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          Die besten AI-Tools,{" "}
          <span className="text-blue-600">ehrlich verglichen</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
          Unabhängige Tests, transparente Preise und ehrliche Meinungen — für
          den DACH-Markt, auf Deutsch.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <a
            href="/tools"
            className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Tools entdecken
          </a>
          <a
            href="/kategorien"
            className="rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 hover:bg-gray-50"
          >
            Nach Kategorie
          </a>
        </div>
      </section>

      {/* Stats */}
      <section className="mb-12 grid gap-6 rounded-lg bg-gray-50 p-8 text-center sm:grid-cols-3">
        <div>
          <p className="text-3xl font-bold text-blue-600">{tools.length}</p>
          <p className="text-sm text-gray-600">Getestete Tools</p>
        </div>
        <div>
          <p className="text-3xl font-bold text-blue-600">
            {categories.length}
          </p>
          <p className="text-sm text-gray-600">Kategorien</p>
        </div>
        <div>
          <p className="text-3xl font-bold text-blue-600">100%</p>
          <p className="text-sm text-gray-600">Unabhängig</p>
        </div>
      </section>

      {/* Top Tools */}
      {topTools.length > 0 && (
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-semibold">
            Beliebte AI-Tools
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {topTools.map((tool) => (
              <a
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="group rounded-lg border border-gray-200 p-5 transition hover:border-blue-300 hover:shadow-sm"
              >
                <h3 className="text-lg font-semibold group-hover:text-blue-600">
                  {tool.name}
                </h3>
                <p className="mt-1 text-sm text-gray-500">{tool.tagline}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                    {tool.category}
                  </span>
                  {tool.rating && (
                    <span className="text-sm text-yellow-500">
                      ★ {tool.rating}/5
                    </span>
                  )}
                </div>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* How it works */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-semibold">So funktioniert&apos;s</h2>
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="rounded-lg border border-gray-200 p-5">
            <p className="text-2xl">🔍</p>
            <h3 className="mt-2 font-semibold">Vergleichen</h3>
            <p className="mt-1 text-sm text-gray-600">
              Filter nach Kategorie, Preis oder Funktion — finde das passende
              Tool.
            </p>
          </div>
          <div className="rounded-lg border border-gray-200 p-5">
            <p className="text-2xl">📊</p>
            <h3 className="mt-2 font-semibold">Bewerten</h3>
            <p className="mt-1 text-sm text-gray-600">
              Ehrliche Tests mit Vor- und Nachteilen, keine bezahlten Rankings.
            </p>
          </div>
          <div className="rounded-lg border border-gray-200 p-5">
            <p className="text-2xl">🚀</p>
            <h3 className="mt-2 font-semibold">Starten</h3>
            <p className="mt-1 text-sm text-gray-600">
              Direktlink zum Tool — Affiliate-Links finanzieren diese Seite.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
