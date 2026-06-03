import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useLocation } from 'react-router-dom'
import { Send, ArrowLeft, AlertTriangle, Sparkles } from 'lucide-react'
import VoiceInput from '../components/VoiceInput'
import SpiritualComfort from '../components/SpiritualComfort'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface OnboardingState {
  situation?: string
  religion?: string
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

// 상황별 첫 인사말
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
  const [showSpiritual, setShowSpiritual] = useState(religion !== 'none' && !!religion)
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
          situation, // onboarding에서 전달된 상황
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

  return (
    <div className="min-h-dvh flex flex-col" style={{ maxWidth: '480px', margin: '0 auto' }}>

      <header className="flex items-center gap-3 px-4 py-3 border-b border-gray-100"
              style={{ backgroundColor: '#1a6b4a' }}>
        <button onClick={() => navigate('/')} className="text-white p-1">
          <ArrowLeft size={20} />
        </button>
        <div className="flex items-center gap-2">
          <span className="text-lg">🕊</span>
          <span className="text-white font-medium">CalmBridge</span>
        </div>
        <div className="ml-auto flex items-center gap-1">
          {LANGUAGES.map(lang => (
            <button key={lang.code} onClick={() => handleLanguageChange(lang.code)}
              className="text-xs font-medium px-2 py-1 rounded-md transition-all"
              style={i18n.language === lang.code
                ? { backgroundColor: 'white', color: '#1a6b4a' }
                : { backgroundColor: 'transparent', color: 'rgba(255,255,255,0.7)' }}>
              {lang.label}
            </button>
          ))}
          <button onClick={() => setShowAlert(true)}
            className="text-white opacity-80 hover:opacity-100 ml-1 p-1">
            <AlertTriangle size={18} />
          </button>
        </div>
      </header>

      {isOffline && (
        <div className="flex items-center justify-center gap-2 px-4 py-2 text-xs font-medium"
          style={{ backgroundColor: '#fef3c7', color: '#92400e' }}>
          <span>⚠️</span>
          <span>{t('offline_banner', 'You are offline — responses may be limited.')}</span>
        </div>
      )}
      
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

      <div className="px-4 pt-3">
        <button
          onClick={() => setShowSpiritual(prev => !prev)}
          className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full transition-all"
          style={showSpiritual
            ? { backgroundColor: '#1a6b4a', color: 'white' }
            : { backgroundColor: '#e8f5f0', color: '#1a6b4a' }}>
          <Sparkles size={13} />
          {t('spiritual.title', 'Spiritual Comfort')}
        </button>
      </div>
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {showSpiritual && (
          <div className="mb-2">
            <SpiritualComfort onClose={() => setShowSpiritual(false)} />
          </div>
        )}
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className="max-w-xs px-4 py-3 rounded-2xl text-sm leading-relaxed"
              style={msg.role === 'user'
                ? { backgroundColor: '#1a6b4a', color: 'white', borderBottomRightRadius: '4px' }
                : { backgroundColor: 'white', color: '#1f2937', border: '1px solid #e5e7eb', borderBottomLeftRadius: '4px' }}>
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="px-4 py-3 rounded-2xl bg-white border border-gray-200 text-sm text-gray-400">···</div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="px-4 py-1 text-center" style={{ backgroundColor: '#e8f5f0' }}>
        <p className="text-xs text-gray-400">{t('disclaimer')}</p>
      </div>

      <div className="flex gap-2 px-4 py-3 border-t border-gray-100 bg-white">
        <input type="text" value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
          placeholder={t('placeholder')}
          className="flex-1 px-4 py-3 rounded-2xl border border-gray-200 text-sm focus:outline-none focus:border-green-400"
          style={{ backgroundColor: '#f9fafb' }} />
        <VoiceInput onTranscript={handleVoiceTranscript} disabled={loading} />
        <button onClick={sendMessage} disabled={!input.trim() || loading}
          className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform active:scale-95 disabled:opacity-40"
          style={{ backgroundColor: '#1a6b4a' }}>
          <Send size={18} color="white" />
        </button>
      </div>

    </div>
  )
}
