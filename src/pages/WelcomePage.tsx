import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import LanguageSelector from '../components/LanguageSelector'

type Situation = 'disaster' | 'conflict' | 'loss' | 'isolation' | 'other'
type Religion = 'christianity' | 'islam' | 'buddhism' | 'hinduism' | 'judaism' | 'secular' | 'none'

const SITUATIONS: { id: Situation; emoji: string }[] = [
  { id: 'disaster',   emoji: '🌊' },
  { id: 'conflict',   emoji: '🕊️' },
  { id: 'loss',       emoji: '💔' },
  { id: 'isolation',  emoji: '🌑' },
  { id: 'other',      emoji: '💬' },
]

const RELIGIONS: { id: Religion; emoji: string; key: string }[] = [
  { id: 'christianity', emoji: '✝️',  key: 'spiritual.christianity' },
  { id: 'islam',        emoji: '☪️',  key: 'spiritual.islam' },
  { id: 'buddhism',     emoji: '☸️',  key: 'spiritual.buddhism' },
  { id: 'hinduism',     emoji: '🕉️',  key: 'spiritual.hinduism' },
  { id: 'judaism',      emoji: '✡️',  key: 'spiritual.judaism' },
  { id: 'secular',      emoji: '🌿',  key: 'spiritual.secular' },
]

const G = '#1a6b4a'

