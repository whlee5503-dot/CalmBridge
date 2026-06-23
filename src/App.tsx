import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import WelcomePage from './pages/WelcomePage'
import ChatPage from './pages/ChatPage'
import TestPage from './pages/TestPage'
import PrivacyPolicy from './pages/PrivacyPolicy'
import HelpPage from './pages/HelpPage'
import SituationPage from './pages/SituationPage'
import StatePage from './pages/StatePage'
import ResponsePage from './pages/ResponsePage'
import ThemeToggle from './components/ThemeToggle'

function GlobalThemeToggle() {
  const location = useLocation()
  if (location.pathname === '/chat') return null
  return (
    <div style={{ position: 'fixed', top: '12px', right: '12px', zIndex: 9999, backgroundColor: 'rgba(0,0,0,0.15)', borderRadius: '8px' }}>
      <ThemeToggle />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <GlobalThemeToggle />
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
