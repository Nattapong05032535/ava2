"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { SmartImage } from "@/components/shared";
import Link from "next/link";
import { Navbar } from "@/components/layout";
import { ShopBenefits } from "@/components/shop";
import { ShopPrivileges } from "@/components/shop";
import { Footer } from "@/components/layout";
import { Smartphone, Tablet, Headphones, Phone, Star, ChevronLeft, ChevronRight } from "lucide-react";
import {
  resolveProductPresentationByModelKey,
  MODEL_FOLDER_MAP,
  type SupportedProductModelKey,
} from "@/constants/products";
import { useAuth } from "@/contexts/auth-context";


import { CATEGORIES, type Category, type ShopMockProduct } from "@/constants";
type CartItem = {
  key: string;
  modelKey: SupportedProductModelKey;
  name: string;
  image: string;
  storage: string;
  priceLabel: string;
  priceValue: number;
  quantity: number;
};

import { SHOP_PRODUCTS } from "@/constants";

const DEFAULT_STORAGE_SELECTION = Object.fromEntries(
  SHOP_PRODUCTS.map((product) => [
    product.modelKey,
    product.storageOptions.find((option) => option.selected)?.label ||
      product.storageOptions[0]?.label ||
      "",
  ])
) as Record<SupportedProductModelKey, string>;

function formatCurrency(value: number) {
  return `฿${value.toLocaleString("th-TH")}`;
}

function ProductPurchaseCard({
  product,
}: {
  product: ShopMockProduct;
}) {
  const { modelName, template } = resolveProductPresentationByModelKey(
    product.modelKey
  );
  const detailHref = `/products/${product.modelKey}`;

  const folderName = MODEL_FOLDER_MAP[product.modelKey] || product.modelKey;

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl border border-[#e5e5e5] overflow-hidden relative p-3">
      
      {/* Badge "ใหม่" */}
      <div className="absolute top-5 left-5 z-10">
        <span className="text-[13px] font-bold text-[#1b5cff]">
          ใหม่
        </span>
      </div>

      {/* Image Container */}
      <Link href={detailHref} className="bg-white rounded-xl mt-8 p-4 mb-4 flex items-center justify-center relative min-h-[200px] cursor-pointer group">
        <div className="relative w-full h-40">
          <SmartImage
            src={`/products/${folderName}/1.webp`}
            alt={modelName}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-contain transition-transform duration-500 group-hover:scale-[1.02]"
            quality={85}
          />
        </div>
      </Link>

      {/* Product Details */}
      <div className="flex flex-col flex-grow px-2 pb-2">
        
        {/* Category Label */}
        <p className="text-[11px] font-medium tracking-[0.2em] text-[#888] mb-1 uppercase">
          {product.category === "smartphone" ? "สมาร์ทโฟน" : product.category === "tablet" ? "แท็บเล็ต" : product.category === "feature-phone" ? "โทรศัพอาม่า" : "อุปกรณ์เสริม"}
        </p>

        {/* Title */}
        <Link href={detailHref}>
          <h3 className="text-[22px] font-semibold text-[#111] leading-tight mb-2 tracking-tight">
            {modelName}
          </h3>
        </Link>
        
        {/* Subtitle */}
        <p className="text-[14px] text-[#5f6570] mb-4 line-clamp-1">
          {template.hero?.subheadline || "Intelligence in every detail."}
        </p>

        {/* Color Dots */}
        <div className="flex justify-start gap-2 mb-6">
          {template.finishes.slice(0, 4).map((finish) => (
            <span
              key={`${product.modelKey}-${finish.name}`}
              className="h-5 w-5 rounded-full border border-black/10 shadow-sm"
              style={{ backgroundColor: finish.swatch }}
            />
          ))}
        </div>

        {/* Price Section */}
        <div className="mt-auto mb-6">
          <p className="text-[14px] font-bold text-[#111] mb-0.5">
            เริ่มที่
          </p>
          <p className="text-[26px] font-bold text-[#111] tracking-tight leading-none">
            {product.basePrice}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-2">
          <Link href={`/shop/${product.modelKey}`} className="w-full bg-black text-white text-[14px] font-semibold py-2.5 rounded-full text-center hover:bg-black/80 transition-colors">
            ซื้อ
          </Link>
          <Link href={detailHref} className="w-full bg-white text-black border border-[#d2d2d7] text-[14px] font-semibold py-2.5 rounded-full text-center hover:bg-gray-50 transition-colors">
            เรียนรู้เพิ่มเติม
          </Link>
        </div>
      </div>
    </div>
  );
}



