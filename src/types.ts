export type ToneType = "professional" | "witty" | "urgent" | "inspiring" | "casual" | "bold" | "educational";

export type PlatformId = "linkedin" | "twitter" | "instagram" | "facebook" | "youtube" | "threads" | "pinterest";

export interface MiddlewareLogStep {
  step: number;
  title: string;
  detail: string;
  timestamp: string;
}

export interface QaCheckItem {
  rule: string;
  passed: boolean;
  notes: string;
}

export interface QaQualityReview {
  verifiedByQaAgent: boolean;
  score: number;
  checks: QaCheckItem[];
  subAgentsInvolved: string[];
}

export interface PostingSlot {
  recommendedDayTime: string;
  peakEngagementWindow: string;
}

export interface HashtagTiers {
  highVolume: string[];
  nicheTargeted: string[];
  community: string[];
}

export interface ViralStrategyInsight {
  bestPostingTimes: string;
  algorithmHack: string;
  viralKeywords: string[];
  hookStrengthScore: number;
  viralIndexScore: number;
}

export interface ConnectedAccount {
  id: string;
  platform: PlatformId;
  accountName: string;
  handle: string;
  avatarUrl: string;
  followersCount: string;
  postsCount: number;
  avgViews: string;
  growthRate: string;
  isConnected: boolean;
  connectedAt?: string;
  oauthStatus: "active" | "expired" | "simulated";
}

export interface ScheduledPost {
  id: string;
  campaignTopic: string;
  platform: PlatformId;
  postContent: string;
  scheduleMode: "manual" | "ai_autonomous";
  scheduledTime: string;
  status: "scheduled" | "published" | "failed";
  aiGrowthConfidence: number;
  createdAt: string;
}

export interface AiLearningLog {
  id: string;
  platform: PlatformId;
  insight: string;
  impact: string;
  learnedAt: string;
  confidenceScore: number;
}

export interface LinkedInPost {
  headline: string;
  content: string;
  suggestedHashtags: string[];
  readTimeMinutes?: number;
  estimatedEngagementScore?: number;
  abHookOptions?: string[];
  postingSlot?: PostingSlot;
  hashtagTiers?: HashtagTiers;
}

export interface TwitterPost {
  tweet: string;
  thread: string[];
  suggestedHashtags: string[];
  characterCount?: number;
  estimatedEngagementScore?: number;
  abHookOptions?: string[];
  postingSlot?: PostingSlot;
  hashtagTiers?: HashtagTiers;
}

export interface InstagramPost {
  caption: string;
  firstCommentHashtags: string[];
  visualHookIdea?: string;
  estimatedEngagementScore?: number;
  abHookOptions?: string[];
  postingSlot?: PostingSlot;
  hashtagTiers?: HashtagTiers;
}

export interface FacebookPost {
  headline: string;
  content: string;
  callToAction: string;
  suggestedHashtags: string[];
  estimatedEngagementScore?: number;
  abHookOptions?: string[];
  postingSlot?: PostingSlot;
  hashtagTiers?: HashtagTiers;
}

export interface YouTubeShortsPost {
  title: string;
  scriptHook: string;
  videoScript: string;
  soundEffectIdea: string;
  tags: string[];
  estimatedEngagementScore?: number;
  abHookOptions?: string[];
  postingSlot?: PostingSlot;
  hashtagTiers?: HashtagTiers;
}

export interface ThreadsPost {
  threadOpener: string;
  replyFollowUps: string[];
  estimatedEngagementScore?: number;
  abHookOptions?: string[];
  postingSlot?: PostingSlot;
  hashtagTiers?: HashtagTiers;
}

export interface PinterestPost {
  pinTitle: string;
  pinDescription: string;
  targetKeywords: string[];
  estimatedEngagementScore?: number;
  abHookOptions?: string[];
  postingSlot?: PostingSlot;
  hashtagTiers?: HashtagTiers;
}

export interface BusinessProfile {
  businessName: string;
  businessType: string;
  uniqueHook: string;
  targetAudience: string;
  brandTone: string;
  contactOrLocation?: string;
}

export interface GeneratedCampaign {
  id: string;
  topic: string;
  tone: ToneType;
  selectedPlatforms: PlatformId[];
  createdAt: string;
  summary: string;
  businessProfile?: BusinessProfile;
  viralStrategyInsight?: ViralStrategyInsight;
  qualityReview?: QaQualityReview;
  middlewareLogs?: MiddlewareLogStep[];
  linkedin?: LinkedInPost;
  twitter?: TwitterPost;
  instagram?: InstagramPost;
  facebook?: FacebookPost;
  youtube?: YouTubeShortsPost;
  threads?: ThreadsPost;
  pinterest?: PinterestPost;
}

export interface GenerationParams {
  topic: string;
  tone: ToneType;
  selectedPlatforms: PlatformId[];
  targetAudience?: string;
  customInstructions?: string;
  businessProfile?: BusinessProfile;
}
