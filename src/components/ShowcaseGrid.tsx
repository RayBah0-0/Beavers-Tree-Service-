import React, { useState } from 'react';
import { cn } from '../lib/utils';
import GalleryImage from './GalleryImage';
import { showcaseCategories, showcaseItems } from '../data/projectGallery';

export default function ShowcaseGrid() {
  const [activeTab, setActiveTab] = useState(showcaseCategories[0].slug);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const filteredItems = showcaseItems.filter((item) => item.category === activeTab);

  return (
    <div className="w-full">
      <div className="mb-12 flex flex-wrap justify-center gap-4">
        {showcaseCategories.map((category) => (
          <button
            key={category.slug}
            type="button"
            onClick={() => setActiveTab(category.slug)}
            className={cn(
              'px-8 py-2 font-display font-bold text-sm uppercase tracking-widest border transition-all duration-300',
              activeTab === category.slug
                ? 'bg-safety-orange border-safety-orange text-white'
                : 'border-white/10 text-white/50 hover:border-white/30 hover:text-white'
            )}
          >
            {category.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setLightboxImage(item.image)}
            className="group relative aspect-square overflow-hidden rounded-sm border border-white/10 cursor-pointer"
          >
            <GalleryImage
              src={item.image}
              alt={item.title}
              width={item.width}
              height={item.height}
              loading="lazy"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              className="h-full w-full"
              imageClassName="group-hover:scale-105"
            />
          </div>
        ))}
      </div>

      {lightboxImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 md:p-12 cursor-zoom-out backdrop-blur-sm"
          onClick={() => setLightboxImage(null)}
        >
          <img 
            src={lightboxImage} 
            alt="Enlarged showcase view" 
            className="max-h-full max-w-full object-contain shadow-2xl"
          />
          <button 
            type="button"
            onClick={() => setLightboxImage(null)}
            className="fixed top-6 right-8 text-white/50 text-5xl hover:text-safety-orange transition-colors"
          >
            &times;
          </button>
        </div>
      )}
    </div>
  );
}
