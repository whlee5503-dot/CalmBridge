import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useLocation } from 'react-router-dom'
import { Send, ArrowLeft, AlertTriangle, X, HelpCircle } from 'lucide-react'
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
  const selectedReligion = religion ?? "none"
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
        body: JSON.stringify({ messages: updated, language: i18n.language, situation, religion: selectedReligion }),
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
      <header style={{ backgroundColor: '#1a6b4a', padding: '0.75rem 1rem' }}>
        <div className="flex items-center gap-2">
          <button onClick={handleBack} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', padding: '4px' }} aria-label="Go back">
            <ArrowLeft size={20} />
          </button>
          <span style={{ fontSize: '1.1rem' }}>🕊</span>
          <span style={{ color: 'white', fontWeight: 600, fontSize: '1rem' }}>CalmBridge</span>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '2px' }}>
            {LANGUAGES.map(lang => (
              <button key={lang.code} onClick={() => handleLanguageChange(lang.code)}
                style={{
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  padding: '4px 8px',
                  borderRadius: '6px',
                  border: 'none',
                  cursor: 'pointer',
                  minWidth: '36px',
                  ...(i18n.language === lang.code
                    ? { backgroundColor: 'white', color: '#1a6b4a' }
                    : { backgroundColor: 'transparent', color: 'rgba(255,255,255,0.9)' })
                }}>
                {lang.label}
              </button>
            ))}
            <button
              onClick={() => navigate('/help')}
              aria-label="사용 가이드"
              title="사용 가이드"
              style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', padding: '4px 6px', opacity: 0.9, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1px' }}>
              <HelpCircle size={15} />
              <span style={{ fontSize: '0.5rem', lineHeight: 1 }}>가이드</span>
            </button>
            <button onClick={() => setShowAlert(true)} aria-label="긴급 도움"
              title="긴급 도움"
              style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', padding: '4px 6px', opacity: 0.85, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1px' }}>
              <AlertTriangle size={15} />
              <span style={{ fontSize: '0.5rem', lineHeight: 1 }}>긴급</span>
            </button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* 오프라인 배너 */}
      {isOffline && (
        <div style={{ backgroundColor: '#fef3c7', color: '#92400e', padding: '0.5rem 1rem', fontSize: '0.75rem', textAlign: 'center' }}>
          ⚠️ {t('offline_banner', 'You are offline — responses may be limited.')}
        </div>
      )}

      {/* 긴급 배너 */}
      {showAlert && (
        <div style={{ margin: '1rem', padding: '1rem', borderRadius: '12px', border: '2px solid #f87171', backgroundColor: '#fef2f2' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <p style={{ color: '#b91c1c', fontWeight: 600, fontSize: '0.875rem' }}>🆘 {t('emergency')}</p>
            <button onClick={() => setShowAlert(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#f87171', fontSize: '1.2rem' }}>✕</button>
          </div>
          <p style={{ color: '#dc2626', fontSize: '0.75rem', marginBottom: '0.75rem' }}>{t('emergency_msg')}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {i18n.language === 'ko' && (
              <a href="tel:1393" style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0.75rem', borderRadius: '10px', backgroundColor: '#dc2626', color: 'white', fontSize: '0.875rem', fontWeight: 600, textDecoration: 'none' }}>
                <span>🇰🇷 자살예방상담전화</span><span>1393</span>
              </a>
            )}
            {i18n.language === 'fr' && (
              <a href="tel:3114" style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0.75rem', borderRadius: '10px', backgroundColor: '#dc2626', color: 'white', fontSize: '0.875rem', fontWeight: 600, textDecoration: 'none' }}>
                <span>🇫🇷 Prévention Suicide</span><span>3114</span>
              </a>
            )}
            <a href="sms:741741&body=HOME" style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0.75rem', borderRadius: '10px', backgroundColor: '#ef4444', color: 'white', fontSize: '0.875rem', fontWeight: 600, textDecoration: 'none' }}>
              <span>💬 Crisis Text Line</span><span>Text HOME → 741741</span>
            </a>
            <a href="https://www.iasp.info/resources/Crisis_Centres/" target="_blank" rel="noopener noreferrer"
              style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0.75rem', borderRadius: '10px', backgroundColor: 'white', border: '1px solid #fca5a5', color: '#dc2626', fontSize: '0.875rem', fontWeight: 600, textDecoration: 'none' }}>
              <span>🌐 International Resources</span><span>→</span>
            </a>
          </div>
        </div>
      )}

      {/* 채팅 영역 */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', backgroundColor: 'var(--color-bg)' }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
            <div style={{
              maxWidth: '80%', padding: '0.75rem 1rem', fontSize: '0.9rem', lineHeight: 1.6,
              ...(msg.role === 'user'
                ? { backgroundColor: '#1a6b4a', color: 'white', borderRadius: '12px 12px 0 12px' }
                : { backgroundColor: 'var(--color-surface)', color: 'var(--color-text)', border: '1px solid var(--color-border)', borderRadius: '12px 12px 12px 0' })
            }}>
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <div style={{ padding: '0.75rem 1rem', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '12px 12px 12px 0', color: 'var(--color-text-muted)' }}>···</div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* disclaimer */}
      <div style={{ padding: '0.375rem 1rem', textAlign: 'center', backgroundColor: 'var(--color-surface-2)' }}>
        <p style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>{t('disclaimer')}</p>
      </div>

      {/* 입력창 */}
      <div style={{ display: 'flex', gap: '0.5rem', padding: '0.75rem 1rem', borderTop: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)' }}>
        <input type="text" value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
          placeholder={t('placeholder')}
          style={{
            flex: 1, padding: '0.75rem 1rem', fontSize: '0.9rem',
            backgroundColor: 'var(--color-surface-2)',
            color: 'var(--color-text)',
            border: '1px solid var(--color-border)',
            borderRadius: '6px',
            outline: 'none',
          }} />
        <VoiceInput onTranscript={handleVoiceTranscript} disabled={loading} />
        <button onClick={sendMessage} disabled={!input.trim() || loading} aria-label="Send message"
          style={{
            width: '48px', height: '48px', borderRadius: '6px',
            backgroundColor: '#1a6b4a', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            opacity: !input.trim() || loading ? 0.4 : 1,
          }}>
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
        }} onClick={() => setShowSpiritual(false)}>
          <div style={{
            width: '100%', maxWidth: '400px',
            backgroundColor: 'var(--color-surface)',
            borderRadius: '16px', padding: '1.5rem',
            position: 'relative',
          }} onClick={e => e.stopPropagation()}>
            <button onClick={() => setShowSpiritual(false)}
              style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)' }}>
              <X size={20} />
            </button>
            <SpiritualComfort
              onClose={() => setShowSpiritual(false)}
              initialTradition={selectedReligion}
            />
          </div>
        </div>
      )}

    </main>
  )
}
