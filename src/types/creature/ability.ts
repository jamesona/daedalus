import { Entity } from '@daedalus/types'
import { HasEffects } from '@daedalus/types'

export interface Ability extends Entity, HasEffects {
	lore?: string
}

export interface HasAbilities {
	abilities: Ability[]
}
