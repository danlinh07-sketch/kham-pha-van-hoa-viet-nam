import React, { useState } from 'react';
import { Utensils, Compass, BookOpen, MapPin } from 'lucide-react';

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
  type?: 'culinary' | 'culture' | 'province' | 'tourism';
  title?: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  className = '',
  type = 'culinary',
  title = '',
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    const Icon =
      type === 'culinary'
        ? Utensils
        : type === 'culture'
        ? BookOpen
        : type === 'tourism'
        ? Compass
        : MapPin;

    return (
      <div
        className={`w-full h-full flex flex-col items-center justify-center bg-stone-800 text-stone-300 p-4 select-none ${className}`}
      >
        <Icon className="w-8 h-8 text-[#C28B38] mb-2 opacity-80" />
        <span className="text-xs font-serif font-medium text-center text-stone-200 line-clamp-2 px-2">
          {title || alt}
        </span>
        <span className="text-[10px] text-stone-400 mt-1 uppercase tracking-wider">
          Viet Discover Archive
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      loading="lazy"
      onError={() => setHasError(true)}
      className={className}
    />
  );
};
