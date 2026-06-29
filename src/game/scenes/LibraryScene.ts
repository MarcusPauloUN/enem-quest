import Phaser from 'phaser'
import { EventBus, Events } from '../EventBus'
import type { Kingdom, Arena, Topic } from '../data/worlds'
import { isTopicStudied, markTopicStudied } from '../../lib/studyProgress'

// Dados passados via scene.start('LibraryScene', { kingdom, returnScene, returnData })
interface LibraryInitData {
  kingdom: Kingdom
  returnScene: string
  returnData: Record<string, unknown>
}

export class LibraryScene extends Phaser.Scene {
  private kingdom!: Kingdom
  private returnScene!: string
  private returnData!: Record<string, unknown>

  // UI objects que precisam ser recriados ao mudar de view
  private uiGroup!: Phaser.GameObjects.Group

  constructor() {
    super({ key: 'LibraryScene' })
  }

  init(data: LibraryInitData) {
    this.kingdom = data.kingdom
    this.returnScene = data.returnScene
    this.returnData = data.returnData ?? {}
  }

  create() {
    const { width, height } = this.scale
    this.uiGroup = this.add.group()

    this.drawBackground(width, height)
    this.drawShelf(width, height)
    this.drawAnciao(width, height)
    this.renderIndexView(width, height)

    EventBus.emit(Events.SCENE_READY, this)
  }

  // ── Tela de índice — lista de arenas e tópicos ────────────────────────────

  private renderIndexView(width: number, height: number) {
    this.clearUI()

    // Título da biblioteca
    const titleBg = this.add.rectangle(width / 2, 28, width - 40, 34, 0x0a0a22, 0.9)
      .setStrokeStyle(1, this.kingdom.color, 0.7)
    this.uiGroup.add(titleBg)

    const title = this.add.text(width / 2, 28,
      `📚 Biblioteca — ${this.kingdom.name}`, {
        fontFamily: 'monospace',
        fontSize: '12px',
        color: `#${this.kingdom.color.toString(16).padStart(6, '0')}`,
      }
    ).setOrigin(0.5).setDepth(5)
    this.uiGroup.add(title)

    // Subtítulo do ancião
    const intro = this.add.text(width * 0.15, 60,
      `"Bem-vindo, aventureiro! Escolha um tópico para estudar.\nCada tópico estudado te dá uma Poção de Dica!"`, {
        fontFamily: 'monospace',
        fontSize: '9px',
        color: '#bbaa88',
        wordWrap: { width: width * 0.55 },
      }
    ).setDepth(5)
    this.uiGroup.add(intro)

    // Painel de scroll — lista de tópicos por arena
    const panelX = 20
    const panelY = 90
    const panelW = width * 0.72
    const panelH = height - 130

    const panelBg = this.add.rectangle(panelX + panelW / 2, panelY + panelH / 2, panelW, panelH, 0x090916, 0.95)
      .setStrokeStyle(1, 0x2a3a5a)
    this.uiGroup.add(panelBg)

    let yOffset = panelY + 12

    for (const arena of this.kingdom.arenas) {
      // Cabeçalho da arena
      const arenaHeader = this.add.text(panelX + 12, yOffset,
        `▸ ${arena.title}`, {
          fontFamily: 'monospace',
          fontSize: '10px',
          color: `#${this.kingdom.color.toString(16).padStart(6, '0')}`,
        }
      ).setDepth(5)
      this.uiGroup.add(arenaHeader)
      yOffset += 20

      // Tópicos da arena
      for (const topic of arena.topics) {
        const itemBg = this.add
          .rectangle(panelX + panelW / 2, yOffset + 8, panelW - 20, 22, 0x111128)
          .setInteractive({ useHandCursor: true })
          .setDepth(4)
        this.uiGroup.add(itemBg)

        const studied = isTopicStudied(topic.id)
        const itemLabel = this.add.text(panelX + 24, yOffset,
          studied ? `  ✓ ${topic.title}` : `  📄 ${topic.title}`, {
            fontFamily: 'monospace',
            fontSize: '9px',
            color: studied ? '#4caf50' : '#aabbcc',
          }
        ).setDepth(5)
        this.uiGroup.add(itemLabel)

        itemBg.on('pointerover', () => {
          itemBg.setFillStyle(this.kingdom.color, 0.18)
          itemLabel.setColor('#ffffff')
        })
        itemBg.on('pointerout', () => {
          itemBg.setFillStyle(0x111128)
          itemLabel.setColor(studied ? '#4caf50' : '#aabbcc')
        })
        itemBg.on('pointerdown', () => this.openTopic(topic, arena, width, height))

        yOffset += 26
      }

      yOffset += 8
    }

    // Botão sair
    this.makeButton(width - 80, height - 22, 130, 28, '⚔  Entrar na Dungeon', 0x2a6a3a, () => {
      this.cameras.main.flash(300, 255, 255, 255)
      this.time.delayedCall(320, () => {
        this.scene.start(this.returnScene, this.returnData)
      })
    })

    // Botão voltar ao mapa
    this.makeButton(70, height - 22, 120, 28, '← Mapa', 0x333344, () => {
      this.scene.start('WorldMapScene')
    })
  }

