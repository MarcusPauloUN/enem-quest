import Phaser from 'phaser'
import { EventBus, Events } from '../EventBus'

export class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' })
  }

  create() {
    this.registry.set('gameVersion', '0.1.0')
    this.registry.set('hp', 100)
    this.registry.set('maxHp', 100)
    this.registry.set('xp', 0)
    this.registry.set('level', 1)
    this.registry.set('inventory', {})
    this.registry.set('progress', {})

    EventBus.emit(Events.SCENE_READY, this)
    this.scene.start('PreloadScene')
  }
}
