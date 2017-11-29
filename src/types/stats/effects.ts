import { Entity } from '@daedalus/types'
import { StatModifier } from './mod'

export interface IsEffect extends Entity {
	effect: StatModifier
}

export type Effects = IsEffect[]

export interface HasEffects {
	effects: Effects
}
