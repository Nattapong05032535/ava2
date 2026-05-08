import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout";
import { LineupSlider } from "@/components/products";

const AVA_LINEUP = [
  {
    id: "promax-p89",
    name: "AVA Life Pro Max P89",
    shortName: "Pro Max P89",
    tagline: "Intelligence in every detail.",
    image: "/products/smart_phone/P89.webp",
    price: "เริ่มที่ ฿24,990",
    colors: ["bg-black", "bg-gray-400", "bg-orange-400", "bg-blue-900"],
  },
  {
    id: "promax-p63",
    name: "AVA Life Pro Max P63",
    shortName: "Pro Max P63",
    tagline: "Streamlined luxury. Pro all day.",
    image: "/products/smart_phone/P63.webp",
    price: "เริ่มที่ ฿19,990",
    colors: ["bg-slate-800", "bg-slate-300", "bg-blue-200"],
  },
  {
    id: "note-p65",
    name: "AVA Life Note cold P65",
    shortName: "Note Cold P65",
    tagline: "Note everything. Anywhere.",
    image: "/products/smart_phone/P65C.webp",
    price: "เริ่มที่ ฿14,990",
    colors: ["bg-black", "bg-gray-300"],
  },
  {
    id: "enjoy-p65",
    name: "AVA Enjoy Series Pro P65",
    shortName: "Series Pro P65",
    tagline: "More fun. More power.",
    image: "/products/smart_phone/P65P.webp",
    price: "เริ่มที่ ฿9,990",
    colors: ["bg-black", "bg-blue-100"],
  },
  {
    id: "tab-p68",
    name: "AVA Life Tab Ultra P68",
    shortName: "Tab Ultra P68",
    tagline: "Pro creativity. Ultra portable.",
    image: "/products/tab_let/P68.webp",
    price: "เริ่มที่ ฿18,990",
    colors: ["bg-gray-700", "bg-blue-200", "bg-stone-200"],
  },
];

