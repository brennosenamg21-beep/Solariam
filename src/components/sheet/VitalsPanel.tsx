import { useSettings } from '../../hooks/useSettings.tsx'
import type { Character, DamageReduction, MovementUnit, Resistance } from '../../types/character'
import {
  ATMA_BASE_PER_LEVEL,
  HP_BASE_PER_LEVEL,
  formatSigned,
  getAtmaPerLevel,
  getDefenseBreakdown,
  getEffectiveMovement,
  getHpPerLevel,
  getMovementSquares,
} from '../../lib/calculations'
import { ComboInput } from '../ui/ComboInput'
import { HelpTip } from '../ui/HelpTip'
import { NumberInput } from '../ui/NumberInput'
import { Panel } from '../ui/Panel'
import { StatBox } from '../ui/StatBox'
import { VitalDisplay, DefenseDisplay } from '../ui/VitalDisplay'

type VitalsPanelProps = {
  character: Character
  onUpdate: (patch: Partial<Character>) => void
}

function createDamageReduction(): DamageReduction {
  return {
    id: crypto.randomUUID(),
    type: 'geral',
    value: 0,
  }
}

function createResistance(): Resistance {
  return {
    id: crypto.randomUUID(),
    type: 'geral',
  }
}

export function VitalsPanel({ character, onUpdate }: VitalsPanelProps) {
  const { settings } = useSettings()
  const defense = getDefenseBreakdown(character)
  const hpPerLevel = getHpPerLevel(character.attributes.resistencia)
  const atmaPerLevel = getAtmaPerLevel(character.attributes.instinto)
  const effectiveMovement = getEffectiveMovement(character)
  const movementSquares = getMovementSquares(effectiveMovement, character.movementUnit)
  const damageTypeOptions = ['geral', 'template']

  const updateReduction = (id: string, patch: Partial<DamageReduction>) => {
    onUpdate({
      damageReductions: character.damageReductions.map((reduction) =>
        reduction.id === id ? { ...reduction, ...patch } : reduction,
      ),
    })
  }

  const removeReduction = (id: string) => {
    onUpdate({
      damageReductions: character.damageReductions.filter((reduction) => reduction.id !== id),
    })
  }

  const updateResistance = (id: string, patch: Partial<Resistance>) => {
    onUpdate({
      resistances: character.resistances.map((resistance) =>
        resistance.id === id ? { ...resistance, ...patch } : resistance,
      ),
    })
  }

  const removeResistance = (id: string) => {
    onUpdate({
      resistances: character.resistances.filter((resistance) => resistance.id !== id),
    })
  }

  return (
    <Panel title="Pontos de Vida, Atma e Defesa">
      <div className="space-y-6">
        <section>
          <div className="mb-3 flex items-center gap-2">
            <h3 className="font-display text-xs font-semibold uppercase tracking-widest text-solariam-gold">
              Pontos de Vida
            </h3>
            <HelpTip
              text={`${HP_BASE_PER_LEVEL} + RES (${formatSigned(
                character.attributes.resistencia,
              )}) por nível, multiplicado pelo nível, somando outros bônus.`}
            />
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <StatBox label="PV / Nível" value={hpPerLevel} />
            <StatBox label="PV Máximos" value={character.hp.max} highlight />
            <VitalDisplay
              label="PV Atuais"
              current={character.hp.current}
              max={character.hp.max}
              icon="♥"
              color="gold"
              displayMode={settings.displayMode}
              editable
              onChangeCurrent={(current) =>
                onUpdate({ hp: { ...character.hp, current: Math.max(0, current) } })
              }
            />
            <div className="flex flex-col gap-1">
              <span className="text-center text-[10px] font-semibold uppercase tracking-wider text-solariam-mist">
                Outros
              </span>
              <NumberInput
                value={character.hp.others}
                onChange={(others) => onUpdate({ hp: { ...character.hp, others } })}
              />
            </div>
          </div>
        </section>

        <section className="border-t border-solariam-border/40 pt-4">
          <div className="mb-3 flex items-center gap-2">
            <h3 className="font-display text-xs font-semibold uppercase tracking-widest text-solariam-frost">
              Pontos de Atma
            </h3>
            <HelpTip
              text={`${ATMA_BASE_PER_LEVEL} + INS (${formatSigned(
                character.attributes.instinto,
              )}) por nível, multiplicado pelo nível, somando outros bônus.`}
            />
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <StatBox label="PA / Nível" value={atmaPerLevel} />
            <StatBox label="PA Máximos" value={character.atma.max} highlight />
            <VitalDisplay
              label="PA Atuais"
              current={character.atma.current}
              max={character.atma.max}
              icon="🔥"
              color="ember"
              displayMode={settings.displayMode}
              editable
              onChangeCurrent={(current) =>
                onUpdate({ atma: { ...character.atma, current: Math.max(0, current) } })
              }
            />
            <div className="flex flex-col gap-1">
              <span className="text-center text-[10px] font-semibold uppercase tracking-wider text-solariam-mist">
                Outros
              </span>
              <NumberInput
                value={character.atma.others}
                onChange={(others) => onUpdate({ atma: { ...character.atma, others } })}
              />
            </div>
          </div>
        </section>

        <section className="border-t border-solariam-border/40 pt-4">
          <div className="mb-3 flex items-center gap-2">
            <h3 className="font-display text-xs font-semibold uppercase tracking-widest text-solariam-gold">
              Defesa
            </h3>
            <HelpTip
              text={`10 + AGI (${formatSigned(defense.agilidade)}) + armadura + escudo.`}
            />
          </div>
          <DefenseDisplay
            value={defense.total}
            breakdown={{
              base: defense.base,
              agilidade: defense.agilidade,
              armor: defense.armor,
              shield: defense.shield,
            }}
            displayMode={settings.displayMode}
          />
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="flex flex-col gap-1">
              <span className="text-xs uppercase tracking-wider text-solariam-mist">Armadura</span>
              <NumberInput
                value={character.defense.armor}
                onChange={(armor) =>
                  onUpdate({ defense: { ...character.defense, armor: Math.max(0, armor) } })
                }
                min={0}
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-xs uppercase tracking-wider text-solariam-mist">Escudo</span>
              <NumberInput
                value={character.defense.shield}
                onChange={(shield) =>
                  onUpdate({ defense: { ...character.defense, shield: Math.max(0, shield) } })
                }
                min={0}
              />
            </label>
          </div>
        </section>

        <section className="border-t border-solariam-border/40 pt-4">
          <div className="mb-3 flex items-center gap-2">
            <h3 className="font-display text-xs font-semibold uppercase tracking-widest text-solariam-frost">
              Movimento
            </h3>
            <HelpTip text="Cada 1,5 metros ou 5 feet representa 1 quadrado. Reduções de movimento de armaduras equipadas entram no movimento efetivo." />
          </div>
          <div className="grid gap-3 sm:grid-cols-[1fr_1fr]">
            <label className="flex flex-col gap-1">
              <span className="text-xs uppercase tracking-wider text-solariam-mist">Base</span>
              <NumberInput
                value={character.movement}
                onChange={(movement) => onUpdate({ movement: Math.max(0, movement) })}
                min={0}
              />
            </label>
            <StatBox
              label="Movimento efetivo"
              value={`${effectiveMovement} ${settings.movementUnit === 'meters' ? 'm' : 'ft'}`}
              sublabel={`${movementSquares} quadrados`}
              highlight
            />
          </div>
        </section>

        <section className="border-t border-solariam-border/40 pt-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <h3 className="font-display text-xs font-semibold uppercase tracking-widest text-solariam-gold">
              Redução de Dano
            </h3>
            <button
              type="button"
              onClick={() =>
                onUpdate({
                  damageReductions: [...character.damageReductions, createDamageReduction()],
                })
              }
              className="rounded bg-solariam-gold/20 px-2 py-1 text-xs font-semibold text-solariam-gold hover:bg-solariam-gold/30"
            >
              + RD
            </button>
          </div>

          {character.damageReductions.length === 0 ? (
            <p className="text-sm text-solariam-mist">Nenhuma redução cadastrada.</p>
          ) : (
            <div className="space-y-2">
              {character.damageReductions.map((reduction) => (
                <div
                  key={reduction.id}
                  className="grid gap-2 rounded border border-solariam-border/40 bg-solariam-night/40 p-2 sm:grid-cols-[1fr_96px_auto]"
                >
                  <ComboInput
                    value={reduction.type}
                    onChange={(type) => updateReduction(reduction.id, { type })}
                    options={damageTypeOptions}
                    placeholder="Tipo de dano"
                  />
                  <NumberInput
                    value={reduction.value}
                    onChange={(value) =>
                      updateReduction(reduction.id, { value: Math.max(0, value) })
                    }
                    min={0}
                  />
                  <button
                    type="button"
                    onClick={() => removeReduction(reduction.id)}
                    className="rounded border border-solariam-border px-3 py-2 text-sm text-solariam-ember hover:border-solariam-ember"
                  >
                    Remover
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="border-t border-solariam-border/40 pt-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <h3 className="font-display text-xs font-semibold uppercase tracking-widest text-solariam-frost">
              Resistências
            </h3>
            <button
              type="button"
              onClick={() =>
                onUpdate({
                  resistances: [...character.resistances, createResistance()],
                })
              }
              className="rounded bg-solariam-frost/20 px-2 py-1 text-xs font-semibold text-solariam-frost hover:bg-solariam-frost/30"
            >
              + Resistência
            </button>
          </div>

          {character.resistances.length === 0 ? (
            <p className="text-sm text-solariam-mist">Nenhuma resistência cadastrada.</p>
          ) : (
            <div className="space-y-2">
              {character.resistances.map((resistance) => (
                <div
                  key={resistance.id}
                  className="grid gap-2 rounded border border-solariam-border/40 bg-solariam-night/40 p-2 sm:grid-cols-[1fr_auto]"
                >
                  <ComboInput
                    value={resistance.type}
                    onChange={(type) => updateResistance(resistance.id, { type })}
                    options={damageTypeOptions}
                    placeholder="Tipo de dano"
                  />
                  <button
                    type="button"
                    onClick={() => removeResistance(resistance.id)}
                    className="rounded border border-solariam-border px-3 py-2 text-sm text-solariam-ember hover:border-solariam-ember"
                  >
                    Remover
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </Panel>
  )
}