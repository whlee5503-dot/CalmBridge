// src/pages/TestPage.tsx
// WHO PFA 시나리오 테스트 페이지

import { useState, useRef } from 'react'
import {
  SCENARIOS, saveResult, loadAllResults, clearResults,
  evaluateTurn, scoreResult,
  type TurnResult, type TestResult
} from '../lib/testRunner'

const G = '#1a6b4a'

function ScoreBadge({ score }: { score: number }) {
  const color = score >= 80 ? '#16a34a' : score >= 60 ? '#d97706' : '#dc2626'
  return (
    <span style={{
      display: 'inline-block', padding: '2px 10px', borderRadius: '999px',
      backgroundColor: color, color: 'white', fontWeight: 700, fontSize: '0.85rem'
    }}>{score}</span>
  )
}

function PFABadge({ label, pass }: { label: string; pass: boolean }) {
  return (
    <span style={{
      display: 'inline-block', padding: '2px 8px', borderRadius: '6px', fontSize: '0.72rem',
      fontWeight: 600, marginRight: '4px',
      backgroundColor: pass ? '#dcfce7' : '#fee2e2',
      color: pass ? '#166534' : '#991b1b',
    }}>{pass ? '✓' : '✗'} {label}</span>
  )
}

export default function TestPage() {
  const [running, setRunning]     = useState(false)
  const [progress, setProgress]   = useState('')
  const [results, setResults]     = useState<TestResult[]>([])
  const [history, setHistory]     = useState<TestResult[]>([])
  const [tab, setTab]             = useState<'run'|'history'>('run')
  const [selected, setSelected]   = useState<string[]>([])
  const abortRef = useRef(false)

  async function loadHistory() {
    const all = await loadAllResults()
    setHistory(all.reverse())
  }

  async function runTests() {
    const toRun = SCENARIOS.filter(s => selected.length === 0 || selected.includes(s.id))
    if (toRun.length === 0) return

    setRunning(true)
    setResults([])
    abortRef.current = false
    const allResults: TestResult[] = []

    for (const scenario of toRun) {
      if (abortRef.current) break
      setProgress(`Running: ${scenario.label} (0/${scenario.turns.length})`)

      const turnResults: TurnResult[] = []
      const messages: { role: 'user' | 'assistant'; content: string }[] = []
      const start = Date.now()

      for (let i = 0; i < scenario.turns.length; i++) {
        if (abortRef.current) break
        const userMsg = scenario.turns[i].user
        messages.push({ role: 'user', content: userMsg })
        setProgress(`${scenario.label} — turn ${i + 1}/${scenario.turns.length}`)

        try {
          const res = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ messages, language: scenario.language, situation: scenario.situation }),
          })
          const data = await res.json() as { reply: string }
          const reply = data.reply ?? ''
          messages.push({ role: 'assistant', content: reply })

          const eval_ = evaluateTurn(reply, scenario.language)
          turnResults.push({
            userMessage: userMsg,
            aiResponse: reply,
            scores: { look: eval_.look, listen: eval_.listen, link: eval_.link },
            harmful: eval_.harmful,
          })
        } catch {
          turnResults.push({
            userMessage: userMsg,
            aiResponse: '[ERROR]',
            scores: { look: false, listen: false, link: false },
            harmful: false,
          })
        }

        // Rate limit 방지
        await new Promise(r => setTimeout(r, 800))
      }

      const result: TestResult = {
        scenario,
        turns: turnResults,
        totalScore: scoreResult(turnResults),
        passedAt: new Date().toISOString(),
        durationMs: Date.now() - start,
      }
      allResults.push(result)
      setResults([...allResults])
      await saveResult(result)
    }

    setProgress(abortRef.current ? 'Aborted.' : 'All tests complete!')
    setRunning(false)
  }

  function downloadJSON() {
    const blob = new Blob([JSON.stringify(results, null, 2)], { type: 'application/json' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `calmbridge-test-${new Date().toISOString().slice(0,10)}.json`
    a.click()
  }

  function toggleScenario(id: string) {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }

  const avgScore = results.length > 0
    ? Math.round(results.reduce((s, r) => s + r.totalScore, 0) / results.length)
    : null

  return (
    <div style={{ minHeight: '100dvh', backgroundColor: '#f0f9f5', fontFamily: 'system-ui, sans-serif' }}>
      {/* Header */}
      <header style={{ backgroundColor: G, color: 'white', padding: '1rem 1.5rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontSize: '1.5rem' }}>🧪</span>
          <div>
            <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>CalmBridge Test Suite</div>
            <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>WHO PFA Scenario Evaluation</div>
          </div>
        </div>
        <a href="/" style={{ color: 'white', fontSize: '0.8rem', opacity: 0.8, textDecoration: 'none' }}>
          ← Back to App
        </a>
      </header>

      {/* Tabs */}
      <div style={{ display: 'flex', borderBottom: '2px solid #e5e7eb', backgroundColor: 'white', padding: '0 1.5rem' }}>
        {(['run', 'history'] as const).map(t => (
          <button key={t} onClick={() => { setTab(t); if (t === 'history') loadHistory() }}
            style={{ padding: '0.75rem 1.25rem', border: 'none', background: 'none', cursor: 'pointer',
              fontWeight: tab === t ? 700 : 400, fontSize: '0.9rem',
              borderBottom: tab === t ? `3px solid ${G}` : '3px solid transparent',
              color: tab === t ? G : '#6b7280', marginBottom: '-2px' }}>
            {t === 'run' ? '▶ Run Tests' : '📋 History'}
          </button>
        ))}
      </div>

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '1.5rem' }}>

        {/* RUN TAB */}
        {tab === 'run' && (
          <>
            {/* Scenario selector */}
            <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '1.25rem',
              marginBottom: '1rem', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
              <p style={{ fontSize: '0.8rem', fontWeight: 600, color: '#6b7280',
                textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.75rem' }}>
                Select Scenarios (empty = run all)
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {SCENARIOS.map(s => (
                  <button key={s.id} onClick={() => toggleScenario(s.id)} style={{
                    padding: '0.4rem 0.85rem', borderRadius: '999px', fontSize: '0.8rem',
                    cursor: 'pointer', border: '1.5px solid',
                    borderColor: selected.includes(s.id) ? G : '#e5e7eb',
                    backgroundColor: selected.includes(s.id) ? '#e8f5f0' : 'white',
                    color: selected.includes(s.id) ? G : '#374151', fontWeight: 500,
                  }}>{s.label}</button>
                ))}
              </div>
            </div>

            {/* Run button */}
            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <button onClick={runTests} disabled={running} style={{
                flex: 1, padding: '0.875rem', borderRadius: '12px', border: 'none',
                backgroundColor: running ? '#9ca3af' : G, color: 'white',
                fontSize: '1rem', fontWeight: 600, cursor: running ? 'not-allowed' : 'pointer',
              }}>
                {running ? `⏳ ${progress}` : '▶ Run Tests'}
              </button>
              {running && (
                <button onClick={() => { abortRef.current = true }} style={{
                  padding: '0.875rem 1.25rem', borderRadius: '12px', border: '1.5px solid #dc2626',
                  backgroundColor: 'white', color: '#dc2626', fontSize: '0.9rem',
                  fontWeight: 600, cursor: 'pointer',
                }}>Stop</button>
              )}
              {results.length > 0 && !running && (
                <button onClick={downloadJSON} style={{
                  padding: '0.875rem 1.25rem', borderRadius: '12px', border: `1.5px solid ${G}`,
                  backgroundColor: 'white', color: G, fontSize: '0.9rem',
                  fontWeight: 600, cursor: 'pointer',
                }}>⬇ JSON</button>
              )}
            </div>

            {/* Summary */}
            {results.length > 0 && (
              <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '1.25rem',
                marginBottom: '1.25rem', boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
                <div>
                  <div style={{ fontSize: '0.72rem', color: '#6b7280', textTransform: 'uppercase',
                    letterSpacing: '0.06em' }}>Average Score</div>
                  <div style={{ fontSize: '2rem', fontWeight: 800, color: avgScore! >= 80 ? '#16a34a' : avgScore! >= 60 ? '#d97706' : '#dc2626' }}>
                    {avgScore}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.72rem', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Scenarios</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{results.length}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.72rem', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Passed (≥80)</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#16a34a' }}>
                    {results.filter(r => r.totalScore >= 80).length}
                  </div>
                </div>
              </div>
            )}

            {/* Results */}
            {results.map((result, ri) => (
              <div key={ri} style={{ backgroundColor: 'white', borderRadius: '16px',
                padding: '1.25rem', marginBottom: '1rem',
                boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                borderLeft: `4px solid ${result.totalScore >= 80 ? '#16a34a' : result.totalScore >= 60 ? '#d97706' : '#dc2626'}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <div>
                    <span style={{ fontWeight: 700, fontSize: '1rem' }}>{result.scenario.label}</span>
                    <span style={{ fontSize: '0.75rem', color: '#6b7280', marginLeft: '0.75rem' }}>
                      {(result.durationMs / 1000).toFixed(1)}s
                    </span>
                  </div>
                  <ScoreBadge score={result.totalScore} />
                </div>
                {result.turns.map((turn, ti) => (
                  <div key={ti} style={{ borderTop: '1px solid #f3f4f6', paddingTop: '0.75rem', marginTop: '0.75rem' }}>
                    <div style={{ fontSize: '0.8rem', color: '#374151', backgroundColor: '#f9fafb',
                      padding: '0.5rem 0.75rem', borderRadius: '8px', marginBottom: '0.5rem' }}>
                      <strong>User:</strong> {turn.userMessage}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#1f2937',
                      padding: '0.5rem 0.75rem', borderRadius: '8px',
                      backgroundColor: turn.harmful ? '#fef2f2' : '#f0fdf4',
                      marginBottom: '0.5rem', lineHeight: 1.6 }}>
                      <strong>AI:</strong> {turn.aiResponse}
                    </div>
                    <div>
                      <PFABadge label="Look"   pass={turn.scores.look} />
                      <PFABadge label="Listen" pass={turn.scores.listen} />
                      <PFABadge label="Link"   pass={turn.scores.link} />
                      {turn.harmful && (
                        <span style={{ fontSize: '0.72rem', color: '#dc2626', fontWeight: 700 }}>
                          ⚠️ Harmful phrase detected
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </>
        )}

        {/* HISTORY TAB */}
        {tab === 'history' && (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <span style={{ fontWeight: 600, color: '#374151' }}>{history.length} saved results</span>
              {history.length > 0 && (
                <button onClick={async () => { await clearResults(); setHistory([]) }} style={{
                  padding: '0.4rem 1rem', borderRadius: '8px', border: '1.5px solid #dc2626',
                  backgroundColor: 'white', color: '#dc2626', fontSize: '0.8rem',
                  fontWeight: 600, cursor: 'pointer',
                }}>🗑 Clear All</button>
              )}
            </div>
            {history.length === 0 && (
              <div style={{ textAlign: 'center', color: '#9ca3af', padding: '3rem' }}>
                No test history yet. Run some tests first.
              </div>
            )}
            {history.map((result, ri) => (
              <div key={ri} style={{ backgroundColor: 'white', borderRadius: '12px',
                padding: '1rem 1.25rem', marginBottom: '0.75rem',
                boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{result.scenario.label}</div>
                  <div style={{ fontSize: '0.72rem', color: '#9ca3af' }}>
                    {new Date(result.passedAt).toLocaleString()} · {result.turns.length} turns
                  </div>
                </div>
                <ScoreBadge score={result.totalScore} />
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  )
}
