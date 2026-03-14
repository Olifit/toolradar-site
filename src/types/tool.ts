// Core tool type for programmatic SEO pages
export interface Tool {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  subcategory?: string;
  website: string;
  logo?: string;
  pricing: PricingTier[];
  features: string[];
  pros: string[];
  cons: string[];
  rating?: number; // 1-5
  affiliateUrl?: string;
  affiliatePartner?: string;
  lastUpdated: string;
  tags: string[];
}

export interface PricingTier {
  name: string; // Free, Pro, Enterprise
  price: string; // "0€", "29€/mo", "Custom"
  period?: "mo" | "yr" | "once";
  features: string[];
}

export interface ToolCategory {
  slug: string;
  name: string;
  description: string;
  icon?: string;
  toolCount: number;
}

export interface Frontmatter {
  title: string;
  tagline: string;
  description: string;
  category: string;
  subcategory?: string;
  website: string;
  logo?: string;
  pricing: string; // JSON string, parsed at build time
  features: string;
  pros: string;
  cons: string;
  rating?: number;
  affiliateUrl?: string;
  affiliatePartner?: string;
  lastUpdated: string;
  tags: string;
}

// Affiliate partner registry
export interface AffiliatePartner {
  name: string;
  commission: string; // "30%", "25% recurring"
  cookieDuration: string; // "30 days"
  signupUrl: string;
  notes?: string;
}

export const AFFILIATE_PARTNERS: Record<string, AffiliatePartner> = {
  jasper: {
    name: "Jasper",
    commission: "30%",
    cookieDuration: "30 days",
    signupUrl: "https://www.jasper.ai/affiliate",
  },
  lumen5: {
    name: "Lumen5",
    commission: "30%",
    cookieDuration: "30 days",
    signupUrl: "https://lumen5.com/affiliate",
  },
  synthesia: {
    name: "Synthesia",
    commission: "25%",
    cookieDuration: "60 days",
    signupUrl: "https://www.synthesia.io/affiliate",
  },
};
