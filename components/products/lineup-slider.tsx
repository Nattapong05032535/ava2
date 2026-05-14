"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { SmartImage } from "@/components/shared";

interface ProductItem {
  id: string;
  name: string;
  shortName: string;
  tagline: string;
  image: string;
  price: string;
  originalPrice?: string;
  savings?: string;
  colors: string[];
}

function getPriceLabel(price: string) {
  return price.replace("เริ่มที่ ", "");
}

export function LineupSlider({ products }: { products: ProductItem[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    scrollRef.current?.scrollBy({
      left: direction === "left" ? -350 : 350,
      behavior: "smooth",
    });
  };

  return (
    <div>
      <div
        ref={scrollRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-6 no-scrollbar md:gap-6"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {products.map((item) => (
          <div
            key={item.id}
            className="flex w-[280px] shrink-0 snap-start flex-col group md:w-[calc(50%-12px)] lg:w-[calc(25%-18px)]"
          >
            <article className="flex h-full flex-col">
              <Link
                href={`/products/${item.id}`}
                prefetch
                className="block overflow-hidden rounded-[2rem] bg-[#f6f6f6]"
              >
                <div className="relative aspect-[4/3] w-full">
                  <SmartImage
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                    className="object-contain p-8 transition-transform duration-500 group-hover:scale-105 sm:p-10 lg:p-12"
                    quality={90}
                  />
                </div>
              </Link>

              <Link href={`/products/${item.id}`} prefetch className="mt-6 block">
                <h3 className="text-[18px] font-bold leading-tight text-black md:text-[20px]">
                  {item.name}
                </h3>
              </Link>

              <div className="mt-4">
                <p className="text-base font-semibold text-black">
                  {getPriceLabel(item.price)}
                </p>
                {item.savings && (
                  <p className="mt-1 text-sm font-semibold text-[#006bea]">
                    {item.savings}
                    {item.originalPrice && (
                      <span className="font-medium text-[#6b7280]">
                        {" "}
                        (เดิม {item.originalPrice})
                      </span>
                    )}
                  </p>
                )}
              </div>

              <Link
                href={`/products/${item.id}`}
                prefetch
                className="mt-5 flex items-center gap-1.5 self-start border-b border-transparent pb-0.5 text-[14px] font-bold text-black transition-colors group-hover:border-[#1b5cff] group-hover:text-[#1b5cff]"
              >
                เรียนรู้เพิ่มเติม
                <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
              </Link>
            </article>
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-col items-center justify-center gap-6 md:flex-row">
        <div className="order-2 hidden h-[2px] w-64 rounded-full bg-[#e5e5e5] md:order-1 md:block">
          <div className="h-full w-[25%] rounded-full bg-black" />
        </div>

        <div className="order-1 flex gap-3 md:order-2">
          <button
            type="button"
            onClick={() => scroll("left")}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d2d2d7] bg-white transition-colors hover:bg-black/5"
            aria-label="เลื่อนดูสินค้าก่อนหน้า"
          >
            <ChevronLeft className="h-5 w-5 text-black" strokeWidth={1.5} />
          </button>
          <button
            type="button"
            onClick={() => scroll("right")}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d2d2d7] bg-white transition-colors hover:bg-black/5"
            aria-label="เลื่อนดูสินค้าถัดไป"
          >
            <ChevronRight className="h-5 w-5 text-black" strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </div>
  );
}
