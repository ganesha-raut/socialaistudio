import React, { useState, useEffect } from "react";
import { Download, Bell, X, ShieldCheck, Sparkles, Smartphone, CheckCircle2 } from "lucide-react";
import { requestNotificationPermission } from "../utils/permissions";

export const PwaInstallModal: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [notificationGranted, setNotificationGranted] = useState(false);

  useEffect(() => {
    // 1. Check if user is ALREADY in Standalone installed app mode
    const inStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (navigator as any).standalone === true;
    setIsStandalone(inStandalone);

    if (inStandalone) return; // Do not prompt if already installed

    // 2. Check if user previously dismissed modal
    const dismissed = localStorage.getItem("socialai_pwa_dismissed");
    
    // 3. Listen for PWA beforeinstallprompt
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      if (!dismissed) {
        setIsOpen(true);
      }
    };

    window.addEventListener("beforeinstallprompt", handler);

    // Check existing notification permission
    if ("Notification" in window && Notification.permission === "granted") {
      setNotificationGranted(true);
    }

    // Auto-prompt after 4 seconds on browser if not dismissed
    const timer = setTimeout(() => {
      if (!dismissed && !inStandalone) {
        setIsOpen(true);
      }
    }, 4000);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      clearTimeout(timer);
    };
  }, []);

  const handleInstallClick = async () => {
    // Request notification permission first
    await handleRequestPermissions();

    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setDeferredPrompt(null);
        setIsOpen(false);
      }
    } else {
      // Fallback instructions for Mobile Safari & Android Chrome
      alert(
        "📲 To install SocialAI Studio on your device:\n\n• On Chrome/Android: Tap 3 dots ⋮ -> 'Add to Home screen'\n• On iPhone/Safari: Tap Share ⎋ -> 'Add to Home Screen'"
      );
      setIsOpen(false);
    }
  };

  const handleRequestPermissions = async () => {
    const granted = await requestNotificationPermission();
    setNotificationGranted(granted);
    if (granted) {
      alert("✅ Notifications & Media permissions granted!");
    } else {
      alert("⚠️ Notification permission was blocked or dismissed. You can enable notifications anytime in browser site settings.");
    }
  };

  const handleDismiss = () => {
    localStorage.setItem("socialai_pwa_dismissed", "true");
    setIsOpen(false);
  };

  if (!isOpen || isStandalone) return null;

  return (
    <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 max-w-sm w-[calc(100%-2rem)] bg-[#0d0f1d]/95 backdrop-blur-2xl border border-purple-500/50 rounded-3xl p-5 shadow-[0_10px_40px_rgba(0,0,0,0.9)] space-y-4 animate-slideUp">
      {/* Top Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-600 p-0.5 shadow-lg shrink-0 overflow-hidden">
            <img src="/socialaistudio.png" alt="SocialAI Studio Logo" className="w-full h-full object-cover rounded-xl" />
          </div>
          <div>
            <h3 className="text-sm font-black text-white flex items-center gap-1.5">
              <span>Install SocialAI Studio</span>
              <span className="text-[9px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 px-1.5 py-0.2 rounded-full uppercase">App</span>
            </h3>
            <p className="text-[11px] text-slate-300">Fast 1-click home screen access & offline speed</p>
          </div>
        </div>
        <button onClick={handleDismiss} className="text-slate-400 hover:text-white p-1">
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Permissions & Features */}
      <div className="space-y-2 text-xs bg-slate-950/70 p-3 rounded-2xl border border-slate-800/80">
        <div className="flex items-center gap-2 text-emerald-400 font-medium">
          <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-400" />
          <span>Background AI post push alerts</span>
        </div>
        <div className="flex items-center gap-2 text-cyan-400 font-medium">
          <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-cyan-400" />
          <span>Full device camera & media gallery access</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2">
        <button
          onClick={handleInstallClick}
          className="flex-1 py-2.5 px-4 rounded-xl btn-vivid-gradient text-white font-black text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-purple-500/25"
        >
          <Download className="w-4 h-4 animate-bounce" />
          <span>Install App Now</span>
        </button>

        {!notificationGranted && (
          <button
            onClick={handleRequestPermissions}
            className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-purple-300 text-xs font-bold flex items-center gap-1"
            title="Enable Notifications & Media Permissions"
          >
            <Bell className="w-3.5 h-3.5 text-amber-400" />
            <span>Allow</span>
          </button>
        )}
      </div>
    </div>
  );
};
