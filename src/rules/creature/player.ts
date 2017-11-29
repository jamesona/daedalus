import { IsMobile } from './mobile'
import { IsCreature } from './creature'

export interface IsPlayer extends IsCreature, IsMobile {
	class: any[], // TODO
	skills: any[] // TODO
}
