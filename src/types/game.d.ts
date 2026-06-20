export interface HUDState {
  hp: number
  maxHp: number
  xp: number
  level: number
  kingdom: string | null
}

export interface LootItem {
  itemId: string
  name: string
  quantity: number
}

export interface LootPayload {
  items: LootItem[]
  xp: number
}

export type CalamityType = 'monster' | 'lava' | 'flood'

export interface CalamityPayload {
  type: CalamityType
  roomId: string
}
