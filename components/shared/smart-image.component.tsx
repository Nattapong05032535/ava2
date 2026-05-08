"use client";

import React, { useState, useEffect } from "react";
import Image, { ImageProps } from "next/image";

interface SmartImageProps extends Omit<ImageProps, "src" | "alt"> {
  src: string;
  alt: string;
}

export const SmartImage = ({ src, alt, ...props }: SmartImageProps) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setImgSrc(src);
    setHasError(false);
  }, [src]);

  const handleError = () => {
    if (!hasError) {
      const isWebp = imgSrc.toLowerCase().endsWith(".webp");
      const nextSrc = isWebp
        ? imgSrc.replace(/\.webp$/i, ".jpeg")
        : imgSrc.replace(/\.(jpeg|jpg)$/i, ".webp");

      setImgSrc(nextSrc);
      setHasError(true);
    }
  };

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt}
      onError={handleError}
    />
  );
};
