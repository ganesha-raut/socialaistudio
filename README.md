# 🚀 SocialAI Studio — Autonomous AI Social Content Engine

<div align="center">

![SocialAI Studio](https://socialaistudio.ganesharaut.in/socialaistudio.png)

**The #1 Autonomous Multimodal AI Content Engine for Creators, YouTubers & Brands**

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-socialaistudio.ganesharaut.in-6c63ff?style=for-the-badge)](https://socialaistudio.ganesharaut.in)
[![GitHub](https://img.shields.io/badge/GitHub-ganesha--raut%2Fsocialaistudio-181717?style=for-the-badge&logo=github)](https://github.com/ganesha-raut/socialaistudio)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel)](https://vercel.com)
[![PWA](https://img.shields.io/badge/PWA-Installable-5A0FC8?style=for-the-badge&logo=pwa)](https://socialaistudio.ganesharaut.in)

</div>

---

## ✨ Features & Capabilities

### 🤖 AI Content Generation
- **Multi-Platform Post Synthesis** — Generates platform-optimized posts for **LinkedIn, X (Twitter), Instagram, Facebook, YouTube Shorts, Threads & Pinterest** simultaneously
- **Gemini 2.5 Flash** powered content with 2026 social algorithm intelligence
- **A/B Hook Selector** — Interactive scroll-stopping headline switcher with 1-click swap

### 👁️ Multimodal Vision AI
- **Deep Gemini Vision Inspector** — RGB pixel-level analysis on uploaded product photos
- Extracts true colors, surface texture, material quality, patterns & cultural motifs
- Grounds all generated content in your actual product visuals

### 🎬 15-Second Reel Storyboard Generator
- Auto-generates 3-scene storyboards for **Instagram Reels, YouTube Shorts & TikTok**
- Each scene includes: camera angle, voiceover script, on-screen text & audio hook recommendation

### 🏢 Brand Intelligence & Profile Engine
- **Business Profile & Brand Hook Management** — Custom profile anchors every post to your unique brand tone & value proposition
- **In-Memory Vector DB** — Semantic matching of your brand context to generated content

### 📊 Virality & Quality Intelligence
- **Virality Index Score** — Algorithm-backed quality score for each generated post
- **Platform Algorithm Audit** — Best-time-to-post, engagement optimization & hashtag intelligence
- **Smart Tiered Hashtag Matrix** — High-volume, niche-targeted & community hashtags per platform

### 🎨 AI Visual Studio
- **Prompt-Matched Image Generation** — Platform-optimized images with custom aspect ratios
- Style presets: Photorealistic, Cinematic, Luxury, Minimalist, etc.

### 📥 Export & Sharing
- **1-Click Markdown Export** — Full campaign report as structured `.md` file
- **Batch Copy** — Copy all platform captions in one click
- **Platform-Specific Card Preview** — Visual post cards for each platform

### 📱 Progressive Web App (PWA)
- **Installable on Desktop & Mobile** — Works like a native app
- **Offline Support** — Service Worker caching for offline access
- **Web Push Notifications** — VAPID-based push notification support
- **Smart Install Prompt** — Browser-based install modal (not in-app)

---

## 🌐 Live Links

| Resource | URL |
|---|---|
| 🌍 Live App | https://socialaistudio.ganesharaut.in |
| 📦 GitHub Repo | https://github.com/ganesha-raut/socialaistudio |
| 👤 Developer | https://ganesharaut.in |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 19 + TypeScript + Vite 6 |
| **Styling** | Tailwind CSS v4 + Custom CSS Animations |
| **Backend** | Express.js (TypeScript) |
| **AI Engine** | Google Gemini 2.5 Flash / 3.6 Flash (`@google/genai`) |
| **Deployment** | Vercel (Serverless + Static) |
| **PWA** | Web App Manifest + Service Worker + VAPID Push |
| **Animations** | Motion (Framer Motion) |
| **Icons** | Lucide React |

---

## 🚀 Quick Start

### Prerequisites
- Node.js v18+
- Google Gemini API Key → [Get one here](https://aistudio.google.com/app/apikey)

### Installation & Local Run

```bash
# 1. Clone the repository
git clone https://github.com/ganesha-raut/socialaistudio.git
cd socialaistudio

# 2. Install dependencies
npm install

# 3. Configure Environment Variables
cp .env.example .env
# Edit .env and add your Gemini API key:
# GEMINI_API_KEY=your_gemini_api_key_here

# 4. Start Development Server (Express + Vite HMR)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Build & Production

```bash
# Typecheck & Lint
npm run lint

# Build Vite frontend + bundled Express server
npm run build

# Start Production Server
npm run start
```

---

## 🔑 Environment Variables

Create a `.env` file based on `.env.example`:

```env
# Required
GEMINI_API_KEY=your_gemini_api_key_here

# Optional (VAPID Push Notifications)
VAPID_PUBLIC_KEY=your_vapid_public_key
VAPID_PRIVATE_KEY=your_vapid_private_key
VAPID_SUBJECT=mailto:your@email.com
```

---

## 🌐 iframe Embedding

SocialAI Studio supports embedding on `ganesharaut.in` via iframe:

```html
<iframe
  src="https://socialaistudio.ganesharaut.in"
  width="100%"
  height="800px"
  frameborder="0"
  allow="camera; microphone; notifications"
  title="SocialAI Studio"
></iframe>
```

---

## 📂 Project Structure

```
socialaistudio/
├── api/
│   └── index.ts            # Vercel serverless entrypoint
├── public/
│   ├── manifest.json       # PWA manifest
│   ├── sw.js               # Service Worker
│   └── socialaistudio.png  # App logo
├── src/
│   ├── components/         # React UI components
│   │   ├── HomeDashboard.tsx
│   │   ├── InputSection.tsx
│   │   ├── Header.tsx
│   │   ├── MobileBottomNav.tsx
│   │   └── PwaInstallModal.tsx
│   ├── App.tsx             # Main app shell
│   └── main.tsx
├── server.ts               # Express API server (Gemini AI endpoints)
├── vercel.json             # Vercel deployment config
├── package.json
└── .env.example
```

---

## 📜 License

MIT License — Built with ❤️ by [Ganesha Raut](https://ganesharaut.in)
