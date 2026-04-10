"use client";

import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { useCart } from "@/context/cart-context";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, subtotal, totalItems } = useCart();

  const vat = subtotal * 0.07;
  const grandTotal = subtotal; // Assuming subtotal already includes VAT or is the final price

  return (
    <div className="min-h-screen bg-[#fbfbfd]">
      <Navbar />
      
      <main className="pt-24 pb-20 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12">
            <h1 className="text-[32px] md:text-[40px] font-semibold tracking-tight text-[#1d1d1f]">
              ตะกร้าสินค้าของคุณมี {totalItems} รายการ
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12">
            
            {/* Left: Items List */}
            <div className="space-y-8">
              {items.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
                  <p className="text-xl text-[#6e6e73] mb-8">ยังไม่มีสินค้าในตะกร้า</p>
                  <Link 
                    href="/shop"
                    className="inline-block rounded-full bg-[#0071e3] px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0077ed]"
                  >
                    ไปที่หน้าร้าน
                  </Link>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex flex-col sm:flex-row gap-6 pb-8 border-b border-gray-200 last:border-0">
                    <div className="relative h-40 w-40 shrink-0 bg-[#f5f5f7] rounded-2xl overflow-hidden flex items-center justify-center">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-contain p-4"
                      />
                    </div>
                    
                    <div className="flex-1 flex flex-col sm:flex-row justify-between">
                      <div>
                        <h2 className="text-xl font-semibold text-[#1d1d1f] mb-1">{item.name}</h2>
                        <p className="text-[#6e6e73] text-sm mb-4">สี: {item.color} | ความจุ: {item.storage}</p>
                        
                        <div className="flex items-center gap-3">
                           <button 
                             onClick={() => updateQuantity(item.id, -1)}
                             className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 transition-colors hover:border-gray-900"
                           >
                             －
                           </button>
                           <span className="w-8 text-center font-medium">{item.quantity}</span>
                           <button 
                             onClick={() => updateQuantity(item.id, 1)}
                             className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 transition-colors hover:border-gray-900"
                           >
                             ＋
                           </button>
                        </div>
                      </div>
                      
                      <div className="mt-4 sm:mt-0 text-right flex flex-col justify-between items-end">
                        <p className="text-xl font-semibold">฿{(item.priceValue * item.quantity).toLocaleString()}</p>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-sm text-[#0071e3] font-medium hover:underline mt-2"
                        >
                          ลบออก
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Right: Order Summary Sidebar */}
            <aside className="h-fit sticky top-32">
              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-[0_4px_30px_rgba(0,0,0,0.03)]">
                <h2 className="text-2xl font-semibold mb-8 text-[#1d1d1f]">สรุปรายการสั่งซื้อ</h2>
                
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-[#1d1d1f]">
                    <span>ยอดรวมสินค้า</span>
                    <span>฿{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-[#1d1d1f]">
                    <span>ภาษีมูลค่าเพิ่ม (7%)</span>
                    <span>฿{vat.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-[#1d1d1f]">
                    <span>ค่าจัดส่ง</span>
                    <span className="text-[#0071e3] font-medium">ฟรี</span>
                  </div>
                </div>
                
                <div className="pt-6 border-t border-gray-100 flex justify-between items-end mb-8">
                  <span className="text-lg font-semibold">ยอดชำระทั้งสิ้น</span>
                  <span className="text-3xl font-bold text-[#1d1d1f]">฿{grandTotal.toLocaleString()}</span>
                </div>
                
                <button 
                  disabled={items.length === 0}
                  className="w-full rounded-full bg-[#0071e3] py-5 text-lg font-semibold text-white transition-all hover:bg-[#0077ed] disabled:opacity-50 disabled:cursor-not-allowed mb-4"
                >
                  ไปหน้าชำระเงิน
                </button>
                
                <div className="space-y-4 mt-6">
                   <p className="text-xs text-[#6e6e73] flex items-center gap-2">
                     <span className="h-4 w-4 rounded-full bg-emerald-500 flex items-center justify-center text-white text-[10px]">✓</span> 
                     จัดส่งฟรีทั่วไทย ภายใน 2-3 วันทำการ
                   </p>
                   <p className="text-xs text-[#6e6e73] flex items-center gap-2">
                     <span className="h-4 w-4 rounded-full bg-emerald-500 flex items-center justify-center text-white text-[10px]">✓</span> 
                     ผ่อนชำระ 0% นานสูงสุด 10 เดือน
                   </p>
                </div>
              </div>
            </aside>

          </div>
        </div>
      </main>
    </div>
  );
}
