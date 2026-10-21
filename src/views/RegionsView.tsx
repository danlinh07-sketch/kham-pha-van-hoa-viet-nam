import React, { useState } from 'react';
import { REGIONS_METADATA, PROVINCES_DATA, RegionSummary } from '../data/regionData';
import { Region, ProvinceInfo, Dish } from '../types';
import { useFavorites } from '../context/FavoritesContext';
import { MapPin, Compass, Calendar, ArrowRight, Bookmark, Sparkles } from 'lucide-react';

interface RegionsViewProps {
  onSelectProvince: (province: ProvinceInfo) => void;
  onSelectDish: (dish: Dish) => void;
  defaultRegion?: Region;
}

export const RegionsView: React.FC<RegionsViewProps> = ({
  onSelectProvince,
  onSelectDish,
  defaultRegion = 'bac',
}) => {
  const [activeRegion, setActiveRegion] = useState<Region>(defaultRegion);
  const { isFavorite, toggleFavorite } = useFavorites();

  const regionsList: Region[] = ['bac', 'trung', 'taynguyen', 'nam', 'mientay'];
  const currentMetadata: RegionSummary = REGIONS_METADATA[activeRegion];
  const regionProvinces = PROVINCES_DATA.filter((p) => p.region === activeRegion);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Page Header */}
      <div className="border-b border-stone-200 pb-6 space-y-2">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#C28B38]">
          Địa lý & Văn hóa vùng miền
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
          Bản Đồ Khám Phá Việt Nam
        </h1>
        <p className="text-sm sm:text-base text-stone-600 font-sans max-w-3xl leading-relaxed">
          Tìm hiểu đặc trưng tự nhiên, khí hậu, phong vị ẩm thực và những địa phương tiêu biểu dọc theo dải đất hình chữ S từ địa đầu Móng Cái đến chót mũi Cà Mau.
        </p>
      </div>

      {/* Main Interactive Map & Region Overview Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Interactive Visual Map Diagram */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-stone-200 shadow-xs flex flex-col items-center">
          <div className="flex items-center justify-between w-full mb-4 pb-3 border-b border-stone-100">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-[#9E2A2B]" /> Sơ đồ 5 miền địa lý
            </span>
            <span className="text-[11px] text-stone-400">Nhấn vào từng miền</span>
          </div>

          {/* Interactive Stylized S-Map SVG Diagram */}
          <div className="relative w-full max-w-[320px] py-2 flex justify-center">
            <svg
              viewBox="0 0 340 680"
              className="w-full h-auto drop-shadow-sm select-none"
              style={{ maxHeight: '520px' }}
            >
              <defs>
                <linearGradient id="gradBac" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#9E2A2B" />
                  <stop offset="100%" stopColor="#BD3A42" />
                </linearGradient>
                <linearGradient id="gradTrung" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#D97706" />
                  <stop offset="100%" stopColor="#B45309" />
                </linearGradient>
                <linearGradient id="gradTayNguyen" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#4D7C0F" />
                  <stop offset="100%" stopColor="#3F6212" />
                </linearGradient>
                <linearGradient id="gradNam" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0284C7" />
                  <stop offset="100%" stopColor="#0369A1" />
                </linearGradient>
                <linearGradient id="gradMienTay" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1B4332" />
                  <stop offset="100%" stopColor="#2D6A4F" />
                </linearGradient>
              </defs>

              {/* 1. Miền Bắc (Bắc Bộ) */}
              <g
                className="cursor-pointer transition-transform duration-200 hover:opacity-90"
                onClick={() => setActiveRegion('bac')}
              >
                <path
                  d="M130,30 C190,20 270,40 275,100 C280,140 240,165 200,170 C160,175 125,160 100,130 C80,105 90,50 130,30 Z"
                  fill={activeRegion === 'bac' ? 'url(#gradBac)' : '#E7E2D7'}
                  stroke={activeRegion === 'bac' ? '#781D22' : '#D6CEBE'}
                  strokeWidth="2.5"
                />
                <text
                  x="180"
                  y="105"
                  textAnchor="middle"
                  fill={activeRegion === 'bac' ? '#FFFFFF' : '#44403C'}
                  fontSize="13"
                  fontWeight="bold"
                  fontFamily="'Be Vietnam Pro', sans-serif"
                >
                  BẮC BỘ
                </text>
                <text
                  x="180"
                  y="125"
                  textAnchor="middle"
                  fill={activeRegion === 'bac' ? '#FEE2E2' : '#78716C'}
                  fontSize="10"
                >
                  Hà Nội · Sông Hồng
                </text>
              </g>

              {/* 2. Miền Trung (Bắc Trung Bộ & Duyên Hải Nam Trung Bộ) */}
              <g
                className="cursor-pointer transition-transform duration-200 hover:opacity-90"
                onClick={() => setActiveRegion('trung')}
              >
                <path
                  d="M200,170 C230,195 240,230 235,280 C230,340 260,390 270,430 C250,440 215,410 205,360 C195,300 170,220 185,180 Z"
                  fill={activeRegion === 'trung' ? 'url(#gradTrung)' : '#E7E2D7'}
                  stroke={activeRegion === 'trung' ? '#92400E' : '#D6CEBE'}
                  strokeWidth="2.5"
                />
                <text
                  x="225"
                  y="295"
                  textAnchor="middle"
                  fill={activeRegion === 'trung' ? '#FFFFFF' : '#44403C'}
                  fontSize="13"
                  fontWeight="bold"
                  fontFamily="'Be Vietnam Pro', sans-serif"
                >
                  TRUNG BỘ
                </text>
                <text
                  x="225"
                  y="315"
                  textAnchor="middle"
                  fill={activeRegion === 'trung' ? '#FEF3C7' : '#78716C'}
                  fontSize="10"
                >
                  Huế · Đà Nẵng · Hội An
                </text>
              </g>

              {/* 3. Tây Nguyên */}
              <g
                className="cursor-pointer transition-transform duration-200 hover:opacity-90"
                onClick={() => setActiveRegion('taynguyen')}
              >
                <path
                  d="M195,360 C215,365 245,410 230,460 C215,480 175,470 170,430 C165,395 180,370 195,360 Z"
                  fill={activeRegion === 'taynguyen' ? 'url(#gradTayNguyen)' : '#E7E2D7'}
                  stroke={activeRegion === 'taynguyen' ? '#365314' : '#D6CEBE'}
                  strokeWidth="2.5"
                />
                <text
                  x="200"
                  y="420"
                  textAnchor="middle"
                  fill={activeRegion === 'taynguyen' ? '#FFFFFF' : '#44403C'}
                  fontSize="12"
                  fontWeight="bold"
                  fontFamily="'Be Vietnam Pro', sans-serif"
                >
                  TÂY NGUYÊN
                </text>
                <text
                  x="200"
                  y="438"
                  textAnchor="middle"
                  fill={activeRegion === 'taynguyen' ? '#ECFCCB' : '#78716C'}
                  fontSize="9.5"
                >
                  Đắk Lắk · Cồng Chiêng
                </text>
              </g>

              {/* 4. Đông Nam Bộ (Sài Gòn) */}
              <g
                className="cursor-pointer transition-transform duration-200 hover:opacity-90"
                onClick={() => setActiveRegion('nam')}
              >
                <path
                  d="M170,470 C210,480 235,510 220,545 C200,560 160,550 150,520 C145,495 155,475 170,470 Z"
                  fill={activeRegion === 'nam' ? 'url(#gradNam)' : '#E7E2D7'}
                  stroke={activeRegion === 'nam' ? '#0369A1' : '#D6CEBE'}
                  strokeWidth="2.5"
                />
                <text
                  x="185"
                  y="515"
                  textAnchor="middle"
                  fill={activeRegion === 'nam' ? '#FFFFFF' : '#44403C'}
                  fontSize="12"
                  fontWeight="bold"
                  fontFamily="'Be Vietnam Pro', sans-serif"
                >
                  ĐÔNG NAM BỘ
                </text>
                <text
                  x="185"
                  y="533"
                  textAnchor="middle"
                  fill={activeRegion === 'nam' ? '#E0F2FE' : '#78716C'}
                  fontSize="9.5"
                >
                  TP. Hồ Chí Minh
                </text>
              </g>

              {/* 5. Miền Tây (Đồng bằng sông Cửu Long) */}
              <g
                className="cursor-pointer transition-transform duration-200 hover:opacity-90"
                onClick={() => setActiveRegion('mientay')}
              >
                <path
                  d="M140,535 C175,540 190,570 170,620 C140,650 90,640 80,610 C75,575 110,545 140,535 Z"
                  fill={activeRegion === 'mientay' ? 'url(#gradMienTay)' : '#E7E2D7'}
                  stroke={activeRegion === 'mientay' ? '#14532D' : '#D6CEBE'}
                  strokeWidth="2.5"
                />
                <text
                  x="135"
                  y="585"
                  textAnchor="middle"
                  fill={activeRegion === 'mientay' ? '#FFFFFF' : '#44403C'}
                  fontSize="12"
                  fontWeight="bold"
                  fontFamily="'Be Vietnam Pro', sans-serif"
                >
                  MIỀN TÂY
                </text>
                <text
                  x="135"
                  y="603"
                  textAnchor="middle"
                  fill={activeRegion === 'mientay' ? '#DCFCE7' : '#78716C'}
                  fontSize="9.5"
                >
                  Cần Thơ · Sông Tiền Hậu
                </text>
              </g>

              {/* Hoàng Sa & Trường Sa Territory Note */}
              <g transform="translate(250, 230)">
                <circle cx="20" cy="20" r="3" fill="#D97706" />
                <circle cx="35" cy="30" r="2.5" fill="#D97706" />
                <circle cx="28" cy="45" r="3" fill="#D97706" />
                <text x="45" y="35" fontSize="9" fill="#78716C" fontWeight="bold">
                  QĐ. Hoàng Sa
                </text>
              </g>
              <g transform="translate(240, 480)">
                <circle cx="20" cy="20" r="3" fill="#0284C7" />
                <circle cx="35" cy="35" r="2.5" fill="#0284C7" />
                <circle cx="15" cy="50" r="3" fill="#0284C7" />
                <text x="45" y="38" fontSize="9" fill="#78716C" fontWeight="bold">
                  QĐ. Trường Sa
                </text>
              </g>
            </svg>
          </div>

          {/* Quick Region Selector Buttons */}
          <div className="w-full grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4 pt-4 border-t border-stone-100">
            {regionsList.map((rId) => {
              const meta = REGIONS_METADATA[rId];
              const isSelected = activeRegion === rId;
              return (
                <button
                  key={rId}
                  onClick={() => setActiveRegion(rId)}
                  className={`px-3 py-2 text-xs rounded-lg font-medium transition-colors cursor-pointer text-center ${
                    isSelected
                      ? 'bg-[#1C1917] text-white shadow-xs'
                      : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                  }`}
                >
                  {meta.shortTitle}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Selected Region Comprehensive Dossier */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-stone-100 pb-4">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#9E2A2B] font-semibold">
                  Hồ sơ địa lý & văn hóa
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mt-0.5">
                  {currentMetadata.name}
                </h2>
              </div>
              <span className="text-xs text-stone-600 bg-stone-100 px-3 py-1 rounded-full font-mono">
                {currentMetadata.provincesCount} tỉnh / thành
              </span>
            </div>

            <p className="text-base text-stone-800 font-serif italic leading-relaxed">
              “{currentMetadata.slogan}”
            </p>

            <p className="text-sm text-stone-700 leading-relaxed font-sans">
              {currentMetadata.description}
            </p>

            {/* Matrix of Geography vs Culinary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1.5">
                <span className="text-xs font-semibold uppercase tracking-wider text-stone-500 block">
                  Địa hình & Khí hậu
                </span>
                <p className="text-xs text-stone-700 leading-relaxed">
                  {currentMetadata.climateAndGeography}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200/50 space-y-1.5">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#C28B38] block">
                  Triết lý ẩm thực & khẩu vị
                </span>
                <p className="text-xs text-stone-800 leading-relaxed">
                  {currentMetadata.culinaryPhilosophy}
                </p>
              </div>
            </div>
          </div>

          {/* Provinces of Selected Region */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif font-bold text-xl text-stone-900">
                Các Điểm Đến Tiêu Biểu Thuộc {currentMetadata.name}
              </h3>
              <span className="text-xs text-stone-500">
                {regionProvinces.length} địa phương đã lập hồ sơ
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {regionProvinces.map((province) => {
                const isFav = isFavorite(province.id);
                return (
                  <div
                    key={province.id}
                    onClick={() => onSelectProvince(province)}
                    className="bg-white rounded-xl border border-stone-200 p-5 hover:border-[#9E2A2B]/40 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-[#9E2A2B] uppercase tracking-wider flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" /> {province.name}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite({
                              id: province.id,
                              type: 'province',
                              title: province.name,
                              subtitle: `${province.regionName} · ${province.tagline}`,
                              image: province.heroImage,
                            });
                          }}
                          className={`p-1.5 rounded-full transition-colors ${
                            isFav ? 'text-[#9E2A2B]' : 'text-stone-400 hover:text-stone-700'
                          }`}
                          title="Lưu địa phương"
                        >
                          <Bookmark className="w-3.5 h-3.5 fill-current" />
                        </button>
                      </div>

                      <h4 className="font-serif font-bold text-base text-stone-900 group-hover:text-[#9E2A2B] transition-colors leading-snug">
                        {province.tagline}
                      </h4>

                      <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                        {province.description}
                      </p>

                      {/* Specialties quick preview */}
                      <div className="text-[11px] text-stone-500 bg-stone-50 p-2 rounded-lg border border-stone-100">
                        <strong className="text-stone-700">Đặc sản:</strong> {province.specialties.slice(0, 3).join(', ')}...
                      </div>
                    </div>

                    <div className="pt-3 mt-3 border-t border-stone-100 flex items-center justify-between text-xs text-[#9E2A2B] font-semibold">
                      <span>Xem hồ sơ & món ngon</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
