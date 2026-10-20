import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { X, Lock, Mail, User as UserIcon, Eye, EyeOff, AlertCircle, Loader2 } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'login' | 'register';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  defaultTab = 'login',
}) => {
  const {
    loginWithEmail,
    registerWithEmail,
    loginWithGoogle,
    loginWithFacebook,
    isLoading,
  } = useAuth();
  const { t } = useLanguage();

  const [activeTab, setActiveTab] = useState<'login' | 'register'>(defaultTab);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const resetForm = () => {
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setErrorMessage(null);
  };

  const handleSwitchTab = (tab: 'login' | 'register') => {
    setActiveTab(tab);
    setErrorMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email.trim() || !password) {
      setErrorMessage(t('auth.emptyFields', 'Vui lòng điền đầy đủ các thông tin yêu cầu.'));
      return;
    }

    if (password.length < 6) {
      setErrorMessage(t('auth.passwordTooShort', 'Mật khẩu phải từ 6 ký tự trở lên.'));
      return;
    }

    if (activeTab === 'register') {
      if (!name.trim()) {
        setErrorMessage(t('auth.emptyFields', 'Vui lòng nhập họ và tên của bạn.'));
        return;
      }
      if (password !== confirmPassword) {
        setErrorMessage(t('auth.passwordMismatch', 'Mật khẩu xác nhận không khớp.'));
        return;
      }

      const res = await registerWithEmail(name, email, password);
      if (res.success) {
        resetForm();
        onClose();
      } else {
        setErrorMessage(t(res.error || 'auth.invalidCredentials', 'Đăng ký không thành công.'));
      }
    } else {
      const res = await loginWithEmail(email, password);
      if (res.success) {
        resetForm();
        onClose();
      } else {
        setErrorMessage(t(res.error || 'auth.invalidCredentials', 'Email hoặc mật khẩu không chính xác.'));
      }
    }
  };

  const handleGoogleLogin = async () => {
    setErrorMessage(null);
    const res = await loginWithGoogle();
    if (res.success) {
      resetForm();
      onClose();
    } else if (res.error && res.error !== 'Chưa có Google Client ID') {
      setErrorMessage(t(res.error, res.error));
    }
  };

  const handleFacebookLogin = async () => {
    setErrorMessage(null);
    const res = await loginWithFacebook();
    if (res.success) {
      resetForm();
      onClose();
    } else if (res.error && res.error !== 'Chưa cấu hình Facebook App ID') {
      setErrorMessage(t(res.error, res.error));
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn font-sans"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="relative w-full max-w-md bg-[#FBF9F5] rounded-3xl shadow-2xl border border-stone-200 overflow-hidden animate-scaleUp">
        {/* Cultural Top Banner Accent */}
        <div className="h-2 bg-gradient-to-r from-[#9E2A2B] via-[#C99700] to-[#2B6043]" />

        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-3">
          <div>
            <h2 className="font-serif text-2xl font-bold text-stone-900 tracking-tight">
              {activeTab === 'login'
                ? t('auth.loginTitle', 'Đăng nhập')
                : t('auth.registerTitle', 'Tạo tài khoản')}
            </h2>
            <p className="text-xs text-stone-500 mt-1 leading-relaxed">
              {activeTab === 'login'
                ? t('auth.loginDesc', 'Đăng nhập để đồng bộ và lưu giữ các trải nghiệm văn hóa.')
                : t('auth.registerDesc', 'Tạo tài khoản để khám phá và lưu giữ di sản Việt Nam.')}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 -mr-2 text-stone-400 hover:text-stone-700 hover:bg-stone-200/50 rounded-full transition-colors cursor-pointer"
            aria-label="Đóng cửa sổ"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs: Đăng nhập / Đăng ký */}
        <div className="px-6 pt-2">
          <div className="grid grid-cols-2 p-1 bg-stone-200/60 rounded-xl text-xs font-semibold">
            <button
              onClick={() => handleSwitchTab('login')}
              className={`py-2 rounded-lg transition-all cursor-pointer ${
                activeTab === 'login'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {t('auth.tabLogin', 'Đăng nhập')}
            </button>
            <button
              onClick={() => handleSwitchTab('register')}
              className={`py-2 rounded-lg transition-all cursor-pointer ${
                activeTab === 'register'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {t('auth.tabRegister', 'Đăng ký')}
            </button>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-6 pt-4 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Error Banner */}
          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5 animate-fadeIn">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div className="flex-1">{errorMessage}</div>
            </div>
          )}

          {/* Social OAuth Buttons */}
          <div className="space-y-2.5">
            {/* Google Login Button */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-xl border border-stone-300 hover:border-stone-400 bg-white hover:bg-stone-50 text-stone-800 text-xs font-semibold transition-all shadow-2xs cursor-pointer disabled:opacity-50"
            >
              {/* Official Google Icon */}
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.87c2.26-2.09 3.67-5.17 3.67-9.15z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.87-3.05c-1.08.72-2.45 1.16-4.06 1.16-3.13 0-5.78-2.11-6.73-4.96H1.28v3.15C3.26 21.36 7.35 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.27 14.24c-.25-.72-.38-1.49-.38-2.24s.13-1.52.38-2.24V6.61H1.28C.47 8.24 0 10.07 0 12s.47 3.76 1.28 5.39l3.99-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.26 2.64 1.28 6.61l3.99 3.15c.95-2.85 3.6-4.96 6.73-4.96z"
                />
              </svg>
              <span>{t('auth.continueWithGoogle', 'Tiếp tục với Google')}</span>
            </button>

            {/* Facebook Login Button */}
            <button
              type="button"
              onClick={handleFacebookLogin}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-xl border border-[#1877F2]/30 hover:border-[#1877F2] bg-[#1877F2] hover:bg-[#166FE5] text-white text-xs font-semibold transition-all shadow-2xs cursor-pointer disabled:opacity-50"
            >
              {/* Official Facebook Icon */}
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span>{t('auth.continueWithFacebook', 'Tiếp tục với Facebook')}</span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative flex items-center justify-center py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-stone-200" />
            </div>
            <span className="relative px-3 bg-[#FBF9F5] text-[11px] font-medium text-stone-500 uppercase tracking-wider">
              {t('auth.orEmail', 'hoặc tiếp tục với email')}
            </span>
          </div>

          {/* Email / Password Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {activeTab === 'register' && (
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  {t('auth.name', 'Họ và tên')}
                </label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t('auth.namePlaceholder', 'Nguyễn Văn An')}
                    required
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-stone-900 text-xs focus:outline-none focus:ring-2 focus:ring-[#9E2A2B] focus:border-transparent transition-all placeholder:text-stone-400"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                {t('auth.email', 'Địa chỉ Email')}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('auth.emailPlaceholder', 'you@example.com')}
                  required
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-stone-900 text-xs focus:outline-none focus:ring-2 focus:ring-[#9E2A2B] focus:border-transparent transition-all placeholder:text-stone-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                {t('auth.password', 'Mật khẩu')}
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t('auth.passwordPlaceholder', '•••••••• (tối thiểu 6 ký tự)')}
                  required
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-stone-300 bg-white text-stone-900 text-xs focus:outline-none focus:ring-2 focus:ring-[#9E2A2B] focus:border-transparent transition-all placeholder:text-stone-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 cursor-pointer"
                  aria-label="Ẩn hiện mật khẩu"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {activeTab === 'register' && (
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  {t('auth.confirmPassword', 'Xác nhận mật khẩu')}
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder={t('auth.confirmPasswordPlaceholder', 'Nhập lại mật khẩu')}
                    required
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-stone-900 text-xs focus:outline-none focus:ring-2 focus:ring-[#9E2A2B] focus:border-transparent transition-all placeholder:text-stone-400"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3 px-4 rounded-xl font-sans font-semibold text-xs text-white bg-[#9E2A2B] hover:bg-[#852223] active:bg-[#701c1d] transition-all shadow-md cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{t('common.loading', 'Đang xử lý...')}</span>
                </>
              ) : activeTab === 'login' ? (
                t('auth.submitLogin', 'Đăng nhập vào hệ thống')
              ) : (
                t('auth.submitRegister', 'Hoàn tất đăng ký')
              )}
            </button>
          </form>

          {/* Switch Tab Footer */}
          <div className="pt-2 text-center text-xs text-stone-600">
            {activeTab === 'login' ? (
              <p>
                {t('auth.noAccount', 'Chưa có tài khoản?')}{' '}
                <button
                  type="button"
                  onClick={() => handleSwitchTab('register')}
                  className="font-semibold text-[#9E2A2B] hover:underline cursor-pointer"
                >
                  {t('auth.registerNow', 'Đăng ký ngay')}
                </button>
              </p>
            ) : (
              <p>
                {t('auth.hasAccount', 'Đã có tài khoản?')}{' '}
                <button
                  type="button"
                  onClick={() => handleSwitchTab('login')}
                  className="font-semibold text-[#9E2A2B] hover:underline cursor-pointer"
                >
                  {t('auth.loginNow', 'Đăng nhập')}
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