function CartSummary({
  items,
  onRemove,
  onClear,
}: {
  items: CartItem[];
  onRemove: (key: string) => void;
  onClear: () => void;
}) {
  const { isLoggedIn, currentUser, logout } = useAuth();
  const router = useRouter();


  const subtotal = items.reduce(
    (sum, item) => sum + item.priceValue * item.quantity,
    0
  );
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const shippingFee = 0;
  const total = subtotal + shippingFee;

  const handleCheckout = () => {
    if (!isLoggedIn) {
      router.push("/login?redirect=/checkout");
      return;
    }
    // TODO: Proceed to checkout
    alert("เข้าสู่ระบบเรียบร้อย กำลังไปหน้าชำระเงิน...");
  };

  return (
    <>
      <aside className="rounded-[2rem] border border-black/8 bg-[#111317] p-6 text-white shadow-[0_28px_70px_rgba(15,23,42,0.24)] lg:sticky lg:top-24">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/54">
            สรุปรายการในตะกร้า
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">
            ตะกร้าสินค้า
          </h2>
          {isLoggedIn && currentUser && (
            <div className="mt-2 text-sm text-white/70">
              <span className="font-medium text-white">{currentUser.fullName}</span> 
              <span className="ml-2 px-2 py-0.5 bg-white/10 rounded-full text-xs">
                {currentUser.roleLabel}
              </span>
              <button onClick={logout} className="ml-3 text-xs text-red-400 hover:text-red-300 underline">
                ออกจากระบบ
              </button>
            </div>
          )}
        </div>
        <span className="rounded-full border border-white/12 bg-white/8 px-3 py-1.5 text-xs font-medium text-white/72">
          Dev mode
        </span>
      </div>

      {items.length === 0 ? (
        <div className="mt-8 rounded-[1.6rem] border border-white/10 bg-white/6 p-5">
          <p className="text-base font-medium text-white">
            ยังไม่มีสินค้าที่เลือก
          </p>
          <p className="mt-3 text-sm leading-6 text-white/58">
            กดปุ่ม `เลือกแพ็กเกจ` จากการ์ดสินค้า แล้วรุ่นกับราคาจะเข้ามาอยู่ในตะกร้านี้ทันที
          </p>
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          {items.map((item) => (
            <div
              key={item.key}
              className="rounded-[1.6rem] border border-white/10 bg-white/6 p-4"
            >
              <div className="flex items-start gap-4">
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-[1.2rem] bg-white/96">
                  <SmartImage
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="80px"
                    className="object-contain p-2"
                    quality={60}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-base font-semibold leading-6 text-white">
                    {item.name}
                  </p>
                  <p className="mt-1 text-sm text-white/58">
                    ความจุ {item.storage}
                  </p>
                  <div className="mt-3 flex items-center justify-between gap-3">
                    <p className="text-lg font-semibold text-white">
                      {item.priceLabel}
                    </p>
                    <button
                      type="button"
                      onClick={() => onRemove(item.key)}
                      className="text-xs font-medium text-white/58 transition-colors hover:text-white"
                    >
                      ลบ
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 rounded-[1.6rem] border border-white/10 bg-white/6 p-5">
        <div className="flex items-center justify-between text-sm text-white/64">
          <span>จำนวนสินค้า</span>
          <span>{totalItems} รายการ</span>
        </div>
        <div className="mt-3 flex items-center justify-between text-sm text-white/64">
          <span>ค่าจัดส่ง</span>
          <span>{shippingFee === 0 ? "ฟรี" : formatCurrency(shippingFee)}</span>
        </div>
        <div className="mt-4 border-t border-white/10 pt-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-white/72">ยอดรวม</span>
            <span className="text-3xl font-semibold tracking-tight text-white">
              {formatCurrency(total)}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        <button
          type="button"
          onClick={handleCheckout}
          disabled={items.length === 0}
          className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3.5 text-sm font-semibold text-black transition-colors hover:bg-white/92 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {isLoggedIn ? "ไปหน้าชำระเงิน (Stripe Dev Mode)" : "เข้าสู่ระบบเพื่อสั่งซื้อ"}
        </button>
        <button
          type="button"
          onClick={onClear}
          disabled={items.length === 0}
          className="inline-flex items-center justify-center rounded-full border border-white/14 bg-transparent px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/8 disabled:cursor-not-allowed disabled:opacity-40"
        >
          ล้างตะกร้า
        </button>
      </div>

      <p className="mt-4 text-center text-xs leading-5 text-white/46">
        ใช้สำหรับทดสอบ flow การเลือกสินค้าและยอดรวมก่อนต่อเข้ากับ Stripe
        test mode ในขั้นถัดไป
      </p>
    </aside>
    </>
  );
}

export function ShopStorefront() {
  const [activeCategory, setActiveCategory] = useState<Category>("recommended");
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 350; // roughly one card width
      scrollRef.current.scrollBy({ left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
    }
  };

  const filteredProducts = activeCategory === "recommended"
    ? SHOP_PRODUCTS.filter((product) => product.category === "smartphone" || product.category === "tablet")
    : SHOP_PRODUCTS.filter((product) => product.category === activeCategory);

  return (
    <div className="min-h-screen bg-white pb-24">
      <Navbar />

      <main className="pt-16">
        {/* Recommended Title */}
        <div className="mx-auto max-w-7xl px-6 pb-4">
          <h1 className="text-[24px] md:text-[28px] font-bold text-black tracking-tight text-left">
            สินค้าแนะนำจาก AVA
          </h1>
        </div>

        {/* Category Tabs (Icon Boxes) */}
        <section>
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex justify-start gap-3 md:gap-4 overflow-x-auto no-scrollbar pb-6 md:pl-6 pl-2">
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`flex flex-col items-center justify-center w-[100px] h-[100px] md:w-[110px] md:h-[110px] rounded-xl transition-all ${
                      isActive
                        ? "border-2 border-black bg-white"
                        : "border border-[#e5e5e5] bg-white hover:border-black/30"
                    }`}
                  >
                    <Icon strokeWidth={isActive ? 2 : 1.5} className={`w-8 h-8 md:w-[38px] md:h-[38px] mb-3 ${isActive ? 'text-black' : 'text-[#767676]'}`} />
                    <span className={`text-[11px] md:text-xs whitespace-nowrap text-center px-1 ${isActive ? 'font-bold text-black' : 'font-medium text-[#555]'}`}>
                      {cat.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-[#f4f4f4] border-t border-[#e5e5e5] py-10 w-full rounded-t-[2rem]">
          <div className="mx-auto max-w-7xl px-6 relative">
            <div 
              ref={activeCategory === "recommended" ? scrollRef : null}
              className={
                activeCategory === "recommended"
                  ? "flex overflow-x-auto gap-4 md:gap-6 pb-6 snap-x snap-mandatory no-scrollbar"
                  : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
              }
              style={activeCategory === "recommended" ? { scrollbarWidth: 'none', msOverflowStyle: 'none' } : {}}
            >
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product, index) => (
                  <div 
                    key={`${product.modelKey}-${index}`} 
                    className={activeCategory === "recommended" ? "w-[280px] md:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] flex-shrink-0 snap-start" : ""}
                  >
                    <ProductPurchaseCard
                      product={product}
                    />
                  </div>
                ))
              ) : (
                <div className="col-span-full py-24 text-center text-[#555] bg-white rounded-3xl border border-[#e5e5e5]">
                  <p className="text-lg font-medium">ไม่มีสินค้าในตอนนี้</p>
                  <p className="text-sm mt-2 text-[#777]">โปรดติดตามสินค้าใหม่ในหมวดหมู่นี้เร็วๆ นี้</p>
                </div>
              )}
            </div>

            {/* Carousel Controls */}
            {activeCategory === "recommended" && filteredProducts.length > 0 && (
              <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-4">
                {/* Dummy progress bar */}
                <div className="w-64 h-[2px] bg-[#e5e5e5] relative rounded-full order-2 md:order-1 hidden md:block">
                  <div className="absolute left-0 top-0 h-full w-[25%] bg-black rounded-full"></div>
                </div>
                
                {/* Arrows */}
                <div className="flex gap-3 order-1 md:order-2">
                  <button onClick={() => scroll('left')} className="w-10 h-10 rounded-full border border-[#d2d2d7] bg-white flex items-center justify-center hover:bg-black/5 transition-colors">
                    <ChevronLeft className="w-5 h-5 text-black" strokeWidth={1.5} />
                  </button>
                  <button onClick={() => scroll('right')} className="w-10 h-10 rounded-full border border-[#d2d2d7] bg-white flex items-center justify-center hover:bg-black/5 transition-colors">
                    <ChevronRight className="w-5 h-5 text-black" strokeWidth={1.5} />
                  </button>
                </div>
              </div>
            )}

          </div>
        </section>

        {/* Benefits Section */}
        <ShopBenefits />
        
        {/* Privileges Section */}
        <ShopPrivileges />

      </main>
      <Footer />
    </div>
  );
}
