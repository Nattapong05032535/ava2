"use client";

import React, { CSSProperties, useState } from "react";
import Link from "next/link";
import { Play } from "lucide-react";
import {
  ProductShowcase,
  ProductShowcaseSection,
  ProductShowcaseStat,
} from "@/types";
import { SmartImage } from "@/components/shared";
import { getProductModelKey } from "@/constants";
import {
  MODEL_FOLDER_MAP,
  SHOWCASE_DETAIL_DESCRIPTIONS,
} from "@/constants/products";
import { Navbar } from "@/components/layout";
import { LineupSlider } from "@/components/products";
import { Product3DViewer } from "@/components/products";

function formatUpdatedDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("th-TH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function MetricCard({ stat }: { stat: ProductShowcaseStat }) {
  return (
    <div className="rounded-[2rem] border border-black/6 bg-white/82 p-7 shadow-[0_16px_50px_rgba(15,23,42,0.04)] transition-all hover:shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
      <p className="text-3xl font-semibold tracking-tight text-(--showcase-ink)">
        {stat.value}
      </p>
      <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-(--showcase-accent)">
        {stat.label}
      </p>
      <p className="mt-4 text-sm leading-6 text-(--showcase-muted-ink)">
        {stat.detail}
      </p>
    </div>
  );
}

