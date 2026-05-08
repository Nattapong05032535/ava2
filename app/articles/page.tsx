import Link from "next/link";
import { Navbar } from "@/components/layout";
import { BookOpen, Calendar, ArrowRight, Tag, Cpu } from "lucide-react";

export default function ArticlesPage() {
  const articles = [
    {
      id: 1,
      category: "Innovation",
      title: "เบื้องหลังการออกแบบ AVA Signature Flagship: เมื่อศิลปะมาบรรจบกับวิศวกรรม",
      excerpt: "เจาะลึกทุกกระบวนการคิดและนวัตกรรมเบื้องหลังการพัฒนา P89 รุ่นเรือธงที่เปลี่ยนนิยามของความเป็นไปได้",
      date: "8 เมษายน 2569",
      imageColor: "bg-blue-100"
    },
    {
      id: 2,
      category: "Tips & Tricks",
      title: "5 วิธีใช้งานกล้อง AVA Pro Max ให้เหมือนช่างภาพมือโปร",
      excerpt: "เทคนิคการตั้งค่าแสง เงา และมุมกล้องที่จะช่วยให้ทุกช็อตของคุณออกมาสวยงามระดับ Cinematic",
      date: "5 เมษายน 2569",
      imageColor: "bg-orange-100"
    },
    {
      id: 3,
      category: "Lifestyle",
      title: "ทำไม AVA Life Tab P68 ถึงเป็นเพื่อนคู่ใจที่ดีที่สุดของคนสาย Creative",
      excerpt: "จากสเก็ตซ์แรกสู่โปรเจกต์ใหญ่ มาดูกันว่าแท็บเล็ตของเราช่วยยกระดับการทำงานให้คล่องตัวได้อย่างไร",
      date: "2 เมษายน 2569",
      imageColor: "bg-green-100"
    }
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#0f172a]">
      <Navbar />
      
      <main className="mx-auto max-w-7xl px-6 pb-24 pt-[120px]">
        {/* Header Section */}
        <div className="mb-16">
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-600">
            <BookOpen className="h-3 w-3" />
            AVA Journal
          </span>
          <h1 className="mt-8 text-5xl font-semibold tracking-tight sm:text-7xl">
            Lifestyle & <span className="text-gray-400">Innovation</span>
          </h1>
          <p className="mt-8 max-w-2xl text-xl leading-relaxed text-gray-500">
            พื้นที่รวบรวมเรื่องราว แรงบันดาลใจ และความรู้ใหม่ๆ ที่จะช่วยให้คุณใช้งานเทคโนโลยีจาก AVA ได้มีประสิทธิภาพสูงสุด
          </p>
        </div>

        {/* Featured Post */}
        <section className="group relative overflow-hidden rounded-[3rem] bg-white p-8 shadow-[0_32px_96px_rgba(15,23,42,0.06)] lg:flex lg:p-12">
          <div className="absolute top-0 right-0 -mr-24 -mt-24 h-96 w-96 rounded-full bg-blue-50/50 blur-3xl transition-transform group-hover:scale-110" />
          
          <div className="relative z-10 lg:w-3/5">
            <div className="flex items-center gap-4 text-xs font-semibold text-blue-600">
              <span className="rounded-full bg-blue-50 px-3 py-1 uppercase tracking-wider">Editor&apos;s Choice</span>
              <span className="flex items-center gap-1.5 text-gray-400">
                <Calendar className="h-3 w-3" />
                10 เมษายน 2569
              </span>
            </div>
            <h2 className="mt-8 text-4xl font-semibold leading-tight sm:text-5xl">
              อนาคตของระบบชาร์จเร็ว: เจาะลึกเทคโนโลยี SuperCharge ใน AVA Series
            </h2>
            <p className="mt-8 text-lg leading-8 text-gray-400">
              AVA เริ่มต้นจากการตั้งคำถามว่า &quot;จะทำอย่างไรให้เทคโนโลยีระดับ High-end เป็นสิ่งที่ทุกคนเข้าถึงได้และใช้งานได้ง่ายที่สุด?&quot;
            </p>
            <div className="mt-10">
              <Link href="#" className="inline-flex items-center gap-2 text-base font-semibold text-gray-900 group/btn">
                อ่านบทความฉบับเต็ม
                <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
              </Link>
            </div>
          </div>
          
          <div className="mt-12 lg:mt-0 lg:w-2/5 lg:pl-12">
            <div className="aspect-[4/5] rounded-[2rem] bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center overflow-hidden">
               <Cpu className="h-32 w-32 text-gray-200" />
            </div>
          </div>
        </section>

        {/* Category Filter Placeholder */}
        <div className="mt-20 flex flex-wrap gap-3">
          {["ทั้งหมด", "Innovation", "Tips & Tricks", "Lifestyle", "Announcements"].map((cat, i) => (
            <button 
              key={i} 
              className={`rounded-full px-6 py-2.5 text-sm font-medium transition-colors ${
                i === 0 ? "bg-gray-900 text-white" : "bg-white text-gray-600 hover:bg-gray-50 border border-black/5"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Article Grid */}
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <article key={article.id} className="group flex flex-col rounded-[2.5rem] border border-black/5 bg-white p-6 shadow-[0_12px_40px_rgba(0,0,0,0.03)] transition-all hover:shadow-[0_24px_64px_rgba(0,0,0,0.06)] hover:-translate-y-1">
              <div className={`aspect-video rounded-2xl ${article.imageColor} mb-6 flex items-center justify-center relative overflow-hidden`}>
                 <Tag className="h-10 w-10 text-(--showcase-ink) opacity-10" />
              </div>
              <div className="flex items-center gap-3 text-xs font-semibold text-gray-400">
                <span className="text-blue-600 uppercase tracking-wider">{article.category}</span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3 w-3" />
                  {article.date}
                </span>
              </div>
              <h3 className="mt-4 text-xl font-semibold leading-snug text-gray-900 group-hover:text-blue-600 transition-colors">
                {article.title}
              </h3>
              <p className="mt-4 flex-grow text-sm leading-7 text-gray-500 line-clamp-3">
                {article.excerpt}
              </p>
              <Link href="#" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-gray-900">
                อ่านต่อ
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
              </Link>
            </article>
          ))}
        </div>

        {/* Newsletter / CTA */}
        <div className="mt-24 rounded-[3rem] bg-[#111111] p-12 text-center text-white sm:p-20">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">ไม่พลาดทุกความเคลื่อนไหวจาก AVA</h2>
          <p className="mt-6 text-lg text-gray-400">สมัครสมาชิกจดหมายข่าวเพื่อรับเทคนิคการใช้งานและโปรโมชั่นก่อนใคร</p>
          <div className="mt-10 mx-auto max-w-md flex gap-2 p-2 rounded-full bg-white/5 border border-white/10">
            <input 
              type="email" 
              placeholder="อีเมลของคุณ" 
              className="flex-grow bg-transparent px-6 py-2 text-sm border-none focus:outline-none placeholder:text-gray-600"
            />
            <button className="rounded-full bg-white px-6 py-2 text-sm font-semibold text-black hover:bg-gray-200 transition-colors">
              สมัครสมาชิก
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

