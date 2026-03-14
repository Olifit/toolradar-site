import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { parseToolFile, getAllToolSlugs, getAffiliateUrl } from "@/lib/tools";

// ISR: revalidate every 3600s (1 hour)
export const revalidate = 3600;

// Generate static params for all tools at build time
export async function generateStaticParams() {
  return getAllToolSlugs().map((slug) => ({ slug }));
}

// Dynamic metadata per tool
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tool = parseToolFile(slug);
  if (!tool) return {};

  return {
    title: `${tool.name} – Test, Preise & Erfahrungen`,
    description: tool.tagline,
    openGraph: {
      title: `${tool.name} im Test | toolradar.de`,
      description: tool.tagline,
      url: `/tools/${slug}`,
    },
  };
}

export default async function ToolPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool = parseToolFile(slug);
  if (!tool) notFound();

  const affiliateUrl = getAffiliateUrl(tool);

  // JSON-LD Schema for Product Review
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: tool.name,
    description: tool.tagline,
    url: tool.website,
    ...(tool.rating && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: tool.rating,
        bestRating: 5,
        worstRating: 1,
      },
    }),
    offers: tool.pricing.map((tier) => ({
      "@type": "Offer",
      name: tier.name,
      price: tier.price === "0" ? "0" : tier.price.replace(/[^0-9.]/g, ""),
      priceCurrency: "EUR",
      ...(tier.period === "mo" && { billingDuration: "P1M" }),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-gray-500">
        <a href="/" className="hover:text-gray-700">
          Home
        </a>{" "}
        /{" "}
        <a href="/tools" className="hover:text-gray-700">
          Tools
        </a>{" "}
        /{" "}
        <a href={`/kategorie/${tool.category}`} className="hover:text-gray-700">
          {tool.category}
        </a>{" "}
        / <span className="text-gray-900">{tool.name}</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{tool.name}</h1>
        <p className="mt-2 text-lg text-gray-600">{tool.tagline}</p>
        {tool.rating && (
          <div className="mt-2 flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className={
                  i < (tool.rating ?? 0) ? "text-yellow-400" : "text-gray-300"
                }
              >
                ★
              </span>
            ))}
            <span className="ml-2 text-sm text-gray-500">
              {tool.rating}/5
            </span>
          </div>
        )}
      </div>

      {/* Pricing Cards */}
      {tool.pricing.length > 0 && (
        <section className="mb-8">
          <h2 className="mb-4 text-xl font-semibold">Preise</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tool.pricing.map((tier) => (
              <div
                key={tier.name}
                className="rounded-lg border border-gray-200 p-4"
              >
                <h3 className="font-medium">{tier.name}</h3>
                <p className="mt-1 text-2xl font-bold">
                  {tier.price}
                  {tier.period && (
                    <span className="text-sm font-normal text-gray-500">
                      /{tier.period === "mo" ? "Monat" : "Jahr"}
                    </span>
                  )}
                </p>
                <ul className="mt-3 space-y-1 text-sm text-gray-600">
                  {tier.features.map((f) => (
                    <li key={f}>✓ {f}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Description */}
      <section className="prose mb-8 max-w-none">
        <div dangerouslySetInnerHTML={{ __html: tool.description }} />
      </section>

      {/* Pros / Cons */}
      <div className="mb-8 grid gap-6 sm:grid-cols-2">
        <div>
          <h2 className="mb-3 text-lg font-semibold text-green-700">
            Vorteile
          </h2>
          <ul className="space-y-2">
            {tool.pros.map((p) => (
              <li key={p} className="flex gap-2 text-sm">
                <span className="text-green-500">+</span>
                {p}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="mb-3 text-lg font-semibold text-red-700">
            Nachteile
          </h2>
          <ul className="space-y-2">
            {tool.cons.map((c) => (
              <li key={c} className="flex gap-2 text-sm">
                <span className="text-red-500">-</span>
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* CTA */}
      <div className="rounded-lg bg-blue-50 p-6 text-center">
        <a
          href={affiliateUrl}
          target="_blank"
          rel="nofollow sponsored noopener"
          className="inline-block rounded-lg bg-blue-600 px-8 py-3 text-lg font-semibold text-white hover:bg-blue-700"
        >
          {tool.name} ausprobieren →
        </a>
        <p className="mt-2 text-xs text-gray-500">
          Affiliate-Link — Für dich entstehen keine Mehrkosten.
        </p>
      </div>

      {/* Last updated */}
      <p className="mt-6 text-right text-xs text-gray-400">
        Zuletzt aktualisiert: {tool.lastUpdated}
      </p>
    </>
  );
}
