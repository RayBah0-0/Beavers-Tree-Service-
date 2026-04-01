import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ZoomIn, X, TreeDeciduous } from 'lucide-react';

const PROJECT_PHOTOS = [
  { file: 'showcase.jpg', caption: 'Sod Installation' },
  { file: 'showcase (2).jpg', caption: 'Stump Removal' },
  { file: 'showcase (3).jpg', caption: 'Tree Removal' },
  { file: 'showcase (4).jpg', caption: 'Crane Service' },
  { file: 'showcase (5).jpg', caption: 'Emergency Response' },
  { file: 'showcase (6).jpg', caption: 'Retaining Wall' },
  { file: 'showcase (7).jpg', caption: 'Paver Installation' },
  { file: 'showcase (8).jpg', caption: 'Tree Trimming' },
];

function RevealSection({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number; key?: React.Key }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transitionDelay = `${delay}ms`;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('ag-visible'); observer.disconnect(); } },
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);
  return <div ref={ref} className={`ag-fade-rise ${className}`}>{children}</div>;
}

function SilhouetteSlide({ side }: { side: 'left' | 'right' }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transitionDelay = '200ms';
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('ag-visible'); observer.disconnect(); } },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className={side === 'left' ? 'ag-slide-left' : 'ag-slide-right'}>
      <TreeDeciduous className="silhouette-icon w-16 h-16 md:w-24 md:h-24" />
    </div>
  );
}

export default function Gallery() {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [lightboxCaption, setLightboxCaption] = useState('');

  return (
    <div className="w-full font-sans text-black bg-white">

      {/* 1. SIGNATURE SILHOUETTE HEADER */}
      <section className="bg-white border-b-4 border-black overflow-hidden py-6">
        <div className="max-w-5xl mx-auto px-6">
          <div className="silhouette-header">
            <SilhouetteSlide side="left" />
            <RevealSection className="flex flex-col items-center text-center flex-1 max-w-2xl">
              <span className="font-display font-bold uppercase tracking-widest text-[#FF8200] text-sm mb-2 block">
                Our Work
              </span>
              <h1 className="text-4xl md:text-6xl font-display font-black text-black uppercase tracking-wide leading-tight">
                PROJECT GALLERY
              </h1>
            </RevealSection>
            <SilhouetteSlide side="right" />
          </div>
        </div>
      </section>

      {/* 2. GALLERY GRID — Shadow-Mask hover system */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <RevealSection>
            <h2 className="text-4xl md:text-5xl font-display font-black text-black mb-4 leading-tight uppercase">
              OUR LATEST <span className="text-[#FF8200]">WORK</span>
            </h2>
            <p className="text-lg text-black/60 max-w-2xl mx-auto mb-16 font-medium leading-relaxed">
              Browse through our recent tree removals, emergency storm cleanups, and precision landscaping projects across the Triangle area.
            </p>
          </RevealSection>

          {/* 
            Shadow-Mask Gallery: 2rem gap between images.
            Hover over one → it expands, siblings dim to 0.7 opacity.
          */}
          <div className="gallery-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {PROJECT_PHOTOS.map((photo, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.06, duration: 0.45 }}
                onClick={() => {
                  setLightboxImage(`/${photo.file}`);
                  setLightboxCaption(photo.caption);
                }}
                className="gallery-item group relative self-start overflow-hidden rounded shadow-md cursor-pointer aspect-[4/5]"
              >
                <img
                  src={`/${photo.file}`}
                  className="w-full h-full object-cover"
                  alt={`Beavers Tree Service — ${photo.caption}`}
                  loading="lazy"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/55 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center pointer-events-none">
                  <ZoomIn className="w-10 h-10 text-white mb-2" />
                  <span className="text-white font-bold text-sm uppercase tracking-widest">{photo.caption}</span>
                </div>
                {/* Orange bottom bar */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#FF8200] opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/96 p-4 md:p-12 cursor-zoom-out backdrop-blur-sm"
            onClick={() => setLightboxImage(null)}
          >
            <motion.img
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              src={lightboxImage}
              alt={`Enlarged — ${lightboxCaption}`}
              className="max-h-[80vh] max-w-full object-contain shadow-2xl rounded"
            />
            {lightboxCaption && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 px-6 py-2 bg-[#FF8200] rounded text-black font-black uppercase tracking-widest text-sm"
                onClick={(e) => e.stopPropagation()}
              >
                {lightboxCaption}
              </motion.div>
            )}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxImage(null);
              }}
              className="fixed top-6 right-8 text-white/60 hover:text-[#FF8200] transition-colors"
              aria-label="Close lightbox"
            >
              <X className="w-12 h-12" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
