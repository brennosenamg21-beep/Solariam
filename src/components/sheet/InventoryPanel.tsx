import { useState } from 'react'
import type { ArmorDetails, Character, InventoryItem, ItemCategory, WeaponDetails } from '../../types/character'
import { calculateCarryLimit } from '../../lib/calculations'
import { ComboInput } from '../ui/ComboInput'
import { NumberInput } from '../ui/NumberInput'
import { Panel } from '../ui/Panel'
import { TextInput } from '../ui/TextInput'

type InventoryPanelProps = {
  character: Character
  onUpdate: (patch: Partial<Character>) => void
}

const CATEGORY_LABELS: Record<ItemCategory, string> = {
  misc: 'Miscellaneous',
  weapon: 'Arma',
  'armor-shield': 'Armadura ou escudo',
  'magic-focus': 'Foco de magia',
  consumable: 'Consumível',
}

const RANGE_OPTIONS = ['corpo a corpo', 'curto', 'médio', 'longo']
const PROPERTY_OPTIONS = ['template']

function createWeaponDetails(): WeaponDetails {
  return {
    damageDice: '',
    range: 'corpo a corpo',
    criticalFrom: 20,
    criticalTo: 20,
    criticalMultiplier: 2,
  }
}

function createArmorDetails(): ArmorDetails {
  return {
    damageReduction: 0,
    maxAgility: undefined,
    hasArmorPenalty: false,
    armorPenalty: 0,
    hasMovementReduction: false,
    movementReduction: 0,
    defenseBonus: 0,
  }
}

function createItem(): InventoryItem {
  return {
    id: crypto.randomUUID(),
    name: '',
    category: 'misc',
    quantity: 1,
    equipped: false,
    properties: [],
  }
}

function normalizeItemForCategory(item: InventoryItem, category: ItemCategory): InventoryItem {
  return {
    ...item,
    category,
    weapon: category === 'weapon' ? (item.weapon ?? createWeaponDetails()) : undefined,
    armor: category === 'armor-shield' ? (item.armor ?? createArmorDetails()) : undefined,
  }
}

