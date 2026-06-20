export interface KingdomDefinition {
  id: string
  name: string
  subject: string
  color: number
  unlockCondition: {
    type: 'start' | 'dungeon' | 'boss' | 'level'
    requiredId?: string
    requiredLevel?: number
  }
  bossId: string
}

export const KINGDOMS: KingdomDefinition[] = [
  {
    id: 'linguagens',
    name: 'Reino das Linguagens',
    subject: 'linguagens',
    color: 0x4a90d9,
    unlockCondition: { type: 'start' },
    bossId: 'boss_linguagens',
  },
  {
    id: 'humanas',
    name: 'Reino das Humanas',
    subject: 'humanas',
    color: 0xe8a838,
    unlockCondition: { type: 'dungeon', requiredId: 'ling_01', requiredLevel: 5 },
    bossId: 'boss_humanas',
  },
  {
    id: 'natureza',
    name: 'Reino da Natureza',
    subject: 'natureza',
    color: 0x4caf50,
    unlockCondition: { type: 'boss', requiredId: 'boss_humanas', requiredLevel: 12 },
    bossId: 'boss_natureza',
  },
  {
    id: 'matematica',
    name: 'Reino da Matemática',
    subject: 'matematica',
    color: 0x9c27b0,
    unlockCondition: { type: 'boss', requiredId: 'boss_natureza', requiredLevel: 20 },
    bossId: 'boss_matematica',
  },
]
