import React from 'react';
import { ProvinceInfo, Dish } from '../types';
import { useFavorites } from '../context/FavoritesContext';
import { DISHES_DATA } from '../data/culinaryData';
import { X, Bookmark, MapPin, Calendar, Sparkles, Utensils, Flag } from 'lucide-react';

interface ProvinceDetailModalProps {
  province: ProvinceInfo | null;
  onClose: () => void;
  onSelectDish: (dish: Dish) => void;
}

export const ProvinceDetailModal: React.FC<ProvinceDetailModalProps> = ({
  province,
  onClose,
  onSelectDish,
}) => {
  const { isFavorite, toggleFavorite } = useFavorites();

  if (!province) return null;

  const isFav = isFavorite(province.id);

  const relatedDishes = DISHES_DATA.filter(
    (d) => province.dishesIds.includes(d.id) || d.province.toLowerCase().includes(province.name.toLowerCase())
  );

  const handleToggleFav = () => {
    toggleFavorite({
      id: province.id,
      type: 'province',
      title: province.name,
      subtitle: `${province.regionName} · ${province.tagline}`,
      image: province.heroImage,
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl bg-[#FBF9F5] rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Hero Image */}
        <div className="relative h-60 md:h-72 w-full overflow-hidden bg-stone-900">
          <img
            src={province.heroImage}
            alt={province.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/40 to-transparent" />

          {/* Top Actions */}
          <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
            <button
              onClick={handleToggleFav}
              className={`p-2.5 rounded-full backdrop-blur-md transition-colors cursor-pointer ${
                isFav
                  ? 'bg-[#9E2A2B] text-white shadow-md'
                  : 'bg-white/80 hover:bg-white text-stone-800'
              }`}
              title={isFav ? 'Bỏ lưu' : 'Lưu địa phương'}
            >
              <Bookmark className="w-4 h-4 fill-current" />
            </button>
            <button
              onClick={onClose}
              className="p-2.5 rounded-full bg-white/80 hover:bg-white text-stone-800 backdrop-blur-md transition-colors cursor-pointer"
              aria-label="Đóng"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Title on Scrim */}
          <div className="absolute bottom-5 left-6 right-6 text-white">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#E7C177] font-medium mb-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>{province.regionName}</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-white tracking-tight">
              {province.name}
            </h2>
            <p className="text-xs md:text-sm text-stone-300 font-serif italic mt-0.5">
              {province.tagline}
            </p>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 md:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
          {/* Description */}
          <p className="text-sm md:text-base text-stone-800 leading-relaxed font-sans">
            {province.description}
          </p>

          {/* Best Season Strip */}
          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/60 text-stone-800">
            <Calendar className="w-4 h-4 text-[#C28B38] shrink-0 mt-0.5" />
            <div className="text-xs md:text-sm">
              <strong className="text-stone-900">Thời điểm du lịch lý tưởng:</strong> {province.bestTravelSeason}
            </div>
          </div>

          {/* Cultural Highlights */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#1B4332]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Dấu Ấn Văn Hóa & Lối Sống</span>
            </div>
            <p className="text-sm text-stone-700 leading-relaxed">
              {province.culturalHighlights}
            </p>
          </div>

          {/* Attractions */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-stone-500">
              Địa Danh & Danh Thắng Tiêu Biểu
            </h4>
            <div className="flex flex-wrap gap-2">
              {province.notableAttractions.map((att, i) => (
                <span
                  key={i}
                  className="text-xs text-stone-700 bg-white border border-stone-200 rounded-md px-2.5 py-1"
                >
                  {att}
                </span>
              ))}
            </div>
          </div>

          {/* Festivals */}
          {province.festivals.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#9E2A2B]">
                <Flag className="w-3.5 h-3.5" />
                <span>Lễ Hội Truyền Thống</span>
              </div>
              <ul className="list-disc list-inside text-sm text-stone-700 space-y-1">
                {province.festivals.map((fest, i) => (
                  <li key={i}>{fest}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Linked Dishes in this province */}
          {relatedDishes.length > 0 && (
            <div className="space-y-3 pt-4 border-t border-stone-200">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-stone-700">
                <Utensils className="w-3.5 h-3.5 text-[#9E2A2B]" />
                <span>Món Ăn Đặc Sản Tiêu Biểu ({relatedDishes.length})</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {relatedDishes.map((dish) => (
                  <div
                    key={dish.id}
                    onClick={() => {
                      onClose();
                      onSelectDish(dish);
                    }}
                    className="flex items-center gap-3 p-2.5 rounded-lg border border-stone-200 bg-white hover:border-[#9E2A2B] hover:shadow-xs transition-all cursor-pointer group"
                  >
                    <img
                      src={dish.image}
                      alt={dish.name}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded-md object-cover"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                    <div>
                      <div className="font-semibold text-xs text-stone-900 group-hover:text-[#9E2A2B] transition-colors">
                        {dish.name}
                      </div>
                      <div className="text-[11px] text-stone-500 line-clamp-1">
                        {dish.shortDesc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 md:px-8 bg-stone-100 border-t border-stone-200 flex items-center justify-between">
          <span className="text-xs text-stone-500">
            Cẩm nang Địa lý & Du lịch Văn hóa Việt Nam
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-stone-700 hover:text-stone-900 bg-white hover:bg-stone-50 rounded-lg border border-stone-300 transition-colors cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
