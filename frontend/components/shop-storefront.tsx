"use client";

import { useState } from "react";
import Image from "next/image";
import { Navbar } from "@/components/navbar";
import {
  resolveProductPresentationByModelKey,
  type SupportedProductModelKey,
} from "@/constants/products";

type StorageOption = {
  label: string;
  selected?: boolean;
};

type ShopMockProduct = {
  modelKey: SupportedProductModelKey;
  basePrice: string;
  basePriceValue: number;
  monthlyPrice: string;
  promo: string;
  badge: string;
  image: string;
  stock: string;
  shipping: string;
  storageOptions: StorageOption[];
};

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

const SHOP_PRODUCTS: ShopMockProduct[] = [
  {
    modelKey: "promax-p89",
    basePrice: "฿24,990",
    basePriceValue: 24990,
    monthlyPrice: "฿2,290 / เดือน",
    promo: "ผ่อน 0% 10 เดือน และรับประกันตัวเครื่อง 24 เดือน",
    badge: "Flagship pick",
    image: "/phone/promax-p89.png",
    stock: "พร้อมส่งภายใน 24 ชม.",
    shipping: "ส่งฟรีทั่วประเทศ",
    storageOptions: [
      { label: "256 GB" },
      { label: "512 GB", selected: true },
      { label: "1 TB" },
    ],
  },
  {
    modelKey: "promax-p63",
    basePrice: "฿19,990",
    basePriceValue: 19990,
    monthlyPrice: "฿1,890 / เดือน",
    promo: "รับส่วนลดเปิดตัว ฿2,000 สำหรับลูกค้าที่สั่งจองล่วงหน้า",
    badge: "Luxury everyday",
    image: "/phone/promax-p63.png",
    stock: "สีฮิตใกล้หมด",
    shipping: "รับหน้าร้านได้",
    storageOptions: [
      { label: "256 GB", selected: true },
      { label: "512 GB" },
    ],
  },
  {
    modelKey: "note-p65",
    basePrice: "฿14,990",
    basePriceValue: 14990,
    monthlyPrice: "฿1,390 / เดือน",
    promo: "รวมของแถมชุดปากกาและฟิล์มกันรอยในคำสั่งซื้อ mock นี้",
    badge: "Work smart",
    image: "/phone/note-p65.png",
    stock: "พร้อมส่ง",
    shipping: "จัดส่งฟรี + COD",
    storageOptions: [
      { label: "256 GB", selected: true },
      { label: "512 GB" },
    ],
  },
  {
    modelKey: "enjoy-p65",
    basePrice: "฿9,990",
    basePriceValue: 9990,
    monthlyPrice: "฿990 / เดือน",
    promo: "โปรโมชันผ่อนสบายและเหมาะกับผู้ใช้งานทั่วไปที่อยากได้เครื่องคุ้มค่า",
    badge: "Best value",
    image: "/phone/enjoy-p65.png",
    stock: "พร้อมส่ง",
    shipping: "ส่งฟรีทั่วประเทศ",
    storageOptions: [
      { label: "128 GB", selected: true },
      { label: "256 GB" },
    ],
  },
  {
    modelKey: "tab-p68",
    basePrice: "฿18,990",
    basePriceValue: 18990,
    monthlyPrice: "฿1,790 / เดือน",
    promo: "เหมาะกับสาย productivity และครีเอเตอร์ที่ต้องการแท็บเล็ตจอใหญ่",
    badge: "Tablet choice",
    image: "/phone/tab-p68.png",
    stock: "สต็อกจำกัด",
    shipping: "รับของได้ 2 ช่องทาง",
    storageOptions: [
      { label: "256 GB", selected: true },
      { label: "512 GB" },
    ],
  },
];

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
  selectedStorage,
  onSelectStorage,
  onAddToCart,
}: {
  product: ShopMockProduct;
  selectedStorage: string;
  onSelectStorage: (modelKey: SupportedProductModelKey, storage: string) => void;
  onAddToCart: (product: ShopMockProduct) => void;
}) {
  const { modelName, template } = resolveProductPresentationByModelKey(
    product.modelKey
  );


  return (
    <article className="group flex h-full flex-col rounded-[2rem] border border-black/8 bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.05)] transition-transform duration-300 hover:-translate-y-1">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#1b5cff]">
            Mock Store
          </p>
          <p className="mt-2 text-sm font-medium text-[#656d79]">
            {product.badge}
          </p>
        </div>
        <span className="rounded-full bg-[#f4f5f7] px-3 py-1 text-[11px] font-medium text-[#4a4f57]">
          {template.category}
        </span>
      </div>

      <div className="mt-5 block">
        <div
          className="relative overflow-hidden rounded-[1.7rem]"
          style={{
            background: `radial-gradient(circle at 50% 20%, ${template.theme.accentSoft}, transparent 32%), linear-gradient(180deg, #ffffff 0%, #f3f5f8 100%)`,
          }}
        >
          <div className="relative h-64">
            <Image
              src={product.image}
              alt={modelName}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
              className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-1 flex-col">
        <h2 className="text-[2rem] font-semibold leading-[1.06] tracking-tight text-[#161616]">
          {modelName}
        </h2>
        <p className="mt-4 text-sm leading-7 text-[#5f6570]">
          {template.hero.subheadline}
        </p>

        <div className="mt-5">
          <p className="text-xs font-medium text-[#6a7280]">
            {template.finishes[0]?.name || "Color option"}
          </p>
          <div className="mt-3 flex gap-2">
            {template.finishes.slice(0, 4).map((finish) => (
              <span
                key={`${product.modelKey}-${finish.name}`}
                className="h-5 w-5 rounded-full border border-black/12 ring-2 ring-white"
                style={{ backgroundColor: finish.swatch }}
              />
            ))}
          </div>
        </div>

        <div className="mt-5">
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-[#6a7280]">
            ความจุ
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {product.storageOptions.map((storage) => (
              <button
                key={`${product.modelKey}-${storage.label}`}
                type="button"
                onClick={() => onSelectStorage(product.modelKey, storage.label)}
                className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                  selectedStorage === storage.label
                    ? "border-black bg-white text-black"
                    : "border-transparent bg-[#eef1f5] text-[#59606a] hover:bg-[#e5e9ef]"
                }`}
              >
                {storage.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 rounded-[1.4rem] border border-black/6 bg-[#f7f8fa] p-4">
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-[#6a7280]">
            ราคาเริ่มต้น
          </p>
          <p className="mt-2 text-3xl font-semibold tracking-tight text-[#121212]">
            {product.basePrice}
          </p>
          <p className="mt-2 text-sm font-medium text-[#21262f]">
            {product.monthlyPrice}
          </p>
          <p className="mt-3 text-sm leading-6 text-[#5f6570]">
            {product.promo}
          </p>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700">
            {product.stock}
          </span>
          <span className="rounded-full border border-sky-200 bg-sky-50 px-3 py-1.5 text-xs font-medium text-sky-700">
            {product.shipping}
          </span>
        </div>

        <div className="mt-auto pt-6 flex flex-col gap-3">
          <button
            type="button"
            onClick={() => onAddToCart(product)}
            className="inline-flex items-center justify-center rounded-full bg-black px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#1a1a1a]"
          >
            เลือกแพ็กเกจ
          </button>
        </div>
      </div>
    </article>
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
  const subtotal = items.reduce(
    (sum, item) => sum + item.priceValue * item.quantity,
    0
  );
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const shippingFee = 0;
  const total = subtotal + shippingFee;

  return (
    <aside className="rounded-[2rem] border border-black/8 bg-[#111317] p-6 text-white shadow-[0_28px_70px_rgba(15,23,42,0.24)] lg:sticky lg:top-24">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/54">
            Cart summary
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">
            ตะกร้าสินค้า
          </h2>
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
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="80px"
                    className="object-contain p-2"
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
          disabled={items.length === 0}
          className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3.5 text-sm font-semibold text-black transition-colors hover:bg-white/92 disabled:cursor-not-allowed disabled:opacity-40"
        >
          ไปหน้าชำระเงิน (Stripe Dev Mode)
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
  );
}

export function ShopStorefront() {
  const [storageSelections, setStorageSelections] = useState(
    DEFAULT_STORAGE_SELECTION
  );
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  function handleSelectStorage(
    modelKey: SupportedProductModelKey,
    storage: string
  ) {
    setStorageSelections((current) => ({
      ...current,
      [modelKey]: storage,
    }));
  }

  function handleAddToCart(product: ShopMockProduct) {
    const { modelName } = resolveProductPresentationByModelKey(product.modelKey);
    const selectedStorage = storageSelections[product.modelKey];
    const cartKey = `${product.modelKey}-${selectedStorage}`;

    setCartItems((current) => {
      const existing = current.find((item) => item.key === cartKey);

      if (existing) {
        return current.map((item) =>
          item.key === cartKey
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [
        ...current,
        {
          key: cartKey,
          modelKey: product.modelKey,
          name: modelName,
          image: product.image,
          storage: selectedStorage,
          priceLabel: product.basePrice,
          priceValue: product.basePriceValue,
          quantity: 1,
        },
      ];
    });
  }

  function handleRemoveItem(key: string) {
    setCartItems((current) => current.filter((item) => item.key !== key));
  }

  function handleClearCart() {
    setCartItems([]);
  }

  return (
    <div className="min-h-screen bg-[#f6f7f9]">
      <Navbar />

      <main className="pt-18">
        <section className="border-b border-black/6 bg-white">
          <div className="mx-auto max-w-7xl px-6 py-14 lg:py-18">
            <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-[#1b5cff]">
                  Mock storefront
                </p>
                <h1 className="mt-5 text-4xl font-semibold tracking-tight text-[#151515] sm:text-5xl lg:text-6xl">
                  เลือกซื้อสินค้า AVA
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-8 text-[#5f6570] sm:text-lg">
                  หน้านี้เป็นต้นแบบสำหรับ flow การเลือกซื้อสินค้าแบบ dev
                  mode กดเลือกแพ็กเกจแล้วสินค้าและราคาจะเข้าไปอยู่ในตะกร้าทันที
                  เพื่อให้คุณต่อยอด payment กับ Stripe ได้สะดวกขึ้น
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <span className="rounded-full bg-[#f4f5f7] px-4 py-2 text-sm font-medium text-[#505662]">
                    ราคา mock
                  </span>
                  <span className="rounded-full bg-[#f4f5f7] px-4 py-2 text-sm font-medium text-[#505662]">
                    ตะกร้า mock
                  </span>
                  <span className="rounded-full bg-[#f4f5f7] px-4 py-2 text-sm font-medium text-[#505662]">
                    Stripe dev mode
                  </span>
                </div>
              </div>

              <div className="rounded-[2.2rem] border border-black/6 bg-[linear-gradient(180deg,#ffffff_0%,#f2f5f8_100%)] p-6 shadow-[0_20px_60px_rgba(15,23,42,0.04)]">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[1.5rem] border border-black/6 bg-white p-5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#1b5cff]">
                      Stripe
                    </p>
                    <p className="mt-3 text-xl font-semibold text-[#161616]">
                      เตรียมต่อยอดไป Stripe checkout ได้เลย
                    </p>
                    <p className="mt-3 text-sm leading-6 text-[#5f6570]">
                      ตอนนี้ยังไม่ชาร์จเงินจริง เป็นแค่หน้าทดสอบ flow
                      สำหรับการออกแบบและต่อยอด Stripe ในสภาพแวดล้อม dev
                      mode ภายหลัง
                    </p>
                  </div>
                  <div className="rounded-[1.5rem] border border-black/6 bg-white p-5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#1b5cff]">
                      Cart
                    </p>
                    <p className="mt-3 text-xl font-semibold text-[#161616]">
                      เลือกสินค้าแล้วเห็นยอดรวมทันที
                    </p>
                    <p className="mt-3 text-sm leading-6 text-[#5f6570]">
                      ช่วยให้คุณออกแบบลำดับการซื้อก่อนต่อระบบ checkout จริงได้ง่ายขึ้น
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-12 sm:py-16">
          <div className="grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
            <div>
              <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-[#6a7280]">
                    Select your device
                  </p>
                  <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#151515] sm:text-4xl">
                    เลือกรุ่นที่พร้อมใส่ตะกร้า
                  </h2>
                </div>
                <p className="text-sm text-[#5f6570]">
                  ทั้งหมด {SHOP_PRODUCTS.length} รุ่น
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {SHOP_PRODUCTS.map((product) => (
                  <ProductPurchaseCard
                    key={product.modelKey}
                    product={product}
                    selectedStorage={storageSelections[product.modelKey]}
                    onSelectStorage={handleSelectStorage}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            </div>

            <CartSummary
              items={cartItems}
              onRemove={handleRemoveItem}
              onClear={handleClearCart}
            />
          </div>
        </section>
      </main>
    </div>
  );
}
