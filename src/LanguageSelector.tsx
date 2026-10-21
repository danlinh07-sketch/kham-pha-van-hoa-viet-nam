import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Language } from '../types';
import { Globe, Check, ChevronDown } from 'lucide-react';

interface LanguageOption {
  code: Language;
  label: string;
  nativeName: string;
  flag: string;
}

const LANGUAGES: LanguageOption[] = [
  { code: 'vi', label: 'Tiếng Việt', nativeName: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'en', label: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'zh', label: 'Chinese', nativeName: '中文 (简体)', flag: '🇨🇳' },
  { code: 'ko', label: 'Korean', nativeName: '한국어', flag: '🇰🇷' },
];

export const LanguageSelector: React.FC<{ variant?: 'desktop' | 'mobile' }> = ({ variant = 'desktop' }) => {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (code: Language) => {
    setLanguage(code);
    setIsOpen(false);
  };

  if (variant === 'mobile') {
    return (
      <div className="pt-2 border-t border-stone-200">
        <div className="flex items-center justify-between px-3 py-1 text-xs font-semibold text-stone-500 uppercase tracking-wider">
          <span className="flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-stone-600" />
            {t('lang.select', 'Ngôn ngữ / Language')}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-1.5 p-2 bg-stone-100/70 rounded-xl mt-1">
          {LANGUAGES.map((item) => {
            const isSelected = language === item.code;
            return (
              <button
                key={item.code}
                onClick={() => handleSelect(item.code)}
                className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-sans transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-white text-[#9E2A2B] font-bold shadow-xs border border-stone-200/80'
                    : 'text-stone-700 hover:bg-stone-200/60 font-medium'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className="text-base">{item.flag}</span>
                  <span>{item.nativeName}</span>
                </span>
                {isSelected && <Check className="w-3.5 h-3.5 text-[#9E2A2B]" />}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-stone-200 hover:border-stone-300 bg-stone-50/70 hover:bg-stone-100 text-xs font-sans font-medium text-stone-700 hover:text-stone-900 transition-colors cursor-pointer"
        aria-label={t('lang.select', 'Chọn ngôn ngữ')}
        title={t('lang.select', 'Chọn ngôn ngữ')}
      >
        <Globe className="w-3.5 h-3.5 text-[#9E2A2B]" />
        <span className="font-semibold uppercase tracking-wider">{currentLang.code}</span>
        <ChevronDown className={`w-3 h-3 text-stone-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white border border-stone-200 shadow-lg py-1.5 z-50 animate-fadeIn">
          <div className="px-3 py-1.5 text-[11px] font-semibold text-stone-400 uppercase tracking-wider border-b border-stone-100">
            {t('lang.select', 'Chọn ngôn ngữ')}
          </div>
          {LANGUAGES.map((item) => {
            const isSelected = language === item.code;
            return (
              <button
                key={item.code}
                onClick={() => handleSelect(item.code)}
                className={`w-full flex items-center justify-between px-3.5 py-2 text-xs font-sans transition-colors cursor-pointer text-left ${
                  isSelected
                    ? 'bg-[#9E2A2B]/10 text-[#9E2A2B] font-semibold'
                    : 'text-stone-700 hover:bg-stone-50 hover:text-stone-950'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-base">{item.flag}</span>
                  <div>
                    <div className="font-medium">{item.nativeName}</div>
                    <div className="text-[10px] text-stone-400 uppercase font-mono">{item.code}</div>
                  </div>
                </div>
                {isSelected && <Check className="w-4 h-4 text-[#9E2A2B]" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
