import React, { useState } from 'react';
import { CultureArticle } from '../types';
import { useFavorites } from '../context/FavoritesContext';
import { X, Bookmark, Share2, Clock, Check, Sparkles, MapPin } from 'lucide-react';

interface CultureDetailModalProps {
  article: CultureArticle | null;
  onClose: () => void;
}

export const CultureDetailModal: React.FC<CultureDetailModalProps> = ({ article, onClose }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const [copied, setCopied] = useState(false);

  if (!article) return null;

  const isFav = isFavorite(article.id);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleToggleFav = () => {
    toggleFavorite({
      id: article.id,
      type: 'culture',
      title: article.title,
      subtitle: `${article.categoryLabel} · ${article.period}`,
      image: article.image,
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
        {/* Editorial Header Hero */}
        <div className="relative h-64 md:h-80 w-full overflow-hidden bg-stone-900">
          <img
            src={article.image}
            alt={article.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/45 to-transparent" />

          {/* Quick Actions */}
          <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
            <button
              onClick={handleToggleFav}
              className={`p-2.5 rounded-full backdrop-blur-md transition-colors cursor-pointer ${
                isFav
                  ? 'bg-[#9E2A2B] text-white shadow-md'
                  : 'bg-white/80 hover:bg-white text-stone-800'
              }`}
              title={isFav ? 'Bỏ lưu yêu thích' : 'Lưu vào yêu thích'}
            >
              <Bookmark className="w-4 h-4 fill-current" />
            </button>
            <button
              onClick={handleShare}
              className="p-2.5 rounded-full bg-white/80 hover:bg-white text-stone-800 backdrop-blur-md transition-colors cursor-pointer"
              title="Chia sẻ bài viết"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
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
              <span>{article.categoryLabel}</span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" /> {article.readingTimeMinutes} phút đọc
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-white tracking-tight">
              {article.title}
            </h2>
            <p className="text-xs md:text-sm text-stone-300 font-sans mt-1">
              {article.subtitle}
            </p>
          </div>
        </div>

        {/* Article Metadata Bar */}
        <div className="px-6 py-3 bg-stone-100/90 border-b border-stone-200 flex flex-wrap items-center justify-between gap-4 text-xs text-stone-600">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#9E2A2B]" />
            <span>Nguồn cội / Không gian: {article.locationOrOrigin}</span>
          </div>
          <div>
            <span>Thời kỳ: <strong>{article.period}</strong></span>
          </div>
        </div>

        {/* Editorial Body Content */}
        <div className="p-6 md:p-10 space-y-8 max-h-[60vh] overflow-y-auto">
          {/* Drop Cap Opening Paragraph */}
          <div className="text-stone-800 text-base md:text-lg leading-relaxed font-serif">
            <p className="first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-[#9E2A2B]">
              {article.introduction}
            </p>
          </div>

          {/* Pull Quote */}
          {article.pullQuote && (
            <div className="my-8 py-6 px-8 border-y border-stone-300 text-center bg-stone-50/60">
              <blockquote className="text-lg md:text-xl font-serif italic text-stone-900 leading-relaxed">
                “{article.pullQuote.quote}”
              </blockquote>
              <cite className="block text-xs uppercase tracking-widest text-stone-500 mt-2 font-sans not-italic">
                — {article.pullQuote.authorOrSource}
              </cite>
            </div>
          )}

          {/* Content Sections */}
          <div className="space-y-6">
            {article.sections.map((sec, idx) => (
              <div key={idx} className="space-y-2">
                <h3 className="text-lg font-serif font-semibold text-stone-900">
                  {sec.heading}
                </h3>
                <p className="text-sm md:text-base text-stone-700 leading-relaxed font-sans">
                  {sec.content}
                </p>
              </div>
            ))}
          </div>

          {/* Cultural Values Grid */}
          <div className="p-6 rounded-xl bg-[#1B4332]/5 border border-[#1B4332]/20 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#1B4332]">
              Giá Trị Văn Hóa & Tinh Thần Cốt Lõi
            </h4>
            <ul className="space-y-1.5 text-sm text-stone-800">
              {article.culturalValues.map((val, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-[#1B4332] font-bold mt-0.5">•</span>
                  <span>{val}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Fun Facts */}
          {article.funFacts && article.funFacts.length > 0 && (
            <div className="p-5 rounded-xl bg-amber-50/80 border border-amber-200 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#C28B38]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Bạn Có Biết?</span>
              </div>
              <ul className="space-y-1.5 text-xs md:text-sm text-stone-700">
                {article.funFacts.map((fact, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#C28B38] font-bold">•</span>
                    <span>{fact}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 md:px-8 bg-stone-100 border-t border-stone-200 flex items-center justify-between">
          <span className="text-xs text-stone-500">
            Chuyên đề Nghiên cứu Di sản Văn hóa Việt Nam
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-stone-700 hover:text-stone-900 bg-white hover:bg-stone-50 rounded-lg border border-stone-300 transition-colors cursor-pointer"
          >
            Đóng chuyên đề
          </button>
        </div>
      </div>
    </div>
  );
};
