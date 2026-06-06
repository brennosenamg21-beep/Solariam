import type { AttributeKey, Skill } from '../types/character'

type SkillDef = {
  id: string
  name: string
  attribute: AttributeKey
  armorPenaltyApplies?: boolean
  trainedOnly?: boolean
}

/**
 * Perícias inspiradas na estrutura da Tormenta 20,
 * mapeadas aos atributos do Solariam (FOR, AGI, RES, INT, INS, CAR).
 */
const SKILL_DEFINITIONS: SkillDef[] = [
  { id: 'acrobacia', name: 'Acrobacia', attribute: 'agilidade', armorPenaltyApplies: true },
  { id: 'adestramento', name: 'Adestramento', attribute: 'carisma' },
  { id: 'atletismo', name: 'Atletismo', attribute: 'forca' },
  { id: 'atuacao', name: 'Atuação', attribute: 'carisma' },
  { id: 'cavalgar', name: 'Cavalgar', attribute: 'agilidade' },
  { id: 'conhecimento', name: 'Conhecimento', attribute: 'inteligencia', trainedOnly: true },
  { id: 'cura', name: 'Cura', attribute: 'inteligencia' },
  { id: 'diplomacia', name: 'Diplomacia', attribute: 'carisma' },
  { id: 'enganacao', name: 'Enganação', attribute: 'carisma' },
  { id: 'fortitude', name: 'Fortitude', attribute: 'resistencia' },
  { id: 'furtividade', name: 'Furtividade', attribute: 'agilidade', armorPenaltyApplies: true },
  { id: 'guerra', name: 'Guerra', attribute: 'inteligencia' },
  { id: 'iniciativa', name: 'Iniciativa', attribute: 'agilidade' },
  { id: 'intimidacao', name: 'Intimidação', attribute: 'carisma' },
  { id: 'intuicao', name: 'Intuição', attribute: 'instinto' },
  { id: 'investigacao', name: 'Investigação', attribute: 'inteligencia' },
  { id: 'jogatina', name: 'Jogatina', attribute: 'carisma' },
  { id: 'ladinagem', name: 'Ladinagem', attribute: 'agilidade', armorPenaltyApplies: true },
  { id: 'luta', name: 'Luta', attribute: 'forca' },
  { id: 'misticismo', name: 'Misticismo', attribute: 'inteligencia', trainedOnly: true },
  { id: 'nobreza', name: 'Nobreza', attribute: 'inteligencia' },
  { id: 'oficio-1', name: 'Ofício', attribute: 'inteligencia', trainedOnly: true },
  { id: 'oficio-2', name: 'Ofício', attribute: 'inteligencia', trainedOnly: true },
  { id: 'percepcao', name: 'Percepção', attribute: 'instinto' },
  { id: 'pilotagem', name: 'Pilotagem', attribute: 'agilidade' },
  { id: 'pontaria', name: 'Pontaria', attribute: 'agilidade' },
  { id: 'reflexos', name: 'Reflexos', attribute: 'agilidade' },
  { id: 'religiao', name: 'Religião', attribute: 'instinto', trainedOnly: true },
  { id: 'sobrevivencia', name: 'Sobrevivência', attribute: 'instinto' },
  { id: 'vontade', name: 'Vontade', attribute: 'instinto' },
]

export function createDefaultSkills(): Skill[] {
  return SKILL_DEFINITIONS.map((skill) => ({
    id: skill.id,
    name: skill.name,
    attribute: skill.attribute,
    trained: false,
    training: 0,
    others: 0,
    armorPenaltyApplies: skill.armorPenaltyApplies ?? false,
    trainedOnly: skill.trainedOnly ?? false,
  }))
}
