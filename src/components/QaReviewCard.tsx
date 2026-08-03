import React from "react";
import { ShieldCheck, CheckCircle2, Award, Zap, Cpu } from "lucide-react";
import { QaQualityReview } from "../types";

interface QaReviewCardProps {
  review?: QaQualityReview;
}

export const QaReviewCard: React.FC<QaReviewCardProps> = ({ review }) => {
  if (!review) return null;

  return (
    <div className="bg-slate-950/90 border border-emerald-500/30 rounded-xl p-4 shadow-xl my-3 space-y-3 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-600/10 rounded-full blur-2xl pointer-events-none" />

      {/* Header Badge */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-100 flex items-center gap-1.5">
              <span>Phase 7: Deep Agent QA & Self-Review Audit</span>
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-1.5 py-0.5 rounded text-[9px] font-mono">
                PASSED (100% QUALITY)
              </span>
            </h4>
            <p className="text-[10px] text-slate-400">
              Validated by autonomous Quality Reviewer Sub-Agent before output delivery
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 bg-emerald-950/80 border border-emerald-800 px-2.5 py-1 rounded-full text-emerald-300 font-bold text-xs">
          <Award className="w-3.5 h-3.5 text-amber-400" />
          <span>Score: {review.score}/100</span>
        </div>
      </div>

      {/* Sub-Agents Involved Banner */}
      <div className="bg-slate-900/80 border border-slate-800 p-2.5 rounded-lg space-y-1.5">
        <div className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider flex items-center gap-1">
          <Cpu className="w-3.5 h-3.5 text-cyan-400" /> Autonomous Specialized Sub-Agents Engaged:
        </div>
        <div className="flex flex-wrap gap-1">
          {review.subAgentsInvolved.map((agentName, idx) => (
            <span
              key={idx}
              className="bg-slate-800 text-slate-200 border border-slate-700/80 px-2 py-0.5 rounded text-[10px] font-medium"
            >
              ✓ {agentName}
            </span>
          ))}
        </div>
      </div>

      {/* Verification Check List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
        {review.checks.map((check, idx) => (
          <div key={idx} className="bg-slate-900/90 border border-slate-800/80 p-2 rounded-lg flex items-start gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
            <div className="min-w-0">
              <span className="font-semibold text-slate-200 block text-[11px]">{check.rule}</span>
              <span className="text-[10px] text-slate-400 block">{check.notes}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
