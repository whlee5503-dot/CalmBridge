import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Send, ArrowLeft, AlertTriangle, Sparkles } from 'lucide-react'
import VoiceInput from '../components/VoiceInput'
import SpiritualComfort from '../components/SpiritualComfort'

interface Message {
  role: 'user' | 'assistant'
  content: string
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
  } catch {
    return null
  }
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
  'tremblement', 'inondation', 'incendie', 'cyclone',
  'tetemeko', 'mafuriko', 'moto',
]

function isMentalHealthCrisis(text: string): boolean {
  const lower = text.toLowerCase()
  return MENTAL_HEALTH_CRISIS.some(kw => lower.includes(kw))
}

export { DISASTER_KEYWORDS }

export default function ChatPage() {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()

  const [messages, setMessages] = useState<Message[]>(() =>
    loadSession(i18n.language) ?? [{ role: 'assistant', content: t('pfa.greeting') }]
  )
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [showSpiritual, setShowSpiritual] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    saveSession(i18n.language, messages)
  }, [messages, i18n.language])

  function handleLanguageChange(code: string) {
    i18n.changeLanguage(code)
    const greeting = i18n.getFixedT(code)('pfa.greeting')
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
        }),
      })
      const data = await res.json() as { reply: string }
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }])
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: t('disclaimer')
      }])
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
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className="text-xs font-medium px-2 py-1 rounded-md transition-all"
              style={i18n.language === lang.code
                ? { backgroundColor: 'white', color: '#1a6b4a' }
                : { backgroundColor: 'transparent', color: 'rgba(255,255,255,0.7)' }}
            >
              {lang.label}
            </button>
          ))}
          <button
            onClick={() => setShowAlert(true)}
            className="text-white opacity-80 hover:opacity-100 ml-1 p-1"
          >
            <AlertTriangle size={18} />
          </button>
        </div>
      </header>

      {showAlert && (
        <div className="mx-4 mt-4 p-4 rounded-2xl border-2 border-red-400 bg-red-50">
          <p className="text-red-700 font-medium text-sm mb-1">🆘 {t('emergency')}</p>
          <p className="text-red-600 text-sm">{t('emergency_msg')}</p>
          <button onClick={() => setShowAlert(false)} className="mt-3 text-xs text-red-500 underline">
            닫기 / Close
          </button>
        </div>
      )}

      <div className="px-4 pt-3">
        <button
          onClick={() => setShowSpiritual(prev => !prev)}
          className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full transition-all"
          style={showSpiritual
            ? { backgroundColor: '#1a6b4a', color: 'white' }
            : { backgroundColor: '#e8f5f0', color: '#1a6b4a' }}
        >
          <Sparkles size={13} />
          {t('spiritual.title', 'Spiritual Comfort')}
        </button>
      </div>

      {showSpiritual && (
        <div className="px-4 pt-3">
          <SpiritualComfort onClose={() => setShowSpiritual(false)} />
        </div>
      )}

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className="max-w-xs px-4 py-3 rounded-2xl text-sm leading-relaxed"
              style={msg.role === 'user'
                ? { backgroundColor: '#1a6b4a', color: 'white', borderBottomRightRadius: '4px' }
                : { backgroundColor: 'white', color: '#1f2937',
                    border: '1px solid #e5e7eb', borderBottomLeftRadius: '4px' }}
            >
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
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
          placeholder={t('placeholder')}
          className="flex-1 px-4 py-3 rounded-2xl border border-gray-200 text-sm focus:outline-none focus:border-green-400"
          style={{ backgroundColor: '#f9fafb' }}
        />
        <VoiceInput onTranscript={handleVoiceTranscript} disabled={loading} />
        <button
          onClick={sendMessage}
          disabled={!input.trim() || loading}
          className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform active:scale-95 disabled:opacity-40"
          style={{ backgroundColor: '#1a6b4a' }}
        >
          <Send size={18} color="white" />
        </button>
      </div>

    </div>
  )
}
