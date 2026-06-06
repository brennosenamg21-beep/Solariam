import { useCallback, useEffect, useMemo, useState } from 'react'
import { createDefaultSkills } from '../data/skills'
import { clampAttribute, recalculateDerivedStats } from '../lib/calculations'
import type { AttributeKey, Character } from '../types/character'
import { EMPTY_ATTRIBUTES as defaultAttributes } from '../types/character'
import {
  exportCharacter,
  importCharacter,
  loadSavedCharacter,
} from './useCharacterPersistence'

const STORAGE_KEY = 'solariam-character'

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
    movement: 9,           // 9 m = 30 ft padrão
    movementUnit: 'meters',
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

  return { ...base, hp: { ...base.hp, current: base.hp.max }, atma: { ...base.atma, current: base.atma.max } }
}

function mergeWithEmpty(saved: Partial<Character>): Character {
  const empty = createEmptyCharacter()
  const merged = recalculateDerivedStats({ ...empty, ...saved })
  return merged
}

/** Converte deslocamento entre metros e pés mantendo proporção */
function convertMovement(value: number, from: 'meters' | 'feet', to: 'meters' | 'feet'): number {
  if (from === to) return value
  if (from === 'meters' && to === 'feet') return Math.round((value / 1.5) * 5)
  return Math.round((value / 5) * 1.5)
}

export function useCharacter() {
  const [character, setCharacter] = useState<Character>(() => {
    const saved = loadSavedCharacter()
    return saved ? mergeWithEmpty(saved) : createEmptyCharacter()
  })

  // Auto-save a cada mudança
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(character))
    } catch {
      // silencioso
    }
  }, [character])

  const updateCharacter = useCallback((patch: Partial<Character>) => {
    setCharacter((prev) => {
      if (patch.movementUnit && patch.movementUnit !== prev.movementUnit) {
        const convertedMovement = convertMovement(
          patch.movement ?? prev.movement,
          prev.movementUnit,
          patch.movementUnit,
        )
        return recalculateDerivedStats({ ...prev, ...patch, movement: convertedMovement })
      }
      return recalculateDerivedStats({ ...prev, ...patch })
    })
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

  const handleExport = useCallback(() => {
    exportCharacter(character)
  }, [character])

  const handleImport = useCallback(async () => {
    try {
      const data = await importCharacter()
      setCharacter(mergeWithEmpty(data))
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Erro ao importar.')
    }
  }, [])

  const derived = useMemo(() => character, [character])

  return {
    character: derived,
    updateCharacter,
    updateAttribute,
    updateSkill,
    resetCharacter: () => setCharacter(createEmptyCharacter()),
    exportCharacter: handleExport,
    importCharacter: handleImport,
  }
}
