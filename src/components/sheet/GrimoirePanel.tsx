import { useState } from 'react'
import type { Character, Spell } from '../../types/character'
import { Panel } from '../ui/Panel'
import { TextInput } from '../ui/TextInput'
import { NumberInput } from '../ui/NumberInput'

type GrimoirePanelProps = {
  character: Character
  onUpdate: (patch: Partial<Character>) => void
}

function createSpell(): Spell {
  return {
    id: crypto.randomUUID(),
    name: '',
    circle: 1,
    description: '',
    prepared: false,
  }
}

export function GrimoirePanel({ character, onUpdate }: GrimoirePanelProps) {
  const [selectedId, setSelectedId] = useState<string | null>(character.spells[0]?.id ?? null)
  const [filterCircle, setFilterCircle] = useState<number | 'all'>('all')

  const selected = character.spells.find((s) => s.id === selectedId)

  const filteredSpells = character.spells.filter(
    (s) => filterCircle === 'all' || s.circle === filterCircle,
  )

  const updateSpells = (spells: Spell[]) => {
    onUpdate({ spells })
    if (!spells.find((s) => s.id === selectedId)) {
      setSelectedId(spells[0]?.id ?? null)
    }
  }

  const addSpell = () => {
    const spell = createSpell()
    updateSpells([...character.spells, spell])
    setSelectedId(spell.id)
  }

  const updateSpell = (id: string, patch: Partial<Spell>) => {
    updateSpells(character.spells.map((s) => (s.id === id ? { ...s, ...patch } : s)))
  }

  const removeSpell = (id: string) => {
    updateSpells(character.spells.filter((s) => s.id !== id))
  }

  const circles = [...new Set(character.spells.map((s) => s.circle))].sort((a, b) => a - b)

  return (
    <div className="grid gap-4 lg:grid-cols-[300px_1fr]">
      <Panel
        title="Grimório"
        action={
          <button
            type="button"
            onClick={addSpell}
            className="rounded bg-solariam-gold/20 px-2 py-1 text-xs font-semibold text-solariam-gold hover:bg-solariam-gold/30"
          >
            + Magia
          </button>
        }
      >
        <div className="mb-3 flex flex-wrap gap-1">
          <button
            type="button"
            onClick={() => setFilterCircle('all')}
            className={`rounded px-2 py-1 text-xs ${
              filterCircle === 'all'
                ? 'bg-solariam-frost/20 text-solariam-frost'
                : 'text-solariam-mist hover:bg-solariam-night'
            }`}
          >
            Todas
          </button>
          {circles.map((circle) => (
            <button
              key={circle}
              type="button"
              onClick={() => setFilterCircle(circle)}
              className={`rounded px-2 py-1 text-xs ${
                filterCircle === circle
                  ? 'bg-solariam-frost/20 text-solariam-frost'
                  : 'text-solariam-mist hover:bg-solariam-night'
              }`}
            >
              Círculo {circle}
            </button>
          ))}
        </div>

        {filteredSpells.length === 0 ? (
          <p className="text-sm text-solariam-mist">Nenhuma magia neste filtro.</p>
        ) : (
          <ul className="space-y-1">
            {filteredSpells.map((spell) => (
              <li key={spell.id}>
                <button
                  type="button"
                  onClick={() => setSelectedId(spell.id)}
                  className={`flex w-full items-center gap-2 rounded px-3 py-2 text-left text-sm transition ${
                    selectedId === spell.id
                      ? 'bg-solariam-frost/20 text-solariam-frost'
                      : 'text-solariam-parchment hover:bg-solariam-night'
                  }`}
                >
                  <span
                    className={`h-2 w-2 rounded-full ${
                      spell.prepared ? 'bg-solariam-gold' : 'bg-solariam-border'
                    }`}
                    title={spell.prepared ? 'Preparada' : 'Não preparada'}
                  />
                  <span className="flex-1 truncate">{spell.name || 'Sem nome'}</span>
                  <span className="text-xs text-solariam-mist">C{spell.circle}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </Panel>

      <Panel title="Detalhes da magia">
        {selected ? (
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-1">
                <span className="text-xs uppercase tracking-wider text-solariam-mist">Nome</span>
                <TextInput
                  value={selected.name}
                  onChange={(name) => updateSpell(selected.id, { name })}
                  placeholder="Nome da magia"
                />
              </label>
              <label className="flex flex-col gap-1">
                <span className="text-xs uppercase tracking-wider text-solariam-mist">Círculo</span>
                <NumberInput
                  value={selected.circle}
                  onChange={(circle) => updateSpell(selected.id, { circle: Math.max(1, circle) })}
                  min={1}
                />
              </label>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-1">
                <span className="text-xs uppercase tracking-wider text-solariam-mist">Escola</span>
                <TextInput
                  value={selected.school ?? ''}
                  onChange={(school) => updateSpell(selected.id, { school })}
                  placeholder="Escola arcana"
                />
              </label>
              <label className="flex flex-col gap-1">
                <span className="text-xs uppercase tracking-wider text-solariam-mist">Custo</span>
                <TextInput
                  value={selected.cost ?? ''}
                  onChange={(cost) => updateSpell(selected.id, { cost })}
                  placeholder="PM, componentes..."
                />
              </label>
            </div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selected.prepared}
                onChange={(e) => updateSpell(selected.id, { prepared: e.target.checked })}
                className="h-4 w-4 accent-solariam-gold"
              />
              <span className="text-sm text-solariam-parchment">Magia preparada</span>
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-xs uppercase tracking-wider text-solariam-mist">Descrição</span>
              <textarea
                value={selected.description}
                onChange={(e) => updateSpell(selected.id, { description: e.target.value })}
                rows={8}
                placeholder="Efeito, alcance, duração..."
                className="w-full resize-y rounded border border-solariam-border bg-solariam-night px-3 py-2 text-solariam-parchment placeholder:text-solariam-mist/50 outline-none focus:border-solariam-gold"
              />
            </label>
            <button
              type="button"
              onClick={() => removeSpell(selected.id)}
              className="text-sm text-solariam-ember hover:underline"
            >
              Remover magia
            </button>
          </div>
        ) : (
          <p className="text-sm text-solariam-mist">Selecione ou crie uma magia para consultar.</p>
        )}
      </Panel>
    </div>
  )
}
