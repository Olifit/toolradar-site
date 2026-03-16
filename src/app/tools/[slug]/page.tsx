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
      <nav className="mb-6 text-sm text-muted">
        <a href="/" className="hover:text-base transition-colors">Home</a>{" "}
        /{" "}
        <a href="/tools" className="hover:text-base transition-colors">Tools</a>{" "}
        /{" "}
        <a href={`/kategorie/${tool.category}`} className="hover:text-base transition-colors">
          {tool.category}
        </a>{" "}
        / <span className="text-base">{tool.name}</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-base">{tool.name}</h1>
        <p className="mt-2 text-lg text-muted">{tool.tagline}</p>
        {tool.rating && (
          <div className="mt-2 flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className={i < (tool.rating ?? 0) ? "text-amber-dm" : "text-faint"}>
                ★
              </span>
            ))}
            <span className="ml-2 text-sm text-muted">{tool.rating}/5</span>
          </div>
        )}
      </div>

      {/* Pricing Cards */}
      {tool.pricing.length > 0 && (
        <section className="mb-8">
          <h2 className="mb-4 text-xl font-semibold text-base">Preise</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tool.pricing.map((tier) => (
              <div key={tier.name} className="card p-4">
                <h3 className="font-medium text-base">{tier.name}</h3>
                <p className="mt-1 text-2xl font-bold text-base">
                  {tier.price === "0" ? "Kostenlos" : `${tier.price}€`}
                  {tier.period && (
                    <span className="text-sm font-normal text-muted">
                      /{tier.period === "mo" ? "Monat" : "Jahr"}
                    </span>
                  )}
                </p>
                <ul className="mt-3 space-y-1 text-sm text-muted">
                  {tier.features.map((f) => (
                    <li key={f} className="flex gap-2"><span className="text-green-dm">✓</span>{f}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Description */}
      <section className="prose prose-neutral dark:prose-invert mb-8 max-w-none text-base">
        <div dangerouslySetInnerHTML={{ __html: tool.description }} />
      </section>

      {/* Pros / Cons */}
      <div className="mb-8 grid gap-6 sm:grid-cols-2">
        <div className="card p-5">
          <h2 className="mb-3 text-lg font-semibold text-green-dm">Vorteile</h2>
          <ul className="space-y-2">
            {tool.pros.map((p) => (
              <li key={p} className="flex gap-2 text-sm text-base">
                <span className="text-green-dm font-bold">+</span>{p}
              </li>
            ))}
          </ul>
        </div>
        <div className="card p-5">
          <h2 className="mb-3 text-lg font-semibold text-red-dm">Nachteile</h2>
          <ul className="space-y-2">
            {tool.cons.map((c) => (
              <li key={c} className="flex gap-2 text-sm text-base">
                <span className="text-red-dm font-bold">−</span>{c}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* CTA */}
      <div className="card bg-accent p-6 text-center">
        <a
          href={affiliateUrl}
          target="_blank"
          rel="nofollow sponsored noopener"
          className="btn-primary inline-block rounded-lg px-8 py-3 text-lg font-semibold"
        >
          {tool.name} ausprobieren →
        </a>
        <p className="mt-2 text-xs text-muted">
          Affiliate-Link — Für dich entstehen keine Mehrkosten.
        </p>
      </div>

      {/* Last updated */}
      <p className="mt-6 text-right text-xs text-faint">
        Zuletzt aktualisiert: {tool.lastUpdated}
      </p>
    </>
  );
}
