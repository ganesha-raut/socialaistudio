import { ToneType, PlatformId } from "../types";

export interface ToneOption {
  id: ToneType;
  label: string;
  description: string;
  iconName: string;
  badgeBg: string;
}

export interface PlatformConfig {
  id: PlatformId;
  name: string;
  shortName: string;
  icon: string;
  color: string;
  bgColor: string;
  borderColor: string;
  algorithmTip: string;
  maxLength: number;
}

export const PLATFORM_CONFIGS: PlatformConfig[] = [
  {
    id: "linkedin",
    name: "LinkedIn",
    shortName: "LinkedIn",
    icon: "Linkedin",
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/30",
    algorithmTip: "2026 Algorithm: High Dwell-Time rewarded. First 3 lines drive 'See More' click rate. Keep external links out of main text.",
    maxLength: 3000
  },
  {
    id: "twitter",
    name: "X / Twitter",
    shortName: "X (Twitter)",
    icon: "Twitter",
    color: "text-sky-400",
    bgColor: "bg-sky-500/10",
    borderColor: "border-sky-500/30",
    algorithmTip: "2026 Algorithm: Reply-to-Impression ratio boosts reach 5x. Use strong initial hook in first 15 words.",
    maxLength: 280
  },
  {
    id: "instagram",
    name: "Instagram",
    shortName: "Instagram",
    icon: "Instagram",
    color: "text-pink-400",
    bgColor: "bg-pink-500/10",
    borderColor: "border-pink-500/30",
    algorithmTip: "2026 Algorithm: Send-to-DM (shares) is signal #1. Carousels with saveable nuggets get 3.2x explore feed placement.",
    maxLength: 2200
  },
  {
    id: "facebook",
    name: "Facebook",
    shortName: "Facebook",
    icon: "Facebook",
    color: "text-indigo-400",
    bgColor: "bg-indigo-500/10",
    borderColor: "border-indigo-500/30",
    algorithmTip: "2026 Algorithm: Meaningful social conversation & comments drive distribution. Include an open question at the end.",
    maxLength: 5000
  },
  {
    id: "youtube",
    name: "YT Shorts / Reels",
    shortName: "YT Shorts",
    icon: "Youtube",
    color: "text-red-400",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/30",
    algorithmTip: "2026 Algorithm: 100%+ Watch Time retention curve. Pattern interrupt at second 3 + punchy sound cue.",
    maxLength: 1000
  },
  {
    id: "threads",
    name: "Threads",
    shortName: "Threads",
    icon: "AtSign",
    color: "text-slate-200",
    bgColor: "bg-slate-500/10",
    borderColor: "border-slate-500/30",
    algorithmTip: "2026 Algorithm: Authentic conversational hot takes, clean line breaks, high reply engagement.",
    maxLength: 500
  },
  {
    id: "pinterest",
    name: "Pinterest",
    shortName: "Pinterest",
    icon: "Pin",
    color: "text-rose-400",
    bgColor: "bg-rose-500/10",
    borderColor: "border-rose-500/30",
    algorithmTip: "2026 Algorithm: High visual search intent. Rich keyword Pin titles + 2:3 vertical visuals get top search ranking.",
    maxLength: 500
  }
];

