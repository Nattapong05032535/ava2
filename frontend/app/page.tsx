import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/navbar";

const AVA_LINEUP = [
  {
    id: "promax-p89",
    name: "AVA Life Pro Max P89",
    shortName: "Pro Max P89",
    tagline: "Intelligence in every detail.",
    image: "/images/products/promax-p89.png",
    price: "เริ่มที่ ฿XX,XXX",
    colors: ["bg-black", "bg-gray-400", "bg-orange-400", "bg-blue-900"],
  },
  {
    id: "promax-p63",
    name: "AVA Life Pro Max P63",
    shortName: "Pro Max P63",
    tagline: "Streamlined luxury. Pro all day.",
    image: "/images/products/promax-p63.png",
    price: "เริ่มที่ ฿XX,XXX",
    colors: ["bg-slate-800", "bg-slate-300", "bg-blue-200"],
  },
  {
    id: "note-p65",
    name: "AVA Life Note cold P65",
    shortName: "Note Cold P65",
    tagline: "Note everything. Anywhere.",
    image: "/images/products/note-p65.png",
    price: "เริ่มที่ ฿XX,XXX",
    colors: ["bg-black", "bg-gray-300"],
  },
  {
    id: "enjoy-p65",
    name: "AVA Enjoy Series Pro P65",
    shortName: "Series Pro P65",
    tagline: "More fun. More power.",
    image: "/images/products/enjoy-p65.png",
    price: "เริ่มที่ ฿X,XXX",
    colors: ["bg-black", "bg-blue-100"],
  },
  {
    id: "tab-p68",
    name: "AVA Life Tab Ultra P68",
    shortName: "Tab Ultra P68",
    tagline: "Pro creativity. Ultra portable.",
    image: "/images/products/tab-p68.png",
    price: "เริ่มที่ ฿XX,XXX",
    colors: ["bg-gray-700", "bg-blue-200", "bg-stone-200"],
  },
];

export default function Home() {
  const heroProduct = AVA_LINEUP[0];

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans selection:bg-blue-100">
      <Navbar />

      <main className="flex-grow pt-[64px]">
        {/* APPLE-STYLE SUB-MENU (SECONDARY NAV) */}
        <div className="sticky top-0 z-40 w-full overflow-x-auto border-b border-gray-200 bg-white/90 backdrop-blur-xl no-scrollbar">
          <div className="mx-auto flex max-w-7xl gap-4 px-6 py-4 min-w-max lg:min-w-0">
            {AVA_LINEUP.map((item) => (
              <div
                key={item.id}
                className="group flex min-w-[220px] items-center justify-between gap-4 rounded-[1.35rem] border border-black/10 bg-[#f8f8f9] px-4 py-4 shadow-[0_10px_24px_rgba(15,23,42,0.04)] transition-all duration-300 hover:border-black/18 hover:bg-white lg:min-w-0 lg:flex-1"
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
              </div>
            ))}
          </div>
        </div>

        {/* HERO SECTION */}
        <section className="overflow-hidden bg-white py-14 lg:py-20">
          <div className="mx-auto grid max-w-7xl items-center gap-8 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
            <div
              className="relative order-2 block h-[360px] bg-white sm:h-[460px] lg:order-1 lg:h-[620px]"
            >
              <Image
                src="/images/products/promax-p893.png.png"
                alt={heroProduct.name}
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                loading="eager"
                className="animate-in fade-in zoom-in duration-1000 delay-200 object-contain object-center lg:scale-[1.08]"
              />
            </div>

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
                  className="rounded-full bg-black px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1a1a1a]"
                >
                  เลือกซื้อ
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* LINEUP EXPLORATION */}
        <section className="bg-[#f8f9fb] py-24">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="text-3xl lg:text-5xl font-bold text-center mb-20 tracking-tight">
              Explore the lineup.
            </h2>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {AVA_LINEUP.map((item) => (
                <article
                  key={item.id}
                  className="group flex h-full flex-col rounded-[2rem] border border-black/8 bg-[#f6f7f9] p-4 shadow-[0_20px_55px_rgba(15,23,42,0.05)] transition-transform duration-300 hover:-translate-y-1"
                >
                  <p className="text-[11px] font-semibold tracking-tight text-[#1b5cff]">
                    ใหม่
                  </p>

                  <div
                    className="mt-3 block"
                  >
                    <div className="relative overflow-hidden rounded-[1.8rem] bg-white">
                      <div className="relative h-52 sm:h-60">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 20vw"
                        className="object-contain p-2 transition-transform duration-500 group-hover:scale-105 sm:p-3"
                      />
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-1 flex-col">
                    <p className="text-[11px] font-medium uppercase tracking-[0.34em] text-[#6a7280]">
                      สมาร์ทโฟน
                    </p>

                    <h3 className="mt-2 text-[1.85rem] font-semibold leading-[1.08] tracking-tight text-[#161616]">
                      {item.name}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-[#5f6570]">
                      {item.tagline}
                    </p>

                    <div className="mt-4 flex gap-2">
                      {item.colors.map((color, i) => (
                        <div
                          key={i}
                          className={`h-5 w-5 rounded-full border border-black/12 ring-2 ring-white ${color}`}
                        />
                      ))}
                    </div>

                    <div className="mt-auto pt-5">
                      <p className="text-base font-semibold text-[#121212]">เริ่มที่</p>
                      <p className="mt-1 text-3xl font-semibold tracking-tight text-[#121212]">
                        {item.price.replace("เริ่มที่ ", "")}
                      </p>

                      <div className="mt-5 flex flex-col gap-2.5">
                      <Link
                        href={`/shop/${item.id}`}
                        prefetch
                        className="inline-flex items-center justify-center rounded-full bg-black px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1a1a1a]"
                      >
                        เลือกซื้อ
                      </Link>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* WHY AVA - FEATURE STRIPS */}
        <section className="bg-[#f5f5f7] py-24">
           <div className="mx-auto max-w-5xl px-6">
              <h2 className="text-3xl lg:text-5xl font-bold mb-16 tracking-tight">Why AVA is specialized.</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="bg-white p-10 rounded-3xl h-[400px] flex flex-col justify-between group overflow-hidden relative">
                    <div className="relative z-10">
                       <h3 className="text-2xl font-bold mb-4">Intelligence built-in.</h3>
                       <p className="text-gray-500">Powerful chips for maximum performance and efficiency in every task.</p>
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
                 <div className="bg-white p-10 rounded-3xl h-[400px] flex flex-col justify-between group overflow-hidden relative">
                    <div className="relative z-10">
                       <h3 className="text-2xl font-bold mb-4">Pro Cameras.</h3>
                       <p className="text-gray-500">Capture the world in stunning detail with advanced sensor technology.</p>
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
                <Link href="#" className="hover:underline">Privacy Policy</Link>
                <Link href="#" className="hover:underline">Terms of Use</Link>
                <Link href="#" className="hover:underline">Legal</Link>
                <Link href="#" className="hover:underline">Site Map</Link>
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
