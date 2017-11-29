import { Entity } from '@daedalus/types'
import { IsEffect } from '@daedalus/types'

import { IsCreature } from './creature'

export interface IsAction extends Entity {
	target: IsCreature
	effect: IsEffect
	lore?: string
}

export interface HasAction {
	action: IsAction
}
