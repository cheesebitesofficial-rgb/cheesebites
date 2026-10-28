import React from 'react';
import { ArrowRight } from 'lucide-react';
import type { Category } from '../../types';

interface CategoryCardProps {
  category: Category;
  image: string;
  count: number;
  isSelected?: boolean;
  onClick: () => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  image,
  count,
  isSelected,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        e.currentTarget.style.transform = `perspective(1000px) rotateX(${y * -16}deg) rotateY(${x * 16}deg) scale3d(1.04, 1.04, 1.04)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      }}
      className={`group relative rounded-3xl overflow-hidden text-left transition-transform duration-200 border cursor-pointer transform-gpu ${
        isSelected
          ? 'border-amber-400 ring-4 ring-amber-500/40 shadow-[0_10px_30px_rgba(245,158,11,0.45)]'
          : 'border-amber-500/20 hover:border-amber-400/80 hover:shadow-[0_20px_45px_rgba(245,158,11,0.3)]'
      }`}
    >
      <div className="aspect-[4/3] w-full relative overflow-hidden bg-[#07070b]">
        {/* High-Quality Bright Food Image */}
        <img
          src={image}
          alt={category}
          className="w-full h-full object-cover group-hover:scale-115 transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100 filter drop-shadow-[0_10px_15px_rgba(0,0,0,0.8)]"
          loading="lazy"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0d] via-[#0a0a0d]/40 to-transparent opacity-90 group-hover:opacity-60 transition-opacity duration-500" />

        {/* Golden Shimmer Ring */}
        <div className="absolute inset-0 border-2 border-amber-400/0 group-hover:border-amber-400/40 rounded-3xl transition-colors duration-500 pointer-events-none" />

        {/* Themed Hover Arrow Indicator */}
        <div className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-gradient-to-tr from-amber-500 via-orange-500 to-amber-400 text-gray-950 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-3 group-hover:translate-x-0 shadow-[0_0_20px_rgba(245,158,11,0.7)] border border-amber-200">
          <ArrowRight className="w-4 h-4 text-gray-950" strokeWidth={3} />
        </div>

        {/* Text Content */}
        <div className="absolute bottom-4 left-4 right-4 z-10">
          <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 block mb-1">
            Category
          </span>
          <h3 className="text-white font-black text-lg sm:text-xl leading-tight uppercase group-hover:text-amber-300 transition-colors drop-shadow-md">
            {category}
          </h3>
          <span className="text-xs font-extrabold text-gray-300 block mt-1">
            {count} {count === 1 ? 'Delicious Item' : 'Delicious Items'}
          </span>
        </div>
      </div>
    </button>
  );
};
