import React, { useState } from "react";
import { X, Calendar, Clock, Bot, UserCheck, Check, Sparkles } from "lucide-react";
import { PlatformId } from "../types";

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  platform: PlatformId;
  postContent: string;
  recommendedSlot?: string;
  onConfirmSchedule: (mode: "manual" | "ai_autonomous", scheduledTime: string) => void;
}

export const ScheduleModal: React.FC<ScheduleModalProps> = ({
  isOpen,
  onClose,
  platform,
  postContent,
  recommendedSlot = "Tonight, 8:45 PM EST",
  onConfirmSchedule,
}) => {
  const [mode, setMode] = useState<"manual" | "ai_autonomous">("ai_autonomous");
  const [customDate, setCustomDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  });
  const [customTime, setCustomTime] = useState("10:00");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const timeString =
      mode === "ai_autonomous"
        ? `${recommendedSlot} (AI Peak Growth Slot)`
        : `${customDate} at ${customTime} EST (Manual Schedule)`;

    setTimeout(() => {
      onConfirmSchedule(mode, timeString);
      setIsSubmitting(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div className="vivid-card rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-5 border border-purple-500/40 relative">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/40">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-black text-white">Schedule Post for {platform.toUpperCase()}</h3>
              <p className="text-[11px] text-slate-400 font-medium">Select your preferred dispatch mode</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-white rounded-lg">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Snippet */}
        <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 text-xs text-slate-300 line-clamp-3 font-sans">
          "{postContent}"
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Mode Selector */}
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setMode("ai_autonomous")}
              className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                mode === "ai_autonomous"
                  ? "bg-gradient-to-br from-purple-950 to-indigo-950 border-cyan-400 text-white shadow-lg shadow-purple-500/20"
                  : "bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <Bot className="w-4 h-4 text-cyan-400" />
                {mode === "ai_autonomous" && <Check className="w-3.5 h-3.5 text-cyan-400" />}
              </div>
              <div>
                <span className="text-xs font-black block text-cyan-300">Option 1: AI Auto</span>
                <span className="text-[9px] text-slate-300 block leading-tight mt-0.5">Auto-posts at peak active slot</span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setMode("manual")}
              className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                mode === "manual"
                  ? "bg-gradient-to-br from-slate-900 to-slate-800 border-purple-400 text-white shadow-lg"
                  : "bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <UserCheck className="w-4 h-4 text-purple-400" />
                {mode === "manual" && <Check className="w-3.5 h-3.5 text-purple-400" />}
              </div>
              <div>
                <span className="text-xs font-black block text-white">Option 2: Manual</span>
                <span className="text-[9px] text-slate-300 block leading-tight mt-0.5">Pick exact date & time</span>
              </div>
            </button>
          </div>

          {/* Mode Details */}
          {mode === "ai_autonomous" ? (
            <div className="bg-slate-950 p-3.5 rounded-2xl border border-cyan-500/30 space-y-1">
              <span className="text-[10px] text-slate-400 uppercase font-black tracking-wider block">Predicted Peak Growth Window:</span>
              <span className="text-xs font-black text-cyan-300 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-400" />
                {recommendedSlot}
              </span>
              <p className="text-[10px] text-slate-400 mt-1">
                Calculated from connected account follower activity for maximum reach & saves.
              </p>
            </div>
          ) : (
            <div className="bg-slate-950 p-3.5 rounded-2xl border border-purple-500/30 space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-bold text-slate-300 mb-1">Select Date</label>
                  <input
                    type="date"
                    value={customDate}
                    onChange={(e) => setCustomDate(e.target.value)}
                    className="w-full vivid-input rounded-xl p-2 text-xs text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-300 mb-1">Select Time</label>
                  <input
                    type="time"
                    value={customTime}
                    onChange={(e) => setCustomTime(e.target.value)}
                    className="w-full vivid-input rounded-xl p-2 text-xs text-white outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 text-xs font-black text-white btn-vivid-gradient rounded-xl shadow-lg flex items-center gap-1.5"
            >
              {isSubmitting ? (
                <span>Queuing...</span>
              ) : (
                <>
                  <Calendar className="w-4 h-4" />
                  <span>Confirm & Queue Post</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
