import Phaser from 'phaser'
import { EventBus, Events } from '../EventBus'
import type { Arena } from '../data/worlds'

interface EnemyPlaceholder {
  rect: Phaser.GameObjects.Rectangle
  label: Phaser.GameObjects.Text
  startX: number
  dir: number
  speed: number
  defeated: boolean
}

interface DungeonInitData {
  kingdomId: string
  dungeonId: string
  kingdomName: string
  kingdomColor: number
  kingdomIcon: string
  arenas: Arena[]
}

export class DungeonScene extends Phaser.Scene {
  private player!: Phaser.GameObjects.Rectangle
  private playerSpeed = 180
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
  private wasd!: { up: Phaser.Input.Keyboard.Key; down: Phaser.Input.Keyboard.Key; left: Phaser.Input.Keyboard.Key; right: Phaser.Input.Keyboard.Key }
  private enemies: EnemyPlaceholder[] = []
  private bossZone!: Phaser.GameObjects.Rectangle
  private kingdomId = ''
  private dungeonId = ''
  private kingdomName = ''
  private kingdomColor = 0x4a90d9
  private kingdomIcon = '⚔'
  private arenas: Arena[] = []
  private isTransitioning = false
  private libraryBtn!: Phaser.GameObjects.Rectangle

  constructor() {
    super({ key: 'DungeonScene' })
  }

  init(data: DungeonInitData) {
    this.kingdomId = data.kingdomId ?? 'w1_mat'
    this.dungeonId = data.dungeonId ?? `${data.kingdomId}_01`
    this.kingdomName = data.kingdomName ?? 'Dungeon'
    this.kingdomColor = data.kingdomColor ?? 0x4a90d9
    this.kingdomIcon = data.kingdomIcon ?? '⚔'
    this.arenas = data.arenas ?? []
    this.enemies = []
    this.isTransitioning = false
  }

