// src/pages/StatePage.tsx
// 감정 상태 버튼 5개 선택 화면

import { useTranslation } from 'react-i18next'
import { useNavigate, useLocation } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Situation } from '../data/situations'

interface LocationState {
  situation: Situation
  religion: string
}

export default function StatePage() {
  const { i18n } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const { situation, religion } = (location.state as LocationState) ?? {}

  if (!situation) {
    navigate('/')
    return null
  }

  const lang = i18n.language?.slice(0, 2) || 'en'

  const prompt =
    lang === 'ko' ? '지금 어떤 감정인가요?' :
    lang === 'fr' ? 'Comment vous sentez-vous en ce moment?' :
    lang === 'sw' ? 'Unajisikiaje sasa hivi?' :
    'How are you feeling right now?'

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
        <div>
          <p style={{ color: 'white', fontWeight: 700, fontSize: '0.95rem', margin: 0 }}>{situation.label}</p>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.7rem', margin: 0 }}>{situation.sub}</p>
        </div>
      </div>

      {/* 감정 버튼들 */}
      <div style={{ flex: 1, padding: '1.25rem 1rem', maxWidth: '480px', margin: '0 auto', width: '100%' }}>
        <p style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: '1rem', textAlign: 'center' }}>
          {prompt}
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
          {situation.states.map((state) => (
            <button
              key={state.id}
              onClick={() => navigate('/response', { state: { situation, emotionId: state.id, emotionText: state.text, religion } })}
              style={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: '14px',
                padding: '1rem 1.25rem',
                cursor: 'pointer',
                textAlign: 'left',
                fontSize: '0.9rem',
                color: 'var(--color-text)',
                lineHeight: 1.5,
                transition: 'all 0.15s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = '#1a6b4a'
                e.currentTarget.style.backgroundColor = 'var(--color-primary-light)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--color-border)'
                e.currentTarget.style.backgroundColor = 'var(--color-surface)'
              }}
            >
              {state.text}
            </button>
          ))}
        </div>
      </div>

    </div>
  )
}
