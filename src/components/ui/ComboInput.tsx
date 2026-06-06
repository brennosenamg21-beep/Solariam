import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

type ComboInputProps = {
  value: string
  onChange: (value: string) => void
  options: string[]
  placeholder?: string
  className?: string
}

export function ComboInput({
  value,
  onChange,
  options,
  placeholder,
  className = '',
}: ComboInputProps) {
  const [open, setOpen] = useState(false)
  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({})
  const wrapperRef = useRef<HTMLDivElement>(null)

  const filteredOptions = useMemo(() => {
    const query = value.trim().toLowerCase()
    if (!query) return options
    return options.filter((o) => o.toLowerCase().includes(query))
  }, [options, value])

  // Recalcula posição sempre que abre
  useEffect(() => {
    if (!open || !wrapperRef.current) return

    const rect = wrapperRef.current.getBoundingClientRect()
    const spaceBelow = window.innerHeight - rect.bottom
    const spaceAbove = rect.top
    const dropdownHeight = Math.min(filteredOptions.length * 40, 176) // max-h-44

    const showAbove = spaceBelow < dropdownHeight + 8 && spaceAbove > dropdownHeight

    setDropdownStyle({
      position: 'fixed',
      left: rect.left,
      width: rect.width,
      zIndex: 9999,
      ...(showAbove
        ? { bottom: window.innerHeight - rect.top + 4 }
        : { top: rect.bottom + 4 }),
    })
  }, [open, filteredOptions.length])

  // Fecha ao clicar fora
  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  const dropdown = (
    <div
      style={dropdownStyle}
      className="max-h-44 overflow-auto rounded border border-solariam-border bg-solariam-void shadow-panel"
      role="listbox"
    >
      {filteredOptions.map((option) => (
        <button
          key={option}
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => {
            onChange(option)
            setOpen(false)
          }}
          className="block w-full px-3 py-2 text-left text-sm text-solariam-parchment hover:bg-solariam-gold/15 hover:text-solariam-gold-light"
          role="option"
        >
          {option}
        </button>
      ))}
    </div>
  )

  return (
    <div ref={wrapperRef} className="relative">
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onFocus={() => setOpen(true)}
        onChange={(e) => {
          onChange(e.target.value)
          setOpen(true)
        }}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        className={`w-full rounded border border-solariam-border bg-solariam-night px-3 py-2 text-solariam-parchment placeholder:text-solariam-mist/50 outline-none transition focus:border-solariam-gold focus:ring-1 focus:ring-solariam-gold/30 ${className}`}
        aria-autocomplete="list"
        aria-expanded={open}
      />
      {open && filteredOptions.length > 0 && createPortal(dropdown, document.body)}
    </div>
  )
}
