"use client";

import React from "react";
import { SmartImage } from "@/components/shared";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/contexts/cart-context";
import { useAuth } from "@/contexts/auth-context";
import { ShoppingBag, Search, Menu, X, User, ChevronDown, LogOut } from "lucide-react";

import { NAV_CATEGORIES } from "@/constants";



export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = React.useState(false);
  const pathname = usePathname();
  const { isLoggedIn, currentUser, logout } = useAuth();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">


      {/* Main Navigation Bar */}
      <div className="bg-white border-b border-black/8 shadow-[0_1px_6px_rgba(0,0,0,0.04)]">
        <div className="mx-auto flex h-14 max-w-7xl items-center px-6">
          {/* Logo — left */}
          <Link href="/" className="group flex shrink-0 items-center">
            <div className="relative h-9 w-9 transition-transform duration-300 group-hover:scale-105">
              <SmartImage
                src="/images/logo/icon-logo.png"
                alt="AVA Logo"
                fill
                sizes="36px"
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Category Links — next to logo */}
          <div className="hidden lg:flex items-center gap-1 ml-6">
            {NAV_CATEGORIES.map((item) => (
              <Link
                key={item.href + item.label}
                href={item.href}
                className="px-4 py-2 text-[13px] font-medium text-[#555] transition-colors hover:text-black whitespace-nowrap"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-1 ml-auto">
            <button
              className="flex h-10 w-10 items-center justify-center rounded-full text-[#333] transition-colors hover:bg-black/5"
              aria-label="ค้นหา"
            >
              <Search className="h-[18px] w-[18px]" strokeWidth={1.8} />
            </button>

            <Link
              href="/cart"
              className="relative flex h-10 w-10 items-center justify-center rounded-full text-[#333] transition-colors hover:bg-black/5"
              aria-label="ตะกร้าสินค้า"
            >
              <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={1.8} />
              <CartBadge />
            </Link>

            {mounted && (
              <div className="relative">
                <button
                  id="user-menu-button"
                  className="flex h-10 w-10 items-center justify-center rounded-full text-[#333] transition-colors hover:bg-black/5"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  aria-label="บัญชีผู้ใช้"
                >
                  <User className="h-[18px] w-[18px]" strokeWidth={1.8} />
                </button>

                {/* Account Dropdown */}
                {isUserMenuOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setIsUserMenuOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-[280px] bg-white rounded-[1.5rem] shadow-[0_10px_40px_rgba(0,0,0,0.1)] py-6 z-50 border border-gray-100 overflow-hidden transform origin-top-right transition-all">
                      {isLoggedIn ? (
                        /* LOGGED IN VIEW */
                        <div className="flex flex-col">
                          <div className="px-6 flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                              <User className="w-6 h-6" />
                            </div>
                            <span className="font-bold text-black text-[15px]">{currentUser?.fullName}</span>
                          </div>
                          
                          <button 
                            className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors group border-t border-gray-50 text-left w-full"
                            onClick={() => {}}
                          >
                            <span className="text-[13px] text-gray-800 leading-tight pr-4">รับสิทธิประโยชน์สุดพิเศษด้วย<br />AVA Account</span>
                            <ChevronDown className="w-4 h-4 text-gray-400 -rotate-90 group-hover:text-black" />
                          </button>

                          <div className="h-px bg-gray-100 mx-6 my-2" />

                          <div className="flex flex-col py-1">
                            <button className="px-6 py-3 text-[14px] text-gray-700 hover:bg-gray-50 transition-colors text-left">โปรไฟล์</button>
                            <button className="px-6 py-3 text-[14px] text-gray-700 hover:bg-gray-50 transition-colors text-left">คำสั่งซื้อ</button>
                            <button className="px-6 py-3 text-[14px] text-gray-700 hover:bg-gray-50 transition-colors text-left">สินค้าของฉัน</button>
                            <button className="px-6 py-3 text-[14px] text-gray-700 hover:bg-gray-50 transition-colors text-left">รางวัลของฉัน</button>
                            <button className="px-6 py-3 text-[14px] text-gray-700 hover:bg-gray-50 transition-colors text-left">รายการโปรด</button>
                            <button 
                              onClick={() => { logout(); setIsUserMenuOpen(false); }}
                              className="px-6 py-3 text-[14px] text-gray-700 hover:bg-gray-50 transition-colors text-left border-t border-gray-50 mt-1"
                            >
                              ล็อกเอาต์
                            </button>
                          </div>
                        </div>
                      ) : (
                        /* LOGGED OUT VIEW */
                        <div className="flex flex-col">
                          <div className="px-6 mb-6">
                            <Link 
                              href={`/login?redirect=${pathname}`}
                              onClick={() => setIsUserMenuOpen(false)}
                              className="text-[16px] font-bold text-black hover:text-[#0071e3]"
                            >
                              เข้าสู่ระบบ/สมัครสมาชิก
                            </Link>
                          </div>

                          <button 
                            className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors group border-t border-gray-50 text-left w-full"
                            onClick={() => {}}
                          >
                            <span className="text-[13px] text-gray-800 leading-tight pr-4">รับสิทธิประโยชน์สุดพิเศษด้วย<br />AVA Account</span>
                            <ChevronDown className="w-4 h-4 text-gray-400 -rotate-90 group-hover:text-black" />
                          </button>

                          <div className="h-px bg-gray-100 mx-6 my-2" />

                          <div className="flex flex-col py-1">
                            <button className="px-6 py-3 text-[14px] text-gray-700 hover:bg-gray-50 transition-colors text-left">คำสั่งซื้อ</button>
                            <button className="px-6 py-3 text-[14px] text-gray-700 hover:bg-gray-50 transition-colors text-left">การลงทะเบียนผลิตภัณฑ์</button>
                            <button className="px-6 py-3 text-[14px] text-gray-700 hover:bg-gray-50 transition-colors text-left">เอวีเอรีวอร์ด</button>
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-full text-[#333] transition-colors hover:bg-black/5 lg:hidden"
              aria-label="เปิดเมนู"
            >
              <Menu className="h-5 w-5" strokeWidth={1.8} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[60] bg-white transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] lg:hidden ${
          isMenuOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-full pointer-events-none"
        }`}
      >
        {/* Mobile Header */}
        <div className="flex h-14 items-center justify-between px-6 border-b border-gray-100">
          <Link href="/" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2">
            <div className="relative h-9 w-9">
              <SmartImage
                src="/images/logo/icon-logo.png"
                alt="AVA Logo"
                fill
                className="object-contain"
              />
            </div>
          </Link>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-gray-900 transition-transform active:scale-95 hover:bg-black/5"
            aria-label="ปิดเมนู"
          >
            <X className="h-5 w-5" strokeWidth={2} />
          </button>
        </div>

        {/* Mobile Menu Content */}
        <div className="flex flex-col overflow-y-auto h-[calc(100vh-56px)]">
          {/* Categories */}
          <div className="flex flex-col px-6 pt-6">
            {NAV_CATEGORIES.map((item, index) => (
              <Link
                key={item.href + item.label}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                style={{ transitionDelay: `${index * 40}ms` }}
                className={`flex items-center justify-between py-4 border-b border-gray-100 text-lg font-semibold text-[#1a1a1a] transition-all duration-500 ${
                  isMenuOpen
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-4 opacity-0"
                }`}
              >
                {item.label}
                <ChevronDown className="h-4 w-4 -rotate-90 text-gray-400" />
              </Link>
            ))}
          </div>



          {/* CTA */}
          <div
            className={`mt-8 px-6 pb-10 transition-all duration-700 delay-400 ${
              isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <Link
              href="/shop"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center justify-center rounded-full bg-black py-4 text-[15px] font-bold text-white shadow-[0_20px_40px_rgba(0,0,0,0.12)] active:scale-95 transition-transform"
            >
              เลือกซื้อสินค้า
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

function CartBadge() {
  const { totalItems } = useCart();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || totalItems === 0) return null;

  return (
    <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#0071e3] text-[10px] font-bold text-white">
      {totalItems}
    </span>
  );
}
