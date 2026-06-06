export type MovementUnit = 'meters' | 'feet'

export type DisplayMode = 'bars' | 'symbols'

export type ThemeName = 
  | 'solariam'      // Tema padrão (escuro dourado)
  | 'light'         // Tema claro
  | 'ember'         // Tema brasas/vermelho
  | 'frost'         // Tema gelo/azul
  | 'void'          // Tema vazio/roxo escuro
  | 'nature'        // Tema natureza/verde

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
  solariam: {
    name: 'solariam',
    label: 'Solariam Clássico',
    colors: {
      void: '#0a0b10',
      night: '#12141c',
      slate: '#1a1d28',
      panel: '#222633',
      border: '#3a3f52',
      gold: '#c9a227',
      'gold-light': '#e8c547',
      'gold-dim': '#8a7120',
      ember: '#d45a2a',
      frost: '#5b8fd4',
      mist: '#9aa3b8',
      parchment: '#e8e0cc',
    },
  },
  light: {
    name: 'light',
    label: 'Claro (Pergaminho)',
    colors: {
      void: '#f5f0e8',
      night: '#ebe3d6',
      slate: '#ddd5c4',
      panel: '#ffffff',
      border: '#c9b896',
      gold: '#b8962e',
      'gold-light': '#d4b03a',
      'gold-dim': '#8a7120',
      ember: '#c04a1a',
      frost: '#4a7bc0',
      mist: '#6b7280',
      parchment: '#2d2a24',
    },
  },
  ember: {
    name: 'ember',
    label: 'Brasas Ardentes',
    colors: {
      void: '#1a0a05',
      night: '#2d140c',
      slate: '#3d1f10',
      panel: '#4a2514',
      border: '#8b4513',
      gold: '#ff6b1a',
      'gold-light': '#ff9944',
      'gold-dim': '#cc5515',
      ember: '#ff3300',
      frost: '#ffaa33',
      mist: '#cc8866',
      parchment: '#ffeedd',
    },
  },
  frost: {
    name: 'frost',
    label: 'Gelo Eterno',
    colors: {
      void: '#050a1a',
      night: '#0c142d',
      slate: '#101f3d',
      panel: '#14254a',
      border: '#1e3a5f',
      gold: '#44aaff',
      'gold-light': '#77ccff',
      'gold-dim': '#3388cc',
      ember: '#00ffff',
      frost: '#0088ff',
      mist: '#88ccff',
      parchment: '#e0f0ff',
    },
  },
  void: {
    name: 'void',
    label: 'Vazio Estelar',
    colors: {
      void: '#05050a',
      night: '#0d0d1a',
      slate: '#1a1a2e',
      panel: '#22223a',
      border: '#3a3a5a',
      gold: '#aa44ff',
      'gold-light': '#cc77ff',
      'gold-dim': '#8833cc',
      ember: '#ff44aa',
      frost: '#4488ff',
      mist: '#8888aa',
      parchment: '#e0d0f0',
    },
  },
  nature: {
    name: 'nature',
    label: 'Natureza Viva',
    colors: {
      void: '#051a05',
      night: '#0d2d0d',
      slate: '#103d10',
      panel: '#144a14',
      border: '#1e5f1e',
      gold: '#44cc44',
      'gold-light': '#77ee77',
      'gold-dim': '#33aa33',
      ember: '#ff8800',
      frost: '#00aa88',
      mist: '#88cc88',
      parchment: '#e0ffe0',
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