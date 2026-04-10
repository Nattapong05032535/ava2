"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/cart-context";
import { Store, ShoppingBag, Search, Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { href: "/", label: "หน้าหลัก" },
  { href: "/articles", label: "บทความ" },
  { href: "/about", label: "เกี่ยวกับเรา" },
  { href: "/service-center", label: "ศูนย์บริการ" },
] as const;

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-black/8 bg-white shadow-[0_10px_28px_rgba(15,23,42,0.04)]">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-[linear-gradient(90deg,transparent,rgba(37,99,235,0.18),transparent)]" />

      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-6">
        <Link href="/" className="group flex items-center gap-3">
          <div className="relative h-10 w-10 transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/images/logo/icon-logo.png"
              alt="AVA Logo"
              fill
              sizes="40px"
              className="object-contain"
              priority
            />
          </div>
          <div className="hidden min-[880px]:block">
            <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-gray-600">
              AVA Official Store
            </p>
            <p className="mt-1 text-xs text-black/52">
              Luxury mobile collection
            </p>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center rounded-full border border-gray-200 bg-white px-6 py-2.5 shadow-[0_8px_24px_rgba(15,23,42,0.05)]">
          <div className="flex items-center gap-8 text-sm font-medium">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-500 transition-colors hover:text-black"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition-colors hover:text-black">
            <Search className="h-5 w-5" strokeWidth={1.8} />
          </button>
          
          <Link
            href="/cart"
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition-colors hover:text-black"
          >
            <ShoppingBag className="h-5 w-5" strokeWidth={1.8} />
            <CartBadge />
          </Link>

          <Link
            href="/shop"
            className="flex h-10 items-center justify-center rounded-full bg-[#111111] text-white shadow-[0_12px_30px_rgba(17,17,17,0.16)] transition-all hover:scale-[1.05] active:scale-95 px-3 md:px-6"
          >
            <span className="hidden md:block text-xs font-semibold">เลือกซื้อสินค้า</span>
            <Store className="h-5 w-5 md:hidden" strokeWidth={2} />
          </Link>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-black/8 bg-white md:hidden"
          >
            <Menu className="h-5 w-5" strokeWidth={1.8} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-[60] bg-white/95 backdrop-blur-2xl transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] md:hidden ${
          isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
        }`}
      >
        <div className="flex h-18 items-center justify-between px-6 border-b border-gray-100/50">
          <Link href="/" onClick={() => setIsMenuOpen(false)}>
            <div className="relative h-10 w-10">
              <Image
                src="/images/logo/icon-logo.png"
                alt="AVA Logo"
                fill
                className="object-contain"
              />
            </div>
          </Link>
          <button 
            onClick={() => setIsMenuOpen(false)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100/80 text-gray-900 transition-transform active:scale-95"
          >
            <X className="h-5 w-5" strokeWidth={2} />
          </button>
        </div>

        <div className="flex flex-col p-8 pt-12 gap-8">
          <div className="flex flex-col gap-6">
            {NAV_ITEMS.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                style={{ transitionDelay: `${index * 50}ms` }}
                className={`text-3xl font-bold tracking-tight text-gray-900 transition-all duration-500 ${
                  isMenuOpen ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div 
            className={`mt-4 transition-all duration-700 delay-300 ${
              isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <Link
              href="/shop"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center justify-center rounded-full bg-black py-4.5 text-[15px] font-bold text-white shadow-[0_20px_40px_rgba(0,0,0,0.15)] active:scale-95 transition-transform"
            >
              เลือกซื้อสินค้า
            </Link>
          </div>

          <div 
            className={`mt-auto border-t border-gray-100 pt-8 transition-all duration-700 delay-400 ${
              isMenuOpen ? "opacity-100" : "opacity-0"
            }`}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400 mb-4">ฝ่ายสนับสนุน</p>
            <div className="flex flex-col gap-4 text-sm font-medium text-gray-600">
               <Link href="/service-center" onClick={() => setIsMenuOpen(false)}>ศูนย์ช่วยเหลือ</Link>
               <Link href="/about" onClick={() => setIsMenuOpen(false)}>ติดต่อเรา</Link>
            </div>
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
    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#0071e3] text-[10px] font-bold text-white">
      {totalItems}
    </span>
  );
}
