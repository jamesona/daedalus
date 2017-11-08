import { Ability } from './ability'
import { BaseStats } from './stats'

export interface Creature extends BaseStats {
	name: string
	abilities?: Ability[]
	purse?: string
}
