
import React, { useState, useEffect, useRef } from 'react';
import { QUIZ_DATA } from './constants';
import type { QuizItem } from './types';
import QuizRow from './components/QuizRow';

const App: React.FC = () => {
  // Keep track of input element refs keyed by quiz id
  const inputRefs = useRef<Record<number, HTMLInputElement | null>>({});
  const [userInputs, setUserInputs] = useState<Record<number, string>>({});
  const [solvedIds, setSolvedIds] = useState<Set<number>>(new Set());
  const [allSolved, setAllSolved] = useState(false);

  useEffect(() => {
    const initialInputs: Record<number, string> = {};
    QUIZ_DATA.forEach(item => {
      initialInputs[item.id] = '';
    });
    setUserInputs(initialInputs);
  }, []);

  const handleInputChange = (id: number, value: string) => {
    const newInputs = { ...userInputs, [id]: value };
    setUserInputs(newInputs);

    const quizItem = QUIZ_DATA.find(item => item.id === id);
    if (quizItem && value.trim().toLowerCase() === quizItem.answer.toLowerCase()) {
      const newSolvedIds = new Set(solvedIds);
      newSolvedIds.add(id);
      setSolvedIds(newSolvedIds);

      // Determine next unsolved quiz id
      const currentIndex = QUIZ_DATA.findIndex(q => q.id === id);
      for (let i = currentIndex + 1; i < QUIZ_DATA.length; i++) {
        const nextId = QUIZ_DATA[i].id;
        if (!newSolvedIds.has(nextId)) {
          // Focus the next input if its ref exists
          const nextInput = inputRefs.current[nextId];
          if (nextInput) {
            // slight delay to ensure DOM update
            setTimeout(() => nextInput.focus(), 0);
          }
          break;
        }
      }

      if (newSolvedIds.size === QUIZ_DATA.length) {
        setAllSolved(true);
      }
    }
  };

  const getSecretWord = () => {
    return QUIZ_DATA
      .map(item => item.answer.toUpperCase().charAt(item.boldIndex))
      .join('');
  }

  return (
    <div className="min-h-screen bg-slate-900 font-sans p-4 sm:p-8 flex flex-col items-center">
      <div className="w-full max-w-4xl mx-auto">
        <header className="text-center mb-8 sm:mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-cyan-400 tracking-wider drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]">
            Standesamt
          </h1>
        </header>

        <main className="bg-slate-800/50 border border-slate-700 rounded-xl shadow-2xl shadow-slate-950/50 p-6 sm:p-8">
          <div className="space-y-6">
            {QUIZ_DATA.map((item: QuizItem) => (
              <QuizRow
                key={item.id}
                id={item.id}
                hint={item.hint}
                answer={item.answer}
                boldIndex={item.boldIndex}
                isSolved={solvedIds.has(item.id)}
                inputValue={userInputs[item.id] || ''}
                onInputChange={handleInputChange}
                inputRef={(ref: HTMLInputElement | null) => {
                  if (ref) {
                    inputRefs.current[item.id] = ref;
                  }
                }}
              />
            ))}
          </div>
        </main>
        
        {allSolved && (
          <footer className="mt-12 text-center p-8 bg-gradient-to-tr from-emerald-500/20 to-yellow-500/20 border-2 border-yellow-400 rounded-xl animate-pulse">
            <h2 className="text-2xl font-bold text-slate-200">System Unlocked!</h2>
            <p className="text-yellow-300 text-5xl font-mono font-bold tracking-[0.5em] my-4 drop-shadow-[0_0_8px_rgba(252,211,77,0.9)]">
              {getSecretWord()}
            </p>
            <p className="text-slate-300">You have successfully decrypted the master key.</p>
          </footer>
        )}
      </div>
    </div>
  );
};

export default App;
