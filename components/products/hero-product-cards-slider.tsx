"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { HomeHeroProductCard } from "@/constants";

export function HeroProductCardsSlider({
  cards,
}: {
  cards: HomeHeroProductCard[];
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    scrollRef.current?.scrollBy({
      left: direction === "left" ? -350 : 350,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-6 no-scrollbar sm:gap-5 xl:grid xl:grid-cols-4 xl:overflow-visible xl:pb-0"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {cards.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            prefetch
            className="group relative flex min-h-[320px] w-[280px] shrink-0 snap-start overflow-hidden bg-[#f6f6f6] px-6 pt-8 text-center transition-transform duration-300 hover:-translate-y-1 sm:min-h-[360px] sm:w-[calc(50%-10px)] lg:min-h-[390px] xl:w-auto"
          >
            <div className="relative z-10 w-full">
              <h2 className="whitespace-nowrap text-[clamp(1.15rem,1.45vw,1.55rem)] font-semibold leading-tight text-black">
                {item.modelName}
              </h2>
            </div>

            <div className="absolute inset-x-6 bottom-5 top-[92px] transition-transform duration-500 group-hover:scale-[1.03]">
              <Image
                src={item.image}
                alt={item.modelName}
                fill
                sizes="(max-width: 640px) 280px, (max-width: 1280px) 50vw, 25vw"
                className="object-contain object-center"
              />
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-center gap-3 xl:hidden">
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
  );
}
