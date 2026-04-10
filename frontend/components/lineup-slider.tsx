"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";

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
  const [itemsPerPage, setItemsPerPage] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Reset currentSet if it goes out of bounds when itemsPerPage changes
  useEffect(() => {
    const totalSets = Math.ceil(products.length / itemsPerPage);
    if (currentSet >= totalSets) {
      setCurrentSet(0);
    }
  }, [itemsPerPage, products.length, currentSet]);

  const totalSets = Math.ceil(products.length / itemsPerPage);
  const displayedProducts = products.slice(
    currentSet * itemsPerPage,
    (currentSet + 1) * itemsPerPage
  );

  const nextSet = () => {
    setCurrentSet((prev) => (prev + 1) % totalSets);
  };

  return (
    <div className="space-y-12">
      {/* Products Display */}
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
                <div className="relative h-56 sm:h-60">
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

      {/* Apple-style Pagination Control */}
      {totalSets > 1 && (
        <div className="flex items-center justify-center gap-3">
          {/* Dots Container */}
          <div className="flex items-center gap-2.5 rounded-full bg-[#1e1e1e]/90 px-5 py-4 backdrop-blur-md shadow-lg border border-white/5">
            {Array.from({ length: totalSets }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSet(i)}
                className="group relative flex items-center justify-center h-4 focus:outline-none"
              >
                <span
                  className={`h-2 transition-all duration-500 ease-out rounded-full ${
                    currentSet === i 
                      ? "w-8 bg-white" 
                      : "w-2 bg-[#666666] hover:bg-[#999999]"
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Next/Play Button */}
          <button
            onClick={nextSet}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1e1e1e]/90 text-white backdrop-blur-md shadow-lg border border-white/5 transition-all hover:scale-105 hover:bg-[#2a2a2a] active:scale-95"
            aria-label="Next set"
          >
            <Play className="ml-0.5 h-4 w-4 fill-current" />
          </button>
        </div>
      )}
    </div>
  );
}
