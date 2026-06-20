import Phaser from 'phaser'
import { BootScene } from './scenes/BootScene'
import { PreloadScene } from './scenes/PreloadScene'
import { MenuScene } from './scenes/MenuScene'
import { WorldMapScene } from './scenes/WorldMapScene'
import { DungeonScene } from './scenes/DungeonScene'
import { LibraryScene } from './scenes/LibraryScene'
import { BattleScene } from './scenes/BattleScene'
import { VictoryScene } from './scenes/VictoryScene'
import { GameOverScene } from './scenes/GameOverScene'

export const gameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  backgroundColor: '#1a1a2e',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 800,
    height: 600,
  },
  physics: {
    default: 'arcade',
    arcade: { debug: false },
  },
  scene: [
    BootScene,
    PreloadScene,
    MenuScene,
    WorldMapScene,
    DungeonScene,
    LibraryScene,
    BattleScene,
    VictoryScene,
    GameOverScene,
  ],
}
