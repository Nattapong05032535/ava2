"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout";
import { useCart } from "@/contexts/cart-context";
import { CheckCircle2, Package, Truck, ArrowLeft } from "lucide-react";

interface CustomerData {
  name: string;
  phone: string;
  address: string;
  note?: string;
}

interface CartItem {
  id: string;
  productId: string;
  name: string;
  image: string;
  color: string;
  storage: string;
  priceValue: number;
  quantity: number;
}

interface OrderInfo {
  orderId: string;
  trackingNo: string;
  date: string;
  items: CartItem[];
  total: number;
  customer: CustomerData;
}

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const [step, setStep] = useState<"form" | "success">("form");
  const [formData, setFormData] = useState<CustomerData>({
    name: "",
    phone: "",
    address: "",
    note: ""
  });
  const [orderDetails, setOrderDetails] = useState<OrderInfo | null>(null);

  // Generate mock order details when moving to success
  const handleConfirmOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    const mockOrder: OrderInfo = {
      orderId: `AVA-${Math.floor(100000 + Math.random() * 900000)}`,
      trackingNo: `TH${Math.floor(1000000000 + Math.random() * 9000000000)}AVA`,
      date: new Date().toLocaleDateString("th-TH", {
        year: "numeric",
        month: "long",
        day: "numeric"
      }),
      items: [...items],
      total: subtotal,
      customer: formData
    };

    setOrderDetails(mockOrder);
    setStep("success");
    clearCart(); // Empty the cart after successful order
    window.scrollTo(0, 0);
  };

  if (step === "success" && orderDetails) {
    return (
      <div className="min-h-screen bg-[#f5f5f7]">
        <Navbar />
        <main className="pt-24 pb-12 px-6">
          <div className="mx-auto max-w-2xl lg:max-w-4xl transition-all duration-500">
            <div className="bg-white rounded-[2rem] lg:rounded-[3rem] p-6 md:p-10 lg:p-16 shadow-[0_20px_60px_rgba(0,0,0,0.05)] text-center">
              <div className="flex justify-center mb-6">
                <div className="h-16 w-16 lg:h-20 lg:w-20 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500 animate-in zoom-in duration-500">
                  <CheckCircle2 size={40} className="lg:scale-125" strokeWidth={2} />
                </div>
              </div>
              
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1d1d1f] mb-3">ขอบคุณสำหรับการสั่งซื้อ!</h1>
              <p className="text-[#6e6e73] mb-8 lg:mb-12 text-sm lg:text-base">คำสั่งซื้อของคุณได้รับการยืนยันและกำลังจัดเตรียม</p>
              
              <div className="grid grid-cols-2 gap-4 mb-8 lg:mb-12 font-mono">
                <div className="bg-[#fbfbfd] p-5 lg:p-8 rounded-2xl border border-gray-100 text-left">
                  <p className="text-[10px] lg:text-xs font-semibold text-[#6e6e73] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Package size={14} /> หมายเลขคำสั่งซื้อ
                  </p>
                  <p className="text-lg lg:text-2xl font-bold text-[#1d1d1f]">{orderDetails.orderId}</p>
                </div>
                <div className="bg-[#fbfbfd] p-5 lg:p-8 rounded-2xl border border-gray-100 text-left">
                  <p className="text-[10px] lg:text-xs font-semibold text-[#6e6e73] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Truck size={14} /> เลขพัสดุ (จำลอง)
                  </p>
                  <p className="text-lg lg:text-2xl font-bold text-[#0071e3]">{orderDetails.trackingNo}</p>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-8 lg:pt-12 mb-8 lg:mb-12 text-left">
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
                    <div>
                      <h3 className="font-bold text-[#1d1d1f] mb-5 text-base lg:text-lg">จัดส่งไปยัง</h3>
                      <div className="space-y-2 text-[#6e6e73] text-sm lg:text-base">
                         <p><span className="font-semibold text-[#1d1d1f] text-lg">{orderDetails.customer.name}</span></p>
                         <p className="flex items-center gap-2">เบอร์โทร: {orderDetails.customer.phone}</p>
                         <p className="leading-relaxed">{orderDetails.customer.address}</p>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-[#1d1d1f] mb-5 text-base lg:text-lg">สรุปสินค้า</h3>
                      <div className="space-y-3 max-h-[160px] overflow-y-auto pr-2 no-scrollbar">
                        {orderDetails.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between items-center text-sm lg:text-[15px]">
                            <span className="truncate text-[#6e6e73] pr-4">{item.name} <span className="ml-1 text-[#a1a1a6]">x{item.quantity}</span></span>
                            <span className="font-semibold text-[#1d1d1f]">฿{(item.priceValue * item.quantity).toLocaleString()}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-5 pt-5 border-t border-gray-100 flex justify-between font-extrabold text-[#1d1d1f] text-lg lg:text-xl">
                         <span>ยอดรวมสุทธิ</span>
                         <span>฿{orderDetails.total.toLocaleString()}</span>
                      </div>
                    </div>
                 </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4">
                <Link 
                  href="/"
                  className="flex-[2] rounded-full bg-black px-10 py-4 lg:py-5 text-sm lg:text-base font-semibold text-white transition-all hover:bg-gray-800 hover:scale-[1.02] active:scale-95 text-center"
                >
                  กลับสู่หน้าหลัก
                </Link>
                <button
                  onClick={() => window.print()}
                  className="flex-1 rounded-full border border-gray-300 bg-white px-10 py-4 lg:py-5 text-sm lg:text-base font-semibold text-gray-700 transition-all hover:bg-gray-50 active:scale-95"
                >
                  พิมพ์ใบสั่งซื้อ
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fbfbfd]">
      <Navbar />
      <main className="pt-32 pb-20 px-6">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 flex items-center gap-4">
             <Link href="/cart" className="h-10 w-10 flex items-center justify-center rounded-full bg-white border border-gray-200 text-[#1d1d1f] hover:bg-gray-50 transition-colors">
                <ArrowLeft size={18} />
             </Link>
             <h1 className="text-3xl font-bold tracking-tight text-[#1d1d1f]">ข้อมูลการจัดส่ง</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12">
            <div>
              <form onSubmit={handleConfirmOrder} className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-[#1d1d1f] mb-2">ชื่อ-นามสกุล</label>
                    <input 
                      type="text" 
                      required
                      placeholder="เช่น สมชาย ใจดี"
                      className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-[#0071e3] focus:ring-1 focus:ring-[#0071e3] outline-none transition-all placeholder:text-[#a1a1a6]"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#1d1d1f] mb-2">เบอร์โทรศัพท์</label>
                    <input 
                      type="tel" 
                      required
                      placeholder="เช่น 081-234-5678"
                      className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-[#0071e3] focus:ring-1 focus:ring-[#0071e3] outline-none transition-all placeholder:text-[#a1a1a6]"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#1d1d1f] mb-2">ที่อยู่จัดส่ง</label>
                    <textarea 
                      required
                      rows={4}
                      placeholder="บ้านเลขที่, ถนน, แขวง/ตำบล, เขต/อำเภอ, จังหวัด, รหัสไปรษณีย์"
                      className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-[#0071e3] focus:ring-1 focus:ring-[#0071e3] outline-none transition-all placeholder:text-[#a1a1a6]"
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#1d1d1f] mb-2">หมายเหตุ (ถ้ามี)</label>
                    <input 
                      type="text" 
                      placeholder="เช่น บันทึกเพิ่มเติมสำหรับพนักงานจัดส่ง"
                      className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-[#0071e3] focus:ring-1 focus:ring-[#0071e3] outline-none transition-all placeholder:text-[#a1a1a6]"
                      value={formData.note}
                      onChange={(e) => setFormData({...formData, note: e.target.value})}
                    />
                  </div>
                </div>

                <div className="mt-10 p-6 bg-[#f5f5f7] rounded-[1.5rem] border border-gray-100">
                  <p className="text-sm text-[#6e6e73] leading-6">
                    การยืนยันการสั่งซื้อถือว่าคุณยอมรับเงื่อนไขการให้บริการของ AVA 
                    ข้อมูลของคุณจะได้รับการประมวลผลตามนโยบายความเป็นส่วนตัวของเรา
                  </p>
                </div>
                
                <button 
                  type="submit"
                  className="mt-8 w-full rounded-full bg-[#0071e3] py-5 text-lg font-semibold text-white transition-all hover:bg-[#0077ed] active:scale-[0.98]"
                >
                  ยืนยันและชำระเงิน
                </button>
              </form>
            </div>

            <aside>
              <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm sticky top-32">
                <h2 className="text-xl font-bold mb-8 text-[#1d1d1f]">สรุปที่สั่งซื้อ</h2>
                <div className="space-y-4 mb-8 max-h-[400px] overflow-y-auto no-scrollbar">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4 items-center">
                      <div className="h-16 w-16 bg-[#f5f5f7] rounded-xl overflow-hidden shrink-0 flex items-center justify-center">
                         <Image src={item.image} alt={item.name} width={40} height={40} className="object-contain" />
                      </div>
                      <div className="flex-1 min-w-0">
                         <p className="text-sm font-semibold text-[#1d1d1f] truncate">{item.name}</p>
                         <p className="text-xs text-[#6e6e73]">{item.storage} x {item.quantity}</p>
                      </div>
                      <p className="text-sm font-semibold">฿{(item.priceValue * item.quantity).toLocaleString()}</p>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-100 pt-6 space-y-3">
                   <div className="flex justify-between text-[#6e6e73] text-sm">
                      <span>ยอดรวม</span>
                      <span>฿{subtotal.toLocaleString()}</span>
                   </div>
                   <div className="flex justify-between text-[#6e6e73] text-sm">
                      <span>ค่าส่ง</span>
                      <span>ฟรี</span>
                   </div>
                   <div className="flex justify-between text-lg font-bold text-[#1d1d1f] pt-2">
                      <span>ยอดชำระ</span>
                      <span>฿{subtotal.toLocaleString()}</span>
                   </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}
