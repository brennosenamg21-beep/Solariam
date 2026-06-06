type StatBoxProps = {
  label: string
  value: string | number
  sublabel?: string
  highlight?: boolean
}

export function StatBox({ label, value, sublabel, highlight = false }: StatBoxProps) {
  return (
    <div
      className={`flex flex-col items-center rounded-md border px-3 py-2 text-center ${
        highlight
          ? 'border-solariam-gold/50 bg-solariam-gold/10 shadow-glow'
          : 'border-solariam-border bg-solariam-night/60'
      }`}
    >
      <span className="text-[10px] font-semibold uppercase tracking-wider text-solariam-mist">
        {label}
      </span>
      <span className="font-display text-2xl font-bold text-solariam-parchment">{value}</span>
      {sublabel && <span className="text-xs text-solariam-mist">{sublabel}</span>}
    </div>
  )
}
