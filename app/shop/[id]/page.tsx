"use client";

import { useEffect, useRef, useState, use } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Navbar } from "@/components/layout";
import { useCart } from "@/contexts/cart-context";
import {
  getDetailProductColorLabel,
  resolveProductPresentationByModelKey,
  type DetailProductColorKey,
  type SupportedProductModelKey,
} from "@/constants/products";
import { SHOP_PRODUCTS_DATA } from "@/constants";

type DetailProductColor = {
  assetColor: DetailProductColorKey;
  swatch: string;
};

type DetailProductGallery = {
  folder: string;
  colors: DetailProductColor[];
};

type GalleryImage = {
  src: string;
  colorLabel: string;
  viewLabel: string;
};

const DETAIL_PRODUCT_GALLERIES: Partial<Record<SupportedProductModelKey, DetailProductGallery>> = {
  "promax-p89": {
    folder: "P89",
    colors: [
      { assetColor: "orange", swatch: "#df8b43" },
      { assetColor: "blue", swatch: "#25314f" },
      { assetColor: "white", swatch: "#f2eee8" },
      { assetColor: "black", swatch: "#262626" },
    ],
  },
  "promax-p63": {
    folder: "P63",
    colors: [
      { assetColor: "black", swatch: "#252525" },
      { assetColor: "glod", swatch: "#d4bea0" },
    ],
  },
  "note-p65": {
    folder: "P65C",
    colors: [
      { assetColor: "black", swatch: "#2f3133" },
      { assetColor: "gray", swatch: "#8f969d" },
    ],
  },
  "enjoy-p65": {
    folder: "P65P",
    colors: [
      { assetColor: "black", swatch: "#202835" },
      { assetColor: "silver", swatch: "#dfe4ec" },
    ],
  },
  "tab-p68": {
    folder: "P68",
    colors: [
      { assetColor: "black", swatch: "#252525" },
      { assetColor: "gray", swatch: "#8f969d" },
      { assetColor: "blue", swatch: "#b7cee7" },
    ],
  },
};

function getDetailGalleryImages(gallery?: DetailProductGallery): GalleryImage[] {
  if (!gallery) return [];

  return gallery.colors.flatMap((color) => [
    {
      src: `/detail-products/rear-front/${gallery.folder}/${color.assetColor}.webp`,
      colorLabel: getDetailProductColorLabel(color.assetColor),
      viewLabel: "ด้านหน้าและด้านหลัง",
    },
    {
      src: `/detail-products/left-right-top-buttom/${gallery.folder}/${color.assetColor}.webp`,
      colorLabel: getDetailProductColorLabel(color.assetColor),
      viewLabel: "ด้านข้างและขอบเครื่อง",
    },
  ]);
}

