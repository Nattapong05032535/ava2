import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout";
import { LineupSlider } from "@/components/products";
import { AVA_LINEUP, HOME_HERO_PRODUCT_CARDS, type HomeProduct } from "@/constants";
import heroFirstImage from "@/public/main/้hero-first/1.webp";
import heroSecondImage from "@/public/main/hero-sec/1.webp";

const heroPanelClass =
  "relative isolate mx-auto min-h-[620px] max-w-[90rem] overflow-hidden bg-[radial-gradient(circle_at_78%_26%,rgba(251,146,60,0.38),transparent_28%),linear-gradient(115deg,#16182a_0%,#262943_42%,#6c4a32_100%)] text-white sm:min-h-[680px] lg:min-h-[640px]";

export default function Home() {
  const heroProduct = AVA_LINEUP[0];

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans selection:bg-blue-100">
      <Navbar />

      <main className="flex-grow bg-white">
        {/* HERO SECTION */}
        <section className="home-hero-shell relative isolate min-h-svh overflow-hidden bg-[radial-gradient(circle_at_78%_26%,rgba(251,146,60,0.38),transparent_28%),linear-gradient(115deg,#16182a_0%,#262943_42%,#6c4a32_100%)] text-white">
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#07080d] via-[#07080d]/45 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-full bg-gradient-to-r from-[#11131b] via-[#11131b]/72 to-transparent lg:w-[62%]" />

          <Link
            href="/products/promax-p89"
            prefetch
            aria-label={`ดูรายละเอียด ${heroProduct.name}`}
            className="absolute inset-y-0 right-[-70%] z-0 block w-[150%] sm:right-[-36%] sm:w-[104%] lg:right-[-18%] lg:w-[68%] xl:right-[-14%] xl:w-[66%] 2xl:right-[-10%] 2xl:w-[64%]"
          >
            <Image
              src={heroFirstImage}
              alt={heroProduct.name}
              fill
              sizes="(max-width: 640px) 150vw, (max-width: 1024px) 104vw, 68vw"
              priority
              className="animate-in fade-in zoom-in duration-1000 object-contain object-right-bottom drop-shadow-[0_34px_70px_rgba(0,0,0,0.42)]"
            />
          </Link>

          <div className="relative z-10 mx-auto flex min-h-svh max-w-7xl items-center px-6 py-16 sm:py-20 lg:px-8">
            <div className="w-full max-w-[560px] -translate-y-32 text-center sm:-translate-y-14 sm:text-left lg:translate-y-0 lg:pt-0">
              <p className="animate-in fade-in slide-in-from-bottom-4 text-sm font-semibold text-white/72 duration-700">
                ขอแนะนำผลิตภัณฑ์ใหม่
              </p>
              <h1 className="animate-in fade-in slide-in-from-bottom-5 mt-5 text-[clamp(3rem,6vw,5.25rem)] font-semibold leading-[0.94] duration-700 delay-75">
                {heroProduct.shortName}
              </h1>
              <p className="animate-in fade-in slide-in-from-bottom-6 mt-5 text-3xl font-medium leading-tight text-white/90 duration-700 delay-150 sm:text-4xl">
                AVA Intelligence
              </p>
              <p className="animate-in fade-in slide-in-from-bottom-7 mt-5 text-lg font-medium text-white/82 duration-700 delay-200 sm:text-2xl">
                รับข้อเสนอพิเศษเมื่อซื้อเครื่องใหม่
              </p>

              <div className="animate-in fade-in slide-in-from-bottom-8 mt-8 flex flex-wrap justify-center gap-3 duration-700 delay-300 sm:justify-start">
                <Link
                  href="/products/promax-p89"
                  prefetch
                  className="rounded-full border border-white/70 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-[#11131b]"
                >
                  เรียนรู้เพิ่มเติม
                </Link>
                <Link
                  href="/shop/promax-p89"
                  prefetch
                  className="rounded-full bg-white px-7 py-3 text-sm font-semibold text-[#11131b] transition-colors hover:bg-white/86"
                >
                  ซื้อ
                </Link>
              </div>
            </div>
          </div>
        </section>

        <SecondaryHero product={heroProduct} />

        {/* HERO PRODUCT GRID */}
        <section className="bg-white px-4 py-5 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-[90rem] grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {HOME_HERO_PRODUCT_CARDS.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                prefetch
                className="group relative flex min-h-[320px] overflow-hidden bg-[#f6f6f6] px-6 pt-8 text-center transition-transform duration-300 hover:-translate-y-1 sm:min-h-[360px] lg:min-h-[390px]"
              >
                <div className="relative z-10 w-full">
                  <h2 className="whitespace-nowrap text-[clamp(1.15rem,1.45vw,1.55rem)] font-semibold leading-tight text-black">
                    {item.modelName}
                  </h2>
                </div>

                <div className="absolute inset-x-6 bottom-5 top-[92px] transition-transform duration-500 group-hover:scale-[1.03]">
                  <Image
                    src={item.image}
                    alt={item.modelName}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                    className="object-contain object-center"
                  />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* LINEUP EXPLORATION */}
        <section className="bg-white py-20">
          <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8">
            <h2 className="mb-12 text-left text-3xl font-bold tracking-tight lg:text-5xl">
              เลือกชมกลุ่มผลิตภัณฑ์ของเรา
            </h2>

            <LineupSlider products={AVA_LINEUP} />
          </div>
        </section>

        {/* WHY AVA - FEATURE STRIPS */}
        <section className="bg-[#f5f5f7] py-24">
           <div className="mx-auto max-w-5xl px-6">
              <h2 className="text-3xl lg:text-5xl font-bold mb-16 tracking-tight">AVA ที่ดีในแบบของตัวเอง</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="group flex min-h-[440px] flex-col overflow-hidden rounded-3xl border border-black/5 bg-white p-10 text-center shadow-sm">
                    <div>
                       <h3 className="text-2xl font-bold mb-4 text-[#111111]">ประสิทธิภาพที่พอดีกับชีวิตจริง</h3>
                    </div>
                    <div className="relative my-8 h-48 w-full transition-transform duration-700 group-hover:scale-105">
                       <Image
                         src="/Privilege/1.webp"
                         alt="ประสิทธิภาพที่พอดีกับชีวิตจริง"
                         fill
                         sizes="(max-width: 768px) 100vw, 50vw"
                         className="object-contain object-center"
                       />
                    </div>
                    <p className="mt-auto text-left leading-relaxed text-gray-500">ทำงานได้ลื่นไหล ใช้งานได้นาน และพร้อมรับมือกับสิ่งที่คุณทำในแต่ละวัน โดยไม่จำเป็นต้องเป็นที่สุดของใคร แค่เป็นเครื่องที่ไว้ใจได้ในแบบของคุณ</p>
                 </div>
                 <div className="group flex min-h-[440px] flex-col overflow-hidden rounded-3xl border border-black/5 bg-white p-10 text-center shadow-sm">
                    <div>
                       <h3 className="text-2xl font-bold mb-4 text-[#111111]">เทคโนโลยีที่ส่งเสริมการเรียนรู้</h3>
                    </div>
                    <div className="relative my-8 h-48 w-full transition-transform duration-700 group-hover:scale-105">
                       <Image
                         src="/Privilege/2.webp"
                         alt="เทคโนโลยีที่ส่งเสริมการเรียนรู้"
                         fill
                         sizes="(max-width: 768px) 100vw, 50vw"
                         className="object-contain object-center"
                       />
                    </div>
                    <p className="mt-auto text-left leading-relaxed text-gray-500">AVA ออกแบบมาให้เป็นเครื่องมือสำหรับค้นคว้า จดบันทึก เรียนออนไลน์ และสร้างสรรค์ผลงาน เพื่อช่วยให้การศึกษาเข้าถึงง่ายขึ้นสำหรับทุกคน</p>
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

