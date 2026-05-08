import { SmartImage } from "@/components/shared";
import Link from "next/link";
import {
  resolveProductPresentationByModelKey,
  type SupportedProductModelKey,
} from "@/constants/products";

interface ProductCardProps {
  modelKey: SupportedProductModelKey;
}

const PRICE_BY_MODEL: Record<string, string> = {
  "promax-p89": "฿24,990",
  "promax-p63": "฿19,990",
  "note-p65": "฿14,990",
  "enjoy-p65": "฿9,990",
  "tab-p68": "฿18,990",
  default: "฿XX,XXX",
};

export function ProductCard({ modelKey }: ProductCardProps) {
  const { modelName, template: presentation } =
    resolveProductPresentationByModelKey(modelKey);
  const imageUrl = presentation.art.detail || presentation.art.fallbackProduct;
  const detailHref = `/products/${modelKey}`;
  const buyHref = `/shop/${modelKey}`;
  const description = presentation.hero.subheadline;
  const price = PRICE_BY_MODEL[modelKey] || PRICE_BY_MODEL.default;
  const swatches = presentation.finishes.slice(0, 4);

  return (
    <article
      id={`product-card-${modelKey}`}
      className="group flex h-full flex-col rounded-[2rem] border border-black/8 bg-[#f6f7f9] p-5 shadow-[0_20px_55px_rgba(15,23,42,0.05)] transition-transform duration-300 hover:-translate-y-1"
    >
      <p className="text-[11px] font-semibold tracking-tight text-[#1b5cff]">
        ใหม่
      </p>

      <Link
        href={detailHref}
        prefetch
        className="mt-4 block"
      >
        <div
          className="relative overflow-hidden rounded-[1.8rem]"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.96), rgba(241,244,248,0.92))",
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle at center, ${presentation.theme.accent}20, transparent 46%)`,
            }}
          />
          <div className="relative h-56 sm:h-64">
            <SmartImage
              src={imageUrl}
              alt={modelName}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
              className="object-contain p-4 transition-transform duration-500 group-hover:scale-105 sm:p-5"
              quality={80}
            />
          </div>
        </div>
      </Link>

      <div className="mt-6 flex flex-1 flex-col">
        <p className="text-[11px] font-medium uppercase tracking-[0.34em] text-[#6a7280]">
          {presentation.category}
        </p>

        <Link href={detailHref} prefetch>
          <h3 className="mt-3 min-h-24 text-[2rem] font-semibold leading-[1.08] tracking-tight text-[#161616]">
            {modelName}
          </h3>
        </Link>

        <p className="mt-4 min-h-[5.5rem] text-sm leading-7 text-[#5f6570]">
          {description}
        </p>

        <div className="mt-5 flex gap-2">
          {swatches.map((finish) => (
            <span
              key={`${modelKey}-${finish.name}`}
              className="h-5 w-5 rounded-full border border-black/12 ring-2 ring-white"
              style={{ backgroundColor: finish.swatch }}
            />
          ))}
        </div>

        <div className="mt-auto pt-7">
          <p className="text-base font-semibold text-[#121212]">เริ่มที่</p>
          <p className="mt-1 text-3xl font-semibold tracking-tight text-[#121212]">
            {price}
          </p>

          <div className="mt-7 flex flex-col gap-3">
            <Link
              href={buyHref}
              className="inline-flex items-center justify-center rounded-full bg-black px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#1a1a1a]"
            >
              ซื้อ
            </Link>
            <Link
              href={detailHref}
              className="inline-flex items-center justify-center rounded-full border border-black/12 bg-white px-5 py-3.5 text-sm font-semibold text-black transition-colors hover:bg-[#f3f4f6]"
            >
              ดูรายละเอียด
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