  // ── Tela de detalhe do tópico ─────────────────────────────────────────────

  private openTopic(topic: Topic, arena: Arena, width: number, height: number) {
    this.clearUI()

    // Fundo do painel
    const panelBg = this.add
      .rectangle(width / 2, height / 2, width - 40, height - 60, 0x090916, 0.97)
      .setStrokeStyle(2, this.kingdom.color, 0.8)
      .setDepth(4)
    this.uiGroup.add(panelBg)

    // Cabeçalho
    const header = this.add.text(width / 2, 38,
      `${arena.title}  ›  ${topic.title}`, {
        fontFamily: 'monospace',
        fontSize: '11px',
        color: `#${this.kingdom.color.toString(16).padStart(6, '0')}`,
      }
    ).setOrigin(0.5).setDepth(5)
    this.uiGroup.add(header)

    // Divisor
    const divider = this.add.rectangle(width / 2, 52, width - 60, 1, this.kingdom.color, 0.3).setDepth(5)
    this.uiGroup.add(divider)

    // Balões do ancião — passo a passo
    const steps = [
      { label: '💬 Conceito', text: topic.summary },
      { label: '📝 Exemplo Resolvido', text: topic.example },
      { label: '💡 Dica de Prova', text: topic.tip },
    ]

    let yPos = 70
    for (let i = 0; i < steps.length; i++) {
      const step = steps[i]
      const isLast = i === steps.length - 1

      const bubbleBg = this.add
        .rectangle(width / 2, yPos + 30, width - 60, 72, isLast ? 0x1a2a12 : 0x0d1a2a, 0.9)
        .setStrokeStyle(1, isLast ? 0x4caf50 : this.kingdom.color, 0.4)
        .setDepth(5)
      this.uiGroup.add(bubbleBg)

      const labelText = this.add.text(40, yPos + 8, step.label, {
        fontFamily: 'monospace',
        fontSize: '9px',
        color: isLast ? '#4caf50' : `#${this.kingdom.color.toString(16).padStart(6, '0')}`,
      }).setDepth(6)
      this.uiGroup.add(labelText)

      const bodyText = this.add.text(40, yPos + 22, step.text, {
        fontFamily: 'monospace',
        fontSize: '9px',
        color: '#ccddee',
        wordWrap: { width: width - 90 },
      }).setDepth(6)
      this.uiGroup.add(bodyText)

      yPos += 80
    }

    // Botão voltar ao índice
    this.makeButton(70, height - 22, 120, 28, '← Índice', 0x333344, () => {
      this.renderIndexView(width, height)
    })

    // Botão "Entendido — Pegar Dica"
    const alreadyStudied = isTopicStudied(topic.id)
    this.makeButton(
      width - 100, height - 22, 170, 28,
      alreadyStudied ? '✓ Já estudado' : '✅ Entendido (+1 Poção de Dica)',
      alreadyStudied ? 0x2a4a2a : 0x1a6a3a,
      () => {
        if (!alreadyStudied) {
          markTopicStudied(topic.id)
          EventBus.emit(Events.INVENTORY_USE_ITEM, { itemId: 'hint_potion_grant', context: 'library', topicId: topic.id })
        }
        this.renderIndexView(width, height)
      }
    )
  }

  // ── Helpers ───────────────────────────────────────────────────────────────

  private makeButton(x: number, y: number, w: number, h: number, label: string, color: number, cb: () => void) {
    const bg = this.add.rectangle(x, y, w, h, color).setInteractive({ useHandCursor: true }).setDepth(10)
    const text = this.add.text(x, y, label, { fontFamily: 'monospace', fontSize: '9px', color: '#ffffff' }).setOrigin(0.5).setDepth(11)
    bg.on('pointerover', () => bg.setAlpha(0.8))
    bg.on('pointerout', () => bg.setAlpha(1))
    bg.on('pointerdown', cb)
    this.uiGroup.add(bg)
    this.uiGroup.add(text)
  }

  private clearUI() {
    this.uiGroup.clear(true, true)
  }

