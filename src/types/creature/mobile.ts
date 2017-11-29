import { IsLocation } from '@daedalus/types'
import { IsCreature } from './creature'

export interface IsMobile extends IsCreature {
	location: IsLocation
}
