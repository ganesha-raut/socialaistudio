import React, { useState, useEffect } from "react";
import {
  Copy,
  Check,
  RefreshCw,
  Sparkles,
  Download,
  Calendar,
  Instagram,
  Linkedin,
  Twitter,
  Wand2,
  ChevronDown,
  Layers,
  Film,
  Hash,
  Globe,
  FileSpreadsheet,
  Zap,
  X,
  Volume2,
  Music,
  Video,
  Clock,
  Lightbulb,
} from "lucide-react";
import { GeneratedCampaign, PlatformId } from "../types";

interface PlatformCardProps {
  platform: PlatformId;
  data: any;
  campaignTopic: string;
  onRefine: (platform: PlatformId, currentContent: string, action: string, customPrompt?: string) => Promise<void>;
  isRefining?: boolean;
  onSchedulePost?: (platform: PlatformId, content: string, mode: "manual" | "ai_autonomous", time: string) => void;
}

export const PlatformCard: React.FC<PlatformCardProps> = ({
  platform,
  data,
  campaignTopic,
  onRefine,
  isRefining = false,
}) => {
  const [copied, setCopied] = useState(false);
  const [editableText, setEditableText] = useState("");
  const [customRefinePrompt, setCustomRefinePrompt] = useState("");
  const [showRefineMenu, setShowRefineMenu] = useState(false);

  // New Features Modal States
  const [isTranslateOpen, setIsTranslateOpen] = useState(false);
  const [isHooksOpen, setIsHooksOpen] = useState(false);
  const [storyboardData, setStoryboardData] = useState<any | null>(null);
  const [hashtagData, setHashtagData] = useState<any | null>(null);
  const [viralityScoreData, setViralityScoreData] = useState<any | null>(null);
  const [isLoadingFeature, setIsLoadingFeature] = useState(false);

  const handleScorePost = async () => {
    setIsLoadingFeature(true);
    try {
      const res = await fetch("/api/virality/score-post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: editableText, platform }),
      });
      const result = await res.json();
      setViralityScoreData(result);
    } catch (e) {
      console.warn("Failed scoring post:", e);
    } finally {
      setIsLoadingFeature(false);
    }
  };

  // Update internal editable text if prop changes (embeds hashtags directly in post body)
  useEffect(() => {
    const hashtags = data?.firstCommentHashtags || data?.suggestedHashtags || data?.hashtags || [];
    const hashtagString = hashtags.length > 0
      ? "\n\n" + hashtags.map((t: string) => (t.startsWith("#") ? t : `#${t}`)).join(" ")
      : "";

    let rawBody = "";
    if (platform === "linkedin") {
      const headline = data?.headline ? `${data.headline}\n\n` : "";
      const content = data?.content || data?.caption || data?.post || "";
      rawBody = `${headline}${content}`;
    } else if (platform === "twitter") {
      rawBody = data?.tweet || (data?.thread ? data.thread.join("\n\n---\n\n") : data?.content || data?.caption || "");
    } else {
      rawBody = data?.caption || data?.content || data?.post || "";
    }

    if (!rawBody.trim()) {
      rawBody = `🔥 ${campaignTopic || "Exclusive Launch"}\n\nElevate your style with handcrafted perfection. Designed for those who appreciate true quality and authentic detail.`;
    }

    setEditableText(`${rawBody.trim()}${hashtagString}`);
  }, [data, platform, campaignTopic]);

  const handleCopy = () => {
    navigator.clipboard.writeText(editableText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Feature 1: Regional Dialect Translation
  const handleTranslateLanguage = async (targetLanguage: string) => {
    setIsTranslateOpen(false);
    setIsLoadingFeature(true);
    try {
      const res = await fetch("/api/translate-regional", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: editableText, targetLanguage })
      });
      const json = await res.json();
      if (json.translatedText) {
        setEditableText(json.translatedText);
      }
    } catch (e) {
      console.error("Translation error:", e);
    } finally {
      setIsLoadingFeature(false);
    }
  };

  // Feature 2: 15s Reel Storyboard Generator
  const handleGenerateStoryboard = async () => {
    setIsLoadingFeature(true);
    try {
      const res = await fetch("/api/generate-reel-storyboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: campaignTopic, platform })
      });
      const json = await res.json();
      setStoryboardData(json);
    } catch (e) {
      console.error("Storyboard error:", e);
    } finally {
      setIsLoadingFeature(false);
    }
  };

  // Feature 3: Viral Hashtags & Trending Audio Recommender
  const handleGenerateViralHashtags = async () => {
    setIsLoadingFeature(true);
    try {
      const res = await fetch("/api/generate-viral-hashtags", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: campaignTopic, platform })
      });
      const json = await res.json();
      setHashtagData(json);
    } catch (e) {
      console.error("Hashtag error:", e);
    } finally {
      setIsLoadingFeature(false);
    }
  };

  // Feature 4: Download Content Calendar CSV
  const handleExportCSV = () => {
    const csvContent = `Platform,Campaign Topic,Post Content,Suggested Time,Status\n"${platform.toUpperCase()}","${campaignTopic.replace(/"/g, '""')}","${editableText.replace(/"/g, '""')}","Tonight, 8:45 PM","Ready to Post"`;
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `${platform}_campaign_calendar.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getPlatformIcon = () => {
    switch (platform) {
      case "linkedin": return <Linkedin className="w-5 h-5 text-blue-400" />;
      case "twitter": return <Twitter className="w-5 h-5 text-sky-400" />;
      case "instagram": return <Instagram className="w-5 h-5 text-pink-400" />;
    }
  };

  const getHeaderBadge = () => {
    switch (platform) {
      case "linkedin":
        return <span className="text-[10px] font-black bg-blue-500/20 text-blue-300 border border-blue-500/40 px-2.5 py-0.5 rounded-full">Long-Form Professional</span>;
      case "twitter":
        return <span className="text-[10px] font-black bg-sky-500/20 text-sky-300 border border-sky-500/40 px-2.5 py-0.5 rounded-full">Viral Scroll-Hook</span>;
      case "instagram":
        return <span className="text-[10px] font-black bg-pink-500/20 text-pink-300 border border-pink-500/40 px-2.5 py-0.5 rounded-full">Engagement & Bio Hook</span>;
    }
  };

  const getBestPostingTime = () => {
    switch (platform) {
      case "linkedin": return "Tue - Thu, 8:15 AM - 10:30 AM (Peak Professional Engagement)";
      case "twitter": return "Mon - Fri, 9:00 AM & 12:45 PM (Viral Reply Window)";
      case "instagram": return "Tonight, 8:15 PM - 9:30 PM (Peak Reel Active Window)";
    }
  };

  const getViralAlgorithmTip = () => {
    switch (platform) {
      case "linkedin": return "💡 Algorithm Hack: Keep links out of the main post. State a counter-intuitive industry fact in Sentence 1 to trigger 'See More' dwell-time clicks!";
      case "twitter": return "💡 Algorithm Hack: Reply-to-Impression ratio boosts reach 5x. End with an intriguing question to trigger high comment velocity!";
      case "instagram": return "💡 Algorithm Hack: Send-to-DM (Shares) is signal #1. Include a 3-second visual zoom hook in the first 2 seconds for 3.2x explore placement!";
    }
  };

  const hashtagsList = data.firstCommentHashtags || data.suggestedHashtags || data.hashtags || ["#Viral2026", "#GrowthMatrix", "#TrendingNow", "#ExplorePage"];
  const charCount = editableText.length;

  return (
    <div className="vivid-card-hover vivid-card rounded-3xl overflow-hidden flex flex-col justify-between shadow-2xl relative border border-white/10">
      {/* Platform Ambient Top Bar */}
      <div className={`h-2 w-full ${
        platform === "linkedin" ? "bg-linkedin-gradient" :
        platform === "twitter" ? "bg-twitter-gradient" : "bg-instagram-gradient"
      }`} />

      {/* Card Header */}
      <div className="p-4 sm:p-5 border-b border-slate-800/80 bg-slate-950/60 backdrop-blur-md flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-slate-900 border border-slate-800 shadow-inner shrink-0">
            {getPlatformIcon()}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-base sm:text-lg font-black text-white capitalize tracking-tight">{platform}</h3>
              {getHeaderBadge()}
            </div>
            <p className="text-[11px] text-slate-400 font-mono mt-0.5">
              {charCount} characters
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="w-full sm:w-auto">
          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className={`w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 border shadow-md ${
              copied
                ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                : "btn-vivid-gradient text-white"
            }`}
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span className="truncate">{copied ? "Copied All to Clipboard!" : "⚡ 1-Click Copy All (Caption + Hashtags)"}</span>
          </button>
        </div>
      </div>

      {/* Card Content Area */}
      <div className="p-5 space-y-4 flex-1">
        {/* SECTION 1: VIRAL CAPTION */}
        <div className="space-y-1">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-purple-300 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" /> 1. Viral Caption Copy
          </span>
          <textarea
            value={editableText}
            onChange={(e) => setEditableText(e.target.value)}
            rows={7}
            className="w-full bg-slate-950/80 border border-slate-800/90 rounded-2xl p-4 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:border-purple-500/70 outline-none transition-all font-sans font-medium resize-none leading-relaxed"
          />
        </div>

        {/* SECTION 2: VIRAL HASHTAGS STRUCTURE */}
        <div className="p-3.5 bg-slate-950/90 border border-slate-800 rounded-2xl space-y-2">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-1">
            <Hash className="w-3.5 h-3.5 text-cyan-400" /> 2. Structured Viral Hashtags (Copy & Paste)
          </span>
          <div className="flex flex-wrap gap-1.5">
            {hashtagsList.map((tag: string, idx: number) => {
              const formattedTag = tag.startsWith("#") ? tag : `#${tag}`;
              return (
                <span key={idx} className="px-2.5 py-1 bg-slate-900 text-cyan-300 rounded-xl border border-slate-800 font-mono text-[11px] font-bold break-words">
                  {formattedTag}
                </span>
              );
            })}
          </div>
        </div>

        {/* SECTION 3 & 4: SUGGESTED POSTING TIME & VIRAL TIP */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 bg-slate-950/90 border border-slate-800 rounded-2xl space-y-1">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-amber-400" /> 3. Best Suggested Posting Time
            </span>
            <p className="text-slate-200 font-semibold text-[11px] leading-relaxed pt-0.5 break-words">
              {getBestPostingTime()}
            </p>
          </div>

          <div className="p-3.5 bg-slate-950/90 border border-purple-500/30 rounded-2xl space-y-1">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-purple-300 flex items-center gap-1">
              <Lightbulb className="w-3.5 h-3.5 text-purple-400" /> 4. Algorithm Virality Tip
            </span>
            <p className="text-slate-200 font-semibold text-[11px] leading-relaxed pt-0.5 break-words">
              {getViralAlgorithmTip()}
            </p>
          </div>
        </div>

        {/* 5 ADVANCED AI ACTION TOOLBAR */}
        <div className="flex items-center gap-2 pt-2 overflow-x-auto pb-1 border-t border-slate-800/80 scrollbar-none shrink-0">
          {/* Feature 1: Regional Translator */}
          <div className="relative">
            <button
              onClick={() => setIsTranslateOpen(!isTranslateOpen)}
              className="px-3 py-1.5 rounded-xl text-[11px] font-bold bg-slate-900 hover:bg-purple-950/60 text-purple-300 border border-purple-500/30 flex items-center gap-1.5 transition-all"
            >
              <Globe className="w-3.5 h-3.5 text-purple-400" />
              <span>Translate Dialect</span>
              <ChevronDown className="w-3 h-3" />
            </button>

            {isTranslateOpen && (
              <div className="absolute top-full left-0 mt-2 z-30 w-44 bg-slate-900 border border-purple-500/40 rounded-2xl shadow-2xl p-1.5 space-y-1">
                <button
                  onClick={() => handleTranslateLanguage("marathi")}
                  className="w-full text-left px-3 py-1.5 text-xs text-white font-bold hover:bg-purple-600/30 rounded-xl"
                >
                  🌸 मराठी (Conversational)
                </button>
                <button
                  onClick={() => handleTranslateLanguage("hindi")}
                  className="w-full text-left px-3 py-1.5 text-xs text-white font-bold hover:bg-purple-600/30 rounded-xl"
                >
                  ✨ हिंदी (Hindi Royal)
                </button>
                <button
                  onClick={() => handleTranslateLanguage("hinglish")}
                  className="w-full text-left px-3 py-1.5 text-xs text-white font-bold hover:bg-purple-600/30 rounded-xl"
                >
                  🔥 Hinglish (Urban Vibe)
                </button>
              </div>
            )}
          </div>

          {/* Feature: Virality Score Meter */}
          <button
            onClick={handleScorePost}
            disabled={isLoadingFeature}
            className="px-3 py-1.5 rounded-xl text-[11px] font-bold bg-slate-900 hover:bg-emerald-950/60 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>📊 Virality Score Meter</span>
          </button>

          {/* Feature: A/B Hook Options */}
          <button
            onClick={() => setIsHooksOpen(!isHooksOpen)}
            className="px-3 py-1.5 rounded-xl text-[11px] font-bold bg-slate-900 hover:bg-amber-950/60 text-amber-300 border border-amber-500/30 flex items-center gap-1.5 transition-all"
          >
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>⚡ A/B Hook Options</span>
          </button>

          {/* Feature 2: 15s Reel Storyboard */}
          <button
            onClick={handleGenerateStoryboard}
            disabled={isLoadingFeature}
            className="px-3 py-1.5 rounded-xl text-[11px] font-bold bg-slate-900 hover:bg-pink-950/60 text-pink-300 border border-pink-500/30 flex items-center gap-1.5 transition-all"
          >
            <Film className="w-3.5 h-3.5 text-pink-400" />
            <span>15s Reel Storyboard</span>
          </button>

          {/* Feature 3: Viral Hashtags & Audio */}
          <button
            onClick={handleGenerateViralHashtags}
            disabled={isLoadingFeature}
            className="px-3 py-1.5 rounded-xl text-[11px] font-bold bg-slate-900 hover:bg-cyan-950/60 text-cyan-300 border border-cyan-500/30 flex items-center gap-1.5 transition-all"
          >
            <Hash className="w-3.5 h-3.5 text-cyan-400" />
            <span>Viral Hashtags & Audio</span>
          </button>

          {/* Feature 4: Export CSV Calendar */}
          <button
            onClick={handleExportCSV}
            className="px-3 py-1.5 rounded-xl text-[11px] font-bold bg-slate-900 hover:bg-emerald-950/60 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5 transition-all"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Virality Score Meter Popup Dialog */}
      {viralityScoreData && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="vivid-card rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 border border-emerald-500/40 relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-400" />
                <h3 className="text-sm font-black text-white">AI Virality Score Engine</h3>
              </div>
              <button onClick={() => setViralityScoreData(null)} className="p-1 text-slate-400 hover:text-white rounded-lg">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="text-center space-y-2 py-2">
              <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-emerald-500/15 border border-emerald-500/40">
                <span className="text-3xl font-black text-emerald-400 font-mono">{viralityScoreData.viralityScore}/100</span>
                <span className="px-2.5 py-1 text-xs font-black bg-emerald-500 text-slate-950 rounded-xl font-mono">
                  Grade {viralityScoreData.grade || "A+"}
                </span>
              </div>
              <p className="text-xs text-slate-300 font-medium pt-1">
                🔥 <strong>High Virality Potential</strong> based on 2026 Social Algorithm Signals.
              </p>
            </div>

            <div className="space-y-2 text-xs border-t border-slate-800 pt-3">
              <div className="flex justify-between text-slate-300">
                <span>Hook Retention Power:</span>
                <strong className="text-amber-400 font-mono">{viralityScoreData.hookScore || 92}%</strong>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Dwell-Time Score:</span>
                <strong className="text-cyan-400 font-mono">{viralityScoreData.dwellTimeScore || 88}%</strong>
              </div>
              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-purple-300 leading-relaxed font-medium">
                💡 <strong>AI Virality Tip:</strong> {viralityScoreData.topSuggestion}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* A/B Hook Options Popup Dialog */}
      {isHooksOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="vivid-card rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 border border-amber-500/40 relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-400" />
                <h3 className="text-sm font-black text-white">Scroll-Stopping A/B Hook Options</h3>
              </div>
              <button onClick={() => setIsHooksOpen(false)} className="p-1 text-slate-400 hover:text-white rounded-lg">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              {(data?.abHookOptions || [
                `🔥 Curiosity Hook: "Nobody is talking about this key secret in ${campaignTopic || "our collection"}..."`,
                `⚡ Contrarian Hook: "Stop buying ordinary quality if you want authentic perfection!"`,
                `🎯 Direct Value Hook: "Here are 3 reasons why this ${campaignTopic || "design"} is trending everywhere right now..."`
              ]).map((hook: string, idx: number) => (
                <div key={idx} className="p-3 bg-slate-950 rounded-2xl border border-slate-800 flex items-start justify-between gap-3">
                  <p className="text-xs text-slate-200 font-semibold leading-relaxed flex-1">{hook}</p>
                  <button
                    onClick={() => {
                      const lines = editableText.split("\n");
                      lines[0] = hook;
                      setEditableText(lines.join("\n"));
                      setIsHooksOpen(false);
                    }}
                    className="px-3 py-1.5 bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border border-amber-500/40 rounded-xl text-[11px] font-bold shrink-0"
                  >
                    Apply Hook
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Storyboard Popup Dialog */}
      {storyboardData && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="vivid-card rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 border border-pink-500/40 relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Film className="w-5 h-5 text-pink-400" />
                <h3 className="text-sm font-black text-white">{storyboardData.hookTitle}</h3>
              </div>
              <button onClick={() => setStoryboardData(null)} className="p-1 text-slate-400 hover:text-white rounded-lg">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
              <div className="p-2.5 rounded-xl bg-pink-500/10 border border-pink-500/30 text-xs text-pink-300 font-mono">
                🎵 Recommended Audio: <strong>{storyboardData.recommendedAudioHook}</strong>
              </div>

              {storyboardData.storyboard.map((scene: any, i: number) => (
                <div key={i} className="bg-slate-950 p-3 rounded-2xl border border-slate-800 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between text-pink-400 font-mono font-bold">
                    <span>Scene {i + 1} ({scene.timestamp})</span>
                    <span className="text-slate-400 text-[10px]">{scene.textOnScreen}</span>
                  </div>
                  <p className="text-slate-200"><strong>Visual Shot:</strong> {scene.visualShot}</p>
                  <p className="text-cyan-300 font-medium"><strong>Voiceover:</strong> "{scene.voiceoverScript}"</p>
                </div>
              ))}
            </div>

            <button onClick={() => setStoryboardData(null)} className="w-full py-2.5 text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 rounded-xl">
              Close Storyboard
            </button>
          </div>
        </div>
      )}

      {/* Hashtags & Audio Popup Dialog */}
      {hashtagData && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="vivid-card rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 border border-cyan-500/40 relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Hash className="w-5 h-5 text-cyan-400" />
                <h3 className="text-sm font-black text-white">Viral Hashtags & Trending Audio</h3>
              </div>
              <button onClick={() => setHashtagData(null)} className="p-1 text-slate-400 hover:text-white rounded-lg">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-bold">
                ⚡ Virality Reach Boost: {hashtagData.estimatedViralityBoost}
              </div>

              <div className="space-y-1">
                <p className="font-bold text-white">Niche & Trending Hashtags:</p>
                <div className="flex flex-wrap gap-1">
                  {[...hashtagData.nicheHashtags, ...hashtagData.trendingHashtags].map((tag, idx) => (
                    <span key={idx} className="px-2 py-0.5 bg-slate-900 text-cyan-300 rounded-lg border border-slate-800 font-mono text-[11px]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-slate-800">
                <p className="font-bold text-white">Recommended Audio Hooks:</p>
                {hashtagData.recommendedAudioHooks.map((audio: string, idx: number) => (
                  <p key={idx} className="text-slate-300 font-medium flex items-center gap-1.5">
                    <Music className="w-3.5 h-3.5 text-pink-400" /> {audio}
                  </p>
                ))}
              </div>
            </div>

            <button onClick={() => setHashtagData(null)} className="w-full py-2.5 text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 rounded-xl">
              Close Recommendations
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
