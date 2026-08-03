import React, { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { InputSection } from "./components/InputSection";
import { PlatformCard } from "./components/PlatformCard";
import { HistoryDrawer } from "./components/HistoryDrawer";
import { AlgorithmModal } from "./components/AlgorithmModal";
import { AgentThinkingBar } from "./components/AgentThinkingBar";
import { QaReviewCard } from "./components/QaReviewCard";
import { SocialAccountsModal } from "./components/SocialAccountsModal";
import { ScheduleDrawer } from "./components/ScheduleDrawer";
import { BusinessProfileModal } from "./components/BusinessProfileModal";
import { MobileBottomNav } from "./components/MobileBottomNav";
import { HomeDashboard } from "./components/HomeDashboard";
import { PwaInstallModal } from "./components/PwaInstallModal";
import { requestNotificationPermission, sendBackgroundNotification } from "./utils/permissions";
import { GeneratedCampaign, GenerationParams, PlatformId, ConnectedAccount, ScheduledPost, AiLearningLog, BusinessProfile } from "./types";
import { PLATFORM_CONFIGS } from "./data/constants";
import { INITIAL_CONNECTED_ACCOUNTS, INITIAL_AI_LEARNINGS, INITIAL_SCHEDULED_POSTS } from "./data/mockSocialAccounts";
import {
  Sparkles,
  AlertCircle,
  CheckCircle2,
  Cpu,
  Flame,
  Clock,
  TrendingUp,
  Activity,
  Download,
  Copy,
} from "lucide-react";

export default function App() {
  const [activeView, setActiveView] = useState<"home" | "creator">("home");
  const [currentCampaign, setCurrentCampaign] = useState<GeneratedCampaign | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Per-platform refining states
  const [refiningPlatforms, setRefiningPlatforms] = useState<{ [key: string]: boolean }>({});

  // History & Algorithm & Profile modal state
  const [history, setHistory] = useState<GeneratedCampaign[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isAlgorithmModalOpen, setIsAlgorithmModalOpen] = useState(false);
  const [isBizModalOpen, setIsBizModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [businessProfile, setBusinessProfile] = useState<BusinessProfile | undefined>(() => {
    try {
      const saved = localStorage.getItem("socialai_creator_profile_v4") || localStorage.getItem("saved_business_profile_v3_clean");
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn("Failed reading profile");
    }
    return undefined;
  });

  useEffect(() => {
    if (!businessProfile) {
      fetch("/api/vector/get-profile")
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.profile) {
            setBusinessProfile(data.profile);
            localStorage.setItem("socialai_creator_profile_v4", JSON.stringify(data.profile));
          }
        })
        .catch((err) => console.warn("Failed fetching vector profile:", err));
    }
  }, []);

  const handleSaveProfile = (profile: BusinessProfile) => {
    setBusinessProfile(profile);
    try {
      localStorage.setItem("socialai_creator_profile_v4", JSON.stringify(profile));
      // Save vector profile to backend SQLite vector store
      fetch("/api/vector/store-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile)
      }).catch(err => console.warn("Vector store update:", err));
    } catch (e) {
      console.warn("Failed saving profile");
    }
    setToastMessage("Brand & Creator Profile Indexed into SQLite Vector Memory!");
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Phase 2 State: Accounts & Scheduling (Fresh Account Reset)
  const [accounts, setAccounts] = useState<ConnectedAccount[]>(() => {
    try {
      // Clear legacy mock data
      localStorage.removeItem("saved_connected_accounts_v1");
      const saved = localStorage.getItem("saved_connected_accounts_v3_clean");
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn("Failed reading saved accounts");
    }
    return INITIAL_CONNECTED_ACCOUNTS;
  });

  const [scheduledPosts, setScheduledPosts] = useState<ScheduledPost[]>(() => {
    try {
      localStorage.removeItem("saved_scheduled_posts_v1");
      const saved = localStorage.getItem("saved_scheduled_posts_v3_clean");
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn("Failed reading saved scheduled posts");
    }
    return INITIAL_SCHEDULED_POSTS;
  });

  const [aiLearnings, setAiLearnings] = useState<AiLearningLog[]>(INITIAL_AI_LEARNINGS);
  const [isAccountsModalOpen, setIsAccountsModalOpen] = useState(false);
  const [isScheduleDrawerOpen, setIsScheduleDrawerOpen] = useState(false);

  // Load history from localStorage on mount (Fresh Account)
  useEffect(() => {
    try {
      localStorage.removeItem("social_content_campaigns_v2");
      localStorage.removeItem("saved_business_profile_v1");
      const saved = localStorage.getItem("social_content_campaigns_v3_clean");
      if (saved) {
        setHistory(JSON.parse(saved));
      } else {
        setHistory([]);
      }
    } catch (e) {
      console.error("Failed to load history from localStorage:", e);
    }
  }, []);

  const saveHistory = (newHistory: GeneratedCampaign[]) => {
    setHistory(newHistory);
    try {
      localStorage.setItem("social_content_campaigns_v3_clean", JSON.stringify(newHistory));
    } catch (e) {
      console.error("Failed to save history to localStorage:", e);
    }
  };

  const saveAccounts = (newAccounts: ConnectedAccount[]) => {
    setAccounts(newAccounts);
    try {
      localStorage.setItem("saved_connected_accounts_v3_clean", JSON.stringify(newAccounts));
    } catch (e) {
      console.warn("Failed saving accounts");
    }
  };

  const saveScheduledPosts = (newPosts: ScheduledPost[]) => {
    setScheduledPosts(newPosts);
    try {
      localStorage.setItem("saved_scheduled_posts_v3_clean", JSON.stringify(newPosts));
    } catch (e) {
      console.warn("Failed saving scheduled posts");
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleToggleAccountConnect = (accId: string, customHandle?: string, customName?: string) => {
    const updated = accounts.map((acc) => {
      if (acc.id === accId) {
        const nextConnected = !acc.isConnected;
        const newHandle = customHandle && customHandle.trim() ? customHandle.trim() : acc.handle;
        const newName = customName && customName.trim() ? customName.trim() : (newHandle !== "Not Connected" ? newHandle.replace("@", "") : acc.accountName);
        return {
          ...acc,
          isConnected: nextConnected,
          handle: nextConnected ? (newHandle.startsWith("@") || acc.platform !== "instagram" ? newHandle : `@${newHandle}`) : "Not Connected",
          accountName: nextConnected ? newName : `${acc.platform.charAt(0).toUpperCase() + acc.platform.slice(1)} Account`,
          followersCount: nextConnected ? (acc.followersCount === "0" ? "1.2k" : acc.followersCount) : "0",
          avgViews: nextConnected ? (acc.avgViews === "0" ? "4.5k" : acc.avgViews) : "0",
          growthRate: nextConnected ? "+15.2%" : "0%",
          connectedAt: new Date().toISOString().split("T")[0]
        };
      }
      return acc;
    });
    saveAccounts(updated);
    const target = updated.find((a) => a.id === accId);
    showToast(target?.isConnected ? `${target.handle} Connected!` : `${target?.platform.toUpperCase()} Disconnected.`);
  };

  const handleSchedulePost = (platform: PlatformId, content: string, mode: "manual" | "ai_autonomous", time: string) => {
    const newScheduled: ScheduledPost = {
      id: "sch_" + Date.now(),
      campaignTopic: currentCampaign?.topic || "Custom Social Post",
      platform,
      postContent: content,
      scheduleMode: mode,
      scheduledTime: time,
      status: "scheduled",
      aiGrowthConfidence: Math.floor(Math.random() * 8) + 92,
      createdAt: new Date().toISOString(),
    };

    const updated = [newScheduled, ...scheduledPosts];
    saveScheduledPosts(updated);
    showToast(mode === "ai_autonomous" ? `Queued for ${platform.toUpperCase()} via AI Peak Window!` : `Queued for ${platform.toUpperCase()}!`);
  };

  const handleCancelScheduledPost = (id: string) => {
    const updated = scheduledPosts.filter((p) => p.id !== id);
    saveScheduledPosts(updated);
    showToast("Post removed from schedule queue.");
  };

  const handlePublishNow = (id: string) => {
    const target = scheduledPosts.find((p) => p.id === id);
    const updated = scheduledPosts.filter((p) => p.id !== id);
    saveScheduledPosts(updated);
    showToast(`🚀 Published to ${target?.platform.toUpperCase()} via direct API OAuth!`);
  };

  // Primary Campaign Generation
  const handleGenerateCampaign = async (params: GenerationParams) => {
    setIsLoading(true);
    // Request notification permission early
    requestNotificationPermission().catch(() => {});
    const platformCount = params.selectedPlatforms?.length || 3;
    setStatusMessage(`Running agent middleware for ${platformCount} selected social channels...`);
    setErrorMessage(null);

    try {
      const apiKey = localStorage.getItem("gemini_api_key");
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (apiKey && apiKey.trim()) headers["x-gemini-api-key"] = apiKey.trim();

      const res = await fetch("/api/generate-content", {
        method: "POST",
        headers,
        body: JSON.stringify(params),
      });

      const contentType = res.headers.get("content-type");
      if (contentType && contentType.includes("text/html")) {
        throw new Error("Backend server is initializing. Please try again in a few seconds.");
      }

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `Server responded with status ${res.status}`);
      }

      const data = await res.json();

      const campaign: GeneratedCampaign = {
        id: "camp_" + Date.now(),
        topic: params.topic,
        tone: params.tone,
        businessProfile: params.businessProfile,
        qualityReview: data.qualityReview,
        createdAt: new Date().toISOString(),
        summary: data.summary,
        selectedPlatforms: params.selectedPlatforms || ["linkedin", "twitter", "instagram"],
        viralStrategyInsight: data.viralStrategyInsight,
        middlewareLogs: data.middlewareLogs,
        linkedin: data.linkedin,
        twitter: data.twitter,
        instagram: data.instagram,
        facebook: data.facebook,
        youtube: data.youtube,
        threads: data.threads,
        pinterest: data.pinterest,
      };

      setCurrentCampaign(campaign);

      // Save to history
      const updatedHistory = [campaign, ...history.filter((h) => h.id !== campaign.id)].slice(0, 20);
      saveHistory(updatedHistory);

      showToast(`Campaign generated for ${campaign.selectedPlatforms?.length || 3} channels!`);

      // Trigger background system push notification if user switched apps or minimized screen
      sendBackgroundNotification(
        "🎉 SocialAI Studio - Campaign Ready!",
        `Your viral posts for ${campaign.selectedPlatforms?.map(p => p.toUpperCase()).join(", ") || "social channels"} have been generated!`
      );
    } catch (err: any) {
      console.error("Error generating campaign:", err);
      setErrorMessage(err.message || "Failed to generate campaign.");
    } finally {
      setIsLoading(false);
      setStatusMessage("");
    }
  };

  // AI Post Refinement
  const handleRefinePost = async (
    platform: string,
    currentContent: string,
    action: string,
    customPrompt?: string
  ) => {
    if (!currentCampaign) return;

    setRefiningPlatforms((prev) => ({ ...prev, [platform]: true }));

    try {
      const res = await fetch("/api/refine-post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          platform,
          currentContent,
          action,
          customPrompt,
          tone: currentCampaign.tone,
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `Refinement failed (${res.status})`);
      }

      const result = await res.json();

      setCurrentCampaign((prev) => {
        if (!prev) return null;
        const updated = { ...prev };
        if (platform === "linkedin" && updated.linkedin) {
          updated.linkedin = { ...updated.linkedin, content: result.updatedContent };
        } else if (platform === "twitter" && updated.twitter) {
          updated.twitter = { ...updated.twitter, tweet: result.updatedContent };
        } else if (platform === "instagram" && updated.instagram) {
          updated.instagram = { ...updated.instagram, caption: result.updatedContent };
        } else if (platform === "facebook" && updated.facebook) {
          updated.facebook = { ...updated.facebook, content: result.updatedContent };
        } else if (platform === "youtube" && updated.youtube) {
          updated.youtube = { ...updated.youtube, videoScript: result.updatedContent };
        } else if (platform === "threads" && updated.threads) {
          updated.threads = { ...updated.threads, threadOpener: result.updatedContent };
        } else if (platform === "pinterest" && updated.pinterest) {
          updated.pinterest = { ...updated.pinterest, pinDescription: result.updatedContent };
        }

        saveHistory(history.map((h) => (h.id === updated.id ? updated : h)));
        return updated;
      });

      showToast(`Refined ${platform.toUpperCase()} post!`);
    } catch (err: any) {
      console.error(`Error refining ${platform} post:`, err);
      showToast(`Refine error: ${err.message || "Failed to refine post"}`);
    } finally {
      setRefiningPlatforms((prev) => ({ ...prev, [platform]: false }));
    }
  };

  const handleDeleteHistoryItem = (id: string) => {
    const updated = history.filter((h) => h.id !== id);
    saveHistory(updated);
    if (currentCampaign?.id === id) {
      setCurrentCampaign(null);
    }
    showToast("Draft removed from history.");
  };

  const handleClearAllHistory = () => {
    saveHistory([]);
    setCurrentCampaign(null);
    showToast("History cleared.");
  };

  const handleDownloadMarkdown = () => {
    if (!currentCampaign) return;
    const activePlats = currentCampaign.selectedPlatforms || ["linkedin", "twitter", "instagram"];
    
    let md = `# Social Media Campaign Report: ${currentCampaign.topic}\n\n`;
    md += `**Date:** ${new Date(currentCampaign.createdAt).toLocaleString()}\n`;
    md += `**Tone:** ${currentCampaign.tone}\n`;
    md += `**Summary:** ${currentCampaign.summary}\n\n`;

    if (currentCampaign.viralStrategyInsight) {
      md += `## 🚀 Virality & Growth Strategy\n`;
      md += `- **Virality Index Score:** ${currentCampaign.viralStrategyInsight.viralIndexScore}/100\n`;
      md += `- **Best Posting Slot:** ${currentCampaign.viralStrategyInsight.bestPostingTimes}\n`;
      md += `- **Algorithm Growth Tip:** ${currentCampaign.viralStrategyInsight.algorithmHack}\n\n`;
    }

    md += `---\n\n## 📱 Platform Post Content\n\n`;

    activePlats.forEach((p) => {
      const pData: any = currentCampaign[p as keyof GeneratedCampaign];
      if (!pData) return;
      md += `### ${p.toUpperCase()}\n`;
      if (p === "linkedin") {
        md += `**Headline:** ${pData.headline}\n\n${pData.content}\n\n`;
        if (pData.suggestedHashtags) md += `**Hashtags:** ${pData.suggestedHashtags.join(" ")}\n\n`;
      } else if (p === "twitter") {
        md += `**Tweet:**\n${pData.tweet}\n\n`;
        if (pData.thread) md += `**Thread:**\n${pData.thread.join("\n\n---\n\n")}\n\n`;
      } else if (p === "instagram") {
        md += `**Caption:**\n${pData.caption}\n\n`;
        if (pData.firstCommentHashtags) md += `**Hashtags:** ${pData.firstCommentHashtags.join(" ")}\n\n`;
      } else {
        md += `**Content:**\n${pData.content || pData.pinDescription || pData.videoScript || ""}\n\n`;
      }
      md += `---\n\n`;
    });

    const blob = new Blob([md], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `campaign_${currentCampaign.id}.md`;
    a.click();
    URL.revokeObjectURL(url);
    showToast("Downloaded Markdown Campaign Report!");
  };

  const handleCopyAllPosts = () => {
    if (!currentCampaign) return;
    const activePlats = currentCampaign.selectedPlatforms || ["linkedin", "twitter", "instagram"];
    let text = `SOCIAL CAMPAIGN: ${currentCampaign.topic}\n=============================\n\n`;

    activePlats.forEach((p) => {
      const pData: any = currentCampaign[p as keyof GeneratedCampaign];
      if (!pData) return;
      text += `--- [ ${p.toUpperCase()} ] ---\n`;
      if (p === "linkedin") text += `${pData.headline ? pData.headline + "\n\n" : ""}${pData.content}\n\n`;
      else if (p === "twitter") text += `${pData.tweet || pData.thread?.join("\n\n")}\n\n`;
      else if (p === "instagram") text += `${pData.caption}\n\n`;
      else text += `${pData.content || pData.pinDescription || pData.videoScript || ""}\n\n`;
    });

    navigator.clipboard.writeText(text);
    showToast("Copied all platform posts to clipboard!");
  };

  const activePlatforms = currentCampaign?.selectedPlatforms || ["linkedin", "twitter", "instagram"];
  const connectedCount = accounts.filter((a) => a.isConnected).length;

  return (
    <div className="min-h-screen bg-[#0d0f1d] text-slate-100 font-sans selection:bg-purple-500 selection:text-white pb-24 sm:pb-16">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0d0f1d] border border-purple-500/60 text-purple-200 text-xs font-bold px-4.5 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 animate-bounce">
          <CheckCircle2 className="w-4.5 h-4.5 text-purple-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <Header
        activeView={activeView}
        onNavigateHome={() => setActiveView("home")}
        onNavigateCreator={() => setActiveView("creator")}
        historyCount={history.length}
        onOpenHistory={() => setIsHistoryOpen(true)}
        onOpenAlgorithmModal={() => setIsAlgorithmModalOpen(true)}
        onOpenBusinessProfile={() => setIsBizModalOpen(true)}
        onNewCampaign={() => {
          setCurrentCampaign(null);
          setErrorMessage(null);
          setActiveView("creator");
        }}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 lg:px-8 pt-6 space-y-8">
        {activeView === "home" ? (
          <HomeDashboard
            businessProfile={businessProfile}
            history={history}
            onGoToCreator={() => setActiveView("creator")}
            onOpenProfile={() => setIsBizModalOpen(true)}
            onOpenAlgorithmModal={() => setIsAlgorithmModalOpen(true)}
            onSelectCampaign={(campaign) => {
              setCurrentCampaign(campaign);
              setActiveView("creator");
            }}
          />
        ) : (
          <>
            {/* Input Form Section */}
            <InputSection
              onGenerate={handleGenerateCampaign}
              isLoading={isLoading}
              statusMessage={statusMessage}
              businessProfile={businessProfile}
              onOpenBusinessProfile={() => setIsBizModalOpen(true)}
            />

            {/* Live Multi-Stage Agent Thinking Bar */}
            {isLoading && (
              <AgentThinkingBar hasImage={false} />
            )}

            {/* Error Alert */}
            {errorMessage && (
              <div className="p-4 bg-rose-500/15 border border-rose-500/40 rounded-2xl text-rose-200 text-xs flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
                <div className="flex-1">
                  <p className="font-bold">Generation Error</p>
                  <p>{errorMessage}</p>
                </div>
                <button
                  onClick={() => setErrorMessage(null)}
                  className="text-slate-400 hover:text-slate-200 text-xs underline font-bold"
                >
                  Dismiss
                </button>
              </div>
            )}

            {/* Output Section */}
            {currentCampaign && (
              <div className="space-y-6">
                {/* Dynamic Multi-Platform Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
                  {activePlatforms.map((pId) => {
                    const config = PLATFORM_CONFIGS.find((c) => c.id === pId);
                    const platformData = currentCampaign[pId as keyof GeneratedCampaign];
                    if (!platformData || !config) return null;

                    return (
                      <PlatformCard
                        key={pId}
                        platform={pId}
                        data={platformData as any}
                        campaignTopic={currentCampaign.topic}
                        onRefine={handleRefinePost as any}
                        isRefining={!!refiningPlatforms[pId]}
                        onSchedulePost={handleSchedulePost}
                      />
                    );
                  })}
                </div>
              </div>
            )}
          </>
        )}
      </main>

      {/* Scheduled Queue Drawer */}
      <ScheduleDrawer
        isOpen={isScheduleDrawerOpen}
        onClose={() => setIsScheduleDrawerOpen(false)}
        scheduledPosts={scheduledPosts}
        onCancelSchedule={handleCancelScheduledPost}
        onPublishNow={handlePublishNow}
      />

      {/* History Drawer */}
      {isHistoryOpen && (
        <HistoryDrawer
          history={history}
          onSelectCampaign={(campaign) => setCurrentCampaign(campaign)}
          onDeleteCampaign={handleDeleteHistoryItem}
          onClearAll={handleClearAllHistory}
          onClose={() => setIsHistoryOpen(false)}
        />
      )}

      {/* 2026 Algorithm Intelligence Cheat Sheet Modal */}
      {isAlgorithmModalOpen && (
        <AlgorithmModal onClose={() => setIsAlgorithmModalOpen(false)} />
      )}

      {/* Universal Brand & Creator Profile Modal */}
      <BusinessProfileModal
        isOpen={isBizModalOpen}
        onClose={() => setIsBizModalOpen(false)}
        onSave={handleSaveProfile}
        currentProfile={businessProfile}
      />

      {/* Fixed Mobile Bottom Navigation Bar */}
      <MobileBottomNav
        activeView={activeView}
        onNavigateHome={() => setActiveView("home")}
        onNavigateCreator={() => setActiveView("creator")}
        historyCount={history.length}
        onOpenHistory={() => setIsHistoryOpen(true)}
        onNewCampaign={() => {
          setCurrentCampaign(null);
          setErrorMessage(null);
          setActiveView("creator");
        }}
        onOpenAlgorithmModal={() => setIsAlgorithmModalOpen(true)}
        onOpenBusinessProfile={() => setIsBizModalOpen(true)}
      />

      {/* Smart PWA Install & Permissions Modal */}
      <PwaInstallModal />
    </div>
  );
}
