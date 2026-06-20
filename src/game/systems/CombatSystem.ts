import type { Question } from '../../types/question.d'
import type { BossDefinition, BossAbility } from '../data/bosses'

export interface CombatState {
  bossCurrentHP: number
  bossMaxHP: number
  playerCurrentHP: number
  playerMaxHP: number
  activeAbilities: { ability: BossAbility; turnsLeft: number }[]
  swordActive: boolean
  shieldAbsorption: number
  usedQuestionIds: Set<string>
  turn: 'player' | 'boss'
}

export interface CombatResult {
  playerDamageDealt: number
  bossDamageDealt: number
  bossDefeated: boolean
  playerDefeated: boolean
  abilityTriggered: BossAbility | null
  newState: CombatState
}

export class CombatSystem {
  private state: CombatState

  constructor(boss: BossDefinition, playerHP: number, playerMaxHP: number) {
    this.state = {
      bossCurrentHP: boss.hp,
      bossMaxHP: boss.hp,
      playerCurrentHP: playerHP,
      playerMaxHP: playerMaxHP,
      activeAbilities: [],
      swordActive: false,
      shieldAbsorption: 0,
      usedQuestionIds: new Set(),
      turn: 'player',
    }
  }

  getState(): CombatState {
    return { ...this.state }
  }

  getActiveEffects(): string[] {
    return this.state.activeAbilities.map((a) => a.ability.effect)
  }

  activateSword() {
    this.state.swordActive = true
  }

  activateShield() {
    this.state.shieldAbsorption = 100
  }

  selectQuestion(pool: Question[]): Question {
    const available = pool.filter((q) => !this.state.usedQuestionIds.has(q.id))
    if (available.length === 0) {
      this.state.usedQuestionIds.clear()
      return pool[Math.floor(Math.random() * pool.length)]
    }
    return available[Math.floor(Math.random() * available.length)]
  }

  resolveAnswer(correct: boolean, boss: BossDefinition): CombatResult {
    const result: CombatResult = {
      playerDamageDealt: 0,
      bossDamageDealt: 0,
      bossDefeated: false,
      playerDefeated: false,
      abilityTriggered: null,
      newState: this.state,
    }

    if (correct) {
      const baseDamage = 30
      const multiplier = this.state.swordActive ? 1.5 : 1
      const damage = Math.floor(baseDamage * multiplier)
      this.state.bossCurrentHP = Math.max(0, this.state.bossCurrentHP - damage)
      result.playerDamageDealt = damage
      this.state.swordActive = false

      // Verificar habilidade por threshold de HP
      const hpPercent = this.state.bossCurrentHP / this.state.bossMaxHP
      for (const ability of boss.abilities) {
        const alreadyActive = this.state.activeAbilities.some((a) => a.ability.id === ability.id)
        if (!alreadyActive && hpPercent <= ability.triggerAtHpPercent) {
          this.state.activeAbilities.push({ ability, turnsLeft: ability.duration })
          result.abilityTriggered = ability
          break
        }
      }

      result.bossDefeated = this.state.bossCurrentHP <= 0
    } else {
      // Turno do boss
      const isDoubleDamage = this.getActiveEffects().includes('double_damage')
      let damage = boss.attackDamage * (isDoubleDamage ? 2 : 1)

      if (this.state.shieldAbsorption > 0) {
        const absorbed = Math.floor(damage * (this.state.shieldAbsorption / 100))
        damage = Math.max(0, damage - absorbed)
        this.state.shieldAbsorption = 0
      }

      this.state.playerCurrentHP = Math.max(0, this.state.playerCurrentHP - damage)
      result.bossDamageDealt = damage
      result.playerDefeated = this.state.playerCurrentHP <= 0

      // Decrementar duração das habilidades ativas
      this.state.activeAbilities = this.state.activeAbilities
        .map((a) => ({ ...a, turnsLeft: a.turnsLeft - 1 }))
        .filter((a) => a.turnsLeft > 0)
    }

    result.newState = { ...this.state }
    return result
  }
}
