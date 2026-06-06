import { SettingsProvider } from './hooks/useSettings.tsx'
import { CharacterSheet } from './components/CharacterSheet'
import { SettingsPanel } from './components/ui/SettingsPanel'

export default function App() {
  return (
    <SettingsProvider>
      <div className="min-h-screen bg-solariam-void bg-starfield">
        <div className="pointer-events-none fixed inset-0 bg-gradient-to-b from-solariam-gold/5 via-transparent to-solariam-frost/5" />
        <main className="relative px-4 py-8 md:px-8 md:py-12">
          <CharacterSheet />
        </main>
        <SettingsPanel />
      </div>
    </SettingsProvider>
  )
}