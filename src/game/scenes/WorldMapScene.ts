import Phaser from 'phaser'
import { EventBus, Events } from '../EventBus'
import { WORLDS, type World, type Kingdom } from '../data/worlds'

interface Card {
  bg: Phaser.GameObjects.Rectangle
  glow: Phaser.GameObjects.Rectangle
  icon: Phaser.GameObjects.Text
  label: Phaser.GameObjects.Text
  sub: Phaser.GameObjects.Text
  id: string
  color: number
}

export class WorldMapScene extends Phaser.Scene {
  private cards: Card[] = []
  private isTransitioning = false
  private titleText!: Phaser.GameObjects.Text
  private backBtn!: Phaser.GameObjects.Container
  private stars: Phaser.GameObjects.Rectangle[] = []

  constructor() {
    super({ key: 'WorldMapScene' })
  }

  create() {
    const { width, height } = this.scale
    this.isTransitioning = false


    this.drawBackground(width, height)
    this.spawnStars(width, height)

    this.titleText = this.add
      .text(width / 2, 28, 'SELECIONE A SÉRIE', {
        fontFamily: 'monospace',
        fontSize: '15px',
        color: '#FFD700',
      })
      .setOrigin(0.5)
      .setDepth(5)

    // Botão voltar (oculto no início)
    const backBg = this.add.rectangle(0, 0, 90, 26, 0x333344).setInteractive({ useHandCursor: true })
    const backLabel = this.add.text(0, 0, '← SÉRIES', { fontFamily: 'monospace', fontSize: '9px', color: '#aaaacc' }).setOrigin(0.5)
    this.backBtn = this.add.container(55, height - 22, [backBg, backLabel]).setDepth(10).setVisible(false)
    backBg.on('pointerdown', () => this.showWorlds())

    this.add
      .text(width / 2, height - 12, 'Escolha a série correspondente ao seu ano escolar', {
        fontFamily: 'monospace',
        fontSize: '9px',
        color: '#445566',
      })
      .setOrigin(0.5)
      .setDepth(5)

    this.showWorlds()

    EventBus.on(Events.RESUME_GAME, this.onResume, this)
    EventBus.emit(Events.SCENE_READY, this)
    this.emitHUD()
  }

  // ── Tela de seleção de Mundo (série) ─────────────────────────────────────

  private showWorlds() {
    this.clearCards()

    this.titleText.setText('SELECIONE A SÉRIE')
    this.backBtn.setVisible(false)

    const { width, height } = this.scale
    const cx = width / 2
    const cy = height / 2 - 20

    const offsets = [
      { x: cx - 200, y: cy },
      { x: cx,       y: cy - 60 },
      { x: cx + 200, y: cy },
    ]

    WORLDS.forEach((world, i) => {
      const pos = offsets[i]
      const color = [0x4a90d9, 0xe8a838, 0x9c27b0][i]
      const card = this.makeCard(
        pos.x, pos.y, 160, 120,
        color,
        ['1ª', '2ª', '3ª'][i],
        world.name.split('—')[0].trim(),
        `${world.kingdoms.length} matérias`,
        world.id,
      )
      card.bg.on('pointerdown', () => this.showKingdoms(world))
      this.cards.push(card)
    })
  }

  // ── Tela de seleção de Reino (matéria) ───────────────────────────────────

  private showKingdoms(world: World) {
    this.clearCards()

    this.titleText.setText(world.name.toUpperCase())
    this.backBtn.setVisible(true)

    const { width, height } = this.scale
    const cols = 3
    const cardW = 160
    const cardH = 100
    const padX = 28
    const padY = 30
    const totalW = cols * cardW + (cols - 1) * padX
    const startX = (width - totalW) / 2 + cardW / 2
    const startY = height / 2 - cardH - padY / 2

    world.kingdoms.forEach((kingdom, i) => {
      const col = i % cols
      const row = Math.floor(i / cols)
      const x = startX + col * (cardW + padX)
      const y = startY + row * (cardH + padY)

      const card = this.makeCard(
        x, y, cardW, cardH,
        kingdom.color,
        kingdom.icon,
        kingdom.name,
        `${kingdom.arenas.length} arenas`,
        kingdom.id,
      )
      card.bg.on('pointerdown', () => this.enterKingdom(kingdom))
      this.cards.push(card)
    })
  }

