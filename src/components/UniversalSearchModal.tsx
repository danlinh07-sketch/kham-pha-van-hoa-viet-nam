import React, { useState, useEffect, useRef } from 'react';
import { DISHES_DATA } from '../data/culinaryData';
import { CULTURE_DATA } from '../data/cultureData';
import { PROVINCES_DATA } from '../data/regionData';
import { matchVietnamese } from '../utils/vietnameseSearch';
import { Dish, CultureArticle, ProvinceInfo } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { Search, X, Utensils, BookOpen, MapPin, ArrowRight } from 'lucide-react';

interface UniversalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDish: (dish: Dish) => void;
  onSelectCulture: (article: CultureArticle) => void;
  onSelectProvince: (province: ProvinceInfo) => void;
}

export const UniversalSearchModal: React.FC<UniversalSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectDish,
  onSelectCulture,
  onSelectProvince,
}) => {
  const { t, getLocalizedDish } = useLanguage();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const trimmed = query.trim();

  // Matched Dishes
  const matchedDishes = trimmed
    ? DISHES_DATA.filter(
        (d) =>
          matchVietnamese(d.name, trimmed) ||
          matchVietnamese(d.englishName, trimmed) ||
          matchVietnamese(d.province, trimmed) ||
          d.mainIngredients.some((i) => matchVietnamese(i, trimmed))
      ).slice(0, 5)
    : [];

  // Matched Culture Articles
  const matchedCulture = trimmed
    ? CULTURE_DATA.filter(
        (c) =>
          matchVietnamese(c.title, trimmed) ||
          matchVietnamese(c.subtitle, trimmed) ||
          matchVietnamese(c.categoryLabel, trimmed) ||
          matchVietnamese(c.summary, trimmed)
      ).slice(0, 4)
    : [];

  // Matched Provinces
  const matchedProvinces = trimmed
    ? PROVINCES_DATA.filter(
        (p) =>
          matchVietnamese(p.name, trimmed) ||
          matchVietnamese(p.regionName, trimmed) ||
          p.specialties.some((s) => matchVietnamese(s, trimmed))
      ).slice(0, 3)
    : [];

  const totalResults = matchedDishes.length + matchedCulture.length + matchedProvinces.length;

  const popularSearches = ['Phở', 'Bánh mì', 'Tết', 'Áo dài', 'Huế', 'Bún chả', 'Hội An', 'Cà phê trứng'];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 md:pt-24 px-4 bg-black/60 backdrop-blur-xs animate-fadeIn font-sans">
      <div
        className="w-full max-w-2xl bg-[#FBF9F5] rounded-2xl shadow-2xl border border-stone-300 overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-stone-200 bg-white">
          <Search className="w-5 h-5 text-stone-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('search.inputPlaceholder', 'Tìm món ăn, lễ hội, di sản, địa phương...')}
            className="flex-1 text-base text-stone-900 placeholder:text-stone-400 bg-transparent focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-stone-400 hover:text-stone-600 p-1 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs px-2.5 py-1 rounded bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors cursor-pointer"
          >
            {t('common.close', 'Đóng')} ESC
          </button>
        </div>

        {/* Results / Suggestions Container */}
        <div className="overflow-y-auto p-5 space-y-6">
          {!trimmed && (
            <div className="space-y-4">
              <div className="text-xs font-semibold uppercase tracking-wider text-stone-600">
                {t('search.popular', 'Gợi ý tìm kiếm phổ biến')}
              </div>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-3 py-1.5 text-xs rounded-lg border border-stone-200 bg-white hover:border-[#9E2A2B] hover:text-[#9E2A2B] text-stone-700 transition-colors cursor-pointer"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {trimmed && totalResults === 0 && (
            <div className="text-center py-12 space-y-2">
              <p className="text-sm font-medium text-stone-700">
                {t('search.notFound', 'Không tìm thấy kết quả nào phù hợp')} &ldquo;{query}&rdquo;
              </p>
            </div>
          )}

          {/* Dishes Results */}
          {matchedDishes.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-500">
                <Utensils className="w-3.5 h-3.5 text-[#9E2A2B]" />
                <span>{t('search.dishes', 'Món ăn')} ({matchedDishes.length})</span>
              </div>
              <div className="space-y-1.5">
                {matchedDishes.map((dish) => {
                  const loc = getLocalizedDish(dish);
                  return (
                    <div
                      key={dish.id}
                      onClick={() => {
                        onSelectDish(dish);
                        onClose();
                      }}
                      className="p-3 bg-white rounded-xl border border-stone-200 hover:border-[#9E2A2B] hover:shadow-xs transition-all cursor-pointer flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={loc.image}
                          alt={loc.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div>
                          <div className="font-bold text-sm text-stone-900 group-hover:text-[#9E2A2B] transition-colors">
                            {loc.name}
                          </div>
                          <div className="text-xs text-stone-500">
                            {loc.province} · {loc.shortDesc}
                          </div>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-[#9E2A2B] group-hover:translate-x-0.5 transition-all" />
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Culture Articles Results */}
          {matchedCulture.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-500">
                <BookOpen className="w-3.5 h-3.5 text-amber-700" />
                <span>{t('search.culture', 'Di sản văn hóa')} ({matchedCulture.length})</span>
              </div>
              <div className="space-y-1.5">
                {matchedCulture.map((article) => (
                  <div
                    key={article.id}
                    onClick={() => {
                      onSelectCulture(article);
                      onClose();
                    }}
                    className="p-3 bg-white rounded-xl border border-stone-200 hover:border-amber-700 hover:shadow-xs transition-all cursor-pointer flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <div className="font-bold text-sm text-stone-900 group-hover:text-amber-800 transition-colors">
                          {article.title}
                        </div>
                        <div className="text-xs text-stone-500">
                          {article.categoryLabel} · {article.summary}
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-amber-800 group-hover:translate-x-0.5 transition-all" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Provinces Results */}
          {matchedProvinces.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-500">
                <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                <span>{t('search.provinces', 'Tỉnh thành')} ({matchedProvinces.length})</span>
              </div>
              <div className="space-y-1.5">
                {matchedProvinces.map((prov) => (
                  <div
                    key={prov.id}
                    onClick={() => {
                      onSelectProvince(prov);
                      onClose();
                    }}
                    className="p-3 bg-white rounded-xl border border-stone-200 hover:border-emerald-700 hover:shadow-xs transition-all cursor-pointer flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={prov.heroImage}
                        alt={prov.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <div className="font-bold text-sm text-stone-900 group-hover:text-emerald-800 transition-colors">
                          {prov.name}
                        </div>
                        <div className="text-xs text-stone-500">
                          {prov.regionName} · {prov.tagline}
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-emerald-800 group-hover:translate-x-0.5 transition-all" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
