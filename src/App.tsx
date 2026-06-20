import PhaserGame from '@game/PhaserGame'
import { HUD } from '@ui/hud/HUD'
import { QuizModal } from '@ui/modals/QuizModal'

function App() {
  return (
    <div className="relative w-screen h-screen bg-black overflow-hidden">
      {/* Canvas do Phaser */}
      <PhaserGame />

      {/* Overlays React */}
      <HUD />
      <QuizModal />
    </div>
  )
}

export default App
