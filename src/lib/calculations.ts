import {
  ATTRIBUTE_MAX,
  ATTRIBUTE_MIN,
  type AttributeKey,
  type Character,
  type Skill,
} from '../types/character'

/** Valor base de PV por nível */
export const HP_BASE_PER_LEVEL = 10

/** Valor base de Atma por nível */
export const ATMA_BASE_PER_LEVEL = 5

export function clampAttribute(value: number): number {
  return Math.min(ATTRIBUTE_MAX, Math.max(ATTRIBUTE_MIN, value))
}

export function calculateMaxHp(level: number, resistencia: number, others = 0): number {
  const perLevel = HP_BASE_PER_LEVEL + resistencia
  return Math.max(1, level * perLevel + others)
}

export function calculateMaxAtma(level: number, instinto: number, others = 0): number {
  const perLevel = ATMA_BASE_PER_LEVEL + instinto
  return Math.max(0, level * perLevel + others)
}

export function calculateDefense(
  agilidade: number,
  armor = 0,
  shield = 0,
  maxAgility?: number,
): number {
  const agilityBonus = maxAgility === undefined ? agilidade : Math.min(agilidade, maxAgility)
  return 10 + agilityBonus + armor + shield
}

export function calculateSkillTotal(
  skill: Skill,
  attributeValue: number,
  globalArmorPenalty = 0,
): number | null {
  if (skill.trainedOnly && !skill.trained) {
    return null
  }
  const penalty = skill.armorPenaltyApplies ? globalArmorPenalty : 0
  return attributeValue + skill.training + skill.others - penalty
}

export function recalculateDerivedStats(character: Character): Character {
  const maxHp = calculateMaxHp(
    character.level,
    character.attributes.resistencia,
    character.hp.others,
  )
  const maxAtma = calculateMaxAtma(
    character.level,
    character.attributes.instinto,
    character.atma.others,
  )

  return {
    ...character,
    hp: {
      ...character.hp,
      max: maxHp,
      current: Math.min(character.hp.current, maxHp),
    },
    atma: {
      ...character.atma,
      max: maxAtma,
      current: Math.min(character.atma.current, maxAtma),
    },
  }
}

export function formatSigned(value: number): string {
  return value >= 0 ? `+${value}` : `${value}`
}

export function formatSkillTotal(total: number | null): string {
  if (total === null) return '—'
  return formatSigned(total)
}

export function getHpPerLevel(resistencia: number): number {
  return HP_BASE_PER_LEVEL + resistencia
}

export function getAtmaPerLevel(instinto: number): number {
  return ATMA_BASE_PER_LEVEL + instinto
}

export function getDefenseBreakdown(character: Character) {
  const equippedArmor = character.inventory.find(
    (item) => item.equipped && item.category === 'armor-shield' && item.armor,
  )
  const maxAgility = equippedArmor?.armor?.maxAgility
  const agilidade =
    maxAgility === undefined
      ? character.attributes.agilidade
      : Math.min(character.attributes.agilidade, maxAgility)
  const armor =
    character.defense.armor +
    character.inventory.reduce((total, item) => {
      if (!item.equipped || item.category !== 'armor-shield') return total
      return total + (item.armor?.defenseBonus ?? 0)
    }, 0)
  const shield = character.defense.shield
  return {
    base: 10,
    agilidade,
    armor,
    shield,
    maxAgility,
    total: calculateDefense(character.attributes.agilidade, armor, shield, maxAgility),
  }
}

export function calculateCarryLimit(forca: number): number {
  return Math.max(0, 5 + forca * 5)
}

/**
 * Retorna quadrados de movimento.
 * 1 quadrado = 1,5 m  ou  5 ft
 */
export function getMovementSquares(value: number, unit: 'meters' | 'feet'): number {
  if (unit === 'meters') {
    return Math.floor(value / 1.5)
  }
  return Math.floor(value / 5)
}

export function getEffectiveMovement(character: Character): number {
  const reduction = character.inventory.reduce((total, item) => {
    if (!item.equipped || item.category !== 'armor-shield' || !item.armor?.hasMovementReduction) {
      return total
    }
    return total + Math.max(0, item.armor.movementReduction)
  }, 0)

  return Math.max(0, character.movement - reduction)
}

export const ALL_ATTRIBUTE_KEYS: AttributeKey[] = [
  'forca',
  'agilidade',
  'resistencia',
  'inteligencia',
  'instinto',
  'carisma',
]
