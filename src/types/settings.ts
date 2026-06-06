export type MovementUnit = 'meters' | 'feet'

export type DisplayMode = 'bars' | 'symbols'

export type ThemeName =
  | 'solariam'
  | 'light'
  | 'ember'
  | 'frost'
  | 'void'
  | 'nature'

export interface ThemeConfig {
  name: string
  label: string
  colors: {
    void: string
    night: string
    slate: string
    panel: string
    border: string
    gold: string
    'gold-light': string
    'gold-dim': string
    ember: string
    frost: string
    mist: string
    parchment: string
  }
}

export const THEMES: Record<ThemeName, ThemeConfig> = {
  // Escuro dourado — clássico Solariam, tons abafados
  solariam: {
    name: 'solariam',
    label: 'Solariam Clássico',
    colors: {
      void: '#0d0e14',
      night: '#14161f',
      slate: '#1c1f2c',
      panel: '#22263a',
      border: '#383d52',
      gold: '#b8922a',
      'gold-light': '#d4aa48',
      'gold-dim': '#7a6020',
      ember: '#b84e28',
      frost: '#4a7ab8',
      mist: '#8a93a8',
      parchment: '#ddd5bc',
    },
  },

  // Pergaminho claro — papel envelhecido, tinta sépia
  light: {
    name: 'light',
    label: 'Pergaminho',
    colors: {
      void: '#f0ead8',
      night: '#e8e0ca',
      slate: '#ddd5ba',
      panel: '#f8f4ea',
      border: '#b8a882',
      gold: '#8a6e22',
      'gold-light': '#a88830',
      'gold-dim': '#6a5218',
      ember: '#9a3c18',
      frost: '#3a5e8a',
      mist: '#6a6450',
      parchment: '#2a2418',
    },
  },

  // Brasas — vermelho-laranja apagado, como carvão
  ember: {
    name: 'ember',
    label: 'Brasas',
    colors: {
      void: '#150a06',
      night: '#231008',
      slate: '#301508',
      panel: '#3c1c0c',
      border: '#6a3018',
      gold: '#c05c28',
      'gold-light': '#d87840',
      'gold-dim': '#8a3c18',
      ember: '#c83820',
      frost: '#c87030',
      mist: '#9a6050',
      parchment: '#f0ddd0',
    },
  },

  // Gelo — azul frio e escuro, neve ao luar
  frost: {
    name: 'frost',
    label: 'Gelo Lunar',
    colors: {
      void: '#08101e',
      night: '#0e182c',
      slate: '#142038',
      panel: '#1a2844',
      border: '#26385e',
      gold: '#4888c8',
      'gold-light': '#6aa8e0',
      'gold-dim': '#306898',
      ember: '#48c0c8',
      frost: '#2870c0',
      mist: '#6890b8',
      parchment: '#d8e8f4',
    },
  },

  // Vazio — roxo escuro, espaço profundo
  void: {
    name: 'void',
    label: 'Vazio Estelar',
    colors: {
      void: '#0a080e',
      night: '#12101a',
      slate: '#1c1828',
      panel: '#241e34',
      border: '#382e50',
      gold: '#8848cc',
      'gold-light': '#a868e8',
      'gold-dim': '#6030a0',
      ember: '#c84890',
      frost: '#4868d8',
      mist: '#786898',
      parchment: '#d8cce8',
    },
  },

  // Floresta — verde musgo escuro, tons de madeira
  nature: {
    name: 'nature',
    label: 'Floresta',
    colors: {
      void: '#080e08',
      night: '#101808',
      slate: '#182010',
      panel: '#1e2c14',
      border: '#2c4020',
      gold: '#5aa040',
      'gold-light': '#78c058',
      'gold-dim': '#3c7828',
      ember: '#c07828',
      frost: '#288878',
      mist: '#709868',
      parchment: '#d8ecd0',
    },
  },
}

export interface Settings {
  theme: ThemeName
  movementUnit: MovementUnit
  displayMode: DisplayMode
}

export const DEFAULT_SETTINGS: Settings = {
  theme: 'solariam',
  movementUnit: 'meters',
  displayMode: 'bars',
}
