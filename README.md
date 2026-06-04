# CalmBridge 🕊️

> **Multilingual AI-powered Psychological First Aid (PFA) chatbot**  
> *SoulCare Suite — Module 1*

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![DPGA Aligned](https://img.shields.io/badge/DPGA-Aligned-green)](https://digitalpublicgoods.net)
[![WHO PFA](https://img.shields.io/badge/WHO-PFA%20Aligned-lightblue)](https://www.who.int/publications/i/item/9789241548205)
[![Languages](https://img.shields.io/badge/Languages-EN%20%7C%20KO%20%7C%20FR%20%7C%20SW-orange)](src/i18n)
[![PWA](https://img.shields.io/badge/PWA-Ready-purple)](vite.config.ts)
[![Live](https://img.shields.io/badge/Live-calmbridge.pages.dev-brightgreen)](https://calmbridge.pages.dev)
[![Lighthouse](https://img.shields.io/badge/Lighthouse-97%2F95%2F100%2F100-green)](https://calmbridge.pages.dev)

---

## Overview

CalmBridge provides immediate, compassionate emotional support to people in distress — survivors of disasters, individuals in mental health crises, and anyone who needs a calm, non-judgmental presence. It is built on the **WHO Psychological First Aid (PFA)** framework: **Look → Listen → Link**.

Designed for **low-resource, multilingual contexts**, CalmBridge works as a Progressive Web App (PWA) — installable offline on mobile devices with limited internet access.

---

## 🌍 Why CalmBridge?

According to the WHO, **1 in 4 people** will experience a mental health condition at some point in their lives. In disaster-affected regions and low-income countries, access to professional mental health care is severely limited. CalmBridge bridges this gap by:

- Providing **immediate, accessible** first-line emotional support
- Operating in **English, Korean, French, and Swahili** — covering over 700 million speakers
- Functioning as a **PWA** on any device, including low-end smartphones
- Following evidence-based **WHO PFA principles** — not replacing professionals, but holding space until they are available

---

## ✨ Features

| Feature | Description |
|---|---|
| 🧠 **WHO PFA Chatbot** | AI responses structured around Look-Listen-Link framework |
| 🔒 **Safety Filter** | Separates mental health crisis vs. disaster keywords; triggers appropriate protocols |
| 🌐 **4 Languages** | English, Korean (한국어), French (Français), Swahili (Kiswahili) |
| 🕊️ **Spiritual Comfort** | Optional module with tradition-specific comforting texts (6 traditions) |
| 🎤 **Voice Input** | Web Speech API for hands-free input — critical for trauma survivors |
| 📴 **Offline Queue** | Messages saved to IndexedDB and auto-sent on reconnect |
| 🔔 **Offline Banner** | Real-time connectivity status with warm fallback messages |
| 📱 **PWA / Offline** | Installable, works with limited connectivity |
| ♿ **Accessible** | ARIA labels, keyboard navigation, screen reader support |

---

## 🏗️ Tech Stack

```
Frontend      React 19 + Vite + TypeScript + Tailwind CSS v4
Backend       Cloudflare Pages Functions (Edge, serverless)
AI            OpenAI GPT-4o-mini (WHO PFA system prompt)
i18n          i18next (EN / KO / FR / SW)
PWA           vite-plugin-pwa + Workbox (offline-first)
Offline       IndexedDB Background Sync (message queue)
```

---

## 📁 Project Structure

```
CalmBridge/
├── functions/
│   └── api/
│       └── chat.ts          # Cloudflare Pages Function (WHO PFA prompt + safety filter)
├── src/
│   ├── components/
│   │   ├── ChatPage.tsx      # Main chat interface (offline-aware)
│   ├── lib/
│   │   └── offlineQueue.ts  # IndexedDB Background Sync queue
│   │   ├── SpiritualComfort.tsx  # Spiritual comfort module
│   │   └── VoiceInput.tsx    # Web Speech API voice input
│   ├── i18n/
│   │   ├── en.json
│   │   ├── ko.json
│   │   ├── fr.json
│   │   └── sw.json
│   └── main.tsx
├── public/
│   └── manifest.webmanifest
└── vite.config.ts
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- A Cloudflare account (free tier sufficient)
- An OpenAI API key

### Installation

```bash
git clone https://github.com/whlee5503-dot/CalmBridge.git
cd CalmBridge
npm install
```

### Local Development

```bash
# Copy environment template
cp .env.example .env.local

# Add your OpenAI API key to .env.local:
# OPENAI_API_KEY=sk-...

npm run dev
```

### Deploy to Cloudflare Pages

```bash
npm run build

# Or connect your GitHub repo to Cloudflare Pages for CI/CD
# Build command:  npm run build
# Output dir:     dist
# Add secret:     OPENAI_API_KEY
```

---

## 🧠 WHO PFA Framework Implementation

CalmBridge implements the [WHO Psychological First Aid Field Guide (2011)](https://www.who.int/publications/i/item/9789241548205) through its AI system prompt:

### Look — Observe & Assess
The AI silently assesses emotional state, safety level, immediate needs, and existing coping strengths before responding. Tone adapts dynamically (acute crisis → grounding; grief → warmth; overwhelm → gentle structure).

### Listen — Active Compassionate Listening
- Acknowledges feelings before offering solutions
- Never pressures users to describe trauma details
- Validates reactions as normal responses to abnormal situations
- Avoids common harmful platitudes ("I know how you feel", "Stay strong")
- Offers grounding techniques for acute overwhelm

### Link — Connect to Support
- Gently introduces practical support based on need
- Provides crisis resources naturally (not as alarming interruptions)
- Encourages connection with trusted people
- Distinguishes mental health crisis from disaster response protocols

---

## 🔒 Safety Design

### Mental Health Crisis Detection
Detects suicidal ideation / self-harm language in all 4 languages. The AI:
1. Acknowledges pain directly and without judgment
2. Gently explores risk
3. Provides localized crisis resources (e.g., Korea: 1393, France: 3114)

### Disaster Response Detection
Detects disaster/refugee keywords. The AI shifts to practical grounding + resource linking.

**Crisis resources provided:**
- International: [IASP Crisis Centres](https://www.iasp.info/resources/Crisis_Centres/)
- Crisis Text Line (US/UK/IE/CA): Text HOME to 741741
- Korea: 자살예방상담전화 **1393**
- France: **3114** (Numéro National Prévention Suicide)

---

## 🕊️ Spiritual Comfort Module

Users may optionally select a spiritual or philosophical tradition to receive tradition-appropriate comforting texts. Available in all 4 languages:

| Tradition | Symbol |
|---|---|
| Christianity | ✝️ |
| Islam | ☪️ |
| Buddhism | ☸️ |
| Hinduism | 🕉️ |
| Judaism | ✡️ |
| Secular / Non-religious | 🌿 |

This feature is **entirely opt-in** and never assumed. Cultural sensitivity is a core principle.

---

## ♿ Accessibility

- WCAG 2.1 AA target
- Full keyboard navigation
- ARIA live regions for dynamic content (voice input interim text, AI responses)
- Screen reader compatible
- Sufficient color contrast in both light and dark modes
- No auto-playing audio

---

## 🌐 Internationalization

| Language | Code | Coverage |
|---|---|---|
| English | `en` | Full |
| Korean | `ko` | Full |
| French | `fr` | Full |
| Swahili | `sw` | Full |

Language detection is automatic based on browser locale, with a manual switcher in the chat UI.

---

## 📜 Digital Public Goods Alignment

CalmBridge is designed to meet [DPGA Standard](https://digitalpublicgoods.net/standard/) criteria:

| Criterion | Status |
|---|---|
| Open License (MIT) | ✅ |
| Clear Ownership | ✅ |
| Platform Independence | ✅ (Web / PWA) |
| Documentation | ✅ |
| Mechanism for Reporting | ✅ (GitHub Issues) |
| Data Privacy | ✅ (no PII stored; stateless API) |
| Adherence to Standards | ✅ (WHO PFA, WCAG 2.1, i18n) |
| No Harmful Tracking | ✅ |

---

## 📊 Lighthouse Scores

Measured on production ([calmbridge.pages.dev](https://calmbridge.pages.dev)):

| Page | Performance | Accessibility | Best Practices | SEO |
|---|---|---|---|---|
| Welcome (/) | 98 | 96 | 100 | 100 |
| Chat (/chat) | 97 | 95 | 100 | 100 |

---

## ⚠️ Important Disclaimer

CalmBridge is **not a substitute for professional mental health care**. It provides immediate emotional support while users seek appropriate professional help. In a life-threatening emergency, always contact local emergency services.

---

## 🤝 Contributing

Contributions are welcome, especially:
- Additional language translations
- Accessibility improvements
- New spiritual/cultural comfort texts (community-reviewed)
- Safety filter keyword expansion for regional languages

Please read [CONTRIBUTING.md](CONTRIBUTING.md) and follow trauma-informed, culturally sensitive guidelines.

---

## 📄 License

MIT License — see [LICENSE](LICENSE).

---

## 🙏 Acknowledgements

- [World Health Organization — Psychological First Aid Field Guide](https://www.who.int/publications/i/item/9789241548205)
- [International Association for Suicide Prevention](https://www.iasp.info)
- All crisis counselors and mental health workers whose work inspired this project

---

*CalmBridge — a calm presence when it matters most.*