# Contributing to CalmBridge 🕊️

Thank you for your interest in contributing to CalmBridge — a multilingual AI-powered Psychological First Aid (PFA) chatbot. CalmBridge is part of the **SoulCare Suite** and is designed as a **Digital Public Good**.

---

## 🌍 Who Can Contribute?

We welcome contributions from:
- Mental health professionals and researchers
- Public health practitioners (MPH, epidemiologists)
- Faith community leaders and chaplains
- Developers and UX designers
- Translators and localization experts
- Disaster relief and humanitarian workers

---

## 🤝 Ways to Contribute

### 1. Language Translations
CalmBridge currently supports English, Korean, French, and Swahili.
New languages are especially welcome for:
- Arabic, Spanish, Portuguese, Hindi, Hausa, Amharic

Add or update files in `src/i18n/locales/`.

### 2. Spiritual & Cultural Comfort Texts
We welcome community-reviewed additions to `src/components/SpiritualComfort.tsx`:
- New traditions or denominations
- Region-specific cultural comfort phrases
- Reviewed by community leaders before merging

### 3. Safety Filter Improvements
Help expand crisis keyword detection in `functions/api/chat.ts`:
- Regional language variants
- Culturally specific expressions of distress

### 4. Accessibility Improvements
- WCAG 2.1 AA compliance
- Screen reader compatibility
- Keyboard navigation enhancements

### 5. Bug Reports & Feature Requests
Use [GitHub Issues](https://github.com/whlee5503-dot/CalmBridge/issues):
- Bug report template
- Feature request template
- Please include steps to reproduce for bugs

---

## 🛡️ Trauma-Informed Contribution Guidelines

CalmBridge serves vulnerable populations. All contributions must follow these principles:

1. **Do No Harm** — Content must never shame, stigmatize, or endanger users
2. **Cultural Sensitivity** — Respect diverse cultural and religious backgrounds
3. **Privacy First** — Never include code that collects or stores PII
4. **Evidence-Based** — Mental health content must align with WHO PFA guidelines
5. **Inclusive Language** — Use person-first, non-stigmatizing language

---

## 🔧 Development Setup

```bash
git clone https://github.com/whlee5503-dot/CalmBridge.git
cd CalmBridge
npm install
cp .env.example .env.local
# Add your OPENAI_API_KEY to .env.local
npm run dev
```

### Running Tests
```bash
npm run test
```

---

## 📋 Pull Request Process

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Follow existing code style (TypeScript + Tailwind v4)
4. Test in all 4 languages if UI changes
5. Submit PR with clear description of changes
6. PRs involving mental health content require review by a mental health professional

---

## ⚠️ Safety & Ethics Policy

CalmBridge is **not a substitute for professional mental health care**.

If you discover a safety issue:
- **Critical safety bugs** (e.g., crisis detection failure): Email directly — do not post publicly
- **General bugs**: GitHub Issues

We are committed to responsible AI development aligned with:
- WHO Psychological First Aid Field Guide (2011)
- WCAG 2.1 Accessibility Standards
- DPGA Do No Harm principles
- UN SDG 3: Good Health and Well-being

---

## 📄 License

By contributing, you agree your contributions will be licensed under the [MIT License](LICENSE).

---

*CalmBridge — a calm presence when it matters most.* 🕊️
