import "server-only";

import { cache } from "react";
import {
  isProductModelKey,
  resolveProductPresentation,
  resolveProductPresentationByModelKey,
  SUPPORTED_PRODUCT_MODEL_KEYS,
  type SupportedProductModelKey,
} from "@/constants/products";
import { getProduct, getProducts, getStrapiImageUrl } from "@/lib/strapi";
import type {
  Product,
  ProductLineupItem,
  ProductShowcase,
  ProductShowcaseSection,
} from "@/types";

function createMockProduct(modelKey: SupportedProductModelKey): Product {
  const { modelName, template } = resolveProductPresentationByModelKey(modelKey);
  const mockTimestamp = "2026-04-08T00:00:00.000Z";

  return {
    id: 0,
    documentId: modelKey,
    name: modelName,
    details: template.hero.description,
    heroImg: null,
    createdAt: mockTimestamp,
    updatedAt: mockTimestamp,
    publishedAt: mockTimestamp,
  };
}

function getProductImage(product: Product): string {
  return getStrapiImageUrl(
    product.heroImg?.formats?.large?.url ||
      product.heroImg?.formats?.medium?.url ||
      product.heroImg?.formats?.small?.url ||
      product.heroImg?.url
  );
}

function getProductThumbnail(product: Product): string {
  return getStrapiImageUrl(
    product.heroImg?.formats?.small?.url ||
      product.heroImg?.formats?.thumbnail?.url ||
      product.heroImg?.url
  );
}

function createLineupItem(product: Product): ProductLineupItem {
  const { modelName, template: presentation } = resolveProductPresentation(
    product.name || ""
  );
  const remoteImage = getProductThumbnail(product);
  const imageSrc = remoteImage || presentation.art.fallbackProduct;

  return {
    documentId: product.documentId,
    name: modelName,
    category: presentation.category,
    subtitle: presentation.hero.subheadline,
    imageSrc,
    imageAlt: product.heroImg?.alternativeText || modelName,
    accent: presentation.theme.accent,
  };
}

function createMockLineupItem(
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
  let product: Product;
  let modelName: string;
  let presentation: ReturnType<typeof resolveProductPresentation>["template"];
  let lineup: ProductLineupItem[];

  if (isProductModelKey(documentId)) {
    const resolved = resolveProductPresentationByModelKey(documentId);
    product = createMockProduct(documentId);
    modelName = resolved.modelName;
    presentation = resolved.template;
    lineup = SUPPORTED_PRODUCT_MODEL_KEYS.filter((item) => item !== documentId)
      .slice(0, 4)
      .map(createMockLineupItem);
  } else {
    const [productResponse, productsResponse] = await Promise.all([
      getProduct(documentId),
      getProducts().catch(() => null),
    ]);
    const allProducts = productsResponse?.data || [];
    product = productResponse.data;

    const resolved = resolveProductPresentation(product.name || "");
    modelName = resolved.modelName;
    presentation = resolved.template;
    lineup =
      allProducts.length > 0
        ? allProducts
            .filter((item) => item.documentId !== product.documentId)
            .slice(0, 4)
            .map(createLineupItem)
        : SUPPORTED_PRODUCT_MODEL_KEYS.filter(
            (item) => item !== resolved.modelKey
          )
          .slice(0, 4)
          .map(createMockLineupItem);
  }

  const detailImage =
    getProductImage(product) || presentation.art.fallbackProduct;

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
        alt: product.heroImg?.alternativeText || modelName,
        fit: "contain",
      },
    })
  );

  const heroVisualSrc = presentation.art.hero || detailImage;
  const detailVisualSrc = presentation.art.detail || detailImage;
  const detailsNote =
    product.details ||
    "ข้อมูลสินค้าจาก Strapi สามารถนำมาแทนที่ข้อความส่วนนี้ได้ทันทีโดยไม่ต้องแก้หน้า detail เพิ่ม";

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
        alt: product.heroImg?.alternativeText || modelName,
        fit: "contain",
      },
      serviceBadges: presentation.serviceBadges,
    },
    detailVisual: {
      src: detailVisualSrc,
      alt: product.heroImg?.alternativeText || modelName,
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
