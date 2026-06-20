import Phaser from 'phaser'
import { EventBus, Events } from '../EventBus'

export class VictoryScene extends Phaser.Scene {
  constructor() {
    super({ key: 'VictoryScene' })
  }

  init(data: {
    xpGained: number
    items: { itemId: string; quantity: number }[]
    returnScene: string
    returnData: Record<string, unknown>
  }) {
    this._data = data
  }

  private _data!: {
    xpGained: number
    items: { itemId: string; quantity: number }[]
    returnScene: string
    returnData: Record<string, unknown>
  }

  create() {
    const { width, height } = this.scale
    this.add.rectangle(width / 2, height / 2, width, height, 0x0a1a0a)

    this.add.text(width / 2, height * 0.2, '⚔  VITÓRIA!  ⚔', {
      fontFamily: 'monospace',
      fontSize: '28px',
      color: '#FFD700',
    }).setOrigin(0.5)

    this.add.text(width / 2, height * 0.38, `+ ${this._data.xpGained} XP`, {
      fontFamily: 'monospace',
      fontSize: '22px',
      color: '#3498db',
    }).setOrigin(0.5)

    const itemNames = this._data.items.map((i) => `  • ${i.itemId.replace(/_/g, ' ')}`).join('\n')
    if (itemNames) {
      this.add.text(width / 2, height * 0.52, `Itens obtidos:\n${itemNames}`, {
        fontFamily: 'monospace',
        fontSize: '12px',
        color: '#aaffaa',
        align: 'center',
      }).setOrigin(0.5)
    }

    // Partículas de vitória simples
    for (let i = 0; i < 20; i++) {
      const star = this.add.text(
        Phaser.Math.Between(20, width - 20),
        Phaser.Math.Between(20, height - 20),
        '✦',
        { fontSize: '16px', color: '#FFD700' }
      )
      this.tweens.add({
        targets: star,
        y: star.y - 40,
        alpha: 0,
        duration: 1500,
        delay: i * 80,
        onComplete: () => star.destroy(),
      })
    }

    const continueBtn = this.add
      .rectangle(width / 2, height * 0.78, 220, 40, 0x27ae60)
      .setInteractive({ useHandCursor: true })
    this.add.text(width / 2, height * 0.78, 'CONTINUAR', {
      fontFamily: 'monospace',
      fontSize: '14px',
      color: '#ffffff',
    }).setOrigin(0.5).setDepth(1)

    continueBtn.on('pointerdown', () => {
      EventBus.emit(Events.RESUME_GAME)
      this.scene.start(this._data.returnScene, this._data.returnData)
    })

    EventBus.emit(Events.SCENE_READY, this)
  }
}
