"use client";

import Image, { ImageProps } from "next/image";
import { useState, useEffect, SyntheticEvent } from "react";

type ImageWithFallbackProps = ImageProps & {
  fallback: string;
};

export default function ImageWithFallback({
  fallback,
  alt,
  src,
  ...props
}: ImageWithFallbackProps) {
  const [error, setError] = useState<SyntheticEvent<
    HTMLImageElement,
    Event
  > | null>(null);

  useEffect(() => {
    setError(null);
  }, [src]);

  return (
    <Image
      alt={alt}
      onError={setError}
      src={error ? fallback : src}
      {...props}
    />
  );
}
