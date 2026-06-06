import { useState } from 'react'
import type { Ability, Character } from '../../types/character'
import { Panel } from '../ui/Panel'
import { TextInput } from '../ui/TextInput'

type AbilitiesPanelProps = {
  character: Character
  onUpdate: (patch: Partial<Character>) => void
}

function createAbility(): Ability {
  return {
    id: crypto.randomUUID(),
    name: '',
    description: '',
  }
}

export function AbilitiesPanel({ character, onUpdate }: AbilitiesPanelProps) {
  const [selectedId, setSelectedId] = useState<string | null>(
    character.abilities[0]?.id ?? null,
  )

  const selected = character.abilities.find((a) => a.id === selectedId)

  const updateAbilities = (abilities: Ability[]) => {
    onUpdate({ abilities })
    if (!abilities.find((a) => a.id === selectedId)) {
      setSelectedId(abilities[0]?.id ?? null)
    }
  }

  const addAbility = () => {
    const ability = createAbility()
    updateAbilities([...character.abilities, ability])
    setSelectedId(ability.id)
  }

  const updateAbility = (id: string, patch: Partial<Ability>) => {
    updateAbilities(
      character.abilities.map((a) => (a.id === id ? { ...a, ...patch } : a)),
    )
  }

  const removeAbility = (id: string) => {
    updateAbilities(character.abilities.filter((a) => a.id !== id))
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[280px_1fr]">
      <Panel
        title="Habilidades"
        action={
          <button
            type="button"
            onClick={addAbility}
            className="rounded bg-solariam-gold/20 px-2 py-1 text-xs font-semibold text-solariam-gold hover:bg-solariam-gold/30"
          >
            + Nova
          </button>
        }
      >
        {character.abilities.length === 0 ? (
          <p className="text-sm text-solariam-mist">Nenhuma habilidade adicionada.</p>
        ) : (
          <ul className="space-y-1">
            {character.abilities.map((ability) => (
              <li key={ability.id}>
                <button
                  type="button"
                  onClick={() => setSelectedId(ability.id)}
                  className={`w-full rounded px-3 py-2 text-left text-sm transition ${
                    selectedId === ability.id
                      ? 'bg-solariam-gold/20 text-solariam-gold-light'
                      : 'text-solariam-parchment hover:bg-solariam-night'
                  }`}
                >
                  {ability.name || 'Sem nome'}
                </button>
              </li>
            ))}
          </ul>
        )}
      </Panel>

      <Panel title="Detalhes">
        {selected ? (
          <div className="space-y-4">
            <label className="flex flex-col gap-1">
              <span className="text-xs uppercase tracking-wider text-solariam-mist">Nome</span>
              <TextInput
                value={selected.name}
                onChange={(name) => updateAbility(selected.id, { name })}
                placeholder="Nome da habilidade"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-xs uppercase tracking-wider text-solariam-mist">Origem</span>
              <TextInput
                value={selected.source ?? ''}
                onChange={(source) => updateAbility(selected.id, { source })}
                placeholder="Classe, raça, talento..."
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-xs uppercase tracking-wider text-solariam-mist">Descrição</span>
              <textarea
                value={selected.description}
                onChange={(e) => updateAbility(selected.id, { description: e.target.value })}
                rows={8}
                placeholder="Efeito e regras da habilidade"
                className="w-full resize-y rounded border border-solariam-border bg-solariam-night px-3 py-2 text-solariam-parchment placeholder:text-solariam-mist/50 outline-none focus:border-solariam-gold"
              />
            </label>
            <button
              type="button"
              onClick={() => removeAbility(selected.id)}
              className="text-sm text-solariam-ember hover:underline"
            >
              Remover habilidade
            </button>
          </div>
        ) : (
          <p className="text-sm text-solariam-mist">
            Selecione ou crie uma habilidade para editar.
          </p>
        )}
      </Panel>
    </div>
  )
}
