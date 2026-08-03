import React, { useState } from "react";
import {
  Sparkles,
  Zap,
  Briefcase,
  Smile,
  BookOpen,
  Lightbulb,
  Share2,
  Check,
  Building2,
  Edit3,
  SlidersHorizontal,
  ChevronUp,
  ChevronDown,
  Rocket,
  UploadCloud,
  Image as ImageIcon,
  Film,
  Cpu,
  ShieldCheck,
  X,
  Flame,
  Wand2,
} from "lucide-react";
import { ToneType, PlatformId, GenerationParams, BusinessProfile } from "../types";
import { TONE_OPTIONS, PLATFORM_CONFIGS } from "../data/constants";
import { BusinessProfileModal } from "./BusinessProfileModal";

interface InputSectionProps {
  onGenerate: (params: GenerationParams) => void;
  isLoading: boolean;
  statusMessage?: string;
  businessProfile?: BusinessProfile;
  onOpenBusinessProfile?: () => void;
}

export const InputSection: React.FC<InputSectionProps> = ({
  onGenerate,
  isLoading,
  statusMessage,
  businessProfile,
  onOpenBusinessProfile,
}) => {
  const [topic, setTopic] = useState("");
  const [selectedTone, setSelectedTone] = useState<ToneType>("professional");
  const [selectedPlatforms, setSelectedPlatforms] = useState<PlatformId[]>([
    "linkedin",
    "twitter",
    "instagram",
  ]);
  const [targetAudience, setTargetAudience] = useState("");
  const [customInstructions, setCustomInstructions] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Uploaded Post / Reel Media File State (Multiple Images & Reel Videos)
  interface MediaItem {
    url: string; // Image Data URL sent to AI
    previewUrl: string; // Video Blob URL or Image Data URL for rendering
    name: string;
    isVideo: boolean;
  }
  const [uploadedMedia, setUploadedMedia] = useState<MediaItem[]>([]);

  const triggerOpenProfileModal = () => {
    if (onOpenBusinessProfile) {
      onOpenBusinessProfile();
    }
  };

  const compressImageFile = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;
          const maxDim = 1024;
          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL("image/jpeg", 0.8));
        };
        img.onerror = () => resolve(e.target?.result as string);
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    });
  };

  const extractVideoFrame = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const video = document.createElement("video");
      video.preload = "metadata";
      const blobUrl = URL.createObjectURL(file);
      video.src = blobUrl;
      video.muted = true;
      video.playsInline = true;
      video.currentTime = 0.5;

      video.onloadeddata = () => {
        const canvas = document.createElement("canvas");
        let width = video.videoWidth || 640;
        let height = video.videoHeight || 360;
        const maxDim = 1024;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(video, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", 0.8));
      };

      video.onerror = () => {
        resolve("");
      };
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      Array.from(files).forEach(async (file: File) => {
        const isVideo = file.type.startsWith("video/") || file.name.endsWith(".mp4") || file.name.endsWith(".mov") || file.name.endsWith(".webm");
        const localPreviewUrl = URL.createObjectURL(file);
        if (isVideo) {
          const videoFrameUrl = await extractVideoFrame(file);
          setUploadedMedia((prev) => [
            ...prev,
            { url: videoFrameUrl || localPreviewUrl, previewUrl: localPreviewUrl, name: file.name, isVideo: true }
          ]);
        } else {
          const compressedUrl = await compressImageFile(file);
          setUploadedMedia((prev) => [
            ...prev,
            { url: compressedUrl, previewUrl: localPreviewUrl, name: file.name, isVideo: false }
          ]);
        }
      });
    }
  };

  const removeMediaItem = (index: number) => {
    setUploadedMedia((prev) => prev.filter((_, i) => i !== index));
  };

  const togglePlatform = (pId: PlatformId) => {
    if (selectedPlatforms.includes(pId)) {
      if (selectedPlatforms.length === 1) return; // keep at least 1
      setSelectedPlatforms(selectedPlatforms.filter((p) => p !== pId));
    } else {
      setSelectedPlatforms([...selectedPlatforms, pId]);
    }
  };

  const handleSelectAllPlatforms = () => {
    if (selectedPlatforms.length === PLATFORM_CONFIGS.length) {
      setSelectedPlatforms(["linkedin", "twitter", "instagram"]);
    } else {
      setSelectedPlatforms(PLATFORM_CONFIGS.map((p) => p.id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessProfile) {
      if (onOpenBusinessProfile) onOpenBusinessProfile();
      return;
    }
    const firstImage = uploadedMedia.find((m) => !m.isVideo)?.url || uploadedMedia[0]?.url;
    if ((!topic.trim() && uploadedMedia.length === 0) || isLoading) return;

    onGenerate({
      topic: topic.trim() || (uploadedMedia.length > 0 ? `Analyze ${uploadedMedia.length} Uploaded Post/Reel Visuals` : "New Campaign"),
      tone: selectedTone,
      selectedPlatforms,
      targetAudience: targetAudience.trim() || undefined,
      customInstructions: customInstructions.trim() || undefined,
      referenceImage: firstImage || undefined,
      businessProfile,
    });
  };

  const getToneIcon = (tId: ToneType) => {
    switch (tId) {
      case "professional": return <Briefcase className="w-4 h-4 text-blue-400" />;
      case "witty": return <Smile className="w-4 h-4 text-purple-400" />;
      case "inspiring": return <BookOpen className="w-4 h-4 text-emerald-400" />;
      case "urgent": return <Flame className="w-4 h-4 text-rose-400" />;
      default: return <Sparkles className="w-4 h-4 text-cyan-400" />;
    }
  };

  return (
    <div className="vivid-card rounded-3xl p-6 sm:p-8 shadow-2xl relative border border-indigo-500/30 overflow-hidden space-y-6">
      {/* Top Ambient Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Hero Title & Algorithm Scanner Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 text-[10px] font-mono font-bold uppercase flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              2026 Live Social Algorithm Fetcher
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-1">
            Upload Your Post, Reel or Image to Viral-Optimize
          </h2>
          <p className="text-xs text-slate-400 mt-1 font-medium">
            AI scans visual pixels & current 2026 algorithm signals to generate high-retention Captions, Hashtags & Hooks.
          </p>
        </div>

        {businessProfile ? (
          <button
            type="button"
            onClick={onOpenBusinessProfile}
            className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 px-3.5 py-2 rounded-2xl text-xs font-bold transition-all shadow-md shrink-0"
          >
            <Building2 className="w-4 h-4 text-cyan-400" />
            <span className="truncate max-w-[140px] font-mono">{businessProfile.businessName}</span>
            <Edit3 className="w-3.5 h-3.5 text-slate-400" />
          </button>
        ) : (
          <button
            type="button"
            onClick={onOpenBusinessProfile}
            className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-purple-600 hover:from-amber-600 hover:to-purple-700 text-white px-4 py-2.5 rounded-2xl text-xs font-black transition-all shadow-lg shadow-purple-500/25 shrink-0 animate-bounce"
          >
            <Building2 className="w-4 h-4 text-amber-200" />
            <span>⚠️ Profile Required (Click to Set)</span>
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* STEP 1: UPLOAD POST / REEL / MULTIPLE IMAGES FIRST */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-2">
              <UploadCloud className="w-4 h-4 text-cyan-400" />
              <span>Step 1: Upload Post Images, Reel Video Clips or Carousel ({uploadedMedia.length} Uploaded)</span>
            </label>
            <span className="text-[10px] text-slate-400 font-mono">PNG, JPG, WEBP, MP4, MOV</span>
          </div>

          {/* Uploaded Grid Preview */}
          {uploadedMedia.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 bg-slate-950 rounded-2xl border border-cyan-500/40">
              {uploadedMedia.map((item, idx) => (
                <div key={idx} className="relative group rounded-xl overflow-hidden border border-slate-700 bg-slate-900 aspect-square flex flex-col items-center justify-center">
                  {item.isVideo ? (
                    <video src={item.previewUrl} autoPlay loop muted playsInline className="w-full h-full object-cover" />
                  ) : (
                    <img src={item.url} alt={item.name} className="w-full h-full object-cover" />
                  )}
                  <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2">
                    <button
                      type="button"
                      onClick={() => removeMediaItem(idx)}
                      className="p-1.5 bg-rose-500 text-white rounded-xl shadow-lg hover:scale-110 transition-transform"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="absolute bottom-1 left-1 bg-slate-950/80 px-1.5 py-0.5 text-[9px] font-mono text-cyan-300 rounded font-bold uppercase truncate max-w-[90%]">
                    {item.isVideo ? "📹 Reel" : `📷 Image ${idx + 1}`}
                  </span>
                </div>
              ))}
            </div>
          )}

          <label className="border-2 border-dashed border-slate-800 hover:border-cyan-500/60 rounded-2xl p-4 bg-slate-950/60 hover:bg-slate-950 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all group">
            <div className="flex items-center gap-2">
              <div className="p-2.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 group-hover:scale-110 transition-transform">
                <Film className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-slate-200">
                  <span className="text-cyan-400 underline">Upload Reel Video or Multiple Photos</span>
                </p>
                <p className="text-[10px] text-slate-400 font-medium">
                  Select 1 or more images / MP4 video clips for AI pixel & algorithm scan
                </p>
              </div>
            </div>
            <input type="file" accept="image/*,video/*" multiple onChange={handleFileUpload} className="hidden" />
          </label>
        </div>

        {/* STEP 2: TOPIC OR CAPTION IDEA */}
        <div className="space-y-2">
          <label className="block text-sm font-black text-white flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Sparkles className="w-4.5 h-4.5 text-cyan-400" />
              <span>Step 2: Enter Campaign Idea, Offer, or Post Topic</span>
            </span>
            <span className="text-xs text-indigo-300 font-mono font-semibold">
              {topic.length} / 500 chars
            </span>
          </label>
          <textarea
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g. Launching our new high-efficiency AI productivity assistant for remote teams..."
            rows={3}
            disabled={isLoading}
            className="w-full vivid-input rounded-2xl p-4 text-sm text-white placeholder-slate-400 transition-all outline-none resize-none font-sans font-medium"
          />

          {/* Trending Prompts */}
          <div className="pt-1 flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-bold text-slate-300 flex items-center gap-1">
              <Lightbulb className="w-3.5 h-3.5 text-amber-400" /> Try Prompts:
            </span>
            {[
              "AI Workflow Automation Assistant Launch",
              "5 Proven Productivity Habits for Engineers",
              "Announcing Seed Funding Round & Hiring",
              "Sustainable Product Packaging Campaign"
            ].map((idea, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setTopic(idea)}
                disabled={isLoading}
                className="text-[11px] bg-slate-900 hover:bg-purple-950/60 text-slate-200 hover:text-white px-3 py-1 rounded-xl border border-slate-800 hover:border-purple-500/50 transition-all truncate max-w-[280px] sm:max-w-none text-left font-medium"
              >
                {idea}
              </button>
            ))}
          </div>
        </div>

        {/* Platform Selection Section */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-black text-white uppercase tracking-wider flex items-center gap-2">
              <Share2 className="w-4 h-4 text-purple-400" />
              <span>Target Platforms ({selectedPlatforms.length} Selected)</span>
            </label>
            <button
              type="button"
              onClick={handleSelectAllPlatforms}
              className="text-[11px] font-bold text-cyan-400 hover:text-cyan-300 font-mono"
            >
              {selectedPlatforms.length === PLATFORM_CONFIGS.length ? "Reset to Default" : "Select All Platforms"}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {PLATFORM_CONFIGS.map((p) => {
              const isSelected = selectedPlatforms.includes(p.id);
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => togglePlatform(p.id)}
                  disabled={isLoading}
                  className={`p-3 sm:p-4 rounded-2xl border transition-all text-left flex flex-col justify-between space-y-2 ${
                    isSelected
                      ? "bg-slate-900 border-purple-500/60 shadow-lg shadow-purple-500/10 text-white"
                      : "bg-slate-950/50 border-slate-800/80 text-slate-400 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-black text-xs capitalize text-white">{p.name}</span>
                    {isSelected && (
                      <span className="w-4 h-4 rounded-full bg-purple-500 text-white flex items-center justify-center text-[10px]">
                        <Check className="w-2.5 h-2.5" />
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-slate-400 truncate">{p.algorithmTip}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* STEP 4: SELECT BRAND VOICE & TONE */}
        <div className="space-y-2">
          <label className="block text-xs font-black text-white uppercase tracking-wider flex items-center gap-2">
            <Wand2 className="w-4 h-4 text-amber-400" />
            <span>Step 4: Select Brand Voice & Tone</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {TONE_OPTIONS.map((tone) => {
              const isSelected = selectedTone === tone.id;
              return (
                <button
                  key={tone.id}
                  type="button"
                  onClick={() => setSelectedTone(tone.id)}
                  disabled={isLoading}
                  className={`p-3 rounded-2xl border transition-all text-left flex items-start gap-2.5 ${
                    isSelected
                      ? "bg-purple-950/70 border-purple-500 text-white font-bold shadow-lg shadow-purple-500/10"
                      : "bg-slate-950/50 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:border-slate-700"
                  }`}
                >
                  <div className="shrink-0 mt-0.5">{getToneIcon(tone.id)}</div>
                  <div className="min-w-0 flex-1">
                    <span className="text-xs font-bold block text-white leading-snug">{tone.label}</span>
                    <span className="text-[10px] text-slate-400 block leading-tight break-words font-normal mt-0.5">{tone.description}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Advanced Accordion Toggle */}
        <div className="pt-1">
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="text-xs font-bold text-indigo-300 hover:text-white flex items-center gap-1.5 font-mono"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-400" />
            <span>{showAdvanced ? "Hide Advanced Targeting" : "Show Advanced Audience & Instructions"}</span>
            {showAdvanced ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          {showAdvanced && (
            <div className="mt-3 p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3 animate-fadeIn">
              <div>
                <label className="block text-[11px] font-bold text-slate-300 mb-1">Target Audience</label>
                <input
                  type="text"
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                  placeholder="e.g. Founders, Marketing Directors, Gen-Z Fashion Enthusiasts..."
                  className="w-full vivid-input rounded-xl p-2.5 text-xs text-white outline-none font-medium"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-300 mb-1">Custom Prompt Instructions</label>
                <input
                  type="text"
                  value={customInstructions}
                  onChange={(e) => setCustomInstructions(e.target.value)}
                  placeholder="e.g. Include a 20% discount offer code and end with a strong CTA question..."
                  className="w-full vivid-input rounded-xl p-2.5 text-xs text-white outline-none font-medium"
                />
              </div>
            </div>
          )}
        </div>

        {/* Submit Action Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading || (!topic.trim() && uploadedMedia.length === 0)}
            className="w-full py-4 px-6 text-sm font-black text-white btn-vivid-gradient rounded-2xl shadow-xl shadow-purple-500/25 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Zap className="w-5 h-5 animate-spin text-cyan-300" />
                <span>{statusMessage || "Fetching 2026 Social Algorithms & Generating..."}</span>
              </>
            ) : (
              <>
                <Rocket className="w-5 h-5 text-cyan-300 animate-pulse" />
                <span>Fetch Social Algorithms & Generate Viral Content</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
