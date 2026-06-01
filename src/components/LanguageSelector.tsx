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
          className="px-4 py-2 rounded-full text-sm font-medium transition-all"
          style={i18n.language === lang.code
            ? { backgroundColor: '#1a6b4a', color: 'white' }
            : { backgroundColor: 'white', color: '#1a6b4a',
                border: '1px solid #1a6b4a' }}
        >
          {lang.label}
        </button>
      ))}
    </div>
  )
}
