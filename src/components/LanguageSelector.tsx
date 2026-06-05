import { useTranslation } from 'react-i18next'

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'ko', label: '한국어' },
  { code: 'fr', label: 'Français' },
  { code: 'sw', label: 'Kiswahili' },
]

export default function LanguageSelector() {
  const { i18n } = useTranslation()

  return (
    <div className="flex gap-2 flex-wrap justify-center">
      {LANGUAGES.map(lang => (
        <button
          key={lang.code}
          onClick={() => i18n.changeLanguage(lang.code)}
          style={i18n.language === lang.code
            ? {
                backgroundColor: 'var(--color-primary)',
                color: 'var(--color-text-inverse)',
                border: '2px solid var(--color-primary)',
                borderRadius: '10px',
                padding: '0.5rem 1rem',
                fontSize: '0.875rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.15s',
              }
            : {
                backgroundColor: 'var(--color-surface)',
                color: 'var(--color-primary)',
                border: '2px solid var(--color-primary)',
                borderRadius: '10px',
                padding: '0.5rem 1rem',
                fontSize: '0.875rem',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.15s',
              }}
        >
          {lang.label}
        </button>
      ))}
    </div>
  )
}
