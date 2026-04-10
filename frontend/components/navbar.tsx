"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/cart-context";

const NAV_ITEMS = [
  { href: "/", label: "หน้าหลัก" },
  { href: "/articles", label: "บทความ q&a" },
  { href: "/about", label: "about" },
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
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </button>
          
          <Link
            href="/cart"
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition-colors hover:text-black"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
            <CartBadge />
          </Link>

          <Link
            href="/shop"
            className="hidden sm:block rounded-full bg-[#111111] px-6 py-2.5 text-xs font-semibold text-white shadow-[0_12px_30px_rgba(17,17,17,0.16)] transition-transform hover:scale-[1.02]"
          >
            เลือกซื้อสินค้า
          </Link>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-black/8 bg-white md:hidden"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-white md:hidden">
          <div className="flex h-18 items-center justify-between px-6 border-b border-gray-100">
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
              className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-500"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex flex-col p-6 gap-6">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-2xl font-semibold text-gray-900"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/shop"
              onClick={() => setIsMenuOpen(false)}
              className="mt-4 flex items-center justify-center rounded-full bg-black py-4 text-sm font-semibold text-white"
            >
              เลือกซื้อสินค้า
            </Link>
          </div>
        </div>
      )}
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
