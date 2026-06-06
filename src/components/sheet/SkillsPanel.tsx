import type { AttributeKey, Character } from '../../types/character'
import { ATTRIBUTE_ABBREV } from '../../types/character'
import { ALL_ATTRIBUTE_KEYS, calculateSkillTotal, formatSkillTotal } from '../../lib/calculations'
import { Panel } from '../ui/Panel'

type SkillsPanelProps = {
  character: Character
  onUpdate: (patch: Partial<Character>) => void
  onUpdateSkill: (id: string, patch: Partial<Character['skills'][number]>) => void
}

export function SkillsPanel({ character, onUpdate, onUpdateSkill }: SkillsPanelProps) {
  return (
    <Panel title="Perícias">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <p className="text-sm text-solariam-mist">
          <span className="font-medium text-solariam-parchment">Total</span> = Atributo + Treino +
          Outros
          {character.armorPenalty > 0 && (
            <span> − Penalidade de armadura (perícias com +)</span>
          )}
        </p>
        <label className="flex items-center gap-2">
          <span className="text-xs uppercase tracking-wider text-solariam-mist">
            Penalidade de armadura
          </span>
          <input
            type="number"
            value={character.armorPenalty}
            onChange={(e) =>
              onUpdate({ armorPenalty: Math.max(0, Number(e.target.value)) })
            }
            className="w-14 rounded border border-solariam-border bg-solariam-night px-2 py-1 text-center text-sm text-solariam-parchment outline-none focus:border-solariam-gold"
            min={0}
            placeholder="Ex: 2"
          />
          <span className="text-xs text-solariam-mist" title="Valor positivo que será subtraído das perícias com +">(subtrai)</span>
        </label>
      </div>

      <div className="mb-2 hidden gap-2 px-2 text-[10px] font-semibold uppercase tracking-wider text-solariam-mist lg:grid lg:grid-cols-[28px_1fr_56px_20px_72px_20px_56px_20px_56px]">
        <span />
        <span>Perícia</span>
        <span className="text-center">Total</span>
        <span />
        <span className="text-center">Atributo</span>
        <span />
        <span className="text-center">Treino</span>
        <span />
        <span className="text-center">Outros</span>
      </div>

      <div className="space-y-1">
        {character.skills.map((skill) => {
          const attrValue = character.attributes[skill.attribute]
          const total = calculateSkillTotal(skill, attrValue, character.armorPenalty)
          const displayName =
            skill.id.startsWith('oficio') && skill.customName
              ? `${skill.name} (${skill.customName})`
              : skill.name

          return (
            <div
              key={skill.id}
              className="rounded-md border border-solariam-border/40 bg-solariam-night/30 px-2 py-2 lg:grid lg:grid-cols-[28px_1fr_56px_20px_72px_20px_56px_20px_56px] lg:items-center lg:gap-2 lg:py-1.5"
            >
              <input
                type="checkbox"
                checked={skill.trained}
                onChange={(e) => onUpdateSkill(skill.id, { trained: e.target.checked })}
                className="h-4 w-4 accent-solariam-gold"
                title="Treinada"
              />

              <div className="min-w-0 py-1 lg:py-0">
                <span className="font-medium text-solariam-parchment">
                  {displayName}
                  {skill.armorPenaltyApplies && (
                    <sup className="ml-0.5 text-solariam-ember" title="Penalidade de armadura">
                      +
                    </sup>
                  )}
                  {skill.trainedOnly && (
                    <sup className="ml-0.5 text-solariam-frost" title="Somente treinada">
                      *
                    </sup>
                  )}
                </span>
                {skill.id.startsWith('oficio') && (
                  <input
                    type="text"
                    value={skill.customName ?? ''}
                    onChange={(e) => onUpdateSkill(skill.id, { customName: e.target.value })}
                    placeholder="Especificar ofício..."
                    className="mt-1 w-full rounded border border-solariam-border/60 bg-solariam-night px-2 py-0.5 text-xs text-solariam-parchment outline-none focus:border-solariam-gold lg:mt-0.5"
                  />
                )}
              </div>

              <div className="mt-2 flex items-center gap-2 lg:mt-0 lg:contents">
                <span className="text-[10px] uppercase text-solariam-mist lg:hidden">Total</span>
                <span
                  className={`flex h-9 w-14 items-center justify-center rounded border font-display text-lg font-bold lg:h-9 ${
                    total === null
                      ? 'border-solariam-border/40 text-solariam-mist'
                      : 'border-solariam-gold/40 bg-solariam-gold/10 text-solariam-gold-light'
                  }`}
                >
                  {formatSkillTotal(total)}
                </span>

                <span className="hidden text-solariam-mist lg:inline">=</span>

                <select
                  value={skill.attribute}
                  onChange={(e) =>
                    onUpdateSkill(skill.id, { attribute: e.target.value as AttributeKey })
                  }
                  className="rounded border border-solariam-border bg-solariam-night px-1 py-1.5 text-center text-sm font-semibold text-solariam-parchment outline-none focus:border-solariam-gold"
                  title="Atributo"
                >
                  {ALL_ATTRIBUTE_KEYS.map((key) => (
                    <option key={key} value={key}>
                      {ATTRIBUTE_ABBREV[key]}
                    </option>
                  ))}
                </select>

                <span className="hidden text-solariam-mist lg:inline">+</span>

                <input
                  type="number"
                  value={skill.training}
                  onChange={(e) =>
                    onUpdateSkill(skill.id, { training: Number(e.target.value) })
                  }
                  className="w-14 rounded border border-solariam-border bg-solariam-night px-2 py-1.5 text-center text-sm text-solariam-parchment outline-none focus:border-solariam-gold"
                  title="Treino"
                />

                <span className="hidden text-solariam-mist lg:inline">+</span>

                <input
                  type="number"
                  value={skill.others}
                  onChange={(e) => onUpdateSkill(skill.id, { others: Number(e.target.value) })}
                  className="w-14 rounded border border-solariam-border bg-solariam-night px-2 py-1.5 text-center text-sm text-solariam-parchment outline-none focus:border-solariam-gold"
                  title="Outros"
                />

                <span className="text-xs text-solariam-mist lg:hidden">
                  {ATTRIBUTE_ABBREV[skill.attribute]} ({attrValue})
                </span>
              </div>
            </div>
          )
        })}
      </div>

      <footer className="mt-4 border-t border-solariam-border/40 pt-3 text-xs text-solariam-mist">
        <sup className="text-solariam-ember">+</sup> Penalidade de armadura &nbsp;·&nbsp;
        <sup className="text-solariam-frost">*</sup> Somente treinada (sem treino = não aplicável)
      </footer>
    </Panel>
  )
}
