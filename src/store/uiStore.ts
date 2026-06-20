import { create } from 'zustand'
import type { QuizPayload } from '../types/question.d'
import type { LootPayload } from '../types/game.d'

interface UIState {
  quizOpen: boolean
  quizPayload: QuizPayload | null
  lootOpen: boolean
  lootPayload: LootPayload | null
  inventoryOpen: boolean
  gameOverOpen: boolean
  openQuiz: (payload: QuizPayload) => void
  closeQuiz: () => void
  openLoot: (payload: LootPayload) => void
  closeLoot: () => void
  openInventory: () => void
  closeInventory: () => void
  openGameOver: () => void
  closeGameOver: () => void
}

export const useUIStore = create<UIState>((set) => ({
  quizOpen: false,
  quizPayload: null,
  lootOpen: false,
  lootPayload: null,
  inventoryOpen: false,
  gameOverOpen: false,

  openQuiz: (payload) => set({ quizOpen: true, quizPayload: payload }),
  closeQuiz: () => set({ quizOpen: false, quizPayload: null }),
  openLoot: (payload) => set({ lootOpen: true, lootPayload: payload }),
  closeLoot: () => set({ lootOpen: false, lootPayload: null }),
  openInventory: () => set({ inventoryOpen: true }),
  closeInventory: () => set({ inventoryOpen: false }),
  openGameOver: () => set({ gameOverOpen: true }),
  closeGameOver: () => set({ gameOverOpen: false }),
}))
