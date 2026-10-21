import React from 'react';
import { DISHES_DATA } from '../data/culinaryData';
import { CULTURE_DATA } from '../data/cultureData';
import { Dish, CultureArticle, Region } from '../types';
import { ActiveTab } from '../components/Navbar';
import { useLanguage } from '../context/LanguageContext';
import { Search, Compass, HelpCircle, Utensils, BookOpen, ArrowRight, Sparkles, MapPin } from 'lucide-react';

interface HomeViewProps {
  onNavigate: (tab: ActiveTab) => void;
  onSelectDish: (dish: Dish) => void;
  onSelectCulture: (article: CultureArticle) => void;
  onSelectRegion: (region: Region) => void;
  onOpenSearch: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onSelectDish,
  onSelectCulture,
  onSelectRegion,
  onOpenSearch,
}) => {
  const { t, getLocalizedDish, getRegionLabel } = useLanguage();
  const signatureDishes = DISHES_DATA.filter((d) => d.isSignature).slice(0, 6);
  const featuredCulture = CULTURE_DATA.slice(0, 3);

  const explorationCategories = [
    { title: t('nav.culinary', 'Ẩm thực 3 miền'), desc: t('culinary.subtitle', 'Hương vị truyền thống từ phở, bún đến các món cuốn'), icon: Utensils, tab: 'culinary' as ActiveTab },
    { title: t('nav.culture', 'Di sản & Lễ hội'), desc: t('culture.subtitle', 'Hội Gióng, hội Chùa Hương, Cố đô Huế và Tràng An'), icon: BookOpen, tab: 'culture' as ActiveTab },
    { title: t('nav.tourism', 'Cẩm nang du lịch'), desc: t('tourism.subtitle', 'Khám phá các di sản thế giới, phương tiện & giá vé'), icon: MapPin, tab: 'tourism' as ActiveTab },
    { title: t('nav.exploreMap', 'Bản đồ khám phá'), desc: t('regions.subtitle', 'Địa lý, khí hậu và đặc sản của 5 vùng đất trù phú'), icon: Compass, tab: 'regions' as ActiveTab },
  ];

  return (
    <div className="space-y-20 pb-16 font-sans">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-8 md:pt-12 pb-16 bg-gradient-to-b from-[#F4F0E8] to-[#FBF9F5] border-b border-[#E7E2D7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Brand Copy & Actions */}
            <div className="lg:col-span-7 space-y-6">
              {/* Logo Emblem Header Badge */}
              <div className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-white/90 border border-amber-900/10 shadow-xs">
                <img
                  src="/src/assets/images/viet_discover_app_logo_1792479385154.jpg"
                  alt="VIET DISCOVER Logo"
                  className="w-6 h-6 rounded-md object-cover"
                />
                <span className="text-xs font-semibold tracking-wider text-[#9E2A2B] uppercase">
                  VIET DISCOVER · {t('home.heroTag', 'TINH HOA VĂN HÓA & ẨM THỰC VIỆT NAM')}
                </span>
              </div>

              {/* Grand Title */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-stone-900 tracking-tight leading-[1.15]">
                {t('home.heroTitle', 'Chạm Vào Hương Vị, Khám Phá Linh Hồn Việt')}
              </h1>

              {/* Slogan & Editorial Narrative */}
              <p className="text-base sm:text-lg text-stone-600 font-serif italic max-w-2xl leading-relaxed">
                {t('home.heroSubtitle', 'Hành trình tương tác đa giác quan đưa bạn qua 63 tỉnh thành, hàng trăm món ăn di sản, phong tục cổ truyền và danh thắng rạng danh non sông.')}
              </p>

              {/* Search Shortcut Bar */}
              <div className="max-w-xl">
                <button
                  onClick={onOpenSearch}
                  className="w-full flex items-center justify-between p-3.5 rounded-xl border border-stone-300 bg-white shadow-sm hover:border-[#9E2A2B] hover:shadow-md transition-all text-left cursor-pointer group"
                >
                  <div className="flex items-center gap-3 text-stone-500 group-hover:text-stone-700">
                    <Search className="w-5 h-5 text-[#9E2A2B]" />
                    <span className="text-sm">{t('home.searchPrompt', 'Tìm phở, áo dài, Hạ Long, Hội An, ca trù...')}</span>
                  </div>
                  <span className="text-xs font-medium text-stone-600 bg-stone-100 px-2 py-1 rounded">
                    {t('common.search', 'Tìm kiếm')}
                  </span>
                </button>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => onNavigate('culinary')}
                  className="px-6 py-3 rounded-lg text-sm font-semibold text-white bg-[#9E2A2B] hover:bg-[#852223] active:bg-[#701c1d] transition-colors shadow-sm cursor-pointer flex items-center gap-2"
                >
                  <Utensils className="w-4 h-4" />
                  <span>{t('home.ctaCulinary', 'Khám phá ẩm thực')}</span>
                </button>
                <button
                  onClick={() => onNavigate('regions')}
                  className="px-6 py-3 rounded-lg text-sm font-semibold text-stone-800 bg-white hover:bg-stone-50 border border-stone-300 transition-colors shadow-xs cursor-pointer flex items-center gap-2"
                >
                  <Compass className="w-4 h-4 text-[#C28B38]" />
                  <span>{t('home.ctaRegions', 'Bản đồ vùng miền')}</span>
                </button>
                <button
                  onClick={() => onNavigate('tourism')}
                  className="px-5 py-3 rounded-lg text-sm font-medium text-stone-800 bg-stone-100 hover:bg-stone-200 transition-colors cursor-pointer flex items-center gap-2"
                >
                  <MapPin className="w-4 h-4 text-[#9E2A2B]" />
                  <span>{t('home.ctaTourism', 'Du lịch di sản')}</span>
                </button>
                <button
                  onClick={() => onNavigate('quiz')}
                  className="px-5 py-3 rounded-lg text-sm font-medium text-[#1B4332] bg-[#1B4332]/10 hover:bg-[#1B4332]/15 transition-colors cursor-pointer flex items-center gap-2"
                >
                  <HelpCircle className="w-4 h-4" />
                  <span>{t('nav.quiz', 'Chơi Quiz')}</span>
                </button>
              </div>
            </div>

            {/* Right Column: Hero Showcase Visual */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/80 bg-stone-900 group">
                <img
                  src="/src/assets/images/hero_vietnam_culinary_1792479167052.jpg"
                  alt="Mâm cơm và ẩm thực truyền thống Việt Nam"
                  className="w-full h-80 sm:h-96 object-cover group-hover:scale-103 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <div className="text-xs uppercase tracking-widest text-[#E7C177] font-medium mb-1">
                    {t('home.heroTag', 'Di sản mỹ vị Việt Nam')}
                  </div>
                  <h3 className="font-serif font-bold text-xl text-white">
                    {t('home.heroTitle', 'Tinh hoa giao thoa từ đất và trời')}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. EXPLORATION CATEGORIES (Cards) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#9E2A2B]">
            {t('home.exploreRegions', 'Hệ sinh thái khám phá')}
          </span>
          <h2 className="text-3xl font-serif font-bold text-stone-900 tracking-tight">
            {t('home.exploreRegions', 'Khám Phá Theo Chủ Đề')}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {explorationCategories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div
                key={idx}
                onClick={() => onNavigate(cat.tab)}
                className="p-6 rounded-2xl bg-white border border-stone-200 hover:border-[#9E2A2B]/40 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-stone-100 group-hover:bg-[#9E2A2B]/10 flex items-center justify-center transition-colors">
                    <Icon className="w-5 h-5 text-stone-700 group-hover:text-[#9E2A2B] transition-colors" />
                  </div>
                  <h3 className="font-serif font-bold text-lg text-stone-900 group-hover:text-[#9E2A2B] transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {cat.desc}
                  </p>
                </div>
                <div className="pt-4 flex items-center gap-1.5 text-xs font-semibold text-[#9E2A2B]">
                  <span>{t('common.viewDetail', 'Xem chuyên mục')}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. SIGNATURE DISHES SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-stone-200 gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#9E2A2B]">
              {t('home.featuredDishes', 'Tuyển tập di sản')}
            </span>
            <h2 className="text-3xl font-serif font-bold text-stone-900 tracking-tight mt-1">
              {t('home.featuredDishes', 'Món Ăn Nổi Bật')}
            </h2>
          </div>
          <button
            onClick={() => onNavigate('culinary')}
            className="text-xs font-semibold text-[#9E2A2B] hover:underline flex items-center gap-1.5 cursor-pointer whitespace-nowrap self-start sm:self-auto"
          >
            <span>{t('common.all', 'Xem tất cả món ăn')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {signatureDishes.map((rawDish) => {
            const dish = getLocalizedDish(rawDish);
            return (
              <div
                key={rawDish.id}
                onClick={() => onSelectDish(rawDish)}
                className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-lg hover:border-[#9E2A2B]/40 transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
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
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 to-transparent" />
                    <div className="absolute bottom-3 left-3 text-white text-xs font-medium">
                      {dish.province}
                    </div>
                  </div>
                  <div className="p-5 space-y-2">
                    <div className="flex items-center gap-2 text-xs text-stone-500 font-sans">
                      <span>{getRegionLabel(dish.region)}</span>
                      <span aria-hidden="true">·</span>
                      <span className="italic">{dish.englishName}</span>
                    </div>
                    <h3 className="font-sans font-bold text-base sm:text-lg text-stone-900 group-hover:text-[#9E2A2B] transition-colors">
                      {dish.name}
                    </h3>
                    <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                      {dish.shortDesc}
                    </p>
                  </div>
                </div>
                <div className="px-5 pb-5 pt-2 border-t border-stone-100 flex items-center justify-between text-xs text-[#9E2A2B] font-semibold">
                  <span>{t('common.viewDetail', 'Xem chi tiết')}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. CULTURAL MONOGRAPHS FEATURE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-stone-200 gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#1B4332]">
              {t('home.featuredCulture', 'Linh hồn dân tộc')}
            </span>
            <h2 className="text-3xl font-serif font-bold text-stone-900 tracking-tight mt-1">
              {t('home.featuredCulture', 'Câu Chuyện Văn Hóa & Di Sản')}
            </h2>
          </div>
          <button
            onClick={() => onNavigate('culture')}
            className="text-xs font-semibold text-[#1B4332] hover:underline flex items-center gap-1.5 cursor-pointer whitespace-nowrap self-start sm:self-auto"
          >
            <span>{t('common.all', 'Xem toàn bộ')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {featuredCulture.map((article) => (
            <div
              key={article.id}
              onClick={() => onSelectCulture(article)}
              className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-lg hover:border-[#1B4332]/40 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="relative h-52 w-full overflow-hidden bg-stone-900">
                  <img
                    src={article.image}
                    alt={article.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-950/20 to-transparent" />
                  <div className="absolute bottom-3 left-3 text-white text-xs">
                    {article.categoryLabel}
                  </div>
                </div>
                <div className="p-5 space-y-2">
                  <div className="text-xs text-stone-500">
                    <span>{article.period}</span> · <span>{article.readingTimeMinutes} {t('culture.readingTime', 'phút đọc')}</span>
                  </div>
                  <h3 className="font-serif font-bold text-lg text-stone-900 group-hover:text-[#1B4332] transition-colors leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                    {article.subtitle}
                  </p>
                </div>
              </div>
              <div className="px-5 pb-5 pt-2 border-t border-stone-100 flex items-center justify-between text-xs text-[#1B4332] font-semibold">
                <span>{t('common.viewDetail', 'Đọc bài nghiên cứu')}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. INTERACTIVE QUIZ TEASER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-[#1C1917] text-white p-8 sm:p-12 relative overflow-hidden shadow-xl border border-stone-800">
          <div className="relative z-10 max-w-2xl space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-[#E7C177] text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              {t('quiz.title', 'Trải nghiệm tương tác học tập')}
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight">
              {t('quiz.title', 'Bạn hiểu Việt Nam đến đâu?')}
            </h2>
            <p className="text-sm sm:text-base text-stone-300 leading-relaxed font-sans">
              {t('quiz.subtitle', 'Thử thách kiến thức văn hóa qua các câu hỏi trắc nghiệm thú vị')}
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onNavigate('quiz')}
                className="px-6 py-3 rounded-lg text-sm font-semibold text-[#1C1917] bg-[#C28B38] hover:bg-[#d49942] transition-colors shadow-sm cursor-pointer flex items-center gap-2"
              >
                <HelpCircle className="w-4 h-4" />
                <span>{t('quiz.start', 'Bắt đầu thử thách ngay')}</span>
              </button>
            </div>
          </div>
          <div className="absolute -right-16 -bottom-16 w-80 h-80 rounded-full bg-[#9E2A2B]/20 blur-3xl pointer-events-none" />
        </div>
      </section>
    </div>
  );
};
