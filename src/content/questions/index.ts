import type { Question } from '../../types/question.d'
import { QUESTIONS_LINGUAGENS } from './linguagens'
import { QUESTIONS_HUMANAS } from './humanas'
import { QUESTIONS_NATUREZA } from './natureza'
import { QUESTIONS_MATEMATICA } from './matematica'

const ALL_QUESTIONS: Question[] = [
  ...QUESTIONS_LINGUAGENS,
  ...QUESTIONS_HUMANAS,
  ...QUESTIONS_NATUREZA,
  ...QUESTIONS_MATEMATICA,
]

const SUBJECT_MAP: Record<string, string> = {
  portugues:  'linguagens',
  ingles:     'linguagens',
  linguagens: 'linguagens',
  humanas:    'humanas',
  natureza:   'natureza',
  matematica: 'matematica',
}

export function getQuestionsForKingdom(subject: string): Question[] {
  const apiSubject = SUBJECT_MAP[subject] ?? subject
  return ALL_QUESTIONS.filter(q => q.subject === apiSubject)
}

export function getQuestionsForKingdomByDifficulty(
  subject: string,
  difficulty: 1 | 2 | 3,
): Question[] {
  return getQuestionsForKingdom(subject).filter(q => q.difficulty === difficulty)
}

export { ALL_QUESTIONS }
