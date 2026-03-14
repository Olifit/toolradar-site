import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getToolsByCategory, getCategories } from "@/lib/tools";

export const revalidate = 3600;

export async function generateStaticParams() {
  return getCategories().map((cat) => ({ slug: cat.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `${slug} – AI-Tools vergleichen`,
    description: `Die besten AI-Tools in der Kategorie ${slug}. Ehrliche Tests und transparente Preise.`,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tools = getToolsByCategory(slug);
  if (tools.length === 0) notFound();

  return (
    <>
      <nav className="mb-6 text-sm text-gray-500">
        <a href="/" className="hover:text-gray-700">Home</a> /{" "}
        <a href="/tools" className="hover:text-gray-700">Tools</a> /{" "}
        <span className="text-gray-900">{slug}</span>
      </nav>

      <h1 className="mb-2 text-3xl font-bold capitalize">{slug}</h1>
      <p className="mb-8 text-gray-600">
        {tools.length} {tools.length === 1 ? "Tool" : "Tools"} in dieser Kategorie
      </p>

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
            {tool.rating && (
              <p className="mt-2 text-sm text-yellow-500">★ {tool.rating}/5</p>
            )}
          </a>
        ))}
      </div>
    </>
  );
}
