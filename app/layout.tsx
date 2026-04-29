import type { Metadata } from "next";
import { Inter, Sarabun } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/cart-context";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  adjustFontFallback: false,
});

const sarabun = Sarabun({
  variable: "--font-sarabun",
  subsets: ["thai", "latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "AVA Mobile",
  description: "AVA Mobile — Premium Smartphones",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="th"
      className={`${inter.variable} ${sarabun.variable} h-full antialiased`}
    >
      <body className="min-h-full selection:bg-primary/20 selection:text-primary">
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
