import type { ReactNode } from 'react'
import type { Character } from '../../types/character'
import { ComboInput } from '../ui/ComboInput'
import { StepperInput } from '../ui/StepperInput'
import { TextInput } from '../ui/TextInput'

type CharacterHeaderProps = {
  character: Character
  onUpdate: (patch: Partial<Character>) => void
}

function FieldRow({
  children,
  cols = 2,
}: {
  children: ReactNode
  cols?: 2 | 3 | 4
}) {
  const gridClass =
    cols === 4
      ? 'md:grid-cols-4'
      : cols === 3
        ? 'md:grid-cols-3'
        : 'md:grid-cols-2'

  return <div className={`grid gap-4 ${gridClass}`}>{children}</div>
}

function Field({
  label,
  children,
}: {
  label: string
  children: ReactNode
}) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-[10px] font-semibold uppercase tracking-wider text-solariam-gold">
        {label}
      </span>
      {children}
    </label>
  )
}

export function CharacterHeader({ character, onUpdate }: CharacterHeaderProps) {
  const templateOptions = ['template']
  const sizeOptions = ['minúsculo', 'pequeno', 'médio', 'grande', 'enorme']

  return (
    <div className="space-y-5">
      <FieldRow cols={3}>
        <Field label="Personagem">
          <TextInput
            value={character.name}
            onChange={(name) => onUpdate({ name })}
            placeholder="Nome do personagem"
          />
        </Field>
        <Field label="Jogador">
          <TextInput
            value={character.player}
            onChange={(player) => onUpdate({ player })}
            placeholder="Nome do jogador"
          />
        </Field>
        <Field label="Nível">
          <StepperInput
            value={character.level}
            onChange={(level) => onUpdate({ level })}
            min={0}
            max={20}
          />
        </Field>
      </FieldRow>

      <FieldRow cols={3}>
        <Field label="Classe">
          <ComboInput
            value={character.classLevel}
            onChange={(classLevel) => onUpdate({ classLevel })}
            options={templateOptions}
            placeholder="Classe"
          />
        </Field>
        <Field label="Linhagem">
          <ComboInput
            value={character.lineageVariation}
            onChange={(lineageVariation) => onUpdate({ lineageVariation })}
            options={templateOptions}
            placeholder="Linhagem"
          />
        </Field>
        <Field label="Cultura">
          <ComboInput
            value={character.culture}
            onChange={(culture) => onUpdate({ culture })}
            options={templateOptions}
            placeholder="Cultura"
          />
        </Field>
      </FieldRow>

      <FieldRow cols={3}>
        <Field label="Origem">
          <ComboInput
            value={character.origin}
            onChange={(origin) => onUpdate({ origin })}
            options={templateOptions}
            placeholder="Origem"
          />
        </Field>
        <Field label="Especialização">
          <ComboInput
            value={character.specialization}
            onChange={(specialization) => onUpdate({ specialization })}
            options={templateOptions}
            placeholder="Especialização"
          />
        </Field>
        <Field label="Devoção">
          <TextInput
            value={character.devotion}
            onChange={(devotion) => onUpdate({ devotion })}
            placeholder="Devoção"
          />
        </Field>
      </FieldRow>

      <FieldRow cols={4}>
        <Field label="Tendência">
          <ComboInput
            value={character.alignment}
            onChange={(alignment) => onUpdate({ alignment })}
            options={templateOptions}
            placeholder="Tendência"
          />
        </Field>
        <Field label="Tamanho">
          <ComboInput
            value={character.size}
            onChange={(size) => onUpdate({ size })}
            options={sizeOptions}
            placeholder="Tamanho"
          />
        </Field>
        <Field label="Gênero">
          <TextInput
            value={character.gender}
            onChange={(gender) => onUpdate({ gender })}
            placeholder="Gênero"
          />
        </Field>
        <Field label="Idade">
          <TextInput
            value={character.age}
            onChange={(age) => onUpdate({ age })}
            placeholder="Idade"
          />
        </Field>
      </FieldRow>
    </div>
  )
}
