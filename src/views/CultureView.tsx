import React, { useState, useMemo } from 'react';
import { CULTURE_DATA } from '../data/cultureData';
import { CultureArticle, CultureCategory } from '../types';
import { useFavorites } from '../context/FavoritesContext';
import { matchVietnamese } from '../utils/vietnameseSearch';
import { Search, Bookmark, BookOpen, Clock, MapPin, Sparkles, Filter } from 'lucide-react';

interface CultureViewProps {
  onSelectCulture: (article: CultureArticle) => void;
}

export const CultureView: React.FC<CultureViewProps> = ({ onSelectCulture }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const [selectedCategory, setSelectedCategory] = useState<CultureCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: { id: CultureCategory | 'all'; label: string }[] = [
    { id: 'all', label: 'Tất cả chủ đề' },
    { id: 'tet_phong_tuc', label: 'Tết & Phong tục' },
    { id: 'kien_truc_di_san', label: 'Di sản & Kiến trúc' },
    { id: 'am_nhac_nghe_thuat', label: 'Âm nhạc & Nghệ thuật' },
    { id: 'trang_phuc', label: 'Áo dài & Trang phục' },
    { id: 'lang_nghe', label: 'Làng nghề truyền thống' },
    { id: 'dan_toc_54', label: '54 Dân tộc anh em' },
    { id: 'am_thuc_gia_dinh', label: 'Mâm cơm gia đình' },
  ];

  const filteredArticles = useMemo(() => {
    return CULTURE_DATA.filter((art) => {
      if (selectedCategory !== 'all' && art.category !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const matchesTitle = matchVietnamese(art.title, searchQuery);
        const matchesSubtitle = matchVietnamese(art.subtitle, searchQuery);
        const matchesSummary = matchVietnamese(art.summary, searchQuery);
        const matchesOrigin = matchVietnamese(art.locationOrOrigin, searchQuery);
        if (!matchesTitle && !matchesSubtitle && !matchesSummary && !matchesOrigin) {
          return false;
        }
      }
      return true;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="border-b border-stone-200 pb-6 space-y-2">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#1B4332]">
          Kho tàng di sản văn hóa phi vật thể
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
          Linh Hồn & Di Sản Việt Nam
        </h1>
        <p className="text-sm sm:text-base text-stone-600 font-sans max-w-3xl leading-relaxed">
          Nơi hội tụ những nghiên cứu chuyên sâu về lễ hội cổ truyền, phong tục Tết, trang phục dân tộc, nghệ thuật biểu diễn dân gian, làng nghề trăm tuổi và sự đa dạng văn hóa của 54 dân tộc anh em.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-4 bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
        <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm bài viết, phong tục, di sản, làng nghề..."
              className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-stone-200 bg-stone-50/70 focus:bg-white focus:outline-none focus:border-[#1B4332] text-stone-900 placeholder:text-stone-400 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-600 cursor-pointer"
              >
                Xóa
              </button>
            )}
          </div>

          <div className="text-xs text-stone-500">
            Hiển thị <strong>{filteredArticles.length}</strong> chuyên đề văn hóa
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="pt-3 border-t border-stone-100 flex items-center gap-2 flex-wrap">
          <span className="text-xs font-semibold text-stone-500 mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Chủ đề:
          </span>
          {categories.map((cat) => {
            const active = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 text-xs rounded-lg transition-colors cursor-pointer ${
                  active
                    ? 'bg-[#1B4332] text-white font-medium shadow-xs'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Featured Curatorial Monograph (If available) */}
      {filteredArticles.length > 0 && (
        <div
          onClick={() => onSelectCulture(filteredArticles[0])}
          className="rounded-3xl border border-stone-200 bg-white overflow-hidden shadow-sm hover:shadow-xl hover:border-[#1B4332]/40 transition-all cursor-pointer group grid grid-cols-1 lg:grid-cols-12"
        >
          <div className="lg:col-span-6 relative h-64 lg:h-auto overflow-hidden bg-stone-900">
            <img
              src={filteredArticles[0].image}
              alt={filteredArticles[0].title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent lg:hidden" />
            <div className="absolute bottom-4 left-4 text-white text-xs lg:hidden">
              {filteredArticles[0].categoryLabel}
            </div>
          </div>
          <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs text-stone-500">
                <span className="text-[#1B4332] font-semibold uppercase tracking-wider">
                  Chuyên Đề Nổi Bật
                </span>
                <span aria-hidden="true">·</span>
                <span>{filteredArticles[0].period}</span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {filteredArticles[0].readingTimeMinutes} phút đọc
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 group-hover:text-[#1B4332] transition-colors leading-tight">
                {filteredArticles[0].title}
              </h2>
              <p className="text-sm text-stone-600 font-sans leading-relaxed line-clamp-3">
                {filteredArticles[0].summary}
              </p>
            </div>
            <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1 text-stone-500">
                <MapPin className="w-3.5 h-3.5 text-[#1B4332]" />
                <span>{filteredArticles[0].locationOrOrigin}</span>
              </div>
              <span className="font-semibold text-[#1B4332] group-hover:underline">
                Đọc bài chuyên khảo →
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Grid of Other Articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.slice(1).map((article) => {
          const isFav = isFavorite(article.id);
          return (
            <div
              key={article.id}
              onClick={() => onSelectCulture(article)}
              className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-lg hover:border-[#1B4332]/40 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 w-full overflow-hidden bg-stone-900">
                  <img
                    src={article.image}
                    alt={article.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-950/15 to-transparent" />
                  
                  {/* Category */}
                  <div className="absolute bottom-3 left-3 text-white text-xs font-medium">
                    {article.categoryLabel}
                  </div>

                  {/* Bookmark Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite({
                        id: article.id,
                        type: 'culture',
                        title: article.title,
                        subtitle: `${article.categoryLabel} · ${article.period}`,
                        image: article.image,
                      });
                    }}
                    className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-colors cursor-pointer ${
                      isFav
                        ? 'bg-[#9E2A2B] text-white shadow-md'
                        : 'bg-white/80 hover:bg-white text-stone-800'
                    }`}
                    title={isFav ? 'Bỏ lưu' : 'Lưu bài viết'}
                    aria-label="Lưu bài viết"
                  >
                    <Bookmark className="w-3.5 h-3.5 fill-current" />
                  </button>
                </div>

                <div className="p-5 space-y-2">
                  <div className="text-xs text-stone-500 flex items-center gap-2">
                    <span>{article.period}</span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {article.readingTimeMinutes} phút đọc
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-lg text-stone-900 group-hover:text-[#1B4332] transition-colors leading-tight">
                    {article.title}
                  </h3>

                  <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                    {article.subtitle}
                  </p>
                </div>
              </div>

              <div className="px-5 pb-4 pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
                <span className="text-stone-400">
                  {article.culturalValues.length} giá trị cốt lõi
                </span>
                <span className="font-semibold text-[#1B4332] group-hover:underline">
                  Xem chi tiết →
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
