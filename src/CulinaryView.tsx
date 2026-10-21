import React, { useState, useMemo } from 'react';
import { DISHES_DATA, CULINARY_CATEGORIES } from '../data/culinaryData';
import { Dish, Region, DishCategory } from '../types';
import { useFavorites } from '../context/FavoritesContext';
import { useLanguage } from '../context/LanguageContext';
import { matchVietnamese } from '../utils/vietnameseSearch';
import { Search, Bookmark, Utensils, ArrowUpDown, Filter, RotateCcw } from 'lucide-react';

interface CulinaryViewProps {
  onSelectDish: (dish: Dish) => void;
  initialRegion?: Region | 'all';
}

export const CulinaryView: React.FC<CulinaryViewProps> = ({
  onSelectDish,
  initialRegion = 'all',
}) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { t, getCategoryLabel, getRegionLabel, getLocalizedDish } = useLanguage();
  const [selectedRegion, setSelectedRegion] = useState<Region | 'all'>(initialRegion);
  const [selectedCategory, setSelectedCategory] = useState<DishCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'name-asc' | 'region'>('featured');

  const regionTabs: { id: Region | 'all'; label: string }[] = [
    { id: 'all', label: t('region.all', 'Tất cả ba miền') },
    { id: 'bac', label: t('region.bac', 'Miền Bắc') },
    { id: 'trung', label: t('region.trung', 'Miền Trung') },
    { id: 'nam', label: t('region.nam', 'Miền Nam') },
    { id: 'mientay', label: t('region.mientay', 'Miền Tây') },
  ];

  const filteredDishes = useMemo(() => {
    let result = DISHES_DATA.filter((dish) => {
      // Region filter
      if (selectedRegion !== 'all' && dish.region !== selectedRegion) {
        return false;
      }
      // Category filter
      if (selectedCategory !== 'all' && dish.category !== selectedCategory) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const matchesName = matchVietnamese(dish.name, searchQuery);
        const matchesEnglish = matchVietnamese(dish.englishName, searchQuery);
        const matchesProvince = matchVietnamese(dish.province, searchQuery);
        const matchesIngredient = dish.mainIngredients.some((i) =>
          matchVietnamese(i, searchQuery)
        );
        if (!matchesName && !matchesEnglish && !matchesProvince && !matchesIngredient) {
          return false;
        }
      }
      return true;
    });

    // Sorting
    if (sortBy === 'name-asc') {
      result.sort((a, b) => a.name.localeCompare(b.name, 'vi'));
    } else if (sortBy === 'region') {
      result.sort((a, b) => a.province.localeCompare(b.province, 'vi'));
    } else {
      // Featured first
      result.sort((a, b) => (b.isSignature ? 1 : 0) - (a.isSignature ? 1 : 0));
    }

    return result;
  }, [selectedRegion, selectedCategory, searchQuery, sortBy]);

  const handleResetFilters = () => {
    setSelectedRegion('all');
    setSelectedCategory('all');
    setSearchQuery('');
    setSortBy('featured');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 font-sans">
      {/* Header Banner */}
      <div className="border-b border-stone-200 pb-6 space-y-2">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#9E2A2B]">
          {t('culinary.title', 'Thư viện văn hóa ẩm thực')}
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
          {t('culinary.title', 'Hương Vị Ẩm Thực Việt Nam')}
        </h1>
        <p className="text-sm sm:text-base text-stone-600 font-sans max-w-3xl leading-relaxed">
          {t('culinary.subtitle', 'Kho tàng ẩm thực tiêu biểu từ Bắc chí Nam được nghiên cứu công phu về cội nguồn, cách phối ngũ vị, chuẩn mực thưởng thức và triết lý âm dương dân gian.')}
        </p>
      </div>

      {/* Filter and Search Bar Controls */}
      <div className="space-y-4 bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
        {/* Top Controls Row: Search + Region Buttons + Sort */}
        <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('culinary.searchPlaceholder', 'Tìm món ăn, nguyên liệu, địa phương...')}
              className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-stone-200 bg-stone-50/70 focus:bg-white focus:outline-none focus:border-[#9E2A2B] text-stone-900 placeholder:text-stone-400 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-600 cursor-pointer"
              >
                {t('common.clearFilter', 'Xóa')}
              </button>
            )}
          </div>

          {/* Region Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
            {regionTabs.map((tab) => {
              const active = selectedRegion === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedRegion(tab.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                    active
                      ? 'bg-[#9E2A2B] text-white shadow-xs'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 shrink-0">
            <ArrowUpDown className="w-4 h-4 text-stone-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="text-xs rounded-lg border border-stone-200 bg-white py-1.5 px-2.5 text-stone-700 focus:outline-none focus:border-[#9E2A2B] cursor-pointer"
            >
              <option value="featured">{t('common.all', 'Nổi bật nhất')}</option>
              <option value="name-asc">Tên (A → Z)</option>
              <option value="region">{t('culinary.filterRegion', 'Theo địa phương')}</option>
            </select>
          </div>
        </div>

        {/* Category Filter Chips Bar */}
        <div className="pt-3 border-t border-stone-100 flex items-center gap-2 flex-wrap">
          <span className="text-xs font-semibold text-stone-500 mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> {t('culinary.filterCategory', 'Phân loại')}:
          </span>
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-2.5 py-1 text-xs rounded-md transition-colors cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-stone-800 text-white font-medium'
                : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            {t('common.all', 'Tất cả loại')}
          </button>
          {CULINARY_CATEGORIES.map((cat) => {
            const active = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-2.5 py-1 text-xs rounded-md transition-colors cursor-pointer ${
                  active
                    ? 'bg-stone-800 text-white font-medium'
                    : 'text-stone-600 hover:bg-stone-100'
                }`}
              >
                {getCategoryLabel(cat.id)}
              </button>
            );
          })}

          {(selectedRegion !== 'all' || selectedCategory !== 'all' || searchQuery) && (
            <button
              onClick={handleResetFilters}
              className="ml-auto text-xs text-[#9E2A2B] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" /> {t('common.clearFilter', 'Đặt lại bộ lọc')}
            </button>
          )}
        </div>
      </div>

      {/* Results Count & Current Scope */}
      <div className="flex items-center justify-between text-xs text-stone-500">
        <span>
          {t('common.results', 'Hiển thị')} <strong>{filteredDishes.length}</strong> {t('culinary.dishesFound', 'món ăn')}
        </span>
      </div>

      {/* Dishes Grid */}
      {filteredDishes.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-stone-200 p-8 space-y-3">
          <Utensils className="w-10 h-10 text-stone-300 mx-auto" />
          <h3 className="font-serif font-bold text-lg text-stone-800">
            {t('culinary.noMatch', 'Không tìm thấy món ăn phù hợp')}
          </h3>
          <button
            onClick={handleResetFilters}
            className="mt-2 px-4 py-2 text-xs font-medium text-white bg-[#9E2A2B] rounded-lg cursor-pointer"
          >
            {t('common.all', 'Xem toàn bộ món ăn')}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDishes.map((rawDish) => {
            const dish = getLocalizedDish(rawDish);
            const isFav = isFavorite(rawDish.id);
            return (
              <div
                key={rawDish.id}
                onClick={() => onSelectDish(rawDish)}
                className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-lg hover:border-[#9E2A2B]/40 transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  {/* Dish Thumbnail */}
                  <div className="relative h-48 w-full overflow-hidden bg-stone-900">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-950/10 to-transparent" />

                    {/* Province badge on image */}
                    <div className="absolute bottom-3 left-3 text-white text-xs font-medium">
                      {dish.province}
                    </div>

                    {/* Bookmark Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite({
                          id: rawDish.id,
                          type: 'dish',
                          title: dish.name,
                          subtitle: `${dish.province} · ${dish.englishName}`,
                          image: dish.image,
                        });
                      }}
                      className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-colors cursor-pointer ${
                        isFav
                          ? 'bg-[#9E2A2B] text-white shadow-md'
                          : 'bg-white/80 hover:bg-white text-stone-800'
                      }`}
                      title={isFav ? t('common.saved', 'Đã lưu') : t('common.save', 'Lưu món ăn')}
                      aria-label={t('common.save', 'Lưu món ăn')}
                    >
                      <Bookmark className="w-3.5 h-3.5 fill-current" />
                    </button>
                  </div>

                  {/* Dish Content Body */}
                  <div className="p-5 space-y-2">
                    <div className="flex items-center gap-2 text-xs text-stone-500 font-sans">
                      <span>{getRegionLabel(dish.region)}</span>
                      <span aria-hidden="true">·</span>
                      <span className="italic">{dish.englishName}</span>
                    </div>

                    <h3 className="font-sans font-bold text-base sm:text-lg text-stone-900 group-hover:text-[#9E2A2B] transition-colors leading-snug">
                      {dish.name}
                    </h3>

                    <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed font-sans">
                      {dish.shortDesc}
                    </p>

                    {/* Flavor snippet */}
                    <div className="text-[11px] text-stone-500 bg-stone-50 p-2.5 rounded-lg border border-stone-100 line-clamp-1">
                      <strong className="text-stone-700">{t('culinary.taste', 'Hương vị')}:</strong> {dish.flavorProfile.taste}
                    </div>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="px-5 pb-4 pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
                  <span className="text-stone-400">
                    {dish.mainIngredients.length} {t('culinary.ingredients', 'nguyên liệu')}
                  </span>
                  <span className="font-semibold text-[#9E2A2B] group-hover:underline">
                    {t('common.viewDetail', 'Xem chi tiết')} →
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
