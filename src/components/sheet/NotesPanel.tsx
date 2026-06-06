import type { Character, CustomNoteSection } from '../../types/character'
import { Panel } from '../ui/Panel'
import { TextInput } from '../ui/TextInput'

type NotesPanelProps = {
  character: Character
  onUpdate: (patch: Partial<Character>) => void
}

const SECTION_SIZE_LABELS: Record<CustomNoteSection['size'], string> = {
  small: 'Pequeno',
  medium: 'Médio',
  large: 'Grande',
}

function createCustomSection(): CustomNoteSection {
  return {
    id: crypto.randomUUID(),
    title: 'Novo espaço',
    content: '',
    size: 'medium',
  }
}

export function NotesPanel({ character, onUpdate }: NotesPanelProps) {
  const updateNotes = (patch: Partial<Character['notes']>) => {
    onUpdate({ notes: { ...character.notes, ...patch } })
  }

  const updateSection = (id: string, patch: Partial<CustomNoteSection>) => {
    updateNotes({
      customSections: character.notes.customSections.map((section) =>
        section.id === id ? { ...section, ...patch } : section,
      ),
    })
  }

  const removeSection = (id: string) => {
    updateNotes({
      customSections: character.notes.customSections.filter((section) => section.id !== id),
    })
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-[300px_1fr]">
        <Panel title="Imagem">
          <div className="space-y-3">
            <div className="flex aspect-[3/4] items-center justify-center overflow-hidden rounded border border-solariam-border bg-solariam-night">
              {character.notes.imageUrl ? (
                <img
                  src={character.notes.imageUrl}
                  alt="Personagem"
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-sm text-solariam-mist">Sem imagem</span>
              )}
            </div>
            <label className="flex flex-col gap-1">
              <span className="text-xs uppercase tracking-wider text-solariam-mist">URL da imagem</span>
              <TextInput
                value={character.notes.imageUrl}
                onChange={(imageUrl) => updateNotes({ imageUrl })}
                placeholder="https://..."
              />
            </label>
          </div>
        </Panel>

        <Panel title="História">
          <textarea
            value={character.notes.history}
            onChange={(event) => updateNotes({ history: event.target.value })}
            rows={12}
            placeholder="História, vínculos, objetivos, eventos importantes..."
            className="w-full resize-y rounded border border-solariam-border bg-solariam-night px-3 py-2 text-solariam-parchment placeholder:text-solariam-mist/50 outline-none focus:border-solariam-gold"
          />
        </Panel>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Aparência">
          <textarea
            value={character.notes.appearance}
            onChange={(event) => updateNotes({ appearance: event.target.value })}
            rows={7}
            placeholder="Rosto, corpo, roupas, marcas, voz, postura..."
            className="w-full resize-y rounded border border-solariam-border bg-solariam-night px-3 py-2 text-solariam-parchment placeholder:text-solariam-mist/50 outline-none focus:border-solariam-gold"
          />
        </Panel>

        <Panel title="Organizações">
          <textarea
            value={character.notes.organizations}
            onChange={(event) => updateNotes({ organizations: event.target.value })}
            rows={7}
            placeholder="Laços, reputação, aliados, inimigos e cargos..."
            className="w-full resize-y rounded border border-solariam-border bg-solariam-night px-3 py-2 text-solariam-parchment placeholder:text-solariam-mist/50 outline-none focus:border-solariam-gold"
          />
        </Panel>
      </div>

      <Panel
        title="Espaços customizados"
        action={
          <button
            type="button"
            onClick={() =>
              updateNotes({
                customSections: [...character.notes.customSections, createCustomSection()],
              })
            }
            className="rounded bg-solariam-gold/20 px-2 py-1 text-xs font-semibold text-solariam-gold hover:bg-solariam-gold/30"
          >
            + Espaço
          </button>
        }
      >
        {character.notes.customSections.length === 0 ? (
          <p className="text-sm text-solariam-mist">Nenhum espaço customizado.</p>
        ) : (
          <div className="grid gap-4 lg:grid-cols-2">
            {character.notes.customSections.map((section) => (
              <article
                key={section.id}
                className={`rounded border border-solariam-border/50 bg-solariam-night/30 p-3 ${
                  section.size === 'large' ? 'lg:col-span-2' : ''
                }`}
              >
                <div className="mb-3 grid gap-2 sm:grid-cols-[1fr_140px_auto]">
                  <TextInput
                    value={section.title}
                    onChange={(title) => updateSection(section.id, { title })}
                    placeholder="Nome do espaço"
                  />
                  <select
                    value={section.size}
                    onChange={(event) =>
                      updateSection(section.id, {
                        size: event.target.value as CustomNoteSection['size'],
                      })
                    }
                    className="rounded border border-solariam-border bg-solariam-night px-3 py-2 text-solariam-parchment outline-none focus:border-solariam-gold"
                  >
                    {Object.entries(SECTION_SIZE_LABELS).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={() => removeSection(section.id)}
                    className="rounded border border-solariam-border px-3 py-2 text-sm text-solariam-ember hover:border-solariam-ember"
                  >
                    Remover
                  </button>
                </div>
                <textarea
                  value={section.content}
                  onChange={(event) => updateSection(section.id, { content: event.target.value })}
                  rows={section.size === 'small' ? 4 : section.size === 'large' ? 10 : 7}
                  placeholder="Conteúdo customizado..."
                  className="w-full resize-y rounded border border-solariam-border bg-solariam-night px-3 py-2 text-solariam-parchment placeholder:text-solariam-mist/50 outline-none focus:border-solariam-gold"
                />
              </article>
            ))}
          </div>
        )}
      </Panel>
    </div>
  )
}