export default function Home() {
  const heroProduct = AVA_LINEUP[0];

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans selection:bg-blue-100">
      <Navbar />

      <main className="flex-grow pt-14">
        {/* APPLE-STYLE SUB-MENU (SECONDARY NAV) */}
        <div className="z-40 hidden w-full overflow-x-auto border-b border-gray-200 bg-white/90 backdrop-blur-xl no-scrollbar md:block">
          <div className="mx-auto flex max-w-7xl gap-4 px-6 py-4 min-w-max lg:min-w-0">
            {AVA_LINEUP.map((item) => (
              <Link
                key={item.id}
                href={`/products/${item.id}`}
                prefetch
                className="group flex min-w-[220px] items-center justify-between gap-4 rounded-[1.35rem] border border-black/10 bg-[#f8f8f9] px-4 py-4 shadow-[0_10px_24px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:border-black/18 hover:bg-white lg:min-w-0 lg:flex-1"
              >
                <div className="min-w-0">
                  <p className="text-base font-semibold tracking-tight text-gray-900">
                    {item.shortName}
                  </p>
                  <p className="mt-2 text-xs leading-5 text-gray-500">
                    {item.tagline}
                  </p>
                </div>

                <div className="relative h-16 w-16 shrink-0 overflow-hidden transition-transform duration-300 group-hover:scale-105">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="64px"
                    className="object-contain"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* HERO SECTION */}
        <section className="overflow-hidden bg-white py-14 lg:py-20">
          <div className="mx-auto grid max-w-7xl items-center gap-8 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
            <Link
              href="/products/promax-p89"
              prefetch
              className="relative order-2 block h-[360px] bg-white sm:h-[460px] lg:order-1 lg:h-[620px]"
            >
              <Image
                src="/images/products/promax-p89.png"
                alt={heroProduct.name}
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                loading="eager"
                className="animate-in fade-in zoom-in duration-1000 delay-200 object-contain object-center lg:scale-[1.08]"
              />
            </Link>

            <div className="relative order-1 text-center text-[#111111] lg:order-2 lg:text-left">
              <p className="animate-in fade-in slide-in-from-bottom-5 text-sm font-semibold tracking-[0.18em] text-[#6b6f76] duration-700">
                ขอแนะนำผลิตภัณฑ์ใหม่
              </p>
              <h1 className="animate-in fade-in slide-in-from-bottom-6 mt-5 text-4xl font-semibold tracking-tight duration-700 delay-75 sm:text-5xl lg:text-6xl">
                {heroProduct.name}
              </h1>
              <p className="animate-in fade-in slide-in-from-bottom-7 mt-4 text-xl font-medium text-[#2b2f38] duration-700 delay-150 sm:text-2xl">
                {heroProduct.tagline}
              </p>
              <p className="animate-in fade-in slide-in-from-bottom-8 mt-5 max-w-xl text-sm leading-7 text-[#666b74] duration-700 delay-200 sm:text-base">
                โชว์เคสรุ่น flagship ของ AVA ในภาพเปิดตัวใหม่ เน้นตัวเครื่องเด่นชัด
                บนพื้นหลังสะอาด เพื่อให้รายละเอียดของสีและงานออกแบบดูชัดขึ้น
              </p>

              <div className="animate-in fade-in slide-in-from-bottom-8 mt-8 flex flex-wrap justify-center gap-3 duration-700 delay-300 lg:justify-start">
                <Link
                  href="/shop/promax-p89"
                  prefetch
                  className="rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1a1a1a]"
                >
                  ซื้อ
                </Link>
                <Link
                  href="/products/promax-p89"
                  prefetch
                  className="rounded-full border border-black/12 bg-white px-6 py-3 text-sm font-semibold text-[#111111] transition-colors hover:bg-[#f3f4f6]"
                >
                  ดูรายละเอียด
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* LINEUP EXPLORATION */}
        <section className="bg-[#f8f9fb] py-24">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="text-3xl lg:text-5xl font-bold text-center mb-16 tracking-tight">
              เลือกชมกลุ่มผลิตภัณฑ์ของเรา
            </h2>

            <LineupSlider products={AVA_LINEUP} />
          </div>
        </section>

        {/* WHY AVA - FEATURE STRIPS */}
        <section className="bg-[#f5f5f7] py-24">
           <div className="mx-auto max-w-5xl px-6">
              <h2 className="text-3xl lg:text-5xl font-bold mb-16 tracking-tight">ทำไม AVA ถึงพิเศษเหนือใคร</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="bg-white p-10 rounded-3xl h-[400px] flex flex-col justify-between group overflow-hidden relative border border-black/5 shadow-sm">
                    <div className="relative z-10">
                       <h3 className="text-2xl font-bold mb-4 text-[#111111]">อัจฉริยะในทุกอณู</h3>
                       <p className="text-gray-500 leading-relaxed">ชิปอันทรงพลังที่ออกแบบมาเพื่อประสิทธิภาพสูงสุดและการจัดการพลังงานที่ยอดเยี่ยมในทุกๆ งานของคุณ</p>
                    </div>
                    <div className="relative h-48 w-full group-hover:scale-110 transition-transform duration-700">
                       <Image
                         src="/images/products/note-p65.png"
                         alt="Chips"
                         fill
                         sizes="(max-width: 768px) 100vw, 50vw"
                         className="object-contain object-bottom"
                       />
                    </div>
                 </div>
                 <div className="bg-white p-10 rounded-3xl h-[400px] flex flex-col justify-between group overflow-hidden relative border border-black/5 shadow-sm">
                    <div className="relative z-10">
                       <h3 className="text-2xl font-bold mb-4 text-[#111111]">กล้องถ่ายรูปสเปกโปร</h3>
                       <p className="text-gray-500 leading-relaxed">บันทึกโลกของคุณด้วยรายละเอียดที่น่าทึ่งผ่านเทคโนโลยีเซ็นเซอร์ที่ทันสมัยและระบบประมวลผลภาพขั้นสูง</p>
                    </div>
                    <div className="relative h-48 w-full group-hover:scale-105 transition-transform duration-700 translate-y-8">
                       <Image
                         src="/images/products/promax-p89.png"
                         alt="Camera"
                         fill
                         sizes="(max-width: 768px) 100vw, 50vw"
                         className="object-contain object-bottom"
                       />
                    </div>
                 </div>
              </div>
           </div>
        </section>
      </main>

      {/* APPLE STYLE MINIMAL FOOTER */}
      <footer className="bg-[#f5f5f7] pb-20 pt-10 px-6">
        <div className="mx-auto max-w-5xl border-t border-gray-300 pt-8 text-[11px] text-gray-500 leading-relaxed font-normal">
          <p className="mb-4">1. การวางจำหน่ายและรุ่นของ AVA Mobile อาจแตกต่างกันไปในแต่ละประเทศ โปรดตรวจสอบข้อมูลล่าสุดก่อนการสั่งซื้อ</p>
          <p className="mb-8">2. ระบบ AVA Intelligence จะพร้อมใช้งานในการอัปเดตเวอร์ชันซอฟต์แวร์ครั้งถัดไปในปี 2026</p>
          
          <div className="flex flex-wrap gap-x-8 gap-y-4 pt-4 border-t border-gray-300">
             <p>Copyright © 2026 AVA Mobile Official. All rights reserved.</p>
             <div className="flex gap-4">
                <Link href="#" className="hover:underline">นโยบายความเป็นส่วนตัว</Link>
                <Link href="#" className="hover:underline">เงื่อนไขการใช้งาน</Link>
                <Link href="#" className="hover:underline">ข้อมูลทางกฎหมาย</Link>
                <Link href="#" className="hover:underline">แผนผังเว็บไซต์</Link>
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
