import React from 'react';
import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';
import { cn } from '../lib/utils';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  image: string;
  index: number;
}

export default function ServiceCard({ title, description, icon: Icon, image, index }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        type: 'spring',
        bounce: 0.3
      }}
      className="group relative overflow-hidden aspect-[4/5] border border-white/10 rounded-sm orange-glow-hover transition-all duration-500"
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
        style={{ backgroundImage: `url("${image}")` }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 group-hover:opacity-80 transition-opacity" />
      
      {/* Content */}
      <div className="absolute inset-0 p-8 flex flex-col justify-end">
        <div className="mb-4 bg-[#FF8200] w-12 h-12 flex items-center justify-center rounded-sm transform group-hover:rotate-12 transition-transform">
          <Icon className="w-6 h-6 text-black" />
        </div>
        
        <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-[#FF8200] transition-colors">
          {title}
        </h3>
        
        <p className="text-white/80 text-sm font-sans leading-relaxed transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          {description}
        </p>
        
        <div className="mt-6 h-1 w-0 bg-[#FF8200] group-hover:w-full transition-all duration-500" />
      </div>

      <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#FF8200]/50 transition-colors pointer-events-none" />
      
    </motion.div>
  );
}
