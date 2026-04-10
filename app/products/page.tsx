import type { Metadata } from "next";
import { getProducts } from "@/lib/strapi";
import { ProductCard } from "@/components/product-card";
import type { Product } from "@/types";

export const metadata: Metadata = {
  title: "สินค้าทั้งหมด | AVA Mobile",
  description: "เลือกชมสินค้าคุณภาพจาก AVA Mobile",
};

export default async function ProductsPage() {
  let products: Product[] = [];
  let error: string | null = null;

  try {
    const response = await getProducts();
    products = response.data;
  } catch (err) {
    error =
      err instanceof Error
        ? err.message
        : "ไม่สามารถโหลดข้อมูลสินค้าได้";
    products = [];
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border/50">
        <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-widest text-primary/60">
              คอลเลกชัน
            </p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              สินค้าทั้งหมด
            </h1>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              เลือกชมสินค้าคุณภาพที่คัดสรรมาเพื่อคุณ
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        {error && (
          <div
            id="products-error"
            className="mb-8 rounded-xl border border-destructive/20 bg-destructive/5 p-6 text-center"
          >
            <svg
              className="mx-auto h-10 w-10 text-destructive/60"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
              />
            </svg>
            <p className="mt-3 font-medium text-destructive">{error}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              กรุณาตรวจสอบว่า Strapi server กำลังทำงานอยู่
            </p>
          </div>
        )}

        {!error && products && products.length === 0 && (
          <div
            id="products-empty"
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <div className="rounded-full bg-muted p-6">
              <svg
                className="h-12 w-12 text-muted-foreground/40"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                />
              </svg>
            </div>
            <h2 className="mt-4 text-xl font-semibold text-foreground">
              ยังไม่มีสินค้า
            </h2>
            <p className="mt-2 text-muted-foreground">
              กรุณาเพิ่มสินค้าผ่าน Strapi Admin Panel
            </p>
          </div>
        )}

        {products && products.length > 0 && (
          <>
            <div className="mb-8 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                แสดง{" "}
                <span className="font-semibold text-foreground">
                  {products.length}
                </span>{" "}
                รายการ
              </p>
            </div>

            <div
              id="products-grid"
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </section>
    </main>
  );
}
