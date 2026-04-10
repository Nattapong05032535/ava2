"use client";

import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { resolveProductPresentationByModelKey, type SupportedProductModelKey } from "@/constants/products";

// Using the same mock data for consistency
const SHOP_PRODUCTS = [
  {
    modelKey: "promax-p89",
    basePrice: "24,990",
    image: "/images/products/p89-hero-premium.png",
    tagline: "The pinnacle of innovation.",
  },
  {
    modelKey: "promax-p63",
    basePrice: "19,990",
    image: "/images/products/p63-hero-premium.png",
    tagline: "Elegance meets power.",
  },
  {
    modelKey: "note-p65",
    basePrice: "14,990",
    image: "/images/products/p65-note-hero-premium.png",
    tagline: "Write your own story.",
  },
  {
    modelKey: "enjoy-p65",
    basePrice: "9,990",
    image: "/images/products/enjoy-p65.png",
    tagline: "Simply joyful.",
  },
  {
    modelKey: "tab-p68",
    basePrice: "18,990",
    image: "/images/products/tab-p68.png",
    tagline: "Unleash creativity.",
  },
];

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-[#fbfbfd]">
      <Navbar />
      
      <main className="pt-24 pb-20">
        <section className="mx-auto max-w-7xl px-6">
          <div className="mb-12">
            <h1 className="text-[40px] md:text-[56px] font-semibold tracking-tight text-[#1d1d1f] leading-tight">
              เลือกซื้อสินค้าที่ชอบ
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SHOP_PRODUCTS.map((product) => {
               const { modelName } = resolveProductPresentationByModelKey(product.modelKey as SupportedProductModelKey);
               return (
                <div key={product.modelKey} className="group relative flex flex-col rounded-[2.5rem] bg-white p-8 shadow-[0_4px_30px_rgba(0,0,0,0.05)] transition-all duration-500 hover:shadow-[0_20px_60px_rgba(0,0,0,0.1)] hover:-translate-y-2 overflow-hidden">
                  <div className="relative h-64 w-full mb-8 transform transition-transform duration-700 group-hover:scale-105">
                    <Image
                      src={product.image}
                      alt={modelName}
                      fill
                      className="object-contain"
                    />
                  </div>
                  
                  <div className="mt-auto">
                    <h2 className="text-2xl font-semibold mb-2">{modelName}</h2>
                    <p className="text-[#6e6e73] mb-6 line-clamp-2">{product.tagline}</p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-medium">฿{product.basePrice}</span>
                      <Link 
                        href={`/shop/${product.modelKey}`}
                        className="rounded-full bg-[#0071e3] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#0077ed]"
                      >
                        เลือกซื้อ
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