  create() {
    const { width, height } = this.scale
    const kColor = this.kingdomColor

    // Background
    this.add.rectangle(width / 2, height / 2, width, height, 0x0a0a1a)
    this.drawDungeonWalls(width, height, kColor)

    // Título
    this.add
      .text(width / 2, 18, `${this.kingdomIcon}  ${this.kingdomName.toUpperCase()}`, {
        fontFamily: 'monospace',
        fontSize: '11px',
        color: `#${kColor.toString(16).padStart(6, '0')}`,
      })
      .setOrigin(0.5)

    // Inimigos (3 por dungeon)
    const enemyPositions = [
      { x: width * 0.2, y: height * 0.3 },
      { x: width * 0.6, y: height * 0.5 },
      { x: width * 0.75, y: height * 0.25 },
    ]
    for (const pos of enemyPositions) {
      const rect = this.add.rectangle(pos.x, pos.y, 28, 28, 0xe74c3c)
      const label = this.add.text(pos.x, pos.y, '👿', { fontSize: '16px' }).setOrigin(0.5)
      this.enemies.push({ rect, label, startX: pos.x, dir: 1, speed: 40 + Math.random() * 30, defeated: false })
    }

    // Zona do Boss
    this.bossZone = this.add.rectangle(width * 0.85, height * 0.5, 50, 70, kColor, 0.7)
    this.add.text(width * 0.85, height * 0.5, '🚪', { fontSize: '24px' }).setOrigin(0.5)
    this.add.text(width * 0.85, height * 0.5 + 45, 'CHEFÃO', { fontFamily: 'monospace', fontSize: '8px', color: '#ffffff' }).setOrigin(0.5)

    // Botão Biblioteca do Ancião
    const libX = width * 0.42
    const libY = height - 22
    this.libraryBtn = this.add.rectangle(libX, libY, 180, 28, 0x2a1a5a).setInteractive({ useHandCursor: true }).setDepth(10)
    this.add.text(libX, libY, '📚 Biblioteca do Ancião', { fontFamily: 'monospace', fontSize: '9px', color: '#ccaaff' }).setOrigin(0.5).setDepth(11)
    this.libraryBtn.on('pointerover', () => this.libraryBtn.setFillStyle(0x4a2a8a))
    this.libraryBtn.on('pointerout', () => this.libraryBtn.setFillStyle(0x2a1a5a))
    this.libraryBtn.on('pointerdown', () => this.openLibrary())

    // Botão voltar ao mapa
    const backBtn = this.add.rectangle(50, height - 22, 80, 28, 0x333344).setInteractive({ useHandCursor: true })
    this.add.text(50, height - 22, '← MAPA', { fontFamily: 'monospace', fontSize: '9px', color: '#aaaacc' }).setOrigin(0.5)
    backBtn.on('pointerdown', () => this.returnToMap())

    // Jogador
    this.player = this.add.rectangle(width * 0.1, height / 2, 24, 24, 0x00e5ff).setDepth(10)
    this.add.text(width * 0.1, height / 2, '🧙', { fontSize: '14px' }).setOrigin(0.5).setDepth(11)

    // Controles
    this.cursors = this.input.keyboard!.createCursorKeys()
    this.wasd = {
      up: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.W),
      down: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.S),
      left: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      right: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.D),
    }

    this.add
      .text(width / 2, height - 45, 'WASD para mover  •  Enfrente inimigos  •  Entre na porta do chefão', {
        fontFamily: 'monospace',
        fontSize: '8px',
        color: '#445566',
      })
      .setOrigin(0.5)

    EventBus.on(Events.RESUME_GAME, this.onResume, this)
    EventBus.emit(Events.SCENE_READY, this)
    this.emitHUD()
  }

  update(_time: number, delta: number) {
    if (this.isTransitioning) return

    const dt = delta / 1000
    const speed = this.playerSpeed * dt
    let vx = 0, vy = 0

    if (this.cursors.left.isDown || this.wasd.left.isDown) vx = -speed
    else if (this.cursors.right.isDown || this.wasd.right.isDown) vx = speed
    if (this.cursors.up.isDown || this.wasd.up.isDown) vy = -speed
    else if (this.cursors.down.isDown || this.wasd.down.isDown) vy = speed

    const { width, height } = this.scale
    this.player.x = Phaser.Math.Clamp(this.player.x + vx, 12, width - 12)
    this.player.y = Phaser.Math.Clamp(this.player.y + vy, 40, height - 60)

    // Patrulha dos inimigos
    for (const e of this.enemies) {
      if (e.defeated) continue
      e.rect.x += e.dir * e.speed * dt
      e.label.x = e.rect.x
      if (Math.abs(e.rect.x - e.startX) > 60) e.dir *= -1

      const dist = Phaser.Math.Distance.Between(this.player.x, this.player.y, e.rect.x, e.rect.y)
      if (dist < 28) this.triggerBattle(false, e)
    }

    // Boss
    const bossDistance = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.bossZone.x, this.bossZone.y)
    if (bossDistance < 40) this.triggerBattle(true)
  }

  private openLibrary() {
    if (this.isTransitioning) return
    this.isTransitioning = true

    this.cameras.main.flash(200, 100, 50, 200)
    this.time.delayedCall(250, () => {
      this.scene.start('LibraryScene', {
        kingdom: {
          id: this.kingdomId,
          name: this.kingdomName,
          color: this.kingdomColor,
          icon: this.kingdomIcon,
          arenas: this.arenas,
        },
        returnScene: 'DungeonScene',
        returnData: {
          kingdomId: this.kingdomId,
          dungeonId: this.dungeonId,
          kingdomName: this.kingdomName,
          kingdomColor: this.kingdomColor,
          kingdomIcon: this.kingdomIcon,
          arenas: this.arenas,
        },
      })
    })
  }

  private triggerBattle(isBoss: boolean, enemy?: EnemyPlaceholder) {
    if (this.isTransitioning) return
    this.isTransitioning = true

    if (enemy) {
      enemy.defeated = true
      enemy.rect.setVisible(false)
      enemy.label.setVisible(false)
    }

    this.cameras.main.flash(200, 255, 50, 50)
    this.time.delayedCall(250, () => {
      this.scene.start('BattleScene', {
        isBoss,
        bossId: isBoss ? `boss_${this.kingdomId}` : null,
        kingdomId: this.kingdomId,
        dungeonId: this.dungeonId,
        returnScene: 'DungeonScene',
        returnData: {
          kingdomId: this.kingdomId,
          dungeonId: this.dungeonId,
          kingdomName: this.kingdomName,
          kingdomColor: this.kingdomColor,
          kingdomIcon: this.kingdomIcon,
          arenas: this.arenas,
        },
      })
    })
  }

  private returnToMap() {
    this.isTransitioning = true
    this.cameras.main.flash(300, 255, 255, 255)
    this.time.delayedCall(350, () => this.scene.start('WorldMapScene'))
  }

  private onResume() {
    this.isTransitioning = false
    this.emitHUD()
  }

  private emitHUD() {
    EventBus.emit(Events.UPDATE_HUD, {
      hp: this.registry.get('hp') as number,
      maxHp: this.registry.get('maxHp') as number,
      xp: this.registry.get('xp') as number,
      level: this.registry.get('level') as number,
      kingdom: this.kingdomName,
    })
  }

  private drawDungeonWalls(width: number, height: number, color: number) {
    const g = this.add.graphics()
    g.lineStyle(4, color, 0.5)
    g.strokeRect(8, 35, width - 16, height - 55)
    g.lineStyle(2, color, 0.15)
    for (let i = 0; i < 3; i++) {
      const x = Phaser.Math.Between(100, width - 150)
      const y = Phaser.Math.Between(60, height - 80)
      g.strokeRect(x, y, Phaser.Math.Between(40, 90), Phaser.Math.Between(30, 60))
    }
  }

  shutdown() {
    EventBus.off(Events.RESUME_GAME, this.onResume, this)
  }
}
