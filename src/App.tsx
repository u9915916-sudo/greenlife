import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Leaf, GraduationCap, ChevronRight, RefreshCcw, Home, Award, CheckCircle2, XCircle, BookOpen, ArrowLeft, Lightbulb } from 'lucide-react';
import { questions, Difficulty, Question } from './data/questions';
import { cn } from './lib/utils';

type GameState = 'MENU' | 'PLAYING' | 'RESULT' | 'QUESTION_BANK';
const QUESTIONS_PER_ROUND = 10;

export default function App() {
  const [gameState, setGameState] = useState<GameState>('MENU');
  const [difficulty, setDifficulty] = useState<Difficulty>('basic');
  const [currentQuestions, setCurrentQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [previousQuestions, setPreviousQuestions] = useState<Record<Difficulty, string[]>>({
    basic: [],
    advanced: []
  });

  const startGame = (level: Difficulty) => {
    const allLevelQs = questions.filter(q => q.difficulty === level);
    const prevIds = previousQuestions[level];
    
    const availablePrev = allLevelQs.filter(q => prevIds.includes(q.id));
    const availableNew = allLevelQs.filter(q => !prevIds.includes(q.id));
    
    // Shuffle arrays
    const shuffledPrev = availablePrev.sort(() => 0.5 - Math.random());
    const shuffledNew = availableNew.sort(() => 0.5 - Math.random());
    
    // Max overlap is < 50% => Max 4 from previous if we pick 10
    const takeFromPrev = Math.min(shuffledPrev.length, 4);
    const takeFromNew = QUESTIONS_PER_ROUND - takeFromPrev;
    
    let selected = [
      ...shuffledPrev.slice(0, takeFromPrev),
      ...shuffledNew.slice(0, takeFromNew)
    ];
    
    // Fallback if not enough new questions
    if (selected.length < QUESTIONS_PER_ROUND) {
      const needed = QUESTIONS_PER_ROUND - selected.length;
      selected.push(...shuffledPrev.slice(takeFromPrev, takeFromPrev + needed));
    }
    
    // Final shuffle
    selected = selected.sort(() => 0.5 - Math.random());
    
    setPreviousQuestions(prev => ({ ...prev, [level]: selected.map(q => q.id) }));
    setDifficulty(level);
    setCurrentQuestions(selected);
    setCurrentIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setGameState('PLAYING');
  };

  const handleAnswer = (index: number) => {
    if (showExplanation) return; // Prevent multiple clicks
    
    setSelectedAnswer(index);
    setShowExplanation(true);
    
    const isCorrect = index === currentQuestions[currentIndex].answerIndex;
    if (isCorrect) {
      setScore(s => s + 1);
      // Tiny confetti burst on correct answer
      confetti({
        particleCount: 30,
        spread: 50,
        origin: { y: 0.8 },
        colors: ['#22c55e', '#16a34a']
      });
    }
  };

  const nextQuestion = () => {
    if (currentIndex < currentQuestions.length - 1) {
      setCurrentIndex(c => c + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      endGame();
    }
  };

  const endGame = () => {
    setGameState('RESULT');
    // Big confetti if they did well!
    const percentage = score / currentQuestions.length;
    if (percentage > 0.5) {
      const duration = 3000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#22c55e', '#059669', '#34d399']
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#22c55e', '#059669', '#34d399']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    }
  };

  const returnToMenu = () => {
    setGameState('MENU');
  };

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-800 flex flex-col selection:bg-green-200">
      
      {/* Header */}
      <header className="w-full bg-white border-b border-stone-200 sticky top-0 z-10 px-4 items-center flex justify-center py-4 shadow-sm h-16">
        <div className="flex items-center gap-2 max-w-4xl w-full">
          <Leaf className="w-6 h-6 text-green-600" />
          <h1 className="text-xl font-bold text-stone-800 tracking-tight">校園淨零綠生活挑戰</h1>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col p-4 w-full max-w-2xl mx-auto overflow-hidden">
        <AnimatePresence mode="wait">
          
          {/* STATE: MENU */}
          {gameState === 'MENU' && (
            <motion.div
              key="menu"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center justify-center flex-1 py-8"
            >
              <div className="bg-white p-8 rounded-3xl shadow-lg border border-stone-100 flex flex-col items-center text-center max-w-md w-full relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 text-green-50 opacity-50 pointer-events-none">
                  <Leaf className="w-48 h-48 -rotate-12" />
                </div>
                
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 relative z-10 shadow-inner">
                  <Leaf className="w-10 h-10 text-green-600" />
                </div>
                
                <h2 className="text-3xl font-extrabold mb-4 text-stone-900 relative z-10">準備好來點環保挑戰了嗎？</h2>
                <p className="text-stone-500 mb-8 relative z-10 leading-relaxed">
                  透過好玩的闖關遊戲，學習在校園中如何實踐「淨零排放」。選擇你想要挑戰的難度吧！
                </p>

                <div className="flex flex-col w-full gap-4 relative z-10">
                  <button
                    onClick={() => startGame('basic')}
                    className="group relative flex items-center p-4 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-2xl transition-all active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                  >
                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-emerald-600 shrink-0">
                      <GraduationCap className="w-6 h-6" />
                    </div>
                    <div className="ml-4 text-left flex-1 border-r border-emerald-200/50 pr-4">
                      <h3 className="font-bold text-emerald-900 text-lg">基礎闖關</h3>
                      <p className="text-emerald-700/80 text-sm">認識生活中的環保小知識</p>
                    </div>
                    <div className="w-12 flex justify-center text-emerald-400 group-hover:text-emerald-600 transition-colors">
                      <ChevronRight className="w-6 h-6" />
                    </div>
                  </button>

                  <button
                    onClick={() => startGame('advanced')}
                    className="group relative flex items-center p-4 bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded-2xl transition-all active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                  >
                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-teal-600 shrink-0">
                      <Award className="w-6 h-6" />
                    </div>
                    <div className="ml-4 text-left flex-1 border-r border-teal-200/50 pr-4">
                      <h3 className="font-bold text-teal-900 text-lg">進階挑戰</h3>
                      <p className="text-teal-700/80 text-sm">深入理解淨零與碳足跡</p>
                    </div>
                    <div className="w-12 flex justify-center text-teal-400 group-hover:text-teal-600 transition-colors">
                      <ChevronRight className="w-6 h-6" />
                    </div>
                  </button>

                  <div className="h-px bg-stone-200 w-full my-2"></div>

                  <button
                    onClick={() => setGameState('QUESTION_BANK')}
                    className="group relative flex items-center p-4 bg-stone-50 hover:bg-stone-100 border border-stone-200 rounded-2xl transition-all active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-stone-400 focus:ring-offset-2"
                  >
                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-stone-600 shrink-0">
                      <BookOpen className="w-6 h-6" />
                    </div>
                    <div className="ml-4 text-left flex-1 border-r border-stone-200/50 pr-4">
                      <h3 className="font-bold text-stone-800 text-lg">測驗題庫解析</h3>
                      <p className="text-stone-500 text-sm">先行學習完整50題知識</p>
                    </div>
                    <div className="w-12 flex justify-center text-stone-400 group-hover:text-stone-600 transition-colors">
                      <ChevronRight className="w-6 h-6" />
                    </div>
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* STATE: PLAYING */}
          {gameState === 'PLAYING' && currentQuestions.length > 0 && (
            <motion.div
              key="playing"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col flex-1"
            >
              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-xs font-bold text-stone-400 uppercase tracking-widest">
                    Question {currentIndex + 1} / {currentQuestions.length}
                  </span>
                  <span className="text-sm font-medium text-green-600 bg-green-100 px-3 py-1 rounded-full">
                    Score: {score}
                  </span>
                </div>
                <div className="h-2 w-full bg-stone-200 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-green-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentIndex + 1) / currentQuestions.length) * 100}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>
              </div>

              {/* Question Card */}
              <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-stone-200 mb-6 relative">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-white rounded-2xl shadow-md border border-stone-100 flex items-center justify-center text-green-600">
                  {React.createElement(currentQuestions[currentIndex].icon, { className: "w-6 h-6" })}
                </div>
                
                <h2 className="text-xl md:text-2xl font-bold text-stone-800 text-center mt-6 mb-8 leading-relaxed">
                  {currentQuestions[currentIndex].question}
                </h2>

                <div className="grid grid-cols-1 gap-3">
                  {currentQuestions[currentIndex].options.map((option, idx) => {
                    const isSelected = selectedAnswer === idx;
                    const isCorrect = idx === currentQuestions[currentIndex].answerIndex;
                    const isWrong = isSelected && !isCorrect;
                    const showCorrectness = showExplanation;
                    
                    let btnClass = "bg-white border-stone-200 text-stone-700 hover:bg-stone-50 hover:border-green-300";
                    if (showCorrectness) {
                      if (isCorrect) {
                        btnClass = "bg-green-50 border-green-500 text-green-800 shadow-sm";
                      } else if (isWrong) {
                        btnClass = "bg-red-50 border-red-300 text-red-800 bg-red-50 opacity-80 scale-[0.98]";
                      } else {
                        btnClass = "bg-white border-stone-100 text-stone-400 opacity-50";
                      }
                    } else if (isSelected) {
                       btnClass = "bg-green-50 border-green-500 text-green-800 shadow-sm";
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleAnswer(idx)}
                        disabled={showExplanation}
                        className={cn(
                          "relative text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center focus:outline-none",
                          btnClass
                        )}
                      >
                        <div className={cn(
                          "w-8 h-8 rounded-full border-2 flex items-center justify-center mr-4 shrink-0 transition-colors",
                          showCorrectness && isCorrect ? "border-green-500 bg-green-500" :
                          showCorrectness && isWrong ? "border-red-400 bg-red-400" :
                          "border-stone-300 bg-stone-50"
                        )}>
                          {showCorrectness && isCorrect && <CheckCircle2 className="w-5 h-5 text-white" />}
                          {showCorrectness && isWrong && <XCircle className="w-5 h-5 text-white" />}
                          {!showCorrectness && <span className="font-semibold text-stone-500">{String.fromCharCode(65 + idx)}</span>}
                        </div>
                        <span className="font-medium flex-1 text-[15px] leading-snug">{option}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Explanation Overlay */}
              <AnimatePresence>
                {showExplanation && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10 }}
                    className={cn(
                      "rounded-2xl p-6 border shadow-sm flex flex-col",
                      selectedAnswer === currentQuestions[currentIndex].answerIndex
                        ? "bg-green-50 border-green-200"
                        : "bg-red-50 border-red-200"
                    )}
                  >
                    <div className="flex items-start gap-4">
                      <div className={cn(
                        "p-2 rounded-full",
                        selectedAnswer === currentQuestions[currentIndex].answerIndex ? "bg-green-200 text-green-700" : "bg-red-200 text-red-700"
                      )}>
                        {selectedAnswer === currentQuestions[currentIndex].answerIndex ? (
                          <CheckCircle2 className="w-6 h-6" />
                        ) : (
                          <XCircle className="w-6 h-6" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className={cn(
                          "font-bold text-lg mb-1",
                          selectedAnswer === currentQuestions[currentIndex].answerIndex ? "text-green-800" : "text-red-800"
                        )}>
                          {selectedAnswer === currentQuestions[currentIndex].answerIndex ? "答對了！" : "哎呀，答錯了！"}
                        </h4>
                        <p className={cn(
                          "text-sm leading-relaxed",
                          selectedAnswer === currentQuestions[currentIndex].answerIndex ? "text-green-700" : "text-red-700"
                        )}>
                          {currentQuestions[currentIndex].explanation}
                        </p>
                      </div>
                    </div>
                    
                    <button
                      onClick={nextQuestion}
                      className={cn(
                        "mt-6 align-self-end w-full py-4 px-6 rounded-xl font-bold flex items-center justify-center transition-transform active:scale-[0.98]",
                        selectedAnswer === currentQuestions[currentIndex].answerIndex 
                          ? "bg-green-600 hover:bg-green-700 text-white shadow-md shadow-green-600/20" 
                          : "bg-red-500 hover:bg-red-600 text-white shadow-md shadow-red-500/20"
                      )}
                    >
                      {currentIndex < currentQuestions.length - 1 ? '下一題' : '查看結算成績'}
                      <ChevronRight className="w-5 h-5 ml-2" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* STATE: RESULT */}
          {gameState === 'RESULT' && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center flex-1 py-8"
            >
              <div className="bg-white p-8 rounded-3xl shadow-lg border border-stone-100 flex flex-col items-center text-center max-w-md w-full relative overflow-hidden">
                <div className="w-24 h-24 mb-6 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 p-1 shadow-xl">
                  <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                    <span className="text-4xl font-black text-emerald-600">
                      {score}
                    </span>
                  </div>
                </div>

                <h2 className="text-3xl font-extrabold mb-2 text-stone-900">
                  {score === currentQuestions.length ? "環保滿分達人！" : 
                   score > currentQuestions.length / 2 ? "做得很棒！" : "再接再厲！"}
                </h2>
                
                <p className="text-stone-500 mb-8 font-medium">
                  你在 {currentQuestions.length} 題中答對了 {score} 題。
                  <br/>
                  <span className="text-sm font-normal mt-2 inline-block">
                    {difficulty === 'basic' ? "要不要試試更具挑戰的進階模式？" : "感謝你對地球環境的關心！"}
                  </span>
                </p>

                <div className="flex flex-col w-full gap-3">
                  <button
                    onClick={() => startGame(difficulty)}
                    className="flex w-full items-center justify-center py-4 px-6 bg-stone-900 hover:bg-stone-800 text-white rounded-xl font-bold transition-all active:scale-[0.98]"
                  >
                    <RefreshCcw className="w-5 h-5 mr-2" />
                    再玩一次
                  </button>
                  
                  <button
                    onClick={returnToMenu}
                    className="flex w-full items-center justify-center py-4 px-6 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl font-bold transition-all active:scale-[0.98]"
                  >
                    <Home className="w-5 h-5 mr-2" />
                    回到主畫面
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* STATE: QUESTION_BANK */}
          {gameState === 'QUESTION_BANK' && (
            <motion.div
              key="bank"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col flex-1 pb-16"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-stone-800">測驗題庫解析 <span className="text-stone-500 text-base font-normal ml-2">(共 {questions.length} 題)</span></h2>
                <button
                  onClick={returnToMenu}
                  className="flex items-center px-4 py-2 bg-white border border-stone-200 rounded-xl text-stone-600 hover:bg-stone-50 font-medium transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  返回
                </button>
              </div>

              <div className="space-y-10">
                {(['basic', 'advanced'] as Difficulty[]).map((level) => (
                  <div key={level} className="space-y-4">
                    <h3 className="text-xl font-bold text-stone-800 flex items-center pb-3 border-b-2 border-stone-200">
                      {level === 'basic' ? (
                        <><GraduationCap className="w-6 h-6 mr-2 text-emerald-600" /> 基礎題庫 ({questions.filter(q => q.difficulty === 'basic').length} 題)</>
                      ) : (
                        <><Award className="w-6 h-6 mr-2 text-teal-600" /> 進階題庫 ({questions.filter(q => q.difficulty === 'advanced').length} 題)</>
                      )}
                    </h3>
                    <div className="grid gap-4">
                      {questions.filter(q => q.difficulty === level).map((q, idx) => (
                        <div key={q.id} className="bg-white rounded-2xl p-5 md:p-6 border border-stone-200 shadow-sm hover:border-stone-300 transition-colors">
                          <div className="flex flex-col md:flex-row items-start gap-4">
                            <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center shrink-0 md:mt-1 text-stone-500 font-bold font-mono">
                              {idx + 1}
                            </div>
                            <div className="flex-1 w-full">
                              <h4 className="font-bold text-stone-800 text-lg mb-4">{q.question}</h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
                                {q.options.map((opt, oIdx) => (
                                  <div key={oIdx} className={cn(
                                    "px-4 py-3 rounded-xl text-sm border flex items-center",
                                    oIdx === q.answerIndex ? "bg-green-50 border-green-200 text-green-900 font-bold shadow-sm" : "bg-stone-50 border-transparent text-stone-600"
                                  )}>
                                    <span className={cn("mr-3 px-2 py-0.5 rounded text-xs", oIdx === q.answerIndex ? "bg-green-200 text-green-800" : "bg-stone-200 text-stone-500")}>{String.fromCharCode(65 + oIdx)}</span> 
                                    <span className="flex-1">{opt}</span>
                                    {oIdx === q.answerIndex && <CheckCircle2 className="w-5 h-5 ml-2 text-green-600 shrink-0" />}
                                  </div>
                                ))}
                              </div>
                              <div className="bg-blue-50/80 rounded-xl p-4 border border-blue-100">
                                <div className="flex items-center text-blue-800 mb-2">
                                  <Lightbulb className="w-4 h-4 mr-2" />
                                  <span className="font-bold text-sm">解析</span>
                                </div>
                                <p className="text-[15px] text-blue-900/90 leading-relaxed">{q.explanation}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>
    </div>
  );
}

