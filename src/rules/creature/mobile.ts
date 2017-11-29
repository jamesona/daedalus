import { Location } from '@daedalus/rules'
import { IsCreature } from './creature'

export interface IsMobile extends IsCreature {
	location: Location
}
