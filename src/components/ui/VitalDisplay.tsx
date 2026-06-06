import { useRef } from 'react'
import type { DisplayMode } from '../../types/settings'

// ─── Barra interativa clicável ────────────────────────────────────────────────
interface ClickableBarProps {
  current: number
  max: number
  color: 'gold' | 'frost' | 'ember'
  onChangeCurrent: (value: number) => void
}

export function ClickableBar({ current, max, color, onChangeCurrent }: ClickableBarProps) {
  const barRef = useRef<HTMLDivElement>(null)

  const pct = max > 0 ? Math.min(100, (current / max) * 100) : 0

  const colorMap = {
    gold: {
      fill: 'bg-gradient-to-r from-solariam-gold to-solariam-gold-light',
      glow: 'shadow-[0_0_8px_rgba(201,162,39,0.6)]',
      track: 'bg-solariam-night border-solariam-gold/20',
    },
    frost: {
      fill: 'bg-gradient-to-r from-solariam-frost to-solariam-gold-light',
      glow: 'shadow-[0_0_8px_rgba(91,143,212,0.6)]',
      track: 'bg-solariam-night border-solariam-frost/20',
    },
    ember: {
      fill: 'bg-gradient-to-r from-solariam-ember to-solariam-gold',
      glow: 'shadow-[0_0_8px_rgba(212,90,42,0.6)]',
      track: 'bg-solariam-night border-solariam-ember/20',
    },
  }

  const c = colorMap[color]

  function handleClick(e: React.MouseEvent<HTMLDivElement>) {
    if (!barRef.current || max <= 0) return
    const rect = barRef.current.getBoundingClientRect()
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
    onChangeCurrent(Math.round(ratio * max))
  }

  return (
    <div
      ref={barRef}
      onClick={handleClick}
      title={`Clique para ajustar: ${current}/${max}`}
      className={`relative h-5 w-full cursor-pointer overflow-hidden rounded-full border ${c.track} select-none`}
    >
      <div
        className={`h-full rounded-full transition-all duration-200 ${c.fill} ${pct > 0 ? c.glow : ''}`}
        style={{ width: `${pct}%` }}
      />
      {/* Label centralizado */}
      <span className="pointer-events-none absolute inset-0 flex items-center justify-center text-[11px] font-bold text-white/80 drop-shadow">
        {current} / {max}
      </span>
    </div>
  )
}

// ─── VitalDisplay principal ───────────────────────────────────────────────────
interface VitalDisplayProps {
  label: string
  current: number
  max: number
  temporary: number
  icon: React.ReactNode
  color: 'gold' | 'frost' | 'ember'
  displayMode: DisplayMode
  onChangeCurrent: (value: number) => void
  onChangeTemporary: (value: number) => void
}

