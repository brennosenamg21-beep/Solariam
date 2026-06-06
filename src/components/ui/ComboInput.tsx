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
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const filteredOptions = useMemo(() => {
    const query = value.trim().toLowerCase()
    if (!query) return options

    return options.filter((option) => option.toLowerCase().includes(query))
  }, [options, value])

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false)
      }
    }

    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  const dropdownContent = (
    <div
      ref={dropdownRef}
      className="z-[100] max-h-44 overflow-auto rounded border border-solariam-border bg-solariam-void p-1 shadow-panel"
      role="listbox"
    >
      {filteredOptions.map((option) => (
        <button
          key={option}
          type="button"
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => {
            onChange(option)
            setOpen(false)
          }}
          className="block w-full rounded px-3 py-2 text-left text-sm text-solariam-parchment hover:bg-solariam-gold/15 hover:text-solariam-gold-light"
          role="option"
        >
          {option}
        </button>
      ))}
    </div>
  )

  return (
    <div className="relative" ref={inputRef}>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onFocus={() => setOpen(true)}
        onBlur={() => window.setTimeout(() => setOpen(false), 120)}
        onChange={(e) => {
          onChange(e.target.value)
          setOpen(true)
        }}
        className={`w-full rounded border border-solariam-border bg-solariam-night px-3 py-2 text-solariam-parchment placeholder:text-solariam-mist/50 outline-none transition focus:border-solariam-gold focus:ring-1 focus:ring-solariam-gold/30 ${className}`}
        aria-autocomplete="list"
        aria-controls="combo-dropdown"
        aria-expanded={open}
      />
      {open && filteredOptions.length > 0 && createPortal(dropdownContent, document.body)}
    </div>
  )
}
