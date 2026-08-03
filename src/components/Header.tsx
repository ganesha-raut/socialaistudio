import React, { useState, useEffect } from "react";
import { Sparkles, History, Cpu, Home, PlusCircle, User } from "lucide-react";

interface HeaderProps {
  activeView: "home" | "creator";
  onNavigateHome: () => void;
  onNavigateCreator: () => void;
  historyCount: number;
  onOpenHistory: () => void;
  onNewCampaign: () => void;
  onOpenAlgorithmModal: () => void;
  onOpenBusinessProfile?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeView,
  onNavigateHome,
  onNavigateCreator,
  historyCount,
  onOpenHistory,
  onNewCampaign,
  onOpenAlgorithmModal,
  onOpenBusinessProfile,
}) => {
  const [isKeyModalOpen, setIsKeyModalOpen] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState("");
  const [hasSavedKey, setHasSavedKey] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("gemini_api_key");
    if (saved && saved.trim()) {
      setApiKeyInput(saved);
      setHasSavedKey(true);
    }
  }, []);

  const handleSaveKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKeyInput.trim()) {
      localStorage.setItem("gemini_api_key", apiKeyInput.trim());
      setHasSavedKey(true);
    } else {
      localStorage.removeItem("gemini_api_key");
      setHasSavedKey(false);
    }
    setIsKeyModalOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0d0f1d]/90 backdrop-blur-xl border-b border-indigo-500/20 px-4 lg:px-8 py-3.5 shadow-2xl transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo & Title */}
        <div className="flex items-center gap-3">
          <div className="relative group cursor-pointer" onClick={onNewCampaign}>
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300" />
            <div className="relative w-12 h-12 rounded-2xl bg-[#0d0f1d] border border-white/20 flex items-center justify-center shadow-2xl overflow-hidden p-1">
              <img src="/socialaistudio.png" alt="SocialAI Studio Official Brand Logo - Autonomous Social Content Generator Engine" className="w-full h-full object-cover rounded-xl" decoding="async" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-1.5 cursor-pointer" onClick={onNewCampaign}>
                <span className="text-gradient-vivid font-mono">SocialAI</span>
                <span className="text-cyan-400 font-sans text-xs sm:text-sm font-bold bg-cyan-500/10 px-2 py-0.5 rounded-xl border border-cyan-500/30">Studio</span>
              </h1>
              <span className="px-2 py-0.5 text-[9px] font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40 rounded-full hidden xs:flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                2026 ACTIVE
              </span>
            </div>
            <p className="text-xs text-indigo-300/80 font-medium hidden sm:block">
              Autonomous Social Growth & Multimodal Virality Engine
            </p>
          </div>
        </div>

        {/* Action Controls (Desktop Only - Mobile uses Bottom Nav) */}
        <div className="hidden sm:flex items-center gap-2">
          {/* Navigation Tabs */}
          <button
            onClick={onNavigateHome}
            className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl transition-all border ${
              activeView === "home"
                ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-md shadow-cyan-500/10 font-black"
                : "bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800 hover:text-white"
            }`}
          >
            <Home className="w-3.5 h-3.5 text-cyan-400" />
            <span>Home</span>
          </button>

          <button
            onClick={onNavigateCreator}
            className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl transition-all border ${
              activeView === "creator"
                ? "btn-vivid-gradient text-white border-purple-400/40 shadow-lg shadow-purple-500/25 font-black"
                : "bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800 hover:text-white"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-pink-300 animate-pulse" />
            <span>New Post</span>
          </button>

          {/* Universal Creator & Brand Profile Button */}
          {onOpenBusinessProfile && (
            <button
              onClick={onOpenBusinessProfile}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl transition-all"
              title="Brand & Creator Profile"
            >
              <User className="w-3.5 h-3.5 text-purple-400" />
              <span className="hidden md:inline">Profile</span>
            </button>
          )}

          {/* 2026 Matrix */}

          <button
            onClick={onOpenAlgorithmModal}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-2 text-xs font-bold text-indigo-300 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl transition-all"
            title="2026 Matrix Intelligence"
          >
            <Cpu className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden md:inline">Matrix</span>
          </button>

          <button
            onClick={onOpenHistory}
            className="relative flex items-center gap-1.5 px-2.5 sm:px-3 py-2 text-xs font-bold text-slate-100 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-all"
            title="Saved Drafts"
          >
            <History className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Drafts</span>
            {historyCount > 0 && (
              <span className="px-1.5 py-0.2 text-[10px] font-black bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full font-mono">
                {historyCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
