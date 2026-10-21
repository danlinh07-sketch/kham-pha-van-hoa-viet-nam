import React, { useState } from 'react';
import { Logo } from './Logo';
import { useFavorites } from '../context/FavoritesContext';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { LanguageSelector } from './LanguageSelector';
import { UserAccountMenu } from './UserAccountMenu';
import { Search, Bookmark, Menu, X, HelpCircle, Compass, User, LogOut } from 'lucide-react';

export type ActiveTab = 'home' | 'culinary' | 'culture' | 'regions' | 'tourism' | 'quiz' | 'favorites';

interface NavbarProps {
  activeTab: ActiveTab;
  onNavigate: (tab: ActiveTab) => void;
  onOpenSearch: () => void;
  onOpenAuth: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onNavigate,
  onOpenSearch,
  onOpenAuth,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { favorites } = useFavorites();
  const { t } = useLanguage();
  const { user, isAuthenticated, logout } = useAuth();

  const navLinks: { id: ActiveTab; label: string }[] = [
    { id: 'home', label: t('nav.home', 'Trang chủ') },
    { id: 'culinary', label: t('nav.culinary', 'Ẩm thực') },
    { id: 'culture', label: t('nav.culture', 'Văn hóa') },
    { id: 'regions', label: t('nav.regions', 'Vùng miền') },
    { id: 'tourism', label: t('nav.tourism', 'Du lịch') },
    { id: 'quiz', label: t('nav.quiz', 'Quiz') },
  ];

