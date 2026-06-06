import type { DisplayMode } from '../../types/settings'

interface VitalDisplayProps {
  label: string
  current: number
  max: number
  icon: React.ReactNode
  color: 'gold' | 'frost' | 'ember'
  displayMode: DisplayMode
  onChangeCurrent?: (value: number) => void
  onChangeMax?: (value: number) => void
  editable?: boolean
}

export function VitalDisplay({
  label,
  current,
  max,
  icon,
  color,
  displayMode,
  onChangeCurrent,
  onChangeMax,
  editable = false,
}: VitalDisplayProps) {
  const percentage = max > 0 ? Math.min(100, (current / max) * 100) : 0

  const colorClasses = {
    gold: {
      bar: 'bg-gradient-to-r from-solariam-gold to-solariam-gold-light',
      text: 'text-solariam-gold-light',
      border: 'border-solariam-gold/50',
      glow: 'shadow-[0_0_10px_rgba(201,162,39,0.5)]',
    },
    frost: {
      bar: 'bg-gradient-to-r from-solariam-frost to-solariam-gold-light',
      text: 'text-solariam-frost',
      border: 'border-solariam-frost/50',
      glow: 'shadow-[0_0_10px_rgba(91,143,212,0.5)]',
    },
    ember: {
      bar: 'bg-gradient-to-r from-solariam-ember to-solariam-gold',
      text: 'text-solariam-ember',
      border: 'border-solariam-ember/50',
      glow: 'shadow-[0_0_10px_rgba(212,90,42,0.5)]',
    },
  }

  const c = colorClasses[color]

  if (displayMode === 'symbols') {
    return (
      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center gap-2">
          <span className={`text-3xl ${c.text} drop-shadow-[0_0_8px_currentColor]`}>
            {icon}
          </span>
          <div className="text-right">
            <div className={`font-display text-xl font-bold ${c.text}`}>
              {current} / {max}
            </div>
            <div className="text-xs text-solariam-mist">{label}</div>
          </div>
        </div>
        {editable && onChangeCurrent && (
          <input
            type="number"
            value={current}
            onChange={(e) => onChangeCurrent(Math.max(0, Math.min(max, Number(e.target.value))))}
            min={0}
            max={max}
            className="w-20 rounded border border-solariam-border bg-solariam-night px-2 py-1 text-center text-solariam-parchment outline-none focus:border-solariam-gold"
          />
        )}
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5">
          <span className={`text-lg ${c.text}`}>{icon}</span>
          <span className="font-medium text-solariam-parchment">{label}</span>
        </span>
        <span className={`font-display text-sm font-bold ${c.text}`}>
          {current} / {max}
        </span>
      </div>
      <div className="relative h-3 w-full rounded-full bg-solariam-night/50 border border-solariam-border/30 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-300 ${c.bar} ${c.glow}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {editable && onChangeCurrent && (
        <input
          type="number"
          value={current}
          onChange={(e) => onChangeCurrent(Math.max(0, Math.min(max, Number(e.target.value))))}
          min={0}
          max={max}
          className="w-20 rounded border border-solariam-border bg-solariam-night px-2 py-1 text-center text-solariam-parchment outline-none focus:border-solariam-gold"
        />
      )}
    </div>
  )
}

interface DefenseDisplayProps {
  value: number
  breakdown: {
    base: number
    agilidade: number
    armor: number
    shield: number
  }
  displayMode: DisplayMode
}

export function DefenseDisplay({ value, breakdown, displayMode }: DefenseDisplayProps) {
  const colorClasses = {
    bar: 'bg-gradient-to-r from-solariam-gold to-solariam-gold-light',
    text: 'text-solariam-gold-light',
    border: 'border-solariam-gold/50',
    glow: 'shadow-[0_0_10px_rgba(201,162,39,0.5)]',
  }

  if (displayMode === 'symbols') {
    return (
      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center gap-2">
          <span className="text-3xl text-solariam-gold-light drop-shadow-[0_0_8px_rgba(201,162,39,0.8)]">
            🛡
          </span>
          <div className="text-right">
            <div className="font-display text-2xl font-bold text-solariam-gold-light">
              {value}
            </div>
            <div className="text-xs text-solariam-mist">Defesa</div>
          </div>
        </div>
        <details className="w-full">
          <summary className="cursor-pointer text-xs text-solariam-mist hover:text-solariam-gold">
            Detalhes
          </summary>
          <div className="mt-2 grid grid-cols-4 gap-2 text-center text-xs">
            <div className="rounded border border-solariam-border bg-solariam-night p-1.5">
              <div className="text-solariam-mist">Base</div>
              <div className="font-bold text-solariam-parchment">{breakdown.base}</div>
            </div>
            <div className="rounded border border-solariam-border bg-solariam-night p-1.5">
              <div className="text-solariam-mist">AGI</div>
              <div className="font-bold text-solariam-parchment">{breakdown.agilidade >= 0 ? '+' : ''}{breakdown.agilidade}</div>
            </div>
            <div className="rounded border border-solariam-border bg-solariam-night p-1.5">
              <div className="text-solariam-mist">Arm.</div>
              <div className="font-bold text-solariam-parchment">{breakdown.armor >= 0 ? '+' : ''}{breakdown.armor}</div>
            </div>
            <div className="rounded border border-solariam-border bg-solariam-night p-1.5">
              <div className="text-solariam-mist">Esc.</div>
              <div className="font-bold text-solariam-parchment">{breakdown.shield >= 0 ? '+' : ''}{breakdown.shield}</div>
            </div>
          </div>
        </details>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5">
          <span className="text-lg text-solariam-gold-light">🛡</span>
          <span className="font-medium text-solariam-parchment">Defesa</span>
        </span>
        <span className="font-display text-xl font-bold text-solariam-gold-light">
          {value}
        </span>
      </div>
      <div className="mb-2 flex flex-wrap items-center gap-1.5 text-sm">
        <span className="rounded border border-solariam-border bg-solariam-night px-2 py-1">{breakdown.base}</span>
        <span className="text-solariam-mist">+</span>
        <span className="rounded border border-solariam-border bg-solariam-night px-2 py-1">
          AGI {breakdown.agilidade >= 0 ? '+' : ''}{breakdown.agilidade}
        </span>
        <span className="text-solariam-mist">+</span>
        <span className="rounded border border-solariam-border bg-solariam-night px-2 py-1">
          Arm. {breakdown.armor >= 0 ? '+' : ''}{breakdown.armor}
        </span>
        <span className="text-solariam-mist">+</span>
        <span className="rounded border border-solariam-border bg-solariam-night px-2 py-1">
          Esc. {breakdown.shield >= 0 ? '+' : ''}{breakdown.shield}
        </span>
        <span className="text-solariam-mist">=</span>
        <span className="font-display text-lg font-bold text-solariam-gold-light">{value}</span>
      </div>
    </div>
  )
}