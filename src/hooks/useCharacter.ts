import { useCallback, useMemo, useState } from 'react'
import { createDefaultSkills } from '../data/skills'
import { clampAttribute, recalculateDerivedStats } from '../lib/calculations'
import type { AttributeKey, Character } from '../types/character'
import { EMPTY_ATTRIBUTES as defaultAttributes } from '../types/character'

function createEmptyCharacter(): Character {
  const base = recalculateDerivedStats({
    name: '',
    player: '',
    classLevel: '',
    lineageVariation: '',
    culture: '',
    origin: '',
    devotion: '',
    specialization: '',
    alignment: '',
    size: '',
    gender: '',
    age: '',
    level: 1,
    attributes: { ...defaultAttributes },
    hp: { current: 0, max: 0, others: 0 },
    atma: { current: 0, max: 0, others: 0 },
    defense: { armor: 0, shield: 0 },
    movement: 30,
    movementUnit: 'feet',
    damageReductions: [],
    resistances: [],
    armorPenalty: 0,
    skills: createDefaultSkills(),
    abilities: [],
    spells: [],
    inventory: [],
    notes: {
      history: '',
      imageUrl: '',
      appearance: '',
      organizations: '',
      customSections: [],
    },
  })

  return {
    ...base,
    hp: { ...base.hp, current: base.hp.max },
    atma: { ...base.atma, current: base.atma.max },
  }
}

export function useCharacter() {
  const [character, setCharacter] = useState<Character>(createEmptyCharacter)

  const updateCharacter = useCallback((patch: Partial<Character>) => {
    setCharacter((prev) => recalculateDerivedStats({ ...prev, ...patch }))
  }, [])

  const updateAttribute = useCallback((key: AttributeKey, value: number) => {
    setCharacter((prev) =>
      recalculateDerivedStats({
        ...prev,
        attributes: { ...prev.attributes, [key]: clampAttribute(value) },
      }),
    )
  }, [])

  const updateSkill = useCallback((id: string, patch: Partial<Character['skills'][number]>) => {
    setCharacter((prev) =>
      recalculateDerivedStats({
        ...prev,
        skills: prev.skills.map((skill) => (skill.id === id ? { ...skill, ...patch } : skill)),
      }),
    )
  }, [])

  const derived = useMemo(() => character, [character])

  return {
    character: derived,
    updateCharacter,
    updateAttribute,
    updateSkill,
    resetCharacter: () => setCharacter(createEmptyCharacter()),
  }
}
