import { useCallback } from 'react'
import { useGameStore } from '@store/gameStore'
import { EventBus, Events } from '@game/EventBus'
import { usePhaserEvent } from '@hooks/usePhaserEvent'
import type { HUDState } from '../../types/game.d'

export function HUD() {
  const { hp, maxHp, xp, level, setHUD } = useGameStore()

  const onHUDUpdate = useCallback((data: HUDState) => {
    setHUD(data.hp, data.maxHp, data.xp, data.level, data.kingdom)
  }, [setHUD])

  usePhaserEvent<HUDState>(Events.UPDATE_HUD, onHUDUpdate)

  const hpPercent = Math.max(0, (hp / maxHp) * 100)
  const hpColor = hpPercent > 50 ? '#27ae60' : hpPercent > 25 ? '#f39c12' : '#e74c3c'

  return (
    <div className="absolute top-0 left-0 right-0 flex items-center gap-3 px-3 py-1.5 bg-black/60 pointer-events-none z-10">
      {/* HP */}
      <div className="flex items-center gap-1.5 min-w-[130px]">
        <span className="text-red-400 text-xs font-mono">❤</span>
        <div className="flex-1 bg-gray-800 h-3 rounded-sm overflow-hidden">
          <div
            className="h-full transition-all duration-300 rounded-sm"
            style={{ width: `${hpPercent}%`, backgroundColor: hpColor }}
          />
        </div>
        <span className="text-white text-[9px] font-mono whitespace-nowrap">{hp}/{maxHp}</span>
      </div>

      {/* XP */}
      <div className="flex items-center gap-1.5 min-w-[120px]">
        <span className="text-blue-400 text-xs font-mono">✦</span>
        <div className="flex-1 bg-gray-800 h-3 rounded-sm overflow-hidden">
          <div
            className="h-full bg-blue-500 transition-all duration-300 rounded-sm"
            style={{ width: `${Math.min(100, (xp % 100))}%` }}
          />
        </div>
        <span className="text-white text-[9px] font-mono">{xp} XP</span>
      </div>

      {/* Nível */}
      <div className="flex items-center gap-1">
        <span className="text-yellow-400 text-[9px] font-mono">Nv.</span>
        <span className="text-yellow-300 text-xs font-mono font-bold">{level}</span>
      </div>

      {/* Botão menu (futuro) */}
      <div className="ml-auto">
        <button
          className="pointer-events-auto text-gray-400 hover:text-white font-mono text-[9px] px-2 py-0.5 border border-gray-700 hover:border-gray-500 transition-colors"
          onClick={() => EventBus.emit(Events.SAVE_PROGRESS, {})}
        >
          💾
        </button>
      </div>
    </div>
  )
}
