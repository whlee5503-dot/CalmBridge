import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useLocation } from 'react-router-dom'
import { Send, ArrowLeft, AlertTriangle, Sparkles, X } from 'lucide-react'
import VoiceInput from '../components/VoiceInput'
import SpiritualComfort from '../components/SpiritualComfort'
import ThemeToggle from '../components/ThemeToggle'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface OnboardingState {
  situation?: string
  religion?: string
  step?: number
}

const LANGUAGES = [
  { code: 'en', label: 'EN' },
  { code: 'ko', label: '한' },
  { code: 'fr', label: 'FR' },
  { code: 'sw', label: 'SW' },
]

const SESSION_KEY = 'calmbridge_session'

interface SessionData {
  lang: string
  messages: Message[]
}

function loadSession(currentLang: string): Message[] | null {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY)
    if (!raw) return null
    const data = JSON.parse(raw) as SessionData
    if (data.lang !== currentLang) return null
    return data.messages
  } catch { return null }
}

function saveSession(lang: string, messages: Message[]) {
  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify({ lang, messages }))
  } catch {}
}

const MENTAL_HEALTH_CRISIS = [
  'suicide', 'kill myself', 'end my life', 'want to die', 'self-harm', 'self harm', 'hurt myself',
  '자살', '죽고 싶', '죽고싶', '목숨을 끊', '자해',
  'me suicider', 'me tuer', 'me blesser',
  'kujiua', 'kujidhuru',
]

const DISASTER_KEYWORDS = [
  'tsunami', 'earthquake', 'flood', 'fire', 'hurricane', 'cyclone', 'landslide', 'explosion',
  '해일', '지진', '홍수', '화재', '산사태', '폭발',
  'tremblement', 'inondation', 'incendie',
  'tetemeko', 'mafuriko', 'moto',
]

function isMentalHealthCrisis(text: string): boolean {
  return MENTAL_HEALTH_CRISIS.some(kw => text.toLowerCase().includes(kw))
}

export { DISASTER_KEYWORDS }

function getGreeting(t: (key: string) => string, situation?: string): string {
  const greetings: Record<string, string> = {
    disaster:  t('pfa.greeting_disaster'),
    conflict:  t('pfa.greeting_conflict'),
    loss:      t('pfa.greeting_loss'),
    isolation: t('pfa.greeting_isolation'),
  }
  return (situation && greetings[situation]) ? greetings[situation] : t('pfa.greeting')
}

