"use client";

import React, { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { MoveRight } from "lucide-react";
import type {
  ProductShowcase,
  ProductShowcaseSection,
  ProductShowcaseStat,
} from "@/types";
import { Navbar } from "@/components/navbar";
import { LineupSlider } from "@/components/lineup-slider";

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
  reverse,
}: {
  section: ProductShowcaseSection;
  reverse?: boolean;
}) {
  const isDark = section.tone === "dark";

  return (
    <section
      id={section.id}
      className="scroll-mt-40 py-10 sm:py-14"
      aria-labelledby={`${section.id}-title`}
    >
      <div
        className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-16 ${
          reverse ? "lg:[&>*:first-child]:order-2" : ""
        }`}
      >
        <div
          className={`relative overflow-hidden rounded-[2.5rem] ${
            isDark
              ? "bg-(--showcase-dark) text-white"
              : "border border-black/6 bg-white/82 text-(--showcase-ink)"
          }`}
          style={
            isDark
              ? {
                  background:
                    "radial-gradient(circle at top, rgba(255,255,255,0.08), transparent 35%), linear-gradient(180deg, rgba(255,255,255,0.04), transparent 40%), var(--showcase-dark)",
                }
              : {
                  background:
                    "radial-gradient(circle at top right, var(--showcase-accent-soft), transparent 28%), linear-gradient(180deg, rgba(255,255,255,0.92), rgba(255,255,255,0.72))",
                }
          }
        >
          <div className="relative flex h-full flex-col justify-between p-8 lg:p-10">
            <div>
              <p
                className={`text-xs font-semibold uppercase tracking-[0.26em] ${
                  isDark ? "text-white/60" : "text-(--showcase-accent)"
                }`}
              >
                {section.eyebrow}
              </p>
              <h2
                id={`${section.id}-title`}
                className="mt-4 max-w-xl text-3xl font-semibold tracking-tight sm:text-4xl"
              >
                {section.title}
              </h2>
              <p
                className={`mt-5 max-w-xl text-base leading-7 ${
                  isDark ? "text-white/72" : "text-(--showcase-muted-ink)"
                }`}
              >
                {section.description}
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {section.cards.map((card) => (
                <div
                  key={card.title}
                  className={`rounded-2xl p-5 ${
                    isDark ? "bg-white/7" : "bg-black/4"
                  }`}
                >
                  <h3 className="text-base font-semibold">{card.title}</h3>
                  <p
                    className={`mt-2 text-sm leading-6 ${
                      isDark ? "text-white/54" : "text-black/54"
                    }`}
                  >
                    {card.description}
                  </p>
                </div>
              ))}
            </div>

            {section.quote && (
              <div
                className={`mt-12 border-l-2 py-1 pl-6 ${
                  isDark ? "border-white/20" : "border-black/10"
                }`}
              >
                <p
                  className={`text-sm italic leading-7 ${
                    isDark ? "text-white/60" : "text-black/60"
                  }`}
                >
                  “{section.quote}”
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-(--showcase-muted-surface) sm:aspect-[1.1/1] lg:aspect-square">
          <Image
            src={section.visual.src}
            alt={section.visual.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 hover:scale-105"
          />
        </div>
      </div>
    </section>
  );
}

function SpotlightHero({ showcase, onScrollTo }: { showcase: ProductShowcase; onScrollTo: (id: string) => void }) {
  return (
    <>
      <section
        id="overview"
        className="scroll-mt-40 overflow-hidden border-b border-black/5 bg-[#f1f5f9] text-(--showcase-ink)"
      >
        <div className="relative isolate px-6 pb-6 pt-8 sm:pt-10 lg:pb-2 lg:pt-16">
          <div 
            className="absolute inset-x-0 top-0 h-[500px] opacity-40 lg:h-[700px]"
            style={{
              background: `radial-gradient(circle at 70% 20%, ${showcase.theme.accent}15, transparent 70%)`
            }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-size-[100px_100px] opacity-[0.5]" />

          <div className="relative mx-auto max-w-7xl">
            <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-8">
              <div className="showcase-stage-copy z-20 text-center lg:pt-8 lg:text-left">
                <div className="flex flex-wrap items-center justify-center gap-3 lg:justify-start">
                  <span className="rounded-full border border-black/8 bg-white/60 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-(--showcase-accent) backdrop-blur-xl shadow-sm">
                    {showcase.hero.label}
                  </span>
                  <span className="rounded-full border border-black/8 bg-white/40 px-4 py-1.5 text-[11px] font-medium text-(--showcase-muted-ink) backdrop-blur-xl">
                    อัปเดตล่าสุด {formatUpdatedDate(showcase.product.updatedAt)}
                  </span>
                </div>

                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.34em] text-(--showcase-muted-ink)">
                  {showcase.hero.eyebrow}
                </p>

                <h1
                  className="showcase-stage-wordmark mt-2 text-6xl font-semibold tracking-[-0.08em] sm:text-7xl md:text-8xl lg:text-[12rem] lg:leading-[0.9]"
                  style={{
                    backgroundImage: `linear-gradient(180deg, var(--showcase-ink) 0%, ${showcase.theme.accent} 92%)`,
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  {showcase.hero.spotlightWordmark}
                </h1>

                <p className="mt-3 text-lg font-medium text-(--showcase-muted-ink) sm:text-xl lg:text-2xl">
                  {showcase.displayName}
                </p>
                
                <div className="mt-8 flex items-center justify-center lg:mt-10 lg:justify-start">
                  <button
                    onClick={() => onScrollTo('signature')}
                    className="flex h-12 items-center justify-center rounded-full border border-black/10 bg-white/60 px-10 text-sm font-semibold text-black backdrop-blur-md transition-all hover:bg-white/80 active:scale-95 sm:h-14 sm:text-base shadow-sm"
                  >
                    ดูรายละเอียด
                  </button>
                </div>
              </div>

              <div className="relative mx-auto h-80 w-full max-w-lg sm:h-100 md:h-120 lg:-mt-16 lg:h-160 lg:max-w-none lg:-translate-y-4">
                <div
                  className="showcase-stage-glow absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl opacity-25 sm:h-80 sm:w-80 lg:h-115 lg:w-115"
                  style={{ backgroundColor: showcase.theme.accent }}
                />
                <div className="absolute inset-x-[12%] bottom-[12%] h-12 rounded-full bg-black/10 blur-3xl lg:h-16" />

                <Image
                  src={showcase.hero.heroVisual.src}
                  alt={showcase.hero.heroVisual.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                  className="showcase-stage-device relative z-10 object-contain object-center transition-transform duration-1000 lg:scale-115"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Level 2: Detail Panels Section - Dark Tone */}
      <section className="relative px-6 pb-20 pt-16 bg-[#0f172a] overflow-hidden">
        <div 
          className="absolute top-0 right-0 w-[500px] h-[500px] opacity-10 blur-[120px] pointer-events-none"
          style={{ background: `radial-gradient(circle, ${showcase.theme.accent}, transparent)` }}
        />
        
        <div className="mx-auto max-w-7xl relative z-10">
          <div className="mt-6 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[2rem] border border-white/5 bg-white/5 p-6 shadow-[0_32px_96px_rgba(0,0,0,0.3)] backdrop-blur-2xl sm:p-10 lg:rounded-[2.5rem]">
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-(--showcase-accent) sm:text-[11px]">
                Signature story
              </p>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight text-white sm:mt-6 sm:text-3xl lg:text-4xl xl:text-5xl">
                {showcase.hero.headline}
              </h2>
              <p className="mt-5 text-sm leading-relaxed text-white/70 sm:mt-6 sm:text-base sm:leading-8 lg:text-lg lg:leading-9">
                {showcase.hero.subheadline}
              </p>
              <p className="mt-4 text-[13px] leading-relaxed text-white/50 sm:mt-6 sm:text-sm sm:leading-7 lg:text-base">
                {showcase.hero.description}
              </p>
            </div>

            <div className="rounded-[2rem] border border-white/5 bg-white/5 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.2)] backdrop-blur-2xl sm:p-10 lg:rounded-[2.5rem]">
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/40 sm:text-[11px]">
                Product note
              </p>
              <p className="mt-4 text-[13px] leading-relaxed text-white/70 sm:mt-6 sm:text-base sm:leading-8">
                {showcase.hero.detailsNote}
              </p>

              <div className="mt-8 rounded-2xl border border-white/5 bg-white/5 p-6 sm:mt-10 sm:rounded-[2rem]">
                <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/40 sm:text-[11px]">
                  Collection
                </p>
                <p className="mt-3 text-xl font-semibold text-white sm:text-2xl">
                  {showcase.familyLabel}
                </p>
                <p className="mt-2 text-[13px] text-white/50 sm:text-sm">
                  {showcase.category} ที่ออกแบบให้ภาพแรกของหน้า detail เป็นเหมือนโปสเตอร์เปิดตัวของรุ่นนี้
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {showcase.hero.serviceBadges.map((badge) => (
              <div
                key={badge.label}
                className="rounded-2xl border border-white/5 bg-white/5 p-5 backdrop-blur-xl shadow-sm transition-transform hover:-translate-y-1 sm:p-6 lg:rounded-[1.8rem]"
              >
                <p className="text-sm font-semibold text-white">
                  {badge.label}
                </p>
                <p className="mt-2 text-[13px] leading-relaxed text-white/50 sm:mt-3 sm:text-sm sm:leading-6">
                  {badge.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export function ProductShowcasePage({ showcase }: { showcase: ProductShowcase }) {
  const mappedLineup = showcase.lineup.map((item) => ({
    id: item.documentId,
    name: item.name,
    shortName: item.name,
    tagline: item.subtitle,
    image: item.imageSrc,
    price: "เริ่มที่ ฿12,900",
    colors: ["bg-black", "bg-[#f5f5f7]", "bg-[#333]"]
  }));

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

  return (
    <div
      style={themeStyle}
      className="min-h-screen bg-(--showcase-page) text-(--showcase-ink) scroll-smooth"
    >
      <Navbar />

      <main className="pt-18">
        <header className="sticky top-[72px] z-40 hidden border-b border-black/5 bg-white/70 backdrop-blur-xl lg:block">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(37,99,235,0.16),transparent)]" />
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 overflow-x-auto px-6 py-3 no-scrollbar sm:py-4">
            <div className="min-w-fit">
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-gray-500 sm:text-[11px]">
                {showcase.familyLabel}
              </p>
              <p className="mt-0.5 text-[13px] font-medium text-gray-700 sm:mt-1 sm:text-sm">
                {showcase.displayName}
              </p>
            </div>
            <div className="flex min-w-fit items-center gap-1.5 rounded-full border border-gray-200 bg-white p-1 text-[12px] text-gray-500 shadow-[0_10px_24px_rgba(15,23,42,0.04)] sm:gap-2 sm:p-1.5 sm:text-sm">
              {showcase.anchors.map((anchor) => (
                <button
                  key={anchor.id}
                  onClick={() => handleScroll(anchor.id)}
                  className="rounded-full px-3 py-1.5 transition-colors hover:bg-gray-50 hover:text-black sm:px-4 sm:py-2"
                >
                  {anchor.label}
                </button>
              ))}
            </div>
          </div>
        </header>

        <SpotlightHero showcase={showcase} onScrollTo={handleScroll} />

        <section className="mx-auto max-w-7xl px-6 py-10 sm:py-14">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {showcase.stats.map((stat) => (
              <MetricCard key={`${stat.label}-${stat.value}`} stat={stat} />
            ))}
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-6">
          {showcase.sections.map((section, index) => (
            <StorySection
              key={section.id}
              section={section}
              reverse={index % 2 === 1}
            />
          ))}
        </div>

        <section
          id={showcase.experience.id}
          className="scroll-mt-40 py-10 lg:py-14"
        >
          <div className="mx-auto max-w-7xl px-6">
            <div className="max-w-3xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-(--showcase-accent)">
                {showcase.experience.eyebrow}
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                {showcase.experience.title}
              </h2>
              <p className="mt-5 text-sm leading-relaxed text-(--showcase-muted-ink) sm:text-base sm:leading-8">
                {showcase.experience.description}
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {showcase.experience.cards.map((card) => (
                <div
                  key={card.title}
                  className="rounded-2xl border border-black/6 bg-white/74 p-6 shadow-[0_20px_50px_rgba(15,23,42,0.06)] sm:rounded-[2rem] sm:p-7"
                >
                  <h3 className="text-xl font-semibold tracking-tight text-(--showcase-ink) sm:text-2xl">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-(--showcase-muted-ink) sm:mt-4 sm:text-base sm:leading-7">
                    {card.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-10 lg:py-14">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="showcase-stage-panel rounded-2xl border border-black/6 bg-white/84 p-6 shadow-[0_32px_96px_rgba(15,23,42,0.08)] backdrop-blur-2xl sm:rounded-[2.5rem] sm:p-10">
                <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-(--showcase-accent) sm:text-[11px]">
                  Finishes
                </p>
                <h2 className="mt-4 text-2xl font-semibold tracking-tight text-(--showcase-ink) sm:mt-6 sm:text-3xl lg:text-4xl">
                  Curated colors, chosen to shape the mood of the product.
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
              <Image
                src={showcase.detailVisual.src}
                alt={showcase.detailVisual.alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
            </div>
          </div>
        </section>

        <section id="specs" className="scroll-mt-40 py-10 lg:py-14">
          <div className="mx-auto max-w-7xl px-6">
            <div className="max-w-3xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-(--showcase-accent)">
                Specs at a glance
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                Key details that complete the story.
              </h2>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {showcase.specs.map((spec) => (
                <div
                  key={spec.label}
                  className="rounded-2xl border border-black/6 bg-white/82 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.06)] sm:rounded-[2.5rem] sm:p-6"
                >
                  <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-(--showcase-accent) sm:text-[10px]">
                    {spec.label}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold tracking-tight text-(--showcase-ink) sm:text-2xl">
                    {spec.value}
                  </h3>
                  <p className="mt-3 text-[13px] leading-relaxed text-(--showcase-muted-ink) sm:mt-4 sm:text-sm sm:leading-6">
                    {spec.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {showcase.lineup.length > 0 && (
          <section className="border-t border-black/6 py-10 lg:py-20 bg-[#fbfbfd]">
            <div className="mx-auto max-w-7xl px-6">
              <div className="mb-12 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div className="max-w-2xl text-center sm:text-left">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#86868b]">
                    More from the lineup
                  </p>
                  <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl text-[#1d1d1f]">
                    See how the rest of AVA is shaping the collection.
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
