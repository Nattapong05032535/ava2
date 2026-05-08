"use client";

import { useState, use } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/layout";
import { useCart } from "@/contexts/cart-context";
import { resolveProductPresentationByModelKey, type SupportedProductModelKey } from "@/constants/products";
import { SHOP_PRODUCTS_DATA } from "@/constants";

export default function ProductConfigPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { addToCart } = useCart();
  
  const productData = SHOP_PRODUCTS_DATA[id as keyof typeof SHOP_PRODUCTS_DATA];
  
  const presentation = resolveProductPresentationByModelKey(id as SupportedProductModelKey);
  const { modelName, template } = presentation;

  const [selectedColor, setSelectedColor] = useState(template.finishes[0]?.name || "Original");
  const [selectedStorage, setSelectedStorage] = useState<string>(productData?.storages[0] || "256 GB");

  if (!productData) return <div className="pt-24 text-center">สินค้าไม่พบ</div>;

  const currentPrice = productData.basePrice + (productData.priceDiffs[selectedStorage as keyof typeof productData.priceDiffs] || 0);

  const handleAddToCart = () => {
    addToCart({
      id: `${id}-${selectedColor}-${selectedStorage}`,
      productId: id,
      name: modelName,
      image: productData.image,
      color: selectedColor,
      storage: selectedStorage,
      priceValue: currentPrice,
      quantity: 1
    });
    router.push("/cart");
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="pt-24 pb-20 px-6">
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          <div className="sticky top-32 h-fit">
            <div className="relative aspect-square w-full rounded-3xl bg-[#f5f5f7] overflow-hidden flex items-center justify-center">
              <Image
                src={productData.image}
                alt={modelName}
                fill
                className="object-contain p-12"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <p className="text-[#1d1d1f] font-semibold text-sm mb-2">{template.category}</p>
            <h1 className="text-4xl md:text-5xl font-semibold mb-8">{modelName}</h1>
            
            <section className="mb-10">
              <h3 className="text-sm font-semibold mb-4 text-[#1d1d1f]">เลือกสี: <span className="text-[#6e6e73] font-normal">{selectedColor}</span></h3>
              <div className="flex gap-4">
                {template.finishes.map((finish) => (
                  <button
                    key={finish.name}
                    onClick={() => setSelectedColor(finish.name)}
                    className={`group relative flex h-10 w-10 items-center justify-center rounded-full p-0.5 transition-all
                      ${selectedColor === finish.name ? "ring-2 ring-[#0071e3] ring-offset-2" : "ring-1 ring-gray-200 hover:ring-gray-400"}
                    `}
                  >
                    <span 
                      className="h-full w-full rounded-full" 
                      style={{ backgroundColor: finish.swatch }}
                    />
                  </button>
                ))}
              </div>
            </section>

            <section className="mb-10">
              <h3 className="text-sm font-semibold mb-4 text-[#1d1d1f]">เลือกความจุ:</h3>
              <div className="grid grid-cols-1 gap-4">
                {productData.storages.map((storage) => {
                  const diff = productData.priceDiffs[storage as keyof typeof productData.priceDiffs];
                  const price = productData.basePrice + diff;
                  return (
                    <button
                      key={storage}
                      onClick={() => setSelectedStorage(storage)}
                      className={`flex items-center justify-between p-6 rounded-2xl border-2 transition-all text-left
                        ${selectedStorage === storage 
                          ? "border-[#0071e3] bg-[#f5faff] shadow-sm" 
                          : "border-gray-200 hover:border-gray-400"}
                      `}
                    >
                      <div>
                        <p className="font-semibold text-lg">{storage}</p>
                        <p className="text-sm text-[#6e6e73]">พื้นที่เก็บข้อมูลเยอะจุใจ</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-lg">฿{price.toLocaleString()}</p>
                        {diff > 0 && <p className="text-xs text-[#0071e3] font-medium">+฿{diff.toLocaleString()}</p>}
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>

            <div className="mt-8 pt-8 border-t border-gray-200">
               <div className="flex items-center justify-between mb-8">
                 <span className="text-2xl font-semibold text-[#1d1d1f]">ราคารวม</span>
                 <span className="text-3xl font-bold text-[#1d1d1f]">฿{currentPrice.toLocaleString()}</span>
               </div>
               
               <div className="grid grid-cols-1 gap-4">
                 <button
                   onClick={handleAddToCart}
                   className="w-full rounded-full bg-[#0071e3] py-5 text-lg font-semibold text-white transition-all hover:bg-[#0077ed] active:scale-[0.98]"
                 >
                   เพิ่มลงตะกร้า
                 </button>
               </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
