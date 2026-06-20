import { create } from 'zustand'

interface User {
  id: string
  email: string
  username: string
}

interface SessionState {
  user: User | null
  loading: boolean
  setUser: (user: User | null) => void
  setLoading: (loading: boolean) => void
}

export const useSessionStore = create<SessionState>((set) => ({
  user: null,
  loading: true,
  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),
}))
