import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import LanguageSelector from '../components/LanguageSelector'

export default function WelcomePage() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <div style={{
      minHeight: '100dvh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 1.5rem',
      background: 'linear-gradient(160deg, #e8f5f0 0%, #f0f9f5 50%, #f9fafb 100%)',
    }}>

      {/* Logo block */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <div style={{
          width: '88px', height: '88px',
          borderRadius: '50%',
          backgroundColor: '#1a6b4a',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 1.25rem',
          boxShadow: '0 4px 24px rgba(26,107,74,0.18)',
        }}>
          <span style={{ fontSize: '2.2rem', lineHeight: 1 }}>🕊️</span>
        </div>
        <h1 style={{
          fontSize: '2rem', fontWeight: 600,
          color: '#1a6b4a', letterSpacing: '-0.5px',
          marginBottom: '0.4rem',
        }}>
          CalmBridge
        </h1>
        <p style={{ color: '#6b7280', fontSize: '1rem' }}>
          {t('tagline')}
        </p>
      </div>

      {/* Card */}
      <div style={{
        width: '100%', maxWidth: '360px',
        backgroundColor: 'white',
        borderRadius: '20px',
        padding: '1.75rem 1.5rem',
        boxShadow: '0 2px 16px rgba(0,0,0,0.07)',
        marginBottom: '1.5rem',
      }}>
        <p style={{
          fontSize: '0.75rem', fontWeight: 500,
          color: '#9ca3af', textTransform: 'uppercase',
          letterSpacing: '0.08em', marginBottom: '0.875rem',
          textAlign: 'center',
        }}>
          {t('language')}
        </p>
        <LanguageSelector />
      </div>

      {/* Start button */}
      <div style={{ width: '100%', maxWidth: '360px', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <button
          onClick={() => navigate('/chat')}
          style={{
            width: '100%', padding: '1rem',
            borderRadius: '14px',
            backgroundColor: '#1a6b4a', color: 'white',
            fontSize: '1.05rem', fontWeight: 600,
            border: 'none', cursor: 'pointer',
            boxShadow: '0 2px 12px rgba(26,107,74,0.25)',
            transition: 'opacity 0.15s',
          }}
          onMouseOver={e => (e.currentTarget.style.opacity = '0.9')}
          onMouseOut={e => (e.currentTarget.style.opacity = '1')}
        >
          {t('start')} →
        </button>

        <button
          onClick={() => alert(t('emergency_msg'))}
          style={{
            width: '100%', padding: '0.875rem',
            borderRadius: '14px',
            backgroundColor: 'white',
            color: '#dc2626', fontSize: '0.95rem', fontWeight: 500,
            border: '1.5px solid #fca5a5', cursor: 'pointer',
            transition: 'background-color 0.15s',
          }}
          onMouseOver={e => (e.currentTarget.style.backgroundColor = '#fff5f5')}
          onMouseOut={e => (e.currentTarget.style.backgroundColor = 'white')}
        >
          🆘 {t('emergency')}
        </button>
      </div>

      {/* Disclaimer */}
      <p style={{
        marginTop: '2rem',
        textAlign: 'center', fontSize: '0.72rem',
        color: '#9ca3af', maxWidth: '300px', lineHeight: 1.6,
      }}>
        {t('disclaimer')}
      </p>

      {/* Suite badge */}
      <p style={{ marginTop: '1rem', fontSize: '0.68rem', color: '#d1d5db' }}>
        SoulCare Suite · Module 1
      </p>

    </div>
  )
}
