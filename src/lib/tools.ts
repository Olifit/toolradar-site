import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Tool, Frontmatter } from "@/types/tool";

const TOOLS_DIR = path.join(process.cwd(), "src/content/tools");

// Parse a single tool markdown file
export function parseToolFile(slug: string): Tool | null {
  const filePath = path.join(TOOLS_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const fm = data as Frontmatter;

  return {
    slug,
    name: fm.title,
    tagline: fm.tagline,
    description: content.trim(),
    category: fm.category,
    subcategory: fm.subcategory,
    website: fm.website,
    logo: fm.logo,
    pricing: safeJsonParse(fm.pricing, []),
    features: safeJsonParse(fm.features, []),
    pros: safeJsonParse(fm.pros, []),
    cons: safeJsonParse(fm.cons, []),
    rating: fm.rating,
    affiliateUrl: fm.affiliateUrl,
    affiliatePartner: fm.affiliatePartner,
    lastUpdated: fm.lastUpdated,
    tags: safeJsonParse(fm.tags, []),
  };
}

// Get all tool slugs
export function getAllToolSlugs(): string[] {
  if (!fs.existsSync(TOOLS_DIR)) return [];
  return fs
    .readdirSync(TOOLS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

// Get all tools (for listing pages)
export function getAllTools(): Tool[] {
  return getAllToolSlugs()
    .map((slug) => parseToolFile(slug))
    .filter((t): t is Tool => t !== null)
    .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
}

// Get tools by category
export function getToolsByCategory(category: string): Tool[] {
  return getAllTools().filter((t) => t.category === category);
}

// Get unique categories with counts
export function getCategories(): { slug: string; count: number }[] {
  const tools = getAllTools();
  const map = new Map<string, number>();
  for (const t of tools) {
    map.set(t.category, (map.get(t.category) ?? 0) + 1);
  }
  return Array.from(map.entries())
    .map(([slug, count]) => ({ slug, count }))
    .sort((a, b) => b.count - a.count);
}

// Affiliate link injection: wraps outbound links with tracking
export function getAffiliateUrl(tool: Tool): string {
  if (tool.affiliateUrl) return tool.affiliateUrl;
  return tool.website;
}

function safeJsonParse<T>(str: string | undefined, fallback: T): T {
  if (!str) return fallback;
  try {
    return JSON.parse(str) as T;
  } catch {
    return fallback;
  }
}
