"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";
import { useCart } from "@/contexts/cart-context";
import { X, ChevronDown, Edit3, Eye, EyeOff, Check } from "lucide-react";

type ModalView = "choice" | "login" | "terms" | "register";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, isLoggedIn } = useAuth();
  const { items, subtotal } = useCart();
  
  // View Management
  const [view, setView] = useState<ModalView>("choice");
  
  // Login State
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  // Guest State
  const [guestEmail, setGuestEmail] = useState("");

  // Terms State
  const [terms, setTerms] = useState({
    required: false,
    custom: false,
    marketing: false,
    ads: false,
    location: false,
    all: false
  });

  // Register State
  const [regData, setRegData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    day: "",
    month: "",
    year: ""
  });
  const [showPass, setShowPass] = useState(false);

  // If already logged in, redirect to the previous page or home
  useEffect(() => {
    if (isLoggedIn) {
      const redirect = searchParams.get("redirect") || "/";
      router.push(redirect);
    }
  }, [isLoggedIn, router, searchParams]);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const result = login(id, password);
    if (result.success) {
      // useEffect will handle the redirect
    } else {
      setError(result.error || "รหัสผ่านไม่ถูกต้อง");
    }
  };

  const toggleAllTerms = () => {
    const newVal = !terms.all;
    setTerms({
      required: newVal,
      custom: newVal,
      marketing: newVal,
      ads: newVal,
      location: newVal,
      all: newVal
    });
  };

  const handleTermChange = (key: keyof typeof terms) => {
    const newTerms = { ...terms, [key]: !terms[key] };
    const allChecked = newTerms.required && newTerms.custom && newTerms.marketing && newTerms.ads && newTerms.location;
    setTerms({ ...newTerms, all: allChecked });
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex flex-col font-sans">
      {/* Simple Header */}
      <header className="bg-white h-16 flex items-center justify-between px-8 border-b border-gray-200 flex-shrink-0">
        <h1 className="text-xl font-bold text-black tracking-tight">AVA Account</h1>
        <Link href="/shop" className="text-gray-400 hover:text-black transition-colors">
          <X className="w-6 h-6" />
        </Link>
      </header>

      {/* Main Content: Centered Card */}
      <main className="flex-grow flex items-center justify-center py-4 px-4 overflow-hidden">
        <div className="w-full max-w-[580px] bg-white rounded-[2rem] shadow-[0_4px_30px_rgba(0,0,0,0.05)] p-8 md:p-10">
          
          {/* VIEW 1: CHOICE */}
          {view === "choice" && (
            <div>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-black mb-3">เข้าสู่ระบบ AVA</h2>
                <p className="text-[15px] text-gray-500">
                  เพื่อรับคะแนนสะสมและสิทธิประโยชน์จาก AVA Rewards
                </p>
              </div>

              <div className="space-y-4 mb-8">
                <button
                  onClick={() => setView("login")}
                  className="w-full bg-[#1b5cff] hover:bg-[#0047ff] text-white font-bold py-4 rounded-full transition-all text-center shadow-lg shadow-blue-100"
                >
                  ล็อกอิน
                </button>
                <button
                  onClick={() => setView("terms")}
                  className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold py-4 rounded-full transition-all text-center"
                >
                  สมัครสมาชิกใหม่
                </button>
              </div>

              <div className="relative flex items-center mb-8">
                <div className="flex-grow border-t border-gray-100"></div>
                <span className="flex-shrink mx-4 text-gray-400 text-xs uppercase tracking-widest font-bold">หรือ</span>
                <div className="flex-grow border-t border-gray-100"></div>
              </div>

              <div className="text-center">
                <h3 className="text-xl font-bold text-black mb-2">สั่งซื้อโดยไม่เข้าสู่ระบบ</h3>
                <p className="text-sm text-gray-400 mb-6 italic">ดำเนินการชำระเงินในฐานะบุคคลทั่วไป</p>
                <div className="flex flex-col gap-4">
                  <input
                    type="email"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    placeholder="กรุณากรอกอีเมลเพื่อดำเนินการต่อ"
                    className="w-full border-b border-gray-200 py-2 text-center text-lg focus:border-black outline-none transition-colors"
                  />
                  <button
                    disabled={!guestEmail.includes("@")}
                    className="bg-[#e5e5e5] disabled:opacity-50 text-gray-400 font-bold py-4 rounded-full transition-all mt-1"
                  >
                    ดำเนินการต่อแบบไม่ใช้บัญชี
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* VIEW 2: LOGIN */}
          {view === "login" && (
            <div>
              <button 
                onClick={() => setView("choice")}
                className="text-sm text-gray-400 mb-6 flex items-center gap-1 hover:text-black transition-colors"
              >
                ← กลับ
              </button>
              <div className="text-center mb-10">
                <h2 className="text-4xl font-bold text-black mb-3">ล็อกอิน</h2>
                <p className="text-gray-500">ใส่ข้อมูลประจำตัวของคุณเพื่อเข้าถึงบัญชี</p>
              </div>
              
              <form onSubmit={handleLoginSubmit} className="space-y-8">
                <div className="relative">
                  <label className="block text-[13px] font-bold text-gray-400 uppercase tracking-widest mb-1">รหัสผู้ใช้ (ID)</label>
                  <input
                    type="text"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    placeholder="ใส่รหัสพนักงานหรือลูกค้า"
                    className="w-full border-b border-gray-200 py-3 text-xl focus:border-black outline-none transition-all"
                    required
                  />
                </div>
                <div className="relative">
                  <label className="block text-[13px] font-bold text-gray-400 uppercase tracking-widest mb-1">รหัสผ่าน (Password)</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••"
                    className="w-full border-b border-gray-200 py-3 text-xl focus:border-black outline-none transition-all"
                    required
                  />
                </div>
                {error && <p className="text-sm text-red-500 font-bold text-center">{error}</p>}
                <button
                  type="submit"
                  className="w-full bg-black text-white font-bold py-5 rounded-full hover:bg-gray-900 transition-all shadow-xl shadow-gray-200 mt-4"
                >
                  เข้าสู่ระบบ
                </button>
              </form>
              
              <div className="mt-12 text-center">
                <button className="text-sm text-[#1b5cff] font-bold hover:underline">ลืมรหัสผ่าน?</button>
              </div>
            </div>
          )}

          {/* VIEW 3: TERMS */}
          {view === "terms" && (
            <div>
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-black mb-2">สร้างบัญชีผู้ใช้ AVA ของคุณ</h2>
                <p className="text-sm text-gray-500 leading-relaxed">
                  ตรวจสอบ <button className="underline text-gray-800">นโยบายความเป็นส่วนตัว</button> เพื่อดูว่าเราจัดการข้อมูลของคุณอย่างไร
                </p>
              </div>

              <div className="space-y-4 mb-6">
                {/* 1. Terms & Conditions */}
                <div className="flex gap-4 items-start px-2">
                  <button onClick={() => handleTermChange('required')} className={`mt-1 w-[22px] h-[22px] rounded-full border flex items-center justify-center transition-colors flex-shrink-0 ${terms.required ? 'bg-[#1b5cff] border-[#1b5cff]' : 'border-gray-300'}`}>
                    {terms.required && <Check className="w-3.5 h-3.5 text-white" strokeWidth={4} />}
                  </button>
                  <div>
                    <p className="text-[15px] font-medium text-black">ข้อกำหนดและเงื่อนไข</p>
                    <button className="text-[13px] text-gray-400 underline block mt-0.5">รายละเอียด</button>
                  </div>
                </div>

                <div className="border-t border-gray-100 border-dashed mx-2" />

                <div className="px-2 space-y-4">
                  <p className="text-[14px] font-medium text-black">ตรวจสอบตัวเลือกต่อไปนี้:</p>
                  
                  {/* 2. Custom Service */}
                  <div className="flex gap-4 items-start">
                    <button onClick={() => handleTermChange('custom')} className={`mt-1 w-[22px] h-[22px] rounded-full border flex items-center justify-center transition-colors flex-shrink-0 ${terms.custom ? 'bg-[#1b5cff] border-[#1b5cff]' : 'border-gray-300'}`}>
                      {terms.custom && <Check className="w-3.5 h-3.5 text-white" strokeWidth={4} />}
                    </button>
                    <div>
                      <p className="text-[15px] font-medium text-black leading-tight">เปิด บริการที่กำหนดเอง (ไม่บังคับ)</p>
                      <p className="text-[12px] text-gray-500 mt-1 leading-relaxed">รับคอนเทนต์และคำแนะนำที่ได้รับการปรับปรุงตามความสนใจและตำแหน่งของคุณ</p>
                      <button className="text-[12px] text-gray-400 underline block mt-1">รายละเอียด</button>
                    </div>
                  </div>

                  {/* 3. News & Offers */}
                  <div className="flex gap-4 items-start">
                    <button onClick={() => handleTermChange('marketing')} className={`mt-1 w-[22px] h-[22px] rounded-full border flex items-center justify-center transition-colors flex-shrink-0 ${terms.marketing ? 'bg-[#1b5cff] border-[#1b5cff]' : 'border-gray-300'}`}>
                      {terms.marketing && <Check className="w-3.5 h-3.5 text-white" strokeWidth={4} />}
                    </button>
                    <div>
                      <p className="text-[15px] font-medium text-black">รับข่าวสารและข้อเสนอพิเศษ (เลือกได้)</p>
                      <button className="text-[12px] text-gray-400 underline block mt-1">รายละเอียด</button>
                    </div>
                  </div>

                  {/* 4. Personalized Ads */}
                  <div className="flex gap-4 items-start">
                    <button onClick={() => handleTermChange('ads')} className={`mt-1 w-[22px] h-[22px] rounded-full border flex items-center justify-center transition-colors flex-shrink-0 ${terms.ads ? 'bg-[#1b5cff] border-[#1b5cff]' : 'border-gray-300'}`}>
                      {terms.ads && <Check className="w-3.5 h-3.5 text-white" strokeWidth={4} />}
                    </button>
                    <div>
                      <p className="text-[15px] font-medium text-black leading-tight">ปรับปรุงการโฆษณาที่ปรับให้เป็นส่วนตัว (ไม่บังคับ)</p>
                      <button className="text-[12px] text-gray-400 underline block mt-1">รายละเอียด</button>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-100 border-dashed mx-2" />

                {/* 6. All Checkbox */}
                <div className="flex gap-4 items-center px-2 py-1">
                  <button onClick={toggleAllTerms} className={`w-[22px] h-[22px] rounded-full border flex items-center justify-center transition-colors flex-shrink-0 ${terms.all ? 'bg-[#1b5cff] border-[#1b5cff]' : 'border-gray-300'}`}>
                    {terms.all && <Check className="w-3.5 h-3.5 text-white" strokeWidth={4} />}
                  </button>
                  <p className="text-[16px] font-bold text-black">ฉันได้อ่านและยอมรับข้อความด้านบนทั้งหมดแล้ว</p>
                </div>
              </div>

              <div className="mt-8">
                <button
                  disabled={!terms.required}
                  onClick={() => setView("register")}
                  className={`w-full font-bold py-4 rounded-full transition-all text-base ${terms.required ? 'bg-[#aed1ff] text-[#1b5cff] hover:bg-[#1b5cff] hover:text-white shadow-lg shadow-blue-50' : 'bg-[#aed1ff] text-white opacity-60 cursor-not-allowed'}`}
                >
                  ยินยอม
                </button>
              </div>
            </div>
          )}

          {/* VIEW 4: REGISTER FORM */}
          {view === "register" && (
            <div>
              <div className="text-center mb-6">
                <h2 className="text-[28px] font-light text-black">สร้างบัญชีผู้ใช้ <span className="font-medium text-gray-400">AVA</span> ของคุณ</h2>
              </div>
              
              <div className="space-y-5 mb-8 max-w-[460px] mx-auto">
                {/* Email */}
                <div className="relative group">
                  <label className="block text-[13px] font-bold text-gray-400 mb-1 group-focus-within:text-[#1b5cff]">อีเมล</label>
                  <input 
                    type="email" 
                    value={regData.email}
                    onChange={(e) => setRegData({...regData, email: e.target.value})}
                    className="w-full border-b border-gray-300 py-1.5 outline-none text-black text-[16px] focus:border-black transition-colors bg-transparent"
                  />
                </div>

                <div className="grid grid-cols-2 gap-8">
                  {/* Password */}
                  <div className="relative group">
                    <label className="block text-[13px] font-bold text-gray-400 mb-1 group-focus-within:text-[#1b5cff]">รหัสผ่าน</label>
                    <div className="flex items-center">
                      <input 
                        type={showPass ? "text" : "password"}
                        value={regData.password}
                        onChange={(e) => setRegData({...regData, password: e.target.value})}
                        className="w-full border-b border-gray-300 py-1.5 outline-none text-black text-[16px] focus:border-black"
                      />
                      <button onClick={() => setShowPass(!showPass)} className="absolute right-0 bottom-2 text-gray-400">
                        {showPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                  {/* Confirm Password */}
                  <div className="relative group">
                    <label className="block text-[13px] font-bold text-gray-400 mb-1 group-focus-within:text-[#1b5cff]">ยืนยันรหัสผ่าน</label>
                    <input 
                      type={showPass ? "text" : "password"}
                      value={regData.confirmPassword}
                      onChange={(e) => setRegData({...regData, confirmPassword: e.target.value})}
                      className="w-full border-b border-gray-300 py-1.5 outline-none text-black text-[16px] focus:border-black"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-8">
                  {/* First Name */}
                  <div className="relative group">
                    <label className="block text-[13px] font-bold text-gray-400 mb-1 group-focus-within:text-[#1b5cff]">ชื่อ</label>
                    <input 
                      type="text" 
                      value={regData.firstName}
                      onChange={(e) => setRegData({...regData, firstName: e.target.value})}
                      className="w-full border-b border-gray-300 py-1.5 outline-none text-black text-[16px] focus:border-black"
                    />
                  </div>
                  {/* Last Name */}
                  <div className="relative group">
                    <label className="block text-[13px] font-bold text-gray-400 mb-1 group-focus-within:text-[#1b5cff]">นามสกุล</label>
                    <input 
                      type="text" 
                      value={regData.lastName}
                      onChange={(e) => setRegData({...regData, lastName: e.target.value})}
                      className="w-full border-b border-gray-300 py-1.5 outline-none text-black text-[16px] focus:border-black"
                    />
                  </div>
                </div>

                {/* Birthdate */}
                <div className="grid grid-cols-[1fr_2fr_1fr] gap-x-6 items-end">
                  <div className="relative group text-center">
                    <label className="block text-[13px] font-bold text-gray-400 mb-1 group-focus-within:text-[#1b5cff]">วัน</label>
                    <input type="text" value={regData.day} onChange={e => setRegData({...regData, day: e.target.value})} className="w-full border-b border-gray-300 py-1.5 outline-none text-black text-center text-[16px] focus:border-black" />
                  </div>
                  <div className="relative group">
                    <label className="block text-[13px] font-bold text-gray-400 mb-1 group-focus-within:text-[#1b5cff] text-center">เดือน</label>
                    <div className="relative">
                      <select value={regData.month} onChange={e => setRegData({...regData, month: e.target.value})} className="w-full border-b border-gray-300 py-1.5 outline-none text-black text-[16px] focus:border-black appearance-none bg-transparent text-center">
                        <option value="">เดือน</option>
                        <option value="1">มกราคม</option>
                        <option value="2">กุมภาพันธ์</option>
                        <option value="3">มีนาคม</option>
                        <option value="4">เมษายน</option>
                        <option value="5">พฤษภาคม</option>
                        <option value="6">มิถุนายน</option>
                        <option value="7">กรกฎาคม</option>
                        <option value="8">สิงหาคม</option>
                        <option value="9">กันยายน</option>
                        <option value="10">ตุลาคม</option>
                        <option value="11">พฤศจิกายน</option>
                        <option value="12">ธันวาคม</option>
                      </select>
                      <ChevronDown className="absolute right-0 bottom-2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                  <div className="relative group text-center">
                    <label className="block text-[13px] font-bold text-gray-400 mb-1 group-focus-within:text-[#1b5cff]">ปี</label>
                    <input type="text" value={regData.year} onChange={e => setRegData({...regData, year: e.target.value})} className="w-full border-b border-gray-300 py-1.5 outline-none text-black text-center text-[16px] focus:border-black" />
                  </div>
                </div>
              </div>

              <div className="flex gap-4 max-w-[460px] mx-auto mt-6">
                <button
                  onClick={() => setView("terms")}
                  className="flex-1 bg-[#f5f5f5] hover:bg-gray-200 text-black font-bold py-4 rounded-full transition-all text-base"
                >
                  กลับ
                </button>
                <button
                  onClick={() => { 
                    alert("สำเร็จ"); 
                    const redirect = searchParams.get("redirect") || "/";
                    router.push(redirect); 
                  }}
                  className="flex-1 bg-[#1b5cff] text-white font-bold py-4 rounded-full transition-all text-base shadow-lg shadow-blue-50"
                >
                  ถัดไป
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="h-16 bg-[#f5f5f5] flex flex-col items-center justify-center px-8 border-t border-gray-200 flex-shrink-0">
        <div className="flex gap-6 mb-1">
          <button className="text-[10px] text-gray-400 hover:text-black">เงื่อนไขและข้อกำหนด</button>
          <button className="text-[10px] text-gray-400 hover:text-black">นโยบายความเป็นส่วนตัว</button>
        </div>
        <p className="text-[9px] text-gray-300">Copyright © 2024 AVA. All rights reserved.</p>
      </footer>
    </div>
  );
}
