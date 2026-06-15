// src/components/HelpModal.tsx
import { useTranslation } from 'react-i18next'
import { X, ArrowRight, ExternalLink, Shield } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface HelpModalProps {
  onClose: () => void
}

export default function HelpModal({ onClose }: HelpModalProps) {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const flowSteps: string[] = t('help.flowSteps', { returnObjects: true }) as string[]
  const featureList: string[] = t('help.featureList', { returnObjects: true }) as string[]
  const termList: { term: string; desc: string }[] = t('help.termList', { returnObjects: true }) as { term: string; desc: string }[]

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
      role="dialog" aria-modal="true" aria-label={t('help.modalTitle')}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md max-h-[85svh] overflow-y-auto rounded-t-2xl sm:rounded-2xl shadow-xl flex flex-col"
        style={{ backgroundColor: 'var(--color-surface)' }}>

        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between px-5 py-4 border-b z-10"
          style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
          <div className="flex items-center gap-2">
            <span style={{ fontSize: '1.3rem' }}>🕊️</span>
            <h2 className="text-base font-bold" style={{ color: 'var(--color-text)' }}>
              {t('help.modalTitle')}
            </h2>
          </div>
          <button type="button" onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg"
            style={{ color: 'var(--color-text-muted)', background: 'none', border: 'none', cursor: 'pointer' }}
            aria-label={t('help.close')}>
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-4 space-y-5">

          <section>
            <h3 className="text-xs font-bold uppercase tracking-wide mb-2" style={{ color: 'var(--color-primary)' }}>
              {t('help.flow')}
            </h3>
            <ol className="space-y-2">
              {flowSteps.map((step, i) => (
                <li key={i} className="flex items-start gap-2 text-sm" style={{ color: 'var(--color-text)' }}>
                  <span className="w-5 h-5 rounded-full text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ backgroundColor: 'var(--color-primary)' }}>{i + 1}</span>
                  {step}
                </li>
              ))}
            </ol>
          </section>

          <section>
            <h3 className="text-xs font-bold uppercase tracking-wide mb-2" style={{ color: 'var(--color-primary)' }}>
              {t('help.features')}
            </h3>
            <ul className="space-y-1.5">
              {featureList.map((feature, i) => (
                <li key={i} className="flex items-start gap-2 text-sm" style={{ color: 'var(--color-text)' }}>
                  <ArrowRight size={14} className="mt-0.5 flex-shrink-0" style={{ color: 'var(--color-primary)' }} />
                  {feature}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-xs font-bold uppercase tracking-wide mb-2" style={{ color: 'var(--color-primary)' }}>
              {t('help.terms')}
            </h3>
            <div className="space-y-2">
              {termList.map(({ term, desc }, i) => (
                <div key={i} className="rounded-xl px-3 py-2" style={{ backgroundColor: 'var(--color-surface-2)' }}>
                  <p className="text-xs font-bold" style={{ color: 'var(--color-text)' }}>{term}</p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>{desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-xl border px-3 py-3"
            style={{ backgroundColor: 'var(--color-primary-light)', borderColor: 'var(--color-primary)' }}>
            <div className="flex items-start gap-2">
              <Shield size={15} className="flex-shrink-0 mt-0.5" style={{ color: 'var(--color-primary)' }} />
              <div>
                <p className="text-xs font-bold" style={{ color: 'var(--color-primary)' }}>{t('help.privacy')}</p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>{t('help.privacyDesc')}</p>
              </div>
            </div>
          </section>

        </div>

        {/* Footer */}
        <div className="sticky bottom-0 px-5 py-4 border-t flex gap-2"
          style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
          <button type="button" onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border text-sm font-semibold"
            style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-muted)', background: 'none', cursor: 'pointer' }}>
            {t('help.close')}
          </button>
          <button type="button" onClick={() => { onClose(); navigate('/help') }}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-1.5"
            style={{ backgroundColor: 'var(--color-primary)', border: 'none', cursor: 'pointer' }}>
            <ExternalLink size={14} />
            {t('help.openGuide')}
          </button>
        </div>
      </div>
    </div>
  )
}
