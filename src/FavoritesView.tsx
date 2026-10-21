import React, { useState } from 'react';
import { useFavorites } from '../context/FavoritesContext';
import { useLanguage } from '../context/LanguageContext';
import { DISHES_DATA } from '../data/culinaryData';
import { CULTURE_DATA } from '../data/cultureData';
import { PROVINCES_DATA } from '../data/regionData';
import { Dish, CultureArticle, ProvinceInfo, FavoriteItem } from '../types';
import { Bookmark, Trash2, ArrowRight, Utensils, BookOpen, MapPin, Compass } from 'lucide-react';
import { ActiveTab } from '../components/Navbar';

interface FavoritesViewProps {
  onSelectDish: (dish: Dish) => void;
  onSelectCulture: (article: CultureArticle) => void;
  onSelectProvince: (province: ProvinceInfo) => void;
  onNavigate: (tab: ActiveTab) => void;
}

export const FavoritesView: React.FC<FavoritesViewProps> = ({
  onSelectDish,
  onSelectCulture,
  onSelectProvince,
  onNavigate,
}) => {
  const { favorites, removeFavorite, clearFavorites } = useFavorites();
  const { t } = useLanguage();
  const [filterType, setFilterType] = useState<'all' | 'dish' | 'culture' | 'province' | 'tourism'>('all');

  const filtered = favorites.filter((f) => (filterType === 'all' ? true : f.type === filterType));

  const handleOpenItem = (item: FavoriteItem) => {
    if (item.type === 'dish') {
      const found = DISHES_DATA.find((d) => d.id === item.id);
      if (found) onSelectDish(found);
    } else if (item.type === 'culture') {
      const found = CULTURE_DATA.find((c) => c.id === item.id);
      if (found) onSelectCulture(found);
    } else if (item.type === 'province') {
      const found = PROVINCES_DATA.find((p) => p.id === item.id);
      if (found) onSelectProvince(found);
    } else if (item.type === 'tourism') {
      onNavigate('tourism');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-stone-200 pb-6 gap-4">
        <div className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#9E2A2B]">
            {t('nav.collection', 'Bộ sưu tập cá nhân')}
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
            {t('favorites.title', 'Nội Dung Đã Lưu')}
          </h1>
          <p className="text-sm sm:text-base text-stone-600 font-sans max-w-2xl leading-relaxed">
            {t('favorites.subtitle', 'Danh sách các món ăn, bài viết văn hóa và địa phương bạn đã lưu để tra cứu và thưởng thức.')}
          </p>
        </div>

        {favorites.length > 0 && (
          <button
            onClick={() => {
              if (window.confirm('Bạn có chắc chắn muốn xóa toàn bộ danh sách đã lưu?')) {
                clearFavorites();
              }
            }}
            className="text-xs text-rose-600 hover:text-rose-800 flex items-center gap-1.5 cursor-pointer py-1 self-start sm:self-auto"
          >
            <Trash2 className="w-3.5 h-3.5" /> {t('favorites.clearAll', 'Xóa tất cả')} ({favorites.length})
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-stone-200 pb-4 overflow-x-auto scrollbar-none">
        {[
          { id: 'all', label: `${t('common.all', 'Tất cả')} (${favorites.length})` },
          { id: 'dish', label: `${t('search.dishes', 'Món ăn')} (${favorites.filter((f) => f.type === 'dish').length})` },
          { id: 'culture', label: `${t('search.culture', 'Văn hóa')} (${favorites.filter((f) => f.type === 'culture').length})` },
          { id: 'tourism', label: `${t('nav.tourism', 'Du lịch')} (${favorites.filter((f) => f.type === 'tourism').length})` },
          { id: 'province', label: `${t('search.provinces', 'Địa phương')} (${favorites.filter((f) => f.type === 'province').length})` },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilterType(tab.id as any)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
              filterType === tab.id
                ? 'bg-stone-900 text-white shadow-xs'
                : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Items Grid or Empty State */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-stone-200 p-8 space-y-4">
          <Bookmark className="w-12 h-12 text-stone-300 mx-auto" />
          <h3 className="font-serif font-bold text-xl text-stone-800">
            {favorites.length === 0
              ? t('favorites.empty', 'Chưa có nội dung nào được lưu')
              : t('favorites.empty', 'Không có nội dung trong danh mục này')}
          </h3>
          <p className="text-xs sm:text-sm text-stone-500 max-w-md mx-auto leading-relaxed">
            {t('favorites.emptyDesc', 'Nhấn vào biểu tượng thẻ đánh dấu tại bất kỳ món ăn hay địa phương nào để lưu vào đây.')}
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <button
              onClick={() => onNavigate('culinary')}
              className="px-5 py-2.5 rounded-lg text-xs font-semibold text-white bg-[#9E2A2B] hover:bg-[#852223] transition-colors cursor-pointer"
            >
              {t('home.ctaCulinary', 'Khám phá món ăn ngay')}
            </button>
            <button
              onClick={() => onNavigate('culture')}
              className="px-5 py-2.5 rounded-lg text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 transition-colors cursor-pointer"
            >
              {t('common.viewDetail', 'Đọc chuyên đề văn hóa')}
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => {
            const Icon =
              item.type === 'dish'
                ? Utensils
                : item.type === 'culture'
                ? BookOpen
                : item.type === 'tourism'
                ? Compass
                : MapPin;

            return (
              <div
                key={item.id}
                onClick={() => handleOpenItem(item)}
                className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-44 w-full overflow-hidden bg-stone-900">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 to-transparent" />
                    <div className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-white/90 text-[10px] font-semibold text-stone-700 uppercase tracking-wider flex items-center gap-1">
                      <Icon className="w-3 h-3 text-[#9E2A2B]" />
                      <span>{item.type}</span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFavorite(item.id);
                      }}
                      className="absolute top-3 right-3 p-1.5 rounded-full bg-white/80 hover:bg-white text-stone-600 hover:text-rose-600 transition-colors cursor-pointer"
                      title="Xóa khỏi yêu thích"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="p-4 space-y-1">
                    <div className="text-[11px] text-stone-500 font-sans truncate">
                      {item.subtitle}
                    </div>
                    <h3 className="font-sans font-bold text-base text-stone-900 group-hover:text-[#9E2A2B] transition-colors leading-snug">
                      {item.title}
                    </h3>
                  </div>
                </div>

                <div className="px-4 pb-4 pt-1 flex items-center justify-between text-xs text-[#9E2A2B] font-semibold">
                  <span>{t('common.viewDetail', 'Xem chi tiết')}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
