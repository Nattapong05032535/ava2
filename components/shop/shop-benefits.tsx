"use client";

import { Sparkles, ShieldPlus, Truck, CreditCard, ShieldCheck, Wrench, ArrowRightLeft, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

import { BENEFITS } from "@/constants";

export function ShopBenefits() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 350; // roughly one card width
      scrollRef.current.scrollBy({ left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="bg-white py-16 md:py-24 w-full">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
          <h2 className="text-[28px] md:text-[38px] font-bold text-black tracking-tight">
            ซื้อโดยตรง ได้มากกว่า
          </h2>
          <Link href="#" className="inline-flex items-center justify-center rounded-full border border-[#d2d2d7] px-6 py-2.5 text-[15px] font-bold text-black hover:bg-black/5 transition-colors self-start md:self-auto whitespace-nowrap">
            เรียนรู้เพิ่มเติม
          </Link>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          <div 
            ref={scrollRef}
            className="flex overflow-x-auto gap-4 md:gap-6 pb-6 snap-x snap-mandatory no-scrollbar"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {BENEFITS.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div key={benefit.id} className="w-[280px] md:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] flex-shrink-0 snap-start flex">
                  <div className="flex flex-col w-full h-full bg-white rounded-3xl border border-[#e5e5e5] p-8 hover:border-black/30 transition-colors duration-300">
                    
                    {/* Icon Box */}
                    <div className="w-12 h-12 rounded-2xl bg-[#f4f7ff] flex items-center justify-center mb-6 flex-shrink-0">
                      <Icon className="w-6 h-6 text-[#1b5cff]" strokeWidth={1.5} />
                    </div>

                    {/* Content */}
                    <h3 className="text-[20px] font-bold text-[#111] mb-3 leading-tight break-words">
                      {benefit.title}
                    </h3>
                    <p className="text-[14px] text-[#555] mb-8 leading-relaxed flex-grow break-words whitespace-normal">
                      {benefit.description}
                    </p>

                    {/* Link */}
                    <div className="mt-auto pt-4">
                      <Link href="#" className="text-[14px] font-bold text-black border-b-[2px] border-black inline-block pb-0.5 hover:text-[#1b5cff] hover:border-[#1b5cff] transition-colors">
                        เรียนรู้เพิ่มเติม
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Controls */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-4">
            {/* Dummy progress bar */}
            <div className="w-48 h-[2px] bg-[#e5e5e5] relative rounded-full order-2 md:order-1 hidden md:block">
              <div className="absolute left-0 top-0 h-full w-1/3 bg-black rounded-full"></div>
            </div>
            
            {/* Arrows */}
            <div className="flex gap-3 order-1 md:order-2">
              <button onClick={() => scroll('left')} className="w-10 h-10 rounded-full border border-[#e5e5e5] flex items-center justify-center hover:bg-black/5 transition-colors">
                <ChevronLeft className="w-5 h-5 text-black" strokeWidth={1.5} />
              </button>
              <button onClick={() => scroll('right')} className="w-10 h-10 rounded-full border border-[#e5e5e5] flex items-center justify-center hover:bg-black/5 transition-colors">
                <ChevronRight className="w-5 h-5 text-black" strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
