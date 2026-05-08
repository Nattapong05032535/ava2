"use client";

import { useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { SmartImage } from "@/components/shared";

import { PRIVILEGES } from "@/constants";

export function ShopPrivileges() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 350;
      scrollRef.current.scrollBy({ left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="bg-white pb-16 md:pb-24 w-full">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Header */}
        <div className="mb-10">
          <h2 className="text-[28px] md:text-[38px] font-bold text-black tracking-tight">
            สิทธิพิเศษ
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          <div 
            ref={scrollRef}
            className="flex overflow-x-auto gap-4 md:gap-6 pb-6 snap-x snap-mandatory no-scrollbar"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {PRIVILEGES.map((privilege) => (
              <div key={privilege.id} className="w-[280px] md:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] flex-shrink-0 snap-start flex flex-col group cursor-pointer">
                
                {/* Image */}
                <div className="w-full aspect-[4/3] rounded-[2rem] overflow-hidden relative bg-[#f4f4f4] mb-6">
                  {/* SmartImage handles fallback .webp -> .jpeg automatically */}
                  <SmartImage
                    src={`/special-privileges/${privilege.imageFolder}.webp`}
                    alt={privilege.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                
                {/* Title */}
                <h3 className="text-[18px] md:text-[20px] font-bold text-black mb-3">
                  {privilege.title}
                </h3>
                
                {/* Link */}
                <div className="flex items-center gap-1.5 text-[14px] font-bold text-black group-hover:text-[#1b5cff] transition-colors mt-auto self-start border-b border-transparent group-hover:border-[#1b5cff] pb-0.5">
                  เรียนรู้เพิ่มเติม
                  <ArrowUpRight className="w-4 h-4" strokeWidth={2.5} />
                </div>
              </div>
            ))}
          </div>

          {/* Controls */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-4">
            <div className="w-64 h-[2px] bg-[#e5e5e5] relative rounded-full order-2 md:order-1 hidden md:block">
              <div className="absolute left-0 top-0 h-full w-[25%] bg-black rounded-full"></div>
            </div>
            
            <div className="flex gap-3 order-1 md:order-2">
              <button onClick={() => scroll('left')} className="w-10 h-10 rounded-full border border-[#d2d2d7] bg-white flex items-center justify-center hover:bg-black/5 transition-colors">
                <ChevronLeft className="w-5 h-5 text-black" strokeWidth={1.5} />
              </button>
              <button onClick={() => scroll('right')} className="w-10 h-10 rounded-full border border-[#d2d2d7] bg-white flex items-center justify-center hover:bg-black/5 transition-colors">
                <ChevronRight className="w-5 h-5 text-black" strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
