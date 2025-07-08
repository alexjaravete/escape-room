
import React from 'react';

interface SolvedAnswerProps {
  answer: string;
  boldIndex: number;
}

const SolvedAnswer: React.FC<SolvedAnswerProps> = ({ answer, boldIndex }) => {
  const upperCaseAnswer = answer.toUpperCase();
  const before = upperCaseAnswer.substring(0, boldIndex);
  const boldChar = upperCaseAnswer.charAt(boldIndex);
  const after = upperCaseAnswer.substring(boldIndex + 1);

  return (
    <div className="px-4 py-2 bg-slate-700/50 border border-emerald-500/30 rounded-lg text-emerald-300 font-mono tracking-widest text-lg text-center whitespace-normal">
      <span className="opacity-80">{before}</span>
      <span className="font-bold text-2xl text-yellow-300 drop-shadow-[0_0_5px_rgba(252,211,77,0.8)]">{boldChar}</span>
      <span className="opacity-80">{after}</span>
    </div>
  );
};

export default SolvedAnswer;