function SecondaryHero({ product }: { product: HomeProduct }) {
  const productHref = `/products/${product.id}`;
  const shopHref = `/shop/${product.id}`;

  return (
    <section className="bg-white px-4 py-5 sm:px-6 lg:px-8">
      <div className={heroPanelClass}>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#07080d] via-[#07080d]/45 to-transparent" />

        <div className="relative z-10 mx-auto flex max-w-[760px] justify-center px-6 pb-0 pt-16 text-center sm:px-10 sm:pt-20 lg:ml-auto lg:min-h-[640px] lg:w-[50%] lg:items-center lg:px-10 lg:py-16 xl:w-[48%] xl:px-14">
          <div className="max-w-[560px]">
            <h2 className="text-[clamp(2.5rem,8vw,4.7rem)] font-semibold leading-[0.98]">
              {product.shortName}
            </h2>
            <p className="mt-5 text-3xl font-medium leading-tight text-white/92 sm:text-4xl lg:text-5xl">
              AVA Intelligence <span className="text-[#20b8ff]">✦</span>
            </p>

            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <Link
                href={productHref}
                prefetch
                className="border-b border-white pb-1 text-sm font-semibold text-white transition-opacity hover:opacity-78"
              >
                เรียนรู้เพิ่มเติม
              </Link>
              <Link
                href={shopHref}
                prefetch
                className="rounded-full border border-white/76 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-[#11131b]"
              >
                ซื้อ
              </Link>
            </div>
          </div>
        </div>

        <Link
          href={productHref}
          prefetch
          aria-label={`ดูรายละเอียด ${product.name}`}
          className="relative z-0 mx-auto mt-4 block h-[280px] w-[86%] sm:h-[360px] sm:w-[68%] lg:absolute lg:left-[5%] lg:top-1/2 lg:mt-0 lg:h-[56%] lg:w-[38%] lg:-translate-y-1/2 xl:left-[7%] xl:w-[36%]"
        >
          <Image
            src={heroSecondImage}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 86vw, (max-width: 1024px) 68vw, 38vw"
            quality={100}
            className="object-contain object-center drop-shadow-[0_32px_70px_rgba(15,18,38,0.45)] lg:object-left-center"
          />
        </Link>
      </div>
    </section>
  );
}
