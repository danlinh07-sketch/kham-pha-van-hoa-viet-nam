import React from 'react';
import { Dish } from '../types';
import { useFavorites } from '../context/FavoritesContext';
import { useLanguage } from '../context/LanguageContext';
import { X, Bookmark, Share2, Sparkles, MapPin, Check } from 'lucide-react';

interface DishDetailModalProps {
  dish: Dish | null;
  onClose: () => void;
}

export const DishDetailModal: React.FC<DishDetailModalProps> = ({ dish, onClose }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { t, getLocalizedDish, getRegionLabel } = useLanguage();
  const [copied, setCopied] = React.useState(false);

  if (!dish) return null;

  const localizedDish = getLocalizedDish(dish);
  const isFav = isFavorite(dish.id);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleToggleFav = () => {
    toggleFavorite({
      id: dish.id,
      type: 'dish',
      title: localizedDish.name,
      subtitle: `${localizedDish.province} · ${localizedDish.englishName}`,
      image: localizedDish.image,
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto animate-fadeIn font-sans"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl bg-[#FBF9F5] rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Hero Image */}
        <div className="relative h-64 md:h-80 w-full overflow-hidden bg-stone-900">
          <img
            src={localizedDish.image}
            alt={localizedDish.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          {/* Scrim Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/40 to-transparent" />

          {/* Action Buttons Top Right */}
          <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
            <button
              onClick={handleToggleFav}
              className={`p-2.5 rounded-full backdrop-blur-md transition-colors cursor-pointer ${
                isFav
                  ? 'bg-[#9E2A2B] text-white shadow-md'
                  : 'bg-white/80 hover:bg-white text-stone-800'
              }`}
              title={isFav ? t('common.saved', 'Đã lưu') : t('common.save', 'Lưu yêu thích')}
            >
              <Bookmark className="w-4 h-4 fill-current" />
            </button>
            <button
              onClick={handleShare}
              className="p-2.5 rounded-full bg-white/80 hover:bg-white text-stone-800 backdrop-blur-md transition-colors cursor-pointer"
              title="Sao chép liên kết chia sẻ"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-2.5 rounded-full bg-white/80 hover:bg-white text-stone-800 backdrop-blur-md transition-colors cursor-pointer"
              aria-label={t('common.close', 'Đóng')}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Title on Scrim */}
          <div className="absolute bottom-5 left-6 right-6 text-white">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#E7C177] font-medium mb-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>{localizedDish.province}</span>
              <span>·</span>
              <span>{getRegionLabel(localizedDish.region)}</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-white tracking-tight">
              {localizedDish.name}
            </h2>
            <p className="text-sm text-stone-300 font-sans italic mt-0.5">
              {localizedDish.englishName}
            </p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 md:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
          {/* Short Description */}
          <p className="text-base text-stone-800 font-serif italic leading-relaxed border-l-2 border-[#9E2A2B] pl-4">
            {localizedDish.shortDesc}
          </p>

          {/* Flavor & Intensity Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-xl bg-stone-100/70 border border-stone-200">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-stone-500 block mb-1">
                {t('culinary.taste', 'Hương vị chính')}
              </span>
              <p className="text-sm text-stone-800 leading-snug">{localizedDish.flavorProfile.taste}</p>
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-stone-500 block mb-1">
                {t('culinary.texture', 'Kết cấu món ăn')}
              </span>
              <p className="text-sm text-stone-800 leading-snug">{localizedDish.flavorProfile.texture}</p>
            </div>
          </div>

          {/* History & Origin */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#9E2A2B]">
              {t('culinary.history', 'Nguồn Gốc & Lịch Sử')}
            </h4>
            <p className="text-sm text-stone-700 leading-relaxed">
              {localizedDish.historyOrigin}
            </p>
          </div>

          {/* Main Ingredients */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-stone-600">
              {t('culinary.ingredients', 'Nguyên Liệu Chính')}
            </h4>
            <div className="flex flex-wrap gap-2">
              {localizedDish.mainIngredients.map((ing, idx) => (
                <span
                  key={idx}
                  className="text-xs text-stone-700 bg-white border border-stone-200 rounded-md px-2.5 py-1"
                >
                  {ing}
                </span>
              ))}
            </div>
          </div>

          {/* Preparation Summary */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-stone-600">
              {t('culinary.preparation', 'Bí quyết chế biến')}
            </h4>
            <p className="text-sm text-stone-700 leading-relaxed">
              {localizedDish.preparationSummary}
            </p>
          </div>

          {/* How to Enjoy / Etiquette */}
          <div className="space-y-2 p-4 rounded-xl bg-amber-50/60 border border-amber-200/50">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#C28B38]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t('culinary.etiquette', 'Cách Thưởng Thức Chuẩn Vị')}</span>
            </div>
            <p className="text-sm text-stone-800 leading-relaxed">
              {localizedDish.etiquette}
            </p>
          </div>

          {/* Cultural Significance */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#1B4332]">
              {t('culinary.significance', 'Ý Nghĩa Văn Hóa')}
            </h4>
            <p className="text-sm text-stone-700 leading-relaxed">
              {localizedDish.culturalSignificance}
            </p>
          </div>

          {/* Regional Variants */}
          {localizedDish.regionalVariants && localizedDish.regionalVariants.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-stone-200">
              <span className="text-xs font-semibold uppercase tracking-widest text-stone-500 block">
                {t('culinary.variants', 'Biến thể vùng miền')}
              </span>
              <ul className="list-disc list-inside text-sm text-stone-700 space-y-1">
                {localizedDish.regionalVariants.map((varItem, i) => (
                  <li key={i}>{varItem}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 md:px-8 bg-stone-100 border-t border-stone-200 flex items-center justify-between">
          <span className="text-xs text-stone-500">
            Viet Discover Culinary Heritage
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-stone-700 hover:text-stone-900 bg-white hover:bg-stone-50 rounded-lg border border-stone-300 transition-colors cursor-pointer"
          >
            {t('common.close', 'Đóng cửa sổ')}
          </button>
        </div>
      </div>
    </div>
  );
};
