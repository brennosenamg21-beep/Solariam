import { useState } from 'react'
import { useSettings } from '../../hooks/useSettings.tsx'
import type { ThemeName, MovementUnit, DisplayMode } from '../../types/settings'
import { THEMES } from '../../types/settings'
import { Panel } from './Panel'

const MOVEMENT_UNIT_OPTIONS: { value: MovementUnit; label: string }[] = [
  { value: 'meters', label: 'Metros (m)' },
  { value: 'feet', label: 'Feet (ft)' },
]

const DISPLAY_MODE_OPTIONS: { value: DisplayMode; label: string }[] = [
  { value: 'bars', label: 'Barras de progresso' },
  { value: 'symbols', label: 'Símbolos (♥ / 🔥 / 🛡)' },
]

const THEME_OPTIONS: { value: ThemeName; label: string }[] = Object.entries(THEMES).map(([key, theme]) => ({
  value: key as ThemeName,
  label: theme.label,
}))

export function SettingsPanel() {
  const { settings, updateSettings, resetSettings } = useSettings()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 right-4 z-50 rounded-lg border border-solariam-border bg-solariam-panel/90 p-2 shadow-panel backdrop-blur-sm text-solariam-mist hover:text-solariam-gold hover:border-solariam-gold/50 transition"
        aria-label="Configurações"
        aria-expanded={isOpen}
      >
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
      )}

      {isOpen && (
        <div className="fixed top-4 right-4 z-50 w-full max-w-md animate-slide-in">
          <Panel title="Configurações" className="shadow-panel">
            <div className="space-y-6">
              {/* Tema */}
              <section>
                <h3 className="mb-3 font-display text-xs font-semibold uppercase tracking-widest text-solariam-gold">
                  Tema de Cores
                </h3>
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {THEME_OPTIONS.map(({ value, label }) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => updateSettings({ theme: value })}
                      className={`relative rounded-lg border-2 p-3 text-left transition ${
                        settings.theme === value
                          ? 'border-solariam-gold bg-solariam-gold/10 shadow-glow'
                          : 'border-solariam-border bg-solariam-night/50 hover:border-solariam-gold/30'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="flex h-3 w-3 items-center justify-center rounded"
                          style={{ backgroundColor: THEMES[value].colors.gold }}
                        >
                          {settings.theme === value && (
                            <svg className="h-2 w-2 text-solariam-void" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                        <span className="font-medium text-solariam-parchment">{label}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </section>

              {/* Unidade de Movimento */}
              <section className="border-t border-solariam-border/40 pt-4">
                <h3 className="mb-3 font-display text-xs font-semibold uppercase tracking-widest text-solariam-gold">
                  Unidade de Movimento
                </h3>
                <div className="grid gap-2 sm:grid-cols-2">
                  {MOVEMENT_UNIT_OPTIONS.map(({ value, label }) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => updateSettings({ movementUnit: value })}
                      className={`rounded-lg border-2 p-3 text-left transition ${
                        settings.movementUnit === value
                          ? 'border-solariam-gold bg-solariam-gold/10 shadow-glow'
                          : 'border-solariam-border bg-solariam-night/50 hover:border-solariam-gold/30'
                      }`}
                    >
                      <span className="font-medium text-solariam-parchment">{label}</span>
                      {settings.movementUnit === value && (
                        <span className="ml-2 text-solariam-gold">✓</span>
                      )}
                    </button>
                  ))}
                </div>
              </section>

              {/* Modo de Exibição PV/PA/Defesa */}
              <section className="border-t border-solariam-border/40 pt-4">
                <h3 className="mb-3 font-display text-xs font-semibold uppercase tracking-widest text-solariam-gold">
                  Exibição de Vida, Atma e Defesa
                </h3>
                <div className="grid gap-2 sm:grid-cols-2">
                  {DISPLAY_MODE_OPTIONS.map(({ value, label }) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => updateSettings({ displayMode: value })}
                      className={`rounded-lg border-2 p-3 text-left transition ${
                        settings.displayMode === value
                          ? 'border-solariam-gold bg-solariam-gold/10 shadow-glow'
                          : 'border-solariam-border bg-solariam-night/50 hover:border-solariam-gold/30'
                      }`}
                    >
                      <span className="font-medium text-solariam-parchment">{label}</span>
                      {settings.displayMode === value && (
                        <span className="ml-2 text-solariam-gold">✓</span>
                      )}
                    </button>
                  ))}
                </div>
              </section>

              {/* Reset */}
              <section className="border-t border-solariam-border/40 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    if (confirm('Tem certeza que deseja restaurar as configurações padrão?')) {
                      resetSettings()
                    }
                  }}
                  className="w-full rounded border border-solariam-ember bg-solariam-ember/10 px-4 py-2 text-sm font-medium text-solariam-ember hover:bg-solariam-ember/20 transition"
                >
                  Restaurar Padrões
                </button>
              </section>
            </div>
          </Panel>
        </div>
      )}
    </div>
  )
}