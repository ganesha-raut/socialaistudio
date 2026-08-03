import React from "react";
import { X, Trash2, History, ArrowRight, Sparkles, Calendar } from "lucide-react";
import { GeneratedCampaign } from "../types";

interface HistoryDrawerProps {
  history: GeneratedCampaign[];
  onSelectCampaign: (campaign: GeneratedCampaign) => void;
  onDeleteCampaign: (id: string) => void;
  onClearAll: () => void;
  onClose: () => void;
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({
  history,
  onSelectCampaign,
  onDeleteCampaign,
  onClearAll,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex justify-end animate-fadeIn">
      <div className="bg-slate-900 border-l border-slate-800 w-full max-w-md h-full flex flex-col shadow-2xl">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-cyan-400" />
            <h2 className="text-sm font-bold text-slate-100">Saved Campaigns</h2>
            <span className="px-2 py-0.5 text-xs bg-slate-800 border border-slate-700 text-slate-300 rounded-full font-mono">
              {history.length}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* History List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {history.length === 0 ? (
            <div className="text-center py-12 text-slate-500 space-y-2">
              <Sparkles className="w-8 h-8 text-slate-700 mx-auto" />
              <p className="text-xs font-medium">No saved drafts yet.</p>
              <p className="text-[11px] text-slate-600">
                Generated campaigns are automatically saved locally.
              </p>
            </div>
          ) : (
            history.map((item) => (
              <div
                key={item.id}
                className="bg-slate-950/70 border border-slate-800/90 hover:border-cyan-500/50 rounded-xl p-3.5 space-y-2 transition-all group"
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-xs font-bold text-slate-200 line-clamp-2">
                    {item.topic}
                  </h3>
                  <button
                    onClick={() => onDeleteCampaign(item.id)}
                    className="text-slate-600 hover:text-rose-400 p-1 transition-colors"
                    title="Delete saved draft"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex items-center gap-2 text-[10px]">
                  <span className="px-2 py-0.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded capitalize">
                    {item.tone} Tone
                  </span>
                  <span className="text-slate-500 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <p className="text-[11px] text-slate-400 line-clamp-2 italic">
                  "{item.summary}"
                </p>

                <div className="pt-1 flex items-center justify-end">
                  <button
                    onClick={() => {
                      onSelectCampaign(item);
                      onClose();
                    }}
                    className="flex items-center gap-1 text-[11px] font-semibold text-cyan-400 hover:text-cyan-300 group-hover:underline"
                  >
                    <span>Load Campaign</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {history.length > 0 && (
          <div className="p-4 border-t border-slate-800 bg-slate-900 flex items-center justify-between">
            <button
              onClick={onClearAll}
              className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1.5 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear History</span>
            </button>
            <span className="text-[10px] text-slate-500">Stored locally in browser</span>
          </div>
        )}
      </div>
    </div>
  );
};
