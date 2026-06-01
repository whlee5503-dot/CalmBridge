# CalmBridge — Project Context

## 프로젝트 개요
재난·고립 지역 주민을 위한 다국어 심리-영적 응급처치(PFA) AI 챗봇 PWA.
SoulCare Suite의 첫 번째 모듈 (Module 1).

- EpiCalc   (Module 1): https://epi.chem-health-calc.com
- EpiLog    (Module 2): https://epilog-d72.pages.dev
- EpiAid    (Module 3): https://epiaid.pages.dev
- CalmBridge (Module 4): https://calmbridge.pages.dev 🔨 개발 중

## 기술 스택
- React + Vite + TypeScript
- Tailwind CSS v4
- PWA (Vite PWA Plugin + Workbox) — 2G/3G 최적화
- i18next (EN/KR/FR/SW 4개 언어)
- Cloudflare Pages Functions (OpenAI API 연동)
- Firebase (익명 인증 + 익명화 로그)
- OpenAI API gpt-4o-mini (PFA 챗봇)

## 디자인 원칙
- EpiCalc Suite 브랜딩 통일 (forest green #1a6b4a, DM Sans)
- 재난 현장에서도 즉시 사용 가능한 단순 UI
- 2G/3G 환경 최적화
- EN/KR/FR/SW 4개 언어 지원

## 핵심 원칙 (Do No Harm)
- 고위험 키워드 감지 시 즉시 Referral Flow 진입 (절대 우선)
- AI는 전문가를 대체하지 않음 — 모든 응답에 면책 고지 필수
- WHO PFA Look-Listen-Link 원칙 준수
- 대화 데이터 익명화 필수 (PII 저장 금지)

## 개발자
Won Ho Lee, Ph.D., MPH, MDiv
(MD 아님 — 모든 문서에서 MD 표기 금지)

## 현재 개발 단계
v0.1 — 기본 PFA 챗봇 (EN/KR/FR/SW, Cloudflare 배포)

## EpiCalc Suite DOI
- EpiCalc    (Module 1): 10.5281/zenodo.20181520
- EpiLog     (Module 2): 10.5281/zenodo.20349994
- EpiAid     (Module 3): 10.5281/zenodo.20436469
- CalmBridge (Module 1): 등록 예정
