export type Region = 'bac' | 'trung' | 'nam' | 'taynguyen' | 'mientay';

export type DishCategory = 
  | 'mon_nuoc'
  | 'mon_com_chinh'
  | 'mon_cuon'
  | 'mon_an_vat'
  | 'banh_truyen_thong'
  | 'mon_trang_mieng'
  | 'do_uong'
  | 'dac_san_dia_phuong';

export interface Dish {
  id: string;
  name: string;
  englishName: string;
  region: Region;
  province: string;
  category: DishCategory;
  image: string;
  shortDesc: string;
  historyOrigin: string;
  mainIngredients: string[];
  preparationSummary: string;
  flavorProfile: {
    taste: string; // e.g., "Thanh nhã, ngọt từ xương, dậy mùi hoa hồi quế"
    texture: string; // e.g., "Bánh phở mềm mướt, thịt bò thái mỏng vừa chín tới"
    spiciness: 0 | 1 | 2 | 3 | 4 | 5;
    richness: 1 | 2 | 3 | 4 | 5;
  };
  etiquette: string; // Cách thưởng thức chuẩn mực
  culturalSignificance: string; // Ý nghĩa văn hóa
  occasions: string[]; // Bữa sáng thường nhật, cúng giỗ, lễ Tết...
  regionalVariants?: string[]; // Biến thể theo vùng miền
  relatedDishIds?: string[];
  isSignature?: boolean;
}

export type CultureCategory =
  | 'le_hoi'
  | 'tet_phong_tuc'
  | 'trang_phuc'
  | 'am_nhac_nghe_thuat'
  | 'kien_truc_di_san'
  | 'lang_nghe'
  | 'am_thuc_gia_dinh'
  | 'tap_quan_cuoi_hoi'
  | 'giao_tiep_ung_xu'
  | 'dan_toc_54';

export interface CultureArticle {
  id: string;
  title: string;
  subtitle: string;
  category: CultureCategory;
  categoryLabel: string;
  image: string;
  readingTimeMinutes: number;
  period: string; // e.g., "Thiên niên kỷ I TCN", "Thời nhà Nguyễn", "Hiện đại"
  summary: string;
  introduction: string;
  sections: {
    heading: string;
    content: string;
  }[];
  pullQuote?: {
    quote: string;
    authorOrSource: string;
  };
  culturalValues: string[];
  funFacts: string[];
  locationOrOrigin: string;
  isFeatured?: boolean;
}

export interface ProvinceInfo {
  id: string;
  name: string;
  region: Region;
  regionName: string;
  tagline: string;
  heroImage: string;
  description: string;
  specialties: string[];
  notableAttractions: string[];
  festivals: string[];
  culturalHighlights: string;
  bestTravelSeason: string;
  dishesIds: string[];
}

export interface QuizQuestion {
  id: string;
  type: 'image_guess' | 'province_match' | 'festival_guess' | 'culture_trivia' | 'true_false';
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  image?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  category: 'culinary' | 'culture' | 'geography';
}

export interface TourismDestination {
  id: string;
  name: string;
  englishName: string;
  region: Region;
  regionName: string;
  provinceCity: string;
  image: string;
  intro: string; // 80 - 150 words
  address: string;
  transportation: {
    methods: string[];
    tips: string;
  };
  estimatedCost: {
    ticketPrice: string; // Ghi rõ đơn vị VND, ngày tham khảo
    notes: string; // Ghi chú cần kiểm tra tại trang chính thức
    lastUpdated: string;
  };
  bestSeason: string;
  highlights: string[];
  officialSource: {
    title: string;
    url: string;
  };
  relatedDishNames?: string[];
}

export interface FavoriteItem {
  id: string;
  type: 'dish' | 'culture' | 'province' | 'tourism';
  title: string;
  subtitle: string;
  image: string;
  savedAt: number;
}

export type Language = 'vi' | 'en' | 'zh' | 'ko';

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  provider: 'google' | 'facebook' | 'email';
  createdAt: number;
}