  private drawBackground(width: number, height: number) {
    // Fundo escuro com tons quentes de biblioteca
    this.add.rectangle(width / 2, height / 2, width, height, 0x0c0a08)

    // Piso de madeira — linhas horizontais
    const g = this.add.graphics()
    g.lineStyle(1, 0x3a2a18, 0.4)
    for (let y = height * 0.7; y < height; y += 12) {
      g.moveTo(0, y); g.lineTo(width, y)
    }

    // Luz de vela — halo dourado no centro
    g.fillStyle(0xffcc44, 0.04)
    g.fillCircle(width * 0.75, height * 0.45, 120)
    g.strokePath()
  }

  private drawShelf(width: number, height: number) {
    const g = this.add.graphics()

    // Prateleiras
    const shelfY = [height * 0.28, height * 0.48, height * 0.68]
    const colors = [0x8b4513, 0x6b3410, 0x4a2008]

    for (const y of shelfY) {
      g.fillStyle(0x2a1a0a)
      g.fillRect(width * 0.72, y - 55, width * 0.26, 55)
      g.fillStyle(colors[0], 0.9)
      g.fillRect(width * 0.72, y, width * 0.26, 8)
    }

    // Livros decorativos nas prateleiras
    const bookColors = [0xe74c3c, 0x3498db, 0x2ecc71, 0xf39c12, 0x9b59b6, 0x1abc9c, 0xe67e22]
    let bookX = width * 0.73
    let shelfIdx = 0

    for (let i = 0; i < 24; i++) {
      if (i > 0 && i % 8 === 0) { shelfIdx++; bookX = width * 0.73 }
      const bw = Phaser.Math.Between(10, 16)
      const bh = Phaser.Math.Between(28, 48)
      const by = shelfY[shelfIdx] - bh
      g.fillStyle(bookColors[i % bookColors.length], 0.85)
      g.fillRect(bookX, by, bw - 1, bh)
      // Lombada do livro
      g.fillStyle(0x000000, 0.2)
      g.fillRect(bookX, by, 2, bh)
      bookX += bw + 1
    }

    g.strokePath()
  }

  private drawAnciao(width: number, height: number) {
    // Personagem do Ancião (placeholder artístico)
    const ax = width * 0.82
    const ay = height * 0.5

    // Poltrona
    this.add.rectangle(ax, ay + 28, 70, 20, 0x4a2f10).setDepth(1)
    this.add.rectangle(ax - 30, ay + 10, 12, 40, 0x4a2f10).setDepth(1)
    this.add.rectangle(ax + 30, ay + 10, 12, 40, 0x4a2f10).setDepth(1)

    // Corpo
    this.add.rectangle(ax, ay, 38, 50, 0x5a4a3a).setDepth(2)
    // Cabeça
    this.add.ellipse(ax, ay - 36, 34, 34, 0xf5d5a0).setDepth(2)
    // Chapéu de mago
    const g = this.add.graphics().setDepth(3)
    g.fillStyle(0x2a1a5a)
    g.fillTriangle(ax - 14, ay - 36, ax + 14, ay - 36, ax, ay - 78)
    g.fillStyle(0x3a2a7a)
    g.fillRect(ax - 18, ay - 40, 36, 8)
    // Estrelas no chapéu
    g.fillStyle(0xf4d03f, 0.9)
    g.fillCircle(ax - 5, ay - 55, 3)
    g.fillCircle(ax + 6, ay - 65, 2)
    // Barba
    this.add.ellipse(ax, ay - 20, 28, 22, 0xddddcc).setDepth(3)
    // Olhos
    this.add.ellipse(ax - 7, ay - 38, 6, 7, 0x223344).setDepth(4)
    this.add.ellipse(ax + 7, ay - 38, 6, 7, 0x223344).setDepth(4)
    // Brilho dos olhos
    this.add.ellipse(ax - 5, ay - 40, 2, 2, 0xffffff).setDepth(5)
    this.add.ellipse(ax + 9, ay - 40, 2, 2, 0xffffff).setDepth(5)

    // Vela na mesa ao lado
    const cx = ax - 50
    const cy = ay + 10
    this.add.rectangle(cx, cy, 8, 24, 0xf5f5dc).setDepth(2)
    const flame = this.add.ellipse(cx, cy - 16, 8, 12, 0xffaa00, 0.9).setDepth(3)
    this.tweens.add({
      targets: flame,
      scaleX: { from: 0.9, to: 1.1 },
      scaleY: { from: 0.8, to: 1.2 },
      alpha: { from: 0.7, to: 1 },
      duration: 400,
      yoyo: true,
      repeat: -1,
    })
  }

  shutdown() {
    this.clearUI()
  }
}
