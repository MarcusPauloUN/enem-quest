import Phaser from 'phaser'
import { EventBus, Events } from '../EventBus'
import { CombatSystem } from '../systems/CombatSystem'
import { BOSSES } from '../data/bosses'
import { SAMPLE_QUESTIONS } from '../../content/questions/sampleQuestions'
import type { QuizAnswerPayload } from '../../types/question.d'
import type { BossDefinition } from '../data/bosses'
import { XP_REWARDS } from '../data/xpCurve'

export class BattleScene extends Phaser.Scene {
  private combat!: CombatSystem
  private boss!: BossDefinition
  private isBossEncounter = false
  private kingdomId = 'linguagens'
  private returnScene = 'DungeonScene'
  private returnData: Record<string, unknown> = {}

  private bossSprite!: Phaser.GameObjects.Rectangle
  private bossHPBar!: Phaser.GameObjects.Rectangle
  private bossHPBg!: Phaser.GameObjects.Rectangle
  private playerHPBar!: Phaser.GameObjects.Rectangle
  private logText!: Phaser.GameObjects.Text
  private isWaitingForAnswer = false

  constructor() {
    super({ key: 'BattleScene' })
  }

  init(data: {
    isBoss: boolean
    bossId: string | null
    kingdomId: string
    dungeonId: string
    returnScene: string
    returnData: Record<string, unknown>
  }) {
    this.isBossEncounter = data.isBoss ?? false
    this.kingdomId = data.kingdomId ?? 'linguagens'
    this.returnScene = data.returnScene ?? 'DungeonScene'
    this.returnData = data.returnData ?? {}

    const bossId = data.bossId ?? `boss_${data.kingdomId}`
    this.boss = BOSSES[bossId] ?? BOSSES['boss_linguagens']
  }

  create() {
    const { width, height } = this.scale
    const playerHP = this.registry.get('hp') as number
    const playerMaxHP = this.registry.get('maxHp') as number

    this.combat = new CombatSystem(this.boss, playerHP, playerMaxHP)

    // Background
    this.add.rectangle(width / 2, height / 2, width, height, 0x0a0a1a)
    this.add.rectangle(width / 2, height * 0.6, width, height * 0.8, 0x111122)

    // Título da batalha
    const battleTitle = this.isBossEncounter ? `⚔ BATALHA COM O CHEFÃO ⚔` : `⚔ ENCONTRO!`
    this.add.text(width / 2, 16, battleTitle, {
      fontFamily: 'monospace',
      fontSize: '12px',
      color: '#FFD700',
    }).setOrigin(0.5)

    // Sprite do Boss (placeholder)
    this.bossSprite = this.add.rectangle(width * 0.7, height * 0.35, 80, 100, this.boss.color)
    this.add.text(width * 0.7, height * 0.35, '👾', { fontSize: '40px' }).setOrigin(0.5).setDepth(1)
    this.add.text(width * 0.7, height * 0.35 + 62, this.boss.name, {
      fontFamily: 'monospace',
      fontSize: '10px',
      color: '#ffffff',
    }).setOrigin(0.5)

    // HP bar do boss
    const hpBarW = 160
    this.bossHPBg = this.add.rectangle(width * 0.7, height * 0.35 - 70, hpBarW, 14, 0x330000)
    this.bossHPBar = this.add.rectangle(width * 0.7 - hpBarW / 2, height * 0.35 - 70, hpBarW, 10, 0xe74c3c)
    this.bossHPBar.setOrigin(0, 0.5)
    void this.bossHPBg

    // Sprite do Jogador (placeholder)
    this.add.rectangle(width * 0.25, height * 0.55, 50, 70, 0x00e5ff)
    this.add.text(width * 0.25, height * 0.55, '🧙', { fontSize: '30px' }).setOrigin(0.5).setDepth(1)
    this.add.text(width * 0.25, height * 0.55 + 45, 'VOCÊ', {
      fontFamily: 'monospace',
      fontSize: '10px',
      color: '#00e5ff',
    }).setOrigin(0.5)

    // HP bar do jogador
    const phbW = 120
    this.add.rectangle(width * 0.25, height * 0.55 - 55, phbW, 14, 0x330000)
    this.playerHPBar = this.add.rectangle(width * 0.25 - phbW / 2, height * 0.55 - 55, phbW, 10, 0x27ae60)
    this.playerHPBar.setOrigin(0, 0.5)
    this.updatePlayerHPBar(phbW, playerHP, playerMaxHP)

    // Log de batalha
    this.logText = this.add.text(width / 2, height * 0.78, 'A batalha começou!', {
      fontFamily: 'monospace',
      fontSize: '11px',
      color: '#ccccdd',
      align: 'center',
      wordWrap: { width: width - 40 },
    }).setOrigin(0.5)

    // Botão Responder
    const answerBtn = this.add.rectangle(width / 2, height * 0.9, 220, 36, 0x4a90d9).setInteractive({ useHandCursor: true })
    this.add.text(width / 2, height * 0.9, '📖  RESPONDER QUESTÃO', {
      fontFamily: 'monospace',
      fontSize: '10px',
      color: '#ffffff',
    }).setOrigin(0.5).setDepth(1)

    answerBtn.on('pointerdown', () => this.showQuiz())
    answerBtn.on('pointerover', () => answerBtn.setFillStyle(0x5aa0e9))
    answerBtn.on('pointerout', () => answerBtn.setFillStyle(0x4a90d9))

    EventBus.on(Events.QUIZ_ANSWER, this.onAnswer, this)
    EventBus.emit(Events.SCENE_READY, this)
    this.updateBossHPBar()
  }

