import { Entity } from '@daedalus/common'
import { StatModifier } from '@daedalus/types'

export interface IsItem extends Entity {
	// If an item has weight, implement it as an effect: {WGT:['+',10]}
	effect: StatModifier[]
	value: number
	lore?: string
}

export interface HasItems {
	items: IsItem[]
}
