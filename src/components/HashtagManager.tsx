import React, { useState, useEffect } from "react";
import { Copy, Check, Hash, Plus, CheckCircle2 } from "lucide-react";
import { sanitizeHashtag, sanitizeHashtagList } from "../utils/hashtagUtils";

interface HashtagManagerProps {
  hashtags: string[];
  title?: string;
}

export const HashtagManager: React.FC<HashtagManagerProps> = ({
  hashtags,
  title = "Suggested Hashtags",
}) => {
  const [copied, setCopied] = useState(false);
  const [tagList, setTagList] = useState<string[]>(() => sanitizeHashtagList(hashtags));
  const [newTag, setNewTag] = useState("");

  useEffect(() => {
    setTagList(sanitizeHashtagList(hashtags));
  }, [hashtags]);

  const handleCopy = () => {
    const textToCopy = tagList.join(" ");
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAddTag = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTag.trim()) return;
    const formatted = sanitizeHashtag(newTag);
    if (formatted && !tagList.includes(formatted)) {
      setTagList([...tagList, formatted]);
    }
    setNewTag("");
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTagList(tagList.filter((t) => t !== tagToRemove));
  };

  return (
    <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3 sm:p-3.5 space-y-2.5">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
          <Hash className="w-3.5 h-3.5 text-cyan-400" />
          <span>{title}</span>
          <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-cyan-300 font-mono border border-slate-700">
            {tagList.length} Verified
          </span>
        </span>

        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1 text-[11px] font-medium text-cyan-400 hover:text-cyan-300 bg-cyan-500/10 hover:bg-cyan-500/20 px-2.5 py-1 rounded-lg border border-cyan-500/20 transition-all shrink-0"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-emerald-400" />
              <span className="text-emerald-400 font-bold">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              <span>Copy Verified Tags</span>
            </>
          )}
        </button>
      </div>

      <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto pr-1">
        {tagList.map((tag, idx) => (
          <span
            key={idx}
            className="inline-flex items-center gap-1 text-[11px] font-mono bg-slate-900 border border-slate-800 hover:border-cyan-500/50 text-cyan-300 px-2.5 py-1 rounded-lg transition-all group"
          >
            <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400/80" />
            <span>{tag}</span>
            <button
              type="button"
              onClick={() => handleRemoveTag(tag)}
              className="text-slate-500 hover:text-rose-400 opacity-60 group-hover:opacity-100 transition-opacity ml-1 text-xs font-bold"
              title="Remove hashtag"
            >
              ×
            </button>
          </span>
        ))}
      </div>

      <form onSubmit={handleAddTag} className="flex gap-1.5 pt-1">
        <input
          type="text"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          placeholder="Add hashtag (e.g. #PaithaniSilk)..."
          className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-slate-200 placeholder-slate-600 focus:border-cyan-500 outline-none"
        />
        <button
          type="submit"
          className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1 rounded-lg text-xs font-medium flex items-center gap-1 border border-slate-700 shrink-0"
        >
          <Plus className="w-3 h-3 text-cyan-400" />
          <span>Add</span>
        </button>
      </form>
    </div>
  );
};

