import type { Product } from "./strapi.types";

export interface ProductShowcaseServiceBadge {
  label: string;
  detail: string;
}

export interface ProductShowcaseStat {
  value: string;
  label: string;
  detail: string;
}

export interface ProductShowcaseCard {
  title: string;
  description: string;
  eyebrow?: string;
}

export interface ProductShowcaseVisual {
  src: string;
  alt: string;
  fit: "contain" | "cover";
}

export interface ProductShowcaseSection {
  id: string;
  navLabel: string;
  eyebrow: string;
  title: string;
  description: string;
  quote?: string;
  tone: "light" | "dark";
  cards: ProductShowcaseCard[];
  visual: ProductShowcaseVisual;
}

export interface ProductShowcaseFinish {
  name: string;
  swatch: string;
  description: string;
}

export interface ProductShowcaseSpec {
  label: string;
  value: string;
  description: string;
}

export interface ProductLineupItem {
  documentId: string;
  name: string;
  category: string;
  subtitle: string;
  imageSrc: string;
  imageAlt: string;
  accent: string;
}

export interface ProductShowcaseTheme {
  page: string;
  surface: string;
  mutedSurface: string;
  ink: string;
  mutedInk: string;
  accent: string;
  accentSoft: string;
  accentStrong: string;
  darkSurface: string;
}

export interface ProductShowcaseHero {
  eyebrow: string;
  label: string;
  spotlightWordmark: string;
  headline: string;
  subheadline: string;
  description: string;
  detailsNote: string;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
  heroVisual: ProductShowcaseVisual;
  serviceBadges: ProductShowcaseServiceBadge[];
}

export interface ProductShowcaseExperience {
  id: string;
  navLabel: string;
  eyebrow: string;
  title: string;
  description: string;
  cards: ProductShowcaseCard[];
}

export interface ProductShowcase {
  product: Product;
  displayName: string;
  familyLabel: string;
  category: string;
  theme: ProductShowcaseTheme;
  hero: ProductShowcaseHero;
  detailVisual: ProductShowcaseVisual;
  stats: ProductShowcaseStat[];
  sections: ProductShowcaseSection[];
  experience: ProductShowcaseExperience;
  finishes: ProductShowcaseFinish[];
  specs: ProductShowcaseSpec[];
  anchors: Array<{ id: string; label: string }>;
  lineup: ProductLineupItem[];
}