  private showQuiz() {
    if (this.isWaitingForAnswer) return
    this.isWaitingForAnswer = true

    const subject = this.boss.questionSubjects[0]
    const pool = SAMPLE_QUESTIONS.filter((q) => q.subject === subject || subject === 'linguagens')
    const question = this.combat.selectQuestion(pool.length > 0 ? pool : SAMPLE_QUESTIONS)
    const activeEffects = this.combat.getActiveEffects()

    EventBus.emit(Events.SHOW_QUIZ, {
      question,
      context: this.isBossEncounter ? 'boss' : 'dungeon',
      bossAbilities: activeEffects.map((e) => ({ id: e, effect: e, turnsLeft: 1 })),
    })
  }

  private onAnswer(payload: QuizAnswerPayload) {
    this.isWaitingForAnswer = false
    const result = this.combat.resolveAnswer(payload.correct, this.boss)

    if (payload.correct) {
      this.logText.setText(`✅ Correto! Você causou ${result.playerDamageDealt} de dano!`)
      this.animateBossHit()

      if (result.abilityTriggered) {
        this.time.delayedCall(600, () => {
          this.logText.setText(`⚡ ${result.abilityTriggered!.announcement}`)
        })
      }

      if (result.bossDefeated) {
        this.time.delayedCall(800, () => this.onBossDefeated())
        return
      }
    } else {
      this.logText.setText(`❌ Errado! ${this.boss.name} causou ${result.bossDamageDealt} de dano!`)
      this.animatePlayerHit()
      this.registry.set('hp', result.newState.playerCurrentHP)

      const phbW = 120
      this.updatePlayerHPBar(phbW, result.newState.playerCurrentHP, result.newState.playerMaxHP)

      if (result.playerDefeated) {
        this.time.delayedCall(800, () => this.onPlayerDefeated())
        return
      }
    }

    this.updateBossHPBar()
  }

  private onBossDefeated() {
    const xpGained = this.isBossEncounter ? XP_REWARDS.BOSS_DEFEAT : XP_REWARDS.DUNGEON_COMPLETE
    const currentXP = (this.registry.get('xp') as number) + xpGained
    this.registry.set('xp', currentXP)

    const loot = this.rollLoot()
    EventBus.emit(Events.BOSS_DEFEATED, { bossId: this.boss.id, rewards: { items: loot, xp: xpGained } })

    this.scene.start('VictoryScene', {
      xpGained,
      items: loot,
      returnScene: this.returnScene,
      returnData: this.returnData,
    })
  }

  private onPlayerDefeated() {
    const hp = this.registry.get('hp') as number
    EventBus.emit(Events.PLAYER_DEFEATED, { hp })
    this.scene.start('GameOverScene', {
      returnScene: this.returnScene,
      returnData: this.returnData,
      bossId: this.boss.id,
      kingdomId: this.kingdomId,
    })
  }

  private rollLoot(): { itemId: string; quantity: number }[] {
    return this.boss.loot
      .filter((entry) => Math.random() < entry.chance)
      .map((entry) => ({ itemId: entry.itemId, quantity: 1 }))
  }

  private updateBossHPBar() {
    const state = this.combat.getState()
    const ratio = state.bossCurrentHP / state.bossMaxHP
    this.bossHPBar.width = 160 * Math.max(0, ratio)
  }

  private updatePlayerHPBar(barW: number, hp: number, maxHp: number) {
    const ratio = hp / maxHp
    this.playerHPBar.width = barW * Math.max(0, ratio)
  }

  private animateBossHit() {
    this.tweens.add({
      targets: this.bossSprite,
      x: this.bossSprite.x + 10,
      duration: 80,
      yoyo: true,
      repeat: 2,
      onComplete: () => this.updateBossHPBar(),
    })
  }

  private animatePlayerHit() {
    this.cameras.main.shake(200, 0.01)
  }

  shutdown() {
    EventBus.off(Events.QUIZ_ANSWER, this.onAnswer, this)
  }
}
