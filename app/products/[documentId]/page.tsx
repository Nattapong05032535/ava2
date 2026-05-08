import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductShowcasePage } from "@/components/products";
import { SUPPORTED_PRODUCT_MODEL_KEYS } from "@/constants/products";
import { getProductShowcase } from "@/lib/actions";

interface ProductDetailPageProps {
  params: Promise<{ documentId: string }>;
}

export function generateStaticParams() {
  return SUPPORTED_PRODUCT_MODEL_KEYS.map((documentId) => ({
    documentId,
  }));
}

export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const { documentId } = await params;

  try {
    const showcase = await getProductShowcase(documentId);

    return {
      title: `${showcase.displayName} | AVA Mobile`,
      description: showcase.hero.description,
    };
  } catch {
    return {
      title: "ไม่พบสินค้า | AVA Mobile",
    };
  }
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { documentId } = await params;
  let showcase: Awaited<ReturnType<typeof getProductShowcase>>;

  try {
    showcase = await getProductShowcase(documentId);
  } catch {
    notFound();
  }

  return <ProductShowcasePage showcase={showcase} />;
}
