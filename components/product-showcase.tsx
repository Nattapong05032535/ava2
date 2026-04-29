"use client";

import React, { CSSProperties, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";
import {
  ProductShowcase,
  ProductShowcaseSection,
  ProductShowcaseStat,
} from "@/types";
import { Navbar } from "@/components/navbar";
import { LineupSlider } from "@/components/lineup-slider";
import { Product3DViewer } from "@/components/product-3d-viewer";

const FIRST_DETAIL_SLIDES = [
  {
    src: "/first-detail/P89/1.jpeg",
    alt: "ภาพรายละเอียดดีไซน์ตัวเครื่อง P89",
    description:
      "ขอแนะนำดีไซน์ตัวเครื่องที่จัดวางทุกเส้นสายให้ดูลงตัวขึ้น ทั้งพื้นผิว โมดูลกล้อง และสัดส่วนที่ให้ความรู้สึกพรีเมียมตั้งแต่แรกเห็น",
  },
  {
    src: "/first-detail/P89/2.jpeg",
    alt: "ภาพชุดกล้องและพื้นผิวตัวเครื่อง P89",
    description:
      "โมดูลกล้องถูกออกแบบให้กลมกลืนกับตัวเครื่อง พร้อมเน้นรายละเอียดของวัสดุและแสงเงาให้ดูหรูอย่างเป็นธรรมชาติ",
  },
  {
    src: "/first-detail/P89/3.jpeg",
    alt: "ภาพมุมมองตัวเครื่อง P89",
    description:
      "สัดส่วนของตัวเครื่องถูกจัดให้ดูนิ่งและมั่นใจ เหมาะกับภาพลักษณ์ของสมาร์ทโฟนระดับเรือธง",
  },
  {
    src: "/first-detail/P89/4.jpeg",
    alt: "ภาพดีไซน์ด้านหลัง P89",
    description:
      "พื้นผิวด้านหลังช่วยขับคาแรกเตอร์ของรุ่นให้ชัดขึ้น โดยยังคงความเรียบและดูสะอาดตา",
  },
  {
    src: "/first-detail/P89/5.jpeg",
    alt: "ภาพรายละเอียดวัสดุ P89",
    description:
      "รายละเอียดเล็ก ๆ รอบตัวเครื่องถูกเก็บให้ดูประณีต เพื่อให้ประสบการณ์โดยรวมรู้สึกพรีเมียมมากขึ้น",
  },
];

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
  const [activeSlide, setActiveSlide] = useState(0);
  const currentSlide = FIRST_DETAIL_SLIDES[activeSlide];

  function showNextSlide() {
    setActiveSlide((current) => (current + 1) % FIRST_DETAIL_SLIDES.length);
  }

  return (
    <>
      <section
        id="overview"
        className="scroll-mt-40 overflow-hidden border-b border-white/10 bg-[#0f172a] text-white"
      >
        <div className="relative isolate px-6 pb-6 pt-8 sm:pt-10 lg:pb-2 lg:pt-16">
          <div 
            className="absolute inset-x-0 top-0 h-[500px] opacity-40 lg:h-[700px]"
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

              <div className="relative mx-auto h-72 w-full max-w-sm sm:h-88 md:h-104 lg:-mt-6 lg:h-120 lg:max-w-lg lg:-translate-y-1 lg:-translate-x-4 xl:h-128 xl:max-w-xl">
                <div
                  className="showcase-stage-glow absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl opacity-25 sm:h-80 sm:w-80 lg:h-115 lg:w-115"
                  style={{ backgroundColor: showcase.theme.accent }}
                />
                <div className="absolute inset-x-[12%] bottom-[12%] h-12 rounded-full bg-black/10 blur-3xl lg:h-16" />

                <Image
                  src={showcase.hero.heroVisual.src}
                  alt={showcase.hero.heroVisual.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 42vw, 32vw"
                  className="showcase-stage-device relative z-10 object-contain object-center transition-transform duration-1000 lg:scale-105 xl:scale-110"
                  priority
                  quality={100}
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

          <div className="mt-12 overflow-hidden rounded-[1.75rem] bg-zinc-900 sm:mt-16 sm:rounded-[2rem]">
            <div className="relative aspect-[1.35/1] sm:aspect-[16/9]">
              <Image
                key={currentSlide.src}
                src={currentSlide.src}
                alt={currentSlide.alt}
                fill
                sizes="(max-width: 768px) 100vw, 1200px"
                className="object-cover"
                quality={95}
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

          <div className="mt-7 flex justify-center">
            <div className="flex h-7 items-center gap-3 rounded-full border border-white/15 bg-black px-4">
              {FIRST_DETAIL_SLIDES.map((slide, index) => (
                <button
                  key={slide.src}
                  type="button"
                  onClick={() => setActiveSlide(index)}
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

          <p className="mx-auto mt-9 max-w-6xl text-center text-[17px] leading-8 text-white/64 sm:text-xl sm:leading-9">
            {currentSlide.description}
          </p>
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
        <header className="sticky top-[72px] z-40 hidden overflow-hidden border-b border-white/10 bg-[#050506]/88 text-white shadow-[0_18px_70px_rgba(0,0,0,0.32)] backdrop-blur-2xl lg:block">
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
              {showcase.anchors.map((anchor) => (
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

        <section id="3d-view" className="scroll-mt-40 bg-black py-16 text-white lg:py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mx-auto mb-10 max-w-3xl text-center">
              <p className="text-sm font-semibold text-[#1683ff]">
                มุมมองสามมิติ
              </p>
              <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                หมุนดูทุกมุม เหมือนถือจริง
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/58 sm:text-base sm:leading-8">
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