function StorySection({
  section,
  showcase,
}: {
  section: ProductShowcaseSection;
  showcase: ProductShowcase;
}) {
  return (
    <section
      id={section.id}
      className="relative scroll-mt-20 overflow-hidden py-10 sm:py-14 lg:py-16"
      style={{ 
        backgroundColor: 
          section.id === "experience" 
            ? "var(--showcase-surface)" 
            : section.tone === "dark" || section.id === "signature" || section.id === "performance"
            ? "var(--showcase-accent-soft)"
            : "white",
        color: "var(--showcase-ink)"
      }}
    >
      <div 
        className="absolute inset-x-0 top-0 h-87.5 opacity-10"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${showcase.theme.accent}, transparent 70%)`
        }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.01)_1px,transparent_1px)] bg-size-[60px_60px] opacity-[0.2]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-4xl text-center mb-16 lg:mb-24">
          <p className="text-base font-bold uppercase tracking-[0.3em] text-(--showcase-accent) sm:text-lg">
            {section.eyebrow}
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-6xl lg:leading-[1.1]">
            {section.title}
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-[16px] leading-relaxed text-(--showcase-muted-ink) sm:text-lg sm:leading-8">
            {section.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-16 items-center">
          <div className="lg:col-span-3">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl shadow-gray-200/50 sm:rounded-[2.5rem]">
              <div className="relative aspect-4/3 w-full overflow-hidden sm:aspect-16/10">
                <SmartImage
                  src={section.visual?.src || showcase.detailVisual.src}
                  alt={section.visual?.alt || section.title}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  quality={80}
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 flex flex-col gap-5">
            {section.cards.map((card) => (
              <div
                key={card.title}
                className="group rounded-2xl border border-black/5 bg-white/40 p-6 backdrop-blur-sm transition-all hover:translate-x-2 sm:rounded-3xl hover:bg-white/60"
              >
                <h3 className="text-lg font-bold tracking-tight">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-black/50 sm:leading-6">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SpotlightHero({ showcase, onScrollTo }: { showcase: ProductShowcase; onScrollTo: (id: string) => void }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  
  const slides = React.useMemo(() => {
    const modelKey = getProductModelKey(showcase.displayName);
    const folderName = MODEL_FOLDER_MAP[modelKey] || "P89";
    
    return [1, 2, 3, 4, 5].map((num, i) => ({
      src: `/first-detail/${folderName}/${num}.webp`,
      alt: `ภาพรายละเอียด ${showcase.displayName} ชุดที่ ${num}`,
      description: SHOWCASE_DETAIL_DESCRIPTIONS[i],
    }));
  }, [showcase.product.documentId, showcase.displayName]);

  const currentSlide = slides[activeSlide];

  function showNextSlide() {
    setDirection("next");
    setActiveSlide((current) => (current + 1) % slides.length);
  }

  return (
    <>
      <section
        id="overview"
        className="scroll-mt-40 overflow-hidden border-b border-white/10 bg-[#0f172a] text-white"
      >
        <div className="relative isolate px-6 pb-6 pt-8 sm:pt-10 lg:pb-2 lg:pt-16">
          <div 
            className="absolute inset-x-0 top-0 h-125 opacity-40 lg:h-175"
            style={{
              background: `radial-gradient(circle at 70% 20%, ${showcase.theme.accent}, transparent 70%)`
            }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-size-[100px_100px] opacity-[0.5]" />

          <div className="relative mx-auto max-w-7xl">
            <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-8">
              <div className="showcase-stage-copy z-20 text-center lg:pt-8 lg:text-left">
                <div className="flex flex-wrap items-center justify-center gap-3 lg:justify-start">
                  <span className="rounded-full border border-white/10 bg-white/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-(--showcase-accent) backdrop-blur-xl shadow-sm">
                    {showcase.hero.label}
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/10 px-4 py-1.5 text-[11px] font-medium text-white/60 backdrop-blur-xl">
                    อัปเดตล่าสุด {formatUpdatedDate(showcase.product.updatedAt)}
                  </span>
                </div>

                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.34em] text-white/50">
                  {showcase.hero.eyebrow}
                </p>

                <h1
                  className="showcase-stage-wordmark mt-2 text-6xl font-semibold tracking-[-0.08em] sm:text-7xl md:text-8xl lg:text-[12rem] lg:leading-[0.9]"
                  style={{
                    backgroundImage: `linear-gradient(180deg, #ffffff 0%, ${showcase.theme.accent} 92%)`,
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  {showcase.hero.spotlightWordmark}
                </h1>

                <p className="mt-3 text-lg font-medium text-white/70 sm:text-xl lg:text-2xl">
                  {showcase.displayName}
                </p>
                
                <div className="mt-8 flex items-center justify-center lg:mt-10 lg:justify-start">
                  <button
                    onClick={() => onScrollTo('signature')}
                    className="flex h-12 items-center justify-center rounded-full border border-white bg-transparent px-10 text-sm font-semibold text-white transition-all hover:bg-white/10 active:scale-95 sm:h-14 sm:text-base shadow-sm"
                  >
                    ดูรายละเอียด
                  </button>
                </div>
              </div>

              <div className="relative mx-auto h-64 w-full max-w-sm sm:h-76 md:h-92 lg:-mt-6 lg:h-104 lg:max-w-lg lg:-translate-y-1 lg:-translate-x-4 xl:h-112 xl:max-w-xl">
                <div
                  className="showcase-stage-glow absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl opacity-25 sm:h-80 sm:w-80 lg:h-115 lg:w-115"
                  style={{ backgroundColor: showcase.theme.accent }}
                />
                <div className="absolute inset-x-[12%] bottom-[12%] h-12 rounded-full bg-black/10 blur-3xl lg:h-16" />

                <SmartImage
                  src={showcase.hero.heroVisual.src}
                  alt={showcase.hero.heroVisual.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                  className="showcase-stage-device relative z-10 object-contain object-center transition-transform duration-1000 lg:scale-105 xl:scale-110"
                  priority
                  quality={85}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-black px-5 py-16 text-white sm:px-6 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-sm font-semibold text-[#1683ff] sm:text-base">
              พบกับดีไซน์ที่ออกแบบมาเพื่อ {showcase.displayName}
            </p>
            <h2 className="mt-3 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              ดีไซน์ที่ประณีตบรรจง
            </h2>
          </div>

          <div className="mx-auto mt-8 max-w-3xl overflow-hidden rounded-[1.75rem] bg-zinc-900 sm:mt-12 sm:rounded-[2rem]">
            <div className="relative aspect-[1.35/1] sm:aspect-video">
                <SmartImage
                  key={currentSlide.src}
                  src={currentSlide.src}
                  alt={currentSlide.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 1000px"
                  className={`object-cover ${
                    direction === "next"
                      ? "animate-slide-in-right"
                      : "animate-slide-in-left"
                  }`}
                  quality={80}
                />
              <button
                type="button"
                onClick={showNextSlide}
                aria-label="ดูภาพถัดไป"
                className="absolute bottom-5 right-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/80 bg-black/10 text-white backdrop-blur-md transition-colors hover:bg-white/15 sm:bottom-7 sm:right-7 sm:h-12 sm:w-12"
              >
                <Play className="h-5 w-5 fill-current" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <div className="flex h-7 items-center gap-3 rounded-full border border-white/15 bg-black px-4">
              {slides.map((slide, index) => (
                <button
                  key={slide.src}
                  type="button"
                  onClick={() => {
                    setDirection(index > activeSlide ? "next" : "prev");
                    setActiveSlide(index);
                  }}
                  aria-label={`ดูภาพที่ ${index + 1}`}
                  className={`h-2 rounded-full transition-all ${
                    index === activeSlide
                      ? "w-8 bg-white"
                      : "w-2 bg-white/55 hover:bg-white/80"
                  }`}
                />
              ))}
            </div>
          </div>

          <p className="mx-auto mt-7 max-w-4xl text-center text-[17px] leading-8 text-white/64 sm:text-xl sm:leading-9">
            {currentSlide.description}
          </p>
        </div>
      </section>
    </>
  );
}

export function ProductShowcasePage({ showcase }: { showcase: ProductShowcase }) {
  const mappedLineup = showcase.lineup.map((item) => {
    const itemModelKey = getProductModelKey(item.name);
    const itemFolderName = MODEL_FOLDER_MAP[itemModelKey] || "P89";
    const isTablet = itemModelKey === "tab-p68";
    const productImage = isTablet
      ? `/products/tab_let/${itemFolderName}.webp`
      : `/products/smart_phone/${itemFolderName}.webp`;

    return {
      id: item.documentId,
      name: item.name,
      shortName: item.name,
      tagline: item.subtitle,
      image: productImage,
      price: "เริ่มที่ ฿12,900",
      colors: ["bg-black", "bg-[#f5f5f7]", "bg-[#333]"],
    };
  });

  const themeStyle = {
    "--showcase-page": showcase.theme.page,
    "--showcase-surface": showcase.theme.surface,
    "--showcase-muted-surface": showcase.theme.mutedSurface,
    "--showcase-ink": showcase.theme.ink,
    "--showcase-muted-ink": showcase.theme.mutedInk,
    "--showcase-accent": showcase.theme.accent,
    "--showcase-accent-soft": showcase.theme.accentSoft,
    "--showcase-accent-strong": showcase.theme.accentStrong,
    "--showcase-dark": showcase.theme.darkSurface,
  } as CSSProperties;

  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 130;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const [activeFeature, setActiveFeature] = useState(0);

  const handleFeatureScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollLeft = e.currentTarget.scrollLeft;
    const width = e.currentTarget.clientWidth;
    const itemWidth = width * 0.85; // matching min-w-[85vw]
    const index = Math.round(scrollLeft / itemWidth);
    if (index !== activeFeature) {
      setActiveFeature(index);
    }
  };

  const modelKey = getProductModelKey(showcase.displayName);
  const folderName = MODEL_FOLDER_MAP[modelKey] || "P89";
  const colorImagePath = `/color/${folderName}/color.webp`;

  return (
    <div
      style={themeStyle}
      className="min-h-screen bg-(--showcase-page) text-(--showcase-ink) scroll-smooth"
    >
      <Navbar />

      <main className="pt-14">
        <header className="sticky top-14 z-40 hidden overflow-hidden border-b border-white/10 bg-[#050506]/88 text-white shadow-[0_18px_70px_rgba(0,0,0,0.32)] backdrop-blur-2xl lg:block">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(255,255,255,0.08),transparent_30%),linear-gradient(90deg,rgba(255,255,255,0.05),transparent_38%,rgba(255,255,255,0.04))]" />
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-80"
            style={{
              background:
                "linear-gradient(90deg, transparent, var(--showcase-accent), rgba(255,255,255,0.5), transparent)",
            }}
          />
          <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-6 overflow-x-auto px-6 py-3 no-scrollbar sm:py-4">
            <div className="flex min-w-fit items-center gap-4">
              <div
                className="h-9 w-px rounded-full opacity-70"
                style={{
                  background:
                    "linear-gradient(180deg, transparent, var(--showcase-accent), transparent)",
                }}
              />
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-white/42 sm:text-[11px]">
                  {showcase.familyLabel}
                </p>
                <p className="mt-0.5 text-[13px] font-semibold text-white/88 sm:mt-1 sm:text-sm">
                  {showcase.displayName}
                </p>
              </div>
            </div>
            <div className="flex min-w-fit items-center gap-1 rounded-full border border-white/14 bg-white/[0.07] p-1 text-[12px] text-white/62 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_18px_48px_rgba(0,0,0,0.35)] ring-1 ring-black/20 sm:text-sm">
              {[
                { id: 'overview', label: 'ภาพรวม' },
                { id: 'highlights', label: 'ไฮไลท์' },
                { id: '3d-view', label: 'มุมมอง 3D' },
                { id: 'specs', label: 'สเปก' },
              ].map((anchor) => (
                <button
                  key={anchor.id}
                  onClick={() => handleScroll(anchor.id)}
                  className="rounded-full px-3.5 py-1.5 font-medium transition-all hover:bg-white/12 hover:text-white hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] sm:px-4 sm:py-2"
                >
                  {anchor.label}
                </button>
              ))}
            </div>
          </div>
        </header>

        <SpotlightHero showcase={showcase} onScrollTo={handleScroll} />

        <section id="3d-view" className="scroll-mt-40 bg-black py-2 text-white lg:py-6">
          <div className="relative mx-auto max-w-7xl px-6">
            <div className="mx-auto mb-1 max-w-3xl text-center">
              <p className="text-[13px] font-semibold text-[#1683ff] sm:text-sm">
                มุมมองสามมิติ
              </p>
              <h2 className="mt-0.5 text-xl font-semibold tracking-tight sm:text-2xl lg:text-3xl">
                หมุนดูทุกมุม เหมือนถือจริง
              </h2>
              <p className="mx-auto mt-1 max-w-2xl text-[14px] leading-relaxed text-white/58 sm:text-sm">
                หมุนชม {showcase.displayName} แบบ 360 องศา ลากเพื่อหมุน ซูมเข้าดูรายละเอียด หรือเลือกมุมมองที่ต้องการได้ทันที
              </p>
            </div>
            <div className="mx-auto max-w-5xl">
              <Product3DViewer
                productImage={showcase.detailVisual.src}
                accentColor={showcase.theme.accent}
                productName={showcase.displayName}
              />
            </div>
          </div>
        </section>

        <section id="features" className="relative scroll-mt-20 overflow-hidden bg-[#0f172a] py-20 text-white sm:py-24 lg:py-32">
          {/* Unified Background Effects - Clean & Seamless */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-size-[60px_60px] opacity-[0.2]" />
          <div 
            className="absolute inset-x-0 top-0 h-full opacity-15"
            style={{
              background: `radial-gradient(circle at 50% 25%, ${showcase.theme.accent}, transparent 80%)`
            }}
          />

          <div className="relative mx-auto max-w-7xl px-6">
            {/* 1. Specifications Grid */}
            <div id="specs" className="mb-24 lg:mb-32 scroll-mt-32">
              <div className="mx-auto max-w-3xl text-center mb-12">
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-blue-400">
                  สเปกและความแรง
                </p>
                <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                  ประสิทธิภาพที่เหนือกว่าในทุกมิติ
                </h2>
              </div>

              <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                {showcase.specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all hover:bg-white/10 sm:rounded-[2.5rem] sm:p-8"
                  >
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40 sm:text-[11px]">
                        {spec.label}
                      </p>
                      <h3 className="mt-3 text-xl font-bold tracking-tight text-transparent bg-clip-text bg-linear-to-br from-blue-400 to-indigo-400 sm:mt-4 sm:text-3xl">
                        {spec.value}
                      </h3>
                    </div>
                    <p className="mt-3 text-[11px] leading-relaxed text-white/50 sm:mt-4 sm:text-sm">
                      {spec.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Unified 3-Column Feature Trio */}
            <div id="highlights" className="scroll-mt-32">
              <div className="mx-auto max-w-4xl text-center mb-10 lg:mb-14">
                <p className="text-sm font-bold uppercase tracking-[0.3em] text-blue-400">
                  ที่สุดของประสบการณ์
                </p>
                <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl lg:leading-[1.2]">
                  {showcase.displayName} นิยามใหม่แห่งนวัตกรรม
                </h2>
                <p className="mx-auto mt-4 max-w-4xl text-sm leading-relaxed text-white/50 sm:text-base sm:leading-7">
                  เรารวบรวมความประณีตของการออกแบบ พลังของการสร้างสรรค์ และประสบการณ์ที่ไร้รอยต่อไว้ในที่เดียว
                </p>
              </div>

              <div 
                className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 no-scrollbar md:grid md:grid-cols-3 lg:gap-10"
                onScroll={handleFeatureScroll}
              >
                {[
                  { 
                    id: "design", 
                    title: showcase.sections[0].title, 
                    desc: showcase.sections[0].description, 
                    img: `/highlight/${folderName}/1.webp`,
                    eyebrow: showcase.sections[0].eyebrow
                  },
                  { 
                    id: "creative", 
                    title: showcase.sections[1].title, 
                    desc: showcase.sections[1].description, 
                    img: `/highlight/${folderName}/2.webp`,
                    eyebrow: showcase.sections[1].eyebrow
                  },
                  { 
                    id: "experience", 
                    title: showcase.experience.title, 
                    desc: showcase.experience.description, 
                    img: `/highlight/${folderName}/3.webp`,
                    eyebrow: showcase.experience.eyebrow
                  }
                ].map((item) => (
                  <div key={item.id} className="flex min-w-[85vw] snap-center flex-col group md:min-w-0">
                    <div className="relative aspect-4/4.5 overflow-hidden rounded-[1.5rem] shadow-2xl transition-transform duration-500 group-hover:scale-[1.02] shadow-black/40">
                      <SmartImage
                        src={item.img}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 30vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        quality={80}
                      />
                    </div>
                    <div className="mt-5">
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400 mb-2">
                        {item.eyebrow}
                      </p>
                      <h3 className="text-lg font-bold tracking-tight lg:text-xl text-white">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-white/40 sm:text-[13px] sm:leading-6 line-clamp-3">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mobile Pagination Dots */}
              <div className="mt-6 flex justify-center md:hidden">
                <div className="flex h-6 items-center gap-2.5 rounded-full border border-white/10 bg-black/40 px-3 backdrop-blur-md">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        i === activeFeature ? "w-6 bg-white" : "w-1.5 bg-white/30"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative py-10 lg:py-14 bg-[#e8e8ed] overflow-hidden">
          {/* Visible Marble Texture Overlay */}
          <div 
            className="absolute inset-0 opacity-80 mix-blend-multiply pointer-events-none"
            style={{
              backgroundImage: 'url(/images/textures/marble.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div className="relative mx-auto max-w-7xl px-6">
            <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="showcase-stage-panel rounded-2xl border border-black/6 bg-white/84 p-6 shadow-[0_32px_96px_rgba(15,23,42,0.08)] backdrop-blur-2xl sm:rounded-[2.5rem] sm:p-10">
                <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-(--showcase-accent) sm:text-[11px]">
                  เฉดสีและพื้นผิว
                </p>
                <h2 className="mt-4 text-2xl font-semibold tracking-tight text-(--showcase-ink) sm:mt-6 sm:text-3xl lg:text-4xl">
                  สีสันที่ผ่านการคัดสรร เพื่อสะท้อนอารมณ์และตัวตนของผลิตภัณฑ์
                </h2>

                <div className="mt-8 space-y-3 sm:mt-10 sm:space-y-4">
                  {showcase.finishes.map((finish, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 rounded-2xl border border-black/5 bg-white/50 p-3 transition-transform hover:scale-[1.02] sm:gap-5 sm:rounded-3xl sm:p-4"
                    >
                      <div
                        className="h-6 w-6 rounded-full shadow-inner lg:h-8 lg:w-8"
                        style={{ backgroundColor: finish.swatch }}
                      />
                      <div>
                        <h4 className="text-sm font-semibold text-(--showcase-ink) sm:text-base">
                          {finish.name}
                        </h4>
                        <p className="text-[11px] text-(--showcase-muted-ink) sm:text-xs">
                          {finish.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div
                className="relative min-h-80 overflow-hidden rounded-2xl border border-black/6 bg-white shadow-[0_32px_96px_rgba(15,23,42,0.06)] sm:min-h-100 sm:rounded-[2.5rem] lg:min-h-120"
              >
                <SmartImage
                  src={colorImagePath}
                  alt={`${showcase.displayName} Colors`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 50vw"
                  className="object-cover"
                  priority
                  quality={85}
                />
              </div>
            </div>
          </div>
        </section>

        {showcase.lineup.length > 0 && (
          <section className="border-t border-black/6 py-10 lg:py-20 bg-[#fbfbfd]">
            <div className="mx-auto max-w-7xl px-6">
              <div className="mb-12 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div className="max-w-2xl text-center sm:text-left">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#86868b]">
                    รุ่นอื่นๆ ในซีรีส์
                  </p>
                  <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl text-[#1d1d1f]">
                    สัมผัสความหลากหลายของ AVA ที่ออกแบบมาเพื่อคุณ
                  </h2>
                </div>
                <Link
                  href="/products"
                  className="text-sm font-semibold text-[#0066cc] hover:underline"
                >
                  ดูสินค้าทั้งหมด
                </Link>
              </div>

              <div className="mt-8">
                <LineupSlider products={mappedLineup} />
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
