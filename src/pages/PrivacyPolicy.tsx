import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

interface PrivacySection {
  title: string
  body: string
}

export default function PrivacyPolicy() {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const lang = i18n.language?.slice(0, 2) ?? 'en'

  const sections: PrivacySection[] = t('privacy.sections', { returnObjects: true }) as PrivacySection[]
  const notCollectedList: string[] = t('privacy.notCollectedList', { returnObjects: true }) as string[]

  return (
    <div style={{
      minHeight: '100dvh',
      backgroundColor: 'var(--color-bg)',
      color: 'var(--color-text)',
      transition: 'background-color 0.2s ease, color 0.2s ease',
    }}>
      <div style={{ maxWidth: '640px', margin: '0 auto', padding: '2.5rem 1.5rem' }} lang={lang}>

        <button onClick={() => navigate('/')} style={{
          display: 'flex', alignItems: 'center', gap: '0.4rem',
          backgroundColor: 'transparent', border: 'none',
          color: 'var(--color-primary)', fontSize: '0.875rem',
          cursor: 'pointer', marginBottom: '2rem', padding: 0,
        }}>
          {t('privacy.back')}
        </button>

        <h1 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.25rem' }}>
          {t('privacy.title')}
        </h1>
        <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '2rem' }}>
          {t('privacy.lastUpdated')}
        </p>

        {sections.map((section, i) => (
          <div key={i} style={{
            marginBottom: '1rem',
            padding: '1.25rem',
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: '12px',
          }}>
            <h2 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '0.5rem' }}>
              {section.title}
            </h2>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.7, color: 'var(--color-text-muted)' }}>
              {section.body}
            </p>
          </div>
        ))}

        <div style={{
          marginBottom: '1rem',
          padding: '1.25rem',
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: '12px',
        }}>
          <h2 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '0.75rem' }}>
            {t('privacy.notCollectedTitle')}
          </h2>
          {notCollectedList.map((item, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              fontSize: '0.875rem', color: 'var(--color-text-muted)',
              padding: '0.25rem 0',
            }}>
              <span style={{ color: 'var(--color-success)', fontWeight: 600 }}>✓</span>
              {item}
            </div>
          ))}
        </div>

        <div style={{
          padding: '1.25rem',
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: '12px',
        }}>
          <h2 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            {t('privacy.contactTitle')}
          </h2>
          <p style={{ fontSize: '0.875rem', lineHeight: 1.7, color: 'var(--color-text-muted)' }}>
            {t('privacy.contactBody')}{' '}
            <a href="https://github.com/whlee5503-dot/CalmBridge/issues"
              target="_blank" rel="noopener noreferrer"
              style={{ color: 'var(--color-primary)' }}>
              github.com/whlee5503-dot/CalmBridge ↗
            </a>
          </p>
          <p style={{ fontSize: '0.8rem', marginTop: '0.5rem', color: 'var(--color-text-muted)' }}>
            {t('privacy.openaiPolicy')}{' '}
            <a href="https://openai.com/policies/privacy-policy"
              target="_blank" rel="noopener noreferrer"
              style={{ color: 'var(--color-primary)' }}>
              openai.com/policies/privacy-policy ↗
            </a>
          </p>
        </div>

      </div>
    </div>
  )
}
