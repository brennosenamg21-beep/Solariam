import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from 'react'
import { Settings, ThemeName, DEFAULT_SETTINGS, THEMES } from '../types/settings'

type SettingsContextType = {
  settings: Settings
  updateSettings: (patch: Partial<Settings>) => void
  resetSettings: () => void
}

const SettingsContext = createContext<SettingsContextType | null>(null)

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('solariam-settings')
      if (saved) {
        try {
          return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) }
        } catch {
          return DEFAULT_SETTINGS
        }
      }
    }
    return DEFAULT_SETTINGS
  })

  useEffect(() => {
    localStorage.setItem('solariam-settings', JSON.stringify(settings))
    applyTheme(settings.theme)
  }, [settings])

  const applyTheme = (themeName: ThemeName) => {
    const theme = THEMES[themeName]
    const root = document.documentElement
    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--solariam-${key}`, value)
    })
    // Also update data attribute for Tailwind
    document.documentElement.setAttribute('data-theme', themeName)
  }

  const updateSettings = (patch: Partial<Settings>) => {
    setSettings((prev) => ({ ...prev, ...patch }))
  }

  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS)
  }

  const value = useMemo(() => ({ settings, updateSettings, resetSettings }), [settings])

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettings() {
  const context = useContext(SettingsContext)
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider')
  }
  return context
}