import React from "react";
import {
  Sparkles,
  User,
  Cpu,
  History,
  TrendingUp,
  Zap,
  Building2,
  Edit3,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Flame,
  Globe,
  Share2,
  Film
} from "lucide-react";
import { GeneratedCampaign, BusinessProfile } from "../types";

interface HomeDashboardProps {
  businessProfile?: BusinessProfile;
  history: GeneratedCampaign[];
  onGoToCreator: () => void;
  onOpenProfile: () => void;
  onOpenAlgorithmModal: () => void;
  onSelectCampaign: (campaign: GeneratedCampaign) => void;
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({
  businessProfile,
  history,
  onGoToCreator,
  onOpenProfile,
  onOpenAlgorithmModal,
  onSelectCampaign,
}) => {
  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      {/* 🚀 ATTRACTIVE HERO SECTION WITH OFFICIAL LOGO */}
      <div className="relative vivid-card rounded-3xl p-6 sm:p-10 border border-purple-500/30 overflow-hidden shadow-2xl">
        {/* Glowing Background Orbs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 text-center md:text-left max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-xs font-mono font-bold text-purple-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>2026 AUTONOMOUS VIRALITY ENGINE</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Scale Your Brand Virality with <span className="text-gradient-vivid font-mono">SocialAI</span> <span className="text-cyan-400">Studio</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 font-medium leading-relaxed">
              Upload post visuals or reel clips. Our AI scans 2026 social algorithms to craft high-retention Captions, A/B Hooks, Hashtags, and 15s Storyboards in seconds.
            </p>

            {/* ACTION CTA BUTTONS */}
            <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-3">
              <button
                onClick={onGoToCreator}
                className="px-6 py-3.5 rounded-2xl btn-vivid-gradient text-white font-black text-sm flex items-center gap-2 shadow-xl shadow-purple-500/30 hover:scale-105 transition-all"
              >
                <Sparkles className="w-5 h-5 animate-pulse text-cyan-300" />
                <span>⚡ Create New Viral Post</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>

              <button
                onClick={onOpenProfile}
                className="px-5 py-3.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-slate-100 border border-slate-700 font-bold text-sm flex items-center gap-2 transition-all"
              >
                <Building2 className="w-4.5 h-4.5 text-cyan-400" />
                <span>{businessProfile ? businessProfile.businessName : "Setup Creator Profile"}</span>
                <Edit3 className="w-3.5 h-3.5 text-slate-400" />
              </button>
            </div>
          </div>

          {/* OFFICIAL BRAND LOGO DISPLAY */}
          <div className="relative group shrink-0">
            <div className="absolute -inset-3 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400 rounded-3xl blur-xl opacity-80 group-hover:opacity-100 transition duration-500" />
            <div className="relative w-40 h-40 sm:w-52 sm:h-52 rounded-3xl bg-[#0d0f1d] border-2 border-white/25 p-2 flex items-center justify-center shadow-2xl overflow-hidden">
              <img
                src="/socialaistudio.png"
                alt="SocialAI Studio Official Emblem - 2026 Multimodal Virality Engine"
                className="w-full h-full object-cover rounded-2xl filter drop-shadow-[0_0_25px_rgba(6,182,212,0.7)]"
                loading="eager"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 📊 LIVE METRICS & AGENT STATUS COUNTERS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
        <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-2xl space-y-1">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Algorithm Engine</span>
          <p className="text-sm sm:text-base font-black text-emerald-400 flex items-center gap-1.5 font-mono">
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> 2026 ACTIVE
          </p>
        </div>

        <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-2xl space-y-1">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Vector Profile</span>
          <p className="text-sm sm:text-base font-black text-cyan-400 flex items-center gap-1.5 font-mono">
            <Building2 className="w-4 h-4 text-cyan-400" /> {businessProfile ? "SYNCED" : "PENDING"}
          </p>
        </div>

        <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-2xl space-y-1">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Virality Potential</span>
          <p className="text-sm sm:text-base font-black text-amber-400 flex items-center gap-1.5 font-mono">
            <Flame className="w-4 h-4 text-amber-400" /> 96.4% AVG
          </p>
        </div>

        <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-2xl space-y-1">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Saved Drafts</span>
          <p className="text-sm sm:text-base font-black text-pink-400 flex items-center gap-1.5 font-mono">
            <History className="w-4 h-4 text-pink-400" /> {history.length} CAMPAIGNS
          </p>
        </div>
      </div>

      {/* BRAND & CREATOR PROFILE PREVIEW */}
      {businessProfile ? (
        <div className="p-5 bg-slate-950/90 border border-cyan-500/30 rounded-3xl space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white font-mono">{businessProfile.businessName}</h3>
                <p className="text-xs text-slate-400">{businessProfile.businessType}</p>
              </div>
            </div>
            <button
              onClick={onOpenProfile}
              className="px-3 py-1.5 text-xs font-bold text-cyan-300 bg-slate-900 border border-slate-700 rounded-xl hover:bg-slate-800 transition-all flex items-center gap-1.5"
            >
              <Edit3 className="w-3.5 h-3.5 text-cyan-400" />
              <span>Edit Profile</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="p-3 bg-slate-900/60 rounded-2xl border border-slate-800 space-y-1">
              <span className="text-[10px] font-mono text-purple-300 uppercase font-bold">Unique Brand Hook:</span>
              <p className="text-slate-200 font-semibold">{businessProfile.uniqueHook}</p>
            </div>
            <div className="p-3 bg-slate-900/60 rounded-2xl border border-slate-800 space-y-1">
              <span className="text-[10px] font-mono text-cyan-300 uppercase font-bold">Target Audience:</span>
              <p className="text-slate-200 font-semibold">{businessProfile.targetAudience}</p>
            </div>
            <div className="p-3 bg-slate-900/60 rounded-2xl border border-slate-800 space-y-1">
              <span className="text-[10px] font-mono text-emerald-300 uppercase font-bold">Brand Voice & Tone:</span>
              <p className="text-slate-200 font-semibold">{businessProfile.brandTone}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-5 bg-gradient-to-r from-amber-500/10 via-purple-500/10 to-cyan-500/10 border border-amber-500/40 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 justify-center sm:justify-start">
              <span>⚠️ Creator & Brand Profile Not Configured</span>
            </h3>
            <p className="text-xs text-slate-300">
              Set up your brand profile once so AI can generate tailored, authentic posts matching your brand voice!
            </p>
          </div>
          <button
            onClick={onOpenProfile}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-purple-600 text-white font-bold text-xs shrink-0 shadow-lg shadow-purple-500/25 hover:scale-105 transition-all"
          >
            Setup Profile Now
          </button>
        </div>
      )}

      {/* RECENT CAMPAIGN DRAFTS GRID */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black text-white flex items-center gap-2">
            <History className="w-5 h-5 text-pink-400" />
            <span>Recent Viral Campaigns</span>
          </h2>
          <button
            onClick={onGoToCreator}
            className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-mono"
          >
            <span>+ Create New</span>
          </button>
        </div>

        {history.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {history.slice(0, 6).map((camp) => (
              <div
                key={camp.id}
                onClick={() => {
                  onSelectCampaign(camp);
                  onGoToCreator();
                }}
                className="p-4 bg-slate-950/80 hover:bg-slate-900 border border-slate-800 hover:border-purple-500/50 rounded-2xl cursor-pointer transition-all space-y-3 group shadow-lg"
              >
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                  <span className="text-xs font-bold text-white truncate max-w-[180px]">{camp.topic}</span>
                  <span className="text-[10px] font-mono text-purple-300 bg-purple-500/10 px-2 py-0.5 rounded-full capitalize">
                    {camp.tone}
                  </span>
                </div>

                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {camp.linkedin?.content || camp.instagram?.caption || camp.twitter?.tweet || "Generated campaign details..."}
                </p>

                <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 pt-1">
                  <span>{new Date(camp.createdAt).toLocaleDateString()}</span>
                  <span className="text-cyan-400 group-hover:translate-x-1 transition-transform flex items-center gap-1 font-bold">
                    View Post <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center bg-slate-950/50 border border-slate-800 rounded-3xl space-y-3">
            <Sparkles className="w-8 h-8 text-cyan-400 mx-auto animate-pulse" />
            <p className="text-xs text-slate-400 font-medium">No saved campaigns yet. Click below to create your first viral post!</p>
            <button
              onClick={onGoToCreator}
              className="px-5 py-2.5 rounded-xl btn-vivid-gradient text-white text-xs font-bold shadow-lg"
            >
              ⚡ Create First Viral Post
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
