import type { Metadata } from "next";
import { ProductCard } from "@/components/shop";
import { SUPPORTED_PRODUCT_MODEL_KEYS } from "@/constants/products";

export const metadata: Metadata = {
  title: "สินค้าทั้งหมด | AVA Mobile",
  description: "เลือกชมสินค้าคุณภาพจาก AVA Mobile",
};

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-background">
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
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              เลือกชมสินค้าคุณภาพที่คัดสรรมาเพื่อคุณ
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            แสดง{" "}
            <span className="font-semibold text-foreground">
              {SUPPORTED_PRODUCT_MODEL_KEYS.length}
            </span>{" "}
            รายการ
          </p>
        </div>

        <div
          id="products-grid"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {SUPPORTED_PRODUCT_MODEL_KEYS.map((modelKey) => (
            <ProductCard key={modelKey} modelKey={modelKey} />
          ))}
        </div>
      </section>
    </main>
  );
}
