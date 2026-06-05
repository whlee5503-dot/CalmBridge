import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useLocation } from 'react-router-dom'
import LanguageSelector from '../components/LanguageSelector'

type Situation = 'disaster' | 'conflict' | 'loss' | 'isolation' | 'other'
type Religion = 'christianity' | 'islam' | 'buddhism' | 'hinduism' | 'judaism' | 'secular' | 'none'

const SITUATIONS: { id: Situation; emoji: string }[] = [
  { id: 'disaster',  emoji: '🌊' },
  { id: 'conflict',  emoji: '🕊️' },
  { id: 'loss',      emoji: '💔' },
  { id: 'isolation', emoji: '🌑' },
  { id: 'other',     emoji: '💬' },
]

const RELIGIONS: { id: Religion; emoji: string; key: string }[] = [
  { id: 'christianity', emoji: '✝️', key: 'spiritual.christianity' },
  { id: 'islam',        emoji: '☪️', key: 'spiritual.islam' },
  { id: 'buddhism',     emoji: '☸️', key: 'spiritual.buddhism' },
  { id: 'hinduism',     emoji: '🕉️', key: 'spiritual.hinduism' },
  { id: 'judaism',      emoji: '✡️', key: 'spiritual.judaism' },
  { id: 'secular',      emoji: '🌿', key: 'spiritual.secular' },
]

