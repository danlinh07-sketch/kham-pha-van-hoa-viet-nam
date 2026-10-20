import React, { createContext, useContext, useState, useEffect } from 'react';
import { FavoriteItem } from '../types';

export interface QuizAttempt {
  id: string;
  timestamp: number;
  score: number;
  total: number;
  percentage: number;
  category: string;
}

interface FavoritesContextType {
  favorites: FavoriteItem[];
  isFavorite: (id: string) => boolean;
  toggleFavorite: (item: Omit<FavoriteItem, 'savedAt'>) => void;
  removeFavorite: (id: string) => void;
  clearFavorites: () => void;
  // Quiz tracking
  quizHistory: QuizAttempt[];
  recordQuizAttempt: (score: number, total: number, category: string) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

const STORAGE_KEY = 'viet_discover_favorites_v1';
const QUIZ_STORAGE_KEY = 'viet_discover_quiz_history_v1';

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [quizHistory, setQuizHistory] = useState<QuizAttempt[]>(() => {
    try {
      const saved = localStorage.getItem(QUIZ_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch {
      // ignore
    }
  }, [favorites]);

  useEffect(() => {
    try {
      localStorage.setItem(QUIZ_STORAGE_KEY, JSON.stringify(quizHistory));
    } catch {
      // ignore
    }
  }, [quizHistory]);

  const isFavorite = (id: string) => favorites.some((f) => f.id === id);

  const toggleFavorite = (item: Omit<FavoriteItem, 'savedAt'>) => {
    setFavorites((prev) => {
      const exists = prev.some((f) => f.id === item.id);
      if (exists) {
        return prev.filter((f) => f.id !== item.id);
      } else {
        return [{ ...item, savedAt: Date.now() }, ...prev];
      }
    });
  };

  const removeFavorite = (id: string) => {
    setFavorites((prev) => prev.filter((f) => f.id !== id));
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  const recordQuizAttempt = (score: number, total: number, category: string) => {
    const newAttempt: QuizAttempt = {
      id: 'qa_' + Date.now(),
      timestamp: Date.now(),
      score,
      total,
      percentage: Math.round((score / total) * 100),
      category,
    };
    setQuizHistory((prev) => [newAttempt, ...prev.slice(0, 9)]);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        isFavorite,
        toggleFavorite,
        removeFavorite,
        clearFavorites,
        quizHistory,
        recordQuizAttempt,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return ctx;
}
