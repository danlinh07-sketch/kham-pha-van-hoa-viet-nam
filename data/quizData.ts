import { QuizQuestion } from '../types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // 1. Phở Bò
  {
    id: 'q1',
    type: 'culture_trivia',
    difficulty: 'easy',
    category: 'culinary',
    question: 'Theo truyền thống ẩm thực Hà Nội, gia vị thảo mộc nào sau đây là linh hồn tạo nên hương thơm đặc trưng của nồi nước dùng phở bò?',
    options: ['Hoa hồi, quế, thảo quả nướng', 'Lá chanh và sả tươi đập dập', 'Nước cốt dừa và nghệ tươi', 'Rau ngổ và ngò gai phi thơm'],
    correctIndex: 0,
    explanation: 'Nước dùng phở bò truyền thống đất Hà Thành được ninh từ xương ống bò cùng gừng nướng, hành nướng và các loại quả thảo mộc quý như hoa hồi, thảo quả, quế chi rang thơm bọc trong túi vải.'
  },
  // 2. Bánh Chưng & Bánh Giầy
  {
    id: 'q2',
    type: 'culture_trivia',
    difficulty: 'easy',
    category: 'culture',
    question: 'Trong sự tích bánh chưng bánh giầy thời Hùng Vương thứ 6, chàng hoàng tử nào đã làm ra hai thứ bánh quý này?',
    options: ['Lang Liêu', 'Mai An Tiêm', 'Chử Đồng Tử', 'Thạch Sanh'],
    correctIndex: 0,
    explanation: 'Hoàng tử Lang Liêu nhờ sự mách bảo của vị thần trong mộng đã dùng hạt gạo quen thuộc để làm bánh chưng vuông tượng trưng cho Đất và bánh giầy tròn tượng trưng cho Trời để dâng cúng tổ tiên.'
  },
  // 3. Cao Lầu
  {
    id: 'q3',
    type: 'province_match',
    difficulty: 'easy',
    category: 'culinary',
    question: 'Món ăn đặc sản "Cao lầu" với sợi mì tro giòn dai ăn cùng thịt xá xíu là biểu tượng ẩm thực của địa danh nào?',
    options: ['Phố cổ Hội An (Quảng Nam)', 'Cố đô Huế (Thừa Thiên Huế)', 'Đà Lạt (Lâm Đồng)', 'Phố cổ Hà Nội'],
    correctIndex: 0,
    explanation: 'Cao lầu là đặc sản độc bản của Hội An. Tương truyền nước nhào bột mì phải lấy từ giếng cổ Bá Lễ nghìn năm và ngâm tro củi tràm Cù Lao Chàm mới có độ dai giòn đặc trưng.'
  },
  // 4. Mâm ngũ quả miền Nam
  {
    id: 'q4',
    type: 'culture_trivia',
    difficulty: 'easy',
    category: 'culture',
    question: 'Người miền Nam thường bày mâm ngũ quả ngày Tết theo ước nguyện "Cầu - Sung - Vừa - Đủ - Xài" tương ứng với 5 loại quả nào?',
    options: [
      'Mãng cầu, sung, dừa, đu đủ, xoài',
      'Chuối, bưởi, đào, hồng, quýt',
      'Cam, táo, lê, nho, thanh long',
      'Dưa hấu, mít, mận, ổi, quất'
    ],
    correctIndex: 0,
    explanation: 'Do cách phát âm đồng âm dị nghĩa của người phương Nam, 5 loại quả "Mãng Cầu - Sung - Dừa (Vừa) - Đu Đủ - Xoài (Xài)" ghép lại thành lời nguyện cầu một năm mới no ấm, đủ đầy sung túc.'
  },
  // 5. Cà phê trứng
  {
    id: 'q5',
    type: 'province_match',
    difficulty: 'easy',
    category: 'culinary',
    question: 'Cà phê trứng — thức uống nổi tiếng với lớp kem trứng đánh bông mịn như nhung trên nền cà phê nóng — ra đời đầu tiên tại đâu?',
    options: ['Hà Nội', 'Sài Gòn - TP.HCM', 'Buôn Ma Thuột', 'Đà Lạt'],
    correctIndex: 0,
    explanation: 'Cà phê trứng được cụ Nguyễn Văn Giảng sáng tạo vào cuối những năm 1940 tại Hà Nội trong thời kỳ khan hiếm sữa đặc, thay thế bằng lòng đỏ trứng gà tươi đánh bông.'
  },
  // 6. Trống Đồng Đông Sơn
  {
    id: 'q6',
    type: 'culture_trivia',
    difficulty: 'medium',
    category: 'culture',
    question: 'Hình tượng chim muông sải cánh bay quanh ngôi sao mặt trời trên mặt trống đồng Đông Sơn thường được gọi là gì?',
    options: ['Chim Lạc', 'Chim Phượng hoàng', 'Chim Yến', 'Chim Hạc'],
    correctIndex: 0,
    explanation: 'Chim Lạc sải cánh bay ngược chiều kim đồng hồ là hình tượng thiêng liêng trên trống đồng Đông Sơn, biểu trưng cho nguồn cội con Rồng cháu Tiên và nền văn minh sông nước.'
  },
  // 7. Mì Quảng
  {
    id: 'q7',
    type: 'culture_trivia',
    difficulty: 'easy',
    category: 'culinary',
    question: 'Điểm khác biệt độc đáo nhất trong cách chan nước dùng của Mì Quảng so với các món phở hay bún nước thông thường là gì?',
    options: [
      'Nước dùng chỉ chan xâm xấp đáy tô (khoảng 1/3 bát)',
      'Nước dùng phải chan ngập tràn bát',
      'Hoàn toàn không có nước dùng mà chỉ chan dầu mè',
      'Nước dùng được đựng trong bình riêng tự rót sau khi ăn hết mì'
    ],
    correctIndex: 0,
    explanation: 'Mì Quảng không phải món nước lõng bõng; nước nhưỡng được nấu thật đậm đà và chỉ chan vừa đủ ướt sợi mì (xâm xấp 1/3 bát), ăn kèm bánh tráng nướng bẻ vụn.'
  },
  // 8. Nhã Nhạc Cung Đình
  {
    id: 'q8',
    type: 'culture_trivia',
    difficulty: 'medium',
    category: 'culture',
    question: 'Nhà hát cung đình cổ xưa nhất Việt Nam, nơi từng trình diễn Nhã nhạc phục vụ các vị vua triều Nguyễn có tên là gì?',
    options: ['Duyệt Thị Đường', 'Nhà hát Lớn Hà Nội', 'Khuê Văn Các', 'Điện Thái Hòa'],
    correctIndex: 0,
    explanation: 'Duyệt Thị Đường xây dựng năm 1826 dưới triều vua Minh Mạng bên trong Hoàng thành Huế, là nhà hát quốc gia cổ xưa nhất còn tồn tại ở Việt Nam.'
  },
  // 9. Bún Bò Huế
  {
    id: 'q9',
    type: 'culture_trivia',
    difficulty: 'medium',
    category: 'culinary',
    question: 'Loại gia vị lên men truyền thống nào tạo nên mùi thơm nồng nàn và chiều sâu vị giác không thể thay thế trong tô Bún bò Huế?',
    options: ['Mắm ruốc Huế', 'Mắm tôm Bắc', 'Mắm cáy', 'Mắm ba khía'],
    correctIndex: 0,
    explanation: 'Mắm ruốc Huế được quấy trong nước lạnh, để lắng cặn rồi gạn lấy nước trong cho vào nồi ninh cùng sả cây, tạo nên phong vị đượm đà đặc trưng của xứ thần kinh.'
  },
  // 10. Dân ca Quan Họ
  {
    id: 'q10',
    type: 'culture_trivia',
    difficulty: 'medium',
    category: 'culture',
    question: 'Bốn tiêu chuẩn khắt khe về kỹ thuật thanh nhạc trong nghệ thuật hát Dân ca Quan họ Bắc Ninh là gì?',
    options: [
      'Vang — Rền — Nền — Nảy',
      'Trầm — Bổng — Ngân — Rung',
      'Trong — Sáng — Khỏe — Vang',
      'Mau — Khoan — Đoan — Trang'
    ],
    correctIndex: 0,
    explanation: 'Bốn tiêu chuẩn vàng của giọng hát Quan họ là: Vang (âm lượng ngân vang), Rền (giọng ấm áp ngân rung), Nền (hòa quyện nhịp nhàng bè đôi), Nảy (kỹ thuật luyến láy hạt ngọc).'
  },
  // 11. Bánh xèo miền Tây
  {
    id: 'q11',
    type: 'culture_trivia',
    difficulty: 'easy',
    category: 'culinary',
    question: 'Tên gọi "Bánh xèo" xuất phát từ điều gì?',
    options: [
      'Âm thanh "xèo" phát ra khi đổ bột vào chảo gang nóng',
      'Tên của người sáng chế ra chiếc bánh ở Cần Thơ',
      'Từ một loại cây thảo mộc mọc bên bờ kênh rạch',
      'Tên gọi phiên âm từ tiếng nước ngoài'
    ],
    correctIndex: 0,
    explanation: 'Tên gọi bánh xèo là một từ tượng thanh vô cùng sinh động, bắt nguồn từ tiếng reo vui tai "xèo xèo" khi vá bột gạo pha nước cốt dừa tiếp xúc với lòng chảo gang mỡ nóng rực.'
  },
  // 12. Áo dài Ngũ Thân
  {
    id: 'q12',
    type: 'culture_trivia',
    difficulty: 'hard',
    category: 'culture',
    question: 'Năm chiếc khuy cài trên chiếc áo dài ngũ thân truyền thống của người Việt biểu trưng cho ngũ thường nào trong Nho học?',
    options: [
      'Nhân — Lễ — Nghĩa — Trí — Tín',
      'Cần — Kiệm — Liêm — Chính — Dũng',
      'Công — Dung — Ngôn — Hạnh — Trí',
      'Phúc — Lộc — Thọ — Khang — Ninh'
    ],
    correctIndex: 0,
    explanation: 'Năm chiếc khuy trên áo ngũ thân tượng trưng cho năm đức tính cốt lõi (Ngũ thường) rèn giũa đạo đức của người quân tử: Nhân (yêu thương), Lễ (phép tắc), Nghĩa (chính trực), Trí (sáng suốt), Tín (thành thật).'
  },
  // 13. Múa Rối Nước
  {
    id: 'q13',
    type: 'culture_trivia',
    difficulty: 'easy',
    category: 'culture',
    question: 'Nhân vật dẫn chuyện mang tính biểu tượng, luôn tươi cười hóm hỉnh và xuất hiện đầu tiên trong các tích trò múa rối nước là ai?',
    options: ['Chú Tễu', 'Bạch Mã hoàng tử', 'Thằng Bờm', 'Cậu Cả Chiêng'],
    correctIndex: 0,
    explanation: 'Chú Tễu (Tễu trong tiếng Nôm nghĩa là tiếng cười) là linh hồn của rối nước, thân hình tròn trĩnh, cởi trần đóng khố với nụ cười lạc quan mở màn cho mọi tích trò.'
  },
  // 14. Bún Đậu Mắm Tôm
  {
    id: 'q14',
    type: 'culture_trivia',
    difficulty: 'easy',
    category: 'culinary',
    question: 'Loại đậu phụ nổi tiếng của làng nghề nào tại Hà Nội được xem là ngon nhất để làm món bún đậu mắm tôm?',
    options: ['Đậu phụ làng Mơ (Mai Động)', 'Đậu phụ làng Vòng', 'Đậu phụ Tràng Tiền', 'Đậu phụ Bát Tràng'],
    correctIndex: 0,
    explanation: 'Đậu phụ làng Mơ (làng Mai Động, Hà Nội) nức tiếng từ thời xưa nhờ vị béo ngậy, mềm mịn, khi chiên vàng vỏ phồng giòn tan mà bên trong vẫn mướt mềm thơm mùi đậu nành.'
  },
  // 15. Lễ hội cồng chiêng
  {
    id: 'q15',
    type: 'province_match',
    difficulty: 'medium',
    category: 'culture',
    question: 'Không gian văn hóa Cồng Chiêng Tây Nguyên trải dài trên địa bàn của bao nhiêu tỉnh vùng Tây Nguyên Việt Nam?',
    options: ['5 tỉnh', '3 tỉnh', '7 tỉnh', '4 tỉnh'],
    correctIndex: 0,
    explanation: 'Không gian văn hóa Cồng chiêng Tây Nguyên bao gồm 5 tỉnh: Kon Tum, Gia Lai, Đắk Lắk, Đắk Nông và Lâm Đồng, được UNESCO công nhận là Kiệt tác di sản truyền khẩu năm 2005.'
  },
  // 16. Chả cá Lã Vọng
  {
    id: 'q16',
    type: 'culture_trivia',
    difficulty: 'medium',
    category: 'culinary',
    question: 'Món chả cá Lã Vọng cổ truyền Hà Nội hảo hạng nhất phải được làm từ loại cá nước ngọt nào?',
    options: ['Cá lăng sông Hồng', 'Cá quả (cá chuối)', 'Cá hồi Sa Pa', 'Cá ba sa'],
    correctIndex: 0,
    explanation: 'Cá lăng sống ở vùng nước chảy xiết ngã ba sông Hồng là loại cá số một làm chả cá Lã Vọng vì thịt trắng, thơm ngọt, ít xương dăm và không hề có mùi tanh.'
  },
  // 17. Bánh Pía
  {
    id: 'q17',
    type: 'province_match',
    difficulty: 'easy',
    category: 'culinary',
    question: 'Món "Bánh pía" vỏ ngàn lớp nhân sầu riêng và trứng muối là đặc sản trứ danh gắn liền với tỉnh nào ở miền Tây?',
    options: ['Sóc Trăng', 'Bến Tre', 'Tiền Giang', 'Vĩnh Long'],
    correctIndex: 0,
    explanation: 'Bánh pía Vũng Thơm (tỉnh Sóc Trăng) là đặc sản kết tinh văn hóa ẩm thực của đồng bào người Hoa (Triều Châu) và người Việt phương Nam.'
  },
  // 18. Làng Gốm Bát Tràng
  {
    id: 'q18',
    type: 'culture_trivia',
    difficulty: 'medium',
    category: 'culture',
    question: 'Dòng men cổ nổi tiếng bậc nhất thế kỷ 16 của làng gốm Bát Tràng có các đường rạn chân chim tự nhiên được gọi là men gì?',
    options: ['Men rạn', 'Men ngọc', 'Men hoàng lưu ly', 'Men ngũ sắc'],
    correctIndex: 0,
    explanation: 'Men rạn là sáng tạo độc bản của nghệ nhân Bát Tràng từ thời Hậu Lê (thế kỷ 16), tạo nên những đường rạn mạng nhện kỳ ảo phủ đầy nét hoài cổ trên đồ thờ và bảo vật.'
  },
  // 19. Bánh Tét vs Bánh Chưng
  {
    id: 'q19',
    type: 'true_false',
    difficulty: 'easy',
    category: 'culinary',
    question: 'Đúng hay Sai: Bánh tét miền Nam được gói bằng lá chuối theo dạng hình trụ dài, trong khi bánh chưng miền Bắc gói bằng lá dong hình vuông vức.',
    options: ['Đúng', 'Sai'],
    correctIndex: 0,
    explanation: 'Hoàn toàn chính xác! Bánh chưng miền Bắc gói lá dong vuông vức tượng trưng cho Đất, còn bánh tét phương Nam chuộng gói lá chuối thành từng đòn trụ tròn dài đầy đặn.'
  },
  // 20. Trà Sen Tây Hồ
  {
    id: 'q20',
    type: 'culture_trivia',
    difficulty: 'hard',
    category: 'culinary',
    question: 'Để ướp được một kilôgam trà sen Tây Hồ thượng hạng theo phương pháp truyền thống, nghệ nhân cần trung bình khoảng bao nhiêu bông sen bách diệp?',
    options: ['Từ 1.000 đến 1.400 bông sen', 'Khoảng 100 bông sen', 'Khoảng 300 bông sen', 'Hơn 5.000 bông sen'],
    correctIndex: 0,
    explanation: 'Cần từ 1.000 đến 1.400 bông sen bách diệp hái lúc sáng sớm, trải qua 7 lần tách lấy "gạo sen" trắng tinh ướp rồi sấy khô trong suốt gần 20 ngày mới hoàn thành 1kg trà sen quý.'
  },
  // 21. Bún Thang
  {
    id: 'q21',
    type: 'culture_trivia',
    difficulty: 'medium',
    category: 'culinary',
    question: 'Tên gọi "Bún thang" trong ẩm thực đất Hà Thành bắt nguồn từ ý nghĩa nào sau đây?',
    options: [
      'Từ chữ "thang" nghĩa là thang thuốc bắc hoặc canh (nước súp đa nguyên liệu)',
      'Vì người ăn phải trèo lên thang gác cao để ăn',
      'Vì bún được đựng trong chiếc thang tre',
      'Tên một viên quan triều Nguyễn sáng chế ra'
    ],
    correctIndex: 0,
    explanation: 'Chữ "thang" trong tiếng Hán Việt vừa có nghĩa là canh súp, vừa gợi liên tưởng đến thang thuốc bắc với sự kết hợp cân bằng âm dương của nhiều vị dược liệu thảo mộc quý.'
  },
  // 22. Di sản thế giới Tràng An
  {
    id: 'q22',
    type: 'culture_trivia',
    difficulty: 'medium',
    category: 'culture',
    question: 'Quần thể danh thắng Tràng An (Ninh Bình) vinh dự là di sản đầu tiên tại Đông Nam Á được UNESCO công nhận dưới danh hiệu gì?',
    options: ['Di sản hỗn hợp (kép) cả Văn hóa và Thiên nhiên thế giới', 'Khu dự trữ sinh quyển thế giới', 'Kỳ quan thiên nhiên mới của thế giới', 'Công viên địa chất toàn cầu'],
    correctIndex: 0,
    explanation: 'Năm 2014, Quần thể danh thắng Tràng An được UNESCO ghi danh là Di sản Văn hóa và Thiên nhiên thế giới — di sản hỗn hợp (kép) đầu tiên và duy nhất tại Việt Nam cũng như Đông Nam Á.'
  },
  // 23. Bánh Cuốn Thanh Trì
  {
    id: 'q23',
    type: 'culture_trivia',
    difficulty: 'hard',
    category: 'culinary',
    question: 'Loại tinh dầu tự nhiên quý hiếm truyền thống nào từng được dùng để nhỏ một giọt vào bát nước chấm bánh cuốn Thanh Trì?',
    options: ['Tinh dầu cà cuống', 'Tinh dầu hoa bưởi', 'Tinh dầu quế chi', 'Tinh dầu bạc hà'],
    correctIndex: 0,
    explanation: 'Tinh dầu cà cuống đực nguyên chất là thứ gia vị đắt giá nức tiếng đất Hà Thành, chỉ cần một giọt nhỏ bằng đầu tăm là bát nước mắm đã dậy mùi thơm ngào ngạt cay the độc đáo.'
  },
  // 24. Đờn Ca Tài Tử
  {
    id: 'q24',
    type: 'province_match',
    difficulty: 'easy',
    category: 'culture',
    question: 'Nghệ thuật "Đờn ca tài tử" — di sản văn hóa phi vật thể của nhân loại — là nét sinh hoạt âm nhạc dân gian đặc trưng của vùng đất nào?',
    options: ['Nam Bộ (Đồng bằng sông Cửu Long)', 'Tây Bắc', 'Bắc Trung Bộ', 'Tây Nguyên'],
    correctIndex: 0,
    explanation: 'Đờn ca tài tử Nam Bộ ra đời vào cuối thế kỷ 19, là loại hình nghệ thuật đờn và ca do những người bình dân, tài tử sau giờ lao động miệt vườn sông nước tụ họp biểu diễn.'
  },
  // 25. Cơm Tấm Sài Gòn
  {
    id: 'q25',
    type: 'culture_trivia',
    difficulty: 'easy',
    category: 'culinary',
    question: 'Hạt gạo "tấm" dùng để nấu món Cơm tấm Sài Gòn trứ danh thực chất là loại hạt gạo gì?',
    options: [
      'Đầu mầm hạt gạo bị vỡ gãy trong quá trình xay xát lúa',
      'Loại gạo nếp dẻo giống mới',
      'Hạt gạo được giã nhỏ bằng máy xay sinh tố',
      'Gạo rang vàng ngâm nước cốt dừa'
    ],
    correctIndex: 0,
    explanation: 'Gạo tấm chính là những mảnh phôi hạt gạo bị vỡ ra khi xay xát. Thuở xưa là món ăn của dân nghèo tận dụng tấm gạo gãy, nay lại trở thành đặc sản độc đáo được ưa chuộng bậc nhất.'
  },
  // 26. Lễ hội chùa Hương
  {
    id: 'q26',
    type: 'culture_trivia',
    difficulty: 'easy',
    category: 'culture',
    question: 'Lễ hội chùa Hương — một trong những lễ hội Phật giáo dài nhất Việt Nam (kéo dài suốt 3 tháng mùa xuân) — diễn ra tại địa phương nào?',
    options: ['Hà Nội (huyện Mỹ Đức)', 'Ninh Bình', 'Quảng Ninh', 'Hà Nam'],
    correctIndex: 0,
    explanation: 'Lễ hội Chùa Hương diễn ra tại xã Hương Sơn, huyện Mỹ Đức, Hà Nội. Hàng vạn phật tử và du khách ngồi đò xuôi dòng suối Yến để hành hương vãn cảnh động Hương Tích.'
  },
  // 27. Bánh Mì Việt Nam
  {
    id: 'q27',
    type: 'true_false',
    difficulty: 'easy',
    category: 'culinary',
    question: 'Đúng hay Sai: Bánh mì Việt Nam đã được từ điển Oxford công nhận là một danh từ riêng biệt ("Banh mi") mà không cần dịch là "Vietnamese sandwich".',
    options: ['Đúng', 'Sai'],
    correctIndex: 0,
    explanation: 'Chính xác! Ngày 24/3/2011, từ "Banh mi" chính thức được thêm vào Từ điển tiếng Anh Oxford, khẳng định vị thế một món ăn mang bản sắc ẩm thực độc lập và lừng danh thế giới.'
  },
  // 28. Bông điên điển
  {
    id: 'q28',
    type: 'province_match',
    difficulty: 'medium',
    category: 'culinary',
    question: 'Món "Canh chua cá linh bông điên điển" là món ăn biểu tượng gắn liền với mùa nào trong năm ở Đồng bằng sông Cửu Long?',
    options: ['Mùa nước nổi (khoảng tháng 9 - 11 Âm lịch)', 'Mùa hạn mặn', 'Mùa giáp hạt', 'Mùa gặt lúa xuân hè'],
    correctIndex: 0,
    explanation: 'Hằng năm khi nước lũ từ thượng nguồn sông Mekong đổ về mang theo phù sa và đàn cá linh non, cũng là lúc bờ đê nở rộ hoa điên điển vàng rực — tạo nên món canh chua ngon nhất năm.'
  },
  // 29. Làng rèn gốm Bàu Trúc
  {
    id: 'q29',
    type: 'culture_trivia',
    difficulty: 'hard',
    category: 'culture',
    question: 'Làng gốm Bàu Trúc (Ninh Thuận) của đồng bào Chăm nổi tiếng với phương pháp chế tác gốm độc đáo nào mà không dùng bàn xoay?',
    options: [
      'Nghệ nhân đi giật lùi vòng quanh khối đất để tạo hình bằng tay',
      'Đổ đất sét lỏng vào khuôn đúc bằng thạch cao',
      'Dùng máy ép thủy lực cổ',
      'Nặn dưới đáy nước suối tự nhiên'
    ],
    correctIndex: 0,
    explanation: 'Phụ nữ Chăm làng Bàu Trúc không dùng bàn xoay mà "tay làm chân xoay" — nghệ nhân vừa đi giật lùi nhịp nhàng quanh bệ đất, vừa dùng tay và khăn ướt vuốt tạo dáng cho chiếc bình gốm.'
  },
  // 30. Nước mắm Việt
  {
    id: 'q30',
    type: 'culture_trivia',
    difficulty: 'medium',
    category: 'culinary',
    question: 'Trong mâm cơm gia đình truyền thống của người Việt, chén nước mắm thường được đặt ở vị trí nào và mang ý nghĩa gì?',
    options: [
      'Đặt ở chính giữa mâm cơm, biểu trưng cho sự sẻ chia ngọt bùi và tính cộng đồng gắn kết',
      'Đặt ở góc bàn người lớn tuổi nhất để thể hiện quyền uy',
      'Đặt bên ngoài mâm chỉ khi nào ai xin mới đem vào',
      'Mỗi người một chén riêng biệt không bao giờ chung chén'
    ],
    correctIndex: 0,
    explanation: 'Chén nước mắm nguyên chất luôn đặt ở trung tâm mâm tròn, nơi tất cả các thành viên cùng chấm chung. Đó là biểu tượng cao đẹp của tình cảm gắn kết, sẻ chia cay đắng ngọt bùi của người Việt.'
  }
];
