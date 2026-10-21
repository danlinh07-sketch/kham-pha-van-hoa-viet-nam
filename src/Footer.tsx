import React from 'react';
import { Logo } from './Logo';
import { ActiveTab } from './Navbar';
import { Heart, Compass, BookOpen, Utensils, HelpCircle, MapPin } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: ActiveTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#1C1917] text-[#F4F0E8] border-t border-stone-800 pt-16 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-stone-800">
          {/* Col 1: Brand & Identity */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/src/assets/images/viet_discover_app_logo_1792479385154.jpg"
                alt="VIET DISCOVER Logo"
                className="w-14 h-14 rounded-xl object-cover border border-amber-600/30"
              />
              <div>
                <div className="font-serif font-bold text-2xl tracking-tight text-white">
                  VIET <span className="text-[#C28B38]">DISCOVER</span>
                </div>
                <p className="text-xs text-stone-400 font-serif italic">
                  Chạm vào hương vị — Khám phá linh hồn Việt.
                </p>
              </div>
            </div>
            <p className="text-sm text-stone-400 max-w-md leading-relaxed">
              Nền tảng kỹ thuật số tôn vinh và lan tỏa chiều sâu di sản văn hóa, phong tục ngàn đời và tinh hoa ẩm thực ba miền đất nước Việt Nam đến bạn bè trong nước và quốc tế.
            </p>
            <div className="pt-2 flex items-center gap-4 text-xs text-stone-400">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#C28B38]" /> Việt Nam (Bắc - Trung - Nam)
              </span>
              <span>·</span>
              <span>Di sản văn hóa phi vật thể</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-[#C28B38] font-semibold">
              Khám Phá
            </h4>
            <ul className="space-y-2 text-sm text-stone-300">
              <li>
                <button
                  onClick={() => onNavigate('culinary')}
                  className="hover:text-white transition-colors cursor-pointer flex items-center gap-2"
                >
                  <Utensils className="w-3.5 h-3.5 text-stone-500" /> Thư viện ẩm thực ba miền
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('culture')}
                  className="hover:text-white transition-colors cursor-pointer flex items-center gap-2"
                >
                  <BookOpen className="w-3.5 h-3.5 text-stone-500" /> Chuyên đề văn hóa di sản
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('regions')}
                  className="hover:text-white transition-colors cursor-pointer flex items-center gap-2"
                >
                  <Compass className="w-3.5 h-3.5 text-stone-500" /> Bản đồ 5 vùng địa lý
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('tourism')}
                  className="hover:text-white transition-colors cursor-pointer flex items-center gap-2"
                >
                  <Compass className="w-3.5 h-3.5 text-stone-500" /> Cẩm nang du lịch & di sản
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('quiz')}
                  className="hover:text-white transition-colors cursor-pointer flex items-center gap-2"
                >
                  <HelpCircle className="w-3.5 h-3.5 text-stone-500" /> Thử thách câu đố văn hóa
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('favorites')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Bộ sưu tập đã lưu
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Triết lý & Nguồn dữ liệu */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-[#C28B38] font-semibold">
              Triết Lý & Nguồn Tin
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              Mọi tư liệu về lịch sử món ăn, phong tục và di sản đều được tham khảo cẩn trọng từ các công trình nghiên cứu văn hóa dân gian Việt Nam, hồ sơ di sản UNESCO và các nhà nghiên cứu ẩm thực uy tín.
            </p>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Respect */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <div>
            © {new Date().getFullYear()} VIET DISCOVER. Dự án gìn giữ và lan tỏa bản sắc văn hóa Việt Nam.
          </div>
          <div className="flex items-center gap-1 text-stone-400">
            <span>Dựng xây với lòng trân quý hồn thiêng sông núi Việt</span>
            <Heart className="w-3.5 h-3.5 text-red-500 inline ml-1 fill-red-500" />
          </div>
        </div>
      </div>
    </footer>
  );
};
