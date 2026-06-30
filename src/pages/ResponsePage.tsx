// src/pages/ResponsePage.tsx
// 정적 위로 화면 — WHO PFA 기반, 오프라인 작동

import { useTranslation } from 'react-i18next'
import { useNavigate, useLocation } from 'react-router-dom'
import { ArrowLeft, MessageCircle, RotateCcw } from 'lucide-react'
import { RESPONSES } from '../data/responses'
import type { Situation } from '../data/situations'
import SpiritualComfort from '../components/SpiritualComfort'

interface LocationState {
  situation: Situation
  emotionId: string
  emotionText: string
  religion: string
}

export default function ResponsePage() {
  const { i18n } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const { situation, emotionId, emotionText, religion } = (location.state as LocationState) ?? {}

  if (!situation || !emotionId) {
    navigate('/')
    return null
  }

  const lang = (i18n.language?.slice(0, 2) as string) || 'en'
  const validLang = ['en', 'ko', 'fr', 'sw'].includes(lang) ? lang : 'en'

  const response = RESPONSES[validLang]?.[situation.id]?.[emotionId]
    ?? RESPONSES['en']?.[situation.id]?.[emotionId]

  const talkLabel =
    lang === 'ko' ? '더 이야기하기' :
    lang === 'fr' ? 'Continuer à parler' :
    lang === 'sw' ? 'Endelea kuzungumza' :
    'Talk more'

  const restartLabel =
    lang === 'ko' ? '처음으로' :
    lang === 'fr' ? 'Recommencer' :
    lang === 'sw' ? 'Anza upya' :
    'Start over'

  const groundingLabel =
    lang === 'ko' ? '🌿 그라운딩 기법' :
    lang === 'fr' ? '🌿 Technique d\'ancrage' :
    lang === 'sw' ? '🌿 Mbinu ya utulivu' :
    '🌿 Grounding technique'

  return (
    <div style={{ minHeight: '100dvh', backgroundColor: 'var(--color-bg)', display: 'flex', flexDirection: 'column' }}>

      {/* 헤더 */}
      <div style={{ backgroundColor: '#1a6b4a', padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <button
          onClick={() => navigate(-1)}
          style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', padding: '4px', display: 'flex' }}
          aria-label="Back"
        >
          <ArrowLeft size={20} />
        </button>
        <span style={{ fontSize: '1.2rem' }}>{situation.icon}</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ color: 'white', fontWeight: 700, fontSize: '0.9rem', margin: 0 }}>{situation.label}</p>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.68rem', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            "{emotionText}"
          </p>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem 1rem', maxWidth: '480px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', gap: '1rem' }}>

        {response ? (
          <>
            {/* 핵심 위로 한 줄 */}
            <div style={{
              background: 'linear-gradient(135deg, #1a6b4a 0%, #2d8a6a 100%)',
              borderRadius: '16px', padding: '1.25rem',
              textAlign: 'center',
            }}>
              <p style={{ color: 'white', fontSize: '1.05rem', fontWeight: 700, margin: 0, lineHeight: 1.5 }}>
                {response.comfort}
              </p>
            </div>

            {/* WHO PFA 메시지 */}
            <div style={{
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: '16px', padding: '1.25rem',
            }}>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text)', lineHeight: 1.8, margin: 0 }}>
                {response.message}
              </p>
            </div>

            {/* 그라운딩 기법 (있을 때만) */}
            {response.grounding && (
              <div style={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid #1a6b4a',
                borderRadius: '16px', padding: '1rem 1.25rem',
              }}>
                <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#1a6b4a', margin: '0 0 0.5rem' }}>
                  {groundingLabel}
                </p>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text)', lineHeight: 1.7, margin: 0 }}>
                  {response.grounding}
                </p>
              </div>
            )}

            {/* 실용 정보 (있을 때만) */}
            {response.action && (
              <div style={{
                backgroundColor: 'var(--color-surface-2)',
                borderRadius: '12px', padding: '0.875rem 1rem',
                border: '1px solid var(--color-border)',
              }}>
                <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', lineHeight: 1.7, margin: 0 }}>
                  ℹ️ {response.action}
                </p>
              </div>
            )}

            {/* 영적 위로 — 온보딩에서 선택한 전통이 있을 때만 표시 */}
            <SpiritualComfort initialTradition={religion} />
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--color-text-muted)' }}>
            <p>응답을 찾을 수 없습니다.</p>
          </div>
        )}

        {/* WHO PFA 출처 표시 */}
        <p style={{ textAlign: 'center', fontSize: '0.65rem', color: 'var(--color-border)' }}>
          WHO Psychological First Aid · Look-Listen-Link
        </p>

      </div>

      {/* 하단 버튼 */}
      <div style={{
        padding: '0.75rem 1rem',
        borderTop: '1px solid var(--color-border)',
        backgroundColor: 'var(--color-surface)',
        display: 'flex', gap: '0.625rem',
      }}>
        <button
          onClick={() => navigate('/')}
          style={{
            flex: 1, padding: '0.75rem',
            backgroundColor: 'transparent',
            border: '1px solid var(--color-border)',
            borderRadius: '12px', cursor: 'pointer',
            fontSize: '0.875rem', color: 'var(--color-text-muted)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.375rem',
          }}
        >
          <RotateCcw size={15} />
          {restartLabel}
        </button>
        <button
          onClick={() => navigate('/chat', { state: { situation: situation.id, religion, fromResponse: true } })}
          style={{
            flex: 2, padding: '0.75rem',
            backgroundColor: '#1a6b4a',
            border: 'none',
            borderRadius: '12px', cursor: 'pointer',
            fontSize: '0.875rem', color: 'white', fontWeight: 600,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.375rem',
          }}
        >
          <MessageCircle size={15} />
          {talkLabel}
        </button>
      </div>

    </div>
  )
}
