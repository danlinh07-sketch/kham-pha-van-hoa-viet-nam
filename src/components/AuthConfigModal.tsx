import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { X, ExternalLink, Key, Check, Info } from 'lucide-react';

interface AuthConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'facebook' | 'google';
}

export const AuthConfigModal: React.FC<AuthConfigModalProps> = ({ isOpen, onClose, type }) => {
  const { facebookAppId, setFacebookAppId, googleClientId, setGoogleClientId, showToast } = useAuth();
  const { t } = useLanguage();
  const [inputValue, setInputValue] = useState(type === 'facebook' ? facebookAppId : googleClientId);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentOrigin = window.location.origin;

  const handleCopyOrigin = () => {
    navigator.clipboard.writeText(currentOrigin);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    if (type === 'facebook') {
      setFacebookAppId(inputValue.trim());
      showToast('Đã lưu Facebook App ID! Giờ bạn có thể thử đăng nhập.', 'success');
    } else {
      setGoogleClientId(inputValue.trim());
      showToast('Đã lưu Google Client ID! Giờ bạn có thể thử đăng nhập.', 'success');
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn font-sans">
      <div className="relative w-full max-w-lg bg-[#FBF9F5] rounded-2xl shadow-2xl border border-stone-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-stone-200">
          <div className="flex items-center gap-2">
            <Key className="w-5 h-5 text-[#9E2A2B]" />
            <h3 className="font-serif text-lg font-bold text-stone-900">
              {type === 'facebook'
                ? t('auth.facebookConfigTitle', 'Cấu hình Facebook Login')
                : 'Cấu hình Google Sign-In (OAuth 2.0)'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-500 hover:text-stone-800 hover:bg-stone-100 transition-colors cursor-pointer"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 max-h-[80vh] overflow-y-auto text-xs text-stone-700 leading-relaxed">
          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              {type === 'facebook'
                ? 'Để bảo đảm tính bảo mật và thực hiện quy trình đăng nhập Facebook thật, bạn cần cung cấp Facebook App ID đã đăng ký trong Meta for Developers.'
                : 'Để kích hoạt đăng nhập Google an toàn, bạn cần tạo OAuth Client ID trong Google Cloud Console.'}
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-stone-900 uppercase tracking-wider text-[11px]">
              Các bước cấu hình nhanh:
            </h4>
            {type === 'facebook' ? (
              <ol className="list-decimal pl-4 space-y-1.5">
                <li>
                  Truy cập{' '}
                  <a
                    href="https://developers.facebook.com/apps"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#9E2A2B] font-semibold underline inline-flex items-center gap-0.5"
                  >
                    Meta for Developers <ExternalLink className="w-3 h-3" />
                  </a>{' '}
                  và chọn <strong>Tạo ứng dụng</strong> (Loại ứng dụng: <em>Người tiêu dùng</em> hoặc <em>Xác thực</em>).
                </li>
                <li>Thêm sản phẩm <strong>Facebook Login for Business</strong> (Đăng nhập bằng Facebook).</li>
                <li>
                  Trong mục <strong>Cài đặt Facebook Login</strong>, dán URL hiện tại vào danh sách <strong>Valid OAuth Redirect URIs</strong>:
                  <div className="mt-1 flex items-center gap-1.5 bg-stone-200/70 p-2 rounded-lg font-mono text-[11px] text-stone-800">
                    <span className="truncate flex-1">{currentOrigin}</span>
                    <button
                      onClick={handleCopyOrigin}
                      className="px-2 py-1 bg-white rounded border border-stone-300 font-sans font-medium text-[10px] text-stone-700 hover:bg-stone-50 cursor-pointer shrink-0"
                    >
                      {copied ? <Check className="w-3 h-3 text-emerald-600 inline" /> : 'Sao chép'}
                    </button>
                  </div>
                </li>
                <li>Sao chép <strong>App ID</strong> (Mã ứng dụng) và nhập vào ô bên dưới.</li>
              </ol>
            ) : (
              <ol className="list-decimal pl-4 space-y-1.5">
                <li>
                  Mở{' '}
                  <a
                    href="https://console.cloud.google.com/apis/credentials"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#9E2A2B] font-semibold underline inline-flex items-center gap-0.5"
                  >
                    Google Cloud Console <ExternalLink className="w-3 h-3" />
                  </a>
                  .
                </li>
                <li>Tạo <strong>OAuth Client ID</strong> cho ứng dụng Web.</li>
                <li>
                  Thêm nguồn gốc JavaScript được phép (Authorized JavaScript origins):
                  <div className="mt-1 flex items-center gap-1.5 bg-stone-200/70 p-2 rounded-lg font-mono text-[11px] text-stone-800">
                    <span className="truncate flex-1">{currentOrigin}</span>
                    <button
                      onClick={handleCopyOrigin}
                      className="px-2 py-1 bg-white rounded border border-stone-300 font-sans font-medium text-[10px] text-stone-700 hover:bg-stone-50 cursor-pointer shrink-0"
                    >
                      {copied ? <Check className="w-3 h-3 text-emerald-600 inline" /> : 'Sao chép'}
                    </button>
                  </div>
                </li>
                <li>Sao chép <strong>Client ID</strong> (dạng <code>...apps.googleusercontent.com</code>) và dán vào bên dưới.</li>
              </ol>
            )}
          </div>

          <div className="space-y-1.5 pt-2">
            <label className="block font-semibold text-stone-900 text-xs">
              {type === 'facebook' ? 'Facebook App ID:' : 'Google Client ID:'}
            </label>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={type === 'facebook' ? 'Ví dụ: 123456789012345' : 'Ví dụ: 123456789-abc.apps.googleusercontent.com'}
              className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 bg-white text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#9E2A2B] font-mono text-xs"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 bg-stone-50 border-t border-stone-200">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-xs font-medium text-stone-600 hover:bg-stone-200 transition-colors cursor-pointer"
          >
            {t('common.close', 'Đóng')}
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 rounded-lg text-xs font-semibold text-white bg-[#9E2A2B] hover:bg-[#852223] transition-colors cursor-pointer shadow-xs"
          >
            {t('auth.saveAndConnect', 'Lưu & Kích hoạt')}
          </button>
        </div>
      </div>
    </div>
  );
};
