import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { Language, Dish, TourismDestination, DishCategory, Region } from '../types';
import {
  UI_TRANSLATIONS,
  LOCALIZED_CATEGORIES,
  LOCALIZED_REGIONS,
  DISH_TRANSLATIONS,
  TOURISM_TRANSLATIONS,
} from '../data/translationsData';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, defaultText?: string) => string;
  getCategoryLabel: (category: DishCategory) => string;
  getRegionLabel: (region: Region) => string;
  getLocalizedDish: (dish: Dish) => Dish;
  getLocalizedDestination: (dest: TourismDestination) => TourismDestination;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LANGUAGE_STORAGE_KEY = 'viet_discover_lang_v1';

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (saved && ['vi', 'en', 'zh', 'ko'].includes(saved)) {
        return saved as Language;
      }
    } catch {
      // ignore
    }
    return 'vi';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
      document.documentElement.lang = lang;
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const t = useMemo(() => {
    return (key: string, defaultText?: string): string => {
      const dict = UI_TRANSLATIONS[language];
      if (dict && dict[key]) {
        return dict[key];
      }
      // fallback to Vietnamese if missing
      const viDict = UI_TRANSLATIONS['vi'];
      if (viDict && viDict[key]) {
        return viDict[key];
      }
      return defaultText || key;
    };
  }, [language]);

  const getCategoryLabel = (category: DishCategory): string => {
    const dict = LOCALIZED_CATEGORIES[language];
    if (dict && dict[category]) {
      return dict[category];
    }
    return LOCALIZED_CATEGORIES.vi[category] || category;
  };

  const getRegionLabel = (region: Region): string => {
    const dict = LOCALIZED_REGIONS[language];
    if (dict && dict[region]) {
      return dict[region];
    }
    return LOCALIZED_REGIONS.vi[region] || region;
  };

  const getLocalizedDish = (dish: Dish): Dish => {
    if (language === 'vi') return dish;

    const langOverride = DISH_TRANSLATIONS[language as 'en' | 'zh' | 'ko'];
    if (!langOverride || !langOverride[dish.id]) {
      // If no specific override, return dish with bilingual subtitle if englishName exists
      if (language === 'en' && dish.englishName) {
        return {
          ...dish,
          name: `${dish.name} (${dish.englishName})`,
        };
      }
      return dish;
    }

    const override = langOverride[dish.id];
    return {
      ...dish,
      name: override.name,
      shortDesc: override.shortDesc,
      historyOrigin: override.historyOrigin,
      mainIngredients: override.mainIngredients,
      preparationSummary: override.historyOrigin,
      flavorProfile: {
        ...dish.flavorProfile,
        taste: override.taste,
        texture: override.texture,
      },
      etiquette: override.etiquette,
      culturalSignificance: override.culturalSignificance,
    };
  };

  const getLocalizedDestination = (dest: TourismDestination): TourismDestination => {
    if (language === 'vi') return dest;

    const langOverride = TOURISM_TRANSLATIONS[language as 'en' | 'zh' | 'ko'];
    if (!langOverride || !langOverride[dest.id]) {
      if (language === 'en' && dest.englishName) {
        return {
          ...dest,
          name: dest.englishName,
        };
      }
      return dest;
    }

    const override = langOverride[dest.id];
    return {
      ...dest,
      name: override.name,
      intro: override.intro,
      address: override.address,
      transportation: {
        methods: override.transportMethods,
        tips: override.transportTips,
      },
      estimatedCost: {
        ...dest.estimatedCost,
        ticketPrice: override.ticketPrice,
        notes: override.costNotes,
      },
      bestSeason: override.bestSeason,
      highlights: override.highlights,
    };
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        getCategoryLabel,
        getRegionLabel,
        getLocalizedDish,
        getLocalizedDestination,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
