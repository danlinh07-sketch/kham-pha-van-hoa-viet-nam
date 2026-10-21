import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useFavorites } from '../context/FavoritesContext';
import { LogOut, Bookmark, ChevronDown, CheckCircle2, Award } from 'lucide-react';
import { ActiveTab } from './Navbar';

interface UserAccountMenuProps {
  onNavigate: (tab: ActiveTab) => void;
}

export const UserAccountMenu: React.FC<UserAccountMenuProps> = ({ onNavigate }) => {
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const { favorites, quizHistory } = useFavorites();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) return null;

  const handleLogout = async () => {
    setIsOpen(false);
    await logout();
  };

  const handleGoFavorites = () => {
    setIsOpen(false);
    onNavigate('favorites');
  };

  const getProviderLabel = () => {
    if (user.provider === 'google') return 'Google Account';
    if (user.provider === 'facebook') return 'Facebook Account';
    return 'Viet Discover Email';
  };

  const initials = user.name
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : 'U';

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-1 sm:px-2.5 sm:py-1.5 rounded-full sm:rounded-lg border border-stone-200 hover:border-stone-300 bg-white hover:bg-stone-50 transition-all cursor-pointer shadow-2xs"
        aria-label="Menu tài khoản"
        title={user.name}
      >
        {user.avatarUrl ? (
          <img
            src={user.avatarUrl}
            alt={user.name}
            className="w-7 h-7 rounded-full object-cover border border-stone-200"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-7 h-7 rounded-full bg-[#9E2A2B] text-white text-xs font-bold flex items-center justify-center font-sans tracking-wide">
            {initials}
          </div>
        )}
        <span className="hidden sm:inline-block max-w-[120px] truncate text-xs font-sans font-semibold text-stone-800">
          {user.name}
        </span>
        <ChevronDown className={`hidden sm:inline-block w-3.5 h-3.5 text-stone-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 rounded-2xl bg-white border border-stone-200 shadow-xl p-2 z-50 animate-fadeIn font-sans">
          {/* Header with User Info */}
          <div className="p-3 bg-stone-50/80 rounded-xl border border-stone-100 mb-2">
            <div className="flex items-center gap-3">
              {user.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt={user.name}
                  className="w-10 h-10 rounded-full object-cover border border-stone-200 shrink-0"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-[#9E2A2B] text-white text-sm font-bold flex items-center justify-center shrink-0">
                  {initials}
                </div>
              )}
              <div className="min-w-0 flex-1">
                <div className="text-sm font-bold text-stone-900 truncate flex items-center gap-1.5">
                  {user.name}
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                </div>
                <div className="text-xs text-stone-500 truncate">{user.email}</div>
                <div className="mt-1 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#9E2A2B]/10 text-[#9E2A2B]">
                  {getProviderLabel()}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-1">
            <button
              onClick={handleGoFavorites}
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-stone-700 hover:bg-stone-100 hover:text-stone-900 transition-colors cursor-pointer text-left"
            >
              <span className="flex items-center gap-2.5">
                <Bookmark className="w-4 h-4 text-[#9E2A2B]" />
                {t('nav.collection', 'Bộ sưu tập cá nhân')}
              </span>
              <span className="px-1.5 py-0.5 rounded-full bg-stone-200 text-stone-700 text-[10px] font-bold">
                {favorites.length}
              </span>
            </button>

            <button
              onClick={() => {
                setIsOpen(false);
                onNavigate('quiz');
              }}
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-stone-700 hover:bg-stone-100 hover:text-stone-900 transition-colors cursor-pointer text-left"
            >
              <span className="flex items-center gap-2.5">
                <Award className="w-4 h-4 text-amber-600" />
                {t('quiz.title', 'Trắc nghiệm văn hóa')}
              </span>
              {quizHistory.length > 0 && (
                <span className="px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">
                  {quizHistory.length} {t('common.results', 'lần')}
                </span>
              )}
            </button>
          </div>

          {/* Logout Action */}
          <div className="pt-2 mt-2 border-t border-stone-100">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-rose-700 hover:bg-rose-50 transition-colors cursor-pointer text-left"
            >
              <LogOut className="w-4 h-4 text-rose-600" />
              {t('auth.logoutBtn', 'Đăng xuất khỏi tài khoản')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