export default function ChatPage() {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const { situation, religion } = (location.state as OnboardingState) ?? {}

  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = loadSession(i18n.language)
    if (saved) return saved
    return [{ role: 'assistant', content: getGreeting(t, situation) }]
  })
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [showSpiritual, setShowSpiritual] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const [isOffline, setIsOffline] = useState(!navigator.onLine)

  useEffect(() => {
    const handleOnline  = () => setIsOffline(false)
    const handleOffline = () => setIsOffline(true)
    window.addEventListener('online',  handleOnline)
    window.addEventListener('offline', handleOffline)
    return () => {
      window.removeEventListener('online',  handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    saveSession(i18n.language, messages)
  }, [messages, i18n.language])

  function handleLanguageChange(code: string) {
    i18n.changeLanguage(code)
    const greeting = getGreeting(i18n.getFixedT(code), situation)
    const fresh = [{ role: 'assistant' as const, content: greeting }]
    setMessages(fresh)
    saveSession(code, fresh)
  }

  async function sendMessage() {
    const text = input.trim()
    if (!text || loading) return

    if (isMentalHealthCrisis(text)) {
      setShowAlert(true)
      setInput('')
      return
    }

    const userMsg: Message = { role: 'user', content: text }
    const updated = [...messages, userMsg]
    setMessages(updated)
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updated,
          language: i18n.language,
          situation,
        }),
      })
      const data = await res.json() as { reply: string; offline?: boolean }
      if (data.offline) setIsOffline(true)
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }])
    } catch {
      if (!navigator.onLine) {
        import('../lib/offlineQueue').then(async ({ enqueue, registerSync }) => {
          await enqueue({ messages: updated, language: i18n.language, situation })
          await registerSync()
        })
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: t('offline_queued', 'Your message has been saved and will be sent when you reconnect. 🕊️'),
        }])
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: t('disclaimer') }])
      }
    } finally {
      setLoading(false)
    }
  }

  function handleVoiceTranscript(text: string) {
    setInput(prev => prev ? `${prev} ${text}` : text)
  }

  function handleBack() {
    navigate('/', { state: { situation, religion, step: 3 } })
  }

  return (
    <main className="min-h-dvh flex flex-col" style={{ maxWidth: '480px', margin: '0 auto' }}>

      {/* Header */}
      <header className="flex items-center gap-2 px-3 py-3 border-b border-gray-100"
              style={{ backgroundColor: '#1a6b4a' }}>
        <button onClick={handleBack} className="text-white p-1" aria-label="Go back">
          <ArrowLeft size={20} />
        </button>
        <div className="flex items-center gap-1.5">
          <span className="text-base">🕊</span>
          <span className="text-white font-medium text-sm">CalmBridge</span>
        </div>
        <div className="ml-auto flex items-center gap-0.5">
          {LANGUAGES.map(lang => (
            <button key={lang.code} onClick={() => handleLanguageChange(lang.code)}
              className="font-medium px-2 py-1.5 rounded-md transition-all"
              style={{
                fontSize: '0.8rem',
                minWidth: '32px',
                ...(i18n.language === lang.code
                  ? { backgroundColor: 'white', color: '#1a6b4a' }
                  : { backgroundColor: 'transparent', color: 'rgba(255,255,255,0.9)' })
              }}>
              {lang.label}
            </button>
          ))}
          <button onClick={() => setShowSpiritual(true)} aria-label="Spiritual comfort"
            className="text-white opacity-80 hover:opacity-100 p-1.5">
            <Sparkles size={16} />
          </button>
          <button onClick={() => setShowAlert(true)} aria-label="Emergency help"
            className="text-white opacity-80 hover:opacity-100 p-1.5">
            <AlertTriangle size={16} />
          </button>
          <ThemeToggle />
        </div>
      </header>

      {/* 오프라인 배너 */}
      {isOffline && (
        <div className="flex items-center justify-center gap-2 px-4 py-2 text-xs font-medium"
          style={{ backgroundColor: '#fef3c7', color: '#92400e' }}>
          <span>⚠️</span>
          <span>{t('offline_banner', 'You are offline — responses may be limited.')}</span>
        </div>
      )}

      {/* 긴급 배너 */}
      {showAlert && (
        <div className="mx-4 mt-4 p-4 rounded-2xl border-2 border-red-400 bg-red-50">
          <div className="flex items-center justify-between mb-2">
            <p className="text-red-700 font-semibold text-sm">🆘 {t('emergency')}</p>
            <button onClick={() => setShowAlert(false)} className="text-red-400 text-lg leading-none">✕</button>
          </div>
          <p className="text-red-600 text-xs mb-3">{t('emergency_msg')}</p>
          <div className="flex flex-col gap-2">
            {i18n.language === 'ko' && (
              <a href="tel:1393"
                className="flex items-center justify-between px-3 py-2 rounded-xl bg-red-600 text-white text-sm font-medium">
                <span>🇰🇷 자살예방상담전화</span>
                <span className="font-bold">1393</span>
              </a>
            )}
            {i18n.language === 'fr' && (
              <a href="tel:3114"
                className="flex items-center justify-between px-3 py-2 rounded-xl bg-red-600 text-white text-sm font-medium">
                <span>🇫🇷 Prévention Suicide</span>
                <span className="font-bold">3114</span>
              </a>
            )}
            <a href="sms:741741&body=HOME"
              className="flex items-center justify-between px-3 py-2 rounded-xl bg-red-500 text-white text-sm font-medium">
              <span>💬 Crisis Text Line</span>
              <span className="font-bold">Text HOME → 741741</span>
            </a>
            <a href="https://www.iasp.info/resources/Crisis_Centres/"
              target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-between px-3 py-2 rounded-xl bg-white border border-red-300 text-red-600 text-sm font-medium">
              <span>🌐 International Resources</span>
              <span>→</span>
            </a>
          </div>
        </div>
      )}

      {/* 채팅 영역 */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
        style={{ backgroundColor: 'var(--color-bg)' }}>
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className="max-w-xs px-4 py-3 text-sm leading-relaxed"
              style={msg.role === 'user'
                ? { backgroundColor: '#1a6b4a', color: 'white', borderRadius: '12px 12px 0 12px' }
                : { backgroundColor: 'var(--color-surface)', color: 'var(--color-text)', border: '1px solid var(--color-border)', borderRadius: '12px 12px 12px 0' }}>
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="px-4 py-3 text-sm"
              style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '12px 12px 12px 0', color: 'var(--color-text-muted)' }}>
              ···
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* 하단 disclaimer */}
      <div className="px-4 py-1 text-center" style={{ backgroundColor: 'var(--color-surface-2)' }}>
        <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{t('disclaimer')}</p>
      </div>

      {/* 입력창 */}
      <div className="flex gap-2 px-4 py-3 border-t"
        style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)' }}>
        <input type="text" value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
          placeholder={t('placeholder')}
          className="flex-1 px-4 py-3 text-sm focus:outline-none"
          style={{
            backgroundColor: 'var(--color-surface-2)',
            color: 'var(--color-text)',
            border: '1px solid var(--color-border)',
            borderRadius: '8px',
          }} />
        <VoiceInput onTranscript={handleVoiceTranscript} disabled={loading} />
        <button onClick={sendMessage} disabled={!input.trim() || loading} aria-label="Send message"
          className="w-12 h-12 flex items-center justify-center transition-transform active:scale-95 disabled:opacity-40"
          style={{ backgroundColor: '#1a6b4a', borderRadius: '8px' }}>
          <Send size={18} color="white" />
        </button>
      </div>

      {/* 영적위로 모달 */}
      {showSpiritual && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 50,
          backgroundColor: 'rgba(0,0,0,0.6)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '1.5rem',
        }}
          onClick={() => setShowSpiritual(false)}
        >
          <div style={{
            width: '100%', maxWidth: '400px',
            backgroundColor: 'var(--color-surface)',
            borderRadius: '16px',
            padding: '1.5rem',
            position: 'relative',
          }}
            onClick={e => e.stopPropagation()}
          >
            <button onClick={() => setShowSpiritual(false)}
              style={{
                position: 'absolute', top: '1rem', right: '1rem',
                background: 'none', border: 'none', cursor: 'pointer',
                color: 'var(--color-text-muted)',
              }}>
              <X size={20} />
            </button>
            <SpiritualComfort onClose={() => setShowSpiritual(false)} />
          </div>
        </div>
      )}

    </main>
  )
}
