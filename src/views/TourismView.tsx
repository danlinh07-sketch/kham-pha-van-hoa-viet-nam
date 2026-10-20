import React, { useState } from 'react';
import { TOURISM_DESTINATIONS } from '../data/tourismData';
import { DISHES_DATA } from '../data/culinaryData';
import { Region, Dish } from '../types';
import { useFavorites } from '../context/FavoritesContext';
import { useLanguage } from '../context/LanguageContext';
import {
  MapPin,
  Calendar,
  Ticket,
  Navigation,
  ExternalLink,
  Bookmark,
  Sparkles,
  Utensils,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface TourismViewProps {
  onSelectDish: (dish: Dish) => void;
}

export const TourismView: React.FC<TourismViewProps> = ({ onSelectDish }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { t, getLocalizedDestination, getRegionLabel } = useLanguage();
  const [selectedRegion, setSelectedRegion] = useState<Region | 'all'>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const regionTabs: { id: Region | 'all'; label: string }[] = [
    { id: 'all', label: t('region.all', 'Tất cả điểm đến') },
    { id: 'bac', label: t('region.bac', 'Bắc Bộ') },
    { id: 'trung', label: t('region.trung', 'Trung Bộ') },
    { id: 'nam', label: t('region.nam', 'Nam Bộ') },
    { id: 'mientay', label: t('region.mientay', 'Miền Tây') },
  ];

  const filteredDestinations = TOURISM_DESTINATIONS.filter((dest) => {
    if (selectedRegion === 'all') return true;
    return dest.region === selectedRegion;
  });

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleDishClick = (dishName: string) => {
    const found = DISHES_DATA.find(
      (d) => d.name.toLowerCase() === dishName.toLowerCase() || d.name.includes(dishName)
    );
    if (found) {
      onSelectDish(found);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 font-sans">
      {/* Header Banner */}
      <div className="border-b border-stone-200 pb-6 space-y-2">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#9E2A2B]">
          {t('tourism.title', 'Cẩm nang du lịch di sản & danh thắng')}
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
          {t('tourism.title', 'Điểm Đến & Di Sản Việt Nam')}
        </h1>
        <p className="text-sm sm:text-base text-stone-600 font-sans max-w-3xl leading-relaxed">
          {t('tourism.subtitle', 'Khám phá các kỳ quan thiên nhiên thế giới, di tích ngàn năm và cảnh sắc non nước Việt Nam')}
        </p>
      </div>

      {/* Region Filter Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {regionTabs.map((tab) => {
          const active = selectedRegion === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setSelectedRegion(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                active
                  ? 'bg-[#9E2A2B] text-white shadow-xs font-semibold'
                  : 'bg-white border border-stone-200 hover:border-stone-300 text-stone-700'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Destinations List */}
      <div className="space-y-8">
        {filteredDestinations.map((rawDest) => {
          const dest = getLocalizedDestination(rawDest);
          const isFav = isFavorite(rawDest.id);
          const isExpanded = expandedId === rawDest.id;

          return (
            <div
              key={rawDest.id}
              className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-all"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                {/* Thumbnail Column */}
                <div className="lg:col-span-5 relative h-64 lg:h-auto min-h-[260px] overflow-hidden bg-stone-900">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent lg:hidden" />

                  {/* Region badge */}
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-xs font-semibold text-[#9E2A2B] uppercase tracking-wider shadow-xs">
                    {getRegionLabel(dest.region)}
                  </div>

                  {/* Bookmark Button */}
                  <button
                    onClick={() =>
                      toggleFavorite({
                        id: rawDest.id,
                        type: 'tourism',
                        title: dest.name,
                        subtitle: `${dest.provinceCity} · ${dest.englishName}`,
                        image: dest.image,
                      })
                    }
                    className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md transition-colors cursor-pointer ${
                      isFav
                        ? 'bg-[#9E2A2B] text-white shadow-md'
                        : 'bg-white/80 hover:bg-white text-stone-800'
                    }`}
                    title={isFav ? t('common.saved', 'Đã lưu') : t('common.save', 'Lưu điểm đến')}
                    aria-label={t('common.save', 'Lưu điểm đến')}
                  >
                    <Bookmark className="w-4 h-4 fill-current" />
                  </button>
                </div>

                {/* Content Column */}
                <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-5">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-xs text-stone-500 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-[#9E2A2B]" />
                      <span>{dest.provinceCity}</span>
                      <span>·</span>
                      <span className="italic">{dest.englishName}</span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 tracking-tight leading-snug">
                      {dest.name}
                    </h2>

                    <p className="text-sm text-stone-700 leading-relaxed font-sans">
                      {dest.intro}
                    </p>

                    {/* Quick Info Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-200/60 text-xs space-y-1">
                        <span className="font-semibold text-[#C28B38] flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                          <Calendar className="w-3.5 h-3.5" /> {t('tourism.bestSeason', 'Thời điểm lý tưởng')}
                        </span>
                        <p className="text-stone-800 font-sans">{dest.bestSeason}</p>
                      </div>

                      <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs space-y-1">
                        <span className="font-semibold text-stone-600 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                          <Ticket className="w-3.5 h-3.5 text-[#9E2A2B]" /> {t('tourism.cost', 'Giá vé tham khảo')}
                        </span>
                        <p className="text-stone-800 font-sans line-clamp-2">{dest.estimatedCost.ticketPrice}</p>
                      </div>
                    </div>
                  </div>

                  {/* Expandable Deep Details */}
                  {isExpanded && (
                    <div className="pt-4 border-t border-stone-200 space-y-4 animate-fadeIn">
                      {/* Transportation */}
                      <div className="space-y-1.5 text-xs">
                        <span className="font-semibold text-stone-800 uppercase tracking-wider flex items-center gap-1.5">
                          <Navigation className="w-3.5 h-3.5 text-stone-600" /> {t('tourism.transport', 'Phương tiện & Mẹo di chuyển')}
                        </span>
                        <div className="flex flex-wrap gap-1.5 text-stone-700">
                          {dest.transportation.methods.map((m, idx) => (
                            <span key={idx} className="bg-stone-100 px-2.5 py-1 rounded-md text-[11px]">
                              {m}
                            </span>
                          ))}
                        </div>
                        <p className="text-stone-600 italic mt-1 bg-stone-50 p-2.5 rounded-lg border border-stone-100">
                          💡 {dest.transportation.tips}
                        </p>
                      </div>

                      {/* Highlights */}
                      <div className="space-y-1.5 text-xs">
                        <span className="font-semibold text-stone-800 uppercase tracking-wider flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-[#C28B38]" /> {t('tourism.highlights', 'Trải nghiệm nổi bật')}
                        </span>
                        <ul className="space-y-1 text-stone-700 list-disc list-inside">
                          {dest.highlights.map((h, idx) => (
                            <li key={idx} className="leading-relaxed">
                              {h}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Cost Notes */}
                      <div className="p-3 rounded-xl bg-stone-100/70 border border-stone-200 text-[11px] text-stone-600 space-y-1">
                        <p><strong>{t('tourism.costNotes', 'Lưu ý về chi phí')}:</strong> {dest.estimatedCost.notes}</p>
                        <p className="text-stone-500">{t('tourism.lastUpdated', 'Cập nhật')}: {dest.estimatedCost.lastUpdated}</p>
                      </div>

                      {/* Official Source */}
                      <div className="flex items-center justify-between text-xs pt-1">
                        <span className="text-stone-500">{t('tourism.officialSource', 'Nguồn thông tin chính thức')}:</span>
                        <a
                          href={dest.officialSource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#9E2A2B] hover:underline flex items-center gap-1 font-medium"
                        >
                          <span>{dest.officialSource.title}</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  )}

                  {/* Card Bottom Controls */}
                  <div className="pt-3 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                    {/* Related Dishes preview */}
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-stone-500 flex items-center gap-1">
                        <Utensils className="w-3 h-3 text-[#9E2A2B]" /> {t('tourism.relatedDishes', 'Món ngon')}:
                      </span>
                      {rawDest.relatedDishNames?.slice(0, 3).map((dishName, i) => (
                        <button
                          key={i}
                          onClick={() => handleDishClick(dishName)}
                          className="px-2 py-0.5 rounded bg-stone-100 hover:bg-[#9E2A2B]/10 hover:text-[#9E2A2B] text-stone-700 font-medium transition-colors cursor-pointer"
                        >
                          {dishName}
                        </button>
                      ))}
                    </div>

                    {/* Toggle Details Button */}
                    <button
                      onClick={() => toggleExpand(rawDest.id)}
                      className="text-[#9E2A2B] font-semibold flex items-center gap-1 hover:underline cursor-pointer ml-auto"
                    >
                      <span>{isExpanded ? t('common.close', 'Thu gọn') : t('common.viewDetail', 'Xem chi tiết cẩm nang')}</span>
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
