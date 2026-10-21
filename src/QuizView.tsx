import React, { useState, useMemo } from 'react';
import { QUIZ_QUESTIONS } from '../data/quizData';
import { QuizQuestion } from '../types';
import { useFavorites } from '../context/FavoritesContext';
import { useLanguage } from '../context/LanguageContext';
import { HelpCircle, CheckCircle2, XCircle, RotateCcw, Trophy, Sparkles, ArrowRight, Clock, Award } from 'lucide-react';

export const QuizView: React.FC = () => {
  const { quizHistory, recordQuizAttempt } = useFavorites();
  const { t } = useLanguage();

  // Settings
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'culinary' | 'culture'>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'all' | 'easy' | 'medium' | 'hard'>('all');
  const [questionsCount, setQuestionsCount] = useState<number>(10);

  // Game state
  const [isGameActive, setIsGameActive] = useState<boolean>(false);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [activeQuestions, setActiveQuestions] = useState<QuizQuestion[]>([]);

  // Filter and shuffle questions pool
  const handleStartQuiz = () => {
    let pool = QUIZ_QUESTIONS.filter((q) => {
      if (selectedCategory !== 'all' && q.category !== selectedCategory) return false;
      if (selectedDifficulty !== 'all' && q.difficulty !== selectedDifficulty) return false;
      return true;
    });

    if (pool.length === 0) {
      pool = [...QUIZ_QUESTIONS];
    }

    // Fisher-Yates Shuffle
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    const chosen = shuffled.slice(0, Math.min(questionsCount, shuffled.length));

    setActiveQuestions(chosen);
    setCurrentIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setIsGameActive(true);
    setIsGameOver(false);
  };

  const handleSelectOption = (index: number) => {
    if (isAnswered) return; // Prevent multiple scoring

    setSelectedAnswer(index);
    setIsAnswered(true);

    const currentQ = activeQuestions[currentIndex];
    if (index === currentQ.correctIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex + 1 < activeQuestions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      // Quiz finished
      const finalScore = selectedAnswer === activeQuestions[currentIndex].correctIndex ? score : score;
      setIsGameOver(true);
      recordQuizAttempt(
        finalScore,
        activeQuestions.length,
        selectedCategory === 'culinary' ? 'Ẩm thực' : selectedCategory === 'culture' ? 'Văn hóa' : 'Tổng hợp'
      );
    }
  };

  const currentQ = activeQuestions[currentIndex];
  const progressPercent = activeQuestions.length > 0 ? ((currentIndex + 1) / activeQuestions.length) * 100 : 0;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="border-b border-stone-200 pb-6 space-y-2">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#9E2A2B]">
          Đấu trường trí tuệ dân gian
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
          Quiz & Trò Chơi Văn Hóa Việt Nam
        </h1>
        <p className="text-sm sm:text-base text-stone-600 font-sans leading-relaxed">
          Thử thách kiến thức về món ăn truyền thống, câu chuyện sự tích, di sản văn hóa phi vật thể và phong tục Tết với phản hồi và lời giải chi tiết.
        </p>
      </div>

      {/* State 1: Configuration Screen */}
      {!isGameActive && !isGameOver && (
        <div className="space-y-8">
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-xs space-y-6">
            <h2 className="text-xl font-serif font-bold text-stone-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#C28B38]" /> Thiết lập vòng thi thử thách
            </h2>

            {/* Category Selector */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-stone-500 block">
                Chủ đề câu đố
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'all', label: 'Tất cả chủ đề', desc: 'Ẩm thực, lễ hội & di sản' },
                  { id: 'culinary', label: 'Ẩm thực ba miền', desc: 'Món ăn, nguyên liệu, gia vị' },
                  { id: 'culture', label: 'Di sản & Phong tục', desc: 'Lễ Tết, nghệ thuật, lịch sử' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id as any)}
                    className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                      selectedCategory === cat.id
                        ? 'border-[#9E2A2B] bg-[#9E2A2B]/5 ring-1 ring-[#9E2A2B]'
                        : 'border-stone-200 hover:border-stone-300 bg-stone-50/50'
                    }`}
                  >
                    <div className="font-semibold text-sm text-stone-900">{cat.label}</div>
                    <div className="text-xs text-stone-500 mt-1">{cat.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty Selector */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-stone-500 block">
                Mức độ khó
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'all', label: 'Tổng hợp' },
                  { id: 'easy', label: 'Dễ (Khám phá)' },
                  { id: 'medium', label: 'Trung bình' },
                  { id: 'hard', label: 'Khó (Chuyên sâu)' },
                ].map((diff) => (
                  <button
                    key={diff.id}
                    onClick={() => setSelectedDifficulty(diff.id as any)}
                    className={`py-2 px-3 rounded-lg text-xs font-medium border transition-colors cursor-pointer text-center ${
                      selectedDifficulty === diff.id
                        ? 'border-[#1B4332] bg-[#1B4332] text-white shadow-xs'
                        : 'border-stone-200 hover:bg-stone-100 text-stone-700'
                    }`}
                  >
                    {diff.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Number of Questions */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-stone-500 block">
                Số lượng câu hỏi trong lượt chơi
              </label>
              <div className="flex items-center gap-3">
                {[5, 10, 15, 20].map((num) => (
                  <button
                    key={num}
                    onClick={() => setQuestionsCount(num)}
                    className={`px-4 py-2 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                      questionsCount === num
                        ? 'border-stone-900 bg-stone-900 text-white'
                        : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    {num} câu
                  </button>
                ))}
              </div>
            </div>

            {/* Start Button */}
            <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
              <span className="text-xs text-stone-500 font-sans">
                Ngân hàng dữ liệu có hơn 30 câu hỏi chọn lọc
              </span>
              <button
                onClick={handleStartQuiz}
                className="px-6 py-3 rounded-xl text-sm font-semibold text-white bg-[#9E2A2B] hover:bg-[#852223] active:bg-[#701c1d] transition-all shadow-md cursor-pointer flex items-center gap-2"
              >
                <span>Bắt đầu thi đấu</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Recent Quiz Attempts History */}
          {quizHistory.length > 0 && (
            <div className="bg-white p-6 rounded-2xl border border-stone-200 space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-500 flex items-center gap-2">
                <Trophy className="w-4 h-4 text-[#C28B38]" /> Lịch sử thử thách gần đây trên thiết bị
              </h3>
              <div className="divide-y divide-stone-100">
                {quizHistory.slice(0, 5).map((att) => (
                  <div key={att.id} className="py-2.5 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-semibold text-stone-800">{att.category}</span>
                      <span className="text-stone-400 mx-2">·</span>
                      <span className="text-stone-500 font-mono">
                        {new Date(att.timestamp).toLocaleDateString('vi-VN')} {new Date(att.timestamp).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-stone-900">
                        {att.score}/{att.total} ({att.percentage}%)
                      </span>
                      {att.percentage >= 80 ? (
                        <span className="text-emerald-600 font-semibold">Xuất sắc</span>
                      ) : att.percentage >= 50 ? (
                        <span className="text-amber-600 font-semibold">Khá</span>
                      ) : (
                        <span className="text-stone-500">Cố gắng</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* State 2: Active Gameplay Screen */}
      {isGameActive && !isGameOver && currentQ && (
        <div className="space-y-6">
          {/* Progress Bar & Header */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-stone-600 font-sans">
              <span className="font-semibold text-[#9E2A2B]">
                Câu {currentIndex + 1} / {activeQuestions.length}
              </span>
              <span className="font-mono font-bold text-stone-800">
                Điểm hiện tại: {score} câu đúng
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-stone-200 overflow-hidden">
              <div
                className="h-full bg-[#9E2A2B] transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-sm space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs text-stone-500">
                <span className="uppercase tracking-wider font-semibold text-[#C28B38]">
                  {currentQ.category === 'culinary' ? 'Ẩm thực' : 'Văn hóa & Di sản'}
                </span>
                <span>·</span>
                <span>
                  {currentQ.difficulty === 'easy'
                    ? 'Mức dễ'
                    : currentQ.difficulty === 'medium'
                    ? 'Mức trung bình'
                    : 'Mức chuyên sâu'}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 leading-snug">
                {currentQ.question}
              </h2>
            </div>

            {/* Answer Options */}
            <div className="space-y-3">
              {currentQ.options.map((option, idx) => {
                let btnStyle = 'border-stone-200 hover:border-stone-400 bg-stone-50/70 text-stone-800';

                if (isAnswered) {
                  if (idx === currentQ.correctIndex) {
                    btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-semibold ring-1 ring-emerald-500';
                  } else if (idx === selectedAnswer) {
                    btnStyle = 'border-red-500 bg-red-50 text-red-900 line-through';
                  } else {
                    btnStyle = 'border-stone-200 bg-stone-100/50 text-stone-400';
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={isAnswered}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full p-4 rounded-xl border text-left text-sm sm:text-base transition-all flex items-center justify-between cursor-pointer disabled:cursor-default ${btnStyle}`}
                  >
                    <span>{option}</span>
                    {isAnswered && idx === currentQ.correctIndex && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    )}
                    {isAnswered && idx === selectedAnswer && idx !== currentQ.correctIndex && (
                      <XCircle className="w-5 h-5 text-red-600 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Cultural Explanation upon selection */}
            {isAnswered && (
              <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/60 space-y-2 animate-fadeIn">
                <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#C28B38]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Giải Thích Văn Hóa:</span>
                </div>
                <p className="text-xs sm:text-sm text-stone-800 leading-relaxed font-sans">
                  {currentQ.explanation}
                </p>
              </div>
            )}

            {/* Next / Finish Button */}
            {isAnswered && (
              <div className="pt-4 border-t border-stone-100 flex justify-end">
                <button
                  onClick={handleNextQuestion}
                  className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-[#1B4332] hover:bg-[#153427] transition-colors cursor-pointer flex items-center gap-2"
                >
                  <span>
                    {currentIndex + 1 === activeQuestions.length ? 'Xem kết quả chung cuộc' : 'Câu tiếp theo'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* State 3: Game Over Summary Screen */}
      {isGameOver && (
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-stone-200 shadow-md text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-amber-100 flex items-center justify-center mx-auto text-[#C28B38]">
            <Award className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#9E2A2B]">
              Hoàn thành thử thách
            </span>
            <h2 className="text-3xl font-serif font-bold text-stone-900">
              Tổng Kết Vòng Thi
            </h2>
            <p className="text-sm text-stone-600 max-w-md mx-auto">
              Bạn đã hoàn thành bài trắc nghiệm kiến thức văn hóa Việt Nam.
            </p>
          </div>

          {/* Score Metric Ring */}
          <div className="p-6 rounded-2xl bg-stone-50 max-w-sm mx-auto border border-stone-200 space-y-2">
            <div className="text-4xl sm:text-5xl font-serif font-bold text-[#9E2A2B]">
              {score} / {activeQuestions.length}
            </div>
            <div className="text-sm font-semibold text-stone-700">
              Đạt tỉ lệ chính xác: {Math.round((score / activeQuestions.length) * 100)}%
            </div>
            <p className="text-xs text-stone-500 pt-1">
              {score === activeQuestions.length
                ? 'Tuyệt đỉnh! Bạn là một bậc thầy am hiểu văn hóa và ẩm thực Việt!'
                : score >= activeQuestions.length * 0.7
                ? 'Rất ấn tượng! Vốn hiểu biết của bạn về dải đất chữ S rất sâu sắc.'
                : 'Khởi đầu tốt! Hãy tiếp tục khám phá thư viện để trau dồi thêm nhiều nét văn hóa kỳ thú.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <button
              onClick={handleStartQuiz}
              className="px-6 py-3 rounded-xl text-sm font-semibold text-white bg-[#9E2A2B] hover:bg-[#852223] transition-colors cursor-pointer flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Chơi lại vòng mới</span>
            </button>
            <button
              onClick={() => {
                setIsGameActive(false);
                setIsGameOver(false);
              }}
              className="px-6 py-3 rounded-xl text-sm font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 transition-colors cursor-pointer"
            >
              Đổi chủ đề & cấp độ
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
