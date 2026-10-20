import { TourismDestination } from '../types';

export const TOURISM_DESTINATIONS: TourismDestination[] = [
  {
    id: 'ha_noi_thu_do',
    name: 'Thủ Đô Hà Nội — Trái Tim Ngàn Năm Văn Hiến',
    englishName: 'Hanoi Capital — Heart of Vietnamese Heritage',
    region: 'bac',
    regionName: 'Bắc Bộ',
    provinceCity: 'Thành phố Hà Nội',
    image: '/src/assets/images/hanoi_turtle_tower_1792482658098.jpg',
    intro: 'Hà Nội là thủ đô hơn một nghìn năm tuổi của Việt Nam, nơi lưu giữ tinh hoa lịch sử qua 36 phố phường rêu phong, Hồ Hoàn Kiếm linh thiêng và quần thể di tích Hoàng thành Thăng Long. Thành phố mê hoặc du khách bởi sự hòa quyện giữa nét trầm mặc của các ngôi đình chùa cổ kính, kiến trúc Pháp cổ điển và nhịp sống đô thị đương đại sôi nổi, cùng nền văn hóa ẩm thực tinh tế nổi tiếng toàn cầu.',
    address: 'Trung tâm Đồng bằng sông Hồng, Thành phố Hà Nội, Việt Nam',
    transportation: {
      methods: ['Máy bay (Sân bay Quốc tế Nội Bài)', 'Tàu hỏa (Ga Hà Nội)', 'Xe khách chất lượng cao', 'Xe buýt công cộng & Metro', 'Taxi & xe máy công nghệ'],
      tips: 'Từ sân bay Nội Bài về trung tâm hồ Gươm mất khoảng 35–45 phút bằng taxi hoặc xe buýt số 86. Trong phố cổ, đi bộ hoặc thuê xe xích lô là trải nghiệm ngắm cảnh lý tưởng nhất.'
    },
    estimatedCost: {
      ticketPrice: 'Văn Miếu - Quốc Tử Giám: 70.000 VNĐ/vé; Hoàng thành Thăng Long: 70.000 VNĐ/vé; Đền Ngọc Sơn: 50.000 VNĐ/vé.',
      notes: 'Giá vé tham khảo cập nhật đầu năm 2025-2026. Du khách là học sinh, sinh viên và người cao tuổi được giảm 50% khi xuất trình giấy tờ. Vui lòng kiểm tra lại tại trang chính thức của từng ban quản lý di tích.',
      lastUpdated: 'Tháng 10/2024 (Kiểm tra cập nhật 2025-2026)'
    },
    bestSeason: 'Mùa thu (tháng 9 đến tháng 11) với thời tiết se lạnh, nắng vàng hanh hao, gió heo may và hương hoa sữa nồng nàn.',
    highlights: [
      'Dạo quanh Hồ Gươm, viếng Đền Ngọc Sơn và chụp ảnh Tháp Rùa cổ kính',
      'Thăm Văn Miếu - Quốc Tử Giám, trường đại học đầu tiên của Việt Nam',
      'Khám phá 36 phố phường bằng xích lô hoặc xe điện phố cổ',
      'Xem múa rối nước tại Nhà hát Múa rối Thăng Long',
      'Thưởng thức phở bò Bát Đàn, bún chả Hàng Quạt và cà phê trứng Giảng'
    ],
    officialSource: {
      title: 'Sở Du lịch Hà Nội & Cổng Thông tin Du lịch Việt Nam (vietnam.travel)',
      url: 'https://vietnam.travel/places-to-go/northern-vietnam/ha-noi'
    },
    relatedDishNames: ['Phở Bò Hà Nội', 'Bún Chả Hà Nội', 'Chả Cá Lã Vọng', 'Bún Thang Hà Nội', 'Cà Phê Trứng Hà Nội']
  },
  {
    id: 'vinh_ha_long',
    name: 'Vịnh Hạ Long — Kỳ Quan Karst Biển Cả Của Nhân Loại',
    englishName: 'Ha Long Bay — World Natural Wonder',
    region: 'bac',
    regionName: 'Bắc Bộ',
    provinceCity: 'Tỉnh Quảng Ninh',
    image: '/src/assets/images/ha_long_bay_authentic_1792482140995.jpg',
    intro: 'Vịnh Hạ Long được UNESCO ba lần công nhận là Di sản Thiên nhiên Thế giới nhờ giá trị thẩm mỹ phi thường và địa chất địa mạo karst triệu năm. Với gần 2.000 hòn đảo đá vôi muôn hình vạn trạng nhô lên giữa làn nước ngọc bích, vịnh Hạ Long mang vẻ đẹp kỳ ảo tựa bức tranh thủy mặc khổng lồ của tạo hóa, gắn liền với huyền tích Rồng Mẹ hạ phàm che chở cho người Việt cổ giữ yên bờ cõi.',
    address: 'Thành phố Hạ Long và huyện đảo Vân Đồn, Tỉnh Quảng Ninh',
    transportation: {
      methods: ['Đường cao tốc Hà Nội - Hải Phòng - Hạ Long (ô tô/limousine)', 'Tàu hỏa du lịch', 'Thủy phi cơ ngắm cảnh (Hải Âu Aviation)', 'Tàu du lịch và du thuyền ngủ đêm'],
      tips: 'Từ Hà Nội đi cao tốc mất khoảng 2 - 2,5 tiếng bằng xe limousine. Để trải nghiệm trọn vẹn, nên đặt tour du thuyền ngủ đêm (2 ngày 1 đêm hoặc 3 ngày 2 đêm) trên vịnh.'
    },
    estimatedCost: {
      ticketPrice: 'Vé tham quan vịnh ban ngày: 250.000 VNĐ/người (tuyến 1 hoặc tuyến 2) + Vé qua cảng tàu: 40.000 VNĐ/người. Thuê tàu ghép: 150.000 – 200.000 VNĐ/khách. Tour du thuyền 5 sao: từ 2.500.000 VNĐ/người/đêm.',
      notes: 'Giá vé thắng cảnh do Ban Quản lý Vịnh Hạ Long niêm yết chính thức. Vui lòng kiểm tra biểu giá mới nhất trên cổng thông tin du lịch Quảng Ninh.',
      lastUpdated: 'Tháng 10/2024 (Kiểm tra cập nhật 2025-2026)'
    },
    bestSeason: 'Tháng 3 đến tháng 5 (mùa xuân nắng ấm, trời trong) và tháng 9 đến tháng 11 (mùa thu gió nhẹ, biển êm).',
    highlights: [
      'Chèo thuyền kayak len lỏi qua hang Luồn, hang Sửng Sốt và động Thiên Cung',
      'Tắm biển và ngắm toàn cảnh vịnh từ đỉnh núi Titop',
      'Trải nghiệm ngủ đêm trên du thuyền ngắm hoàng hôn và bình minh giữa vịnh ngọc',
      'Tham quan làng chài nổi Cửa Vạn và trang trại nuôi cấy ngọc trai',
      'Thưởng thức hải sản tươi sống và chả mực giã tay Hạ Long'
    ],
    officialSource: {
      title: 'Ban Quản lý Vịnh Hạ Long & Cục Du lịch Quốc gia Việt Nam',
      url: 'https://vietnam.travel/places-to-go/northern-vietnam/ha-long'
    },
    relatedDishNames: ['Chả mực Hạ Long', 'Hải sản nướng than']
  },
  {
    id: 'trang_an_ninh_binh',
    name: 'Quần Thể Danh Thắng Tràng An — Vịnh Hạ Long Trên Cạn',
    englishName: 'Trang An Landscape Complex — UNESCO Mixed Heritage Site',
    region: 'bac',
    regionName: 'Bắc Bộ',
    provinceCity: 'Tỉnh Ninh Bình',
    image: '/src/assets/images/trang_an_ninh_binh_authentic_1792482187612.jpg',
    intro: 'Tràng An là di sản hỗn hợp (kép) đầu tiên và duy nhất tại Đông Nam Á được UNESCO vinh danh cả về tiêu chí Văn hóa lẫn Thiên nhiên. Nơi đây từng là căn cứ quân sự hiểm yếu của Cố đô Hoa Lư thế kỷ X dưới triều Đinh - Tiền Lê. Cảnh quan Tràng An ngoạn mục với những dãy núi đá vôi sừng sững bao bọc các thung lũng ngập nước trong vắt, hệ thống hang động xuyên thủy kỳ ảo và các di chỉ khảo cổ thời tiền sử cách đây 30.000 năm.',
    address: 'Xã Ninh Xuân, huyện Hoa Lư, Tỉnh Ninh Bình',
    transportation: {
      methods: ['Tàu hỏa (Ga Ninh Bình)', 'Xe limousine từ Hà Nội', 'Xe máy phượt', 'Thuyền chèo nan truyền thống'],
      tips: 'Cách trung tâm Hà Nội khoảng 95km về phía Nam, đi ô tô chỉ mất khoảng 1,5 tiếng theo cao tốc Cầu Giẽ - Ninh Bình.'
    },
    estimatedCost: {
      ticketPrice: 'Vé tham quan thuyền đò Tràng An: 250.000 VNĐ/người lớn (chọn 1 trong 3 tuyến đò kéo dài 2,5 - 3 tiếng); Trẻ em từ 1m–1.3m: 120.000 VNĐ/vé; Dưới 1m: Miễn phí.',
      notes: 'Giá vé đã bao gồm phí đò chèo nan có người chèo và vé thắng cảnh bảo hiểm. Du khách nên gửi thêm chút tiền tip cho người lái đò nếu hài lòng.',
      lastUpdated: 'Tháng 10/2024 (Kiểm tra cập nhật 2025-2026)'
    },
    bestSeason: 'Tháng 1 đến tháng 3 (mùa xuân lễ hội chùa Bái Đính và Tràng An) hoặc tháng 5 đến tháng 6 (mùa lúa chín vàng Tam Cốc bên sông Ngô Đồng).',
    highlights: [
      'Đi thuyền nan luồn lách qua các hang động kỳ thú: Hang Tối, Hang Sáng, Hang Nấu Rượu',
      'Viếng đền Suối Tiên và đền Trình cổ kính giữa non nước',
      'Check-in phim trường Kong: Skull Island được phục dựng',
      'Chinh phục gần 500 bậc đá lên đỉnh Ngọa Long ngắm toàn cảnh Hang Múa',
      'Thưởng thức đặc sản thịt dê núi 7 món và cơm cháy giòn rụm Ninh Bình'
    ],
    officialSource: {
      title: 'Ban Quản lý Quần thể Danh thắng Tràng An & Ninh Bình Tourism',
      url: 'https://vietnam.travel/places-to-go/northern-vietnam/ninh-binh'
    },
    relatedDishNames: ['Cơm cháy Ninh Bình', 'Dê núi tái chanh']
  },
  {
    id: 'co_do_hue',
    name: 'Quần Thể Di Tích Cố Đô Huế — Dấu Ấn Triều Nguyễn',
    englishName: 'Complex of Hue Monuments — The Nguyen Dynasty Heritage',
    region: 'trung',
    regionName: 'Trung Bộ',
    provinceCity: 'Tỉnh Thừa Thiên Huế',
    image: '/src/assets/images/hue_imperial_architecture_1792479168121.jpg',
    intro: 'Nằm bên bờ dòng sông Hương êm đềm, Cố đô Huế là kinh đô của triều đại phong kiến cuối cùng của Việt Nam (1802 - 1945). Quần thể di tích Huế được UNESCO công nhận là Di sản Văn hóa Thế giới năm 1993, bao gồm Kinh thành nguy nga, Tử Cấm Thành uy nghiêm, hệ thống lăng tẩm các vị vua triều Nguyễn ẩn mình giữa đồi thông xanh và chùa Thiên Mụ cổ kính soi bóng nước. Huế còn là cái nôi của Nhã nhạc cung đình và nền ẩm thực bác học tinh xảo.',
    address: 'Thành phố Huế, Tỉnh Thừa Thiên Huế, Việt Nam',
    transportation: {
      methods: ['Máy bay (Sân bay Phú Bài)', 'Tàu hỏa Bắc - Nam', 'Xe khách giường nằm', 'Thuyền rồng sông Hương', 'Xe đạp & xe máy dạo phố'],
      tips: 'Nên mua vé tuyến gộp (Đại Nội + 3 lăng lớn Minh Mạng, Tự Đức, Khải Định) để tiết kiệm chi phí tham quan.'
    },
    estimatedCost: {
      ticketPrice: 'Vé tham quan Đại Nội (Hoàng Cung): 200.000 VNĐ/người lớn; Vé Lăng Minh Mạng / Tự Đức / Khải Định: 150.000 VNĐ/lăng; Gói combo Đại Nội + 3 lăng: 420.000 VNĐ/vé.',
      notes: 'Giá vé do Trung tâm Bảo tồn Di tích Cố đô Huế ban hành. Trẻ em từ 7-12 tuổi được áp dụng mức giá ưu đãi. Du khách mặc trang phục trang nghiêm khi vào khu thờ tự.',
      lastUpdated: 'Tháng 10/2024 (Kiểm tra cập nhật 2025-2026)'
    },
    bestSeason: 'Mùa xuân (tháng 1 đến tháng 4) khi thời tiết mát mẻ, dễ chịu, trăm hoa khoe sắc và tránh được mùa mưa dầm miền Trung.',
    highlights: [
      'Khám phá Cửa Ngọ Môn, Điện Thái Hòa và Thế Miếu bên trong Hoàng thành',
      'Chiêm ngưỡng kiến trúc Đông - Tây kết hợp độc nhất vô nhị tại Lăng Khải Định',
      'Đi thuyền rồng trên sông Hương nghe ca Huế và thả hoa đăng cầu an',
      'Vãn cảnh chùa Thiên Mụ và đồi Vọng Cảnh ngắm hoàng hôn sông Hương',
      'Thưởng thức bún bò Huế chuẩn vị, bánh bèo chén, nem lụi và chè sen long nhãn'
    ],
    officialSource: {
      title: 'Trung tâm Bảo tồn Di tích Cố đô Huế & Cổng Du lịch Quốc gia',
      url: 'https://vietnam.travel/places-to-go/central-vietnam/hue'
    },
    relatedDishNames: ['Bún Bò Huế', 'Bánh Bèo Chén Xứ Huế', 'Nem Lụi Xứ Huế', 'Chè Sen Long Nhãn Xứ Huế']
  },
  {
    id: 'pho_co_hoi_an',
    name: 'Đô Thị Cổ Hội An — Lung Linh Ánh Đèn Lồng Sông Hoài',
    englishName: 'Hoi An Ancient Town — UNESCO Living Heritage by the Thu Bon River',
    region: 'trung',
    regionName: 'Trung Bộ',
    provinceCity: 'Thành phố Hội An, Tỉnh Quảng Nam',
    image: '/src/assets/images/hoi_an_ancient_town_authentic_1792482164238.jpg',
    intro: 'Từng là một thương cảng quốc tế sầm uất bậc nhất châu Á từ thế kỷ 16 đến thế kỷ 19, Hội An được bảo tồn nguyên vẹn gần như kỳ diệu với hơn 1.000 ngôi nhà cổ tường vàng hoa giấy, hội quán người Hoa, nhà thờ tộc và Chùa Cầu biểu tượng. Khi màn đêm buông xuống, phố cổ không có tiếng động cơ xe máy, chỉ có ánh sáng ấm áp huyền ảo của hàng ngàn chiếc đèn lồng lụa và những chiếc hoa đăng lung linh trôi trên dòng sông Hoài thơ mộng.',
    address: 'Phường Minh An, Thành phố Hội An, Tỉnh Quảng Nam',
    transportation: {
      methods: ['Máy bay đến Sân bay Quốc tế Đà Nẵng, sau đó đi taxi/xe buýt 30km về Hội An', 'Tàu hỏa đến Ga Đà Nẵng', 'Xe đạp (phổ biến và tiện nhất trong phố cổ)', 'Thuyền gỗ du ngoạn sông Hoài'],
      tips: 'Khu phố cổ cấm xe máy theo các khung giờ sáng và tối, du khách nên thuê xe đạp dạo quanh các con ngõ nhỏ hoặc ra bãi biển An Bàng.'
    },
    estimatedCost: {
      ticketPrice: 'Vé tham quan phố cổ: 80.000 VNĐ/khách Việt Nam, 120.000 VNĐ/khách quốc tế (gồm quyền tham quan 5 điểm di tích tùy chọn trong hơn 20 di tích mở cửa).',
      notes: 'Vé có giá trị trong suốt thời gian lưu trú tại Hội An. Tiền vé đóng góp trực tiếp vào công tác trùng tu và bảo tồn đô thị cổ.',
      lastUpdated: 'Tháng 10/2024 (Kiểm tra cập nhật 2025-2026)'
    },
    bestSeason: 'Tháng 2 đến tháng 7 hằng năm trời khô ráo, nắng ấm, nước biển trong xanh, đặc biệt là các đêm rằm âm lịch (Lễ hội đêm phố cổ).',
    highlights: [
      'Check-in Chùa Cầu (Lai Viễn Kiều) biểu tượng lịch sử hơn 400 năm tuổi',
      'Tham quan Nhà cổ Tấn Ký, Nhà cổ Phùng Hưng và Hội quán Phúc Kiến',
      'Trải nghiệm tự tay làm đèn lồng giấy lụa truyền thống',
      'Đi thuyền thả hoa đăng ước nguyện trên dòng sông Hoài về đêm',
      'Thưởng thức Mì Quảng tôm thịt, Cao lầu Hội An, cơm gà và bánh mì Phượng'
    ],
    officialSource: {
      title: 'Trung tâm Quản lý Bảo tồn Di sản Văn hóa Hội An & Vietnam Tourism',
      url: 'https://vietnam.travel/places-to-go/central-vietnam/hoi-an'
    },
    relatedDishNames: ['Cao Lầu Hội An', 'Mì Quảng', 'Bánh Mì Sài Gòn']
  },
  {
    id: 'tp_ho_chi_minh_nang_dong',
    name: 'TP. Hồ Chí Minh — Hòn Ngọc Viễn Đông Đầy Sức Sống',
    englishName: 'Ho Chi Minh City — Vibrant Saigon Metropolis',
    region: 'nam',
    regionName: 'Đông Nam Bộ & Sài Gòn',
    provinceCity: 'Thành phố Hồ Chí Minh',
    image: '/src/assets/images/saigon_city_landmark_1792482658842.jpg',
    intro: 'Thành phố Hồ Chí Minh (Sài Gòn) là trung tâm kinh tế, văn hóa và đổi mới sáng tạo sôi động bậc nhất Việt Nam. Thành phố mang trong mình sự giao thoa độc đáo giữa nét kiến trúc thuộc địa Pháp cổ điển (Bưu điện Trung tâm, Nhà hát Thành phố, Nhà thờ Đức Bà), các công trình hiện đại chọc trời (Landmark 81, Bitexco) và nét sinh hoạt đường phố bình dị, ấm áp tình người. Nơi đây là thiên đường của ẩm thực đường phố và văn hóa cà phê không bao giờ ngủ.',
    address: 'Vùng Đông Nam Bộ, Thành phố Hồ Chí Minh, Việt Nam',
    transportation: {
      methods: ['Máy bay (Sân bay Quốc tế Tân Sơn Nhất)', 'Tàu hỏa (Ga Sài Gòn)', 'Tuyến Metro số 1 Bến Thành - Suối Tiên', 'Xe buýt sông Saigon Waterbus', 'Taxi & xe công nghệ'],
      tips: 'Đi Waterbus ngắm cảnh thành phố hai bên bờ sông Sài Gòn với giá vé cực kỳ kinh tế chỉ 15.000 VNĐ/lượt.'
    },
    estimatedCost: {
      ticketPrice: 'Dinh Độc Lập: 40.000 – 65.000 VNĐ/vé; Bảo tàng Chứng tích Chiến tranh: 40.000 VNĐ/vé; Bưu điện Trung tâm: Miễn phí; Vé Saigon Waterbus: 15.000 VNĐ/lượt.',
      notes: 'Giá vé tham khảo cập nhật năm 2024-2026. Một số bảo tàng mở cửa từ 7:30 đến 17:00 hằng ngày.',
      lastUpdated: 'Tháng 10/2024 (Kiểm tra cập nhật 2025-2026)'
    },
    bestSeason: 'Mùa khô từ tháng 12 đến tháng 4 trời nắng rực rỡ, thích hợp cho các hoạt động tham quan ngoài trời và khám phá ẩm thực đêm.',
    highlights: [
      'Chiêm ngưỡng kiến trúc mái vòm tráng lệ tại Bưu điện Trung tâm Sài Gòn',
      'Tìm hiểu dấu ấn lịch sử tại Dinh Độc Lập và Địa đạo Củ Chi',
      'Trải nghiệm văn hóa cà phê cóc hè phố và cà phê sữa đá bệt Nhà thờ Đức Bà',
      'Khám phá ẩm thực Chợ Bến Thành và phố người Hoa Chợ Lớn (Quận 5)',
      'Thưởng thức Cơm tấm sườn bì chả, Bánh mì thịt nguội và Hủ tiếu Nam Vang'
    ],
    officialSource: {
      title: 'Sở Du lịch Thành phố Hồ Chí Minh (visithcmc.vn)',
      url: 'https://vietnam.travel/places-to-go/southern-vietnam/ho-chi-minh-city'
    },
    relatedDishNames: ['Cơm Tấm Sài Gòn', 'Bánh Mì Sài Gòn', 'Cà Phê Sữa Đá Sài Gòn', 'Gỏi Cuốn Tôm Thịt', 'Hủ Tiếu Nam Vang']
  },
  {
    id: 'cho_noi_cai_rang_can_tho',
    name: 'Đồng Bằng Sông Cửu Long & Chợ Nổi Cái Răng',
    englishName: 'Mekong Delta & Cai Rang Floating Market',
    region: 'mientay',
    regionName: 'Đồng Bằng Sông Cửu Long',
    provinceCity: 'Thành phố Cần Thơ',
    image: '/src/assets/images/cai_rang_market_delta_1792482659016.jpg',
    intro: 'Đồng bằng sông Cửu Long là vương quốc của sông nước, kênh rạch chằng chịt và những vườn cây ăn trái trĩu cành quanh năm. Điểm nhấn độc đáo bậc nhất là Chợ nổi Cái Răng (Cần Thơ) — di sản văn hóa phi vật thể quốc gia, nơi hàng trăm chiếc ghe xuồng buôn bán nông sản tụ họp lúc hừng đông. Nét văn hóa "cây bẹo" (treo sản vật gì thì bán thứ đó trên mũi ghe) cùng tiếng đờn ca tài tử dập dềnh sóng nước tạo nên một trải nghiệm mộc mạc, hào sảng không đâu có.',
    address: 'Sông Cần Thơ, quận Cái Răng, Thành phố Cần Thơ',
    transportation: {
      methods: ['Máy bay (Sân bay Cần Thơ)', 'Xe limousine từ TP.HCM (khoảng 3 tiếng theo cao tốc Trung Lương - Mỹ Thuận)', 'Tàu thuyền du lịch bến Ninh Kiều'],
      tips: 'Chợ nổi họp đông vui nhất từ 5:30 đến 7:30 sáng. Du khách nên thức dậy sớm, thuê thuyền tại Bến Ninh Kiều để kịp ngắm bình minh trên sông.'
    },
    estimatedCost: {
      ticketPrice: 'Thuê tàu riêng đi chợ nổi Cái Răng: 350.000 – 600.000 VNĐ/thuyền (chở từ 4-10 khách); Ghép thuyền: 80.000 – 100.000 VNĐ/khách. Ăn sáng tô bún riêu trên ghe: 35.000 – 45.000 VNĐ/bát.',
      notes: 'Giá thuê thuyền có thể thương lượng tùy theo lộ trình tham quan (chỉ chợ nổi hay ghé thêm lò hủ tiếu truyền thống và vườn trái cây Ba Cống).',
      lastUpdated: 'Tháng 10/2024 (Kiểm tra cập nhật 2025-2026)'
    },
    bestSeason: 'Mùa trái cây chín rộ (tháng 5 đến tháng 8) và Mùa nước nổi phù sa (tháng 9 đến tháng 11 âm lịch).',
    highlights: [
      'Trải nghiệm ăn sáng húp tô hủ tiếu, bún riêu nóng hổi bồng bềnh trên ghe xuồng',
      'Tìm hiểu văn hóa "cây bẹo" độc nhất vô nhị của thương hồ miền Tây',
      'Thăm lò làm hủ tiếu thủ công truyền thống và thử món "pizza hủ tiếu"',
      'Dạo bước trong vườn trái cây trĩu quả chôm chôm, sầu riêng, măng cụt',
      'Thưởng thức Bánh xèo miền Tây giòn rụm với rổ rau rừng miệt vườn'
    ],
    officialSource: {
      title: 'Trung tâm Phát triển Du lịch Cần Thơ & Cục Du lịch Quốc gia Việt Nam',
      url: 'https://vietnam.travel/places-to-go/southern-vietnam/can-tho'
    },
    relatedDishNames: ['Bánh Xèo Miền Tây', 'Bánh Tét Nam Bộ', 'Lẩu Mắm Miền Tây', 'Canh Chua Bông Điên Điển']
  }
];