export const ALGORITHM_INTELLIGENCE_2026 = [
  {
    platform: "LinkedIn",
    keySignal: "Dwell Time & Conversation Depth",
    goldenRule: "Place external links in the comments or zero-click summary. Posts with >2 mins dwell time gain 4x network reach.",
    viralHookPattern: "State a counter-intuitive industry fact in sentence 1. Break into scannable 1-line takeaways.",
    bestPostingWindow: "Tue - Thu, 8:00 AM - 10:30 AM EST"
  },
  {
    platform: "X / Twitter",
    keySignal: "Replies & Thread Bookmarks",
    goldenRule: "1st tweet must be an irresistible hook. Use 2-3 hashtags max to prevent algorithmic penalty.",
    viralHookPattern: "Unpopular opinion: [X]. Here is why 90% of people get this wrong (Thread 👇):",
    bestPostingWindow: "Mon - Fri, 9:00 AM - 1:00 PM EST"
  },
  {
    platform: "Instagram",
    keySignal: "DMs (Shares) & Saves",
    goldenRule: "Design carousels with actionable checklists that users save or share in direct messages.",
    viralHookPattern: "Swipe to see the 5-step framework nobody is talking about ➡️",
    bestPostingWindow: "Wed - Fri, 11:00 AM - 2:00 PM EST & 7:00 PM EST"
  },
  {
    platform: "YouTube Shorts / Reels",
    keySignal: "3-Second Retention & Re-watch Rate",
    goldenRule: "Spoken verbal hook within 1.5s + bold text caption on-screen. High motion pattern interrupts every 3 seconds.",
    viralHookPattern: "Stop doing [X] if you want [Y] in 2026! Here is the secret...",
    bestPostingWindow: "Daily, 12:00 PM - 3:00 PM & 6:00 PM - 9:00 PM EST"
  },
  {
    platform: "Facebook",
    keySignal: "Community Comment Engagement",
    goldenRule: "Tell an emotional human story with a relatable obstacle and ask a direct opinion question.",
    viralHookPattern: "I almost gave up on this last year, but here's what changed everything...",
    bestPostingWindow: "Mon - Fri, 1:00 PM - 4:00 PM EST"
  },
  {
    platform: "Threads",
    keySignal: "Immediate Reply Volatility",
    goldenRule: "Keep text unpolished, casual, and opinionated. Prompt immediate user replies.",
    viralHookPattern: "Is it just me, or has [X] completely changed how we work?",
    bestPostingWindow: "Daily, 7:00 AM - 9:00 AM & 8:00 PM EST"
  },
  {
    platform: "Pinterest",
    keySignal: "Visual Search Indexing & Clickthrough",
    goldenRule: "Use 2:3 vertical visuals with bold text overlay and 3-5 high-intent search keywords.",
    viralHookPattern: "Ultimate Guide to [Topic]: Step-by-Step Blueprint",
    bestPostingWindow: "Sat - Sun, 8:00 PM - 11:00 PM EST"
  }
];

export const TONE_OPTIONS: ToneOption[] = [
  {
    id: "professional",
    label: "Professional",
    description: "Authoritative, polished & industry-leading",
    iconName: "Briefcase",
    badgeBg: "bg-blue-500/10 text-blue-400 border-blue-500/20"
  },
  {
    id: "witty",
    label: "Witty",
    description: "Clever, engaging with subtle humor & viral hook",
    iconName: "Sparkles",
    badgeBg: "bg-purple-500/10 text-purple-400 border-purple-500/20"
  },
  {
    id: "urgent",
    label: "Urgent",
    description: "High impact, direct value & strong call to action",
    iconName: "Zap",
    badgeBg: "bg-amber-500/10 text-amber-400 border-amber-500/20"
  },
  {
    id: "inspiring",
    label: "Inspiring",
    description: "Uplifting story, motivation & visionary outlook",
    iconName: "Flame",
    badgeBg: "bg-rose-500/10 text-rose-400 border-rose-500/20"
  },
  {
    id: "casual",
    label: "Casual",
    description: "Conversational, approachable & friendly everyday tone",
    iconName: "Smile",
    badgeBg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
  },
  {
    id: "educational",
    label: "Educational",
    description: "Step-by-step breakdown, key insights & takeaways",
    iconName: "BookOpen",
    badgeBg: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20"
  }
];

export const SAMPLE_IDEAS = [
  "Launching an AI-powered automated email assistant for remote workers",
  "5 proven productivity habits for software engineers working from home",
  "Announcing our $2M seed funding round and hiring for senior tech roles",
  "Why sustainable product packaging matters more than ever for DTC brands"
];
