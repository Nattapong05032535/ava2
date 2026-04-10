"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface ProductItem {
  id: string;
  name: string;
  shortName: string;
  tagline: string;
  image: string;
  price: string;
  colors: string[];
}

export function LineupSlider({ products }: { products: ProductItem[] }) {
  const [currentSet, setCurrentSet] = useState(0);
  const itemsPerPage = 3;
  const totalSets = Math.ceil(products.length / itemsPerPage);

  const displayedProducts = products.slice(
    currentSet * itemsPerPage,
    (currentSet + 1) * itemsPerPage
  );

  return (
    <div className="space-y-10">
      {/* Products Row */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {displayedProducts.map((item) => (
          <article
            key={item.id}
            className="group flex h-full flex-col rounded-[2rem] border border-black/8 bg-[#f6f7f9] p-4 shadow-[0_20px_55px_rgba(15,23,42,0.05)] transition-all duration-500 hover:-translate-y-1"
          >
            <p className="text-[11px] font-semibold tracking-tight text-[#1b5cff]">
              ใหม่
            </p>

            <Link href={`/products/${item.id}`} prefetch className="mt-3 block">
              <div className="relative overflow-hidden rounded-[1.8rem] bg-white">
                <div className="relative h-52 sm:h-60">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 20vw"
                    className="object-contain p-2 transition-transform duration-500 group-hover:scale-105 sm:p-3"
                  />
                </div>
              </div>
            </Link>

            <div className="mt-5 flex flex-1 flex-col">
              <p className="text-[11px] font-medium uppercase tracking-[0.34em] text-[#6a7280]">
                สมาร์ทโฟน
              </p>

              <h3 className="mt-2 text-[1.85rem] font-semibold leading-[1.08] tracking-tight text-[#161616]">
                {item.name}
              </h3>

              <p className="mt-3 text-sm leading-6 text-[#5f6570]">
                {item.tagline}
              </p>

              <div className="mt-4 flex gap-2">
                {item.colors.map((color, i) => (
                  <div
                    key={i}
                    className={`h-5 w-5 rounded-full border border-black/12 ring-2 ring-white ${color}`}
                  />
                ))}
              </div>

              <div className="mt-auto pt-5">
                <p className="text-base font-semibold text-[#121212]">เริ่มที่</p>
                <p className="mt-1 text-3xl font-semibold tracking-tight text-[#121212]">
                  {item.price.replace("เริ่มที่ ", "")}
                </p>

                <div className="mt-5 flex flex-col gap-2.5">
                  <Link
                    href={`/shop/${item.id}`}
                    prefetch
                    className="inline-flex items-center justify-center rounded-full bg-black px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1a1a1a]"
                  >
                    ซื้อ
                  </Link>
                  <Link
                    href={`/products/${item.id}`}
                    prefetch
                    className="inline-flex items-center justify-center rounded-full border border-black/12 bg-white px-5 py-3 text-sm font-semibold text-black transition-colors hover:bg-[#f3f4f6]"
                  >
                    เรียนรู้เพิ่มเติม
                  </Link>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Set Pagination Dots */}
      {totalSets > 1 && (
        <div className="flex items-center justify-center gap-4">
          {Array.from({ length: totalSets }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSet(i)}
              className={`group flex items-center gap-3 transition-opacity ${
                currentSet === i ? "opacity-100" : "opacity-40 hover:opacity-60"
              }`}
            >
              <span
                className={`h-2 w-2 rounded-full transition-all duration-300 ${
                  currentSet === i ? "w-8 bg-black" : "bg-gray-400"
                }`}
              />
              {currentSet === i && (
                <span className="text-[10px] font-bold uppercase tracking-widest text-black">
                  Set {i + 1}
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