export default function ProductConfigPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { addToCart } = useCart();
  const thumbnailScrollerRef = useRef<HTMLDivElement>(null);
  const dragStartXRef = useRef(0);
  const dragStartScrollLeftRef = useRef(0);
  const hasDraggedThumbnailRef = useRef(false);
  const thumbnailButtonRefs = useRef<Array<HTMLButtonElement | null>>([]);
  
  const productData = SHOP_PRODUCTS_DATA[id as keyof typeof SHOP_PRODUCTS_DATA];
  
  const presentation = resolveProductPresentationByModelKey(id as SupportedProductModelKey);
  const { modelName, template } = presentation;
  const detailGallery = DETAIL_PRODUCT_GALLERIES[id as SupportedProductModelKey];
  const galleryImages = getDetailGalleryImages(detailGallery);

  const [selectedColor, setSelectedColor] = useState(
    detailGallery?.colors[0]
      ? getDetailProductColorLabel(detailGallery.colors[0].assetColor)
      : template.finishes[0]?.name || "Original"
  );
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedStorage, setSelectedStorage] = useState<string>(productData?.storages[0] || "256 GB");

  useEffect(() => {
    setSelectedColor(
      detailGallery?.colors[0]
        ? getDetailProductColorLabel(detailGallery.colors[0].assetColor)
        : template.finishes[0]?.name || "Original"
    );
    setActiveImageIndex(0);
  }, [detailGallery, template.finishes]);

  useEffect(() => {
    thumbnailButtonRefs.current[activeImageIndex]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [activeImageIndex, galleryImages.length]);

  if (!productData) return <div className="pt-24 text-center">สินค้าไม่พบ</div>;

  const currentPrice = productData.basePrice + (productData.priceDiffs[selectedStorage as keyof typeof productData.priceDiffs] || 0);
  const activeImage = galleryImages[activeImageIndex] || {
    src: productData.image,
    colorLabel: selectedColor,
    viewLabel: "สินค้า",
  };
  const colorOptions = detailGallery?.colors || template.finishes.map((finish) => ({
    assetColor: finish.name as DetailProductColorKey,
    swatch: finish.swatch,
  }));

  const handleColorSelect = (color: DetailProductColor) => {
    const colorLabel = getDetailProductColorLabel(color.assetColor);

    setSelectedColor(colorLabel);
    const nextImageIndex = galleryImages.findIndex(
      (image) => image.colorLabel === colorLabel
    );

    if (nextImageIndex >= 0) {
      setActiveImageIndex(nextImageIndex);
    }
  };

  const handleImageSelect = (imageIndex: number) => {
    if (hasDraggedThumbnailRef.current) {
      hasDraggedThumbnailRef.current = false;
      return;
    }

    setActiveImageIndex(imageIndex);
    setSelectedColor(galleryImages[imageIndex]?.colorLabel || selectedColor);
  };

  const handleThumbnailPointerDown = (
    event: React.PointerEvent<HTMLDivElement>
  ) => {
    const scroller = thumbnailScrollerRef.current;
    if (!scroller) return;

    dragStartXRef.current = event.clientX;
    dragStartScrollLeftRef.current = scroller.scrollLeft;
    hasDraggedThumbnailRef.current = false;
    scroller.setPointerCapture(event.pointerId);
  };

  const handleThumbnailPointerMove = (
    event: React.PointerEvent<HTMLDivElement>
  ) => {
    const scroller = thumbnailScrollerRef.current;
    if (!scroller || !scroller.hasPointerCapture(event.pointerId)) return;

    const dragDistance = event.clientX - dragStartXRef.current;

    if (Math.abs(dragDistance) > 4) {
      hasDraggedThumbnailRef.current = true;
    }

    scroller.scrollLeft = dragStartScrollLeftRef.current - dragDistance;
  };

  const handleThumbnailPointerEnd = (
    event: React.PointerEvent<HTMLDivElement>
  ) => {
    const scroller = thumbnailScrollerRef.current;
    if (!scroller?.hasPointerCapture(event.pointerId)) return;

    scroller.releasePointerCapture(event.pointerId);
  };

  const goToPreviousImage = () => {
    if (galleryImages.length === 0) return;

    const nextIndex =
      activeImageIndex === 0 ? galleryImages.length - 1 : activeImageIndex - 1;
    handleImageSelect(nextIndex);
  };

  const goToNextImage = () => {
    if (galleryImages.length === 0) return;

    const nextIndex =
      activeImageIndex === galleryImages.length - 1 ? 0 : activeImageIndex + 1;
    handleImageSelect(nextIndex);
  };

  const handleAddToCart = () => {
    addToCart({
      id: `${id}-${selectedColor}-${selectedStorage}`,
      productId: id,
      name: modelName,
      image: productData.image,
      color: selectedColor,
      storage: selectedStorage,
      priceValue: currentPrice,
      quantity: 1
    });
    router.push("/cart");
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="px-4 pb-20 pt-20 sm:px-6 lg:pt-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
          
          <div className="h-fit lg:sticky lg:top-32">
            <div className="relative flex min-h-[430px] w-full flex-col items-center justify-between overflow-hidden rounded-3xl bg-[#f5f5f7] px-3 py-5 sm:min-h-[520px] sm:px-4 sm:py-6">
              <button
                type="button"
                onClick={goToPreviousImage}
                className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-[#1d1d1f] shadow-sm transition hover:bg-white disabled:opacity-40 sm:left-4 sm:h-11 sm:w-11"
                aria-label="ดูรูปก่อนหน้า"
                disabled={galleryImages.length <= 1}
              >
                <ChevronLeft className="h-6 w-6" aria-hidden="true" />
              </button>

              <div className="relative h-[300px] w-full sm:h-[390px]">
                <Image
                  src={activeImage.src}
                  alt={`${modelName} สี${activeImage.colorLabel} ${activeImage.viewLabel}`}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-contain p-4"
                  priority
                />
              </div>

              <button
                type="button"
                onClick={goToNextImage}
                className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-[#1d1d1f] shadow-sm transition hover:bg-white disabled:opacity-40 sm:right-4 sm:h-11 sm:w-11"
                aria-label="ดูรูปถัดไป"
                disabled={galleryImages.length <= 1}
              >
                <ChevronRight className="h-6 w-6" aria-hidden="true" />
              </button>

              {galleryImages.length > 0 && (
                <div
                  ref={thumbnailScrollerRef}
                  onPointerDown={handleThumbnailPointerDown}
                  onPointerMove={handleThumbnailPointerMove}
                  onPointerUp={handleThumbnailPointerEnd}
                  onPointerCancel={handleThumbnailPointerEnd}
                  className="flex w-full cursor-grab touch-pan-x select-none gap-3 overflow-x-auto px-2 pb-1 active:cursor-grabbing [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                >
                  <div className="shrink-0 basis-[calc(50%_-_32px)] sm:basis-[calc(50%_-_40px)]" aria-hidden="true" />
                  {galleryImages.map((image, imageIndex) => (
                    <button
                      ref={(element) => {
                        thumbnailButtonRefs.current[imageIndex] = element;
                      }}
                      key={`${image.src}-${imageIndex}`}
                      type="button"
                      onClick={() => handleImageSelect(imageIndex)}
                      className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border bg-white transition sm:h-20 sm:w-20 ${
                        activeImageIndex === imageIndex
                          ? "border-[#1d1d1f]"
                          : "border-transparent hover:border-gray-300"
                      }`}
                      aria-label={`ดู${image.viewLabel} สี${image.colorLabel}`}
                    >
                      <Image
                        src={image.src}
                        alt=""
                        fill
                        sizes="80px"
                        className="object-contain p-2"
                      />
                    </button>
                  ))}
                  <div className="shrink-0 basis-[calc(50%_-_32px)] sm:basis-[calc(50%_-_40px)]" aria-hidden="true" />
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col">
            <p className="text-[#1d1d1f] font-semibold text-sm mb-2">{template.category}</p>
            <h1 className="mb-6 text-3xl font-semibold leading-tight md:mb-8 md:text-5xl">{modelName}</h1>
            
            <section className="mb-10">
              <h3 className="text-sm font-semibold mb-4 text-[#1d1d1f]">เลือกสี: <span className="text-[#6e6e73] font-normal">{selectedColor}</span></h3>
              <div className="flex gap-4">
                {colorOptions.map((finish) => (
                  <button
                    key={finish.assetColor}
                    type="button"
                    onClick={() => handleColorSelect(finish)}
                    className={`group relative flex h-10 w-10 items-center justify-center rounded-full p-0.5 transition-all
                      ${selectedColor === getDetailProductColorLabel(finish.assetColor) ? "ring-2 ring-[#0071e3] ring-offset-2" : "ring-1 ring-gray-200 hover:ring-gray-400"}
                    `}
                    aria-label={`เลือก${getDetailProductColorLabel(finish.assetColor)}`}
                  >
                    <span 
                      className="h-full w-full rounded-full" 
                      style={{ backgroundColor: finish.swatch }}
                    />
                  </button>
                ))}
              </div>
            </section>

            <section className="mb-10">
              <h3 className="text-sm font-semibold mb-4 text-[#1d1d1f]">เลือกความจุ:</h3>
              <div className="grid grid-cols-1 gap-4">
                {productData.storages.map((storage) => {
                  const diff = productData.priceDiffs[storage as keyof typeof productData.priceDiffs];
                  const price = productData.basePrice + diff;
                  return (
                    <button
                      key={storage}
                      onClick={() => setSelectedStorage(storage)}
                      className={`flex items-center justify-between p-6 rounded-2xl border-2 transition-all text-left
                        ${selectedStorage === storage 
                          ? "border-[#0071e3] bg-[#f5faff] shadow-sm" 
                          : "border-gray-200 hover:border-gray-400"}
                      `}
                    >
                      <div>
                        <p className="font-semibold text-lg">{storage}</p>
                        <p className="text-sm text-[#6e6e73]">พื้นที่เก็บข้อมูลเยอะจุใจ</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-lg">฿{price.toLocaleString()}</p>
                        {diff > 0 && <p className="text-xs text-[#0071e3] font-medium">+฿{diff.toLocaleString()}</p>}
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>

            <div className="mt-8 pt-8 border-t border-gray-200">
               <div className="flex items-center justify-between mb-8">
                 <span className="text-2xl font-semibold text-[#1d1d1f]">ราคารวม</span>
                 <span className="text-3xl font-bold text-[#1d1d1f]">฿{currentPrice.toLocaleString()}</span>
               </div>
               
               <div className="grid grid-cols-1 gap-4">
                 <button
                   onClick={handleAddToCart}
                   className="w-full rounded-full bg-[#0071e3] py-5 text-lg font-semibold text-white transition-all hover:bg-[#0077ed] active:scale-[0.98]"
                 >
                   เพิ่มลงตะกร้า
                 </button>
               </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
