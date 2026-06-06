/** Atributos do Solariam: valores de -5 a 10, começam em 0 */
export type AttributeKey =
  | 'forca'
  | 'agilidade'
  | 'resistencia'
  | 'inteligencia'
  | 'instinto'
  | 'carisma'

export type Attributes = Record<AttributeKey, number>

export const ATTRIBUTE_MIN = -5
export const ATTRIBUTE_MAX = 10

export type Skill = {
  id: string
  name: string
  /** Nome customizado, ex.: Ofício 1 - Ferraria */
  customName?: string
  attribute: AttributeKey
  trained: boolean
  /** Bônus de treino */
  training: number
  /** Outros bônus e penalidades */
  others: number
  /** Penalidade de armadura se aplica (+) */
  armorPenaltyApplies: boolean
  /** Somente treinada (*) */
  trainedOnly: boolean
}

export type Ability = {
  id: string
  name: string
  description: string
  source?: string
}

export type Spell = {
  id: string
  name: string
  circle: number
  school?: string
  cost?: string
  description: string
  prepared: boolean
}

export type InventoryItem = {
  id: string
  name: string
  category: ItemCategory
  quantity: number
  weight?: number
  description?: string
  equipped?: boolean
  weapon?: WeaponDetails
  armor?: ArmorDetails
  properties?: string[]
}

export type DamageReduction = {
  id: string
  type: string
  value: number
}

export type Resistance = {
  id: string
  type: string
}

export type MovementUnit = 'meters' | 'feet'

export type ItemCategory =
  | 'misc'
  | 'weapon'
  | 'armor-shield'
  | 'magic-focus'
  | 'consumable'

export type WeaponDetails = {
  damageDice: string
  range: 'melee' | 'short' | 'medium' | 'long' | string
  criticalFrom: number
  criticalTo: number
  criticalMultiplier: number
}

export type ArmorDetails = {
  damageReduction: number
  maxAgility?: number
  hasArmorPenalty: boolean
  armorPenalty: number
  hasMovementReduction: boolean
  movementReduction: number
  defenseBonus: number
}

export type CustomNoteSection = {
  id: string
  title: string
  content: string
  size: 'small' | 'medium' | 'large'
}

export type Character = {
  name: string
  player: string
  classLevel: string
  lineageVariation: string
  culture: string
  origin: string
  devotion: string
  specialization: string
  alignment: string
  size: string
  gender: string
  age: string
  level: number
  attributes: Attributes
  hp: {
    current: number
    max: number
    others: number
  }
  atma: {
    current: number
    max: number
    others: number
  }
  defense: {
    armor: number
    shield: number
  }
  movement: number
  movementUnit: MovementUnit
  damageReductions: DamageReduction[]
  resistances: Resistance[]
  /** Penalidade de armadura global, subtraída das perícias marcadas com + */
  armorPenalty: number
  skills: Skill[]
  abilities: Ability[]
  spells: Spell[]
  inventory: InventoryItem[]
  notes: {
    history: string
    imageUrl: string
    appearance: string
    organizations: string
    customSections: CustomNoteSection[]
  }
}

export const EMPTY_ATTRIBUTES: Attributes = {
  forca: 0,
  agilidade: 0,
  resistencia: 0,
  inteligencia: 0,
  instinto: 0,
  carisma: 0,
}

export const ATTRIBUTE_LABELS: Record<AttributeKey, string> = {
  forca: 'Força',
  agilidade: 'Agilidade',
  resistencia: 'Resistência',
  inteligencia: 'Inteligência',
  instinto: 'Instinto',
  carisma: 'Carisma',
}

export const ATTRIBUTE_ABBREV: Record<AttributeKey, string> = {
  forca: 'FOR',
  agilidade: 'AGI',
  resistencia: 'RES',
  inteligencia: 'INT',
  instinto: 'INS',
  carisma: 'CAR',
}
