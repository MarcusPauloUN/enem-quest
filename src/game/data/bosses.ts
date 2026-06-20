export type BossAbilityEffect =
  | 'shuffle_options'
  | 'hide_statement'
  | 'double_damage'
  | 'remove_option'

export interface BossAbility {
  id: string
  name: string
  triggerAtHpPercent: number
  effect: BossAbilityEffect
  duration: number
  announcement: string
}

export interface BossDefinition {
  id: string
  name: string
  kingdom: string
  hp: number
  attackDamage: number
  color: number
  questionSubjects: string[]
  questionDifficulty: 1 | 2 | 3
  abilities: BossAbility[]
  loot: { itemId: string; chance: number }[]
  xpReward: number
}

export const BOSSES: Record<string, BossDefinition> = {
  boss_linguagens: {
    id: 'boss_linguagens',
    name: 'O Narrador Sombrio',
    kingdom: 'linguagens',
    hp: 200,
    attackDamage: 15,
    color: 0x4a90d9,
    questionSubjects: ['linguagens'],
    questionDifficulty: 2,
    abilities: [
      {
        id: 'ab_shuffle',
        name: 'Embaralhamento Literário',
        triggerAtHpPercent: 0.6,
        effect: 'shuffle_options',
        duration: 2,
        announcement: 'O Narrador embaralha as histórias! As alternativas mudaram de lugar!',
      },
      {
        id: 'ab_hide',
        name: 'Névoa das Palavras',
        triggerAtHpPercent: 0.3,
        effect: 'hide_statement',
        duration: 1,
        announcement: 'A névoa encobre parte do texto! Leia com atenção o que ainda aparece!',
      },
    ],
    loot: [
      { itemId: 'hint_potion', chance: 0.8 },
      { itemId: 'shield', chance: 0.4 },
      { itemId: 'knowledge_sword', chance: 0.3 },
    ],
    xpReward: 100,
  },

  boss_humanas: {
    id: 'boss_humanas',
    name: 'O Tirano Histórico',
    kingdom: 'humanas',
    hp: 250,
    attackDamage: 20,
    color: 0xe8a838,
    questionSubjects: ['humanas'],
    questionDifficulty: 2,
    abilities: [
      {
        id: 'ab_double',
        name: 'Golpe do Déspota',
        triggerAtHpPercent: 0.5,
        effect: 'double_damage',
        duration: 1,
        announcement: 'O Tirano concentra seu poder! O próximo erro será devastador!',
      },
      {
        id: 'ab_shuffle2',
        name: 'Reescrita da História',
        triggerAtHpPercent: 0.25,
        effect: 'shuffle_options',
        duration: 3,
        announcement: 'O Tirano reescreve a história! As alternativas foram reorganizadas!',
      },
    ],
    loot: [
      { itemId: 'hint_potion', chance: 0.7 },
      { itemId: 'health_potion', chance: 0.9 },
      { itemId: 'knowledge_sword', chance: 0.4 },
    ],
    xpReward: 120,
  },

  boss_natureza: {
    id: 'boss_natureza',
    name: 'O Químico Corrompido',
    kingdom: 'natureza',
    hp: 300,
    attackDamage: 25,
    color: 0x4caf50,
    questionSubjects: ['natureza'],
    questionDifficulty: 3,
    abilities: [
      {
        id: 'ab_remove',
        name: 'Catálise Reversa',
        triggerAtHpPercent: 0.7,
        effect: 'remove_option',
        duration: 1,
        announcement: 'A catálise remove uma alternativa errada... ou será certa?',
      },
      {
        id: 'ab_double2',
        name: 'Reação em Cadeia',
        triggerAtHpPercent: 0.4,
        effect: 'double_damage',
        duration: 2,
        announcement: 'Reação em cadeia! Os próximos dois erros causam dano duplo!',
      },
      {
        id: 'ab_hide2',
        name: 'Fumaça Tóxica',
        triggerAtHpPercent: 0.2,
        effect: 'hide_statement',
        duration: 2,
        announcement: 'Fumaça tóxica encobre o enunciado!',
      },
    ],
    loot: [
      { itemId: 'shield', chance: 0.6 },
      { itemId: 'knowledge_sword', chance: 0.5 },
      { itemId: 'hint_potion', chance: 0.8 },
    ],
    xpReward: 150,
  },

  boss_matematica: {
    id: 'boss_matematica',
    name: 'O Mago das Equações',
    kingdom: 'matematica',
    hp: 350,
    attackDamage: 30,
    color: 0x9c27b0,
    questionSubjects: ['matematica'],
    questionDifficulty: 3,
    abilities: [
      {
        id: 'ab_shuffle3',
        name: 'Permutação Caótica',
        triggerAtHpPercent: 0.75,
        effect: 'shuffle_options',
        duration: 4,
        announcement: 'Permutação! As alternativas nunca param de trocar de lugar!',
      },
      {
        id: 'ab_double3',
        name: 'Função Exponencial',
        triggerAtHpPercent: 0.5,
        effect: 'double_damage',
        duration: 1,
        announcement: 'Dano cresce exponencialmente! Próximo erro = dano duplo!',
      },
      {
        id: 'ab_hide3',
        name: 'Variável Oculta',
        triggerAtHpPercent: 0.25,
        effect: 'hide_statement',
        duration: 3,
        announcement: 'Uma variável oculta! Parte do problema desapareceu!',
      },
    ],
    loot: [
      { itemId: 'knowledge_sword', chance: 0.9 },
      { itemId: 'shield', chance: 0.7 },
      { itemId: 'hint_potion', chance: 0.9 },
      { itemId: 'health_potion', chance: 0.8 },
    ],
    xpReward: 200,
  },
}
