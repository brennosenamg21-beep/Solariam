import type { AttributeKey, Character } from '../../types/character'
import {
  ATTRIBUTE_ABBREV,
  ATTRIBUTE_LABELS,
  ATTRIBUTE_MAX,
  ATTRIBUTE_MIN,
} from '../../types/character'
import { ATTRIBUTE_DESCRIPTIONS } from '../../data/attributes'
import { ALL_ATTRIBUTE_KEYS, formatSigned } from '../../lib/calculations'
import { Panel } from '../ui/Panel'

type AttributesPanelProps = {
  character: Character
  onUpdateAttribute: (key: AttributeKey, value: number) => void
}

export function AttributesPanel({ character, onUpdateAttribute }: AttributesPanelProps) {
  return (
    <Panel title="Atributos">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-2">
        {ALL_ATTRIBUTE_KEYS.map((key) => {
          const value = character.attributes[key]

          return (
            <article
              key={key}
              title={ATTRIBUTE_DESCRIPTIONS[key]}
              className="relative flex min-h-[132px] flex-col items-center justify-between rounded-md border border-solariam-gold/40 bg-solariam-night px-3 py-3 text-center shadow-glow"
            >
              <div>
                <span className="block text-[10px] font-semibold uppercase tracking-wider text-solariam-mist">
                  {ATTRIBUTE_LABELS[key]}
                </span>
                <span className="font-display text-xs font-bold text-solariam-gold">
                  {ATTRIBUTE_ABBREV[key]}
                </span>
              </div>

              <input
                type="number"
                value={value}
                min={ATTRIBUTE_MIN}
                max={ATTRIBUTE_MAX}
                onChange={(e) => onUpdateAttribute(key, Number(e.target.value))}
                className="h-14 w-20 rounded border border-solariam-border bg-solariam-void text-center font-display text-3xl font-bold text-solariam-parchment outline-none focus:border-solariam-gold focus:ring-1 focus:ring-solariam-gold/30"
                aria-label={ATTRIBUTE_LABELS[key]}
              />

              <div className="rounded-full border border-solariam-gold/50 bg-solariam-panel px-4 py-1 font-display text-lg font-bold text-solariam-gold-light">
                {formatSigned(value)}
              </div>
            </article>
          )
        })}
      </div>
    </Panel>
  )
}