export function VitalDisplay({
  label,
  current,
  max,
  temporary,
  icon,
  color,
  displayMode,
  onChangeCurrent,
  onChangeTemporary,
}: VitalDisplayProps) {
  const isAtma = color === 'ember'
  const temporaryLabel = isAtma ? 'Atma Temporária' : 'Vida Temporária'

  const colorText = {
    gold: 'text-solariam-gold-light',
    frost: 'text-solariam-frost',
    ember: 'text-solariam-ember',
  }[color]

  if (displayMode === 'symbols') {
    return (
      <div className="flex flex-col gap-3 rounded-lg border border-solariam-border/40 bg-solariam-night/40 p-3">
        {/* Título + ícone */}
        <div className="flex items-center gap-2">
          <span className={`text-2xl ${colorText}`}>{icon}</span>
          <span className="font-display text-sm font-semibold uppercase tracking-wider text-solariam-mist">
            {label}
          </span>
        </div>

        {/* Valor grande */}
        <div className="flex items-baseline gap-1">
          <input
            type="number"
            value={current}
            onChange={(e) => onChangeCurrent(Math.max(0, Math.min(max, Number(e.target.value))))}
            min={0}
            max={max}
            className={`w-20 rounded border border-solariam-border bg-solariam-void px-2 py-1 text-center font-display text-2xl font-bold ${colorText} outline-none focus:border-solariam-gold`}
          />
          <span className="text-solariam-mist">/</span>
          <span className={`font-display text-xl font-semibold ${colorText}`}>{max}</span>
        </div>

        {/* Temporário */}
        <label className="flex items-center gap-2">
          <span className="text-xs text-solariam-mist">{temporaryLabel}</span>
          <input
            type="number"
            value={temporary}
            onChange={(e) => onChangeTemporary(Math.max(0, Number(e.target.value)))}
            min={0}
            className="w-16 rounded border border-solariam-border bg-solariam-void px-2 py-1 text-center text-sm text-solariam-parchment outline-none focus:border-solariam-gold"
          />
        </label>
      </div>
    )
  }

  // Modo barras (padrão)
  return (
    <div className="flex flex-col gap-2 rounded-lg border border-solariam-border/40 bg-solariam-night/40 p-3">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5">
          <span className={`text-lg ${colorText}`}>{icon}</span>
          <span className="font-display text-xs font-semibold uppercase tracking-wider text-solariam-mist">
            {label}
          </span>
        </span>
        <span className={`font-display text-sm font-bold ${colorText}`}>
          {current} / {max}
        </span>
      </div>

      {/* Barra clicável */}
      <ClickableBar
        current={current}
        max={max}
        color={color}
        onChangeCurrent={onChangeCurrent}
      />

      {/* Input numérico de ajuste fino */}
      <div className="flex items-center gap-2">
        <input
          type="number"
          value={current}
          onChange={(e) => onChangeCurrent(Math.max(0, Math.min(max, Number(e.target.value))))}
          min={0}
          max={max}
          className="w-20 rounded border border-solariam-border bg-solariam-void px-2 py-1 text-center text-sm text-solariam-parchment outline-none focus:border-solariam-gold"
        />
        <span className="text-xs text-solariam-mist">{temporaryLabel}</span>
        <input
          type="number"
          value={temporary}
          onChange={(e) => onChangeTemporary(Math.max(0, Number(e.target.value)))}
          min={0}
          className="w-16 rounded border border-solariam-border bg-solariam-void px-2 py-1 text-center text-sm text-solariam-parchment outline-none focus:border-solariam-gold"
        />
      </div>
    </div>
  )
}

// ─── DefenseDisplay ───────────────────────────────────────────────────────────
interface DefenseDisplayProps {
  value: number
  breakdown: { base: number; agilidade: number; armor: number; shield: number }
  displayMode: DisplayMode
}

export function DefenseDisplay({ value, breakdown, displayMode }: DefenseDisplayProps) {
  if (displayMode === 'symbols') {
    return (
      <div className="mb-3 flex flex-col items-center gap-2">
        <div className="flex items-center gap-3">
          <span className="text-4xl text-solariam-gold-light drop-shadow-[0_0_8px_rgba(201,162,39,0.8)]">
            🛡
          </span>
          <div>
            <div className="font-display text-3xl font-bold text-solariam-gold-light">
              {value}
            </div>
            <div className="text-xs text-solariam-mist">Defesa</div>
          </div>
        </div>
        <details className="w-full">
          <summary className="cursor-pointer text-xs text-solariam-mist hover:text-solariam-gold">
            Ver composição
          </summary>
          <BreakdownRow breakdown={breakdown} />
        </details>
      </div>
    )
  }

  return (
    <div className="mb-3 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5">
          <span className="text-lg text-solariam-gold-light">🛡</span>
          <span className="font-display text-xs font-semibold uppercase tracking-wider text-solariam-mist">
            Defesa
          </span>
        </span>
        <span className="font-display text-2xl font-bold text-solariam-gold-light">{value}</span>
      </div>
      <BreakdownRow breakdown={breakdown} />
    </div>
  )
}

function BreakdownRow({
  breakdown,
}: {
  breakdown: { base: number; agilidade: number; armor: number; shield: number }
}) {
  return (
    <div className="flex flex-wrap items-center gap-1.5 text-sm">
      <Chip label="Base" value={breakdown.base} />
      <span className="text-solariam-mist">+</span>
      <Chip label="AGI" value={breakdown.agilidade} signed />
      <span className="text-solariam-mist">+</span>
      <Chip label="Arm." value={breakdown.armor} signed />
      <span className="text-solariam-mist">+</span>
      <Chip label="Esc." value={breakdown.shield} signed />
      <span className="text-solariam-mist">=</span>
      <span className="font-display text-lg font-bold text-solariam-gold-light">
        {breakdown.base + breakdown.agilidade + breakdown.armor + breakdown.shield}
      </span>
    </div>
  )
}

function Chip({ label, value, signed }: { label: string; value: number; signed?: boolean }) {
  const display = signed ? (value >= 0 ? `+${value}` : `${value}`) : String(value)
  return (
    <span className="rounded border border-solariam-border bg-solariam-night px-2 py-1 text-xs">
      {label} {display}
    </span>
  )
}
