import { Entity } from '@daedalus/common'
import { HasEffects } from '@daedalus/rules'

export interface Ability extends Entity, HasEffects {
	lore?: string
}

export interface HasAbilities {
	abilities: Ability[]
}
