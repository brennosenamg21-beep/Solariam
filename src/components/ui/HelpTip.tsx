type HelpTipProps = {
  text: string
}

export function HelpTip({ text }: HelpTipProps) {
  return (
    <span className="group relative inline-flex">
      <span
        tabIndex={0}
        className="flex h-4 w-4 cursor-help items-center justify-center rounded-full border border-solariam-border bg-solariam-night text-[10px] font-bold text-solariam-mist"
        aria-label={text}
      >
        ?
      </span>
      <span className="pointer-events-none absolute left-1/2 top-6 z-20 hidden w-56 -translate-x-1/2 rounded border border-solariam-border bg-solariam-void px-3 py-2 text-left text-xs font-normal normal-case tracking-normal text-solariam-parchment shadow-panel group-hover:block group-focus-within:block">
        {text}
      </span>
    </span>
  )
}