  private enterKingdom(kingdom: Kingdom) {
    if (this.isTransitioning) return
    this.isTransitioning = true

    this.cameras.main.flash(300, 255, 255, 255)
    this.time.delayedCall(350, () => {
      EventBus.emit(Events.SAVE_PROGRESS, {})
      this.scene.start('DungeonScene', {
        kingdomId: kingdom.id,
        dungeonId: `${kingdom.id}_01`,
        kingdomName: kingdom.name,
        kingdomColor: kingdom.color,
        kingdomIcon: kingdom.icon,
        arenas: kingdom.arenas,
      })
    })
  }

  // ── Helpers ───────────────────────────────────────────────────────────────

  private makeCard(
    x: number, y: number, w: number, h: number,
    color: number,
    iconText: string, labelText: string, subText: string,
    id: string,
  ): Card {
    const glow = this.add
      .rectangle(x, y, w + 6, h + 6, color, 0.12)
      .setDepth(1)

    const bg = this.add
      .rectangle(x, y, w, h, 0x111122)
      .setStrokeStyle(2, color, 0.9)
      .setInteractive({ useHandCursor: true })
      .setDepth(2)

    const icon = this.add
      .text(x, y - 22, iconText, { fontSize: '22px', fontFamily: 'monospace' })
      .setOrigin(0.5)
      .setDepth(3)

    const label = this.add
      .text(x, y + 8, labelText, {
        fontFamily: 'monospace',
        fontSize: '11px',
        color: `#${color.toString(16).padStart(6, '0')}`,
        align: 'center',
        wordWrap: { width: w - 16 },
      })
      .setOrigin(0.5)
      .setDepth(3)

    const sub = this.add
      .text(x, y + 30, subText, {
        fontFamily: 'monospace',
        fontSize: '8px',
        color: '#667799',
      })
      .setOrigin(0.5)
      .setDepth(3)

    // Hover
    bg.on('pointerover', () => {
      bg.setFillStyle(color, 0.15)
      glow.setAlpha(0.3)
      this.tweens.add({ targets: bg, scaleX: 1.03, scaleY: 1.03, duration: 120 })
    })
    bg.on('pointerout', () => {
      bg.setFillStyle(0x111122)
      glow.setAlpha(0.12)
      this.tweens.add({ targets: bg, scaleX: 1, scaleY: 1, duration: 120 })
    })

    // Entrada animada
    const delay = this.cards.length * 60
    bg.setAlpha(0); icon.setAlpha(0); label.setAlpha(0); sub.setAlpha(0); glow.setAlpha(0)
    this.tweens.add({ targets: [bg, icon, label, sub, glow], alpha: { from: 0, to: 1 }, duration: 200, delay })

    return { bg, glow, icon, label, sub, id, color }
  }

  private clearCards() {
    for (const c of this.cards) {
      c.bg.destroy(); c.glow.destroy(); c.icon.destroy(); c.label.destroy(); c.sub.destroy()
    }
    this.cards = []
  }

  private drawBackground(width: number, height: number) {
    this.add.rectangle(width / 2, height / 2, width, height, 0x0d1b2a)
    const g = this.add.graphics()
    g.lineStyle(1, 0x1e3a5f, 0.25)
    for (let x = 0; x < width; x += 50) { g.moveTo(x, 0); g.lineTo(x, height) }
    for (let y = 0; y < height; y += 50) { g.moveTo(0, y); g.lineTo(width, y) }
    g.strokePath()
  }

  private spawnStars(width: number, height: number) {
    for (let i = 0; i < 40; i++) {
      const s = this.add
        .rectangle(
          Phaser.Math.Between(0, width),
          Phaser.Math.Between(0, height),
          Phaser.Math.Between(1, 3),
          Phaser.Math.Between(1, 3),
          0xffffff,
          Phaser.Math.FloatBetween(0.1, 0.5),
        )
        .setDepth(0)
      this.tweens.add({
        targets: s,
        alpha: { from: Phaser.Math.FloatBetween(0.1, 0.4), to: Phaser.Math.FloatBetween(0.4, 0.9) },
        duration: Phaser.Math.Between(1000, 3000),
        yoyo: true,
        repeat: -1,
        delay: Phaser.Math.Between(0, 2000),
      })
      this.stars.push(s)
    }
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
      kingdom: null,
    })
  }

  shutdown() {
    EventBus.off(Events.RESUME_GAME, this.onResume, this)
    this.clearCards()
    this.stars = []
  }
}
