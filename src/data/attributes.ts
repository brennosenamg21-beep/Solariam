import type { AttributeKey } from '../types/character'

export const ATTRIBUTE_DESCRIPTIONS: Record<AttributeKey, string> = {
  forca:
    'Formação muscular, capacidade de carregar, empurrar, agarrar e o impacto de ataques corporais.',
  agilidade:
    'Delicadeza e velocidade; influencia Defesa, ataques à distância, furtividade e acrobacias.',
  resistencia:
    'Suportar exaustão, toxinas, dor e concentração; define a quantidade de Pontos de Vida.',
  inteligencia:
    'Intelecto, aprendizado, idiomas, magias conhecidas e criatividade.',
  instinto:
    'Intuição, sentidos, força de vontade e resistência a efeitos mentais; define Pontos de Atma.',
  carisma:
    'Habilidades sociais, artísticas e com animais; base de muitas perícias e magias.',
}
