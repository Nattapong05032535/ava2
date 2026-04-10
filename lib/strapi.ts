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
  try {
    const res = await fetch(
      `${STRAPI_URL}/api/products?populate=*&status=published`,
      {
        next: { revalidate: 60 },
      }
    );

    if (!res.ok) {
      return { data: [], meta: { pagination: { page: 1, pageSize: 25, pageCount: 0, total: 0 } } };
    }

    return res.json();
  } catch {
    return { data: [], meta: { pagination: { page: 1, pageSize: 25, pageCount: 0, total: 0 } } };
  }
}

/**
 * ดึงข้อมูล product เดียวจาก Strapi API
 */
export async function getProduct(documentId: string): Promise<StrapiSingleResponse<Product>> {
  try {
    const res = await fetch(
      `${STRAPI_URL}/api/products/${documentId}?populate=*`,
      {
        next: { revalidate: 60 },
      }
    );

    if (!res.ok) {
      throw new Error(`Product not found in Strapi`);
    }

    return res.json();
  } catch {
    // Return a base mock-like structure or just re-throw to be handled by the caller's catch
    throw new Error("Product fetch failed and no mock available");
  }
}