export default function WelcomePage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [situation, setSituation] = useState<Situation | null>(null)
  const [religion, setReligion] = useState<Religion>('none')

  function goToChat() {
    navigate('/chat', { state: { situation, religion } })
  }

  return (
    <div style={{
      minHeight: '100dvh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '2rem 1.5rem',
      background: 'linear-gradient(160deg, #e8f5f0 0%, #f0f9f5 50%, #f9fafb 100%)',
    }}>

      {/* Logo */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <div style={{
          width: '72px', height: '72px', borderRadius: '50%',
          backgroundColor: G, display: 'flex', alignItems: 'center',
          justifyContent: 'center', margin: '0 auto 1rem',
          boxShadow: '0 4px 24px rgba(26,107,74,0.18)',
        }}>
          <span style={{ fontSize: '1.8rem' }}>🕊️</span>
        </div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 600, color: G, marginBottom: '0.25rem' }}>
          CalmBridge
        </h1>
        <p style={{ color: '#6b7280', fontSize: '0.95rem' }}>{t('tagline')}</p>
      </div>

      {/* Step indicator */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
        {[1, 2, 3].map(s => (
          <div key={s} style={{
            width: s === step ? '24px' : '8px', height: '8px',
            borderRadius: '4px', transition: 'width 0.3s',
            backgroundColor: s === step ? G : '#d1fae5',
          }} />
        ))}
      </div>

      {/* Card */}
      <main style={{
        minHeight: '100dvh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '2rem 1.5rem',
        background: 'linear-gradient(160deg, #e8f5f0 0%, #f0f9f5 50%, #f9fafb 100%)',
      }}>

        {/* Step 1: Language */}
        {step === 1 && (
          <>
            <p style={{ fontSize: '0.75rem', fontWeight: 500, color: '#6b7280',
              textTransform: 'uppercase', letterSpacing: '0.08em',
              marginBottom: '1rem', textAlign: 'center' }}>
              {t('onboarding.step_language')}
            </p>
            <LanguageSelector />
            <button onClick={() => setStep(2)} style={{
              width: '100%', marginTop: '1.25rem', padding: '0.875rem',
              borderRadius: '12px', backgroundColor: G, color: 'white',
              fontSize: '1rem', fontWeight: 600, border: 'none', cursor: 'pointer',
            }}>
              {t('onboarding.next')} →
            </button>
          </>
        )}

        {/* Step 2: Situation — 2열 그리드 */}
        {step === 2 && (
          <>
            <p style={{ fontSize: '0.75rem', fontWeight: 500, color: '#9ca3af',
              textTransform: 'uppercase', letterSpacing: '0.08em',
              marginBottom: '1rem', textAlign: 'center' }}>
              {t('onboarding.step_situation')}
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '0.5rem',
            }}>
              {SITUATIONS.map(s => (
                <button key={s.id} onClick={() => setSituation(s.id)} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  gap: '0.4rem',
                  padding: '0.75rem 0.5rem', borderRadius: '12px', cursor: 'pointer',
                  border: situation === s.id ? `2px solid ${G}` : '2px solid #e5e7eb',
                  backgroundColor: situation === s.id ? '#e8f5f0' : 'white',
                  fontSize: '0.85rem', fontWeight: 500,
                  color: situation === s.id ? G : '#374151',
                  transition: 'all 0.15s', textAlign: 'center',
                  // 마지막 항목(other)이 홀수면 2열 전체 차지
                  gridColumn: s.id === 'other' ? 'span 2' : 'span 1',
                }}>
                  <span style={{ fontSize: '1.1rem' }}>{s.emoji}</span>
                  <span>{t(`onboarding.situation_${s.id}`)}</span>
                </button>
              ))}
            </div>
            <button
              onClick={() => setStep(3)}
              disabled={!situation}
              style={{
                width: '100%', marginTop: '1.25rem', padding: '0.875rem',
                borderRadius: '12px', border: 'none',
                cursor: situation ? 'pointer' : 'not-allowed',
                backgroundColor: situation ? G : '#e5e7eb',
                color: situation ? 'white' : '#9ca3af',
                fontSize: '1rem', fontWeight: 600, transition: 'all 0.15s',
              }}>
              {t('onboarding.next')} →
            </button>
          </>
        )}

        {/* Step 3: Religion */}
        {step === 3 && (
          <>
            <p style={{ fontSize: '0.75rem', fontWeight: 500, color: '#6b7280',
              textTransform: 'uppercase', letterSpacing: '0.08em',
              marginBottom: '0.5rem', textAlign: 'center' }}>
              {t('onboarding.step_religion')}
            </p>
            <p style={{ fontSize: '0.78rem', color: '#6b7280', textAlign: 'center', marginBottom: '1rem' }}>
              {t('onboarding.religion_prompt')}
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '0.5rem',
            }}>
              {RELIGIONS.map(r => (
                <button key={r.id} onClick={() => setReligion(r.id)} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  gap: '0.4rem',
                  padding: '0.625rem 0.5rem', borderRadius: '10px', cursor: 'pointer',
                  border: religion === r.id ? `2px solid ${G}` : '2px solid #e5e7eb',
                  backgroundColor: religion === r.id ? G : 'white',
                  color: religion === r.id ? 'white' : '#374151',
                  fontSize: '0.82rem', fontWeight: 500, transition: 'all 0.15s',
                }}>
                  <span>{r.emoji}</span>
                  <span>{t(r.key)}</span>
                </button>
              ))}
            </div>
            <button onClick={goToChat} style={{
              width: '100%', marginTop: '1.25rem', padding: '0.875rem',
              borderRadius: '12px', backgroundColor: G, color: 'white',
              fontSize: '1rem', fontWeight: 600, border: 'none', cursor: 'pointer',
            }}>
              {t('start')} →
            </button>
            <button onClick={goToChat} style={{
              width: '100%', marginTop: '0.5rem', padding: '0.625rem',
              borderRadius: '12px', backgroundColor: 'transparent', color: '#9ca3af',
              fontSize: '0.85rem', border: 'none', cursor: 'pointer',
            }}>
              {t('onboarding.skip')}
            </button>
          </>
        )}
      </div>

      {/* Emergency button */}
      <div style={{ width: '100%', maxWidth: '360px' }}>
        <button onClick={() => alert(t('emergency_msg'))} style={{
          width: '100%', padding: '0.875rem', borderRadius: '14px',
          backgroundColor: 'white', color: '#dc2626',
          fontSize: '0.95rem', fontWeight: 500,
          border: '1.5px solid #fca5a5', cursor: 'pointer',
        }}>
          🆘 {t('emergency')}
        </button>
      </div>

      <p style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.72rem',
        color: '#6b7280', maxWidth: '300px', lineHeight: 1.6 }}>
        {t('disclaimer')}
      </p>
      <p style={{ marginTop: '0.75rem', fontSize: '0.68rem', color: '#d1d5db' }}>
        SoulCare Suite · Module 1
      </p>
      </main>
  )
}
