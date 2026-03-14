import { getAllTools, getCategories } from "@/lib/tools";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Alle AI-Tools im Vergleich",
  description:
    "Entdecke und vergleiche die besten AI-Tools für deinen Workflow. Ehrliche Tests, transparente Preise, echte Empfehlungen.",
};

export const revalidate = 3600;

export default function ToolsPage() {
  const tools = getAllTools();
  const categories = getCategories();

  return (
    <>
      <h1 className="mb-2 text-3xl font-bold">AI-Tools im Vergleich</h1>
      <p className="mb-8 text-gray-600">
        {tools.length} Tools in {categories.length} Kategorien — ehrlich
        getestet, kein Bullshit.
      </p>

      {/* Category filter */}
      <div className="mb-8 flex flex-wrap gap-2">
        <a
          href="/tools"
          className="rounded-full bg-blue-100 px-4 py-1 text-sm text-blue-700"
        >
          Alle
        </a>
        {categories.map((cat) => (
          <a
            key={cat.slug}
            href={`/kategorie/${cat.slug}`}
            className="rounded-full bg-gray-100 px-4 py-1 text-sm text-gray-700 hover:bg-gray-200"
          >
            {cat.slug} ({cat.count})
          </a>
        ))}
      </div>

      {/* Tool grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <a
            key={tool.slug}
            href={`/tools/${tool.slug}`}
            className="group rounded-lg border border-gray-200 p-5 transition hover:border-blue-300 hover:shadow-sm"
          >
            <h2 className="text-lg font-semibold group-hover:text-blue-600">
              {tool.name}
            </h2>
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
            {tool.pricing.length > 0 && (
              <p className="mt-2 text-sm text-gray-700">
                ab {tool.pricing[0].price}
              </p>
            )}
          </a>
        ))}
      </div>
    </>
  );
}
