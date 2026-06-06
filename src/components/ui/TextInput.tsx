type TextInputProps = {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export function TextInput({ value, onChange, placeholder, className = '' }: TextInputProps) {
  return (
    <input
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full rounded border border-solariam-border bg-solariam-night px-3 py-2 text-solariam-parchment placeholder:text-solariam-mist/50 outline-none transition focus:border-solariam-gold focus:ring-1 focus:ring-solariam-gold/30 ${className}`}
    />
  )
}
