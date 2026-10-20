import React, { useState } from 'react';
import { Logo } from '../components/Logo';
import { Send, CheckCircle2, ShieldCheck, Heart, Sparkles, BookOpen, Compass } from 'lucide-react';

export const AboutView: React.FC = () => {
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: 'Góp ý nội dung món ăn',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.message.trim()) return;
    setFeedbackSent(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', topic: 'Góp ý nội dung món ăn', message: '' });
    }, 4000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Brand Hero Header */}
      <div className="text-center space-y-6 max-w-3xl mx-auto">
        <Logo size="hero" showSlogan={true} />

        <div className="pt-4 border-t border-stone-200">
          <p className="text-base sm:text-lg text-stone-700 leading-relaxed font-serif">
            Một dự án tâm huyết kết hợp giữa công nghệ hiện đại và tri thức văn hóa dân gian, nhằm xây dựng bảo tàng kỹ thuật số sống động về ẩm thực, phong tục và di sản của đất nước Việt Nam.
          </p>
        </div>
      </div>

      {/* Sứ mệnh & Tầm nhìn */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#9E2A2B]/10 flex items-center justify-center text-[#9E2A2B]">
            <Compass className="w-5 h-5" />
          </div>
          <h3 className="font-serif font-bold text-lg text-stone-900">
            Khám Phá Toàn Diện
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">
            Tập hợp có hệ thống từ các món ăn dân dã, ngự thiện cung đình, đến các lễ hội mùa màng và di sản phi vật thể được UNESCO vinh danh.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#C28B38]/10 flex items-center justify-center text-[#C28B38]">
            <BookOpen className="w-5 h-5" />
          </div>
          <h3 className="font-serif font-bold text-lg text-stone-900">
            Nghiên Cứu Chuẩn Xác
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">
            Không tạo thông tin giả hay gán sai xuất xứ. Mọi nội dung lịch sử đều được biên soạn với sự tôn trọng tính đa dạng văn hóa và biến thể vùng miền.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#1B4332]/10 flex items-center justify-center text-[#1B4332]">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="font-serif font-bold text-lg text-stone-900">
            Học Qua Tương Tác
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">
            Khuyến khích học tập chủ động qua hệ thống câu đố văn hóa, bản đồ địa lý 5 vùng và bộ sưu tập cá nhân hóa trải nghiệm.
          </p>
        </div>
      </div>

      {/* Ý Nghĩa Logo & Nhận Diện Thương Hiệu */}
      <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-xs space-y-6">
        <div className="space-y-1">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#9E2A2B]">
            Ngôn ngữ hình ảnh
          </span>
          <h2 className="text-2xl font-serif font-bold text-stone-900">
            Ý Nghĩa Biểu Trưng VIET DISCOVER
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="flex justify-center">
            <img
              src="/src/assets/images/viet_discover_app_logo_1792479385154.jpg"
              alt="VIET DISCOVER Logo Badge"
              className="w-56 h-56 rounded-2xl object-cover shadow-lg border border-amber-900/15"
            />
          </div>
          <div className="space-y-4 text-xs sm:text-sm text-stone-700 leading-relaxed">
            <p>
              <strong>Bông sen đỏ (Red Lotus):</strong> Quốc hoa Việt Nam, tượng trưng cho sự thuần khiết, thanh cao vươn lên từ bùn lầy cùng ngôi sao vàng kiêu hãnh.
            </p>
            <p>
              <strong>Mái cổng cổ kính:</strong> Gợi nhắc Khuê Văn Các và Ngọ Môn Huế — biểu trưng cho truyền thống hiếu học và chiều sâu văn vật ngàn năm.
            </p>
            <p>
              <strong>Kim la bàn trong chữ O:</strong> Tinh thần khám phá không ngừng nghỉ, đưa người dùng chu du qua từng nẻo đường ẩm thực và văn hóa.
            </p>
            <p>
              <strong>Ruộng bậc thang & Tháp Rùa:</strong> Bản giao hưởng thiên nhiên và lịch sử, từ non cao Tây Bắc đến hồ nước kinh kỳ Thăng Long.
            </p>
          </div>
        </div>
      </div>

      {/* Đội Ngũ Thực Hiện & Đạo Đức Biên Soạn */}
      <div className="bg-[#F4F0E8] p-8 rounded-3xl border border-stone-300/80 space-y-4">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#1B4332]">
          <ShieldCheck className="w-4 h-4" />
          <span>Cam kết tính chân thực văn hóa</span>
        </div>
        <h3 className="text-xl font-serif font-bold text-stone-900">
          Đạo Đức Biên Soạn & Tôn Trọng Đa Dạng
        </h3>
        <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-sans">
          Chúng tôi tuyệt đối không xem phong tục của một dân tộc cụ thể là phong tục chung của tất cả 54 dân tộc Việt Nam. Mọi phong tục cưới hỏi, lễ Tết, trang phục đều được ghi rõ không gian văn hóa bản địa.
        </p>
      </div>

      {/* Feedback & Contribution Form */}
      <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-xs space-y-6">
        <div className="space-y-1">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#C28B38]">
            Đóng góp cộng đồng
          </span>
          <h2 className="text-2xl font-serif font-bold text-stone-900">
            Góp Ý & Bổ Sung Dữ Liệu Văn Hóa
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 font-sans">
            Bạn phát hiện một chi tiết lịch sử cần đính chính, hoặc muốn đề xuất thêm đặc sản quê hương mình? Hãy gửi chia sẻ cho đội ngũ ban biên tập.
          </p>
        </div>

        {feedbackSent ? (
          <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-3 text-emerald-800 animate-fadeIn">
            <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
            <div>
              <div className="font-semibold text-sm">Cảm ơn bạn đã đóng góp!</div>
              <div className="text-xs text-emerald-700 mt-0.5">
                Ý kiến quý báu của bạn đã được ghi nhận vào hệ thống để ban biên tập thẩm định.
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-700">Họ và tên</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Nguyễn Văn A"
                  className="w-full px-3.5 py-2 text-sm rounded-lg border border-stone-200 bg-stone-50 focus:bg-white focus:outline-none focus:border-[#9E2A2B]"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-700">Email liên hệ</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="email@example.com"
                  className="w-full px-3.5 py-2 text-sm rounded-lg border border-stone-200 bg-stone-50 focus:bg-white focus:outline-none focus:border-[#9E2A2B]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-stone-700">Chủ đề đóng góp</label>
              <select
                value={formData.topic}
                onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                className="w-full px-3.5 py-2 text-sm rounded-lg border border-stone-200 bg-stone-50 focus:bg-white focus:outline-none focus:border-[#9E2A2B] cursor-pointer"
              >
                <option value="Góp ý nội dung món ăn">Góp ý nội dung món ăn & công thức</option>
                <option value="Đề xuất đặc sản địa phương mới">Đề xuất đặc sản địa phương mới</option>
                <option value="Đính chính tư liệu văn hóa lịch sử">Đính chính tư liệu văn hóa lịch sử</option>
                <option value="Đóng góp câu hỏi Quiz mới">Đóng góp câu hỏi Quiz mới</option>
                <option value="Ý kiến khác">Ý kiến khác</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-stone-700">Nội dung chi tiết</label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Mô tả chi tiết nguồn cội, biến thể vùng miền hoặc tài liệu bạn muốn cung cấp..."
                className="w-full px-3.5 py-2 text-sm rounded-lg border border-stone-200 bg-stone-50 focus:bg-white focus:outline-none focus:border-[#9E2A2B]"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-[#9E2A2B] hover:bg-[#852223] active:bg-[#701c1d] transition-colors cursor-pointer flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Gửi đóng góp cho ban biên tập</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
