import Image from "next/image";
import type { SanityImage } from "@/types/sanity";

type CmsImageProps = {
  image?: SanityImage;
  alt?: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  sizes?: string;
  fallbackLabel?: string;
};

export function CmsImage({
  image,
  alt,
  className = "aspect-[16/10]",
  imageClassName = "object-cover",
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
  fallbackLabel = "Image",
}: CmsImageProps) {
  return (
    <div className={`relative overflow-hidden bg-[#1e6f9b] ${className}`}>
      {image?.url ? (
        <Image
          src={image.url}
          alt={image.alt || alt || fallbackLabel}
          fill
          sizes={sizes}
          className={imageClassName}
          priority={priority}
        />
      ) : (
        <div className="flex h-full w-full flex-col justify-end bg-[radial-gradient(circle_at_20%_18%,rgba(255,255,255,0.32),transparent_35%),linear-gradient(135deg,#1e6f9b,#31b2b6)] p-5 text-white">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
            Image Slot
          </span>
          <span className="mt-2 text-lg font-semibold">{fallbackLabel}</span>
        </div>
      )}
    </div>
  );
}
