import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getToolsByCategory, getCategories } from "@/lib/tools";

const CATEGORY_LABELS: Record<string, string> = {
  "text-generation": "Text & KI-Schreiben",
  "bildgenerierung": "Bildgenerierung",
  "audio-video": "Audio & Video",
  "seo": "SEO-Tools",
  "email-marketing": "E-Mail-Marketing",
  "produktivitaet": "Produktivität",
  "chatbots": "KI-Chatbots",
  "code": "Code & Entwicklung",
  "design": "Design",
  "social": "Social Media",
  "uebersetzung": "Übersetzung",
  "analytics": "Analytics",
  "hosting": "Cloud-Hosting",
  "email": "E-Mail & Datenschutz",
  "business-software": "Business-Software",
  "audio": "Audio & Text-to-Speech",
  "video": "KI-Video",
  "image-generation": "Bildgenerierung",
};

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
  const label = CATEGORY_LABELS[slug] ?? slug;
  return {
    title: `${label} – AI-Tools vergleichen`,
    description: `Die besten AI-Tools für ${label} im DACH-Raum. Ehrliche Tests, transparente Preise, DSGVO-konform.`,
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
        <span className="text-gray-900">{CATEGORY_LABELS[slug] ?? slug}</span>
      </nav>

      <h1 className="mb-2 text-3xl font-bold">{CATEGORY_LABELS[slug] ?? slug}</h1>
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
