import { useState } from 'react'
import { useCharacter } from '../hooks/useCharacter'
import { AttributesPanel } from './sheet/AttributesPanel'
import { CharacterHeader } from './sheet/CharacterHeader'
import { GrimoirePanel } from './sheet/GrimoirePanel'
import { InventoryPanel } from './sheet/InventoryPanel'
import { NotesPanel } from './sheet/NotesPanel'
import { SkillsPanel } from './sheet/SkillsPanel'
import { VitalsPanel } from './sheet/VitalsPanel'
import { Panel } from './ui/Panel'
import { TabNav, type TabId } from './ui/TabNav'

export function CharacterSheet() {
  const [activeTab, setActiveTab] = useState<TabId>('ficha')
  const { character, updateCharacter, updateAttribute, updateSkill } = useCharacter()

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <header className="border-b border-solariam-border/60 pb-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-solariam-mist">
          Lendas de
        </p>
        <h1 className="font-display text-3xl font-bold tracking-wide text-solariam-gold-light md:text-4xl">
          Solariam
        </h1>
        <p className="mt-1 text-sm text-solariam-mist">Ficha de Personagem</p>
      </header>

      <TabNav active={activeTab} onChange={setActiveTab} />

      {activeTab === 'ficha' && (
        <div className="space-y-4">
          <Panel>
            <CharacterHeader character={character} onUpdate={updateCharacter} />
          </Panel>
          <div className="grid gap-4 lg:grid-cols-[minmax(0,280px)_1fr]">
            <AttributesPanel character={character} onUpdateAttribute={updateAttribute} />
            <VitalsPanel character={character} onUpdate={updateCharacter} />
          </div>
        </div>
      )}

      {activeTab === 'pericias' && (
        <SkillsPanel
          character={character}
          onUpdate={updateCharacter}
          onUpdateSkill={updateSkill}
        />
      )}

      {activeTab === 'inventario' && (
        <InventoryPanel character={character} onUpdate={updateCharacter} />
      )}

      {activeTab === 'grimorio' && (
        <GrimoirePanel character={character} onUpdate={updateCharacter} />
      )}

      {activeTab === 'notas' && <NotesPanel character={character} onUpdate={updateCharacter} />}
    </div>
  )
}
