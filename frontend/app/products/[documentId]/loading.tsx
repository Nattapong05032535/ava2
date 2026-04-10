import { Navbar } from "@/components/navbar";

export default function ProductDetailLoading() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="pt-18">
        <div className="sticky top-18 z-40 border-b border-black/8 bg-white">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
            <div className="space-y-2">
              <div className="h-3 w-40 animate-pulse rounded-full bg-gray-200" />
              <div className="h-4 w-56 animate-pulse rounded-full bg-gray-200" />
            </div>
            <div className="hidden md:flex items-center gap-2 rounded-full border border-gray-200 bg-white p-1.5">
              <div className="h-9 w-20 animate-pulse rounded-full bg-gray-100" />
              <div className="h-9 w-20 animate-pulse rounded-full bg-gray-100" />
              <div className="h-9 w-20 animate-pulse rounded-full bg-gray-100" />
              <div className="h-9 w-20 animate-pulse rounded-full bg-gray-100" />
            </div>
          </div>
        </div>

        <section className="overflow-hidden border-b border-black/6 bg-[#f5f5f7]">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
            <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <div className="h-3 w-40 animate-pulse rounded-full bg-gray-200" />
                <div className="mt-5 flex gap-3">
                  <div className="h-8 w-32 animate-pulse rounded-full bg-white" />
                  <div className="h-8 w-40 animate-pulse rounded-full bg-white" />
                </div>
                <div className="mt-7 h-16 max-w-3xl animate-pulse rounded-[2rem] bg-white" />
                <div className="mt-5 h-10 max-w-2xl animate-pulse rounded-[2rem] bg-white" />
                <div className="mt-5 h-8 max-w-xl animate-pulse rounded-[2rem] bg-white" />
                <div className="mt-4 h-8 max-w-2xl animate-pulse rounded-[2rem] bg-white" />
                <div className="mt-8 flex gap-4">
                  <div className="h-12 w-32 animate-pulse rounded-full bg-gray-900/10" />
                  <div className="h-12 w-32 animate-pulse rounded-full bg-white" />
                </div>
              </div>

              <div className="relative mx-auto h-105 w-full max-w-155 rounded-[3rem] bg-white/70 shadow-[0_24px_60px_rgba(15,23,42,0.06)]">
                <div className="absolute inset-[12%] animate-pulse rounded-[2.5rem] bg-gray-100" />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
