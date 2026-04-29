import "server-only";

import { cache } from "react";
import {
  isProductModelKey,
  resolveProductPresentationByModelKey,
  SUPPORTED_PRODUCT_MODEL_KEYS,
  type SupportedProductModelKey,
} from "@/constants/products";
import type {
  Product,
  ProductLineupItem,
  ProductShowcase,
  ProductShowcaseSection,
} from "@/types";

function createLocalProduct(modelKey: SupportedProductModelKey): Product {
  const { modelName, template } = resolveProductPresentationByModelKey(modelKey);
  const mockTimestamp = "2026-04-08T00:00:00.000Z";

  return {
    id: 0,
    documentId: modelKey,
    name: modelName,
    details: template.hero.description,
    createdAt: mockTimestamp,
    updatedAt: mockTimestamp,
    publishedAt: mockTimestamp,
  };
}

function createLineupItem(
  modelKey: SupportedProductModelKey
): ProductLineupItem {
  const { modelName, template: presentation } =
    resolveProductPresentationByModelKey(modelKey);

  return {
    documentId: modelKey,
    name: modelName,
    category: presentation.category,
    subtitle: presentation.hero.subheadline,
    imageSrc: presentation.art.fallbackProduct,
    imageAlt: modelName,
    accent: presentation.theme.accent,
  };
}

export const getProductShowcase = cache(async function getProductShowcase(
  documentId: string
): Promise<ProductShowcase> {
  if (!isProductModelKey(documentId)) {
    throw new Error(`Unsupported product model: ${documentId}`);
  }

  const resolved = resolveProductPresentationByModelKey(documentId);
  const product = createLocalProduct(documentId);
  const modelName = resolved.modelName;
  const presentation = resolved.template;
  const lineup = SUPPORTED_PRODUCT_MODEL_KEYS.filter(
    (item) => item !== documentId
  )
    .slice(0, 4)
    .map(createLineupItem);
  const detailImage = presentation.art.detail || presentation.art.fallbackProduct;

  const sections: ProductShowcaseSection[] = presentation.sections.map(
    (section) => ({
      id: section.id,
      navLabel: section.navLabel,
      eyebrow: section.eyebrow,
      title: section.title,
      description: section.description,
      quote: section.quote,
      tone: section.tone,
      cards: section.cards,
      visual: {
        src:
          section.visualRole === "hero"
            ? presentation.art.hero || detailImage
            : presentation.art.detail || detailImage,
        alt: modelName,
        fit: "contain",
      },
    })
  );

  const heroVisualSrc = presentation.art.hero || detailImage;
  const detailVisualSrc = presentation.art.detail || detailImage;
  const detailsNote = product.details || presentation.hero.description;

  const anchors = [
    { id: "overview", label: "ภาพรวม" },
    ...sections.map((section) => ({ id: section.id, label: section.navLabel })),
    { id: presentation.experience.id, label: presentation.experience.navLabel },
    { id: "specs", label: "สเปก" },
  ];

  return {
    product,
    displayName: modelName,
    familyLabel: presentation.familyLabel,
    category: presentation.category,
    theme: presentation.theme,
    hero: {
      ...presentation.hero,
      detailsNote,
      heroVisual: {
        src: heroVisualSrc,
        alt: modelName,
        fit: "contain",
      },
      serviceBadges: presentation.serviceBadges,
    },
    detailVisual: {
      src: detailVisualSrc,
      alt: modelName,
      fit: "contain",
    },
    stats: presentation.stats,
    sections,
    experience: presentation.experience,
    finishes: presentation.finishes,
    specs: presentation.specs,
    anchors,
    lineup,
  };
});
