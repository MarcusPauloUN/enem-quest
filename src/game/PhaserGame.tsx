import { useEffect, useRef, memo } from 'react'
import Phaser from 'phaser'
import { gameConfig } from './config'

const PhaserGame = memo(() => {
  const containerRef = useRef<HTMLDivElement>(null)
  const gameRef = useRef<Phaser.Game | null>(null)

  useEffect(() => {
    if (gameRef.current || !containerRef.current) return

    gameRef.current = new Phaser.Game({
      ...gameConfig,
      parent: containerRef.current,
    })

    return () => {
      gameRef.current?.destroy(true)
      gameRef.current = null
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="w-full h-full"
      style={{ touchAction: 'none' }}
    />
  )
})

PhaserGame.displayName = 'PhaserGame'

export default PhaserGame
