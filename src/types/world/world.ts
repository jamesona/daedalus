import { CartesianGrid } from '@daedalus/types'

import { IsLocation } from './location'
import { IsRoom } from './room'

export class IsWorld {
	currentLocation: IsLocation
	map: CartesianGrid<IsRoom>
}
