import Phaser from 'phaser'
import { EventBus, Events } from '../EventBus'

export class GameOverScene extends Phaser.Scene {
  private _data!: {
    returnScene: string
    returnData: Record<string, unknown>
    bossId: string
    kingdomId: string
  }

  constructor() {
    super({ key: 'GameOverScene' })
  }

  init(data: typeof this._data) {
    this._data = data
  }

  create() {
    const { width, height } = this.scale
    this.add.rectangle(width / 2, height / 2, width, height, 0x1a0a0a)

    this.add.text(width / 2, height * 0.2, '💀  DERROTA', {
      fontFamily: 'monospace',
      fontSize: '28px',
      color: '#e74c3c',
    }).setOrigin(0.5)

    this.add.text(width / 2, height * 0.38, 'Você foi derrotado...\nmas o conhecimento permanece!', {
      fontFamily: 'monospace',
      fontSize: '13px',
      color: '#aaaacc',
      align: 'center',
    }).setOrigin(0.5)

    // Botão tentar novamente
    const retryBtn = this.add
      .rectangle(width / 2, height * 0.58, 200, 40, 0xe74c3c)
      .setInteractive({ useHandCursor: true })
    this.add.text(width / 2, height * 0.58, '🔄  TENTAR NOVAMENTE', {
      fontFamily: 'monospace',
      fontSize: '10px',
      color: '#ffffff',
    }).setOrigin(0.5).setDepth(1)

    retryBtn.on('pointerdown', () => {
      // Restaura HP parcial ao tentar novamente
      const maxHp = this.registry.get('maxHp') as number
      this.registry.set('hp', Math.floor(maxHp * 0.5))
      this.scene.start(this._data.returnScene, this._data.returnData)
    })

    // Botão voltar ao mapa
    const mapBtn = this.add
      .rectangle(width / 2, height * 0.72, 200, 40, 0x333344)
      .setInteractive({ useHandCursor: true })
    this.add.text(width / 2, height * 0.72, '🗺  VOLTAR AO MAPA', {
      fontFamily: 'monospace',
      fontSize: '10px',
      color: '#ffffff',
    }).setOrigin(0.5).setDepth(1)

    mapBtn.on('pointerdown', () => {
      const maxHp = this.registry.get('maxHp') as number
      this.registry.set('hp', Math.floor(maxHp * 0.5))
      EventBus.emit(Events.RESUME_GAME)
      this.scene.start('WorldMapScene')
    })

    EventBus.emit(Events.SCENE_READY, this)
  }
}
