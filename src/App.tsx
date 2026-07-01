import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { HelpCircle } from 'lucide-react'
import WelcomePage from './pages/WelcomePage'
import ChatPage from './pages/ChatPage'
import TestPage from './pages/TestPage'
import PrivacyPolicy from './pages/PrivacyPolicy'
import HelpPage from './pages/HelpPage'
import SituationPage from './pages/SituationPage'
import StatePage from './pages/StatePage'
import ResponsePage from './pages/ResponsePage'
import ThemeToggle from './components/ThemeToggle'
import HelpModal from './components/HelpModal'

function GlobalControls() {
  const location = useLocation()
  const { t } = useTranslation()
  const [showHelp, setShowHelp] = useState(false)
  // ChatPage already renders its own Help + Theme controls in its header
  if (location.pathname === '/chat') return null
  const hideHelpButton = location.pathname === '/help'

  return (
    <>
      <div style={{
        position: 'fixed', top: '12px', right: '12px', zIndex: 9999,
        display: 'flex', alignItems: 'center', gap: '2px',
        backgroundColor: 'rgba(0,0,0,0.15)', borderRadius: '8px',
      }}>
        {!hideHelpButton && (
          <button
            type="button"
            onClick={() => setShowHelp(true)}
            aria-label={t('help.btnGuide')}
            title={t('help.btnGuide')}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              padding: '6px', borderRadius: '6px', color: 'white', opacity: 0.85,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'opacity 0.15s ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '0.85')}
          >
            <HelpCircle size={16} />
          </button>
        )}
        <ThemeToggle />
      </div>
      {showHelp && <HelpModal onClose={() => setShowHelp(false)} />}
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <GlobalControls />
      <Routes>
        <Route path="/"        element={<WelcomePage />} />
        <Route path="/chat"    element={<ChatPage />} />
        <Route path="/test"    element={<TestPage />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/help"    element={<HelpPage />} />
        <Route path="/situation" element={<SituationPage />} />
        <Route path="/state"     element={<StatePage />} />
        <Route path="/response"  element={<ResponsePage />} />
      </Routes>
    </BrowserRouter>
  )
}
