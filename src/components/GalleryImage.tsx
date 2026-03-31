import React, { useState } from 'react';
import { cn } from '../lib/utils';

type GalleryImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  aspectRatio?: string;
  className?: string;
  imageClassName?: string;
  loading?: 'eager' | 'lazy';
  sizes?: string;
};

export default function GalleryImage({
  src,
  alt,
  width,
  height,
  aspectRatio,
  className,
  imageClassName,
  loading = 'lazy',
  sizes,
}: GalleryImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={cn('relative overflow-hidden bg-white/5', className)}
      style={{ aspectRatio: aspectRatio ?? `${width} / ${height}` }}
    >
      <div
        className={cn(
          'absolute inset-0 flex items-center justify-center bg-industrial-slate transition-opacity duration-500',
          loaded ? 'opacity-0 pointer-events-none' : 'opacity-100 z-10'
        )}
      >
        {/* Subtle skeleton pulse background */}
        <div className="absolute inset-0 bg-white/5 animate-pulse" />
        {/* Spinning indicator */}
        <div className="relative w-8 h-8 rounded-full border-[3px] border-white/10 border-t-safety-orange animate-spin" />
      </div>
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        decoding="async"
        sizes={sizes}
        onLoad={() => setLoaded(true)}
        className={cn(
          'absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-500',
          loaded ? 'opacity-100' : 'opacity-0',
          imageClassName
        )}
      />
    </div>
  );
}
