import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

export default function PrivacyPolicy() {
  const { i18n } = useTranslation()
  const navigate = useNavigate()
  const lang = i18n.language?.slice(0, 2) ?? 'en'

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
          ← Back
        </button>

        <h1 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.25rem' }}>
          Privacy Policy
        </h1>
        <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '2rem' }}>
          Last updated: 2025-06-05
        </p>

        {[
          {
            title: 'Overview',
            body: 'CalmBridge is a stateless application. We do not collect, store, or share any personally identifiable information (PII). No account registration is required.',
          },
          {
            title: 'Local device storage',
            body: "CalmBridge stores only your language preference and theme setting in your browser's localStorage. This data never leaves your device.",
          },
          {
            title: 'AI message processing',
            body: "Messages you send are processed by OpenAI's API to generate responses. We do not retain messages after the API call completes.",
          },
          {
            title: 'Voice input',
            body: "Voice input uses your browser's built-in Web Speech API. CalmBridge does not receive or store raw audio.",
          },
        ].map((section, i) => (
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
            Data we do NOT collect
          </h2>
          {[
            'Names or contact information',
            'IP addresses or device identifiers',
            'Conversation history (not stored server-side)',
            'Location data',
            'Tracking cookies or analytics',
          ].map((item, i) => (
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
            Contact
          </h2>
          <p style={{ fontSize: '0.875rem', lineHeight: 1.7, color: 'var(--color-text-muted)' }}>
            Questions? Open an issue at{' '}
            <a href="https://github.com/whlee5503-dot/CalmBridge/issues"
              target="_blank" rel="noopener noreferrer"
              style={{ color: 'var(--color-primary)' }}>
              github.com/whlee5503-dot/CalmBridge ↗
            </a>
          </p>
          <p style={{ fontSize: '0.8rem', marginTop: '0.5rem', color: 'var(--color-text-muted)' }}>
            OpenAI Privacy Policy:{' '}
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
