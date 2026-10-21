import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'hero';
  showSlogan?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', showSlogan = false, className = '' }) => {
  const logoSrc = '/src/assets/images/viet_discover_app_logo_1792479385154.jpg';

  if (size === 'sm') {
    return (
      <div className={`flex items-center gap-2.5 ${className}`}>
        <img
          src={logoSrc}
          alt="VIET DISCOVER Logo"
          referrerPolicy="no-referrer"
          className="w-9 h-9 rounded-lg object-cover shadow-xs border border-amber-900/10"
        />
        <div className="flex flex-col">
          <span className="font-serif font-bold text-base tracking-tight text-[#9E2A2B] leading-none">
            VIET <span className="text-[#1B4332]">DISCOVER</span>
          </span>
          <span className="text-[10px] text-stone-500 font-medium tracking-wider">ẨM THỰC & VĂN HÓA</span>
        </div>
      </div>
    );
  }

  if (size === 'md') {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <img
          src={logoSrc}
          alt="VIET DISCOVER Logo"
          referrerPolicy="no-referrer"
          className="w-11 h-11 rounded-xl object-cover shadow-sm border border-amber-900/15"
        />
        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <span className="font-serif font-bold text-lg tracking-tight text-[#9E2A2B]">VIET</span>
            <span className="font-serif font-bold text-lg tracking-tight text-[#1B4332]">DISCOVER</span>
          </div>
          {showSlogan && (
            <span className="text-xs text-stone-600 italic -mt-0.5 font-serif">
              Chạm vào hương vị — Khám phá linh hồn Việt
            </span>
          )}
        </div>
      </div>
    );
  }

  if (size === 'hero') {
    return (
      <div className={`flex flex-col items-center text-center ${className}`}>
        <div className="relative group">
          <img
            src={logoSrc}
            alt="VIET DISCOVER Logo"
            referrerPolicy="no-referrer"
            className="w-28 h-28 md:w-36 md:h-36 rounded-2xl object-cover shadow-lg border-2 border-[#C28B38]/30 mb-4 transition-transform duration-300 group-hover:scale-102"
          />
        </div>
        <div className="flex items-center gap-2 text-2xl md:text-3xl font-serif font-bold tracking-tight">
          <span className="text-[#9E2A2B]">VIET</span>
          <span className="text-[#1B4332]">DISCOVER</span>
        </div>
        {showSlogan && (
          <p className="text-sm md:text-base text-stone-600 italic font-serif mt-1">
            “Chạm vào hương vị — Khám phá linh hồn Việt.”
          </p>
        )}
      </div>
    );
  }

  // size === 'lg'
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <img
        src={logoSrc}
        alt="VIET DISCOVER Logo"
        referrerPolicy="no-referrer"
        className="w-16 h-16 rounded-xl object-cover shadow-md border border-[#C28B38]/30"
      />
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span className="font-serif font-bold text-xl md:text-2xl text-[#9E2A2B]">VIET</span>
          <span className="font-serif font-bold text-xl md:text-2xl text-[#1B4332]">DISCOVER</span>
        </div>
        <span className="text-xs md:text-sm text-stone-600 italic font-serif">
          Chạm vào hương vị — Khám phá linh hồn Việt.
        </span>
      </div>
    </div>
  );
};
