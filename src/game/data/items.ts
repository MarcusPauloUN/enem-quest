export type ItemEffect =
  | { type: 'heal'; value: number }
  | { type: 'hint'; eliminateOptions: number }
  | { type: 'shield'; absorption: number }
  | { type: 'damage_boost'; multiplier: number }

export interface ItemDefinition {
  id: string
  name: string
  description: string
  icon: string
  maxStack: number
  useContext: string[]
  effect: ItemEffect
}

export const ITEMS: Record<string, ItemDefinition> = {
  health_potion: {
    id: 'health_potion',
    name: 'Poção de Vida',
    description: 'Restaura 30 HP',
    icon: '🧪',
    maxStack: 5,
    useContext: ['dungeon', 'boss'],
    effect: { type: 'heal', value: 30 },
  },
  hint_potion: {
    id: 'hint_potion',
    name: 'Poção da Dica',
    description: 'Elimina 2 alternativas erradas ou destaca próximo objeto',
    icon: '💡',
    maxStack: 3,
    useContext: ['boss', 'escape_room'],
    effect: { type: 'hint', eliminateOptions: 2 },
  },
  shield: {
    id: 'shield',
    name: 'Escudo do Sábio',
    description: 'Absorve o próximo ataque do chefão',
    icon: '🛡️',
    maxStack: 2,
    useContext: ['boss', 'passive_on_defeat'],
    effect: { type: 'shield', absorption: 100 },
  },
  knowledge_sword: {
    id: 'knowledge_sword',
    name: 'Espada do Conhecimento',
    description: 'Próxima resposta certa causa 50% mais dano',
    icon: '⚔️',
    maxStack: 3,
    useContext: ['boss'],
    effect: { type: 'damage_boost', multiplier: 1.5 },
  },
}
