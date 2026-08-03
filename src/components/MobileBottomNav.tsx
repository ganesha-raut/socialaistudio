import React, { useState, useEffect } from "react";
import { Sparkles, User, Cpu, History, Download, Home, PlusCircle } from "lucide-react";

interface MobileBottomNavProps {
  activeView: "home" | "creator";
  onNavigateHome: () => void;
  onNavigateCreator: () => void;
  historyCount: number;
  onOpenHistory: () => void;
  onNewCampaign: () => void;
  onOpenAlgorithmModal: () => void;
  onOpenBusinessProfile?: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeView,
  onNavigateHome,
  onNavigateCreator,
  historyCount,
  onOpenHistory,
  onNewCampaign,
  onOpenAlgorithmModal,
  onOpenBusinessProfile,
}) => {
  const [deferredPrompt, setDeferredPrompt] = useState<any | null>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstallPWA = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setDeferredPrompt(null);
      }
    } else {
      alert("📲 To install SocialAI Studio on your phone:\n\n• On Chrome/Android: Tap 3 dots ⋮ -> 'Add to Home screen'\n• On iPhone/Safari: Tap Share ⎋ -> 'Add to Home Screen'");
    }
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-[#0d0f1d]/95 backdrop-blur-2xl border-t border-purple-500/30 px-2 py-1.5 shadow-[0_-5px_25px_rgba(0,0,0,0.8)] flex items-center justify-around">
      {/* Home Tab */}
      <button
        onClick={onNavigateHome}
        className={`flex flex-col items-center gap-0.5 font-bold p-1 rounded-xl transition-all ${
          activeView === "home" ? "text-cyan-400 font-black" : "text-slate-400 hover:text-slate-200"
        }`}
      >
        <Home className="w-5 h-5 text-cyan-400" />
        <span className="text-[10px]">Home</span>
      </button>

      {/* New Post Tab */}
      <button
        onClick={onNavigateCreator}
        className={`flex flex-col items-center gap-0.5 font-bold p-1 rounded-xl transition-all ${
          activeView === "creator" ? "text-pink-400 font-black" : "text-slate-400 hover:text-slate-200"
        }`}
      >
        <Sparkles className="w-5 h-5 animate-pulse text-pink-400" />
        <span className="text-[10px]">New Post</span>
      </button>

      {/* Creator Profile */}
      {onOpenBusinessProfile && (
        <button
          onClick={onOpenBusinessProfile}
          className="flex flex-col items-center gap-0.5 text-purple-300 font-bold p-1 rounded-xl hover:bg-slate-900 transition-all"
        >
          <User className="w-5 h-5 text-purple-400" />
          <span className="text-[10px]">Profile</span>
        </button>
      )}

      {/* Drafts */}
      <button
        onClick={onOpenHistory}
        className="relative flex flex-col items-center gap-0.5 text-indigo-300 font-bold p-1 rounded-xl hover:bg-slate-900 transition-all"
      >
        <History className="w-5 h-5 text-indigo-400" />
        <span className="text-[10px]">Drafts</span>
        {historyCount > 0 && (
          <span className="absolute top-0 right-1 px-1.5 py-0.2 text-[9px] font-black bg-pink-500 text-white rounded-full font-mono">
            {historyCount}
          </span>
        )}
      </button>

      {/* Install App */}
      <button
        onClick={handleInstallPWA}
        className="flex flex-col items-center gap-0.5 text-emerald-400 font-bold p-1 rounded-xl hover:bg-slate-900 transition-all"
        title="Install SocialAI App on Phone"
      >
        <Download className="w-5 h-5 text-emerald-400 animate-bounce" />
        <span className="text-[10px]">Install</span>
      </button>
    </nav>
  );
};
