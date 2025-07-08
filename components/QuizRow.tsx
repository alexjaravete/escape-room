
import React from 'react';
import SolvedAnswer from './SolvedAnswer';

interface QuizRowProps {
  id: number;
  hint: string;
  answer: string;
  boldIndex: number;
  isSolved: boolean;
  inputValue: string;
  onInputChange: (id: number, value: string) => void;
  inputRef?: React.Ref<HTMLInputElement>;
}

const QuizRow: React.FC<QuizRowProps> = ({ id, hint, answer, boldIndex, isSolved, inputValue, onInputChange, inputRef }) => {
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onInputChange(id, e.target.value);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
      <div className="text-slate-300 pr-4">
        <span className="font-mono text-cyan-400 mr-2">{String(id).padStart(2, '0')}.</span>
        {hint}
      </div>
      <div className="w-full">
        {isSolved ? (
          <SolvedAnswer answer={answer} boldIndex={boldIndex} />
        ) : (
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleChange}
            placeholder="Type your answer..."
            className="w-full h-12 px-4 bg-slate-800 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition duration-200 font-mono"
            disabled={isSolved}
          />
        )}
      </div>
    </div>
  );
};

export default QuizRow;