export default function WelcomePage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const initialStep = (location.state as { step?: number })?.step ?? 1
  const [step, setStep] = useState<1 | 2 | 3>(initialStep as 1 | 2 | 3)
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
      backgroundColor: 'var(--color-bg)',
      transition: 'background-color 0.2s ease',
    }}>

      {/* Logo */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <div style={{
          width: '72px', height: '72px', borderRadius: '50%',
          backgroundColor: 'var(--color-primary)',
          display: 'flex', alignItems: 'center',
          justifyContent: 'center', margin: '0 auto 1rem',
          boxShadow: '0 4px 24px rgba(26,107,74,0.18)',
        }}>
          <span style={{ fontSize: '1.8rem' }}>🕊️</span>
        </div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 600, color: 'var(--color-primary)', marginBottom: '0.25rem' }}>
          CalmBridge
        </h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>{t('tagline')}</p>
      </div>

      {/* Step indicator */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
        {[1, 2, 3].map(s => (
          <div key={s} style={{
            width: s === step ? '24px' : '8px', height: '8px',
            borderRadius: '4px', transition: 'width 0.3s',
            backgroundColor: s === step ? 'var(--color-primary)' : 'var(--color-border)',
          }} />
        ))}
      </div>

      {/* Card */}
      <div style={{
        width: '100%', maxWidth: '360px',
        backgroundColor: 'var(--color-surface)',
        borderRadius: '20px', padding: '1.75rem 1.5rem',
        border: '1px solid var(--color-border)',
        boxShadow: '0 2px 16px rgba(0,0,0,0.07)', marginBottom: '1rem',
      }}>

        {/* Step 1: Language */}
        {step === 1 && (
          <>
            <p style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--color-text-muted)',
              textTransform: 'uppercase', letterSpacing: '0.08em',
              marginBottom: '1rem', textAlign: 'center' }}>
              {t('onboarding.step_language')}
            </p>
            <LanguageSelector />
            <button onClick={() => setStep(2)} style={{
              width: '100%', marginTop: '1.25rem', padding: '0.875rem',
              borderRadius: '12px', backgroundColor: 'var(--color-primary)', color: 'var(--color-text-inverse)',
              fontSize: '1rem', fontWeight: 600, border: 'none', cursor: 'pointer',
              transition: 'background-color 0.15s ease',
            }}>
              {t('onboarding.next')} →
            </button>
          </>
        )}

        {/* Step 2: Situation */}
        {step === 2 && (
          <>
            <p style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--color-text-muted)',
              textTransform: 'uppercase', letterSpacing: '0.08em',
              marginBottom: '1rem', textAlign: 'center' }}>
              {t('onboarding.step_situation')}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              {SITUATIONS.map(s => (
                <button key={s.id} onClick={() => setSituation(s.id)} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  gap: '0.4rem', padding: '0.75rem 0.5rem', borderRadius: '12px', cursor: 'pointer',
                  border: situation === s.id ? '2px solid var(--color-primary)' : '2px solid var(--color-border)',
                  backgroundColor: situation === s.id ? 'var(--color-primary-light)' : 'var(--color-surface)',
                  fontSize: '0.85rem', fontWeight: 500,
                  color: situation === s.id ? 'var(--color-primary)' : 'var(--color-text)',
                  transition: 'all 0.15s',
                  gridColumn: s.id === 'other' ? 'span 2' : 'span 1',
                }}>
                  <span style={{ fontSize: '1.1rem' }}>{s.emoji}</span>
                  <span>{t(`onboarding.situation_${s.id}`)}</span>
                </button>
              ))}
            </div>
            <button onClick={() => setStep(3)} disabled={!situation} style={{
              width: '100%', marginTop: '1.25rem', padding: '0.875rem',
              borderRadius: '12px', border: 'none',
              cursor: situation ? 'pointer' : 'not-allowed',
              backgroundColor: situation ? 'var(--color-primary)' : 'var(--color-border)',
              color: situation ? 'var(--color-text-inverse)' : 'var(--color-text-muted)',
              fontSize: '1rem', fontWeight: 600, transition: 'all 0.15s',
            }}>
              {t('onboarding.next')} →
            </button>
          </>
        )}

        {/* Step 3: Religion */}
        {step === 3 && (
          <>
            <p style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--color-text-muted)',
              textTransform: 'uppercase', letterSpacing: '0.08em',
              marginBottom: '0.5rem', textAlign: 'center' }}>
              {t('onboarding.step_religion')}
            </p>
            <p style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', textAlign: 'center', marginBottom: '1rem' }}>
              {t('onboarding.religion_prompt')}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              {RELIGIONS.map(r => (
                <button key={r.id} onClick={() => setReligion(r.id)} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  gap: '0.4rem', padding: '0.625rem 0.5rem', borderRadius: '10px', cursor: 'pointer',
                  border: religion === r.id ? '2px solid var(--color-primary)' : '2px solid var(--color-border)',
                  backgroundColor: religion === r.id ? 'var(--color-primary)' : 'var(--color-surface)',
                  color: religion === r.id ? 'var(--color-text-inverse)' : 'var(--color-text)',
                  fontSize: '0.82rem', fontWeight: 500, transition: 'all 0.15s',
                }}>
                  <span>{r.emoji}</span>
                  <span>{t(r.key)}</span>
                </button>
              ))}
            </div>
            <button onClick={goToChat} style={{
              width: '100%', marginTop: '1.25rem', padding: '0.875rem',
              borderRadius: '12px', backgroundColor: 'var(--color-primary)', color: 'var(--color-text-inverse)',
              fontSize: '1rem', fontWeight: 600, border: 'none', cursor: 'pointer',
            }}>
              {t('start')} →
            </button>
            <button onClick={goToChat} style={{
              width: '100%', marginTop: '0.5rem', padding: '0.625rem',
              borderRadius: '12px', backgroundColor: 'transparent', color: 'var(--color-text-muted)',
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
          backgroundColor: 'var(--color-surface)', color: 'var(--color-danger)',
          fontSize: '0.95rem', fontWeight: 500,
          border: '1.5px solid var(--color-danger)', cursor: 'pointer',
          opacity: 0.85,
        }}>
          🆘 {t('emergency')}
        </button>
      </div>

      <p style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.72rem',
        color: 'var(--color-text-muted)', maxWidth: '300px', lineHeight: 1.6 }}>
        {t('disclaimer')}
      </p>
        <a href="/privacy" style={{ color: 'var(--color-text-muted)', fontSize: '0.68rem', textDecoration: 'underline', marginBottom: '0.25rem', display: 'block', textAlign: 'center' }}>Privacy Policy</a>
        <p style={{ marginTop: '0.75rem', fontSize: '0.68rem', color: 'var(--color-border)' }}>
        SoulCare Suite · Module 1
      </p>
    </div>
  )
}
