// src/pages/SituationPage.tsx
// 7개 상황 선택 화면

import { useTranslation } from 'react-i18next'
import { useNavigate, useLocation } from 'react-router-dom'
import { SITUATIONS } from '../data/situations'

export default function SituationPage() {
  const { i18n } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const religion = (location.state as { religion?: string })?.religion ?? 'none'
  const lang = (i18n.language?.slice(0, 2) as string) || 'en'
  const validLang = ['en', 'ko', 'fr', 'sw'].includes(lang) ? lang : 'en'
  const situations = SITUATIONS[validLang] || SITUATIONS['en']

  return (
    <div style={{ minHeight: '100dvh', backgroundColor: 'var(--color-bg)', display: 'flex', flexDirection: 'column' }}>

      {/* 헤더 */}
      <div style={{ backgroundColor: '#1a6b4a', padding: '1rem', textAlign: 'center' }}>
        <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>🕊</div>
        <h1 style={{ color: 'white', fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>CalmBridge</h1>
        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.75rem', margin: '0.25rem 0 0' }}>
          {validLang === 'ko' ? '지금 어떤 상황인가요?' :
           validLang === 'fr' ? 'Que traversez-vous en ce moment?' :
           validLang === 'sw' ? 'Unakabiliwa na nini sasa hivi?' :
           'What are you facing right now?'}
        </p>
      </div>

      {/* 상황 카드 그리드 */}
      <div style={{ flex: 1, padding: '1rem', maxWidth: '480px', margin: '0 auto', width: '100%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
          {situations.map((situation) => (
            <button
              key={situation.id}
              onClick={() => navigate('/state', { state: { situation, religion } })}
              style={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: '16px',
                padding: '1.25rem 0.75rem',
                cursor: 'pointer',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.15s',
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = '#1a6b4a')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--color-border)')}
            >
              <span style={{ fontSize: '2rem' }}>{situation.icon}</span>
              <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--color-text)', lineHeight: 1.3 }}>
                {situation.label}
              </span>
              <span style={{ fontSize: '0.68rem', color: 'var(--color-text-muted)', lineHeight: 1.4 }}>
                {situation.sub}
              </span>
            </button>
          ))}
        </div>
      </div>

    </div>
  )
}
