export type Subject = 'matematica' | 'linguagens' | 'humanas' | 'natureza' | 'interdisciplinar'
export type Difficulty = 1 | 2 | 3
export type AnswerKey = 'A' | 'B' | 'C' | 'D' | 'E'

export interface Question {
  id: string
  year: number
  subject: Subject
  topic: string
  difficulty: Difficulty
  statement: string
  image_url: string | null
  options: Record<AnswerKey, string>
  answer: AnswerKey
  explanation?: string
  tags?: string[]
}

export interface QuizPayload {
  question: Question
  context: 'dungeon' | 'boss' | 'escape_room'
  clueId?: string
  clueHint?: string
  bossAbilities?: ActiveAbility[]
}

export interface ActiveAbility {
  id: string
  effect: 'shuffle_options' | 'hide_statement' | 'double_damage' | 'remove_option'
  turnsLeft: number
}

export interface QuizAnswerPayload {
  correct: boolean
  answer: AnswerKey
  timeSpent: number
  itemUsed: string | null
  clueId?: string
}
