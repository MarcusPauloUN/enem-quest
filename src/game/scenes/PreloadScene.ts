import Phaser from 'phaser'

export class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' })
  }

  preload() {
    const { width, height } = this.scale

    // Barra de progresso
    const barBg = this.add.rectangle(width / 2, height / 2, 400, 24, 0x333344)
    const bar = this.add.rectangle(width / 2 - 200, height / 2, 0, 20, 0x4a90d9)
    bar.setOrigin(0, 0.5)

    const label = this.add
      .text(width / 2, height / 2 + 30, 'Carregando...', {
        fontFamily: 'monospace',
        fontSize: '14px',
        color: '#ffffff',
      })
      .setOrigin(0.5)

    this.load.on('progress', (value: number) => {
      bar.width = 400 * value
      label.setText(`Carregando... ${Math.floor(value * 100)}%`)
    })

    void barBg

    // Para o MVP usamos placeholders; assets reais entram na Fase 4
    // this.load.image('player', '/assets/sprites/player.png')
    // this.load.tilemapTiledJSON('world-map', '/assets/tilemaps/world-map.json')
  }

  create() {
    this.scene.start('MenuScene')
  }
}
