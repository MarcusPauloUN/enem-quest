import Phaser from 'phaser'
import { EventBus, Events } from '../EventBus'

export class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MenuScene' })
  }

  create() {
    const { width, height } = this.scale

    // Background gradiente simulado com retângulos
    this.add.rectangle(width / 2, height / 2, width, height, 0x1a1a2e)
    this.add.rectangle(width / 2, height * 0.7, width, height * 0.6, 0x16213e)

    // Título
    this.add
      .text(width / 2, height * 0.2, 'ENEM QUEST', {
        fontFamily: 'monospace',
        fontSize: '40px',
        color: '#FFD700',
        stroke: '#000000',
        strokeThickness: 6,
      })
      .setOrigin(0.5)

    this.add
      .text(width / 2, height * 0.32, 'Conquiste o conhecimento. Vença o ENEM.', {
        fontFamily: 'monospace',
        fontSize: '13px',
        color: '#aaaacc',
      })
      .setOrigin(0.5)

    // Botão Jogar
    this.makeButton(width / 2, height * 0.52, 'INICIAR JORNADA', 0x4a90d9, () => {
      this.scene.start('WorldMapScene')
    })

    // Versão
    this.add
      .text(10, height - 20, 'v0.1.0 MVP', {
        fontFamily: 'monospace',
        fontSize: '10px',
        color: '#555566',
      })

    // Animação de estrelas simples
    this.spawnStars(width, height)

    EventBus.on(Events.USER_LOGGED_IN, () => { /* desbloqueia botão continuar */ })

    EventBus.emit(Events.SCENE_READY, this)
  }

  private makeButton(x: number, y: number, label: string, color: number, cb: () => void) {
    const btn = this.add.rectangle(x, y, 260, 48, color, 0.9).setInteractive({ useHandCursor: true })
    const txt = this.add.text(x, y, label, {
      fontFamily: 'monospace',
      fontSize: '14px',
      color: '#ffffff',
    }).setOrigin(0.5)

    btn.on('pointerover', () => btn.setFillStyle(color, 1))
    btn.on('pointerout', () => btn.setFillStyle(color, 0.9))
    btn.on('pointerdown', cb)

    void txt
    return btn
  }

  private spawnStars(width: number, height: number) {
    for (let i = 0; i < 60; i++) {
      const x = Phaser.Math.Between(0, width)
      const y = Phaser.Math.Between(0, height * 0.5)
      const star = this.add.circle(x, y, Phaser.Math.Between(1, 2), 0xffffff, Phaser.Math.FloatBetween(0.3, 1))
      this.tweens.add({
        targets: star,
        alpha: 0.1,
        duration: Phaser.Math.Between(800, 2000),
        yoyo: true,
        repeat: -1,
        delay: Phaser.Math.Between(0, 1000),
      })
    }
  }

  shutdown() {
    EventBus.off(Events.USER_LOGGED_IN)
  }
}
