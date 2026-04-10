import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Compass, Lightbulb, ShieldCheck, Cpu } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#0f172a]">
      <Navbar />
      
      <main className="mx-auto max-w-7xl px-6 pb-24 pt-[120px]">
        {/* Hero Section */}
        <section className="relative overflow-hidden rounded-[3rem] bg-white px-8 py-20 shadow-[0_32px_96px_rgba(15,23,42,0.06)] sm:px-16 lg:py-28">
          <div className="absolute top-0 right-0 -mr-24 -mt-24 h-[500px] w-[500px] rounded-full bg-blue-50/50 blur-3xl" />
          <div className="absolute bottom-0 left-0 -ml-24 -mb-24 h-[400px] w-[400px] rounded-full bg-orange-50/40 blur-3xl" />
          
          <div className="relative z-10 max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-600">
              <Compass className="h-3 w-3" />
              Our Vision
            </span>
            <h1 className="mt-8 text-5xl font-600 tracking-tight sm:text-7xl">
              Defining the <span className="text-gray-400">future</span> of mobile interaction.
            </h1>
            <p className="mt-8 text-xl leading-relaxed text-gray-500 sm:text-2xl">
              AVA ไม่ได้เป็นเพียงแบรนด์สมาร์ทโฟน แต่เป็นตัวแทนของวิถีชีวิตที่เรียบง่าย พรีเมียม และทรงพลัง ผ่านนวัตกรรมที่เราบรรจงคัดสรรมาเพื่อคุณ
            </p>
          </div>
        </section>

        {/* Values Grid */}
        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          {[
            {
              icon: <Lightbulb className="h-6 w-6 text-orange-500" />,
              title: "Innovation first",
              desc: "เรามุ่งเน้นการนำเทคโนโลยีล้ำสมัยมาปรับใช้ให้เข้ากับการใช้งานจริงในชีวิตประจำวันอย่างลงตัวที่สุด"
            },
            {
              icon: <ShieldCheck className="h-6 w-6 text-green-500" />,
              title: "Quality obsessive",
              desc: "ทุกรายละเอียดการออกแบบและวัสดุที่เราเลือกใช้ต้องผ่านการตรวจสอบคุณภาพที่เข้มงวดที่สุด"
            },
            {
              icon: <Cpu className="h-6 w-6 text-blue-500" />,
              title: "Performance core",
              desc: "เราเชื่อว่าความเร็วและประสิทธิภาพที่เสถียรคือพื้นฐานสำคัญของประสบการณ์การใช้งานที่ดี"
            }
          ].map((item, i) => (
            <div key={i} className="rounded-[2.5rem] border border-black/5 bg-white p-10 shadow-[0_12px_40px_rgba(0,0,0,0.03)] transition-transform hover:-translate-y-1">
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-50">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
              <p className="mt-4 text-sm leading-7 text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Story Section */}
        <section className="mt-12 grid gap-8 lg:grid-cols-2">
          <div className="rounded-[3rem] bg-[#111111] p-12 text-white shadow-2xl sm:p-16">
            <h2 className="text-4xl font-semibold tracking-tight">The AVA Story</h2>
            <p className="mt-8 text-lg leading-8 text-gray-400">
              AVA เริ่มต้นจากการตั้งคำถามว่า &quot;จะทำอย่างไรให้เทคโนโลยีระดับ High-end เป็นสิ่งที่ทุกคนเข้าถึงได้และใช้งานได้ง่ายที่สุด?&quot;
            </p>
            <p className="mt-6 text-base leading-8 text-gray-500">
              เราทุ่มเทเวลาในการพัฒนาซอฟต์แวร์และคัดเลือกฮาร์ดแวร์ที่ดีที่สุด เพื่อสร้างสมาร์ทโฟนที่ไม่ใช่แค่เครื่องมือก้าวล้ำ แต่เป็นเพื่อนคู่ใจที่เข้าใจไลฟ์สไตล์ของคุณอย่างแท้จริง
            </p>
            <div className="mt-12">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-semibold text-black transition-colors hover:bg-gray-200"
              >
                สำรวจนวัตกรรมของเรา
              </Link>
            </div>
          </div>
          
          <div className="relative overflow-hidden rounded-[3rem] border border-black/5 bg-white p-12 shadow-xl sm:p-16">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 to-orange-50/20" />
            <div className="relative z-10">
              <h2 className="text-4xl font-semibold tracking-tight text-gray-900">Design Philosophy</h2>
              <div className="mt-10 space-y-8">
                <div>
                  <h4 className="font-semibold text-gray-900">Pure Form</h4>
                  <p className="mt-2 text-sm text-gray-500">ความงามที่เกิดจากความเรียบง่าย ตัดส่วนเกินออกเพื่อให้เหลือเพียงสิ่งที่จำเป็นที่สุด</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Human Centric</h4>
                  <p className="mt-2 text-sm text-gray-500">การจัดวางปุ่มกดและน้ำหนักตัวเครื่องที่ผ่านการคำนวณมาเพื่อสรีระของฝ่ามือ</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Subtle Premium</h4>
                  <p className="mt-2 text-sm text-gray-500">วัสดุคุณภาพสูงที่ให้ความรู้สึกพรีเมียมทุกครั้งที่สัมผัส แต่ยังคงความทนทานต่อการใช้งานจริง</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact/CTA */}
        <div className="mt-24 text-center">
          <h2 className="text-3xl font-semibold tracking-tight">ร่วมเดินทางไปกับเรา</h2>
          <p className="mt-4 text-gray-500">ติดตามข่าวสารและการอัปเดตใหม่ๆ จาก AVA ได้ทุกช่องทาง</p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/service-center" className="rounded-full bg-gray-100 px-8 py-4 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-200">
              ศูนย์บริการและช่วยเหลือ
            </Link>
            <Link href="/articles" className="rounded-full bg-gray-100 px-8 py-4 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-200">
              อ่านบทความและรีวิว
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

