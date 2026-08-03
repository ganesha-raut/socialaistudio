import React, { useState } from "react";
import {
  X,
  Clock,
  Sparkles,
  CheckCircle2,
  Calendar,
  Zap,
  Trash2,
  Send,
  Bot,
  UserCheck,
} from "lucide-react";
import { ScheduledPost, PlatformId } from "../types";

interface ScheduleDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  scheduledPosts: ScheduledPost[];
  onCancelSchedule: (id: string) => void;
  onPublishNow: (id: string) => void;
}

export const ScheduleDrawer: React.FC<ScheduleDrawerProps> = ({
  isOpen,
  onClose,
  scheduledPosts,
  onCancelSchedule,
  onPublishNow,
}) => {
  const [publishingId, setPublishingId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handlePublishClick = (id: string) => {
    setPublishingId(id);
    setTimeout(() => {
      onPublishNow(id);
      setPublishingId(null);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 animate-fadeIn">
      <div className="vivid-card rounded-3xl max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden shadow-2xl border border-cyan-500/40 relative">
        {/* Top Glow */}
        <div className="h-2 w-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600" />

        {/* Header */}
        <div className="p-5 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black text-white">Scheduled Campaign Queue</h2>
                <span className="px-2.5 py-0.5 text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 rounded-full">
                  {scheduledPosts.length} POSTS QUEUED
                </span>
              </div>
              <p className="text-xs text-slate-400 font-semibold">
                Dual Scheduling Mode: Manual Date Selection or AI Autonomous Peak Slot
              </p>
            </div>
          </div>

          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Posts List */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4">
          {scheduledPosts.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-slate-500">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-slate-300">No Scheduled Posts Yet</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Generate a post and select "Schedule Manually" or "AI Autonomous Schedule" to queue posts for publishing!
              </p>
            </div>
          ) : (
            scheduledPosts.map((post) => (
              <div key={post.id} className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/40 font-mono">
                      {post.platform}
                    </span>
                    {post.scheduleMode === "ai_autonomous" ? (
                      <span className="px-2 py-0.5 rounded-md text-[9px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 flex items-center gap-1">
                        <Bot className="w-3 h-3 text-cyan-400" /> AI Autonomous Mode
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-md text-[9px] font-bold bg-slate-800 text-slate-300 border border-slate-700 flex items-center gap-1">
                        <UserCheck className="w-3 h-3 text-slate-400" /> Manual Schedule
                      </span>
                    )}
                  </div>

                  <span className="text-[10px] font-bold text-emerald-400 font-mono">
                    Confidence: {post.aiGrowthConfidence}%
                  </span>
                </div>

                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-white truncate">{post.campaignTopic}</h4>
                  <p className="text-xs text-slate-300 line-clamp-2 bg-slate-950 p-2.5 rounded-xl border border-slate-800/80 font-sans">
                    {post.postContent}
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-800/80">
                  <span className="text-amber-300 font-bold text-[11px] flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>{post.scheduledTime}</span>
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onCancelSchedule(post.id)}
                      className="p-1.5 text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
                      title="Cancel Schedule"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handlePublishClick(post.id)}
                      disabled={publishingId === post.id}
                      className="px-3 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all shadow-md"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{publishingId === post.id ? "Publishing..." : "Publish Now"}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/90 flex items-center justify-between text-xs text-slate-400">
          <span className="font-semibold text-slate-300">Auto-dispatch enabled via OAuth APIs</span>
          <button onClick={onClose} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