  const handleNavClick = (tab: ActiveTab) => {
    onNavigate(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FBF9F5]/95 backdrop-blur-md border-b border-[#E7E2D7] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4 lg:gap-8">
        {/* Zone 1: Brand Wordmark with User Emblem */}
        <button
          onClick={() => handleNavClick('home')}
          className="cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9E2A2B] rounded-lg shrink-0"
          aria-label="Về trang chủ Viet Discover"
        >
          <Logo size="sm" />
        </button>

        {/* Zone 2: Navigation Links (Clean, Balanced, Multi-Language, No Giới thiệu) */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-7 text-sm font-sans font-medium">
          {navLinks.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`cursor-pointer whitespace-nowrap transition-colors duration-200 relative py-1 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#9E2A2B] font-sans ${
                  isActive
                    ? 'text-[#9E2A2B] font-semibold'
                    : 'text-stone-700 hover:text-stone-950'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#9E2A2B] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Utilities + Language Selector + User Account */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Universal Search Trigger */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-lg border border-stone-200 hover:border-stone-300 bg-stone-50/70 hover:bg-stone-100 text-xs font-sans text-stone-600 hover:text-stone-900 transition-colors cursor-pointer"
            title="Tìm kiếm (hoặc nhấn Cmd/Ctrl + K)"
            aria-label="Tìm kiếm món ăn, văn hóa"
          >
            <Search className="w-3.5 h-3.5 text-stone-500" />
            <span className="hidden xl:inline">{t('nav.search', 'Tìm kiếm...')}</span>
            <kbd className="hidden md:inline-block px-1 py-0.2 text-[10px] bg-stone-200/60 rounded text-stone-500 font-mono">
              /
            </kbd>
          </button>

          {/* 4-Language Selector Dropdown */}
          <LanguageSelector variant="desktop" />

          {/* Bookmarks Counter */}
          <button
            onClick={() => handleNavClick('favorites')}
            className={`relative p-2 rounded-lg border transition-colors cursor-pointer ${
              activeTab === 'favorites'
                ? 'bg-[#9E2A2B]/10 border-[#9E2A2B]/30 text-[#9E2A2B]'
                : 'border-stone-200 hover:border-stone-300 text-stone-700 hover:bg-stone-50'
            }`}
            title={t('nav.favorites', 'Bộ sưu tập yêu thích')}
            aria-label={t('nav.favorites', 'Xem yêu thích')}
          >
            <Bookmark className="w-4 h-4" />
            {favorites.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#9E2A2B] text-white text-[10px] font-bold flex items-center justify-center font-mono">
                {favorites.length}
              </span>
            )}
          </button>

          {/* User Account / Login Button */}
          {isAuthenticated && user ? (
            <UserAccountMenu onNavigate={onNavigate} />
          ) : (
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 rounded-lg border border-stone-200 hover:border-stone-300 bg-white hover:bg-stone-50 text-xs font-sans font-semibold text-stone-800 transition-colors cursor-pointer shadow-2xs"
              title={t('auth.login', 'Đăng nhập')}
            >
              <User className="w-3.5 h-3.5 text-[#9E2A2B]" />
              <span className="whitespace-nowrap">{t('nav.login', 'Đăng nhập')}</span>
            </button>
          )}

          {/* Primary Action Button: Khám phá */}
          <button
            onClick={() => handleNavClick('regions')}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-sans font-semibold text-white bg-[#9E2A2B] hover:bg-[#852223] active:bg-[#701c1d] rounded-lg transition-colors shadow-xs cursor-pointer"
          >
            <Compass className="w-3.5 h-3.5" />
            <span className="whitespace-nowrap">{t('nav.exploreMap', 'Bản đồ')}</span>
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg border border-stone-200 text-stone-700 hover:bg-stone-100 cursor-pointer"
            aria-label="Mở menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-stone-200 bg-[#FBF9F5] px-4 pt-3 pb-5 space-y-3 animate-fadeIn font-sans">
          {/* Navigation Items */}
          <div className="space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-sans font-medium transition-colors cursor-pointer ${
                  activeTab === link.id
                    ? 'bg-[#9E2A2B]/10 text-[#9E2A2B] font-semibold'
                    : 'text-stone-700 hover:bg-stone-100'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Language Switcher for Mobile */}
          <LanguageSelector variant="mobile" />

          {/* Mobile Account Section */}
          <div className="pt-2 border-t border-stone-200">
            {isAuthenticated && user ? (
              <div className="p-3 bg-white rounded-xl border border-stone-200 space-y-2.5">
                <div className="flex items-center gap-2.5">
                  {user.avatarUrl ? (
                    <img
                      src={user.avatarUrl}
                      alt={user.name}
                      className="w-9 h-9 rounded-full object-cover border border-stone-200"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-[#9E2A2B] text-white text-xs font-bold flex items-center justify-center">
                      {user.name.slice(0, 2).toUpperCase()}
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-bold text-stone-900 truncate">{user.name}</div>
                    <div className="text-[11px] text-stone-500 truncate">{user.email}</div>
                  </div>
                </div>
                <div className="flex gap-2 pt-1 border-t border-stone-100">
                  <button
                    onClick={() => handleNavClick('favorites')}
                    className="flex-1 py-1.5 px-2 bg-stone-100 rounded-lg text-xs font-medium text-stone-700 hover:bg-stone-200 text-center cursor-pointer"
                  >
                    {t('nav.favorites', 'Yêu thích')} ({favorites.length})
                  </button>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="py-1.5 px-3 bg-rose-50 text-rose-700 rounded-lg text-xs font-medium hover:bg-rose-100 flex items-center gap-1 cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    {t('auth.logoutBtn', 'Đăng xuất')}
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-sans font-semibold text-white bg-[#9E2A2B] rounded-lg cursor-pointer"
              >
                <User className="w-4 h-4" />
                {t('auth.login', 'Đăng nhập / Đăng ký tài khoản')}
              </button>
            )}
          </div>

          {/* Quick Action Buttons */}
          <div className="pt-2 flex gap-2">
            <button
              onClick={() => handleNavClick('regions')}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-sans font-semibold text-stone-800 bg-stone-200/80 rounded-lg cursor-pointer hover:bg-stone-300"
            >
              <Compass className="w-4 h-4" />
              {t('nav.exploreMap', 'Khám phá vùng miền')}
            </button>
            <button
              onClick={() => handleNavClick('quiz')}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-sans font-medium text-stone-800 bg-stone-200/80 rounded-lg cursor-pointer hover:bg-stone-300"
            >
              <HelpCircle className="w-4 h-4" />
              {t('nav.quiz', 'Chơi Quiz')}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
