import Link from "next/link";
import { Navbar } from "@/components/layout";
import { Phone, MapPin, Shield, Clock, MessageCircle, Mail, ChevronRight } from "lucide-react";

export default function ServiceCenterPage() {
  const services = [
    {
      icon: <Shield className="h-6 w-6 text-blue-600" />,
      title: "Check Warranty",
      desc: "ตรวจสอบระยะเวลาการรับประกันสินค้าของคุณได้ง่ายๆ ผ่านหมายเลข IMEI",
      link: "#"
    },
    {
      icon: <Clock className="h-6 w-6 text-orange-600" />,
      title: "Repair Status",
      desc: "ติดตามสถานะการซ่อมบำรุงแบบ Real-time ตั้งแต่การรับเครื่องจนถึงส่งคืน",
      link: "#"
    },
    {
      icon: <Phone className="h-6 w-6 text-green-600" />,
      title: "VIP Hotline",
      desc: "บริการสายด่วนสำหรับลูกค้า AVA Life Pro series ตลอด 24 ชั่วโมง",
      link: "tel:1234"
    }
  ];

  const branches = [
    {
      name: "AVA Experience Store - Siam Paragon",
      location: "ชั้น 2 โซน Technology, สยามพารากอน",
      hours: "10:00 - 21:00 น.",
      phone: "02-XXX-XXXX"
    },
    {
      name: "AVA Service Point - Central World",
      location: "ชั้น 4 ฝั่ง Digital World, เซ็นทรัลเวิลด์",
      hours: "10:30 - 21:30 น.",
      phone: "02-YYY-YYYY"
    }
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#0f172a]">
      <Navbar />
      
      <main className="mx-auto max-w-7xl px-6 pb-24 pt-[120px]">
        {/* Hero Section */}
        <section className="mb-12">
          <div className="rounded-[3rem] bg-white px-8 py-16 text-center shadow-[0_32px_96px_rgba(15,23,42,0.06)] sm:px-16">
            <span className="inline-flex items-center gap-2 rounded-full bg-green-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-green-600">
              <Shield className="h-3 w-3" />
              Service & Support
            </span>
            <h2 className="mt-8 text-4xl font-semibold leading-tight sm:text-5xl">
              อนาคตของระบบชาร์จเร็ว: เจาะลึกเทคโนโลยี SuperCharge ใน AVA Series
            </h2>
            <p className="mt-8 text-lg leading-8 text-gray-500">
              AVA เริ่มต้นจากการตั้งคำถามว่า &quot;จะทำอย่างไรให้เทคโนโลยีระดับ High-end เป็นสิ่งที่ทุกคนเข้าถึงได้และใช้งานได้ง่ายที่สุด?&quot;
            </p>
          </div>
        </section>

        {/* Primary Services Grid */}
        <div className="grid gap-6 sm:grid-cols-3">
          {services.map((service, i) => (
            <div key={i} className="group rounded-[2.5rem] border border-black/5 bg-white p-10 shadow-[0_12px_40px_rgba(0,0,0,0.03)] transition-all hover:shadow-[0_24px_64px_rgba(0,0,0,0.06)]">
              <div className="mb-8 inline-flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-gray-50 transition-colors group-hover:bg-white group-hover:shadow-sm">
                {service.icon}
              </div>
              <h3 className="text-2xl font-semibold text-gray-900">{service.title}</h3>
              <p className="mt-4 text-base leading-7 text-gray-500">{service.desc}</p>
              <Link href={service.link} className="mt-8 inline-flex items-center gap-2 font-semibold text-gray-900">
                เริ่มดำเนินการ
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          ))}
        </div>

        {/* Support Channels */}
        <div className="mt-20 grid gap-12 lg:grid-cols-2">
          <div className="rounded-[3rem] bg-[#111111] p-12 text-white shadow-2xl sm:p-16">
            <h2 className="text-4xl font-semibold tracking-tight">ต้องการความช่วยเหลือด่วน?</h2>
            <p className="mt-6 text-lg text-gray-400">ทีมงาน AVA พร้อมตอบคำถามและให้คำแนะนำผ่านช่องทางที่คุณสะดวก</p>
            
            <div className="mt-12 space-y-6">
              <div className="flex items-center gap-6 p-6 rounded-[2rem] bg-white/5 border border-white/10 hover:bg-white/8 transition-colors">
                <div className="h-12 w-12 rounded-2xl bg-white/10 flex items-center justify-center">
                  <MessageCircle className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <h4 className="font-semibold">Live Chat Support</h4>
                  <p className="text-sm text-gray-500">คุยกับเจ้าหน้าที่โดยตรงแบบ Real-time</p>
                </div>
              </div>
              
              <div className="flex items-center gap-6 p-6 rounded-[2rem] bg-white/5 border border-white/10 hover:bg-white/8 transition-colors">
                <div className="h-12 w-12 rounded-2xl bg-white/10 flex items-center justify-center">
                  <Mail className="h-6 w-6 text-orange-400" />
                </div>
                <div>
                  <h4 className="font-semibold">Email Us</h4>
                  <p className="text-sm text-gray-500">support@avamobile.com</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[3rem] border border-black/5 bg-white p-12 shadow-xl sm:p-16">
            <h2 className="text-4xl font-semibold tracking-tight text-gray-900">ศูนย์บริการใกล้บ้านคุณ</h2>
            <div className="mt-10 space-y-8">
              {branches.map((branch, i) => (
                <div key={i} className="relative pb-8 border-b border-gray-100 last:border-0 last:pb-0">
                  <div className="flex items-start gap-4">
                    <MapPin className="h-5 w-5 mt-1 text-gray-400" />
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">{branch.name}</h4>
                      <p className="mt-1 text-sm text-gray-500">{branch.location}</p>
                      <div className="mt-4 flex flex-wrap gap-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
                        <span className="flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5" />
                          {branch.hours}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Phone className="h-3.5 w-3.5" />
                          {branch.phone}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Link href="#" className="mt-12 inline-flex w-full items-center justify-center rounded-full bg-gray-50 py-4 text-sm font-semibold text-gray-900 hover:bg-gray-100 transition-colors">
              ดูสาขาทั้งหมดทั่วประเทศ
            </Link>
          </div>
        </div>

        {/* Warranty FAQ Placeholder */}
        <div className="mt-24">
          <h2 className="text-center text-3xl font-bold tracking-tight">คำถามที่พบบ่อยเกี่ยวกับการรับประกัน</h2>
          <div className="mt-12 mx-auto max-w-3xl space-y-4">
            {[
              "อุปกรณ์ที่ได้รับความเสียหายจากน้ำรวมอยู่ในการรับประกันหรือไม่?",
              "ระยะเวลาในการซ่อมบำรุงปกติใช้เวลาประมาณกี่วัน?",
              "สามารถซื้อประกันเพิ่ม (AVA Care+) ได้ที่ไหน?",
              "การส่งซ่อมสามารถส่งผ่านขนส่งสาธารณะได้หรือไม่?"
            ].map((q, i) => (
              <div key={i} className="rounded-2xl border border-black/5 bg-white p-6 flex items-center justify-between group cursor-pointer hover:bg-gray-50">
                <span className="font-medium text-gray-900">{q}</span>
                <ChevronRight className="h-5 w-5 text-gray-300 transition-transform group-hover:translate-x-1" />
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

