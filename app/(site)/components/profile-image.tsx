"use client";

import Image from "next/image";

interface ProfileImageProps {
  src: string;
  className: string;
  alt: string;
  width: number;
  height: number;
}

export default function ProfileImage({
  src,
  className,
  alt,
  width,
  height,
}: ProfileImageProps) {
  return (
    <Image
      src={src}
      className={className}
      alt={alt}
      width={width}
      height={height}
    />
  );
}
