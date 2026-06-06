import type { ReactNode } from 'react'

type PanelProps = {
  title?: string
  children: ReactNode
  className?: string
  action?: ReactNode
}

export function Panel({ title, children, className = '', action }: PanelProps) {
  return (
    <section
      className={`rounded-lg border border-solariam-border bg-solariam-panel/80 shadow-panel backdrop-blur-sm ${className}`}
    >
      {title && (
        <header className="flex items-center justify-between border-b border-solariam-border/60 px-4 py-3">
          <h2 className="font-display text-sm font-semibold uppercase tracking-widest text-solariam-gold">
            {title}
          </h2>
          {action}
        </header>
      )}
      <div className="p-4">{children}</div>
    </section>
  )
}
