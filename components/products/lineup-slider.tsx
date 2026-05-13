"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
  const touchGestureRef = useRef({
    active: false,
    axis: null as "x" | "y" | null,
    startX: 0,
    startY: 0,
    startScrollLeft: 0,
  });
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement) return;

    const updateProgress = () => {
      const maxScroll = scrollElement.scrollWidth - scrollElement.clientWidth;
      if (maxScroll <= 0) {
        setProgress(100);
        return;
      }

      setProgress((scrollElement.scrollLeft / maxScroll) * 100);
    };

    updateProgress();
    scrollElement.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    const getTouchCenter = (touches: TouchList) => {
      const touchCount = Math.min(touches.length, 2);
      let x = 0;
      let y = 0;

      for (let index = 0; index < touchCount; index += 1) {
        x += touches[index].clientX;
        y += touches[index].clientY;
      }

      return {
        x: x / touchCount,
        y: y / touchCount,
      };
    };

    const startTouchGesture = (event: TouchEvent) => {
      if (event.touches.length < 1 || event.touches.length > 2) {
        touchGestureRef.current.active = false;
        return;
      }

      const touchCenter = getTouchCenter(event.touches);

      touchGestureRef.current = {
        active: true,
        axis: null,
        startX: touchCenter.x,
        startY: touchCenter.y,
        startScrollLeft: scrollElement.scrollLeft,
      };
    };

    const moveTouchGesture = (event: TouchEvent) => {
      const gesture = touchGestureRef.current;

      if (!gesture.active || event.touches.length < 1 || event.touches.length > 2) {
        return;
      }

      const touchCenter = getTouchCenter(event.touches);
      const deltaX = touchCenter.x - gesture.startX;
      const deltaY = touchCenter.y - gesture.startY;
      const absDeltaX = Math.abs(deltaX);
      const absDeltaY = Math.abs(deltaY);

      if (!gesture.axis && (absDeltaX > 6 || absDeltaY > 6)) {
        gesture.axis = absDeltaX > absDeltaY ? "x" : "y";
      }

      if (gesture.axis !== "x") return;

      event.preventDefault();
      scrollElement.scrollLeft = gesture.startScrollLeft - deltaX;
    };

    const continueOrEndTouchGesture = (event: TouchEvent) => {
      if (event.touches.length < 1 || event.touches.length > 2) {
        touchGestureRef.current.active = false;
        touchGestureRef.current.axis = null;
        return;
      }

      const touchCenter = getTouchCenter(event.touches);

      touchGestureRef.current = {
        active: true,
        axis: null,
        startX: touchCenter.x,
        startY: touchCenter.y,
        startScrollLeft: scrollElement.scrollLeft,
      };
    };

    const cancelTouchGesture = () => {
      touchGestureRef.current.active = false;
      touchGestureRef.current.axis = null;
    };

    scrollElement.addEventListener("touchstart", startTouchGesture, {
      passive: true,
    });
    scrollElement.addEventListener("touchmove", moveTouchGesture, {
      passive: false,
    });
    scrollElement.addEventListener("touchend", continueOrEndTouchGesture, {
      passive: true,
    });
    scrollElement.addEventListener("touchcancel", cancelTouchGesture, {
      passive: true,
    });

    return () => {
      scrollElement.removeEventListener("scroll", updateProgress);
      scrollElement.removeEventListener("touchstart", startTouchGesture);
      scrollElement.removeEventListener("touchmove", moveTouchGesture);
      scrollElement.removeEventListener("touchend", continueOrEndTouchGesture);
      scrollElement.removeEventListener("touchcancel", cancelTouchGesture);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;

    const firstItem = scrollRef.current.firstElementChild as HTMLElement | null;
    const scrollAmount = firstItem
      ? firstItem.getBoundingClientRect().width + 24
      : 350;

    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div>
      <div
        ref={scrollRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 no-scrollbar md:gap-6"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          touchAction: "pan-y pinch-zoom",
        }}
      >
        {products.map((item) => (
          <div
            key={item.id}
            className="w-full shrink-0 snap-start sm:w-[calc(50%-12px)] xl:w-[calc(25%-18px)]"
          >
            <article className="flex h-full flex-col">
              <Link
                href={`/products/${item.id}`}
                prefetch
                className="group block overflow-hidden rounded-lg bg-[#f6f6f6]"
              >
                <div className="relative h-[240px] sm:h-[275px] lg:h-[300px]">
                  <SmartImage
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                    className="object-contain p-10 transition-transform duration-500 group-hover:scale-[1.03] sm:p-14 lg:p-16"
                    quality={90}
                  />
                </div>
              </Link>

              <Link href={`/products/${item.id}`} prefetch className="mt-7 block">
                <h3 className="text-[1.35rem] font-semibold leading-[1.18] text-black sm:text-2xl">
                  {item.name}
                </h3>
              </Link>

              <div className="mt-8">
                <p className="text-lg font-semibold text-black">
                  {getPriceLabel(item.price)}
                </p>
                {item.savings && (
                  <p className="mt-1 text-base font-semibold text-[#006bea]">
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
            </article>
          </div>
        ))}
      </div>

      <div className="mt-10 flex items-center justify-center gap-4">
        <div className="h-0.5 w-full max-w-[560px] overflow-hidden bg-black/12">
          <div
            className="h-full bg-black transition-all duration-500"
            style={{ width: `${Math.max(progress, 18)}%` }}
          />
        </div>

        <div className="flex shrink-0 items-center gap-2.5">
          <button
            type="button"
            onClick={() => scroll("left")}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-black/12 bg-white text-black transition-colors hover:border-black/28 disabled:cursor-not-allowed disabled:opacity-35"
            aria-label="เลื่อนดูสินค้าก่อนหน้า"
          >
            <ChevronLeft className="h-5 w-5" strokeWidth={1.8} />
          </button>
          <button
            type="button"
            onClick={() => scroll("right")}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-black/12 bg-white text-black transition-colors hover:border-black/28 disabled:cursor-not-allowed disabled:opacity-35"
            aria-label="เลื่อนดูสินค้าถัดไป"
          >
            <ChevronRight className="h-5 w-5" strokeWidth={1.8} />
          </button>
        </div>
      </div>
    </div>
  );
}
