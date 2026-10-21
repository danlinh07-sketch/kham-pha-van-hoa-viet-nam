import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { hashPassword } from '../utils/crypto';

interface ToastState {
  type: 'success' | 'error' | 'info';
  message: string;
}

interface StoredAccount {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  createdAt: number;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  loginWithEmail: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  registerWithEmail: (name: string, email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  loginWithGoogle: () => Promise<{ success: boolean; error?: string }>;
  loginWithFacebook: () => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  toast: ToastState | null;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  clearToast: () => void;
  // Provider config helpers
  googleClientId: string;
  setGoogleClientId: (id: string) => void;
  facebookAppId: string;
  setFacebookAppId: (id: string) => void;
  isFbConfigModalOpen: boolean;
  setIsFbConfigModalOpen: (open: boolean) => void;
  isGoogleConfigModalOpen: boolean;
  setIsGoogleConfigModalOpen: (open: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'viet_discover_auth_user_v1';
const ACCOUNTS_STORAGE_KEY = 'viet_discover_accounts_v1';
const GOOGLE_CLIENT_ID_KEY = 'viet_discover_google_client_id_v1';
const FB_APP_ID_KEY = 'viet_discover_fb_app_id_v1';

declare global {
  interface Window {
    google?: any;
    FB?: any;
    fbAsyncInit?: () => void;
  }
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem(AUTH_STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<ToastState | null>(null);

  // Configuration IDs (fallback from Vite env or user input)
  const [googleClientId, setGoogleClientIdState] = useState<string>(() => {
    return (
      (import.meta as any).env?.VITE_GOOGLE_CLIENT_ID ||
      localStorage.getItem(GOOGLE_CLIENT_ID_KEY) ||
      ''
    );
  });

  const [facebookAppId, setFacebookAppIdState] = useState<string>(() => {
    return (
      (import.meta as any).env?.VITE_FACEBOOK_APP_ID ||
      localStorage.getItem(FB_APP_ID_KEY) ||
      ''
    );
  });

  const [isFbConfigModalOpen, setIsFbConfigModalOpen] = useState(false);
  const [isGoogleConfigModalOpen, setIsGoogleConfigModalOpen] = useState(false);

  const setGoogleClientId = (id: string) => {
    setGoogleClientIdState(id);
    localStorage.setItem(GOOGLE_CLIENT_ID_KEY, id);
  };

  const setFacebookAppId = (id: string) => {
    setFacebookAppIdState(id);
    localStorage.setItem(FB_APP_ID_KEY, id);
  };

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setToast({ message, type });
  };

  const clearToast = () => {
    setToast(null);
  };

  // Auto-dismiss toast
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      setToast(null);
    }, 4500);
    return () => clearTimeout(timer);
  }, [toast]);

  // Sync user state to localStorage
  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    } catch {
      // ignore
    }
  }, [user]);

  // Initialize Facebook SDK if appId is available
  useEffect(() => {
    if (!facebookAppId) return;
    if (window.FB) {
      try {
        window.FB.init({
          appId: facebookAppId,
          cookie: true,
          xfbml: true,
          version: 'v20.0',
        });
      } catch (err) {
        console.warn('FB.init error:', err);
      }
    } else {
      window.fbAsyncInit = function () {
        window.FB.init({
          appId: facebookAppId,
          cookie: true,
          xfbml: true,
          version: 'v20.0',
        });
      };
    }
  }, [facebookAppId]);

  // Email Register
  const registerWithEmail = async (name: string, email: string, pass: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    try {
      const normalizedEmail = email.trim().toLowerCase();
      const accountsRaw = localStorage.getItem(ACCOUNTS_STORAGE_KEY);
      const accounts: StoredAccount[] = accountsRaw ? JSON.parse(accountsRaw) : [];

      if (accounts.some((acc) => acc.email === normalizedEmail)) {
        setIsLoading(false);
        return { success: false, error: 'auth.emailExists' };
      }

      const passwordHash = await hashPassword(pass, normalizedEmail);
      const newAccount: StoredAccount = {
        id: `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        name: name.trim(),
        email: normalizedEmail,
        passwordHash,
        createdAt: Date.now(),
      };

      accounts.push(newAccount);
      localStorage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(accounts));

      const loggedUser: User = {
        id: newAccount.id,
        name: newAccount.name,
        email: newAccount.email,
        provider: 'email',
        createdAt: newAccount.createdAt,
      };

      setUser(loggedUser);
      setIsLoading(false);
      showToast('Đăng ký tài khoản thành công!', 'success');
      return { success: true };
    } catch {
      setIsLoading(false);
      return { success: false, error: 'auth.invalidCredentials' };
    }
  };

  // Email Login
  const loginWithEmail = async (email: string, pass: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    try {
      const normalizedEmail = email.trim().toLowerCase();
      const accountsRaw = localStorage.getItem(ACCOUNTS_STORAGE_KEY);
      const accounts: StoredAccount[] = accountsRaw ? JSON.parse(accountsRaw) : [];

      const account = accounts.find((acc) => acc.email === normalizedEmail);
      if (!account) {
        setIsLoading(false);
        return { success: false, error: 'auth.invalidCredentials' };
      }

      const hash = await hashPassword(pass, normalizedEmail);
      if (hash !== account.passwordHash) {
        setIsLoading(false);
        return { success: false, error: 'auth.invalidCredentials' };
      }

      const loggedUser: User = {
        id: account.id,
        name: account.name,
        email: account.email,
        provider: 'email',
        createdAt: account.createdAt,
      };

      setUser(loggedUser);
      setIsLoading(false);
      showToast(`Chào mừng ${account.name} quay trở lại!`, 'success');
      return { success: true };
    } catch {
      setIsLoading(false);
      return { success: false, error: 'auth.invalidCredentials' };
    }
  };

  // Google Sign-In with OAuth Token Client
  const loginWithGoogle = async (): Promise<{ success: boolean; error?: string }> => {
    if (!googleClientId) {
      setIsGoogleConfigModalOpen(true);
      return { success: false, error: 'Chưa có Google Client ID' };
    }

    if (!window.google?.accounts?.oauth2) {
      showToast('Thư viện Google Identity Services đang tải, vui lòng thử lại sau giây lát.', 'error');
      return { success: false, error: 'auth.googleAuthFailed' };
    }

    setIsLoading(true);

    return new Promise((resolve) => {
      try {
        const client = window.google.accounts.oauth2.initTokenClient({
          client_id: googleClientId,
          scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email openid',
          callback: async (tokenResponse: any) => {
            if (tokenResponse?.error) {
              setIsLoading(false);
              showToast('Quy trình xác thực Google đã bị hủy hoặc gặp lỗi.', 'error');
              resolve({ success: false, error: 'auth.googleCancelled' });
              return;
            }

            try {
              const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                headers: {
                  Authorization: `Bearer ${tokenResponse.access_token}`,
                },
              });

              if (!res.ok) {
                throw new Error('Failed to fetch userinfo from Google');
              }

              const info = await res.json();
              const googleUser: User = {
                id: info.sub || `g_${Date.now()}`,
                name: info.name || info.given_name || 'Người dùng Google',
                email: info.email || 'google_user@gmail.com',
                avatarUrl: info.picture,
                provider: 'google',
                createdAt: Date.now(),
              };

              setUser(googleUser);
              setIsLoading(false);
              showToast(`Đăng nhập Google thành công! Chào ${googleUser.name}.`, 'success');
              resolve({ success: true });
            } catch (err) {
              setIsLoading(false);
              showToast('Không thể lấy thông tin tài khoản Google. Vui lòng thử lại.', 'error');
              resolve({ success: false, error: 'auth.googleAuthFailed' });
            }
          },
          error_callback: (err: any) => {
            setIsLoading(false);
            console.warn('Google OAuth error:', err);
            showToast('Đăng nhập Google bị hủy hoặc cửa sổ bị đóng.', 'info');
            resolve({ success: false, error: 'auth.googleCancelled' });
          },
        });

        client.requestAccessToken({ prompt: 'select_account' });
      } catch (err) {
        setIsLoading(false);
        console.error('Google login execution error:', err);
        showToast('Lỗi khởi chạy Google Sign-In.', 'error');
        resolve({ success: false, error: 'auth.googleAuthFailed' });
      }
    });
  };

  // Facebook Login with Official SDK
  const loginWithFacebook = async (): Promise<{ success: boolean; error?: string }> => {
    if (!facebookAppId) {
      // Prompt user with Meta for Developers configuration modal
      setIsFbConfigModalOpen(true);
      return { success: false, error: 'Chưa cấu hình Facebook App ID' };
    }

    if (!window.FB) {
      showToast('Facebook SDK chưa sẵn sàng. Vui lòng kiểm tra kết nối mạng.', 'error');
      return { success: false, error: 'auth.facebookCancelled' };
    }

    setIsLoading(true);

    return new Promise((resolve) => {
      try {
        window.FB.login(
          (response: any) => {
            if (response.authResponse) {
              window.FB.api('/me', { fields: 'id,name,email,picture.type(large)' }, (userInfo: any) => {
                const fbUser: User = {
                  id: userInfo.id || `fb_${Date.now()}`,
                  name: userInfo.name || 'Người dùng Facebook',
                  email: userInfo.email || `${userInfo.id}@facebook.user`,
                  avatarUrl: userInfo.picture?.data?.url,
                  provider: 'facebook',
                  createdAt: Date.now(),
                };

                setUser(fbUser);
                setIsLoading(false);
                showToast(`Đăng nhập Facebook thành công! Chào ${fbUser.name}.`, 'success');
                resolve({ success: true });
              });
            } else {
              setIsLoading(false);
              showToast('Đăng nhập Facebook đã bị hủy.', 'info');
              resolve({ success: false, error: 'auth.facebookCancelled' });
            }
          },
          { scope: 'public_profile,email' }
        );
      } catch (err) {
        setIsLoading(false);
        console.error('Facebook login error:', err);
        showToast('Lỗi kết nối Facebook SDK.', 'error');
        resolve({ success: false, error: 'auth.facebookCancelled' });
      }
    });
  };

  // Logout
  const logout = async (): Promise<void> => {
    try {
      if (user?.provider === 'google' && window.google?.accounts?.id && user.email) {
        try {
          window.google.accounts.id.revoke(user.email, () => {});
        } catch {
          // ignore
        }
      }

      if (user?.provider === 'facebook' && window.FB) {
        try {
          window.FB.logout();
        } catch {
          // ignore
        }
      }
    } catch {
      // ignore
    }

    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
    showToast('Đăng xuất thành công!', 'info');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        loginWithEmail,
        registerWithEmail,
        loginWithGoogle,
        loginWithFacebook,
        logout,
        toast,
        showToast,
        clearToast,
        googleClientId,
        setGoogleClientId,
        facebookAppId,
        setFacebookAppId,
        isFbConfigModalOpen,
        setIsFbConfigModalOpen,
        isGoogleConfigModalOpen,
        setIsGoogleConfigModalOpen,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
