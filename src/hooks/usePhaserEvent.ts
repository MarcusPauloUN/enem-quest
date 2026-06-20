import { useEffect } from 'react'
import { EventBus } from '@game/EventBus'

export function usePhaserEvent<T = unknown>(
  event: string,
  callback: (data: T) => void
) {
  useEffect(() => {
    EventBus.on(event, callback)
    return () => {
      EventBus.off(event, callback)
    }
  }, [event, callback])
}
