type NumberInputProps = {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  className?: string
}

export function NumberInput({ value, onChange, min, max, className = '' }: NumberInputProps) {
  return (
    <input
      type="number"
      value={value}
      min={min}
      max={max}
      onChange={(e) => onChange(Number(e.target.value))}
      className={`w-full rounded border border-solariam-border bg-solariam-night px-2 py-1.5 text-center text-solariam-parchment outline-none transition focus:border-solariam-gold focus:ring-1 focus:ring-solariam-gold/30 ${className}`}
    />
  )
}
