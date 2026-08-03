import React, { useState, useEffect } from "react";
import { Sparkles, RefreshCw } from "lucide-react";

interface AgentThinkingBarProps {
  hasImage?: boolean;
}

const THINKING_STEPS = [
  "📸 Scanning visual pixels & color vibration...",
  "⚡ Fetching 2026 Instagram & LinkedIn algorithm rules...",
  "✍️ Writing high-retention viral copy & hooks...",
  "🏷️ Ranking viral hashtags & trending audio hooks...",
  "🔍 Running QA & algorithm compliance check..."
];

export const AgentThinkingBar: React.FC<AgentThinkingBarProps> = () => {
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current = (current + 1) % THINKING_STEPS.length;
      setStepIndex(current);
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-slate-950/90 border border-purple-500/40 rounded-2xl px-5 py-3.5 shadow-2xl flex items-center justify-between gap-3 animate-fadeIn my-4">
      <div className="flex items-center gap-3 min-w-0">
        <div className="p-2 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/40 shrink-0">
          <RefreshCw className="w-4 h-4 animate-spin text-purple-400" />
        </div>
        <div className="flex items-center gap-2 text-xs sm:text-sm font-black text-white min-w-0 truncate">
          <span className="text-purple-400 font-mono uppercase tracking-wider">Thinking:</span>
          <span className="text-cyan-300 truncate">{THINKING_STEPS[stepIndex]}</span>
        </div>
      </div>

      <div className="flex items-center gap-1.5 shrink-0">
        <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
        <span className="text-[10px] font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40 px-2 py-0.5 rounded-full">
          AI AGENT ACTIVE
        </span>
      </div>
    </div>
  );
};
