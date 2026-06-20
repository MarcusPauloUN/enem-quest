import { create } from 'zustand'

interface GameState {
  hp: number
  maxHp: number
  xp: number
  level: number
  currentKingdom: string | null
  setHUD: (hp: number, maxHp: number, xp: number, level: number, kingdom: string | null) => void
  applyDamage: (amount: number) => void
  heal: (amount: number) => void
  addXP: (amount: number) => void
}

export const useGameStore = create<GameState>((set) => ({
  hp: 100,
  maxHp: 100,
  xp: 0,
  level: 1,
  currentKingdom: null,

  setHUD: (hp, maxHp, xp, level, kingdom) =>
    set({ hp, maxHp, xp, level, currentKingdom: kingdom }),

  applyDamage: (amount) =>
    set((s) => ({ hp: Math.max(0, s.hp - amount) })),

  heal: (amount) =>
    set((s) => ({ hp: Math.min(s.maxHp, s.hp + amount) })),

  addXP: (amount) =>
    set((s) => ({ xp: s.xp + amount })),
}))
