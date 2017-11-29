import { Entity } from '@daedalus/common'
import { IsEffect } from '@daedalus/rules'

import { IsCreature } from './creature'

export interface IsAction extends Entity {
	target: IsCreature
	effect: IsEffect
	lore?: string
}

export interface HasAction {
	action: IsAction
}
