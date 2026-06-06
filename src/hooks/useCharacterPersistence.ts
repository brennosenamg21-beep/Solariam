import { useEffect, useRef } from 'react'
import type { Character } from '../types/character'

const STORAGE_KEY = 'solariam-character'

/** Salva o personagem no localStorage sempre que mudar */
export function useAutoSave(character: Character) {
  // Evita salvar na montagem inicial com dados em branco
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(character))
    } catch {
      console.warn('Não foi possível salvar no localStorage.')
    }
  }, [character])
}

/** Carrega o personagem salvo no localStorage, se existir */
export function loadSavedCharacter(): Partial<Character> | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as Partial<Character>
  } catch {
    return null
  }
}

/** Exporta o personagem atual como arquivo .json */
export function exportCharacter(character: Character) {
  const json = JSON.stringify(character, null, 2)
  const blob = new Blob([json], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  const filename = `${character.name || 'personagem'}-solariam.json`
    .toLowerCase()
    .replace(/\s+/g, '-')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

/** Importa um arquivo .json e retorna o personagem parseado */
export function importCharacter(): Promise<Partial<Character>> {
  return new Promise((resolve, reject) => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.json,application/json'
    input.onchange = () => {
      const file = input.files?.[0]
      if (!file) {
        reject(new Error('Nenhum arquivo selecionado.'))
        return
      }
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target?.result as string) as Partial<Character>
          resolve(data)
        } catch {
          reject(new Error('Arquivo inválido ou corrompido.'))
        }
      }
      reader.readAsText(file)
    }
    input.click()
  })
}
