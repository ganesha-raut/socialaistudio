import React, { useState } from "react";
import { X, Cpu, Zap, TrendingUp, Clock, CheckCircle2, RefreshCw } from "lucide-react";
import { ALGORITHM_INTELLIGENCE_2026 } from "../data/constants";

interface AlgorithmModalProps {
  onClose: () => void;
}

export const AlgorithmModal: React.FC<AlgorithmModalProps> = ({ onClose }) => {
  const [liveInsights, setLiveInsights] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchLiveAlgorithmInsights = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/algorithm/live-insights", { method: "POST" });
      const data = await res.json();
      setLiveInsights(data);
    } catch (e) {
      console.warn("Failed fetching live algorithm insights:", e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 md:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
                <span>2026 Social Media Algorithm Intelligence</span>
                <span className="px-2 py-0.5 text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full font-mono">
                  Live Rules
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Key ranking signals, viral hook formulas & optimal posting windows
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchLiveAlgorithmInsights}
              disabled={isLoading}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-cyan-300 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 rounded-xl transition-all"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-cyan-400 ${isLoading ? "animate-spin" : ""}`} />
              <span className="hidden sm:inline">Fetch Live AI Signals</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content List */}
        <div className="p-4 md:p-6 overflow-y-auto space-y-4">
          <div className="p-3.5 bg-gradient-to-r from-blue-950/40 via-cyan-950/30 to-purple-950/40 border border-cyan-500/30 rounded-xl text-xs text-cyan-200 flex items-start gap-2.5">
            <Zap className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <strong className="block font-bold text-white mb-0.5">
                SocialAI 2026 Pipeline Standard:
              </strong>
              Our AI engine embeds these exact 2026 platform ranking rules into every generated caption, hashtag set, and reel storyboard to maximize organic explore placement.
            </div>
          </div>

          {liveInsights && (
            <div className="p-4 bg-purple-950/40 border border-purple-500/40 rounded-2xl space-y-3">
              <h3 className="text-xs font-black text-purple-300 uppercase tracking-wider flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-purple-400" />
                Live Gemini 2026 AI Algorithm Signals
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                {Object.entries(liveInsights).map(([plat, info]: [string, any]) => (
                  <div key={plat} className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
                    <span className="font-black text-cyan-400 uppercase text-[10px] block">{plat}</span>
                    <p className="text-white font-bold text-[11px]">{info.primaryRankingFactor}</p>
                    <p className="text-slate-400 text-[10px]">{info.viralityHack}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {ALGORITHM_INTELLIGENCE_2026.map((item) => (
            <div
              key={item.platform}
              className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3"
            >
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  <h3 className="text-sm font-bold text-white capitalize">{item.platform} Algorithm</h3>
                </div>
                <span className="text-[11px] font-mono font-semibold text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-0.5 rounded-full">
                  Target: {item.keySignal}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                    Golden Rule:
                  </span>
                  <p className="text-slate-200 font-medium bg-slate-900 p-2 rounded-lg border border-slate-800">
                    {item.goldenRule}
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                    Peak Posting Window:
                  </span>
                  <p className="text-amber-300 font-mono font-medium bg-slate-900 p-2 rounded-lg border border-slate-800 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    {item.bestPostingWindow}
                  </p>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-cyan-950/30 border border-cyan-500/20 text-xs text-cyan-300 font-medium">
                💡 <strong>Viral Hook Formula:</strong> {item.viralHookPattern}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
