export type TabId = 'ficha' | 'pericias' | 'inventario' | 'grimorio' | 'notas'

type Tab = {
  id: TabId
  label: string
}

const TABS: Tab[] = [
  { id: 'ficha', label: 'Ficha' },
  { id: 'pericias', label: 'Perícias' },
  { id: 'inventario', label: 'Inventário' },
  { id: 'grimorio', label: 'Grimório' },
  { id: 'notas', label: 'Notas' },
]

type TabNavProps = {
  active: TabId
  onChange: (tab: TabId) => void
}

export function TabNav({ active, onChange }: TabNavProps) {
  return (
    <nav className="flex flex-wrap gap-1 rounded-lg border border-solariam-border bg-solariam-night/80 p-1">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onChange(tab.id)}
          className={`rounded-md px-4 py-2 text-sm font-medium transition ${
            active === tab.id
              ? 'bg-solariam-gold/20 text-solariam-gold-light shadow-glow'
              : 'text-solariam-mist hover:bg-solariam-panel hover:text-solariam-parchment'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  )
}
