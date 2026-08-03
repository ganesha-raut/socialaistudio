import React, { useState, useEffect } from "react";
import { Building2, Sparkles, Check, X, Tag, Target, Megaphone, MapPin, Award } from "lucide-react";
import { BusinessProfile } from "../types";

interface BusinessProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (profile: BusinessProfile) => void;
  currentProfile?: BusinessProfile;
}

export const BusinessProfileModal: React.FC<BusinessProfileModalProps> = ({
  isOpen,
  onClose,
  onSave,
  currentProfile,
}) => {
  const [businessName, setBusinessName] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [uniqueHook, setUniqueHook] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [brandTone, setBrandTone] = useState("");
  const [contactOrLocation, setContactOrLocation] = useState("");

  useEffect(() => {
    if (currentProfile) {
      setBusinessName(currentProfile.businessName || "");
      setBusinessType(currentProfile.businessType || "");
      setUniqueHook(currentProfile.uniqueHook || "");
      setTargetAudience(currentProfile.targetAudience || "");
      setBrandTone(currentProfile.brandTone || "");
      setContactOrLocation(currentProfile.contactOrLocation || "");
    }
  }, [currentProfile, isOpen]);

  if (!isOpen) return null;

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName.trim()) {
      alert("Please enter your Brand, Creator, or Channel Name");
      return;
    }

    const savedProfile: BusinessProfile = {
      businessName: businessName.trim(),
      businessType: businessType.trim() || "Content Creator / Brand",
      uniqueHook: uniqueHook.trim() || "High quality & authentic value",
      targetAudience: targetAudience.trim() || "Global audience & engaged followers",
      brandTone: brandTone.trim() || "Professional, Engaging & Authentic",
      contactOrLocation: contactOrLocation.trim() || "Available Online",
    };

    onSave(savedProfile);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      <div className="bg-slate-900 border border-cyan-500/30 rounded-2xl max-w-xl w-full p-5 md:p-6 shadow-2xl shadow-cyan-950/50 relative overflow-hidden my-8">
        {/* Top Glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2 flex-wrap">
                <span>SocialAI Studio Profile Engine</span>
                <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-[10px] px-2 py-0.5 rounded-full font-mono uppercase">
                  SQLite Vector Memory
                </span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5 leading-tight">
                Universal profile context for Creators, YouTubers, Founders, Agencies & E-commerce Brands
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleFormSubmit} className="space-y-4">
          {/* Business Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-200 mb-1 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>Business / Brand Name *</span>
            </label>
            <input
              type="text"
              required
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              placeholder="e.g. Kalyani Paithani & Heritage Sarees"
              className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl p-2.5 text-xs text-slate-100 placeholder-slate-500 outline-none"
            />
          </div>

          {/* Business Type / Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-1 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-purple-400" />
                <span>Niche / Business Category</span>
              </label>
              <input
                type="text"
                value={businessType}
                onChange={(e) => setBusinessType(e.target.value)}
                placeholder="e.g. Handloom Ethnic & Luxury Sarees"
                className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl p-2.5 text-xs text-slate-100 placeholder-slate-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-1 flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-rose-400" />
                <span>Target Audience</span>
              </label>
              <input
                type="text"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                placeholder="e.g. Brides, festive wear buyers, Maharashtrian culture lovers"
                className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl p-2.5 text-xs text-slate-100 placeholder-slate-500 outline-none"
              />
            </div>
          </div>

          {/* Unique Hook / UVP */}
          <div>
            <label className="block text-xs font-semibold text-slate-200 mb-1 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Unique Hook / Value Proposition (What makes your business special?)</span>
            </label>
            <textarea
              rows={2}
              value={uniqueHook}
              onChange={(e) => setUniqueHook(e.target.value)}
              placeholder="e.g. Pure silk Paithanis direct from Yeola master weavers with 100% zari authenticity guarantee"
              className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl p-2.5 text-xs text-slate-100 placeholder-slate-500 outline-none resize-none"
            />
          </div>

          {/* Brand Voice & Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-1 flex items-center gap-1.5">
                <Megaphone className="w-3.5 h-3.5 text-blue-400" />
                <span>Brand Tone / Voice</span>
              </label>
              <input
                type="text"
                value={brandTone}
                onChange={(e) => setBrandTone(e.target.value)}
                placeholder="e.g. Royal, Cultural, Warm & Welcoming"
                className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl p-2.5 text-xs text-slate-100 placeholder-slate-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>Location / Contact details (Optional)</span>
              </label>
              <input
                type="text"
                value={contactOrLocation}
                onChange={(e) => setContactOrLocation(e.target.value)}
                placeholder="e.g. Pune & Mumbai | DM to Order Worldwide"
                className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl p-2.5 text-xs text-slate-100 placeholder-slate-500 outline-none"
              />
            </div>
          </div>

          {/* Preset Helper Shortcuts */}
          <div className="bg-slate-950/60 border border-slate-800 p-3 rounded-xl space-y-1.5">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1">
              <Award className="w-3 h-3 text-cyan-400" /> Quick Business Profile Presets:
            </span>
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => {
                  setBusinessName("Kalyani Paithani & Heritage Sarees");
                  setBusinessType("Traditional Handloom Ethnic Luxury Wear");
                  setUniqueHook("Authentic Yeola Paithani silk sarees direct from master weavers with gold zari border");
                  setTargetAudience("Brides, festive buyers, Maharashtrian cultural fashion lovers");
                  setBrandTone("Royal, Cultural & Welcoming");
                  setContactOrLocation("Pune | Ships Worldwide | WhatsApp: +91 9876543210");
                }}
                className="text-[10px] bg-slate-800 hover:bg-slate-700 text-cyan-300 px-2 py-1 rounded-lg border border-slate-700"
              >
                ✨ Ethnic Saree Boutique
              </button>
              <button
                type="button"
                onClick={() => {
                  setBusinessName("Aura Fitness & Wellness Studio");
                  setBusinessType("Personalized Fitness & High Performance Training");
                  setUniqueHook("Custom 1-on-1 fitness coaching that delivers guaranteed fat loss in 90 days without starving");
                  setTargetAudience("Busy working professionals and post-partum mothers");
                  setBrandTone("Inspiring, Energetic & High-Velocity");
                  setContactOrLocation("Online Coaching & Local Gym");
                }}
                className="text-[10px] bg-slate-800 hover:bg-slate-700 text-amber-300 px-2 py-1 rounded-lg border border-slate-700"
              >
                💪 Fitness & Wellness Coach
              </button>
              <button
                type="button"
                onClick={() => {
                  setBusinessName("Velox Software Solutions");
                  setBusinessType("B2B AI Automation & Cloud Engineering");
                  setUniqueHook("Automating customer support & operations to cut company costs by 40%");
                  setTargetAudience("Founders, CTOs, and Operations Managers");
                  setBrandTone("Authoritative, Technical & Professional");
                  setContactOrLocation("Remote Global Consultancy");
                }}
                className="text-[10px] bg-slate-800 hover:bg-slate-700 text-purple-300 px-2 py-1 rounded-lg border border-slate-700"
              >
                🚀 B2B Tech Agency
              </button>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 flex items-center gap-1.5 transition-colors shadow-lg shadow-cyan-500/20"
            >
              <Check className="w-4 h-4 stroke-[3]" />
              <span>Save Business Profile Memory</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
