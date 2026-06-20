export function xpForLevel(level: number): number {
  if (level <= 1) return 0
  return Math.floor(100 * Math.pow(1.2, level - 2))
}

export function totalXpForLevel(level: number): number {
  let total = 0
  for (let i = 2; i <= level; i++) total += xpForLevel(i)
  return total
}

export function levelFromTotalXP(totalXp: number): number {
  let level = 1
  while (totalXp >= totalXpForLevel(level + 1)) level++
  return level
}

export const XP_REWARDS = {
  QUESTION_EASY: 10,
  QUESTION_MEDIUM: 20,
  QUESTION_HARD: 30,
  DUNGEON_COMPLETE: 50,
  BOSS_DEFEAT: 100,
  ESCAPE_ROOM: 75,
  PERFECT_BOSS: 150,
  SPEED_BONUS: 15,
} as const
