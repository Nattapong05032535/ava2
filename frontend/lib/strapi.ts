import type { Product, StrapiResponse, StrapiSingleResponse } from "@/types";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

/**
 * สร้าง full URL สำหรับรูปภาพจาก Strapi
 */
export function getStrapiImageUrl(url: string | undefined | null): string {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `${STRAPI_URL}${url}`;
}

/**
 * ดึงข้อมูล products ทั้งหมดจาก Strapi API
 */
export async function getProducts(): Promise<StrapiResponse<Product>> {
  const res = await fetch(
    `${STRAPI_URL}/api/products?populate=*&status=published`,
    {
      next: { revalidate: 60 }, // revalidate ทุก 60 วินาที
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch products: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

/**
 * ดึงข้อมูล product เดียวจาก Strapi API
 */
export async function getProduct(documentId: string): Promise<StrapiSingleResponse<Product>> {
  const res = await fetch(
    `${STRAPI_URL}/api/products/${documentId}?populate=*`,
    {
      next: { revalidate: 60 },
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch product: ${res.status} ${res.statusText}`);
  }

  return res.json();
}
