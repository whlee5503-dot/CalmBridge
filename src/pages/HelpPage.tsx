// src/pages/HelpPage.tsx
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Shield, Mic, Globe, Heart, Eye, Ear, Link2 } from 'lucide-react'

export default function HelpPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const flowSteps: string[] = t('help.flowSteps', { returnObjects: true }) as string[]
  const featureList: string[] = t('help.featureList', { returnObjects: true }) as string[]
  const termList: { term: string; desc: string }[] = t('help.termList', { returnObjects: true }) as { term: string; desc: string }[]

  const pfaItems = [
    { icon: <Eye size={20} />,   key: 'look' },
    { icon: <Ear size={20} />,   key: 'listen' },
    { icon: <Link2 size={20} />, key: 'link' },
  ]

  return (
    <div style={{ minHeight: '100dvh', backgroundColor: 'var(--color-bg)', paddingBottom: '4rem' }}>

      <div style={{
        position: 'sticky', top: 0, zIndex: 10,
        backgroundColor: 'var(--color-surface)',
        borderBottom: '1px solid var(--color-border)',
        padding: '0.75rem 1rem',
        display: 'flex', alignItems: 'center', gap: '0.75rem',
      }}>
        <button type="button" onClick={() => navigate(-1)}
          style={{ width: '2rem', height: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
            borderRadius: '0.5rem', border: 'none', cursor: 'pointer', backgroundColor: 'transparent', color: 'var(--color-text-muted)' }}
          aria-label="Back"><ArrowLeft size={18} /></button>
        <div>
          <h1 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-text)', margin: 0 }}>{t('help.pageTitle')}</h1>
          <p style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', margin: 0 }}>{t('help.pageSubtitle')}</p>
        </div>
      </div>

      <div style={{ padding: '1.25rem 1rem', maxWidth: '480px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

        {/* WHO PFA 배너 */}
        <div style={{ borderRadius: '16px', padding: '1rem 1.25rem',
          background: 'linear-gradient(135deg, var(--color-primary) 0%, #2d8a6a 100%)', color: 'white' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <Heart size={16} />
            <p style={{ fontSize: '0.78rem', fontWeight: 700, margin: 0 }}>WHO Psychological First Aid (PFA)</p>
          </div>
          <p style={{ fontSize: '0.75rem', margin: 0, opacity: 0.9, lineHeight: 1.6 }}>{t('help.pfaDesc')}</p>
        </div>

        {/* 앱 흐름 */}
        <section>
          <h2 style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-primary)', marginBottom: '0.75rem' }}>{t('help.flow')}</h2>
          <div style={{ backgroundColor: 'var(--color-surface)', borderRadius: '16px', border: '1px solid var(--color-border)', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {flowSteps.map((step, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <span style={{ width: '1.5rem', height: '1.5rem', borderRadius: '50%', backgroundColor: 'var(--color-primary)', color: 'white',
                  fontSize: '0.75rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '0.125rem' }}>{i + 1}</span>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text)', lineHeight: 1.6, margin: 0 }}>{step}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 주요 기능 */}
        <section>
          <h2 style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-primary)', marginBottom: '0.75rem' }}>{t('help.features')}</h2>
          <div style={{ backgroundColor: 'var(--color-surface)', borderRadius: '16px', border: '1px solid var(--color-border)', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
            {featureList.map((feature, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                <ArrowRight size={14} style={{ color: 'var(--color-primary)', marginTop: '0.125rem', flexShrink: 0 }} />
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text)', margin: 0 }}>{feature}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Look-Listen-Link */}
        <section>
          <h2 style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-primary)', marginBottom: '0.75rem' }}>{t('help.pfaFramework')}</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {pfaItems.map(({ icon, key }) => (
              <div key={key} style={{ backgroundColor: 'var(--color-surface)', borderRadius: '12px', border: '1px solid var(--color-border)', padding: '0.75rem 1rem', display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <span style={{ color: 'var(--color-primary)', flexShrink: 0, marginTop: '0.125rem' }}>{icon}</span>
                <div>
                  <p style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-text)', margin: '0 0 0.2rem' }}>{t(`help.pfa_${key}_title`)}</p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', margin: 0, lineHeight: 1.5 }}>{t(`help.pfa_${key}_desc`)}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 주요 용어 */}
        <section>
          <h2 style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-primary)', marginBottom: '0.75rem' }}>{t('help.terms')}</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {termList.map(({ term, desc }, i) => (
              <div key={i} style={{ backgroundColor: 'var(--color-surface)', borderRadius: '12px', border: '1px solid var(--color-border)', padding: '0.75rem 1rem' }}>
                <p style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--color-text)', margin: '0 0 0.2rem' }}>{term}</p>
                <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', margin: 0, lineHeight: 1.5 }}>{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 접근성 카드 */}
        <section>
          <h2 style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-primary)', marginBottom: '0.75rem' }}>{t('help.accessibility')}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
            {[
              { icon: <Mic size={18} />, titleKey: 'help.voiceTitle', descKey: 'help.voiceDesc' },
              { icon: <Globe size={18} />, titleKey: 'help.langTitle', descKey: 'help.langDesc' },
            ].map(({ icon, titleKey, descKey }) => (
              <div key={titleKey} style={{ backgroundColor: 'var(--color-surface)', borderRadius: '12px', border: '1px solid var(--color-border)', padding: '0.875rem' }}>
                <div style={{ color: 'var(--color-primary)', marginBottom: '0.4rem' }}>{icon}</div>
                <p style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-text)', margin: '0 0 0.2rem' }}>{t(titleKey)}</p>
                <p style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', margin: 0, lineHeight: 1.4 }}>{t(descKey)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 개인정보 */}
        <div style={{ borderRadius: '16px', border: '1px solid var(--color-primary)', backgroundColor: 'var(--color-primary-light)', padding: '1rem', display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
          <Shield size={18} style={{ color: 'var(--color-primary)', flexShrink: 0, marginTop: '0.125rem' }} />
          <div>
            <p style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--color-primary)', margin: '0 0 0.25rem' }}>{t('help.privacy')}</p>
            <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', margin: 0, lineHeight: 1.5 }}>{t('help.privacyDesc')}</p>
          </div>
        </div>

        <p style={{ textAlign: 'center', fontSize: '0.68rem', color: 'var(--color-border)', paddingTop: '0.5rem' }}>
          CalmBridge v1.0.0 · SoulCare Suite Module 1 · MIT License · DPGA-Aligned
        </p>

      </div>
    </div>
  )
}
