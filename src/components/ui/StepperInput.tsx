type StepperInputProps = {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  className?: string
}

export function StepperInput({
  value,
  onChange,
  min = Number.NEGATIVE_INFINITY,
  max = Number.POSITIVE_INFINITY,
  className = '',
}: StepperInputProps) {
  const clamp = (nextValue: number) => Math.min(max, Math.max(min, nextValue))

  return (
    <div className={`flex overflow-hidden rounded border border-solariam-border bg-solariam-night ${className}`}>
      <button
        type="button"
        onClick={() => onChange(clamp(value - 1))}
        className="w-9 border-r border-solariam-border text-solariam-mist hover:bg-solariam-panel hover:text-solariam-parchment"
      >
        -
      </button>
      <input
        type="number"
        value={value}
        min={min}
        max={max}
        onChange={(e) => onChange(clamp(Number(e.target.value)))}
        className="w-full bg-transparent px-2 py-1.5 text-center text-solariam-parchment outline-none"
      />
      <button
        type="button"
        onClick={() => onChange(clamp(value + 1))}
        className="w-9 border-l border-solariam-border text-solariam-mist hover:bg-solariam-panel hover:text-solariam-parchment"
      >
        +
      </button>
    </div>
  )
}