export function InventoryPanel({ character, onUpdate }: InventoryPanelProps) {
  const [selectedId, setSelectedId] = useState<string | null>(
    character.inventory[0]?.id ?? null,
  )

  const selected = character.inventory.find((item) => item.id === selectedId)
  const totalWeight = character.inventory.reduce(
    (sum, item) => sum + (item.weight ?? 0) * item.quantity,
    0,
  )
  const carryLimit = calculateCarryLimit(character.attributes.forca)
  const overloaded = totalWeight > carryLimit

  const updateInventory = (inventory: InventoryItem[]) => {
    onUpdate({ inventory })
    if (!inventory.find((item) => item.id === selectedId)) {
      setSelectedId(inventory[0]?.id ?? null)
    }
  }

  const addItem = () => {
    const item = createItem()
    updateInventory([...character.inventory, item])
    setSelectedId(item.id)
  }

  const updateItem = (id: string, patch: Partial<InventoryItem>) => {
    updateInventory(
      character.inventory.map((item) => (item.id === id ? { ...item, ...patch } : item)),
    )
  }

  const replaceItem = (updatedItem: InventoryItem) => {
    updateInventory(character.inventory.map((item) => (item.id === updatedItem.id ? updatedItem : item)))
  }

  const removeItem = (id: string) => {
    updateInventory(character.inventory.filter((item) => item.id !== id))
  }

  const updateProperty = (item: InventoryItem, index: number, value: string) => {
    const properties = [...(item.properties ?? [])]
    properties[index] = value
    updateItem(item.id, { properties })
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[320px_1fr]">
      <Panel
        title="Inventário"
        action={
          <button
            type="button"
            onClick={addItem}
            className="rounded bg-solariam-gold/20 px-2 py-1 text-xs font-semibold text-solariam-gold hover:bg-solariam-gold/30"
          >
            + Item
          </button>
        }
      >
        <div className="mb-3 space-y-1 text-xs text-solariam-mist">
          <p>
            Carga: <span className="text-solariam-parchment">{totalWeight.toFixed(1)}</span> /{' '}
            <span className="text-solariam-parchment">{carryLimit}</span>
          </p>
          {overloaded && (
            <p className="font-semibold uppercase tracking-wider text-solariam-ember">
              Sobrecarregado
            </p>
          )}
        </div>

        {character.inventory.length === 0 ? (
          <p className="text-sm text-solariam-mist">Inventário vazio.</p>
        ) : (
          <ul className="space-y-1">
            {character.inventory.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => setSelectedId(item.id)}
                  className={`flex w-full items-center gap-2 rounded px-3 py-2 text-left text-sm transition ${
                    selectedId === item.id
                      ? 'bg-solariam-gold/20 text-solariam-gold-light'
                      : 'text-solariam-parchment hover:bg-solariam-night'
                  }`}
                >
                  <span
                    className={`h-2 w-2 rounded-full ${
                      item.equipped ? 'bg-solariam-gold' : 'bg-solariam-border'
                    }`}
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate">{item.name || 'Sem nome'}</span>
                    <span className="text-xs text-solariam-mist">{CATEGORY_LABELS[item.category]}</span>
                  </span>
                  <span className="text-xs text-solariam-mist">x{item.quantity}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </Panel>

      <Panel title="Detalhes do item">
        {selected ? (
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-1">
                <span className="text-xs uppercase tracking-wider text-solariam-mist">Nome</span>
                <TextInput
                  value={selected.name}
                  onChange={(name) => updateItem(selected.id, { name })}
                  placeholder="Nome do item"
                />
              </label>
              <label className="flex flex-col gap-1">
                <span className="text-xs uppercase tracking-wider text-solariam-mist">Tipo</span>
                <select
                  value={selected.category}
                  onChange={(event) =>
                    replaceItem(normalizeItemForCategory(selected, event.target.value as ItemCategory))
                  }
                  className="rounded border border-solariam-border bg-solariam-night px-3 py-2 text-solariam-parchment outline-none focus:border-solariam-gold"
                >
                  {Object.entries(CATEGORY_LABELS).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <label className="flex flex-col gap-1">
                <span className="text-xs uppercase tracking-wider text-solariam-mist">Quantidade</span>
                <NumberInput
                  value={selected.quantity}
                  onChange={(quantity) => updateItem(selected.id, { quantity: Math.max(1, quantity) })}
                  min={1}
                />
              </label>
              <label className="flex flex-col gap-1">
                <span className="text-xs uppercase tracking-wider text-solariam-mist">Peso un.</span>
                <NumberInput
                  value={selected.weight ?? 0}
                  onChange={(weight) => updateItem(selected.id, { weight: Math.max(0, weight) })}
                  min={0}
                />
              </label>
              <label className="flex items-end gap-2 pb-2">
                <input
                  type="checkbox"
                  checked={selected.equipped ?? false}
                  onChange={(event) => updateItem(selected.id, { equipped: event.target.checked })}
                  className="h-4 w-4 accent-solariam-gold"
                />
                <span className="text-sm text-solariam-parchment">Equipado</span>
              </label>
            </div>

            {selected.category === 'weapon' && selected.weapon && (
              <section className="rounded border border-solariam-border/50 bg-solariam-night/30 p-3">
                <h3 className="mb-3 font-display text-xs font-semibold uppercase tracking-widest text-solariam-gold">
                  Arma
                </h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="flex flex-col gap-1">
                    <span className="text-xs uppercase tracking-wider text-solariam-mist">Dado de dano</span>
                    <TextInput
                      value={selected.weapon.damageDice}
                      onChange={(damageDice) =>
                        updateItem(selected.id, { weapon: { ...selected.weapon!, damageDice } })
                      }
                      placeholder="Ex.: 1d8"
                    />
                  </label>
                  <label className="flex flex-col gap-1">
                    <span className="text-xs uppercase tracking-wider text-solariam-mist">Alcance</span>
                    <ComboInput
                      value={selected.weapon.range}
                      onChange={(range) =>
                        updateItem(selected.id, { weapon: { ...selected.weapon!, range } })
                      }
                      options={RANGE_OPTIONS}
                      placeholder="Alcance"
                    />
                  </label>
                </div>
                <div className="mt-3 grid gap-3 sm:grid-cols-3">
                  <label className="flex flex-col gap-1">
                    <span className="text-xs uppercase tracking-wider text-solariam-mist">Crítico de</span>
                    <NumberInput
                      value={selected.weapon.criticalFrom}
                      onChange={(criticalFrom) =>
                        updateItem(selected.id, { weapon: { ...selected.weapon!, criticalFrom } })
                      }
                    />
                  </label>
                  <label className="flex flex-col gap-1">
                    <span className="text-xs uppercase tracking-wider text-solariam-mist">Até</span>
                    <NumberInput
                      value={selected.weapon.criticalTo}
                      onChange={(criticalTo) =>
                        updateItem(selected.id, { weapon: { ...selected.weapon!, criticalTo } })
                      }
                    />
                  </label>
                  <label className="flex flex-col gap-1">
                    <span className="text-xs uppercase tracking-wider text-solariam-mist">Multiplicador</span>
                    <NumberInput
                      value={selected.weapon.criticalMultiplier}
                      onChange={(criticalMultiplier) =>
                        updateItem(selected.id, {
                          weapon: { ...selected.weapon!, criticalMultiplier: Math.max(1, criticalMultiplier) },
                        })
                      }
                      min={1}
                    />
                  </label>
                </div>
              </section>
            )}

            {selected.category === 'armor-shield' && selected.armor && (
              <section className="rounded border border-solariam-border/50 bg-solariam-night/30 p-3">
                <h3 className="mb-3 font-display text-xs font-semibold uppercase tracking-widest text-solariam-gold">
                  Armadura ou escudo
                </h3>
                <div className="grid gap-3 sm:grid-cols-3">
                  <label className="flex flex-col gap-1">
                    <span className="text-xs uppercase tracking-wider text-solariam-mist">Defesa</span>
                    <NumberInput
                      value={selected.armor.defenseBonus}
                      onChange={(defenseBonus) =>
                        updateItem(selected.id, { armor: { ...selected.armor!, defenseBonus: Math.max(0, defenseBonus) } })
                      }
                      min={0}
                    />
                  </label>
                  <label className="flex flex-col gap-1">
                    <span className="text-xs uppercase tracking-wider text-solariam-mist">RD</span>
                    <NumberInput
                      value={selected.armor.damageReduction}
                      onChange={(damageReduction) =>
                        updateItem(selected.id, {
                          armor: { ...selected.armor!, damageReduction: Math.max(0, damageReduction) },
                        })
                      }
                      min={0}
                    />
                  </label>
                  <label className="flex flex-col gap-1">
                    <span className="text-xs uppercase tracking-wider text-solariam-mist">Agilidade máxima</span>
                    <NumberInput
                      value={selected.armor.maxAgility ?? character.attributes.agilidade}
                      onChange={(maxAgility) =>
                        updateItem(selected.id, { armor: { ...selected.armor!, maxAgility } })
                      }
                    />
                  </label>
                </div>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selected.armor.hasArmorPenalty}
                      onChange={(event) =>
                        updateItem(selected.id, {
                          armor: { ...selected.armor!, hasArmorPenalty: event.target.checked },
                        })
                      }
                      className="h-4 w-4 accent-solariam-gold"
                    />
                    <span className="text-sm text-solariam-parchment">Tem penalidade de armadura</span>
                  </label>
                  <NumberInput
                    value={selected.armor.armorPenalty}
                    onChange={(armorPenalty) =>
                      updateItem(selected.id, {
                        armor: { ...selected.armor!, armorPenalty: Math.min(0, armorPenalty) },
                      })
                    }
                    max={0}
                  />
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selected.armor.hasMovementReduction}
                      onChange={(event) =>
                        updateItem(selected.id, {
                          armor: { ...selected.armor!, hasMovementReduction: event.target.checked },
                        })
                      }
                      className="h-4 w-4 accent-solariam-gold"
                    />
                    <span className="text-sm text-solariam-parchment">Reduz movimento</span>
                  </label>
                  <NumberInput
                    value={selected.armor.movementReduction}
                    onChange={(movementReduction) =>
                      updateItem(selected.id, {
                        armor: { ...selected.armor!, movementReduction: Math.max(0, movementReduction) },
                      })
                    }
                    min={0}
                  />
                </div>
              </section>
            )}

            {(selected.category === 'weapon' || selected.category === 'armor-shield') && (
              <section className="rounded border border-solariam-border/50 bg-solariam-night/30 p-3">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="font-display text-xs font-semibold uppercase tracking-widest text-solariam-gold">
                    Propriedades
                  </h3>
                  <button
                    type="button"
                    onClick={() => updateItem(selected.id, { properties: [...(selected.properties ?? []), 'template'] })}
                    className="rounded bg-solariam-gold/20 px-2 py-1 text-xs font-semibold text-solariam-gold hover:bg-solariam-gold/30"
                  >
                    + Propriedade
                  </button>
                </div>
                {(selected.properties ?? []).length === 0 ? (
                  <p className="text-sm text-solariam-mist">Nenhuma propriedade.</p>
                ) : (
                  <div className="space-y-2">
                    {(selected.properties ?? []).map((property, index) => (
                      <div key={`${selected.id}-${index}`} className="grid gap-2 sm:grid-cols-[1fr_auto]">
                        <ComboInput
                          value={property}
                          onChange={(value) => updateProperty(selected, index, value)}
                          options={PROPERTY_OPTIONS}
                          placeholder="Propriedade"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            updateItem(selected.id, {
                              properties: (selected.properties ?? []).filter((_, itemIndex) => itemIndex !== index),
                            })
                          }
                          className="rounded border border-solariam-border px-3 py-2 text-sm text-solariam-ember hover:border-solariam-ember"
                        >
                          Remover
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            )}

            <label className="flex flex-col gap-1">
              <span className="text-xs uppercase tracking-wider text-solariam-mist">Descrição</span>
              <textarea
                value={selected.description ?? ''}
                onChange={(event) => updateItem(selected.id, { description: event.target.value })}
                rows={5}
                placeholder="Propriedades, efeitos, notas..."
                className="w-full resize-y rounded border border-solariam-border bg-solariam-night px-3 py-2 text-solariam-parchment placeholder:text-solariam-mist/50 outline-none focus:border-solariam-gold"
              />
            </label>

            <button
              type="button"
              onClick={() => removeItem(selected.id)}
              className="text-sm text-solariam-ember hover:underline"
            >
              Remover item
            </button>
          </div>
        ) : (
          <p className="text-sm text-solariam-mist">Selecione ou adicione um item.</p>
        )}
      </Panel>
    </div>
  )
}
